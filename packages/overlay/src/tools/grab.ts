// packages/overlay/src/tools/grab.ts
import type { ToolEventHandler } from "../interaction.js";
import { setInteractionCursor } from "../interaction.js";
import { panCanvas } from "../canvas-transform.js";

let dragging = false;
let lastX = 0;
let lastY = 0;

export const grabHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    setInteractionCursor("grabbing");
  },
  onMouseMove(e: MouseEvent) {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    panCanvas(dx, dy);
    lastX = e.clientX;
    lastY = e.clientY;
  },
  onMouseUp(_e: MouseEvent) {
    dragging = false;
    setInteractionCursor("grab");
  },
};
