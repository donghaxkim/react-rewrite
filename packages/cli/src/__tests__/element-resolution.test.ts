import { describe, it, expect, afterEach } from "vitest";
import { executeBatch } from "../batch-transform.js";
import type { BatchOperation } from "@react-rewrite/shared";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

/** Write a temp fixture and return helpers. */
function writeFixture(name: string, content: string) {
  const tmp = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${name}`);
  fs.writeFileSync(tmp, content, "utf-8");
  return {
    filePath: tmp,
    cleanup: () => {
      try { fs.unlinkSync(tmp); } catch {}
    },
  };
}

describe("element-resolution: deterministic chain", () => {
  let cleanups: Array<() => void> = [];
  afterEach(() => {
    for (const fn of cleanups) fn();
    cleanups = [];
  });

  function setup(name: string, content: string) {
    const f = writeFixture(name, content);
    cleanups.push(f.cleanup);
    return f;
  }

  // ── 1. Exact line:col match ─────────────────────────────────────────

  it("resolves element at exact line:col (happy path)", () => {
    const src = `export default function App() {
  return (
    <div className="p-4">
      <span className="text-red-500">Hello</span>
    </div>
  );
}`;
    const { filePath } = setup("exact-match.tsx", src);
    // <span> is at line 4, col 6
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: 4, col: 6,
        tagName: "span", className: "text-red-500",
        updates: [{ tailwindPrefix: "text", tailwindToken: "blue-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("text-blue-500");
  });

  // ── 2. Fallback: fuzzy resolution within component scope ────────────

  it("resolves via fallback when line:col drifts but hints match", () => {
    const src = `export default function App() {
  return (
    <div className="p-4">
      <span id="greeting" className="text-red-500">Hello</span>
    </div>
  );
}`;
    const { filePath } = setup("fallback-match.tsx", src);
    // Give a wrong line (999) but correct hints
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: 999, col: 6,
        tagName: "span", id: "greeting", className: "text-red-500",
        updates: [{ tailwindPrefix: "text", tailwindToken: "blue-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("text-blue-500");
  });

  // ── 3. Disambiguation by nthOfType ──────────────────────────────────

  it("disambiguates multiple <div> siblings by nthOfType", () => {
    const src = `export default function App() {
  return (
    <div className="container">
      <div className="first">A</div>
      <div className="second">B</div>
      <div className="third">C</div>
    </div>
  );
}`;
    const { filePath } = setup("nth-of-type.tsx", src);
    // Target the second <div> child (nthOfType=1, 0-indexed)
    // Give wrong line so it falls through to fuzzy
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: 999, col: 6,
        tagName: "div", className: "second", nthOfType: 1,
        updates: [{ tailwindPrefix: "bg", tailwindToken: "red-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    // "second" div should get bg-red-500, not "first" or "third"
    expect(updated).toContain('className="second bg-red-500"');
    expect(updated).not.toMatch(/className="first[^"]*bg-red-500/);
    expect(updated).not.toMatch(/className="third[^"]*bg-red-500/);
  });

  // ── 4. Disambiguation by id ─────────────────────────────────────────

  it("disambiguates by id attribute", () => {
    const src = `export default function App() {
  return (
    <div className="wrapper">
      <div className="card" id="card-a">A</div>
      <div className="card" id="card-b">B</div>
    </div>
  );
}`;
    const { filePath } = setup("id-disambig.tsx", src);
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: 999, col: 0,
        tagName: "div", id: "card-b", className: "card",
        updates: [{ tailwindPrefix: "bg", tailwindToken: "blue-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    // The className appears before id in the source, so check both are present on that element
    expect(updated).toContain('className="card bg-blue-500" id="card-b"');
    expect(updated).not.toContain('className="card bg-blue-500" id="card-a"');
  });

  // ── 5. Disambiguation by jsxKey ─────────────────────────────────────

  it("disambiguates by key prop", () => {
    const src = `export default function App() {
  return (
    <ul>
      <li key="alpha" className="item">Alpha</li>
      <li key="beta" className="item">Beta</li>
    </ul>
  );
}`;
    const { filePath } = setup("key-disambig.tsx", src);
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: 999, col: 0,
        tagName: "li", jsxKey: "beta", className: "item",
        updates: [{ tailwindPrefix: "bg", tailwindToken: "green-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    // Only the beta item should get bg-green-500
    expect(updated).toMatch(/key="beta"[^>]*bg-green-500/);
    expect(updated).not.toMatch(/key="alpha"[^>]*bg-green-500/);
  });

  // ── 6. Staleness detection ──────────────────────────────────────────

  it("fails with staleness error when mtime/size mismatch", () => {
    const src = `export default function App() {
  return <div className="p-4">Hi</div>;
}`;
    const { filePath } = setup("stale.tsx", src);
    // Pass a deliberately wrong mtime to trigger staleness
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: 2, col: 9,
        tagName: "div",
        fileMtime: 1, // deliberately stale
        fileSize: 999, // deliberately wrong
        updates: [{ tailwindPrefix: "bg", tailwindToken: "red-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(false);
    expect(result.results[0].error).toMatch(/stale|modified/i);
  });

  // ── 7. No match at all → loud failure ───────────────────────────────

  it("fails loudly when no element matches any hint", () => {
    const src = `export default function App() {
  return <div className="p-4">Only one div</div>;
}`;
    const { filePath } = setup("no-match.tsx", src);
    const result = executeBatch(
      [{
        op: "updateClass", file: filePath, line: 999, col: 0,
        tagName: "section", className: "nonexistent",
        updates: [{ tailwindPrefix: "bg", tailwindToken: "red-500", value: "" }],
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(false);
    expect(result.results[0].error).toBeDefined();
  });

  // ── 8. moveSpacing: negative margin cleanup ─────────────────────────

  it("cleans existing translate before applying new translate", () => {
    const src = `export default function App() {
  return <div className="-translate-y-4 p-2">Content</div>;
}`;
    const { filePath } = setup("neg-translate.tsx", src);
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 2, col: 9,
        axis: "y", token: "8", pxDelta: 48, direction: "positive", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("translate-y-8");
    expect(updated).not.toContain("-translate-y-4");
  });

  it("applies negative translate for negative direction", () => {
    const src = `export default function App() {
  return <div className="translate-y-4 p-2">Content</div>;
}`;
    const { filePath } = setup("pos-to-neg-translate.tsx", src);
    const result = executeBatch(
      [{
        op: "moveSpacing", file: filePath, line: 2, col: 9,
        axis: "y", token: "8", pxDelta: -48, direction: "negative", layoutContext: "block",
      }],
      path.dirname(filePath),
    );
    expect(result.results[0].success).toBe(true);
    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("-translate-y-8");
    expect(updated).not.toContain("translate-y-4");
  });
});
