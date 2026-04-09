import { describe, it, expect, afterEach } from "vitest";
import { applyInsertComponent } from "../insert-transform.js";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

/** Helper to get a fresh copy of a fixture (avoids cross-test pollution). */
function useFixture(name: string): { filePath: string; original: string; cleanup: () => void } {
  const src = path.join(fixturesDir, name);
  const original = fs.readFileSync(src, "utf-8");
  const tmp = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${name}`);
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

describe("applyInsertComponent", () => {
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

  // ── Test 1: Insert inside ────────────────────────────────────────────

  it("inserts a component as last child (inside)", () => {
    const { filePath, original } = setup("insert-target.tsx");
    const pos = findPosition(original, "main");

    const result = applyInsertComponent(filePath, {
      line: pos.line,
      col: pos.col,
      position: "inside",
      componentName: "Button",
      importPath: "@/components/ui/button",
      importNames: ["Button"],
      jsxString: "<Button>Click me</Button>",
    });

    expect(result.success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    // Button should appear inside main
    expect(updated).toContain("<Button>Click me</Button>");
    // Import should be added
    expect(updated).toContain("@/components/ui/button");
    expect(updated).toMatch(/import\s*\{[^}]*Button[^}]*\}\s*from\s*["']@\/components\/ui\/button["']/);
  });

  // ── Test 2: Insert before ────────────────────────────────────────────

  it("inserts a component before a target element", () => {
    const { filePath, original } = setup("insert-target.tsx");
    const pos = findPosition(original, 'div className="sidebar"');

    const result = applyInsertComponent(filePath, {
      line: pos.line,
      col: pos.col,
      position: "before",
      componentName: "Badge",
      importPath: "@/components/ui/badge",
      importNames: ["Badge"],
      jsxString: "<Badge>New</Badge>",
    });

    expect(result.success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("<Badge>New</Badge>");
    // Badge should appear before the sidebar div
    const badgeIdx = updated.indexOf("<Badge>New</Badge>");
    const divIdx = updated.indexOf('<div className="sidebar">');
    expect(badgeIdx).toBeLessThan(divIdx);
  });

  // ── Test 3: Insert after ─────────────────────────────────────────────

  it("inserts a component after a target element", () => {
    const { filePath, original } = setup("insert-target.tsx");
    const pos = findPosition(original, "Card");

    const result = applyInsertComponent(filePath, {
      line: pos.line,
      col: pos.col,
      position: "after",
      componentName: "Input",
      importPath: "@/components/ui/input",
      importNames: ["Input"],
      jsxString: '<Input placeholder="Type here" />',
    });

    expect(result.success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("Input");
    // Input should appear between Card and the sidebar div
    const cardCloseIdx = updated.indexOf("</Card>");
    const inputIdx = updated.indexOf("<Input");
    const divIdx = updated.indexOf('<div className="sidebar">');
    expect(inputIdx).toBeGreaterThan(cardCloseIdx);
    expect(inputIdx).toBeLessThan(divIdx);
  });

  // ── Test 4: Merge import ─────────────────────────────────────────────

  it("merges new import specifier into existing import from same path", () => {
    const { filePath, original } = setup("insert-imports.tsx");
    const pos = findPosition(original, "Card");

    const result = applyInsertComponent(filePath, {
      line: pos.line,
      col: pos.col,
      position: "inside",
      componentName: "CardHeader",
      importPath: "@/components/ui/card",
      importNames: ["CardHeader"],
      jsxString: "<CardHeader>Title</CardHeader>",
    });

    expect(result.success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("<CardHeader>Title</CardHeader>");
    // CardHeader should be merged into the existing Card import, not a separate line
    const cardImportLines = updated.split("\n").filter((l: string) =>
      l.includes("@/components/ui/card"),
    );
    expect(cardImportLines).toHaveLength(1);
    expect(cardImportLines[0]).toContain("Card");
    expect(cardImportLines[0]).toContain("CardHeader");
  });

  // ── Test 5: Skip duplicate import ────────────────────────────────────

  it("does not create duplicate import when specifier already exists", () => {
    const { filePath, original } = setup("insert-imports.tsx");
    const pos = findPosition(original, "Card");

    const result = applyInsertComponent(filePath, {
      line: pos.line,
      col: pos.col,
      position: "inside",
      componentName: "Button",
      importPath: "@/components/ui/button",
      importNames: ["Button"],
      jsxString: "<Button>Another</Button>",
    });

    expect(result.success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("<Button>Another</Button>");
    // Should not have duplicate Button import lines
    const buttonImportLines = updated.split("\n").filter((l: string) =>
      l.includes("@/components/ui/button"),
    );
    expect(buttonImportLines).toHaveLength(1);
  });
});
