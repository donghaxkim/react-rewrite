// packages/overlay/src/tools/draw.ts
import type { ToolEventHandler } from "../interaction.js";
import type { DrawAnnotation } from "@frameup/shared";
import { getToolOptions, addAnnotation, viewportToPage } from "../canvas-state.js";
import { createLivePath, addStrokePath } from "../annotation-layer.js";
import { simplifyPoints } from "../utils/rdp.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";

let livePath: ReturnType<typeof createLivePath> = null;
let startComponentPromise: Promise<DrawAnnotation["targetComponent"]> | null = null;

export const drawHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    const opts = getToolOptions();
    livePath = createLivePath(opts.brushColor, opts.brushSize);
    if (livePath) {
      const page = viewportToPage(e.clientX, e.clientY);
      livePath.addPoint(page.x, page.y);
    }
    // Resolve target from start point (async — resolves by mouseup)
    startComponentPromise = resolveComponentAtPoint(e.clientX, e.clientY);
  },
  onMouseMove(e: MouseEvent) {
    if (!livePath) return;
    const page = viewportToPage(e.clientX, e.clientY);
    livePath.addPoint(page.x, page.y);
  },
  onMouseUp(_e: MouseEvent) {
    if (!livePath) return;
    const points = livePath.getPoints();
    const opts = getToolOptions();

    // Remove live path
    livePath.group.remove();

    if (points.length < 2) {
      livePath = null;
      startComponentPromise = null;
      return;
    }

    // Simplify and add as permanent annotation synchronously
    // so the undo stack is updated immediately (no race with Ctrl+Z)
    const simplified = simplifyPoints(points, 2);
    const id = crypto.randomUUID();
    addStrokePath(id, simplified, opts.brushColor, opts.brushSize);
    const annotation: DrawAnnotation = {
      type: "draw",
      id,
      points: simplified,
      color: opts.brushColor,
      strokeWidth: opts.brushSize,
      targetComponent: null,
    };
    addAnnotation(annotation);

    // Patch targetComponent when async resolution completes (metadata only)
    const pending = startComponentPromise;
    startComponentPromise = null;
    pending?.then(comp => { annotation.targetComponent = comp; });

    livePath = null;
  },
};
