import { describe, it, expect } from "vitest";
import { resolveJSXPath } from "../jsx-path-resolver.js";
import { parseSource } from "../transform.js";
import type { JSXStructuralPath } from "@react-rewrite/shared";

function parse(source: string) {
  return parseSource(source, "test.tsx");
}

describe("resolveJSXPath", () => {
  it("resolves root element by component name", () => {
    const source = `
function Card() {
  return <div>Hello</div>;
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "Card",
      filePath: "test.tsx",
      segments: [{ name: "div", discriminator: { type: "root" } }],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("div");
  });

  it("resolves nested element by index", () => {
    const source = `
function List() {
  return (
    <div>
      <h1>Title</h1>
      <p>First</p>
      <p>Second</p>
    </div>
  );
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "List",
      filePath: "test.tsx",
      segments: [
        { name: "div", discriminator: { type: "root" } },
        { name: "p", discriminator: { type: "index", value: 1 } },
      ],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("p");
    // The second <p> is on line 7
    expect(result.node.loc.start.line).toBe(7);
  });

  it("resolves element by key", () => {
    const source = `
function Tags() {
  return (
    <div>
      <span key="a">A</span>
      <span key="b">B</span>
    </div>
  );
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "Tags",
      filePath: "test.tsx",
      segments: [
        { name: "div", discriminator: { type: "root" } },
        { name: "span", discriminator: { type: "key", value: "b" } },
      ],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("span");
    // The span with key="b" is on line 6
    expect(result.node.loc.start.line).toBe(6);
  });

  it("resolves element by id", () => {
    const source = `
function Page() {
  return (
    <div>
      <section id="main">Content</section>
    </div>
  );
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "Page",
      filePath: "test.tsx",
      segments: [
        { name: "div", discriminator: { type: "root" } },
        { name: "section", discriminator: { type: "id", value: "main" } },
      ],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("section");
  });

  it("resolves deeply nested elements", () => {
    const source = `
function Article() {
  return (
    <div>
      <main>
        <article>
          <h2>Title</h2>
        </article>
      </main>
    </div>
  );
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "Article",
      filePath: "test.tsx",
      segments: [
        { name: "div", discriminator: { type: "root" } },
        { name: "main", discriminator: { type: "index", value: 0 } },
        { name: "article", discriminator: { type: "index", value: 0 } },
        { name: "h2", discriminator: { type: "index", value: 0 } },
      ],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("h2");
    expect(result.node.loc.start.line).toBe(7);
  });

  it("resolves map template element", () => {
    const source = `
function ItemList({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "ItemList",
      filePath: "test.tsx",
      segments: [
        { name: "ul", discriminator: { type: "root" } },
        { name: "li", discriminator: { type: "map-template" } },
      ],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("li");
  });

  it("returns null for invalid path", () => {
    const source = `
function Card() {
  return <div><span>Hello</span></div>;
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "Card",
      filePath: "test.tsx",
      segments: [
        { name: "div", discriminator: { type: "root" } },
        { name: "article", discriminator: { type: "index", value: 0 } },
      ],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).toBeNull();
  });

  it("returns null for wrong component name", () => {
    const source = `
function Card() {
  return <div>Hello</div>;
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "NonExistent",
      filePath: "test.tsx",
      segments: [{ name: "div", discriminator: { type: "root" } }],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).toBeNull();
  });

  it("resolves arrow function component", () => {
    const source = `const Card = () => <div><span>Hello</span></div>;`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "Card",
      filePath: "test.tsx",
      segments: [
        { name: "div", discriminator: { type: "root" } },
        { name: "span", discriminator: { type: "index", value: 0 } },
      ],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("span");
  });

  it("resolves export default function", () => {
    const source = `
export default function Card() {
  return <div>Hello</div>;
}`;
    const { j, root } = parse(source);
    const path: JSXStructuralPath = {
      componentName: "Card",
      filePath: "test.tsx",
      segments: [{ name: "div", discriminator: { type: "root" } }],
    };

    const result = resolveJSXPath(j, root, path);
    expect(result).not.toBeNull();
    expect(result.node.openingElement.name.name).toBe("div");
  });
});
