// packages/cli/src/batch-transform.ts
// Batch transform engine — groups operations by file, resolves nodes against
// the original AST, applies all mutations atomically (parse once, write once).

import * as fs from "node:fs";
import type { BatchOperation } from "@react-rewrite/shared";
import {
  parseSource,
  findJSXElementAt,
  mutateClassName,
  mutateTextContent,
  mutateReorder,
  type ClassNameUpdate,
} from "./transform.js";
import { resolveProjectFilePath, isProjectFilePathSafe } from "./path-resolver.js";
import { logger } from "./logger.js";

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
    if (rop.op.op === "reorder") {
      // Reorder can't be coalesced
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
      const found = mutateTextContent(node, op.originalText, op.newText, source, op.cursorOffset);
      if (!found) {
        return `No matching text "${op.originalText}" found in element at ${op.line}:${op.col}`;
      }
      return undefined;
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
      const isNegative = op.direction === "negative";
      const classPattern = `^-?${basePrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(-|$)`;
      const updates: ClassNameUpdate[] = [{
        tailwindPrefix: isNegative ? `-${basePrefix}` : basePrefix,
        tailwindToken: op.token,
        value: "",
        classPattern,
      }];
      mutateClassName(j, node, updates);
      return undefined;
    }

    default: {
      const _exhaustive: never = op;
      return `Unknown operation type: ${_exhaustive}`;
    }
  }
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
    const { j, root, quoteStyle } = parseSource(source, resolvedPath);

    // Phase 1: Resolve all nodes against the ORIGINAL AST
    const resolved = resolveNodes(j, root, ops, resolvedPath);

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

  return { results, undoEntries };
}
