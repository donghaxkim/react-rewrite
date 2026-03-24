// packages/overlay/src/snap-guides.ts

export interface SnapGuides {
  /** Vertical guide line (element centered horizontally in parent) */
  verticalLine: { x: number; top: number; bottom: number } | null;
  /** Horizontal guide line (element centered vertically in parent) */
  horizontalLine: { y: number; left: number; right: number } | null;
}

export interface SnapResult {
  dx: number;
  dy: number;
  snappedX: boolean;
  snappedY: boolean;
  guides: SnapGuides;
}

/**
 * Compute snap-to-center alignment for an element within its parent.
 *
 * All rect inputs are viewport-space (from getBoundingClientRect()).
 * Returned dx/dy are page-space (divided by canvasScale).
 * Returned guide coordinates are viewport-space (for highlight canvas).
 *
 * NOTE: canvasScale assumes uniform scaling with no rotation.
 * If the transform model gains separate x/y scales, this must accept scaleX/scaleY.
 */
export function computeSnap(
  elemRect: DOMRect,
  parentRect: DOMRect,
  rawDx: number,
  rawDy: number,
  threshold: number,
  canvasScale: number,
): SnapResult {
  const elemCenterX = elemRect.left + elemRect.width / 2;
  const elemCenterY = elemRect.top + elemRect.height / 2;
  const parentCenterX = parentRect.left + parentRect.width / 2;
  const parentCenterY = parentRect.top + parentRect.height / 2;

  const offsetX = parentCenterX - elemCenterX;
  const offsetY = parentCenterY - elemCenterY;

  const snappedX = Math.abs(offsetX) <= threshold;
  const snappedY = Math.abs(offsetY) <= threshold;

  return {
    dx: snappedX ? rawDx + offsetX / canvasScale : rawDx,
    dy: snappedY ? rawDy + offsetY / canvasScale : rawDy,
    snappedX,
    snappedY,
    guides: {
      verticalLine: snappedX
        ? { x: parentCenterX, top: parentRect.top, bottom: parentRect.bottom }
        : null,
      horizontalLine: snappedY
        ? { y: parentCenterY, left: parentRect.left, right: parentRect.right }
        : null,
    },
  };
}
