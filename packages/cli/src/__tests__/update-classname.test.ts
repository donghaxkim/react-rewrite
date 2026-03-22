import { describe, it, expect } from "vitest";
import { updateClassName } from "../transform.js";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

function findElement(fixture: string, tag: string): { line: number; col: number } {
  const content = fs.readFileSync(path.join(fixturesDir, fixture), "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const col = lines[i].indexOf(`<${tag}`);
    if (col !== -1) return { line: i + 1, col }; // 0-indexed col
  }
  throw new Error(`<${tag}> not found in ${fixture}`);
}

describe("updateClassName", () => {
  describe("string literal className", () => {
    it("replaces an existing Tailwind class", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-6");
      expect(result).not.toContain("p-4");
    });

    it("splits px shorthand when editing one side", () => {
      const fixture = path.join(fixturesDir, "classname-template.tsx");
      const { line, col } = findElement("classname-template.tsx", "span");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "pl",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: ["p", "px"],
      }]);
      expect(result).toContain("pl-6");
      expect(result).toContain("pr-4");
      expect(result).not.toContain("px-4");
    });

    it("writes arbitrary value when no token match", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: null,
        value: "13px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-[13px]");
      expect(result).not.toContain("p-4");
    });
  });

  describe("cn()/clsx() className", () => {
    it("modifies the correct string argument", () => {
      const fixture = path.join(fixturesDir, "classname-cn.tsx");
      const { line, col } = findElement("classname-cn.tsx", "button");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-6");
      expect(result).not.toContain("p-4");
    });

    it("throws CONFLICTING_CLASS when prefix is in conditional arg", () => {
      const fixture = path.join(fixturesDir, "classname-cn.tsx");
      const { line, col } = findElement("classname-cn.tsx", "button");
      expect(() => updateClassName(fixture, line, col, [{
        tailwindPrefix: "bg",
        tailwindToken: "red-500",
        value: "#ef4444",
        relatedPrefixes: [],
      }])).toThrow(/CONFLICTING_CLASS/);
    });
  });

  describe("no className", () => {
    it("creates className prop with the new class", () => {
      const fixture = path.join(fixturesDir, "classname-none.tsx");
      const { line, col } = findElement("classname-none.tsx", "button");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain('className="p-4"');
    });
  });

  describe("dynamic className", () => {
    it("throws DYNAMIC_CLASSNAME error", () => {
      const fixture = path.join(fixturesDir, "classname-dynamic.tsx");
      const { line, col } = findElement("classname-dynamic.tsx", "div");
      expect(() => updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: [],
      }])).toThrow(/DYNAMIC_CLASSNAME/);
    });
  });

  describe("template literal className", () => {
    it("replaces class in static part of template literal", () => {
      const fixture = path.join(fixturesDir, "classname-template.tsx");
      const { line, col } = findElement("classname-template.tsx", "span");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "py",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: ["p"],
      }]);
      expect(result).toContain("py-4");
      expect(result).not.toContain("py-2");
    });
  });

  describe("full shorthand splitting (p-4 → individual sides)", () => {
    it("splits p-4 into all four sides when editing one", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "pt",
        tailwindToken: "8",
        value: "32px",
        relatedPrefixes: ["p", "py"],
      }]);
      expect(result).toContain("pt-8");
      expect(result).toContain("pr-4");
      expect(result).toContain("pb-4");
      expect(result).toContain("pl-4");
      expect(result).not.toContain(" p-4");
    });
  });

  describe("variant-prefixed classes preserved", () => {
    it("replaces base bg class but preserves hover:bg variant", () => {
      const fixture = path.join(fixturesDir, "classname-variants.tsx");
      const { line, col } = findElement("classname-variants.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "bg",
        tailwindToken: "red-500",
        value: "#ef4444",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("bg-red-500");
      expect(result).not.toContain("bg-blue-500");
      expect(result).toContain("hover:bg-blue-700");
    });

    it("replaces base bg class but preserves dark:bg variant", () => {
      const fixture = path.join(fixturesDir, "classname-variants.tsx");
      const { line, col } = findElement("classname-variants.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "bg",
        tailwindToken: "green-300",
        value: "#86efac",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("bg-green-300");
      expect(result).toContain("dark:bg-gray-900");
      expect(result).toContain("md:bg-red-500");
    });
  });

  describe("responsive variant preserved", () => {
    it("replaces base p class but preserves md:p and lg:p variants", () => {
      const fixture = path.join(fixturesDir, "classname-variants.tsx");
      const { line, col } = findElement("classname-variants.tsx", "p");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-6");
      expect(result).not.toContain("p-4");
      expect(result).toContain("md:p-8");
      expect(result).toContain("lg:p-12");
    });
  });

  describe("multiple classes same prefix family", () => {
    it("replaces only exact p- prefix, not px- or py-", () => {
      const fixture = path.join(fixturesDir, "classname-prefix-family.tsx");
      const { line, col } = findElement("classname-prefix-family.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "8",
        value: "32px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-8");
      expect(result).toContain("px-2");
      expect(result).toContain("py-1");
      expect(result).not.toContain("p-4");
    });
  });

  describe("standalone class (no dash)", () => {
    it("matches and replaces a standalone class like 'rounded'", () => {
      const fixture = path.join(fixturesDir, "classname-edge.tsx");
      const { line, col } = findElement("classname-edge.tsx", "span");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "rounded",
        tailwindToken: "lg",
        value: "8px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("rounded-lg");
      expect(result).not.toMatch(/className="rounded"/);
    });
  });

  describe("arbitrary value class", () => {
    it("replaces existing arbitrary value class with new token", () => {
      const fixture = path.join(fixturesDir, "classname-edge.tsx");
      const { line, col } = findElement("classname-edge.tsx", "p");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-4");
      expect(result).not.toContain("p-[13px]");
    });
  });

  describe("empty className", () => {
    it("adds class to empty className", () => {
      const fixture = path.join(fixturesDir, "classname-edge.tsx");
      const { line, col } = findElement("classname-edge.tsx", "button");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "4",
        value: "16px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-4");
    });
  });

  describe("no existing class matching prefix", () => {
    it("appends new class when no matching prefix exists", () => {
      const fixture = path.join(fixturesDir, "classname-edge.tsx");
      const { line, col } = findElement("classname-edge.tsx", "section");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "bg",
        tailwindToken: "blue-500",
        value: "#3b82f6",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("bg-blue-500");
      expect(result).toContain("text-red-500");
      expect(result).toContain("font-bold");
    });
  });

  describe("className with newlines/whitespace", () => {
    it("handles multi-line className with extra whitespace", () => {
      const fixture = path.join(fixturesDir, "classname-whitespace.tsx");
      const { line, col } = findElement("classname-whitespace.tsx", "article");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "p",
        tailwindToken: "8",
        value: "32px",
        relatedPrefixes: [],
      }]);
      expect(result).toContain("p-8");
      expect(result).not.toContain("p-4");
      expect(result).toContain("m-2");
    });
  });

  describe("related prefixes removal", () => {
    it("splits p shorthand when setting pl with relatedPrefixes", () => {
      const fixture = path.join(fixturesDir, "classname-related.tsx");
      const { line, col } = findElement("classname-related.tsx", "div");
      // div has "p-4 px-2 py-1", setting pl with relatedPrefixes [p, px]
      // p-4 is the first related match → splits into pt-4 pr-4 pb-4 pl-6
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "pl",
        tailwindToken: "6",
        value: "24px",
        relatedPrefixes: ["p", "px"],
      }]);
      expect(result).toContain("pl-6");
      // p-4 splits into individual sides
      expect(result).not.toContain('"p-4');
      expect(result).toContain("pt-4");
      expect(result).toContain("pr-4");
      expect(result).toContain("pb-4");
    });
  });

  describe("classPattern regex matching", () => {
    it("uses classPattern to match text-align classes without colliding with text-color", () => {
      const fixture = path.join(fixturesDir, "classname-pattern.tsx");
      const { line, col } = findElement("classname-pattern.tsx", "div");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "text",
        tailwindToken: "center",
        value: "center",
        relatedPrefixes: [],
        classPattern: "^text-(left|center|right|justify|start|end)$",
      }]);
      expect(result).toContain("text-center");
      expect(result).not.toContain("text-left");
      // text-red-500 should be preserved (not matched by classPattern)
      expect(result).toContain("text-red-500");
    });

    it("classPattern does not affect unmatched classes", () => {
      const fixture = path.join(fixturesDir, "classname-pattern.tsx");
      const { line, col } = findElement("classname-pattern.tsx", "span");
      const result = updateClassName(fixture, line, col, [{
        tailwindPrefix: "text",
        tailwindToken: "right",
        value: "right",
        relatedPrefixes: [],
        classPattern: "^text-(left|center|right|justify|start|end)$",
      }]);
      expect(result).toContain("text-right");
      expect(result).not.toContain("text-center");
      expect(result).toContain("text-blue-300");
    });
  });

  describe("batch updates (multiple properties at once)", () => {
    it("applies multiple updates in a single call", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [
        {
          tailwindPrefix: "p",
          tailwindToken: "8",
          value: "32px",
          relatedPrefixes: [],
        },
        {
          tailwindPrefix: "bg",
          tailwindToken: "gray-100",
          value: "#f3f4f6",
          relatedPrefixes: [],
        },
      ]);
      expect(result).toContain("p-8");
      expect(result).not.toContain("p-4");
      expect(result).toContain("bg-gray-100");
      expect(result).not.toContain("bg-white");
      // Other classes preserved
      expect(result).toContain("flex");
      expect(result).toContain("rounded-lg");
    });

    it("applies multiple updates including one with no existing match", () => {
      const fixture = path.join(fixturesDir, "classname-string.tsx");
      const { line, col } = findElement("classname-string.tsx", "div");
      const result = updateClassName(fixture, line, col, [
        {
          tailwindPrefix: "p",
          tailwindToken: "6",
          value: "24px",
          relatedPrefixes: [],
        },
        {
          tailwindPrefix: "w",
          tailwindToken: "full",
          value: "100%",
          relatedPrefixes: [],
        },
      ]);
      expect(result).toContain("p-6");
      expect(result).toContain("w-full");
      expect(result).not.toContain("p-4");
    });
  });

  describe("template literal with variant classes", () => {
    it("throws DYNAMIC_CLASSNAME for bare expression className", () => {
      const fixture = path.join(fixturesDir, "classname-dynamic.tsx");
      const { line, col } = findElement("classname-dynamic.tsx", "div");
      expect(() => updateClassName(fixture, line, col, [{
        tailwindPrefix: "bg",
        tailwindToken: "red-500",
        value: "#ef4444",
        relatedPrefixes: [],
      }])).toThrow(/DYNAMIC_CLASSNAME/);
    });
  });
});
