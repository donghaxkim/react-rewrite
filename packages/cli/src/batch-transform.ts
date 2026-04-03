// packages/cli/src/batch-transform.ts
// Batch transform engine — groups operations by file, resolves nodes against
// the original AST, applies all mutations atomically (parse once, write once).

import * as fs from "node:fs";
import * as path from "node:path";
import type { BatchOperation } from "@react-rewrite/shared";
import {
  parseSource,
  findJSXElementAt,
  mutateClassName,
  mutateTextContent,
  mutateReorder,
  type ClassNameUpdate,
} from "./transform.js";
import { applyMdxTextEdit, isMdxTextFile } from "./mdx-text.js";
import { resolveProjectFilePath, isProjectFilePathSafe } from "./path-resolver.js";
import { resolveJSXPath } from "./jsx-path-resolver.js";
import { logger } from "./logger.js";

/**
 * Search for .mdx/.md files in the project that contain the given text.
 * Used as a fallback when a text edit targets a JSX wrapper but the actual
 * content lives in a compiled MDX file.
 */
function findMdxFileContainingText(projectRoot: string, text: string): string | null {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  if (!normalizedText) return null;

  const candidates: string[] = [];
  const searchDirs = [projectRoot];
  const visited = new Set<string>();

  while (searchDirs.length > 0) {
    const dir = searchDirs.pop()!;
    if (visited.has(dir)) continue;
    visited.add(dir);

    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (entry.name.startsWith(".") || entry.name === "node_modules" || entry.name === "dist" || entry.name === "build") continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        searchDirs.push(fullPath);
      } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        candidates.push(fullPath);
      }
    }
  }

  for (const filePath of candidates) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const normalizedContent = content.replace(/\s+/g, " ");
      if (normalizedContent.includes(normalizedText)) {
        return filePath;
      }
    } catch {
      continue;
    }
  }

  return null;
}

/** Get the primary line number from any BatchOperation variant. */
function getOpLine(op: BatchOperation): number {
  return op.op === "reorder" ? op.fromLine : op.line;
}

// ── Types ────────────────────────────────────────────────────────────────

export interface BatchResult {
  /** Per-operation results in the same order as the input operations. */
  results: OperationResult[];
  /** Aggregated: all successful undo entries keyed by file. */
  undoEntries: Array<{ filePath: string; content: string; afterContent: string }>;
}

export interface OperationResult {
  op: BatchOperation["op"];
  file: string;
  line: number;
  success: boolean;
  error?: string;
}

// ── Internal types ───────────────────────────────────────────────────────

interface ResolvedOp {
  /** Index into the original operations array. */
  index: number;
  op: BatchOperation;
  /** Resolved AST node reference (null if resolution failed). */
  node: any | null;
  /** Execution priority: 0 = non-structural, 1 = structural. */
  priority: number;
  /** Error from resolution phase. */
  error?: string;
}

// ── Node resolution helpers ──────────────────────────────────────────────

function getJSXTagName(node: any): string | null {
  const name = node.openingElement?.name;
  if (!name) return null;
  if (name.type === "JSXIdentifier") return name.name;
  if (name.type === "JSXMemberExpression") {
    return `${name.object?.name}.${name.property?.name}`;
  }
  return null;
}

/**
 * Check if an AST tag name matches a DOM tag name.
 * Handles motion.div → div, Styled.button → button, etc.
 */
function tagNameMatches(astTag: string, domTag: string): boolean {
  if (astTag.toLowerCase() === domTag.toLowerCase()) return true;
  if (astTag.includes(".")) {
    const suffix = astTag.split(".").pop()!;
    if (suffix.toLowerCase() === domTag.toLowerCase()) return true;
  }
  return false;
}

/** Extract static classes from a JSX element's className attribute. */
function getJSXStaticClasses(node: any): string[] {
  const attrs = node.openingElement?.attributes ?? [];
  const classNameAttr = attrs.find(
    (a: any) => a.type === "JSXAttribute" && a.name?.name === "className"
  );
  if (!classNameAttr?.value) return [];
  const val = classNameAttr.value;
  // Handle both StringLiteral (tsx parser) and Literal (babel parser)
  if (val.type === "StringLiteral" || val.type === "Literal") {
    return (val.value ?? "").split(/\s+/).filter(Boolean);
  }
  // JSXExpressionContainer — extract static parts from template literals and cn()/clsx() calls
  if (val.type === "JSXExpressionContainer") {
    const expr = val.expression;
    // Template literal: className={`flex gap-4 ${dynamic}`} — extract from quasis
    if (expr.type === "TemplateLiteral") {
      const classes: string[] = [];
      for (const quasi of expr.quasis ?? []) {
        const raw = quasi.value?.raw ?? "";
        classes.push(...raw.split(/\s+/).filter(Boolean));
      }
      return classes;
    }
    // Call expression: className={cn("flex gap-4", ...)} — extract from string args
    if (expr.type === "CallExpression") {
      const classes: string[] = [];
      for (const arg of expr.arguments ?? []) {
        if (arg.type === "StringLiteral" || arg.type === "Literal") {
          classes.push(...(arg.value ?? "").split(/\s+/).filter(Boolean));
        }
      }
      return classes;
    }
  }
  return [];
}

/** Get the id attribute from a JSX element. */
function getJSXId(node: any): string | null {
  const attrs = node.openingElement?.attributes ?? [];
  const idAttr = attrs.find(
    (a: any) => a.type === "JSXAttribute" && a.name?.name === "id"
  );
  if (!idAttr?.value) return null;
  const val = idAttr.value;
  if (val.type === "StringLiteral" || val.type === "Literal") return val.value;
  return null;
}

/** Get the key prop from a JSX element. */
function getJSXKey(node: any): string | null {
  const attrs = node.openingElement?.attributes ?? [];
  const keyAttr = attrs.find(
    (a: any) => a.type === "JSXAttribute" && a.name?.name === "key"
  );
  if (!keyAttr?.value) return null;
  const val = keyAttr.value;
  if (val.type === "StringLiteral" || val.type === "Literal") return val.value;
  return null;
}

/** Check if AST static classes are a subset of the DOM classes provided. */
function classNameSubsetMatch(astClasses: string[], domClassName: string): boolean {
  if (astClasses.length === 0) return false;
  const domClasses = domClassName.split(/\s+/).filter(Boolean);
  // All AST classes should appear in DOM classes
  return astClasses.every((c) => domClasses.includes(c));
}

/**
 * Compute the nth-of-type index (0-based) for a JSX element among its
 * same-tag siblings within the same parent.
 */
function computeASTNthOfType(astPath: any): number {
  const parent = astPath.parent?.node;
  if (!parent?.children) return 0;
  const tag = getJSXTagName(astPath.node);
  if (!tag) return 0;
  let count = 0;
  for (const child of parent.children) {
    if (child === astPath.node) return count;
    if (child.type === "JSXElement" && getJSXTagName(child) === tag) {
      count++;
    }
  }
  return count;
}

/** Collapse all whitespace runs (including newlines) to a single space. */
function normalizeWs(s: string): string {
  return s.replace(/\s+/g, " ");
}

/** Check if a JSX element's text content (recursive) contains the given text.
 *  Uses whitespace-normalized comparison because React collapses JSX whitespace
 *  (newlines → spaces) but the AST retains raw formatting. */
function containsText(node: any, text: string): boolean {
  const normalized = normalizeWs(text.trim());
  if (!normalized) return false;
  const children = node.children;
  if (!children) return false;
  for (const child of children) {
    if (child.type === "JSXText" && normalizeWs(child.value.trim()).includes(normalized)) return true;
    if (child.type === "JSXElement" && containsText(child, text)) return true;
  }
  return false;
}

// ── Node resolution ──────────────────────────────────────────────────────

function resolveNodes(
  j: any,
  root: any,
  ops: Array<{ index: number; op: BatchOperation }>,
  resolvedPath: string,
): ResolvedOp[] {
  const resolved: ResolvedOp[] = [];

  for (const { index, op } of ops) {
    if (op.op === "reorder") {
      // Reorder uses line-based resolution (handled during mutation)
      resolved.push({
        index,
        op,
        node: null, // not needed — mutateReorder resolves internally
        priority: 1, // structural
      });
      continue;
    }

    // ── Step 0: Try JSX structural path (preferred) ───────────────────
    if ('jsxPath' in op && op.jsxPath && op.jsxPath.segments.length > 0) {
      const pathNode = resolveJSXPath(j, root, op.jsxPath);
      if (pathNode) {
        // Cross-validate tag name if hint is available
        const actualTag = getJSXTagName(pathNode.node);
        if (!op.tagName || !actualTag || tagNameMatches(actualTag, op.tagName)) {
          const priority = op.op === "updateClass" || op.op === "updateText" || op.op === "moveSpacing" ? 0 : 1;
          resolved.push({ index, op, node: pathNode, priority });
          continue;
        }
      }
      // If path resolution failed, fall through to line:col + fuzzy (existing code)
    }

    // ── Staleness check ──────────────────────────────────────────────
    if (op.fileMtime != null && op.fileSize != null) {
      try {
        const stat = fs.statSync(resolvedPath);
        const currentMtime = Math.floor(stat.mtimeMs);
        const expectedMtime = Math.floor(op.fileMtime);
        const currentSize = stat.size;
        if (currentMtime !== expectedMtime || currentSize !== op.fileSize) {
          resolved.push({
            index,
            op,
            node: null,
            priority: 0,
            error: `File has been modified since the overlay captured this element (stale). ` +
              `Expected mtime=${op.fileMtime}/size=${op.fileSize}, got mtime=${currentMtime}/size=${currentSize}`,
          });
          continue;
        }
      } catch {
        // stat failed — proceed without staleness check
      }
    }

    // ── Step A: Try exact line:col match ─────────────────────────────
    let node = findJSXElementAt(j, root, op.line, op.col);

    // Cross-validate tag name if we got a hit and hint is available
    if (node && op.tagName) {
      const actualTag = getJSXTagName(node.node);
      if (actualTag && !tagNameMatches(actualTag, op.tagName)) {
        // Exact position hit wrong tag — clear and fall through
        node = null;
      }
    }

    // ── Step B: Fallback — fuzzy resolution using hints ──────────────
    if (!node && op.tagName) {
      const candidates: any[] = [];
      root.find(j.JSXElement).forEach((p: any) => {
        const astTag = getJSXTagName(p.node);
        if (astTag && op.tagName && tagNameMatches(astTag, op.tagName)) {
          candidates.push(p);
        }
      });

      // Log candidates for debugging
      logger.debug(`[resolve] ${candidates.length} <${op.tagName}> candidates, DOM className="${op.className?.slice(0, 60) ?? ""}"`);

      if (candidates.length === 1) {
        node = candidates[0];
      } else if (candidates.length > 1) {
        // ── Disambiguate ───────────────────────────────────────────

        // B1: Filter by id
        if (!node && op.id) {
          const byId = candidates.filter((p: any) => getJSXId(p.node) === op.id);
          if (byId.length === 1) node = byId[0];
        }

        // B2: Filter by key
        if (!node && op.jsxKey) {
          const byKey = candidates.filter((p: any) => getJSXKey(p.node) === op.jsxKey);
          if (byKey.length === 1) node = byKey[0];
        }

        // B2.5: For updateText ops, filter candidates by text content match
        if (!node && op.op === "updateText") {
          const textOp = op as Extract<BatchOperation, { op: "updateText" }>;
          const textCandidates = candidates.filter(c => {
            return containsText(c.node, textOp.originalText);
          });
          if (textCandidates.length === 1) {
            node = textCandidates[0];
            const loc = node.node.openingElement?.loc?.start;
            logger.debug(`[resolve] Text content match <${op.tagName}> → ${loc?.line}:${loc?.column}`);
          } else if (textCandidates.length > 1) {
            // Narrow candidates to those containing the text
            candidates.length = 0;
            candidates.push(...textCandidates);
          }
        }

        // B3: Filter by className — pick the candidate with the highest class overlap
        if (!node && op.className) {
          const domClasses = op.className.split(/\s+/).filter(Boolean);
          let bestMatch: any = null;
          let bestOverlap = 0;

          for (const candidate of candidates) {
            const astClasses = getJSXStaticClasses(candidate.node);
            if (astClasses.length === 0) continue;

            // Count overlap in both directions
            const astInDom = astClasses.filter((c: string) => domClasses.includes(c)).length;
            const domInAst = domClasses.filter((c: string) => astClasses.includes(c)).length;
            // Overlap = matched classes / max(ast, dom) — rewards both precision and recall
            const overlap = (astInDom + domInAst) / (astClasses.length + domClasses.length);

            const loc = candidate.node.openingElement?.loc?.start;
            logger.debug(`[resolve]   candidate @${loc?.line}: AST="${astClasses.slice(0, 5).join(" ")}" overlap=${overlap.toFixed(2)}`);

            if (overlap > bestOverlap) {
              bestOverlap = overlap;
              bestMatch = candidate;
            }
          }

          // Require at least 30% overlap to accept
          if (bestMatch && bestOverlap >= 0.3) {
            // Check if there's a close second — if so, use nthOfType to disambiguate
            const secondBest = candidates
              .filter(c => c !== bestMatch)
              .reduce((best, c) => {
                const astClasses = getJSXStaticClasses(c.node);
                const astInDom = astClasses.filter((cl: string) => domClasses.includes(cl)).length;
                const domInAst = domClasses.filter((cl: string) => astClasses.includes(cl)).length;
                const overlap = (astInDom + domInAst) / (astClasses.length + domClasses.length);
                return overlap > best ? overlap : best;
              }, 0);

            if (bestOverlap - secondBest > 0.1) {
              // Clear winner
              node = bestMatch;
            } else if (op.nthOfType != null) {
              // Close match — use nthOfType to break tie
              const tiedCandidates = candidates.filter(c => {
                const astClasses = getJSXStaticClasses(c.node);
                const astInDom = astClasses.filter((cl: string) => domClasses.includes(cl)).length;
                const domInAst = domClasses.filter((cl: string) => astClasses.includes(cl)).length;
                const overlap = (astInDom + domInAst) / (astClasses.length + domClasses.length);
                return overlap >= bestOverlap - 0.1;
              });
              const byNth = tiedCandidates.find((p: any) => computeASTNthOfType(p) === op.nthOfType);
              if (byNth) node = byNth;
              else node = bestMatch; // fallback to best overlap
            } else {
              node = bestMatch;
            }
          }
        }

        // B5: nthOfType without className
        if (!node && op.nthOfType != null) {
          const byNth = candidates.filter((p: any) => computeASTNthOfType(p) === op.nthOfType);
          if (byNth.length === 1) node = byNth[0];
        }
      }
    }

    if (!node && op.op === "updateText") {
      resolved.push({
        index,
        op,
        node: null,
        priority: 0,
      });
      continue;
    }

    if (!node) {
      resolved.push({
        index,
        op,
        node: null,
        priority: 0,
        error: `No JSX element found at ${op.line}:${op.col}` +
          (op.tagName ? ` (tag=${op.tagName})` : "") +
          (op.className ? ` (className=${op.className})` : ""),
      });
      continue;
    }

    const priority = op.op === "updateClass" || op.op === "updateText" || op.op === "moveSpacing" ? 0 : 1;
    resolved.push({ index, op, node, priority });
  }

  return resolved;
}

// ── Same-node coalescing ─────────────────────────────────────────────────

function coalesceOps(resolved: ResolvedOp[]): ResolvedOp[] {
  // Group by node identity (same line:col means same node)
  const byPosition = new Map<string, ResolvedOp[]>();

  for (const rop of resolved) {
    if (rop.error || !rop.node) {
      // Failed resolution — keep as-is
      continue;
    }
    if (rop.op.op === "reorder" || rop.op.op === "deleteElement") {
      // Structural ops can't be coalesced
      continue;
    }
    const key = `${rop.op.line}:${rop.op.col}`;
    const group = byPosition.get(key) ?? [];
    group.push(rop);
    byPosition.set(key, group);
  }

  // Merge multiple updateClass ops on the same node
  const merged = new Set<number>(); // indices that were merged away

  for (const [, group] of byPosition) {
    const classOps = group.filter(r => r.op.op === "updateClass");
    if (classOps.length <= 1) continue;

    // Merge all updates into the first op
    const primary = classOps[0];
    const primaryOp = primary.op as Extract<BatchOperation, { op: "updateClass" }>;
    for (let i = 1; i < classOps.length; i++) {
      const secondaryOp = classOps[i].op as Extract<BatchOperation, { op: "updateClass" }>;
      primaryOp.updates.push(...secondaryOp.updates);
      merged.add(classOps[i].index);
    }
  }

  // Return non-merged ops + mark merged ones as success (they're included in primary)
  return resolved.filter(r => !merged.has(r.index));
}

// ── Mutation application ─────────────────────────────────────────────────

function applyOp(j: any, root: any, rop: ResolvedOp, source: string): string | undefined {
  const { op, node } = rop;

  switch (op.op) {
    case "updateClass": {
      const updates: ClassNameUpdate[] = op.updates.map((u: Extract<BatchOperation, { op: "updateClass" }>["updates"][number]) => ({
        tailwindPrefix: u.tailwindPrefix,
        tailwindToken: u.tailwindToken,
        value: u.value,
        relatedPrefixes: u.relatedPrefixes,
        classPattern: u.classPattern,
        standalone: u.standalone,
      }));
      mutateClassName(j, node, updates);
      return undefined;
    }

    case "updateText": {
      if (node) {
        const boundFallback = replaceBoundStringLiteralInElement(j, root, node, op.originalText, op.newText);
        if (boundFallback) {
          return undefined;
        }

        const found = mutateTextContent(node, op.originalText, op.newText, source, op.cursorOffset, op.textAnchor);
        if (found) {
          return undefined;
        }
      }

      const fallback = replaceStringLiteralInFile(j, root, op.originalText, op.newText);
      if (fallback.replaced) {
        return undefined;
      }
      if (fallback.ambiguous) {
        return `Text "${op.originalText}" matched multiple string literals in this file; refusing ambiguous rewrite`;
      }
      return `No matching text "${op.originalText}" found in element at ${op.line}:${op.col}`;
    }

    case "reorder": {
      mutateReorder(j, root, op.fromLine, op.toLine);
      return undefined;
    }

    case "moveSpacing": {
      // Detect the right mechanism for this element
      const mechanism = detectMoveMechanism(node, op.axis);

      if (mechanism === "framer-motion") {
        return applyFramerMotionMove(node, op);
      }

      // Default: CSS translate class
      const basePrefix = op.axis === "x" ? "translate-x" : "translate-y";
      const classPattern = `^-?${basePrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(-|$)`;
      const classPatternRe = new RegExp(classPattern);

      // Read existing translate class to accumulate rather than replace
      const existingClasses = getJSXStaticClasses(node.node);
      let existingPx = 0;
      for (const cls of existingClasses) {
        if (classPatternRe.test(cls)) {
          existingPx = parseTranslateClassPx(cls, basePrefix);
          break;
        }
      }

      const totalPx = existingPx + op.pxDelta;

      // If net movement is ~0, remove the translate class entirely
      if (Math.abs(totalPx) < 0.5) {
        removeClassByPattern(node, classPatternRe);
        return undefined;
      }

      const isNegative = totalPx < 0;
      const token = snapPxToSpacingToken(Math.abs(totalPx));
      const updates: ClassNameUpdate[] = [{
        tailwindPrefix: isNegative ? `-${basePrefix}` : basePrefix,
        tailwindToken: token,
        value: "",
        classPattern,
      }];
      mutateClassName(j, node, updates);
      return undefined;
    }

    case "duplicateElement": {
      // Handled in Phase 0 of executeBatch (source-level splice).
      return undefined;
    }

    case "deleteElement": {
      // Use jscodeshift's path-based removal — handles all parent types
      // (JSXElement children, return statements, variable declarations, etc.)
      // and correctly updates internal AST references.
      try {
        // For JSX children, we need to also remove surrounding whitespace JSXText nodes
        const parent = node.parent;
        if (parent?.node?.children) {
          const children = parent.node.children;
          const idx = children.indexOf(node.node);
          if (idx >= 0) {
            // Remove trailing whitespace JSXText if it exists
            if (idx + 1 < children.length && children[idx + 1]?.type === "JSXText" &&
                children[idx + 1].value.trim() === "") {
              children.splice(idx, 2);
            }
            // Or remove leading whitespace JSXText
            else if (idx > 0 && children[idx - 1]?.type === "JSXText" &&
                     children[idx - 1].value.trim() === "") {
              children.splice(idx - 1, 2);
            }
            else {
              children.splice(idx, 1);
            }
            return undefined;
          }
        }
        // Fallback: use jscodeshift's prune (handles non-JSX-children cases)
        node.prune();
        return undefined;
      } catch (err) {
        return `Failed to remove element: ${err instanceof Error ? err.message : String(err)}`;
      }
    }

    default: {
      const _exhaustive: never = op;
      return `Unknown operation type: ${_exhaustive}`;
    }
  }
}

// ── String literal fallback for text edits ──────────────────────────────

/**
 * Fallback for text edits where the text lives in a JS string literal
 * (e.g. `description: "some text"`) rather than inline JSX.
 * Searches all StringLiteral/Literal nodes in the file for an exact match.
 */
function replaceStringLiteralInFile(
  j: any,
  root: any,
  originalText: string,
  newText: string,
): { replaced: boolean; ambiguous: boolean } {
  const trimmedOriginal = originalText.trim();
  if (!trimmedOriginal) return { replaced: false, ambiguous: false };

  const literalMatches: Array<{ apply: () => void }> = [];

  // Search StringLiteral nodes (babel parser)
  root.find(j.StringLiteral).forEach((p: any) => {
    if (p.node.value === trimmedOriginal) {
      literalMatches.push({
        apply: () => {
          p.node.value = newText.trim();
        },
      });
    }
  });

  // Search Literal nodes (typescript/flow parser)
  try {
    root.find(j.Literal).forEach((p: any) => {
      if (typeof p.node.value === "string" && p.node.value === trimmedOriginal) {
        literalMatches.push({
          apply: () => {
            p.node.value = newText.trim();
          },
        });
      }
    });
  } catch {
    // j.Literal may not exist in all parsers
  }

  // Search TemplateLiteral quasis for the text as a substring
  root.find(j.TemplateLiteral).forEach((p: any) => {
    for (const quasi of p.node.quasis ?? []) {
      if ((p.node.expressions?.length ?? 0) === 0 && quasi.value?.raw === trimmedOriginal) {
        literalMatches.push({
          apply: () => {
            quasi.value.raw = newText.trim();
            quasi.value.cooked = newText.trim();
          },
        });
      }
    }
  });

  if (literalMatches.length === 0) return { replaced: false, ambiguous: false };
  if (literalMatches.length > 1) return { replaced: false, ambiguous: true };
  literalMatches[0].apply();
  return { replaced: true, ambiguous: false };
}

function collapseVisibleWhitespace(value: string): string {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ");
}

function getStaticRenderableText(node: any): string | null {
  if (!node) return "";
  if (node.type === "JSXText") return collapseVisibleWhitespace(node.value ?? "");
  if (node.type === "JSXElement") {
    const parts: string[] = [];
    for (const child of node.children ?? []) {
      const text = getStaticRenderableText(child);
      if (text == null) return null;
      parts.push(text);
    }
    return collapseVisibleWhitespace(parts.join(""));
  }
  if (node.type === "JSXExpressionContainer") {
    const expr = node.expression;
    if (expr?.type === "StringLiteral" || expr?.type === "Literal") {
      return collapseVisibleWhitespace(String(expr.value ?? ""));
    }
    return null;
  }
  return "";
}

function readStringLiteralValue(node: any): string | null {
  if (!node) return null;
  if (node.type === "StringLiteral" || node.type === "Literal") {
    return typeof node.value === "string" ? node.value : null;
  }
  if (node.type === "TemplateLiteral" && (node.expressions?.length ?? 0) === 0) {
    return node.quasis?.[0]?.value?.cooked ?? node.quasis?.[0]?.value?.raw ?? "";
  }
  return null;
}

function writeStringLiteralValue(node: any, value: string): boolean {
  if (!node) return false;
  if (node.type === "StringLiteral" || node.type === "Literal") {
    node.value = value;
    return true;
  }
  if (node.type === "TemplateLiteral" && (node.expressions?.length ?? 0) === 0 && node.quasis?.length === 1) {
    node.quasis[0].value.raw = value;
    node.quasis[0].value.cooked = value;
    return true;
  }
  return false;
}

function getObjectPropertyValueNode(objectExpression: any, propertyName: string): any | null {
  for (const property of objectExpression?.properties ?? []) {
    if (property?.type !== "Property" && property?.type !== "ObjectProperty") continue;
    const keyName =
      property.key?.type === "Identifier"
        ? property.key.name
        : property.key?.type === "StringLiteral" || property.key?.type === "Literal"
          ? String(property.key.value ?? "")
          : null;
    if (keyName === propertyName) {
      return property.value ?? null;
    }
  }
  return null;
}

function resolveVariableDeclaratorByName(j: any, root: any, name: string): any | null {
  const matches = root.find(j.VariableDeclarator, {
    id: { type: "Identifier", name },
  }).paths();
  if (matches.length !== 1) return null;
  return matches[0];
}

function findEnclosingMapCollectionExpression(elementPath: any, paramName: string): any | null {
  let current = elementPath;
  while (current) {
    const node = current.node;
    if ((node?.type === "ArrowFunctionExpression" || node?.type === "FunctionExpression")) {
      const firstParam = node.params?.[0];
      if (firstParam?.type === "Identifier" && firstParam.name === paramName) {
        const callNode = current.parent?.node;
        if (
          callNode?.type === "CallExpression" &&
          callNode.callee?.type === "MemberExpression" &&
          !callNode.callee.computed &&
          callNode.callee.property?.type === "Identifier" &&
          callNode.callee.property.name === "map"
        ) {
          return callNode.callee.object;
        }
      }
    }
    current = current.parent;
  }
  return null;
}

function resolveExpressionLiteralCandidates(j: any, root: any, elementPath: any, expression: any): any[] {
  if (!expression) return [];

  if (expression.type === "Identifier") {
    const declarator = resolveVariableDeclaratorByName(j, root, expression.name);
    const valueNode = declarator?.node?.init;
    return readStringLiteralValue(valueNode) != null ? [valueNode] : [];
  }

  if (
    expression.type === "MemberExpression" &&
    !expression.computed &&
    expression.object?.type === "Identifier" &&
    expression.property?.type === "Identifier"
  ) {
    const objectName = expression.object.name;
    const propertyName = expression.property.name;

    const directObjectDeclarator = resolveVariableDeclaratorByName(j, root, objectName);
    const directObjectValue = getObjectPropertyValueNode(directObjectDeclarator?.node?.init, propertyName);
    if (readStringLiteralValue(directObjectValue) != null) {
      return [directObjectValue];
    }

    const collectionExpression = findEnclosingMapCollectionExpression(elementPath, objectName);
    if (collectionExpression?.type === "Identifier") {
      const collectionDeclarator = resolveVariableDeclaratorByName(j, root, collectionExpression.name);
      const arrayExpression = collectionDeclarator?.node?.init;
      if (arrayExpression?.type === "ArrayExpression") {
        return (arrayExpression.elements ?? [])
          .map((element: any) => getObjectPropertyValueNode(element, propertyName))
          .filter((node: any) => readStringLiteralValue(node) != null);
      }
    }
  }

  return [];
}

function replaceBoundStringLiteralInElement(
  j: any,
  root: any,
  elementPath: any,
  originalText: string,
  newText: string,
): boolean {
  const children = elementPath.node.children ?? [];
  if (children.length === 0) return false;

  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child?.type !== "JSXExpressionContainer") continue;

    const candidates = resolveExpressionLiteralCandidates(j, root, elementPath, child.expression);
    if (candidates.length === 0) continue;

    const prefixParts = children.slice(0, index).map(getStaticRenderableText);
    const suffixParts = children.slice(index + 1).map(getStaticRenderableText);
    if ([...prefixParts, ...suffixParts].some((part) => part == null)) continue;

    const prefix = collapseVisibleWhitespace(prefixParts.join(""));
    const suffix = collapseVisibleWhitespace(suffixParts.join(""));

    const matchingCandidates = candidates.filter((candidateNode) => {
      const value = readStringLiteralValue(candidateNode);
      return value != null && collapseVisibleWhitespace(`${prefix}${value}${suffix}`) === collapseVisibleWhitespace(originalText);
    });

    if (matchingCandidates.length !== 1) continue;
    if (!collapseVisibleWhitespace(newText).startsWith(prefix) || !collapseVisibleWhitespace(newText).endsWith(suffix)) continue;

    const rawNewValue = newText.slice(prefix.length, newText.length - suffix.length);
    if (writeStringLiteralValue(matchingCandidates[0], rawNewValue)) {
      return true;
    }
  }

  return false;
}

// ── Tailwind spacing scale helpers ──────────────────────────────────────

/**
 * Remove all classes matching a regex pattern from a JSX element's className.
 * Handles StringLiteral, Literal, TemplateLiteral, and CallExpression className forms.
 */
function removeClassByPattern(nodePath: any, pattern: RegExp): void {
  const openingElement = nodePath.node.openingElement;
  const attrs = openingElement?.attributes ?? [];
  const classNameAttr = attrs.find(
    (a: any) => a.type === "JSXAttribute" && a.name?.name === "className"
  );
  if (!classNameAttr?.value) return;

  const val = classNameAttr.value;

  const removeFromStr = (s: string) =>
    s.split(/\s+/).filter((c: string) => c && !pattern.test(c)).join(" ");

  if (val.type === "StringLiteral" || val.type === "Literal") {
    val.value = removeFromStr(val.value);
    return;
  }
  if (val.type === "JSXExpressionContainer") {
    const expr = val.expression;
    if (expr.type === "TemplateLiteral") {
      for (const quasi of expr.quasis ?? []) {
        const raw = quasi.value.raw;
        const leadingWs = raw.match(/^(\s*)/)?.[1] ?? "";
        const trailingWs = raw.match(/(\s*)$/)?.[1] ?? "";
        const cleaned = removeFromStr(raw.trim());
        quasi.value = { raw: `${leadingWs}${cleaned}${trailingWs}`, cooked: `${leadingWs}${cleaned}${trailingWs}` };
      }
      return;
    }
    if (expr.type === "CallExpression") {
      for (const arg of expr.arguments ?? []) {
        if (arg.type === "StringLiteral" || arg.type === "Literal") {
          arg.value = removeFromStr(arg.value ?? "");
        }
      }
    }
  }
}

/** Default Tailwind spacing scale: token → px. Used by the batch engine to
 *  read back existing translate classes and accumulate deltas. */
const SPACING_TOKEN_PX: Record<string, number> = {
  "0": 0, "px": 1, "0.5": 2, "1": 4, "1.5": 6, "2": 8, "2.5": 10,
  "3": 12, "3.5": 14, "4": 16, "5": 20, "6": 24, "7": 28, "8": 32,
  "9": 36, "10": 40, "11": 44, "12": 48, "14": 56, "16": 64,
  "20": 80, "24": 96, "28": 112, "32": 128, "36": 144, "40": 160,
  "44": 176, "48": 192, "52": 208, "56": 224, "60": 240, "64": 256,
  "72": 288, "80": 320, "96": 384,
};

/** Reverse map: px → token for re-snapping. */
const PX_SPACING_TOKEN: Record<number, string> = {};
for (const [token, px] of Object.entries(SPACING_TOKEN_PX)) {
  PX_SPACING_TOKEN[px] = token;
}

/**
 * Parse a Tailwind translate class (e.g., "translate-x-6", "-translate-y-4", "translate-x-[32px]")
 * back to a signed pixel value.
 */
function parseTranslateClassPx(cls: string, basePrefix: string): number {
  const isNeg = cls.startsWith("-");
  // Strip leading "-" and the prefix + "-" to get the token
  const stripped = isNeg ? cls.slice(1) : cls;
  const token = stripped.slice(basePrefix.length + 1); // +1 for the "-" separator

  // Arbitrary value: [Npx]
  const arbMatch = token.match(/^\[(-?\d+(?:\.\d+)?)px\]$/);
  if (arbMatch) {
    return (isNeg ? -1 : 1) * parseFloat(arbMatch[1]);
  }

  // Standard token
  const px = SPACING_TOKEN_PX[token];
  if (px != null) {
    return (isNeg ? -1 : 1) * px;
  }

  return 0; // unknown token, treat as 0
}

/**
 * Snap an absolute pixel value to the nearest Tailwind spacing token.
 * Returns the token name (e.g., "6") or an arbitrary value (e.g., "[32px]").
 */
function snapPxToSpacingToken(absPx: number): string {
  let bestToken: string | null = null;
  let bestDist = Infinity;

  for (const [token, tokenPx] of Object.entries(SPACING_TOKEN_PX)) {
    const dist = Math.abs(absPx - tokenPx);
    if (dist < bestDist) {
      bestDist = dist;
      bestToken = token;
    }
  }

  // Accept if within 15% relative threshold (max 8px)
  if (bestToken !== null && bestDist <= Math.min(absPx * 0.15, 8)) {
    return bestToken;
  }

  return `[${Math.round(absPx)}px]`;
}

// ── Move mechanism detection ─────────────────────────────────────────────

type MoveMechanism = "framer-motion" | "translate-class";

/**
 * Detect which mechanism should be used to apply a move to this element.
 * - framer-motion: element is motion.* with animate prop that ALREADY contains x or y
 *   (only if the animate prop already controls position — don't inject position into
 *   opacity-only or scale-only animations)
 * - translate-class: default for everything else — stacks on top of inline styles
 *   without destroying existing values
 */
function detectMoveMechanism(nodePath: any, axis: "x" | "y"): MoveMechanism {
  const node = nodePath.node;
  const tagName = getJSXTagName(node);
  const attrs = node.openingElement?.attributes ?? [];

  // Check for framer-motion: tag starts with "motion." and animate prop has x/y
  if (tagName?.startsWith("motion.")) {
    const animateProp = attrs.find(
      (a: any) => a.type === "JSXAttribute" && a.name?.name === "animate"
    );
    if (animateProp?.value?.type === "JSXExpressionContainer") {
      const expr = animateProp.value.expression;
      if (expr.type === "ObjectExpression") {
        const propName = axis === "x" ? "x" : "y";
        const hasAxisProp = expr.properties.some(
          (p: any) => p.type === "ObjectProperty" && p.key?.name === propName
        );
        if (hasAxisProp) return "framer-motion";
      }
    }
  }

  return "translate-class";
}

/**
 * Apply move to a framer-motion element by modifying the animate prop's existing x/y value.
 * Only called when detectMoveMechanism confirmed the animate prop already has the axis prop.
 */
function applyFramerMotionMove(nodePath: any, op: Extract<BatchOperation, { op: "moveSpacing" }>): string | undefined {
  const attrs = nodePath.node.openingElement?.attributes ?? [];
  const animateProp = attrs.find(
    (a: any) => a.type === "JSXAttribute" && a.name?.name === "animate"
  );
  if (animateProp?.value?.type !== "JSXExpressionContainer") {
    return "animate prop not found or not an expression";
  }

  const expr = animateProp.value.expression;
  if (expr.type !== "ObjectExpression") {
    return "Cannot modify framer-motion animate prop (not an inline object)";
  }

  const propName = op.axis === "x" ? "x" : "y";
  const existingProp = expr.properties.find(
    (p: any) => p.type === "ObjectProperty" && p.key?.name === propName
  );

  if (!existingProp) {
    // Shouldn't happen — detectMoveMechanism verified this exists
    return `No ${propName} property in animate prop`;
  }

  // Read current numeric value (handles positive literals and unary negation)
  const currentValue = existingProp.value?.type === "NumericLiteral"
    ? existingProp.value.value
    : (existingProp.value?.type === "UnaryExpression" && existingProp.value.operator === "-"
      ? -(existingProp.value.argument?.value ?? 0)
      : 0);

  const newValue = currentValue + op.pxDelta;

  // Write back — use UnaryExpression for negative values to produce "y: -160" not "y: -160"
  if (newValue < 0) {
    existingProp.value = {
      type: "UnaryExpression",
      operator: "-",
      prefix: true,
      argument: { type: "NumericLiteral", value: Math.abs(newValue) },
    };
  } else {
    existingProp.value = { type: "NumericLiteral", value: newValue };
  }

  return undefined;
}

// ── Main entry point ─────────────────────────────────────────────────────

// ── Duplicate element helpers ───────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getLiteralAttributeValue(attrValue: any): string | null {
  if (!attrValue) return null;
  if (attrValue.type === "StringLiteral" || attrValue.type === "Literal") {
    return typeof attrValue.value === "string" ? attrValue.value : null;
  }
  return null;
}

function getDuplicateParentIdentity(nodePath: any): string {
  const parent = nodePath.parent?.node;
  const parentStart = parent?.start ?? "root";
  const parentEnd = parent?.end ?? "root";
  return `${parentStart}:${parentEnd}`;
}

function collectSiblingLiteralKeys(nodePath: any): Set<string> {
  const keys = new Set<string>();
  const parentChildren = nodePath.parent?.node?.children;
  if (!Array.isArray(parentChildren)) return keys;

  for (const sibling of parentChildren) {
    if (sibling?.type !== "JSXElement") continue;
    const keyAttr = (sibling.openingElement?.attributes ?? []).find(
      (a: any) => a.type === "JSXAttribute" && a.name?.name === "key"
    );
    const keyValue = getLiteralAttributeValue(keyAttr?.value);
    if (keyValue) keys.add(keyValue);
  }
  return keys;
}

function pickUniqueDuplicateKey(originalKey: string, usedKeys: Set<string>): string {
  let candidate = `${originalKey}-copy`;
  let suffix = 2;
  while (usedKeys.has(candidate)) {
    candidate = `${originalKey}-copy-${suffix}`;
    suffix++;
  }
  usedKeys.add(candidate);
  return candidate;
}

function deduplicateKey(
  jsxText: string,
  nodePath: any,
  reservedKeysByParent: Map<string, Set<string>>,
): string {
  const attrs = nodePath.node.openingElement?.attributes ?? [];
  const keyAttr = attrs.find(
    (a: any) => a.type === "JSXAttribute" && a.name?.name === "key"
  );
  if (!keyAttr?.value) return jsxText;
  const originalKey = getLiteralAttributeValue(keyAttr.value);
  if (!originalKey) return jsxText;

  const parentIdentity = getDuplicateParentIdentity(nodePath);
  let usedKeys = reservedKeysByParent.get(parentIdentity);
  if (!usedKeys) {
    usedKeys = collectSiblingLiteralKeys(nodePath);
    reservedKeysByParent.set(parentIdentity, usedKeys);
  }

  const newKey = pickUniqueDuplicateKey(originalKey, usedKeys);
  return jsxText.replace(
    new RegExp(`key=(["'])${escapeRegex(originalKey)}\\1`),
    (_match, quote: string) => `key=${quote}${newKey}${quote}`,
  );
}

function getTextLikeNodeValue(node: any): string {
  if (!node) return "";
  if (node.type === "JSXText") return node.value ?? "";
  if (node.type === "JSXExpressionContainer") {
    const value = getLiteralAttributeValue(node.expression);
    return value ?? "";
  }
  return "";
}

function getLeadingInlineSeparator(text: string): string {
  if (!text) return "";
  const trimmedLeadingWhitespace = text.match(/^[\t\n\f\r ]+/)?.[0] ?? "";
  const remainder = text.slice(trimmedLeadingWhitespace.length);
  if (!remainder) return trimmedLeadingWhitespace;

  const punctuationMatch = remainder.match(/^(?:[,;:/|]\s*)+/)?.[0] ?? "";
  if (punctuationMatch) {
    return trimmedLeadingWhitespace + punctuationMatch;
  }

  return trimmedLeadingWhitespace;
}

function getTrailingInlineSeparator(text: string): string {
  if (!text) return "";
  const trailingWhitespace = text.match(/[\t\n\f\r ]+$/)?.[0] ?? "";
  const prefix = text.slice(0, text.length - trailingWhitespace.length);
  const punctuationMatch = prefix.match(/(?:[,;:/|]\s*)+$/)?.[0] ?? "";
  if (punctuationMatch) {
    return punctuationMatch + trailingWhitespace;
  }
  return trailingWhitespace;
}

function extractInlineDuplicateSeparator(source: string, nodePath: any): string {
  const parentChildren = nodePath.parent?.node?.children;
  if (!Array.isArray(parentChildren)) return "";

  const nodeIndex = parentChildren.indexOf(nodePath.node);
  if (nodeIndex === -1) return "";

  const nextSibling = parentChildren[nodeIndex + 1];
  if (nextSibling) {
    const between = source.slice(nodePath.node.end ?? 0, nextSibling.start ?? nodePath.node.end ?? 0);
    if (between.length > 0) {
      return between;
    }

    const nextValue = getTextLikeNodeValue(nextSibling);
    const nextSeparator = getLeadingInlineSeparator(nextValue);
    if (nextSeparator) return nextSeparator;
  }

  const previousSibling = parentChildren[nodeIndex - 1];
  if (previousSibling) {
    const between = source.slice(previousSibling.end ?? nodePath.node.start ?? 0, nodePath.node.start ?? 0);
    if (between.length > 0) {
      return between;
    }

    const previousValue = getTextLikeNodeValue(previousSibling);
    return getTrailingInlineSeparator(previousValue);
  }

  return "";
}

interface SourceSplice {
  offset: number;
  insert: string;
}

function buildDuplicateSplice(
  source: string,
  nodePath: any,
  reservedKeysByParent: Map<string, Set<string>>,
): SourceSplice | null {
  const node = nodePath.node;
  const start = node.start;
  const end = node.end;
  if (start == null || end == null) return null;
  const subtreeText = source.slice(start, end);
  const processedText = deduplicateKey(subtreeText, nodePath, reservedKeysByParent);

  // Determine if this is an inline child (e.g. <a> inside <p>) or a block-level sibling.
  // Check if the element is on its own line: if the text between the previous newline
  // and the element start is only whitespace, it's block-level and gets newline+indent.
  // Otherwise it's inline and gets inserted with the same separator that follows it.
  const lineStart = source.lastIndexOf("\n", start) + 1;
  const textBeforeOnLine = source.slice(lineStart, start);
  const isBlockLevel = textBeforeOnLine.trim() === "";

  if (isBlockLevel) {
    const indent = textBeforeOnLine;
    return { offset: end, insert: "\n" + indent + processedText };
  }

  // Inline element — reuse the separator that currently follows the element
  // so duplicates preserve punctuation and spacing within prose.
  const separator = extractInlineDuplicateSeparator(source, nodePath);

  return { offset: end, insert: separator + processedText };
}

export function executeBatch(
  operations: BatchOperation[],
  projectRoot: string,
): BatchResult {
  const results: OperationResult[] = new Array(operations.length);
  const undoEntries: BatchResult["undoEntries"] = [];

  // Group operations by file
  const byFile = new Map<string, Array<{ index: number; op: BatchOperation }>>();

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    const file = op.file;
    const group = byFile.get(file) ?? [];
    group.push({ index: i, op });
    byFile.set(file, group);
  }

  // Process each file atomically
  for (const [file, ops] of byFile) {
    // Validate file path
    if (!isProjectFilePathSafe(file, projectRoot)) {
      for (const { index, op } of ops) {
        results[index] = {
          op: op.op,
          file,
          line: getOpLine(op),
          success: false,
          error: "File path is outside the project root",
        };
      }
      continue;
    }

    const resolvedPath = resolveProjectFilePath(file, projectRoot);
    if (!resolvedPath) {
      for (const { index, op } of ops) {
        results[index] = {
          op: op.op,
          file,
          line: getOpLine(op),
          success: false,
          error: "Could not resolve file path",
        };
      }
      continue;
    }

    let source: string;
    try {
      source = fs.readFileSync(resolvedPath, "utf-8");
    } catch (err) {
      for (const { index, op } of ops) {
        results[index] = {
          op: op.op,
          file,
          line: getOpLine(op),
          success: false,
          error: `Failed to read file: ${err instanceof Error ? err.message : String(err)}`,
        };
      }
      continue;
    }

    const beforeContent = source;

    if (isMdxTextFile(resolvedPath)) {
      logger.info(`[MDX] Processing MDX file: ${resolvedPath}`);
      let currentSource = source;
      let fileHasChanges = false;

      for (const { index, op } of ops) {
        const line = getOpLine(op);

        if (op.op !== "updateText") {
          results[index] = {
            op: op.op,
            file,
            line,
            success: false,
            error: `Operation "${op.op}" is not supported for markdown/MDX files`,
          };
          continue;
        }

        try {
          const result = applyMdxTextEdit(
            currentSource,
            op.line,
            op.col,
            op.originalText,
            op.newText,
            op.cursorOffset,
            op.textAnchor,
          );

          logger.info(`[MDX] applyMdxTextEdit result: changed=${result.changed}, error=${result.error || "none"}, originalText="${op.originalText?.slice(0, 40)}", newText="${op.newText?.slice(0, 40)}"`);

          if (result.error) {
            results[index] = {
              op: op.op,
              file,
              line,
              success: false,
              error: result.error,
            };
            continue;
          }

          currentSource = result.source;
          fileHasChanges = fileHasChanges || result.changed;
          results[index] = {
            op: op.op,
            file,
            line,
            success: result.changed,
            error: result.changed ? undefined : "Text matched but no change produced",
          };
        } catch (err) {
          results[index] = {
            op: op.op,
            file,
            line,
            success: false,
            error: err instanceof Error ? err.message : String(err),
          };
        }
      }

      if (fileHasChanges) {
        try {
          fs.writeFileSync(resolvedPath, currentSource, "utf-8");
          undoEntries.push({ filePath: resolvedPath, content: beforeContent, afterContent: currentSource });
        } catch (err) {
          for (const { index, op } of ops) {
            results[index] = {
              op: op.op,
              file,
              line: getOpLine(op),
              success: false,
              error: `Failed to write file: ${err instanceof Error ? err.message : String(err)}`,
            };
          }
        }
      }

      continue;
    }

    // Phase 0: Apply duplicateElement splices BEFORE parsing for other ops.
    const duplicateOps = ops.filter(o => o.op.op === "duplicateElement");
    const nonDuplicateOps = ops.filter(o => o.op.op !== "duplicateElement");

    if (duplicateOps.length > 0) {
      const { j: jDup, root: rootDup } = parseSource(source, resolvedPath);
      const splices: SourceSplice[] = [];
      const reservedKeysByParent = new Map<string, Set<string>>();

      for (const { index, op } of duplicateOps) {
        const line = getOpLine(op);
        const tempResolved = resolveNodes(jDup, rootDup, [{ index, op }], resolvedPath);
        const rop = tempResolved[0];
        if (!rop || rop.error || !rop.node) {
          results[index] = {
            op: op.op, file, line,
            success: false,
            error: rop?.error ?? "Could not resolve element for duplication",
          };
          continue;
        }
        const splice = buildDuplicateSplice(source, rop.node, reservedKeysByParent);
        if (!splice) {
          results[index] = {
            op: op.op, file, line,
            success: false,
            error: "Could not extract source range for duplication",
          };
          continue;
        }
        splices.push(splice);
        results[index] = { op: op.op, file, line, success: true };
      }

      splices.sort((a, b) => b.offset - a.offset);
      for (const splice of splices) {
        source = source.slice(0, splice.offset) + splice.insert + source.slice(splice.offset);
      }

      if (nonDuplicateOps.length === 0) {
        if (splices.length > 0) {
          try {
            fs.writeFileSync(resolvedPath, source, "utf-8");
            undoEntries.push({ filePath: resolvedPath, content: beforeContent, afterContent: source });
          } catch (err) {
            for (const { index, op } of duplicateOps) {
              results[index] = {
                op: op.op, file, line: getOpLine(op),
                success: false,
                error: `Failed to write file: ${err instanceof Error ? err.message : String(err)}`,
              };
            }
          }
        }
        continue;
      }
    }

    const { j, root, quoteStyle } = parseSource(source, resolvedPath);

    // Phase 1: Resolve all nodes against the (potentially modified) AST
    const resolved = resolveNodes(j, root, nonDuplicateOps.length > 0 ? nonDuplicateOps : ops, resolvedPath);

    // Phase 2: Coalesce same-node operations
    const coalesced = coalesceOps(resolved);

    // Phase 3: Sort by priority (non-structural first, structural bottom-up)
    coalesced.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      // Within same priority, structural ops go bottom-up (highest line first)
      if (a.priority === 1) {
        const aLine = getOpLine(a.op);
        const bLine = getOpLine(b.op);
        return bLine - aLine;
      }
      return 0;
    });

    // Phase 4: Apply mutations
    let fileHasChanges = false;

    for (const rop of coalesced) {
      const line = getOpLine(rop.op);

      if (rop.error) {
        results[rop.index] = { op: rop.op.op, file, line, success: false, error: rop.error };
        continue;
      }

      try {
        const error = applyOp(j, root, rop, beforeContent);
        if (error) {
          results[rop.index] = { op: rop.op.op, file, line, success: false, error };
        } else {
          results[rop.index] = { op: rop.op.op, file, line, success: true };
          fileHasChanges = true;
        }
      } catch (err) {
        results[rop.index] = {
          op: rop.op.op,
          file,
          line,
          success: false,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }

    // Fill in results for merged ops (they succeed if the primary succeeded)
    for (let i = 0; i < operations.length; i++) {
      if (results[i] === undefined && operations[i].file === file) {
        // This was a merged-away op — mark success
        const op = operations[i];
        results[i] = {
          op: op.op,
          file,
          line: getOpLine(op),
          success: true,
        };
      }
    }

    // Phase 5: Serialize once and write
    if (fileHasChanges) {
      try {
        const afterContent = root.toSource({ quote: quoteStyle });
        fs.writeFileSync(resolvedPath, afterContent, "utf-8");
        undoEntries.push({ filePath: resolvedPath, content: beforeContent, afterContent });
      } catch (err) {
        // Serialization/write failed — mark all ops for this file as failed
        for (const { index, op } of ops) {
          const line = getOpLine(op);
          results[index] = {
            op: op.op,
            file,
            line,
            success: false,
            error: `Failed to write file: ${err instanceof Error ? err.message : String(err)}`,
          };
        }
      }
    }
  }

  // ── MDX fallback: redirect text edits that targeted JSX wrappers ──────
  // When MDX content is compiled and imported by a JSX file, the overlay
  // resolves to the JSX wrapper (e.g., BlogPost.jsx) instead of the .mdx
  // source. Detect this and retry against the actual MDX file.
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i];
    if (op.op !== "updateText") continue;

    const resolvedPath = resolveProjectFilePath(op.file, projectRoot);
    if (!resolvedPath || isMdxTextFile(resolvedPath)) continue; // already handled by MDX path

    // Check if the JSX transform actually modified the right text, or if
    // it matched a coincidental string literal in the wrapper file
    const currentContent = (() => { try { return fs.readFileSync(resolvedPath, "utf-8"); } catch { return null; } })();
    if (!currentContent) continue;

    // If the original text doesn't appear in the JSX source, the JSX transform
    // matched something it shouldn't have — revert and try MDX
    const originalTextNormalized = op.originalText.replace(/\s+/g, " ").trim();
    const sourceHasText = currentContent.replace(/\s+/g, " ").includes(originalTextNormalized);

    // Also check: if the result was a failure, try MDX fallback
    const resultFailed = !results[i]?.success;

    if (resultFailed || !sourceHasText) {
      const mdxFile = findMdxFileContainingText(projectRoot, op.originalText);
      if (mdxFile) {
        logger.info(`[MDX fallback] Redirecting text edit from ${op.file} → ${mdxFile}`);
        try {
          const mdxSource = fs.readFileSync(mdxFile, "utf-8");
          const mdxBefore = mdxSource;
          const mdxResult = applyMdxTextEdit(
            mdxSource,
            op.line,
            op.col,
            op.originalText,
            op.newText,
            op.cursorOffset,
            op.textAnchor,
          );

          logger.info(`[MDX fallback] result: changed=${mdxResult.changed}, error=${mdxResult.error || "none"}`);

          if (mdxResult.error) {
            results[i] = { op: op.op, file: mdxFile, line: op.line, success: false, error: mdxResult.error };
          } else if (mdxResult.changed) {
            fs.writeFileSync(mdxFile, mdxResult.source, "utf-8");
            undoEntries.push({ filePath: mdxFile, content: mdxBefore, afterContent: mdxResult.source });
            results[i] = { op: op.op, file: mdxFile, line: op.line, success: true };
          } else {
            results[i] = { op: op.op, file: mdxFile, line: op.line, success: false, error: "Text found in MDX but no change produced" };
          }
        } catch (err) {
          results[i] = { op: op.op, file: mdxFile, line: op.line, success: false, error: err instanceof Error ? err.message : String(err) };
        }
      }
    }
  }

  return { results, undoEntries };
}
