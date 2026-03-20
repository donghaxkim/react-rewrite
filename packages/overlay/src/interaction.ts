// packages/overlay/src/interaction.ts
import { getActiveTool } from "./canvas-state.js";

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
    left: 48px;
    width: calc(100vw - 48px);
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
    // Pointer mode: interaction layer is transparent, selection.ts handles events
    interactionEl.style.pointerEvents = tool === "pointer" ? "none" : "auto";
  }

  // Update cursor
  const cursors: Record<string, string> = {
    pointer: "default",
    grab: "grab",
    move: "move",
    draw: "crosshair",
    color: "pointer",
    text: "text",
    lasso: "crosshair",
  };
  if (interactionEl) {
    interactionEl.style.cursor = cursors[tool] || "default";
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
