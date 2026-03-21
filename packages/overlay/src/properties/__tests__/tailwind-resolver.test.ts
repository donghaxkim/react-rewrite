import { describe, it, expect } from "vitest";
import { resolveTokenForValue, mergeTokenMaps } from "../tailwind-resolver.js";

describe("resolveTokenForValue", () => {
  it("returns token name when value matches", () => {
    const reverseMap = new Map([["16px", "4"], ["24px", "6"]]);
    expect(resolveTokenForValue("16px", reverseMap)).toBe("4");
  });

  it("returns null for arbitrary values", () => {
    const reverseMap = new Map([["16px", "4"], ["24px", "6"]]);
    expect(resolveTokenForValue("13px", reverseMap)).toBeNull();
  });
});

describe("mergeTokenMaps", () => {
  it("CLI tokens override browser tokens", () => {
    const browser = { spacing: { "4": "16px" }, spacingReverse: { "16px": "4" } };
    const cli = { spacing: { "4": "16px", "18": "72px" }, spacingReverse: { "16px": "4", "72px": "18" } };
    const merged = mergeTokenMaps(browser as any, cli as any);
    expect(merged.spacing.get("18")).toBe("72px");
  });
});
