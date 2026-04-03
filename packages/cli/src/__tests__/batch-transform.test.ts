import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { executeBatch } from "../batch-transform.js";
import type { BatchOperation, TextEditAnchor } from "@react-rewrite/shared";
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

function findMarkdownPosition(source: string, snippet: string): { line: number; col: number } {
  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const col = lines[i].indexOf(snippet);
    if (col !== -1) return { line: i + 1, col };
  }
  throw new Error(`Markdown snippet "${snippet}" not found`);
}

function buildTextEditAnchor(originalText: string, newText: string): TextEditAnchor | undefined {
  if (originalText === newText) return undefined;

  let start = 0;
  while (start < originalText.length && start < newText.length && originalText[start] === newText[start]) {
    start++;
  }

  let oldEnd = originalText.length;
  let newEnd = newText.length;
  while (oldEnd > start && newEnd > start && originalText[oldEnd - 1] === newText[newEnd - 1]) {
    oldEnd--;
    newEnd--;
  }

  return {
    start,
    end: oldEnd,
    contextBefore: originalText.slice(Math.max(0, start - 32), start),
    contextAfter: originalText.slice(oldEnd, Math.min(originalText.length, oldEnd + 32)),
  };
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

  it("applies anchored text insertion in a paragraph with repeated inline content", () => {
    const source = `function App() {\n  return (\n    <p>i study <strong>math</strong> at <strong>waterloo</strong> and enjoy software. i talk about random things at <strong>@imdonghakim</strong> on <a href="https://instagram.com/imdonghakim">instagram</a>, <a href="https://tiktok.com/@imdonghakim">tiktok</a>, and <a href="https://x.com/imdonghakim">x</a>.</p>\n  );\n}`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_anchored-text.tsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const originalText = "i study math at waterloo and enjoy software. i talk about random things at @imdonghakim on instagram, tiktok, and x.";
    const newText = "i study math at waterloo and enjoy software. hello my name is jeff i talk about random things at @imdonghakim on instagram, tiktok, and x.";

    const result = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: 3,
        col: 4,
        originalText,
        newText,
        textAnchor: buildTextEditAnchor(originalText, newText),
      }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("and enjoy software. hello my name is jeff i talk about random things");
    expect(updated).not.toContain("shello my name is jeff oftware");
  });

  it("applies anchored text insertion when the source text crosses indented JSX lines", () => {
    const source = `function App() {\n  return (\n    <p>i study{' '}<strong>math</strong>{' '}at{' '}<strong>waterloo</strong>{' '}and enjoy software. i talk about\n      random things at{' '}<strong>@imdonghakim</strong>{' '}on{' '}<a href=\"https://instagram.com/imdonghakim\">instagram</a>,{' '}<a href=\"https://tiktok.com/@imdonghakim\">tiktok</a>, and{' '}<a href=\"https://x.com/imdonghakim\">x</a>.\n      i like playing basketball.</p>\n  );\n}`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_anchored-multiline.tsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const originalText = "i study math at waterloo and enjoy software. i talk about random things at @imdonghakim on instagram, tiktok, and x. i like playing basketball.";
    const newText = "i study math at waterloo and enjoy software. i talk about hello my name is jeff random things at @imdonghakim on instagram, tiktok, and x. i like playing basketball.";

    const result = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: 3,
        col: 4,
        originalText,
        newText,
        textAnchor: buildTextEditAnchor(originalText, newText),
      }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("i talk about");
    expect(updated).toContain("hello my name is jeff random things");
    expect(updated).not.toContain("randhello my name is jeff om things");
  });

  it("collapses whitespace-node pollution after a text update", () => {
    const source = `function App() {\n  return (\n    <p>i study{' '}{' '}{' '}{' '}{' '}{' '}{' '}<strong>math</strong>{' '}{' '}{' '}{' '}{' '}{' '}{' '}at{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}{' '}<strong>waterloo</strong>{' '}{' '}{' '}{' '}{' '}{' '}{' '}and enjoy software.</p>\n  );\n}`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_cleanup.tsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const originalText = "i study math at waterloo and enjoy software.";
    const newText = "i study math at waterloo and really enjoy software.";

    const result = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: 3,
        col: 4,
        originalText,
        newText,
        textAnchor: buildTextEditAnchor(originalText, newText),
      }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("really enjoy software");
    expect(updated).not.toContain("{' '}{' '}{' '}{' '}{' '}{' '}{' '}");
  });

  it("preserves existing explicit boundary spaces during unrelated class updates", () => {
    const source = `function App() {\n  return (\n    <section>\n      <p>hello <strong>world</strong>{' '}{' '}again</p>\n      <div className="bg-white">card</div>\n    </section>\n  );\n}`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_class-whitespace.tsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const pos = findPosition(source, "div className=\"bg-white\"");
    const result = executeBatch(
      [{
        op: "updateClass",
        file: filePath,
        line: pos.line,
        col: pos.col,
        updates: [{ tailwindPrefix: "bg", tailwindToken: "red-500", value: "" }],
      }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("bg-red-500");
    expect(updated).toContain("</strong>{' '}{' '}again");
  });

  it("duplicates keyed elements with unique keys across repeated duplicates", () => {
    const source = `function App() {\n  return (\n    <div>\n      <span key="chip">First</span>\n      <span key="next">Next</span>\n    </div>\n  );\n}`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_duplicate-keys.tsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const pos = findPosition(source, "span key=\"chip\"");

    const first = executeBatch(
      [{ op: "duplicateElement", file: filePath, line: pos.line, col: pos.col }],
      path.dirname(filePath),
    );
    expect(first.results[0].success).toBe(true);

    const second = executeBatch(
      [{ op: "duplicateElement", file: filePath, line: pos.line, col: pos.col }],
      path.dirname(filePath),
    );
    expect(second.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain('key="chip-copy"');
    expect(updated).toContain('key="chip-copy-2"');
  });

  it("duplicates inline elements using the separator that follows them", () => {
    const source = `function App() {\n  return (\n    <p>on <a href="#1">instagram</a>, <a href="#2">tiktok</a>, and <a href="#3">x</a>.</p>\n  );\n}`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_duplicate-inline.tsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const pos = findPosition(source, "a href=\"#1\"");
    const result = executeBatch(
      [{ op: "duplicateElement", file: filePath, line: pos.line, col: pos.col }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain('<a href="#1">instagram</a>, <a href="#1">instagram</a>, <a href="#2">tiktok</a>');
  });

  it("updates mapped object-property text by rewriting the backing string literal", () => {
    const source = `const Projects = () => {\n  const projects = [\n    { name: "react-rewrite", description: "Figma for your localhost." },\n    { name: "UW GitRank", description: "Waterloo student GitHub rankings." },\n  ];\n\n  return (\n    <div>\n      {projects.map((project) => (\n        <section key={project.name}>\n          <h2>{project.name}</h2>\n          <p>{project.description}</p>\n        </section>\n      ))}\n    </div>\n  );\n};\n`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_mapped-literals.jsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const result = executeBatch(
      [
        { op: "updateText", file: filePath, line: 3, col: 12, originalText: "react-rewrite", newText: "React Rewrite" },
        { op: "updateText", file: filePath, line: 4, col: 12, originalText: "UW GitRank", newText: "UW Git Rank" },
      ],
      path.dirname(filePath),
    );

    expect(result.results.every(r => r.success)).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain('name: "React Rewrite"');
    expect(updated).toContain('name: "UW Git Rank"');
    expect(updated).toContain('<h2>{project.name}</h2>');
  });

  it("updates repeated edits against a mixed static-plus-bound description without jumping", () => {
    const source = `const Projects = () => {\n  const projects = [\n    { description: "Waterloo student GitHub rankings scored by stars, PRs, commits, peer endorsements, and pvp repository battles." },\n  ];\n\n  return (\n    <div>\n      {projects.map((project) => (\n        <p key={project.description}>yo{project.description}</p>\n      ))}\n    </div>\n  );\n};\n`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_mixed-bound-text.jsx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });
    const pos = findPosition(source, "p key={project.description}");

    const first = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: pos.line,
        col: pos.col,
        originalText: "yoWaterloo student GitHub rankings scored by stars, PRs, commits, peer endorsements, and pvp repository battles.",
        newText: "yoWaterloo student GitHub rankings scored by stars, PRs, commits, peer endorsements, and pvp repo battles.",
      }],
      path.dirname(filePath),
    );
    expect(first.results[0].success).toBe(true);

    const second = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: pos.line,
        col: pos.col,
        originalText: "yoWaterloo student GitHub rankings scored by stars, PRs, commits, peer endorsements, and pvp repo battles.",
        newText: "yoWaterloo student GitHub rankings scored by stars, PRs, commits, peer endorsements, and pvp repo battles for Waterloo.",
      }],
      path.dirname(filePath),
    );
    expect(second.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain('description: "Waterloo student GitHub rankings scored by stars, PRs, commits, peer endorsements, and pvp repo battles for Waterloo."');
    expect(updated).toContain('<p key={project.description}>yo{project.description}</p>');
  });

  it("applies repeated text edits to the same mdx paragraph without drifting", () => {
    const source = `## what is attention

attention isn't some scary, complex, rocket science concept. to explain it simply, attention is a mechanism.
`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_mdx-repeat.mdx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const pos = findMarkdownPosition(source, "attention isn't");
    const firstOriginal = "attention isn't some scary, complex, rocket science concept. to explain it simply, attention is a mechanism.";
    const firstNew = "attention isn't some scary, complex, rocket science concept. to explain it simply, attention is a really important mechanism.";

    const first = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: pos.line,
        col: pos.col,
        originalText: firstOriginal,
        newText: firstNew,
        textAnchor: buildTextEditAnchor(firstOriginal, firstNew),
      }],
      path.dirname(filePath),
    );
    expect(first.results[0].success).toBe(true);

    const secondSource = fs.readFileSync(filePath, "utf-8");
    const secondPos = findMarkdownPosition(secondSource, "attention isn't");
    const secondOriginal = "attention isn't some scary, complex, rocket science concept. to explain it simply, attention is a really important mechanism.";
    const secondNew = "attention isn't some scary, complex, rocket science concept. to explain it simply, attention is a really important mechanism for transformers.";

    const second = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: secondPos.line,
        col: secondPos.col,
        originalText: secondOriginal,
        newText: secondNew,
        textAnchor: buildTextEditAnchor(secondOriginal, secondNew),
      }],
      path.dirname(filePath),
    );
    expect(second.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("attention is a really important mechanism for transformers.");
    expect(updated).not.toContain("{' '}");
  });

  it("preserves markdown formatting when editing mdx inline text", () => {
    const source = `attention lets every word look at *every other word* and decide what is relevant. read the [paper](https://arxiv.org/abs/1706.03762).
`;
    const filePath = path.join(fixturesDir, `_tmp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}_mdx-inline.mdx`);
    fs.writeFileSync(filePath, source, "utf-8");
    fixtures.push({ cleanup: () => { try { fs.unlinkSync(filePath); } catch {} } });

    const pos = findMarkdownPosition(source, "attention lets");
    const originalText = "attention lets every word look at every other word and decide what is relevant. read the paper.";
    const newText = "attention lets every word look at every nearby word and decide what is relevant. read the paper.";

    const result = executeBatch(
      [{
        op: "updateText",
        file: filePath,
        line: pos.line,
        col: pos.col,
        originalText,
        newText,
        textAnchor: buildTextEditAnchor(originalText, newText),
      }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("*every nearby word*");
    expect(updated).toContain("[paper](https://arxiv.org/abs/1706.03762)");
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
         axis: "y", token: "4", pxDelta: 16, direction: "positive", layoutContext: "block" }],
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
         axis: "x", token: "8", pxDelta: -32, direction: "negative", layoutContext: "positioned" }],
      path.dirname(filePath),
    );

    expect(result.results[0].success).toBe(true);

    const updated = fs.readFileSync(filePath, "utf-8");
    expect(updated).toContain("-translate-x-8");
  });

  it("accumulates moveSpacing across sequential applies (same axis)", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const h2Pos = findPosition(original, "h2");

    // First apply: translate-x-6 (24px)
    const result1 = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos.line, col: h2Pos.col,
         axis: "x", token: "6", pxDelta: 24, direction: "positive", layoutContext: "block" }],
      path.dirname(filePath),
    );
    expect(result1.results[0].success).toBe(true);

    // Re-read and re-parse positions for second apply
    const after1 = fs.readFileSync(filePath, "utf-8");
    const h2Pos2 = findPosition(after1, "h2");

    // Second apply: +translate-x-4 (16px) → total 40px = translate-x-10
    const result2 = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos2.line, col: h2Pos2.col,
         axis: "x", token: "4", pxDelta: 16, direction: "positive", layoutContext: "block" }],
      path.dirname(filePath),
    );
    expect(result2.results[0].success).toBe(true);

    const final = fs.readFileSync(filePath, "utf-8");
    expect(final).toContain("translate-x-10");
    expect(final).not.toContain("translate-x-4");
  });

  it("removes translate class when net movement is zero", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const h2Pos = findPosition(original, "h2");

    // First apply: translate-x-6 (24px positive)
    const result1 = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos.line, col: h2Pos.col,
         axis: "x", token: "6", pxDelta: 24, direction: "positive", layoutContext: "block" }],
      path.dirname(filePath),
    );
    expect(result1.results[0].success).toBe(true);

    // Re-read and re-parse positions for second apply
    const after1 = fs.readFileSync(filePath, "utf-8");
    const h2Pos2 = findPosition(after1, "h2");

    // Second apply: -24px to cancel out → net zero
    const result2 = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos2.line, col: h2Pos2.col,
         axis: "x", token: "6", pxDelta: -24, direction: "negative", layoutContext: "block" }],
      path.dirname(filePath),
    );
    expect(result2.results[0].success).toBe(true);

    const final = fs.readFileSync(filePath, "utf-8");
    expect(final).not.toMatch(/translate-x/);
  });

  it("accumulates negative moveSpacing correctly", () => {
    const { filePath, original } = setup("classname-string.tsx");
    const h2Pos = findPosition(original, "h2");

    // First apply: -translate-y-4 (-16px)
    const result1 = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos.line, col: h2Pos.col,
         axis: "y", token: "4", pxDelta: -16, direction: "negative", layoutContext: "block" }],
      path.dirname(filePath),
    );
    expect(result1.results[0].success).toBe(true);

    // Re-read and re-parse positions for second apply
    const after1 = fs.readFileSync(filePath, "utf-8");
    const h2Pos2 = findPosition(after1, "h2");

    // Second apply: -translate-y-2 (-8px) → total -24px = -translate-y-6
    const result2 = executeBatch(
      [{ op: "moveSpacing", file: filePath, line: h2Pos2.line, col: h2Pos2.col,
         axis: "y", token: "2", pxDelta: -8, direction: "negative", layoutContext: "block" }],
      path.dirname(filePath),
    );
    expect(result2.results[0].success).toBe(true);

    const final = fs.readFileSync(filePath, "utf-8");
    expect(final).toContain("-translate-y-6");
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
