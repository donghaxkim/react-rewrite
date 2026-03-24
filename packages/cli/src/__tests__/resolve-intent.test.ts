import { describe, it, expect } from "vitest";
import { hexToRgb, rgbToLab, deltaE, buildLabCache, resolveColor, buildSpacingCache, resolveSpacing, hasAlpha, resolveColorChange, resolveIntent, computeNearestSiblings } from "../resolve-intent.js";
import type { SerializedAnnotations, TailwindTokenMap } from "@frameup/shared";

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

describe("hasAlpha", () => {
  it("detects rgba", () => {
    expect(hasAlpha("rgba(0,0,0,0.5)")).toBe(true);
  });
  it("detects hsla", () => {
    expect(hasAlpha("hsla(200,50%,50%,0.8)")).toBe(true);
  });
  it("detects 8-digit hex", () => {
    expect(hasAlpha("#3b82f680")).toBe(true);
  });
  it("rejects 6-digit hex", () => {
    expect(hasAlpha("#3b82f6")).toBe(false);
  });
  it("rejects rgb", () => {
    expect(hasAlpha("rgb(0,0,0)")).toBe(false);
  });
});

describe("resolveColorChange — pickedToken", () => {
  const palette = { "blue-500": "#3b82f6", "red-500": "#ef4444" };
  const cache = buildLabCache(palette);

  it("uses pickedToken when hex matches", () => {
    const result = resolveColorChange("#3b82f6", "blue-500", palette, cache);
    expect(result.type).toBe("exact");
    expect(result.resolved).toBe("blue-500");
    expect(result.confidence).toBe(1.0);
  });

  it("clears stale pickedToken when hex was manually edited", () => {
    const result = resolveColorChange("#ff0000", "blue-500", palette, cache);
    expect(result.resolved).not.toBe("blue-500");
  });

  it("falls through to Delta-E when no pickedToken", () => {
    const result = resolveColorChange("#3a82f6", undefined, palette, cache);
    expect(result.resolved).toBe("blue-500");
    expect(result.type).toBe("snapped");
  });
});

describe("computeNearestSiblings", () => {
  it("finds nearest sibling in each direction", () => {
    const movedRect = { top: 100, left: 100, width: 50, height: 50 };
    const delta = { dx: 0, dy: 0 };
    const siblings = [
      { component: "Left", rect: { top: 100, left: 20, width: 30, height: 50 } },
      { component: "Right", rect: { top: 100, left: 200, width: 50, height: 50 } },
      { component: "Above", rect: { top: 20, left: 100, width: 50, height: 30 } },
      { component: "Below", rect: { top: 200, left: 100, width: 50, height: 50 } },
    ];
    const result = computeNearestSiblings(movedRect, delta, siblings);
    expect(result.left?.component).toBe("Left");
    expect(result.right?.component).toBe("Right");
    expect(result.above?.component).toBe("Above");
    expect(result.below?.component).toBe("Below");
  });

  it("accounts for delta in final position", () => {
    const movedRect = { top: 100, left: 100, width: 50, height: 50 };
    const delta = { dx: 100, dy: 0 };
    const siblings = [
      { component: "Neighbor", rect: { top: 100, left: 260, width: 50, height: 50 } },
    ];
    const result = computeNearestSiblings(movedRect, delta, siblings);
    expect(result.right?.component).toBe("Neighbor");
    expect(result.right?.distance).toBe(10);
  });

  it("returns empty when no siblings", () => {
    const result = computeNearestSiblings({ top: 0, left: 0, width: 50, height: 50 }, { dx: 0, dy: 0 }, undefined);
    expect(result).toEqual({});
  });
});

describe("resolveIntent", () => {
  const tokens: TailwindTokenMap = {
    colors: { "blue-500": "#3b82f6", "red-500": "#ef4444", "white": "#ffffff", "black": "#000000", "transparent": "transparent" },
    colorsReverse: { "#3b82f6": "blue-500" },
    spacing: { "0": "0px", "4": "1rem", "8": "2rem" },
    spacingReverse: { "0px": "0", "1rem": "4", "2rem": "8" },
    fontSize: {}, fontSizeReverse: {},
    fontWeight: {}, fontWeightReverse: {},
    borderRadius: {}, borderRadiusReverse: {},
    borderWidth: {}, borderWidthReverse: {},
    opacity: {}, opacityReverse: {},
    letterSpacing: {}, letterSpacingReverse: {},
    lineHeight: {}, lineHeightReverse: {},
  };

  it("resolves color changes to nearest token", () => {
    const annotations: SerializedAnnotations = {
      moves: [],
      annotations: [],
      colorChanges: [{
        component: "Button", file: "app.tsx", line: 10,
        property: "backgroundColor", from: "rgb(255,255,255)", to: "#3a82f6",
      }],
    };
    const result = resolveIntent(annotations, tokens);
    expect(result.colorChanges[0].resolvedTo.resolved).toBe("blue-500");
    expect(result.colorChanges[0].from).toBe("rgb(255,255,255)");
  });

  it("resolves spacing for moves", () => {
    const annotations: SerializedAnnotations = {
      moves: [{
        component: "Card", file: "app.tsx", line: 5,
        originalRect: { top: 0, left: 0, width: 100, height: 50 },
        delta: { dx: 16, dy: 0 },
      }],
      annotations: [],
      colorChanges: [],
    };
    const result = resolveIntent(annotations, tokens);
    expect(result.moves[0].resolvedDx?.resolved).toBe("4");
    expect(result.moves[0].resolvedDy).toBeNull();
  });

  it("passes through empty annotations", () => {
    const empty: SerializedAnnotations = { moves: [], annotations: [], colorChanges: [] };
    const result = resolveIntent(empty, tokens);
    expect(result.moves).toHaveLength(0);
    expect(result.colorChanges).toHaveLength(0);
  });

  it("skips resolution for alpha colors", () => {
    const annotations: SerializedAnnotations = {
      moves: [],
      annotations: [],
      colorChanges: [{
        component: "Box", file: "app.tsx", line: 1,
        property: "backgroundColor", from: "rgba(0,0,0,0.5)", to: "rgba(0,0,0,0.8)",
      }],
    };
    const result = resolveIntent(annotations, tokens);
    expect(result.colorChanges[0].resolvedTo.type).toBe("arbitrary");
    expect(result.colorChanges[0].resolvedTo.raw).toBe("rgba(0,0,0,0.8)");
  });
});
