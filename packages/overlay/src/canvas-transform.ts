// packages/overlay/src/canvas-transform.ts
// Manages the infinite canvas: wraps page content in a transform container,
// renders a dotted grid background, and handles zoom/pan updates.

import {
  getCanvasTransform,
  setCanvasTransform,
  onCanvasTransformChange,
} from "./canvas-state.js";
import { COLORS } from "./design-tokens.js";

const MIN_SCALE = 0.1;
const MAX_SCALE = 5;
const ZOOM_SENSITIVITY = 0.002;
const DOT_SPACING = 24;
const DOT_RADIUS = 1;
const DOT_COLOR = "rgba(0,0,0,0.15)";

let wrapper: HTMLDivElement | null = null;
let dotBg: HTMLDivElement | null = null;
let unsubTransform: (() => void) | null = null;

// Track original body children so we can unwrap on destroy
let originalBodyChildren: Node[] = [];

// Wrapper change listeners — notified when wrapper is created or destroyed
type WrapperChangeListener = (wrapper: HTMLDivElement | null) => void;
let wrapperChangeListeners: WrapperChangeListener[] = [];

export function getCanvasWrapper(): HTMLDivElement | null {
  return wrapper;
}

export function onCanvasWrapperChange(fn: WrapperChangeListener): () => void {
  wrapperChangeListeners.push(fn);
  return () => { wrapperChangeListeners = wrapperChangeListeners.filter(f => f !== fn); };
}

// Saved original backgrounds to restore on destroy
let savedBodyBg = "";
let savedHtmlBg = "";

/**
 * Initialize the infinite canvas.
 * - Wraps existing page content in a transform container
 * - Adds a dotted background layer
 * - Subscribes to canvas transform state changes
 */
export function initCanvasTransform(): void {
  // Save and clear body/html backgrounds so the dotted bg shows through
  savedBodyBg = document.body.style.background || document.body.style.backgroundColor || "";
  savedHtmlBg = document.documentElement.style.background || document.documentElement.style.backgroundColor || "";
  const computedBodyBg = getComputedStyle(document.body).backgroundColor;
  const computedHtmlBg = getComputedStyle(document.documentElement).backgroundColor;
  // Use the page's original bg for the wrapper (default to white)
  const pageBg = (computedBodyBg && computedBodyBg !== "rgba(0, 0, 0, 0)") ? computedBodyBg
    : (computedHtmlBg && computedHtmlBg !== "rgba(0, 0, 0, 0)") ? computedHtmlBg
    : "#ffffff";

  document.body.style.background = "transparent";
  document.documentElement.style.background = "transparent";

  // Create the wrapper that will hold page content
  wrapper = document.createElement("div");
  wrapper.setAttribute("data-react-rewrite-canvas-wrapper", "true");
  wrapper.style.cssText = `
    transform-origin: 0 0;
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    background: ${pageBg};
  `.trim().replace(/\n\s*/g, " ");

  // Create dotted background (sits behind wrapper, covers viewport)
  dotBg = document.createElement("div");
  dotBg.setAttribute("data-react-rewrite-dot-bg", "true");
  dotBg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
    background-color: ${COLORS.bgSecondary};
  `.trim().replace(/\n\s*/g, " ");

  // Move all non-ReactRewrite body children into the wrapper
  const bodyChildren = Array.from(document.body.childNodes);
  for (const child of bodyChildren) {
    if (child instanceof HTMLElement) {
      // Skip ReactRewrite elements
      if (
        child.id === "react-rewrite-root" ||
        child.hasAttribute("data-react-rewrite-interaction") ||
        child.hasAttribute("data-react-rewrite-placeholder") ||
        child.hasAttribute("data-react-rewrite-annotation") ||
        child.hasAttribute("data-react-rewrite-dot-bg") ||
        child.hasAttribute("data-react-rewrite-canvas-wrapper")
      ) {
        continue;
      }
    }
    originalBodyChildren.push(child);
    wrapper.appendChild(child);
  }

  // Wrapper needs to sit above the dot background
  wrapper.style.position = "relative";
  wrapper.style.zIndex = "1";

  // Insert bg and wrapper into body (before ReactRewrite elements)
  document.body.insertBefore(dotBg, document.body.firstChild);
  document.body.insertBefore(wrapper, dotBg.nextSibling);

  // Subscribe to transform changes
  unsubTransform = onCanvasTransformChange(applyTransform);
  applyTransform();

  // Notify listeners that wrapper is now available
  wrapperChangeListeners.forEach(fn => fn(wrapper));
}

function applyTransform(): void {
  if (!wrapper || !dotBg) return;
  const { scale, offsetX, offsetY } = getCanvasTransform();

  // Apply CSS transform to wrapper
  wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;

  // Update dotted background to match transform
  const dotSpacing = DOT_SPACING * scale;
  const bgX = offsetX % dotSpacing;
  const bgY = offsetY % dotSpacing;

  dotBg.style.backgroundImage = `radial-gradient(circle, ${DOT_COLOR} ${DOT_RADIUS}px, transparent ${DOT_RADIUS}px)`;
  dotBg.style.backgroundSize = `${dotSpacing}px ${dotSpacing}px`;
  dotBg.style.backgroundPosition = `${bgX}px ${bgY}px`;
}

/**
 * Zoom toward a specific viewport point (mouse cursor).
 * Adjusts offset so the point under the cursor stays fixed.
 */
export function zoomAtPoint(viewportX: number, viewportY: number, deltaScale: number): void {
  const { scale, offsetX, offsetY } = getCanvasTransform();

  const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + deltaScale));
  if (newScale === scale) return;

  // The page point under the cursor: pageX = (viewportX - offsetX) / scale
  // After zoom, we want the same page point at the same viewport position:
  //   viewportX = pageX * newScale + newOffsetX
  //   newOffsetX = viewportX - pageX * newScale
  const pageX = (viewportX - offsetX) / scale;
  const pageY = (viewportY - offsetY) / scale;

  const newOffsetX = viewportX - pageX * newScale;
  const newOffsetY = viewportY - pageY * newScale;

  setCanvasTransform(newScale, newOffsetX, newOffsetY);
}

/** Handle wheel events for zoom. Call from the interaction layer. */
export function handleWheelZoom(e: WheelEvent): void {
  // Pinch-to-zoom on trackpads sends wheel events with ctrlKey=true
  // Regular scroll wheel: use deltaY for zoom
  e.preventDefault();

  const delta = -e.deltaY * ZOOM_SENSITIVITY;
  const { scale } = getCanvasTransform();
  const scaledDelta = delta * scale; // Make zoom proportional to current scale

  zoomAtPoint(e.clientX, e.clientY, scaledDelta);
}

/**
 * Pan the canvas by a delta in viewport pixels.
 */
export function panCanvas(dx: number, dy: number): void {
  const { scale, offsetX, offsetY } = getCanvasTransform();
  setCanvasTransform(scale, offsetX + dx, offsetY + dy);
}

/**
 * Reset zoom/pan to default (1x, centered).
 */
export function resetCanvasTransform(): void {
  setCanvasTransform(1, 0, 0);
}

export function isCanvasActive(): boolean {
  return wrapper !== null;
}

export function toggleCanvasTransform(): void {
  if (wrapper) {
    destroyCanvasTransform();
  } else {
    initCanvasTransform();
  }
}

/**
 * Destroy the infinite canvas: unwrap page content back to body.
 */
export function destroyCanvasTransform(): void {
  // Notify listeners before wrapper is removed (so they can move elements out)
  wrapperChangeListeners.forEach(fn => fn(null));

  unsubTransform?.();
  unsubTransform = null;

  // Move children back out of wrapper
  if (wrapper) {
    while (wrapper.firstChild) {
      document.body.insertBefore(wrapper.firstChild, wrapper);
    }
    wrapper.remove();
    wrapper = null;
  }

  dotBg?.remove();
  dotBg = null;
  originalBodyChildren = [];

  // Restore original backgrounds
  document.body.style.background = savedBodyBg;
  document.documentElement.style.background = savedHtmlBg;
  savedBodyBg = "";
  savedHtmlBg = "";
}
