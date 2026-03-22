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
  async onMouseUp(_e: MouseEvent) {
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

    // Await the target component resolution (started on mousedown)
    const startComponent = await startComponentPromise;

    // Simplify and add as permanent annotation
    const simplified = simplifyPoints(points, 2);
    const id = crypto.randomUUID();
    addStrokePath(id, simplified, opts.brushColor, opts.brushSize);
    addAnnotation({
      type: "draw",
      id,
      points: simplified,
      color: opts.brushColor,
      strokeWidth: opts.brushSize,
      targetComponent: startComponent,
    });

    livePath = null;
    startComponentPromise = null;
  },
};
