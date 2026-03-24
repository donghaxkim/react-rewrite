import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToLab, deltaE, buildLabCache, resolveColor, buildSpacingCache, resolveSpacing } from "../resolve-intent.js";

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

describe("buildLabCache", () => {
  it("filters non-hex values like transparent", () => {
    const cache = buildLabCache({ "blue-500": "#3b82f6", "transparent": "transparent" });
    expect(cache.size).toBe(1);
  });
});

describe("resolveColor", () => {
  const palette = { "blue-500": "#3b82f6", "red-500": "#ef4444", "white": "#ffffff", "black": "#000000" };
  const cache = buildLabCache(palette);

  it("exact match returns confidence 1.0", () => {
    const result = resolveColor("#3b82f6", cache);
    expect(result.type).toBe("exact");
    expect(result.confidence).toBe(1.0);
    expect(result.resolved).toBe("blue-500");
  });

  it("near match (Delta-E < 3) returns high confidence", () => {
    const result = resolveColor("#3a82f6", cache);
    expect(result.type).toBe("snapped");
    expect(result.confidence).toBeGreaterThanOrEqual(0.95);
    expect(result.resolved).toBe("blue-500");
  });

  it("distant color returns arbitrary", () => {
    const result = resolveColor("#ff13ab", cache);
    expect(result.type).toBe("arbitrary");
    expect(result.confidence).toBe(0);
    expect(result.resolved).toBeNull();
  });

  it("round-trip: perturbed blue-500 resolves back to blue-500", () => {
    const result = resolveColor("#3a82f6", cache);
    expect(result.resolved).toBe("blue-500");
    expect(result.confidence).toBeGreaterThan(0.7);
  });
});

describe("buildSpacingCache", () => {
  it("parses rem values to pixels", () => {
    const cache = buildSpacingCache({ "4": "1rem", "px": "1px", "0": "0px" });
    expect(cache.get(16)).toEqual({ token: "4", value: "1rem" });
    expect(cache.get(1)).toEqual({ token: "px", value: "1px" });
    expect(cache.get(0)).toEqual({ token: "0", value: "0px" });
  });
});

describe("resolveSpacing", () => {
  const spacing = { "0": "0px", "px": "1px", "1": "0.25rem", "4": "1rem", "8": "2rem", "16": "4rem" };
  const cache = buildSpacingCache(spacing);

  it("exact match returns confidence 1.0", () => {
    const result = resolveSpacing(16, cache);
    expect(result.type).toBe("exact");
    expect(result.resolved).toBe("4");
    expect(result.confidence).toBe(1.0);
  });

  it("within relative threshold snaps with high confidence", () => {
    const result = resolveSpacing(17, cache);
    expect(result.type).toBe("snapped");
    expect(result.resolved).toBe("4");
    expect(result.confidence).toBeGreaterThan(0.75);
  });

  it("outside threshold returns arbitrary", () => {
    const result = resolveSpacing(137, cache);
    expect(result.type).toBe("arbitrary");
    expect(result.confidence).toBe(0);
    expect(result.resolved).toBeNull();
  });

  it("small spacing has tight threshold", () => {
    const result = resolveSpacing(6, cache);
    expect(result.type).toBe("arbitrary");
  });

  it("large spacing has wider threshold", () => {
    const result = resolveSpacing(70, cache);
    expect(result.type).toBe("snapped");
    expect(result.resolved).toBe("16");
  });
});
