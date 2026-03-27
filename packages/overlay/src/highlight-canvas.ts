// packages/overlay/src/highlight-canvas.ts
//
// Coordinate space note (infinite canvas):
// This canvas is position:fixed and sized to the viewport (window.innerWidth x innerHeight).
// All rect coordinates come from getBoundingClientRect(), which returns viewport coordinates
// that already account for CSS transforms (zoom/pan). Since the canvas coordinate space maps
// 1:1 to viewport space, no viewportToPage/pageToViewport mapping is needed here.
//
import { getShadowRoot } from "./toolbar.js";
import { lerp } from "./utils/lerp.js";
import { COLORS } from "./design-tokens.js";
import type { SnapGuides } from "./snap-guides.js";

// --- Constants ---
const HOVER_LERP_FACTOR = 0.35;
const SELECTION_LERP_FACTOR = 0.3;
const LERP_CONVERGENCE_THRESHOLD = 0.5;
const MIN_DPR = 2;

interface AnimatedRect {
  current: { x: number; y: number; w: number; h: number };
  target: { x: number; y: number; w: number; h: number };
  borderRadius: number;
  opacity: number;
  targetOpacity: number;
  initialized: boolean;
}

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let canvasW = 0;
let canvasH = 0;
let dpr = 1;
let rafId: number | null = null;

// Single hover + single selection (pointer mode, one element)
let hoverAnim: AnimatedRect | null = null;
let selectionAnim: AnimatedRect | null = null;

// Multi-selection (marquee / shift-click)
let multiAnims: AnimatedRect[] = [];

const ACCENT = COLORS.accent;
const ACCENT_SOFT = "rgba(162,89,255,0.08)";
const ACCENT_MEDIUM = "rgba(162,89,255,0.15)";

// Corner resize handle constants
const HANDLE_RADIUS = 4;
const HANDLE_HIT_RADIUS = 10;
const HANDLE_FILL = "#ffffff";
const HANDLE_STROKE = ACCENT;
const HANDLE_STROKE_WIDTH = 1.5;

let handlesVisible = true;
let activeGuides: SnapGuides | null = null;

export type CornerHandle = "tl" | "tr" | "br" | "bl";

interface HandlePosition {
  corner: CornerHandle;
  x: number;
  y: number;
}

// ─── Public API ──────────────────────────────────────────

export function initHighlightCanvas(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  canvas = document.createElement("canvas");
  canvas.setAttribute("data-react-rewrite-overlay", "true");
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2147483646;
  `;
  shadowRoot.appendChild(canvas);

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

export function setHoverTarget(rect: DOMRect | null, borderRadius: number = 4): void {
  if (!rect) {
    if (hoverAnim) {
      hoverAnim.targetOpacity = 0;
      scheduleFrame();
    }
    return;
  }

  const target = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

  if (!hoverAnim || !hoverAnim.initialized) {
    hoverAnim = createAnim(target, borderRadius);
  } else {
    hoverAnim.target = target;
    hoverAnim.borderRadius = borderRadius;
    hoverAnim.targetOpacity = 1;
  }
  scheduleFrame();
}

export function setSelectionTarget(rect: DOMRect | null, borderRadius: number = 4): void {
  if (!rect) {
    if (selectionAnim) {
      selectionAnim.targetOpacity = 0;
      scheduleFrame();
    }
    return;
  }

  const target = { x: rect.left, y: rect.top, w: rect.width, h: rect.height };

  if (!selectionAnim || !selectionAnim.initialized) {
    selectionAnim = createAnim(target, borderRadius);
  } else {
    selectionAnim.target = target;
    selectionAnim.borderRadius = borderRadius;
    selectionAnim.targetOpacity = 1;
  }
  scheduleFrame();
}

export function setSnapGuides(guides: SnapGuides): void {
  activeGuides = guides;
  scheduleFrame();
}

export function clearSnapGuides(): void {
  activeGuides = null;
  scheduleFrame();
}

// ─── Multi-selection API ─────────────────────────────────

/**
 * Set multiple selection targets at once (marquee / shift-click).
 * Clears single selection. Each target gets its own highlight rect.
 */
export function setMultiSelectionTargets(targets: Array<{ rect: DOMRect; borderRadius: number }>): void {
  // Clear single selection when entering multi-select
  selectionAnim = null;

  // Reuse existing anims where possible, create/remove as needed
  while (multiAnims.length > targets.length) multiAnims.pop();
  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const target = { x: t.rect.left, y: t.rect.top, w: t.rect.width, h: t.rect.height };
    if (i < multiAnims.length) {
      multiAnims[i].target = target;
      multiAnims[i].borderRadius = t.borderRadius;
      multiAnims[i].targetOpacity = 1;
    } else {
      multiAnims.push(createAnim(target, t.borderRadius));
    }
  }
  scheduleFrame();
}

export function clearMultiSelection(): void {
  multiAnims = [];
  scheduleFrame();
}

export function isMultiSelectActive(): boolean {
  return multiAnims.length > 1;
}

// ─── Handle API (works for both single and multi) ────────

export function setHandlesVisible(visible: boolean): void {
  handlesVisible = visible;
  scheduleFrame();
}

/**
 * Returns the corner handle at the given viewport point, or null.
 * Checks the active bounding box — either single selection or multi-select union.
 */
export function getHandleAtPoint(px: number, py: number): CornerHandle | null {
  if (!handlesVisible) return null;

  const box = getActiveHandleBox();
  if (!box) return null;

  const positions = getHandlePositionsFromRect(box.x, box.y, box.w, box.h);
  for (const hp of positions) {
    const dx = px - hp.x;
    const dy = py - hp.y;
    if (dx * dx + dy * dy <= HANDLE_HIT_RADIUS * HANDLE_HIT_RADIUS) {
      return hp.corner;
    }
  }
  return null;
}

/**
 * Returns the bounding box used for resize handles.
 * Single select → that element's rect.
 * Multi select → union bounding box of all elements.
 */
export function getSelectionGeometry(): { x: number; y: number; w: number; h: number } | null {
  return getActiveHandleBox();
}

// ─── Lifecycle ───────────────────────────────────────────

export function clearHighlights(): void {
  hoverAnim = null;
  selectionAnim = null;
  multiAnims = [];
  scheduleFrame();
}

export function destroyHighlightCanvas(): void {
  if (rafId !== null) cancelAnimationFrame(rafId);
  window.removeEventListener("resize", resizeCanvas);
  canvas?.remove();
  canvas = null;
  ctx = null;
  hoverAnim = null;
  selectionAnim = null;
  multiAnims = [];
  activeGuides = null;
}

// ─── Internal ────────────────────────────────────────────

function getActiveHandleBox(): { x: number; y: number; w: number; h: number } | null {
  // Multi-select: union bounding box
  if (multiAnims.length > 1) {
    return computeUnionRect(multiAnims);
  }
  // Single select
  if (selectionAnim && selectionAnim.opacity >= 0.5) {
    const { x, y, w, h } = selectionAnim.current;
    return { x, y, w, h };
  }
  // Single element in multi array (shift-click one element)
  if (multiAnims.length === 1) {
    const { x, y, w, h } = multiAnims[0].current;
    return { x, y, w, h };
  }
  return null;
}

function computeUnionRect(anims: AnimatedRect[]): { x: number; y: number; w: number; h: number } | null {
  if (anims.length === 0) return null;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const a of anims) {
    const { x, y, w, h } = a.current;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x + w > maxX) maxX = x + w;
    if (y + h > maxY) maxY = y + h;
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

function createAnim(target: { x: number; y: number; w: number; h: number }, borderRadius: number): AnimatedRect {
  return {
    current: { ...target },
    target: { ...target },
    borderRadius,
    opacity: 1,
    targetOpacity: 1,
    initialized: true,
  };
}

function resizeCanvas(): void {
  if (!canvas) return;
  dpr = Math.max(window.devicePixelRatio || 1, MIN_DPR);
  canvasW = window.innerWidth;
  canvasH = window.innerHeight;
  canvas.width = canvasW * dpr;
  canvas.height = canvasH * dpr;
  canvas.style.width = `${canvasW}px`;
  canvas.style.height = `${canvasH}px`;
  ctx = canvas.getContext("2d");
  scheduleFrame();
}

function scheduleFrame(): void {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(tick);
}

function tick(): void {
  rafId = null;
  if (!ctx || !canvas) return;

  let needsMore = false;

  if (hoverAnim?.initialized) {
    if (interpolate(hoverAnim, HOVER_LERP_FACTOR)) needsMore = true;
    if (hoverAnim.opacity < 0.01 && hoverAnim.targetOpacity === 0) hoverAnim = null;
  }

  if (selectionAnim?.initialized) {
    if (interpolate(selectionAnim, SELECTION_LERP_FACTOR)) needsMore = true;
    if (selectionAnim.opacity < 0.01 && selectionAnim.targetOpacity === 0) selectionAnim = null;
  }

  for (let i = multiAnims.length - 1; i >= 0; i--) {
    const a = multiAnims[i];
    if (a.initialized && interpolate(a, SELECTION_LERP_FACTOR)) needsMore = true;
    if (a.opacity < 0.01 && a.targetOpacity === 0) multiAnims.splice(i, 1);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Draw hover
  if (hoverAnim) drawRect(ctx, hoverAnim, ACCENT, ACCENT_SOFT);

  // Draw single selection
  if (selectionAnim) {
    drawRect(ctx, selectionAnim, ACCENT, ACCENT_MEDIUM);
    if (handlesVisible) drawHandlesAt(ctx, selectionAnim.current, selectionAnim.opacity);
  }

  // Draw snap alignment guides
  if (activeGuides) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    if (activeGuides.verticalLine) {
      const { x } = activeGuides.verticalLine;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    if (activeGuides.horizontalLine) {
      const { y } = activeGuides.horizontalLine;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw multi-selection: individual rects + handles on union box
  if (multiAnims.length > 0) {
    for (const a of multiAnims) {
      drawRect(ctx, a, ACCENT, ACCENT_MEDIUM);
    }
    if (handlesVisible && multiAnims.length > 0) {
      const union = computeUnionRect(multiAnims);
      if (union && union.w >= 24 && union.h >= 24) {
        // Draw dashed union bounding box when multi-selecting (2+ elements)
        if (multiAnims.length > 1) {
          ctx.globalAlpha = 0.6;
          ctx.beginPath();
          ctx.rect(union.x, union.y, union.w, union.h);
          ctx.strokeStyle = ACCENT;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
        drawHandlesAt(ctx, union, 1);
      }
    }
  }

  if (needsMore) rafId = requestAnimationFrame(tick);
}

function interpolate(anim: AnimatedRect, factor: number): boolean {
  const c = anim.current;
  const t = anim.target;

  const nx = lerp(c.x, t.x, factor);
  const ny = lerp(c.y, t.y, factor);
  const nw = lerp(c.w, t.w, factor);
  const nh = lerp(c.h, t.h, factor);
  const no = lerp(anim.opacity, anim.targetOpacity, factor);

  const converged =
    Math.abs(nx - t.x) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(ny - t.y) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(nw - t.w) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(nh - t.h) < LERP_CONVERGENCE_THRESHOLD &&
    Math.abs(no - anim.targetOpacity) < 0.01;

  if (converged) {
    c.x = t.x; c.y = t.y; c.w = t.w; c.h = t.h;
    anim.opacity = anim.targetOpacity;
    return false;
  }

  c.x = nx; c.y = ny; c.w = nw; c.h = nh;
  anim.opacity = no;
  return true;
}

function drawRect(
  c: CanvasRenderingContext2D,
  anim: AnimatedRect,
  strokeColor: string,
  fillColor: string,
): void {
  const { x, y, w, h } = anim.current;
  if (w <= 0 || h <= 0) return;

  const r = Math.min(anim.borderRadius, w / 2, h / 2);
  c.globalAlpha = anim.opacity;

  c.beginPath();
  if (r > 0) {
    c.roundRect(x, y, w, h, r);
  } else {
    c.rect(x, y, w, h);
  }

  c.fillStyle = fillColor;
  c.fill();
  c.strokeStyle = strokeColor;
  c.lineWidth = 1.5;
  c.stroke();

  c.globalAlpha = 1;
}

function getHandlePositionsFromRect(x: number, y: number, w: number, h: number): HandlePosition[] {
  return [
    { corner: "tl", x, y },
    { corner: "tr", x: x + w, y },
    { corner: "br", x: x + w, y: y + h },
    { corner: "bl", x, y: y + h },
  ];
}

function drawHandlesAt(
  c: CanvasRenderingContext2D,
  rect: { x: number; y: number; w: number; h: number },
  opacity: number,
): void {
  if (rect.w < 24 || rect.h < 24) return;

  c.globalAlpha = opacity;
  const positions = getHandlePositionsFromRect(rect.x, rect.y, rect.w, rect.h);

  for (const hp of positions) {
    c.beginPath();
    c.arc(hp.x, hp.y, HANDLE_RADIUS, 0, Math.PI * 2);
    c.fillStyle = HANDLE_FILL;
    c.fill();
    c.strokeStyle = HANDLE_STROKE;
    c.lineWidth = HANDLE_STROKE_WIDTH;
    c.stroke();
  }

  c.globalAlpha = 1;
}
