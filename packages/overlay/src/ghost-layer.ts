// packages/overlay/src/ghost-layer.ts
import type { ComponentRef } from "@sketch-ui/shared";
import { addGhost, removeGhost, getGhosts, getOriginalsHidden, type GhostEntry } from "./canvas-state.js";
import { getCanvasTransform, onCanvasTransformChange } from "./canvas-state.js";
import { SHADOWS, TRANSITIONS } from "./design-tokens.js";

const GHOST_Z_INDEX = "2147483644";

let unsubTransform: (() => void) | null = null;

export function initGhostLayer(): void {
  window.addEventListener("scroll", syncGhostPositions, { passive: true });
  unsubTransform = onCanvasTransformChange(syncGhostPositions);
}

let ghostRafId: number | null = null;

function syncGhostPositions(): void {
  if (ghostRafId !== null) return;
  ghostRafId = requestAnimationFrame(() => {
    ghostRafId = null;
    const { scale, offsetX, offsetY } = getCanvasTransform();
    for (const ghost of getGhosts().values()) {
      // Convert page coordinates to viewport through canvas transform
      const vx = ghost.currentPos.x * scale + offsetX;
      const vy = ghost.currentPos.y * scale + offsetY;
      ghost.cloneEl.style.left = `${vx}px`;
      ghost.cloneEl.style.top = `${vy}px`;
      ghost.cloneEl.style.transform = `scale(${scale})`;
      ghost.cloneEl.style.transformOrigin = "0 0";
    }
  });
}

export function createGhost(
  originalEl: HTMLElement,
  componentRef: ComponentRef,
): GhostEntry {
  const rect = originalEl.getBoundingClientRect();
  const { scale, offsetX, offsetY } = getCanvasTransform();
  const cloneEl = originalEl.cloneNode(true) as HTMLElement;

  cloneEl.setAttribute("data-sketch-ui-ghost", "true");
  cloneEl.style.position = "fixed";
  cloneEl.style.left = `${rect.left}px`;
  cloneEl.style.top = `${rect.top}px`;
  // Store dimensions at original (unscaled) size
  cloneEl.style.width = `${rect.width / scale}px`;
  cloneEl.style.height = `${rect.height / scale}px`;
  cloneEl.style.transform = `scale(${scale})`;
  cloneEl.style.transformOrigin = "0 0";
  cloneEl.style.zIndex = GHOST_Z_INDEX;
  cloneEl.style.pointerEvents = "none";
  cloneEl.style.margin = "0";
  cloneEl.style.boxSizing = "border-box";
  cloneEl.style.boxShadow = SHADOWS.sm;

  document.body.appendChild(cloneEl);

  const originalOpacity = originalEl.style.opacity || "";
  const originalVisibility = originalEl.style.visibility || "";

  const hidden = getOriginalsHidden();
  originalEl.style.opacity = hidden ? "0" : "0.3";
  if (hidden) originalEl.style.visibility = "hidden";

  // Store page coordinates (unscaled)
  const pageX = (rect.left - offsetX) / scale;
  const pageY = (rect.top - offsetY) / scale;

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
  // Convert page coords to viewport through canvas transform
  const { scale, offsetX, offsetY } = getCanvasTransform();
  ghost.cloneEl.style.left = `${pageX * scale + offsetX}px`;
  ghost.cloneEl.style.top = `${pageY * scale + offsetY}px`;
  ghost.cloneEl.style.transform = `scale(${scale})`;
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
  window.removeEventListener("scroll", syncGhostPositions);
  unsubTransform?.();
  unsubTransform = null;
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
