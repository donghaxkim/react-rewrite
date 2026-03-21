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
});
