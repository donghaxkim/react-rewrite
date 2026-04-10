// packages/overlay/src/utils/color-math.test.ts
import { describe, it, expect } from "vitest";
import { hexToHsv, hsvToHex } from "./color-math.js";

describe("hexToHsv / hsvToHex round-trip", () => {
  const cases = [
    { hex: "#ff0000", name: "pure red" },
    { hex: "#00ff00", name: "pure green" },
    { hex: "#0000ff", name: "pure blue" },
    { hex: "#ffffff", name: "pure white" },
    { hex: "#000000", name: "pure black" },
    { hex: "#3b82f6", name: "accent blue" },
    { hex: "#808080", name: "mid gray" },
    { hex: "#f76b15", name: "orange preset" },
  ];

  for (const { hex, name } of cases) {
    it(`round-trips ${name} (${hex})`, () => {
      const hsv = hexToHsv(hex);
      const result = hsvToHex(hsv);
      expect(result).toBe(hex);
    });
  }
});

describe("hexToHsv edge cases", () => {
  it("black has zero saturation and value", () => {
    const hsv = hexToHsv("#000000");
    expect(hsv.s).toBe(0);
    expect(hsv.v).toBe(0);
  });

  it("white has zero saturation and full value", () => {
    const hsv = hexToHsv("#ffffff");
    expect(hsv.s).toBe(0);
    expect(hsv.v).toBeCloseTo(100, 0);
  });

  it("pure red has hue 0, full saturation and value", () => {
    const hsv = hexToHsv("#ff0000");
    expect(hsv.h).toBeCloseTo(0, 0);
    expect(hsv.s).toBeCloseTo(100, 0);
    expect(hsv.v).toBeCloseTo(100, 0);
  });
});

describe("hsvToHex edge cases", () => {
  it("hue 360 wraps to same as hue 0", () => {
    const a = hsvToHex({ h: 0, s: 100, v: 100 });
    const b = hsvToHex({ h: 360, s: 100, v: 100 });
    expect(a).toBe(b);
  });
});
