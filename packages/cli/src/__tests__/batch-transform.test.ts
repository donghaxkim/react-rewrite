import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { executeBatch } from "../batch-transform.js";
import type { BatchOperation } from "@react-rewrite/shared";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

/** Helper to get a fresh copy of a fixture (avoids cross-test pollution). */
function useFixture(name: string): { filePath: string; original: string; cleanup: () => void } {
  const src = path.join(fixturesDir, name);
  const original = fs.readFileSync(src, "utf-8");
  const tmp = path.join(fixturesDir, `_tmp_${Date.now()}_${name}`);
  fs.writeFileSync(tmp, original, "utf-8");
  return {
    filePath: tmp,
    original,
    cleanup: () => {
      try { fs.unlinkSync(tmp); } catch {}
    },
  };
}

/** Find line:col of an opening JSX tag in source. */
function findPosition(source: string, tag: string): { line: number; col: number } {
  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const col = lines[i].indexOf(`<${tag}`);
    if (col !== -1) return { line: i + 1, col }; // 1-indexed line, 0-indexed col
  }
  throw new Error(`Tag <${tag}> not found`);
}

describe("executeBatch", () => {
  let fixtures: Array<{ cleanup: () => void }> = [];

  afterEach(() => {
    for (const f of fixtures) f.cleanup();
    fixtures = [];
  });

  function setup(name: string) {
    const f = useFixture(name);
    fixtures.push(f);
    return f;
  }

  // ── Single operation tests ───────────────────────────────────────────

  it("applies a single updateClass operation", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const pos = findPosition(original, "div");

    const result = executeBatch(
      [{ op: "updateClass", file: filePath, line: pos.line, col: pos.col, updates: [
        { tailwindPrefix: "bg", tailwindToken: "red-500", value: "" },
      ]}],
      path.dirname(filePath),
    );

    expect(result.results).toHaveLength(1);
    expect(result.results[0].success).toBe(true);
    expect(result.undoEntries).toHaveLength(1);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("bg-red-500");
    expect(updated).not.toContain("bg-white");
  });

  it("applies a single updateText operation", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const pos = findPosition(original, "h2");

    const result = executeBatch(
      [{ op: "updateText", file: filePath, line: pos.line, col: pos.col, originalText: "Title", newText: "New Title" }],
      path.dirname(filePath),
    );

    expect(result.results).toHaveLength(1);
    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("New Title");
    expect(updated).not.toContain(">Title<");
  });

  it("returns failure for updateText with wrong originalText", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const pos = findPosition(original, "h2");

    const result = executeBatch(
      [{ op: "updateText", file: filePath, line: pos.line, col: pos.col, originalText: "Wrong Text", newText: "New" }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(false);
    expect(result.results[0].error).toContain("No matching text");
  });

  // ── Multiple operations on the same file ─────────────────────────────

  it("applies multiple updateClass ops on different elements in one file", () => {
    const { filePath, original } = setup("batch-multi.tsx");
    const divPos = findPosition(original, "div className=\"flex flex-col");
    const h1Pos = findPosition(original, "h1");

    const result = executeBatch(
      [
        { op: "updateClass", file: filePath, line: divPos.line, col: divPos.col, updates: [
          { tailwindPrefix: "bg", tailwindToken: "gray-100", value: "" },
        ]},
        { op: "updateClass", file: filePath, line: h1Pos.line, col: h1Pos.col, updates: [
          { tailwindPrefix: "text", tailwindToken: "blue-900", value: "" },
        ]},
      ],
      path.dirname(filePath),
    );

    expect(result.results.every(r => r.success)).toBe(true);
    expect(result.undoEntries).toHaveLength(1); // single file → single undo entry

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("bg-gray-100");
    expect(updated).toContain("text-blue-900");
  });

  it("applies updateClass + updateText on the same element", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const h2Pos = findPosition(original, "h2");

    const result = executeBatch(
      [
        { op: "updateClass", file: filePath, line: h2Pos.line, col: h2Pos.col, updates: [
          { tailwindPrefix: "text", tailwindToken: "xl", value: "" },
        ]},
        { op: "updateText", file: filePath, line: h2Pos.line, col: h2Pos.col, originalText: "Title", newText: "Updated" },
      ],
      path.dirname(filePath),
    );

    expect(result.results.every(r => r.success)).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("text-xl");
    expect(updated).toContain("Updated");
  });

  // ── Same-node coalescing ─────────────────────────────────────────────

  it("coalesces multiple updateClass ops targeting the same element", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const divPos = findPosition(original, "div");

    const result = executeBatch(
      [
        { op: "updateClass", file: filePath, line: divPos.line, col: divPos.col, updates: [
          { tailwindPrefix: "bg", tailwindToken: "red-500", value: "" },
        ]},
        { op: "updateClass", file: filePath, line: divPos.line, col: divPos.col, updates: [
          { tailwindPrefix: "p", tailwindToken: "8", value: "" },
        ]},
      ],
      path.dirname(filePath),
    );

    // Both should succeed (coalesced into one operation)
    expect(result.results.every(r => r.success)).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("bg-red-500");
    expect(updated).toContain("p-8");
  });

  // ── Reorder in batch ─────────────────────────────────────────────────

  it("applies reorder alongside class updates", () => {
    const { filePath, original } = setup("batch-multi.tsx");
    const h1Pos = findPosition(original, "h1");
    const pPos = findPosition(original, "p");

    // Reorder: move <p> before <h1> + change h1 color
    const result = executeBatch(
      [
        { op: "updateClass", file: filePath, line: h1Pos.line, col: h1Pos.col, updates: [
          { tailwindPrefix: "text", tailwindToken: "red-500", value: "" },
        ]},
        { op: "reorder", file: filePath, fromLine: pPos.line, toLine: h1Pos.line },
      ],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true); // class update
    expect(result.results[1].success).toBe(true); // reorder

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("text-red-500");
    // After reorder, <p> should appear before <h1>
    const pIdx = updated.indexOf("<p ");
    const h1Idx = updated.indexOf("<h1 ");
    expect(pIdx).toBeLessThan(h1Idx);
  });

  // ── moveSpacing operation ────────────────────────────────────────────

  it("applies moveSpacing by adding translate class", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const h2Pos = findPosition(original, "h2");

    const result = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos.line, col: h2Pos.col,
         axis: "y", token: "4", direction: "positive", layoutContext: "block" }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("translate-y-4");
  });

  it("applies moveSpacing with negative direction using negative translate", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const h2Pos = findPosition(original, "h2");

    const result = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos.line, col: h2Pos.col,
         axis: "x", token: "8", direction: "negative", layoutContext: "positioned" }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("-translate-x-8");
  });

  // ── Error handling ───────────────────────────────────────────────────

  it("handles mixed success/failure in a batch", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const divPos = findPosition(original, "div");

    const result = executeBatch(
      [
        // This should succeed
        { op: "updateClass", file: filePath, line: divPos.line, col: divPos.col, updates: [
          { tailwindPrefix: "bg", tailwindToken: "red-500", value: "" },
        ]},
        // This should fail — no element at line 999
        { op: "updateClass", file: filePath, line: 999, col: 0, updates: [
          { tailwindPrefix: "bg", tailwindToken: "blue-500", value: "" },
        ]},
      ],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);
    expect(result.results[1].success).toBe(false);
    expect(result.results[1].error).toContain("No JSX element");

    // The successful operation should still be applied
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("bg-red-500");
  });

  it("rejects file paths outside project root", () => {
    const result = executeBatch(
      [{ op: "updateClass", file: "/etc/passwd", line: 1, col: 0, updates: [
        { tailwindPrefix: "bg", tailwindToken: "red-500", value: "" },
      ]}],
      fixturesDir,
    );

    expect(result.results[0].success).toBe(false);
    expect(result.results[0].error).toContain("outside the project root");
  });

  // ── Undo entries ─────────────────────────────────────────────────────

  it("creates undo entries that can restore original content", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const pos = findPosition(original, "div");

    const result = executeBatch(
      [{ op: "updateClass", file: filePath, line: pos.line, col: pos.col, updates: [
        { tailwindPrefix: "bg", tailwindToken: "red-500", value: "" },
      ]}],
      path.dirname(filePath),
    );

    expect(result.undoEntries).toHaveLength(1);
    expect(result.undoEntries[0].content).toBe(original);
    expect(result.undoEntries[0].afterContent).toContain("bg-red-500");

    // Simulate undo by writing back original content
    fs.writeFileSync(filePath, result.undoEntries[0].content, "utf-8");
    expect(fs.readFileSync(filePath, "utf-8")).toBe(original);
  });

  // ── Priority ordering ────────────────────────────────────────────────

  it("applies non-structural ops before structural (reorder)", () => {
    const { filePath, original } = setup("batch-multi.tsx");
    const h1Pos = findPosition(original, "h1");
    const pPos = findPosition(original, "p");

    // Send reorder first in the array, then class update
    // The engine should apply class update first (priority 0) then reorder (priority 1)
    const result = executeBatch(
      [
        { op: "reorder", file: filePath, fromLine: pPos.line, toLine: h1Pos.line },
        { op: "updateClass", file: filePath, line: h1Pos.line, col: h1Pos.col, updates: [
          { tailwindPrefix: "text", tailwindToken: "purple-500", value: "" },
        ]},
      ],
      path.dirname(filePath),
    );

    expect(result.results.every(r => r.success)).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("text-purple-500");
  });
});
