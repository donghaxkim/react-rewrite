import { describe, expect, it } from "vitest";
import { attachUndoIdsToBatchResults } from "../server.js";

describe("attachUndoIdsToBatchResults", () => {
  it("maps successful results to the undo id for their file", () => {
    const results = [
      { op: "updateClass" as const, file: "/tmp/a.tsx", line: 10, success: true },
      { op: "updateText" as const, file: "/tmp/b.tsx", line: 20, success: true },
      { op: "reorder" as const, file: "/tmp/c.tsx", line: 30, success: false, error: "boom" },
    ];
    const undoEntries = [
      { filePath: "/tmp/a.tsx", content: "before-a", afterContent: "after-a" },
      { filePath: "/tmp/b.tsx", content: "before-b", afterContent: "after-b" },
    ];

    expect(attachUndoIdsToBatchResults(results, undoEntries, ["undo-a", "undo-b"], "/tmp")).toEqual([
      { op: "updateClass", file: "/tmp/a.tsx", line: 10, success: true, undoId: "undo-a" },
      { op: "updateText", file: "/tmp/b.tsx", line: 20, success: true, undoId: "undo-b" },
      { op: "reorder", file: "/tmp/c.tsx", line: 30, success: false, error: "boom", undoId: undefined },
    ]);
  });

  it("resolves relative result paths before attaching undo ids", () => {
    const results = [
      { op: "updateClass" as const, file: "src/a.tsx", line: 10, success: true },
    ];
    const undoEntries = [
      { filePath: "/tmp/project/src/a.tsx", content: "before-a", afterContent: "after-a" },
    ];

    expect(attachUndoIdsToBatchResults(results, undoEntries, ["undo-a"], "/tmp/project")).toEqual([
      { op: "updateClass", file: "src/a.tsx", line: 10, success: true, undoId: "undo-a" },
    ]);
  });
});
