// packages/overlay/src/ghost-layer.ts
import type { ComponentRef } from "@frameup/shared";
import { addGhost, removeGhost, getGhosts, getOriginalsHidden, type GhostEntry } from "./canvas-state.js";
import { getCanvasTransform } from "./canvas-state.js";
import { getCanvasWrapper, onCanvasWrapperChange } from "./canvas-transform.js";
import { SHADOWS, TRANSITIONS } from "./design-tokens.js";

const GHOST_Z_INDEX = "2147483644";

let unsubWrapper: (() => void) | null = null;

export function initGhostLayer(): void {
  unsubWrapper = onCanvasWrapperChange(handleWrapperChange);
}

/**
 * When the canvas wrapper is created/destroyed, move ghosts in/out.
 * Inside the wrapper, ghosts use position:absolute with page coords —
 * the wrapper's CSS transform handles scale + offset automatically.
 */
function handleWrapperChange(wrapperEl: HTMLDivElement | null): void {
  for (const ghost of getGhosts().values()) {
    if (wrapperEl) {
      // Move into wrapper — position:absolute, page coords, no individual scale
      wrapperEl.appendChild(ghost.cloneEl);
      ghost.cloneEl.style.position = "absolute";
      ghost.cloneEl.style.left = `${ghost.currentPos.x}px`;
      ghost.cloneEl.style.top = `${ghost.currentPos.y}px`;
      ghost.cloneEl.style.transform = "";
      ghost.cloneEl.style.transformOrigin = "";
    } else {
      // Move back to body — position:fixed, page coords (canvas resets to 1:1)
      document.body.appendChild(ghost.cloneEl);
      ghost.cloneEl.style.position = "fixed";
      ghost.cloneEl.style.left = `${ghost.currentPos.x}px`;
      ghost.cloneEl.style.top = `${ghost.currentPos.y}px`;
      ghost.cloneEl.style.transform = "";
      ghost.cloneEl.style.transformOrigin = "";
    }
  }
}

export function createGhost(
  originalEl: HTMLElement,
  componentRef: ComponentRef,
): GhostEntry {
  const rect = originalEl.getBoundingClientRect();
  const { scale, offsetX, offsetY } = getCanvasTransform();
  const cloneEl = originalEl.cloneNode(true) as HTMLElement;

  cloneEl.setAttribute("data-frameup-ghost", "true");
  // Store dimensions at original (unscaled) size
  cloneEl.style.width = `${rect.width / scale}px`;
  cloneEl.style.height = `${rect.height / scale}px`;
  cloneEl.style.zIndex = GHOST_Z_INDEX;
  cloneEl.style.pointerEvents = "none";
  cloneEl.style.margin = "0";
  cloneEl.style.boxSizing = "border-box";
  cloneEl.style.boxShadow = SHADOWS.sm;

  // Page coordinates (unscaled)
  const pageX = (rect.left - offsetX) / scale;
  const pageY = (rect.top - offsetY) / scale;

  const wrapper = getCanvasWrapper();
  if (wrapper) {
    // Inside wrapper: position:absolute with page coords, wrapper CSS transform handles rest
    cloneEl.style.position = "absolute";
    cloneEl.style.left = `${pageX}px`;
    cloneEl.style.top = `${pageY}px`;
    wrapper.appendChild(cloneEl);
  } else {
    // No wrapper: position:fixed with viewport coords
    cloneEl.style.position = "fixed";
    cloneEl.style.left = `${rect.left}px`;
    cloneEl.style.top = `${rect.top}px`;
    cloneEl.style.transform = `scale(${scale})`;
    cloneEl.style.transformOrigin = "0 0";
    document.body.appendChild(cloneEl);
  }

  const originalOpacity = originalEl.style.opacity || "";
  const originalVisibility = originalEl.style.visibility || "";

  const hidden = getOriginalsHidden();
  originalEl.style.opacity = hidden ? "0" : "0.3";
  if (hidden) originalEl.style.visibility = "hidden";

  const entry: GhostEntry = {
    id: crypto.randomUUID(),
    componentRef,
    originalRect: { top: pageY, left: pageX, width: rect.width / scale, height: rect.height / scale },
    currentPos: { x: pageX, y: pageY },
    cloneEl,
    originalEl,
    originalOpacity,
    originalVisibility,
  };

  addGhost(entry);
  return entry;
}

export function updateGhostPosition(id: string, pageX: number, pageY: number): void {
  const ghost = getGhosts().get(id);
  if (!ghost) return;
  ghost.currentPos = { x: pageX, y: pageY };

  const wrapper = getCanvasWrapper();
  if (wrapper) {
    // Inside wrapper: just set page coords, CSS transform handles the rest
    ghost.cloneEl.style.left = `${pageX}px`;
    ghost.cloneEl.style.top = `${pageY}px`;
  } else {
    // No wrapper: convert page coords to viewport
    const { scale, offsetX, offsetY } = getCanvasTransform();
    ghost.cloneEl.style.left = `${pageX * scale + offsetX}px`;
    ghost.cloneEl.style.top = `${pageY * scale + offsetY}px`;
    ghost.cloneEl.style.transform = `scale(${scale})`;
    ghost.cloneEl.style.transformOrigin = "0 0";
  }
}

export function findGhostAtPoint(clientX: number, clientY: number): GhostEntry | null {
  for (const ghost of getGhosts().values()) {
    const rect = ghost.cloneEl.getBoundingClientRect();
    if (
      clientX >= rect.left && clientX <= rect.right &&
      clientY >= rect.top && clientY <= rect.bottom
    ) {
      return ghost;
    }
  }
  return null;
}

export function destroyGhostLayer(): void {
  unsubWrapper?.();
  unsubWrapper = null;
}

/** Apply dragging visual state to a ghost */
export function setGhostDragging(id: string): void {
  const ghost = getGhosts().get(id);
  if (!ghost) return;
  ghost.cloneEl.style.boxShadow = SHADOWS.lg;
  ghost.cloneEl.style.opacity = "0.9";
  ghost.cloneEl.style.transition = `box-shadow ${TRANSITIONS.settle}`;
}

/** Apply settled visual state to a ghost (after drop) */
export function setGhostSettled(id: string): void {
  const ghost = getGhosts().get(id);
  if (!ghost) return;
  ghost.cloneEl.style.boxShadow = SHADOWS.sm;
  ghost.cloneEl.style.opacity = "1";
}
