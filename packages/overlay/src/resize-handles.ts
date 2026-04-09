// packages/overlay/src/resize-handles.ts
//
// Resize handle state management and Tailwind snap logic for visual element resizing.
// Handles are rendered by highlight-canvas.ts (already implemented).
// Mouse event wiring lives in selection.ts.
//
import { getTokenMap } from "./properties/tailwind-resolver.js";
import { getShadowRoot } from "./toolbar.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ResizeCorner = "tl" | "tr" | "bl" | "br";

interface ResizeState {
  active: boolean;
  corner: ResizeCorner;
  element: HTMLElement;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  currentWidth: number;
  currentHeight: number;
  resolvedWidthClass: string;
  resolvedHeightClass: string;
}

// ---------------------------------------------------------------------------
// Fallback Tailwind sizes (used when spacing token map is empty)
// ---------------------------------------------------------------------------

const TAILWIND_SIZES: Array<{ token: string; px: number }> = [
  { token: "0", px: 0 },
  { token: "1", px: 4 },
  { token: "2", px: 8 },
  { token: "3", px: 12 },
  { token: "4", px: 16 },
  { token: "5", px: 20 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
  { token: "10", px: 40 },
  { token: "12", px: 48 },
  { token: "16", px: 64 },
  { token: "20", px: 80 },
  { token: "24", px: 96 },
  { token: "32", px: 128 },
  { token: "40", px: 160 },
  { token: "48", px: 192 },
  { token: "56", px: 224 },
  { token: "64", px: 256 },
  { token: "72", px: 288 },
  { token: "80", px: 320 },
  { token: "96", px: 384 },
];

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

let resizeState: ResizeState | null = null;
let tooltipEl: HTMLDivElement | null = null;

// ---------------------------------------------------------------------------
// Tooltip
// ---------------------------------------------------------------------------

function ensureTooltip(): HTMLDivElement {
  if (tooltipEl) return tooltipEl;

  const shadowRoot = getShadowRoot();
  tooltipEl = document.createElement("div");
  tooltipEl.style.cssText = `
    position: fixed;
    background: rgba(15, 15, 15, 0.92);
    color: #e5e7eb;
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    font-size: 11px;
    line-height: 1.4;
    padding: 4px 8px;
    border-radius: 4px;
    pointer-events: none;
    z-index: 2147483647;
    white-space: nowrap;
    display: none;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  `;
  if (shadowRoot) {
    shadowRoot.appendChild(tooltipEl);
  } else {
    document.body.appendChild(tooltipEl);
  }
  return tooltipEl;
}

export function showResizeTooltip(text: string, clientX: number, clientY: number): void {
  const el = ensureTooltip();
  el.textContent = text;
  el.style.display = "block";

  // Position tooltip near cursor, with offset to avoid covering the handle
  const offsetX = 14;
  const offsetY = -32;
  let x = clientX + offsetX;
  let y = clientY + offsetY;

  // Keep within viewport
  const tooltipW = 220; // rough max width
  const tooltipH = 24;
  if (x + tooltipW > window.innerWidth) x = clientX - tooltipW - offsetX;
  if (y < 0) y = clientY + 14;
  if (y + tooltipH > window.innerHeight) y = window.innerHeight - tooltipH - 4;

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

export function hideResizeTooltip(): void {
  if (tooltipEl) tooltipEl.style.display = "none";
}

// ---------------------------------------------------------------------------
// Handle hit-testing (geometry only — rendering is in highlight-canvas.ts)
// ---------------------------------------------------------------------------

interface HandleRect {
  corner: ResizeCorner;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Returns 4 corner handle rects for a given bounding rect.
 * Each handle is centered on the corner of the bounding rect.
 */
export function getHandleRects(rect: DOMRect, handleSize: number = 8): HandleRect[] {
  const half = handleSize / 2;
  return [
    { corner: "tl", x: rect.left - half, y: rect.top - half, w: handleSize, h: handleSize },
    { corner: "tr", x: rect.right - half, y: rect.top - half, w: handleSize, h: handleSize },
    { corner: "br", x: rect.right - half, y: rect.bottom - half, w: handleSize, h: handleSize },
    { corner: "bl", x: rect.left - half, y: rect.bottom - half, w: handleSize, h: handleSize },
  ];
}

/**
 * Returns the corner handle the point falls inside, or null.
 */
export function hitTestHandles(
  x: number,
  y: number,
  rect: DOMRect,
  handleSize: number = 8,
): ResizeCorner | null {
  const handles = getHandleRects(rect, handleSize);
  for (const h of handles) {
    if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) {
      return h.corner;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Tailwind snap
// ---------------------------------------------------------------------------

export interface SnapResult {
  token: string;
  snappedPx: number;
}

/**
 * Builds a sorted list of {token, px} from the merged spacing token map.
 * Falls back to TAILWIND_SIZES if the map is empty.
 */
function buildSnapList(): Array<{ token: string; px: number }> {
  try {
    const tokenMap = getTokenMap();
    const spacingMap = tokenMap.spacing;
    if (spacingMap && spacingMap.size > 0) {
      const list: Array<{ token: string; px: number }> = [];
      for (const [token, cssValue] of spacingMap.entries()) {
        const num = parseFloat(cssValue);
        if (!isNaN(num)) {
          list.push({ token, px: num });
        }
      }
      if (list.length > 0) {
        list.sort((a, b) => a.px - b.px);
        return list;
      }
    }
  } catch {
    // fallthrough to hardcoded sizes
  }
  return TAILWIND_SIZES;
}

/**
 * Snaps a pixel value to the nearest Tailwind spacing token.
 * Exported for use in selection.ts to build tooltip text.
 */
export function snapToTailwindSize(px: number): SnapResult {
  return snapToTailwind(px);
}

function snapToTailwind(px: number): SnapResult {
  const list = buildSnapList();
  let bestToken = list[0].token;
  let bestPx = list[0].px;
  let bestDist = Math.abs(px - list[0].px);

  for (const entry of list) {
    const dist = Math.abs(px - entry.px);
    if (dist < bestDist) {
      bestDist = dist;
      bestToken = entry.token;
      bestPx = entry.px;
    }
  }

  return { token: bestToken, snappedPx: bestPx };
}

// ---------------------------------------------------------------------------
// Resize state API
// ---------------------------------------------------------------------------

/**
 * Start a resize operation for the given element at the given corner.
 */
export function startResize(
  element: HTMLElement,
  corner: ResizeCorner,
  clientX: number,
  clientY: number,
): void {
  const computed = getComputedStyle(element);
  const startWidth = parseFloat(computed.width) || element.offsetWidth;
  const startHeight = parseFloat(computed.height) || element.offsetHeight;

  resizeState = {
    active: true,
    corner,
    element,
    startX: clientX,
    startY: clientY,
    startWidth,
    startHeight,
    currentWidth: startWidth,
    currentHeight: startHeight,
    resolvedWidthClass: "",
    resolvedHeightClass: "",
  };
}

/**
 * Update the resize based on current mouse position.
 * Applies snapped dimensions to element inline styles.
 * Returns a tooltip string like "w-80 (320px) × h-48 (192px)".
 */
export function updateResize(clientX: number, clientY: number): { tooltip: string } {
  if (!resizeState) return { tooltip: "" };

  const s = resizeState;
  const dx = clientX - s.startX;
  const dy = clientY - s.startY;

  // Compute raw new dimensions based on which corner is being dragged
  let rawW = s.startWidth;
  let rawH = s.startHeight;

  if (s.corner === "tr" || s.corner === "br") {
    rawW = Math.max(4, s.startWidth + dx);
  } else {
    // tl or bl — dragging left edge
    rawW = Math.max(4, s.startWidth - dx);
  }

  if (s.corner === "bl" || s.corner === "br") {
    rawH = Math.max(4, s.startHeight + dy);
  } else {
    // tl or tr — dragging top edge
    rawH = Math.max(4, s.startHeight - dy);
  }

  // Snap to nearest Tailwind spacing value
  const snapW = snapToTailwind(rawW);
  const snapH = snapToTailwind(rawH);

  s.currentWidth = snapW.snappedPx;
  s.currentHeight = snapH.snappedPx;
  s.resolvedWidthClass = `w-${snapW.token}`;
  s.resolvedHeightClass = `h-${snapH.token}`;

  // Apply snapped dimensions to element
  s.element.style.width = `${snapW.snappedPx}px`;
  s.element.style.height = `${snapH.snappedPx}px`;

  const tooltip = `${s.resolvedWidthClass} (${snapW.snappedPx}px) × ${s.resolvedHeightClass} (${snapH.snappedPx}px)`;
  return { tooltip };
}

/**
 * End the resize operation.
 * Returns the resolved Tailwind class names and clears state.
 */
export function endResize(): { widthClass: string; heightClass: string; widthPx: number; heightPx: number } {
  if (!resizeState) return { widthClass: "", heightClass: "", widthPx: 0, heightPx: 0 };

  const result = {
    widthClass: resizeState.resolvedWidthClass,
    heightClass: resizeState.resolvedHeightClass,
    widthPx: resizeState.currentWidth,
    heightPx: resizeState.currentHeight,
  };

  resizeState = null;
  return result;
}

/**
 * Returns true if a resize is currently in progress.
 */
export function isResizing(): boolean {
  return resizeState !== null && resizeState.active;
}

/**
 * Returns the current resize state, or null if no resize is active.
 */
export function getResizeState(): ResizeState | null {
  return resizeState;
}
