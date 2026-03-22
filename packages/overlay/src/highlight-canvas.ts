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

// --- Constants (from react-grab, adapted) ---
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

let hoverAnim: AnimatedRect | null = null;
let selectionAnim: AnimatedRect | null = null;

const ACCENT = COLORS.accent;
const ACCENT_SOFT = "rgba(162,89,255,0.08)";
const ACCENT_MEDIUM = "rgba(162,89,255,0.15)";

// Corner handle constants
const HANDLE_RADIUS = 4;
const HANDLE_HIT_RADIUS = 10;
const HANDLE_FILL = "#ffffff";
const HANDLE_STROKE = ACCENT;
const HANDLE_STROKE_WIDTH = 1.5;

// Whether to show border-radius handles (only in pointer mode with a selection)
let handlesVisible = true;
// Override radius while dragging (null = use element's computed radius)
let dragOverrideRadius: number | null = null;

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
  canvas.setAttribute("data-sketch-ui-ghost", "true");
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

export function setHandlesVisible(visible: boolean): void {
  handlesVisible = visible;
  scheduleFrame();
}

export function setDragOverrideRadius(radius: number | null): void {
  dragOverrideRadius = radius;
  if (selectionAnim && radius !== null) {
    selectionAnim.borderRadius = radius;
  }
  scheduleFrame();
}

/**
 * Returns the corner handle at the given viewport point, or null.
 * Uses HANDLE_HIT_RADIUS for generous hit area.
 */
export function getHandleAtPoint(px: number, py: number): CornerHandle | null {
  if (!handlesVisible || !selectionAnim || selectionAnim.opacity < 0.5) return null;
  const positions = getHandlePositions(selectionAnim);
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
 * Returns the current selection rect geometry for drag calculations.
 */
export function getSelectionGeometry(): { x: number; y: number; w: number; h: number; borderRadius: number } | null {
  if (!selectionAnim || selectionAnim.opacity < 0.5) return null;
  const { x, y, w, h } = selectionAnim.current;
  return { x, y, w, h, borderRadius: selectionAnim.borderRadius };
}

export function clearHighlights(): void {
  hoverAnim = null;
  selectionAnim = null;
  dragOverrideRadius = null;
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
}

// ─── Internal ────────────────────────────────────────────

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
  // Don't ctx.scale here — tick() uses setTransform to reset each frame
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

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  if (hoverAnim) drawRect(ctx, hoverAnim, ACCENT, ACCENT_SOFT);
  if (selectionAnim) {
    drawRect(ctx, selectionAnim, ACCENT, ACCENT_MEDIUM);
    if (handlesVisible) drawHandles(ctx, selectionAnim);
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

/**
 * Computes corner handle positions for the given animated rect.
 * Each handle sits at (corner + borderRadius inward diagonally).
 */
function getHandlePositions(anim: AnimatedRect): HandlePosition[] {
  const { x, y, w, h } = anim.current;
  const r = Math.min(anim.borderRadius, w / 2, h / 2);
  return [
    { corner: "tl", x: x + r, y: y + r },
    { corner: "tr", x: x + w - r, y: y + r },
    { corner: "br", x: x + w - r, y: y + h - r },
    { corner: "bl", x: x + r, y: y + h - r },
  ];
}

/**
 * Draws small circular handles at the corners of the selection rect.
 * Handle position moves inward as border-radius increases.
 */
function drawHandles(c: CanvasRenderingContext2D, anim: AnimatedRect): void {
  const { w, h } = anim.current;
  if (w < 24 || h < 24) return; // Too small for handles

  c.globalAlpha = anim.opacity;
  const positions = getHandlePositions(anim);

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
