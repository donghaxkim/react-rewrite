// packages/overlay/src/utils/area-selection.ts
//
// Coordinate space note (infinite canvas):
// All coordinates here are in viewport space. The DragRect comes from mouse clientX/clientY
// (viewport coords), elementsFromPoint() accepts viewport coords, and getBoundingClientRect()
// returns viewport coords that account for CSS transforms. Everything is consistent without
// explicit viewportToPage mapping.
//
import { isValidElement } from "./component-filter.js";

const COVERAGE_THRESHOLD = 0.75;
const SAMPLE_SPACING_PX = 32;
const MIN_SAMPLES_PER_AXIS = 3;
const MAX_SAMPLES_PER_AXIS = 20;
const MAX_TOTAL_SAMPLES = 100;
const EDGE_INSET_PX = 1;

interface DragRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function createSamplePoints(rect: DragRect): Array<{ x: number; y: number }> {
  if (rect.width <= 0 || rect.height <= 0) return [];

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const { x: left, y: top } = rect;
  const right = left + rect.width;
  const bottom = top + rect.height;
  const cx = left + rect.width / 2;
  const cy = top + rect.height / 2;

  let xCount = clamp(Math.ceil(rect.width / SAMPLE_SPACING_PX), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);
  let yCount = clamp(Math.ceil(rect.height / SAMPLE_SPACING_PX), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);

  if (xCount * yCount > MAX_TOTAL_SAMPLES) {
    const scale = Math.sqrt(MAX_TOTAL_SAMPLES / (xCount * yCount));
    xCount = clamp(Math.floor(xCount * scale), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);
    yCount = clamp(Math.floor(yCount * scale), MIN_SAMPLES_PER_AXIS, MAX_SAMPLES_PER_AXIS);
  }

  const keys = new Set<string>();
  const points: Array<{ x: number; y: number }> = [];

  const add = (x: number, y: number) => {
    const cx = clamp(Math.round(x), 0, vw - 1);
    const cy = clamp(Math.round(y), 0, vh - 1);
    const key = `${cx}:${cy}`;
    if (!keys.has(key)) { keys.add(key); points.push({ x: cx, y: cy }); }
  };

  add(left + EDGE_INSET_PX, top + EDGE_INSET_PX);
  add(right - EDGE_INSET_PX, top + EDGE_INSET_PX);
  add(left + EDGE_INSET_PX, bottom - EDGE_INSET_PX);
  add(right - EDGE_INSET_PX, bottom - EDGE_INSET_PX);
  add(cx, top + EDGE_INSET_PX);
  add(cx, bottom - EDGE_INSET_PX);
  add(left + EDGE_INSET_PX, cy);
  add(right - EDGE_INSET_PX, cy);
  add(cx, cy);

  for (let xi = 0; xi < xCount; xi++) {
    const sx = left + ((xi + 0.5) / xCount) * rect.width;
    for (let yi = 0; yi < yCount; yi++) {
      add(sx, top + ((yi + 0.5) / yCount) * rect.height);
    }
  }

  return points;
}

/**
 * Find all valid elements within a drag/lasso rectangle.
 * Uses sample-point detection and coverage threshold from react-grab.
 * Returns elements sorted in document order with nested elements removed.
 */
export function getElementsInArea(
  rect: DragRect,
  validator: (el: Element) => boolean = isValidElement,
  useCoverage: boolean = true,
): HTMLElement[] {
  const dragBounds = {
    left: rect.x, top: rect.y,
    right: rect.x + rect.width, bottom: rect.y + rect.height,
  };

  const candidates = new Set<Element>();
  const samples = createSamplePoints(rect);

  for (const pt of samples) {
    for (const el of document.elementsFromPoint(pt.x, pt.y)) {
      candidates.add(el);
    }
  }

  const matches: Element[] = [];

  for (const el of candidates) {
    if (!validator(el)) continue;

    const elRect = el.getBoundingClientRect();
    if (elRect.width <= 0 || elRect.height <= 0) continue;

    const elBounds = {
      left: elRect.left, top: elRect.top,
      right: elRect.left + elRect.width, bottom: elRect.top + elRect.height,
    };

    if (useCoverage) {
      const iLeft = Math.max(dragBounds.left, elBounds.left);
      const iTop = Math.max(dragBounds.top, elBounds.top);
      const iRight = Math.min(dragBounds.right, elBounds.right);
      const iBottom = Math.min(dragBounds.bottom, elBounds.bottom);
      const iArea = Math.max(0, iRight - iLeft) * Math.max(0, iBottom - iTop);
      const elArea = elRect.width * elRect.height;

      if (elArea > 0 && iArea / elArea >= COVERAGE_THRESHOLD) {
        matches.push(el);
      }
    } else {
      if (dragBounds.left < elBounds.right && dragBounds.right > elBounds.left &&
          dragBounds.top < elBounds.bottom && dragBounds.bottom > elBounds.top) {
        matches.push(el);
      }
    }
  }

  const filtered = matches.filter(el =>
    !matches.some(other => other !== el && other.contains(el))
  );

  filtered.sort((a, b) => {
    const pos = a.compareDocumentPosition(b);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });

  return filtered as HTMLElement[];
}
