// packages/overlay/src/highlight-canvas.ts
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

export function clearHighlights(): void {
  hoverAnim = null;
  selectionAnim = null;
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
  if (selectionAnim) drawRect(ctx, selectionAnim, ACCENT, ACCENT_MEDIUM);

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
