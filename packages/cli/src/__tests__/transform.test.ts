import { describe, it, expect } from "vitest";
import { reorderComponent, getSiblings } from "../transform.js";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

/** Find the line number of a component's opening tag in a fixture file */
function findLine(fixture: string, componentName: string): number {
  const content = fs.readFileSync(path.join(fixturesDir, fixture), "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`<${componentName}`)) return i + 1; // 1-indexed
  }
  throw new Error(`Component <${componentName}> not found in ${fixture}`);
}

/** Find the line number of a parent element (e.g., <main>) */
function findParentLine(fixture: string, tagName: string): number {
  const content = fs.readFileSync(path.join(fixturesDir, fixture), "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`<${tagName}`)) return i + 1;
  }
  throw new Error(`Tag <${tagName}> not found in ${fixture}`);
}

describe("reorderComponent", () => {
  it("moves element from position 0 to position 2 (basic 3 siblings)", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const navbarLine = findLine("basic.tsx", "Navbar");
    const featuresLine = findLine("basic.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    // Navbar moved before Features → expected order: Hero, Navbar, Features
    const heroIdx = result.indexOf("<Hero />");
    const navbarIdx = result.indexOf("<Navbar />");
    const featuresIdx = result.indexOf("<Features />");
    expect(heroIdx).toBeLessThan(navbarIdx);
    expect(navbarIdx).toBeLessThan(featuresIdx);
  });

  it("moves element from position 0 to position 3 in 5-sibling list", () => {
    const fixturePath = path.join(fixturesDir, "five-siblings.tsx");
    const navbarLine = findLine("five-siblings.tsx", "Navbar");
    const pricingLine = findLine("five-siblings.tsx", "Pricing");
    const result = reorderComponent(fixturePath, navbarLine, pricingLine);
    // Navbar moved before Pricing → expected: Hero, Features, Navbar, Pricing, Footer
    const lines = result.split("\n");
    const componentLines = lines.filter((l) =>
      l.trim().match(/^<(Navbar|Hero|Features|Pricing|Footer)/)
    );
    expect(componentLines.map((l) => l.trim())).toEqual([
      "<Hero />",
      "<Features />",
      "<Navbar />",
      "<Pricing />",
      "<Footer />",
    ]);
  });

  it("moves self-closing tags correctly", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const featuresLine = findLine("basic.tsx", "Features");
    const navbarLine = findLine("basic.tsx", "Navbar");
    const result = reorderComponent(fixturePath, featuresLine, navbarLine);
    // Features moved before Navbar → expected: Features, Navbar, Hero
    const featuresIdx = result.indexOf("<Features />");
    const navbarIdx = result.indexOf("<Navbar />");
    expect(featuresIdx).toBeLessThan(navbarIdx);
  });

  it("moves expression containers as a unit", () => {
    const fixturePath = path.join(fixturesDir, "with-expressions.tsx");
    // The expression {showHero && <Hero />} — find the line with "showHero"
    const content = fs.readFileSync(fixturePath, "utf-8");
    const exprLine = content.split("\n").findIndex((l) => l.includes("showHero")) + 1;
    const navbarLine = findLine("with-expressions.tsx", "Navbar");
    const result = reorderComponent(fixturePath, exprLine, navbarLine);
    // Expression moved before Navbar
    const exprIdx = result.indexOf("showHero && <Hero />");
    const navbarIdx = result.indexOf("<Navbar />");
    expect(exprIdx).toBeLessThan(navbarIdx);
  });

  it("handles fragments as parent containers", () => {
    const fixturePath = path.join(fixturesDir, "with-fragment.tsx");
    const navbarLine = findLine("with-fragment.tsx", "Navbar");
    const featuresLine = findLine("with-fragment.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    const heroIdx = result.indexOf("<Hero />");
    const navbarIdx = result.indexOf("<Navbar />");
    expect(heroIdx).toBeLessThan(navbarIdx);
  });

  it("preserves comments between siblings", () => {
    const fixturePath = path.join(fixturesDir, "with-comments.tsx");
    const navbarLine = findLine("with-comments.tsx", "Navbar");
    const featuresLine = findLine("with-comments.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    expect(result).toContain("{/* Navigation */}");
    expect(result).toContain("{/* Main content */}");
    expect(result).toContain("{/* Feature list */}");
  });

  it("preserves double quotes when file uses double quotes", () => {
    const fixturePath = path.join(fixturesDir, "double-quotes.tsx");
    const navbarLine = findLine("double-quotes.tsx", "Navbar");
    const featuresLine = findLine("double-quotes.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    expect(result).toContain('"container"');
    expect(result).not.toContain("'container'");
  });

  it("throws on nonexistent file", () => {
    expect(() =>
      reorderComponent("/nonexistent/file.tsx", 1, 2)
    ).toThrow();
  });

  it("throws on invalid line numbers", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    expect(() => reorderComponent(fixturePath, 999, 1000)).toThrow(/not found at line/i);
  });

  it("throws when elements are not siblings", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const mainLine = findParentLine("basic.tsx", "main");
    const navbarLine = findLine("basic.tsx", "Navbar");
    expect(() => reorderComponent(fixturePath, mainLine, navbarLine)).toThrow(
      /not siblings/i
    );
  });
});

describe("getSiblings", () => {
  it("returns direct JSX children with names and line numbers", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const mainLine = findParentLine("basic.tsx", "main");
    const siblings = getSiblings(fixturePath, mainLine);
    expect(siblings).toHaveLength(3);
    expect(siblings.map((s) => s.componentName)).toEqual(["Navbar", "Hero", "Features"]);
  });

  it("returns expression containers as siblings", () => {
    const fixturePath = path.join(fixturesDir, "with-expressions.tsx");
    const mainLine = findParentLine("with-expressions.tsx", "main");
    const siblings = getSiblings(fixturePath, mainLine);
    expect(siblings).toHaveLength(3);
    expect(siblings[1].componentName).toBe("Hero");
  });

  it("works with fragment parents", () => {
    const fixturePath = path.join(fixturesDir, "with-fragment.tsx");
    // Fragment parent — find the line with <>
    const content = fs.readFileSync(fixturePath, "utf-8");
    const fragLine = content.split("\n").findIndex((l) => l.includes("<>")) + 1;
    const siblings = getSiblings(fixturePath, fragLine);
    expect(siblings).toHaveLength(3);
    expect(siblings[0].componentName).toBe("Navbar");
  });
});
