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

// ── Node resolution ──────────────────────────────────────────────────────

function resolveNodes(
  j: any,
  root: any,
  ops: Array<{ index: number; op: BatchOperation }>,
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

    // All other ops use line:col resolution
    const node = findJSXElementAt(j, root, op.line, op.col);
    if (!node) {
      resolved.push({
        index,
        op,
        node: null,
        priority: 0,
        error: `No JSX element found at ${op.line}:${op.col}`,
      });
      continue;
    }

    // Cross-validate component name if provided
    if (op.componentName) {
      const nodeName = node.node.openingElement?.name;
      const actualName =
        nodeName?.type === "JSXIdentifier" ? nodeName.name :
        nodeName?.type === "JSXMemberExpression"
          ? `${nodeName.object?.name}.${nodeName.property?.name}`
          : null;
      // Only warn, don't fail — component name might be the wrapper, not the tag
      if (actualName && actualName !== op.componentName) {
        // Soft mismatch — proceed but log
      }
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
      // Convert move intent to a className update
      const prefix = getMovePrefix(op.axis, op.direction, op.layoutContext);
      const updates: ClassNameUpdate[] = [{
        tailwindPrefix: prefix,
        tailwindToken: op.token,
        value: "", // token is the tailwind token itself
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
    const resolved = resolveNodes(j, root, ops);

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
