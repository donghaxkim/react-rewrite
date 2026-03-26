// packages/cli/src/batch-transform.ts
// Batch transform engine — groups operations by file, resolves nodes against
// the original AST, applies all mutations atomically (parse once, write once).

import * as fs from "node:fs";
import type { BatchOperation } from "@frameup/shared";
import {
  parseSource,
  findJSXElementAt,
  mutateClassName,
  mutateTextContent,
  mutateReorder,
  type ClassNameUpdate,
} from "./transform.js";
import { resolveProjectFilePath, isProjectFilePathSafe } from "./path-resolver.js";

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
        const currentSize = stat.size;
        if (currentMtime !== op.fileMtime || currentSize !== op.fileSize) {
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
      if (actualTag && actualTag !== op.tagName) {
        // Exact position hit wrong tag — clear and fall through
        node = null;
      }
    }

    // ── Step B: Fallback — fuzzy resolution using hints ──────────────
    if (!node && op.tagName) {
      const candidates: any[] = [];
      root.find(j.JSXElement).forEach((p: any) => {
        if (getJSXTagName(p.node) === op.tagName) {
          candidates.push(p);
        }
      });

      if (candidates.length === 1) {
        // Only one element with that tag name — use it
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

        // B3: Filter by className subset match
        if (!node && op.className) {
          const byClass = candidates.filter((p: any) => {
            const astClasses = getJSXStaticClasses(p.node);
            return classNameSubsetMatch(astClasses, op.className!);
          });
          if (byClass.length === 1) {
            node = byClass[0];
          } else if (byClass.length > 1 && op.nthOfType != null) {
            // B4: Among className matches, disambiguate by nthOfType
            const match = byClass.find((p: any) => computeASTNthOfType(p) === op.nthOfType);
            if (match) node = match;
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

function applyOp(j: any, root: any, rop: ResolvedOp): string | undefined {
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
      const found = mutateTextContent(node, op.originalText, op.newText);
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
      const prefix = getMovePrefix(op.axis, op.direction, op.layoutContext);

      // Move-scoped: remove both positive and negative variants before applying
      const openingElement = node.node.openingElement;
      const attrs = openingElement?.attributes ?? [];
      const classNameAttr = attrs.find(
        (a: any) => a.type === "JSXAttribute" && a.name?.name === "className"
      );
      if (classNameAttr?.value) {
        const val = classNameAttr.value;
        if (val.type === "StringLiteral" || val.type === "Literal") {
          const classes = val.value.split(/\s+/).filter(Boolean);
          val.value = classes.filter((c: string) => {
            if (c.startsWith(`${prefix}-`) || c === prefix) return false;
            if (c.startsWith(`-${prefix}-`) || c === `-${prefix}`) return false;
            return true;
          }).join(" ");
        }
      }

      const updates: ClassNameUpdate[] = [{
        tailwindPrefix: prefix,
        tailwindToken: op.token,
        value: "",
      }];
      mutateClassName(j, node, updates);
      return undefined;
    }

    default:
      return `Unknown operation type: ${(op as any).op}`;
  }
}

/**
 * Determine the Tailwind prefix for a move based on axis, direction, and layout context.
 */
function getMovePrefix(
  axis: "x" | "y",
  direction: "positive" | "negative",
  layout: "flex" | "grid" | "block" | "positioned",
): string {
  if (layout === "positioned") {
    // Positioned elements: use top/left/right/bottom
    if (axis === "x") return direction === "positive" ? "left" : "right";
    return direction === "positive" ? "top" : "bottom";
  }

  // Flow layout (flex, grid, block): use margin
  if (axis === "x") return direction === "positive" ? "ml" : "mr";
  return direction === "positive" ? "mt" : "mb";
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
          line: "line" in op ? op.line : (op as any).fromLine,
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
          line: "line" in op ? op.line : (op as any).fromLine,
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
          line: "line" in op ? op.line : (op as any).fromLine,
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
        const aLine = "fromLine" in a.op ? a.op.fromLine : a.op.line;
        const bLine = "fromLine" in b.op ? b.op.fromLine : b.op.line;
        return bLine - aLine;
      }
      return 0;
    });

    // Phase 4: Apply mutations
    let fileHasChanges = false;

    for (const rop of coalesced) {
      const line = "line" in rop.op ? rop.op.line : (rop.op as any).fromLine;

      if (rop.error) {
        results[rop.index] = { op: rop.op.op, file, line, success: false, error: rop.error };
        continue;
      }

      try {
        const error = applyOp(j, root, rop);
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
          line: "line" in op ? op.line : (op as any).fromLine,
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
          const line = "line" in op ? op.line : (op as any).fromLine;
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
