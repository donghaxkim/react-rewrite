// packages/overlay/src/ghost-layer.ts
import type { ComponentRef } from "@sketch-ui/shared";
import { addGhost, removeGhost, getGhosts, getOriginalsHidden, type GhostEntry } from "./canvas-state.js";
import { SHADOWS, TRANSITIONS } from "./design-tokens.js";

const GHOST_Z_INDEX = "2147483644";

export function initGhostLayer(): void {
  window.addEventListener("scroll", syncGhostScroll, { passive: true });
}

let ghostRafId: number | null = null;

function syncGhostScroll(): void {
  if (ghostRafId !== null) return;
  ghostRafId = requestAnimationFrame(() => {
    ghostRafId = null;
    for (const ghost of getGhosts().values()) {
      ghost.cloneEl.style.left = `${ghost.currentPos.x - window.scrollX}px`;
      ghost.cloneEl.style.top = `${ghost.currentPos.y - window.scrollY}px`;
    }
  });
}

export function createGhost(
  originalEl: HTMLElement,
  componentRef: ComponentRef,
): GhostEntry {
  const rect = originalEl.getBoundingClientRect();
  const cloneEl = originalEl.cloneNode(true) as HTMLElement;

  cloneEl.setAttribute("data-sketch-ui-ghost", "true");
  cloneEl.style.position = "fixed";
  cloneEl.style.left = `${rect.left}px`;
  cloneEl.style.top = `${rect.top}px`;
  cloneEl.style.width = `${rect.width}px`;
  cloneEl.style.height = `${rect.height}px`;
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

  const entry: GhostEntry = {
    id: crypto.randomUUID(),
    componentRef,
    originalRect: { top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width, height: rect.height },
    currentPos: { x: rect.left + window.scrollX, y: rect.top + window.scrollY },
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
  ghost.cloneEl.style.left = `${pageX - window.scrollX}px`;
  ghost.cloneEl.style.top = `${pageY - window.scrollY}px`;
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
  window.removeEventListener("scroll", syncGhostScroll);
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
