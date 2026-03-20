// packages/overlay/src/interaction.ts
import { getActiveTool, getToolOptions } from "./canvas-state.js";
import { moveCursorSvg, drawCursorSvg, colorCursorSvg, lassoCursorSvg } from "./design-tokens.js";

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

  interactionEl.addEventListener("mousedown", (e) => {
    activeHandler?.onMouseDown?.(e);
  });
  interactionEl.addEventListener("mousemove", (e) => {
    activeHandler?.onMouseMove?.(e);
  });
  interactionEl.addEventListener("mouseup", (e) => {
    activeHandler?.onMouseUp?.(e);
  });
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
    case "color": interactionEl.style.cursor = colorCursorSvg(); break;
    case "text": interactionEl.style.cursor = "text"; break;
    case "lasso": interactionEl.style.cursor = lassoCursorSvg(); break;
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

export function destroyInteraction(): void {
  interactionEl?.remove();
  interactionEl = null;
  activeHandler = null;
  toolHandlers.clear();
}
