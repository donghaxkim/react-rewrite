// packages/overlay/src/__tests__/snap-guides.test.ts
import { describe, it, expect } from "vitest";
import { computeSnap } from "../snap-guides.js";

/** Helper to create a mock DOMRect-like object */
function rect(left: number, top: number, width: number, height: number) {
  return { left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON() {} } as DOMRect;
}

describe("computeSnap", () => {
  // Parent: 0,0 → 400x300. Center = (200, 150).
  const parentRect = rect(0, 0, 400, 300);

  it("returns raw deltas when element is far from center", () => {
    const elemRect = rect(10, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 5, 5, 5, 1);
    expect(result.dx).toBe(5);
    expect(result.dy).toBe(5);
    expect(result.snappedX).toBe(false);
    expect(result.snappedY).toBe(false);
    expect(result.guides.verticalLine).toBeNull();
    expect(result.guides.horizontalLine).toBeNull();
  });

  it("snaps X only when horizontally centered within threshold", () => {
    // Element 50x50, center at x=198 → offset to parent center (200) is 2px < 5px
    const elemRect = rect(173, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(true);
    expect(result.snappedY).toBe(false);
    expect(result.dx).toBe(2);
    expect(result.guides.verticalLine).toEqual({ x: 200, top: 0, bottom: 300 });
    expect(result.guides.horizontalLine).toBeNull();
  });

  it("snaps Y only when vertically centered within threshold", () => {
    // Element 50x50, center at y=148 → offset to parent center (150) is 2px
    const elemRect = rect(10, 123, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(false);
    expect(result.snappedY).toBe(true);
    expect(result.dy).toBe(2);
    expect(result.guides.horizontalLine).toEqual({ y: 150, left: 0, right: 400 });
    expect(result.guides.verticalLine).toBeNull();
  });

  it("snaps both axes when centered on both", () => {
    const elemRect = rect(173, 123, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(true);
    expect(result.snappedY).toBe(true);
    expect(result.dx).toBe(2);
    expect(result.dy).toBe(2);
    expect(result.guides.verticalLine).not.toBeNull();
    expect(result.guides.horizontalLine).not.toBeNull();
  });

  it("snaps at exactly the threshold boundary", () => {
    // Element center at x=195 → offset = 5 = threshold → should snap
    const elemRect = rect(170, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(true);
    expect(result.dx).toBe(5);
  });

  it("does not snap when just beyond threshold", () => {
    // Element center at x=194 → offset = 6 > threshold 5 → no snap
    const elemRect = rect(169, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(false);
    expect(result.dx).toBe(0);
  });

  it("scales delta correction by canvasScale at 2x zoom", () => {
    // Element center at x=198, parent center at 200. Offset = 2 viewport px.
    // At 2x zoom, page-space correction = 2 / 2 = 1
    const elemRect = rect(173, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 2);
    expect(result.snappedX).toBe(true);
    expect(result.dx).toBe(1);
  });

  it("handles parent smaller than child", () => {
    const smallParent = rect(100, 100, 40, 30);
    // Element perfectly centered on small parent: elem center = (120, 115) = parent center
    const alignedElem = rect(80, 85, 80, 60);
    const result = computeSnap(alignedElem, smallParent, 0, 0, 5, 1);
    expect(result.snappedX).toBe(true);
    expect(result.snappedY).toBe(true);
    expect(result.guides.verticalLine).toEqual({ x: 120, top: 100, bottom: 130 });
    expect(result.guides.horizontalLine).toEqual({ y: 115, left: 100, right: 140 });
  });

  it("passes through rawDx/rawDy when no snap occurs", () => {
    const elemRect = rect(10, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 15, -8, 5, 1);
    expect(result.dx).toBe(15);
    expect(result.dy).toBe(-8);
  });

  it("breaks free when raw delta moves element beyond threshold", () => {
    // Element center at x=197 (3px off parent center 200) → snapped
    const nearCenter = rect(172, 10, 50, 50);
    const snapped = computeSnap(nearCenter, parentRect, 10, 0, 5, 1);
    expect(snapped.snappedX).toBe(true);

    // Element dragged further — center at x=194 (6px off) → breaks free
    const pastThreshold = rect(169, 10, 50, 50);
    const freed = computeSnap(pastThreshold, parentRect, 16, 0, 5, 1);
    expect(freed.snappedX).toBe(false);
    expect(freed.dx).toBe(16);
    expect(freed.guides.verticalLine).toBeNull();
  });
});
