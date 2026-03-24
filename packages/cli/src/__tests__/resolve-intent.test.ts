import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToLab, deltaE } from "../resolve-intent.js";

describe("hexToRgb", () => {
  it("converts black", () => {
    expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
  });
  it("converts white", () => {
    expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
  });
  it("converts blue-500", () => {
    expect(hexToRgb("#3b82f6")).toEqual([59, 130, 246]);
  });
});

describe("rgbToLab", () => {
  it("converts black to Lab origin", () => {
    const [L, a, b] = rgbToLab(0, 0, 0);
    expect(L).toBeCloseTo(0, 0);
    expect(a).toBeCloseTo(0, 0);
    expect(b).toBeCloseTo(0, 0);
  });
  it("converts white to L=100", () => {
    const [L, a, b] = rgbToLab(255, 255, 255);
    expect(L).toBeCloseTo(100, 0);
    expect(a).toBeCloseTo(0, 0);
    expect(b).toBeCloseTo(0, 0);
  });
  it("converts pure red", () => {
    const [L] = rgbToLab(255, 0, 0);
    expect(L).toBeCloseTo(53.23, 0);
  });
});

describe("deltaE", () => {
  it("identical colors have zero distance", () => {
    expect(deltaE([50, 0, 0], [50, 0, 0])).toBe(0);
  });
  it("black vs white is large", () => {
    const d = deltaE([0, 0, 0], [100, 0, 0]);
    expect(d).toBe(100);
  });
  it("perceptually similar colors are close", () => {
    const lab1 = rgbToLab(59, 130, 246);  // #3b82f6 (blue-500)
    const lab2 = rgbToLab(58, 130, 246);  // #3a82f6 (one off)
    expect(deltaE(lab1, lab2)).toBeLessThan(1);
  });
});
