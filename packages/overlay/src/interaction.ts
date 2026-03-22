// packages/overlay/src/interaction.ts
import { getActiveTool, getToolOptions } from "./canvas-state.js";
import { moveCursorSvg, drawCursorSvg } from "./design-tokens.js";
import { getCachedElement, setCachedElement, clearElementCache } from "./utils/element-cache.js";
import { handleWheelZoom } from "./canvas-transform.js";

export type ToolEventHandler = {
  onMouseDown?: (e: MouseEvent) => void | Promise<void>;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void | Promise<void>;
};

let interactionEl: HTMLDivElement | null = null;
let activeHandler: ToolEventHandler | null = null;
let toolHandlers: Map<string, ToolEventHandler> = new Map();

export function registerToolHandler(tool: string, handler: ToolEventHandler): void {
  toolHandlers.set(tool, handler);
}

export function initInteraction(): void {
  interactionEl = document.createElement("div");
  interactionEl.setAttribute("data-sketch-ui-interaction", "true");
  interactionEl.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `;

  document.body.appendChild(interactionEl);

  document.addEventListener("scroll", clearElementCache, true);

  interactionEl.addEventListener("mousedown", (e) => {
    activeHandler?.onMouseDown?.(e);
  });
  interactionEl.addEventListener("mousemove", (e) => {
    activeHandler?.onMouseMove?.(e);
  });
  interactionEl.addEventListener("mouseup", (e) => {
    activeHandler?.onMouseUp?.(e);
  });

  // Wheel zoom for infinite canvas (works on any tool)
  document.addEventListener("wheel", onWheel, { passive: false });
}

function onWheel(e: WheelEvent): void {
  if (!interactionEl) return;
  // Only zoom on Ctrl/Cmd+scroll (standard pinch-to-zoom). Regular scroll passes through.
  if (!e.ctrlKey && !e.metaKey) return;
  const target = e.target as HTMLElement;
  if (target?.closest?.("#sketch-ui-root")) return;
  handleWheelZoom(e);
}

export function activateInteraction(tool: string): void {
  activeHandler = toolHandlers.get(tool) || null;
  if (interactionEl) {
    interactionEl.style.pointerEvents = tool === "pointer" ? "none" : "auto";
  }
  updateCursor(tool);
}

function updateCursor(tool: string): void {
  if (!interactionEl) return;
  switch (tool) {
    case "pointer": interactionEl.style.cursor = "default"; break;
    case "grab": interactionEl.style.cursor = "grab"; break;
    case "move": interactionEl.style.cursor = moveCursorSvg(); break;
    case "draw": interactionEl.style.cursor = drawCursorSvg(getToolOptions().brushSize); break;
    case "text": interactionEl.style.cursor = "text"; break;
    default: interactionEl.style.cursor = "default";
  }
}

/** Call when brush size changes to update the draw cursor */
export function refreshDrawCursor(): void {
  if (getActiveTool() === "draw" && interactionEl) {
    interactionEl.style.cursor = drawCursorSvg(getToolOptions().brushSize);
  }
}

export function setInteractionCursor(cursor: string): void {
  if (interactionEl) interactionEl.style.cursor = cursor;
}

/** Temporarily disable/enable the interaction layer's pointer events.
 *  Used by color picker to prevent the interaction layer from stealing clicks. */
export function setInteractionPointerEvents(enabled: boolean): void {
  if (interactionEl) {
    interactionEl.style.pointerEvents = enabled ? "auto" : "none";
  }
}

/**
 * Find the actual page element at a viewport point, looking through all SketchUI layers.
 * Uses elementsFromPoint to skip the interaction layer, shadow DOM host, and ghost elements.
 */
export function getPageElementAtPoint(clientX: number, clientY: number): HTMLElement | null {
  // Check cache first — avoids expensive elementsFromPoint on small mouse movements
  const cached = getCachedElement(clientX, clientY);
  if (cached !== undefined) return cached;

  const elements = document.elementsFromPoint(clientX, clientY);
  let result: HTMLElement | null = null;

  for (const el of elements) {
    if (!(el instanceof HTMLElement)) continue;
    if (el.closest("#sketch-ui-root")) continue;
    if (el.hasAttribute("data-sketch-ui-interaction")) continue;
    if (el.hasAttribute("data-sketch-ui-ghost")) continue;
    if (el === document.body || el === document.documentElement) continue;
    result = el;
    break;
  }

  setCachedElement(clientX, clientY, result);
  return result;
}

export function destroyInteraction(): void {
  document.removeEventListener("scroll", clearElementCache, true);
  document.removeEventListener("wheel", onWheel);
  interactionEl?.remove();
  interactionEl = null;
  activeHandler = null;
  toolHandlers.clear();
}
