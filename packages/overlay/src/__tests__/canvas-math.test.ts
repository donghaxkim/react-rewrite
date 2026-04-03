import { describe, expect, it } from "vitest";
import {
  buildCanvasTransformMatrix,
  pageToViewportAtTransform,
  viewportToPageAtTransform,
} from "../canvas-math.js";

describe("canvas transform math", () => {
  it("uses an explicit matrix with viewport-space offsets", () => {
    expect(buildCanvasTransformMatrix(2, 120, -48)).toBe("matrix(2, 0, 0, 2, 120, -48)");
  });

  it("round-trips viewport and page coordinates under pan and zoom", () => {
    const page = viewportToPageAtTransform(520, 230, 1.75, 240, -120);

    expect(pageToViewportAtTransform(page.x, page.y, 1.75, 240, -120)).toEqual({
      x: 520,
      y: 230,
    });
  });
});
