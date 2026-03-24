import { describe, it, expect } from "vitest";
import { updateTextContent } from "../transform.js";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

function withTempFile(source: string, ext: string = ".tsx"): string {
  const tmpDir = os.tmpdir();
  const filePath = path.join(tmpDir, `test-text-${Date.now()}${ext}`);
  fs.writeFileSync(filePath, source, "utf-8");
  return filePath;
}

describe("updateTextContent", () => {
  it("replaces JSXText in a simple element", () => {
    const source = `function App() {\n  return <h1>Hello World</h1>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Hello World", "Goodbye World");
    expect(result).not.toBeNull();
    expect(result).toContain("Goodbye World");
    expect(result).not.toContain("Hello World");
  });

  it("replaces StringLiteral inside JSXExpressionContainer", () => {
    const source = `function App() {\n  return <button>{"Submit"}</button>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Submit", "Send");
    expect(result).not.toBeNull();
    expect(result).toContain('"Send"');
    expect(result).not.toContain('"Submit"');
  });

  it("returns null when text does not match (dynamic expression)", () => {
    const source = `function App() {\n  return <p>{user.name}</p>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "John", "Jane");
    expect(result).toBeNull();
  });

  it("returns null when no JSX element found at position", () => {
    const source = `function App() {\n  return <p>Hello</p>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 99, 0, "Hello", "World");
    expect(result).toBeNull();
  });

  it("replaces only the first matching text child", () => {
    const source = `function App() {\n  return <div>Hello<span>Hello</span></div>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Hello", "Changed");
    expect(result).not.toBeNull();
    expect(result).toContain("Changed");
  });

  it("handles empty newText (user deleted all text)", () => {
    const source = `function App() {\n  return <h1>Title</h1>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Title", "");
    expect(result).not.toBeNull();
    expect(result).not.toContain("Title");
  });

  it("handles JSX text with surrounding whitespace", () => {
    const source = `function App() {\n  return (\n    <h1>\n      Welcome\n    </h1>\n  );\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 3, 4, "Welcome", "Hello");
    expect(result).not.toBeNull();
    expect(result).toContain("Hello");
  });

  it("handles ternary expressions by returning null", () => {
    const source = `function App() {\n  return <span>{ok ? "Yes" : "No"}</span>;\n}`;
    const filePath = withTempFile(source);
    const result = updateTextContent(filePath, 2, 9, "Yes", "Sure");
    expect(result).toBeNull();
  });
});
