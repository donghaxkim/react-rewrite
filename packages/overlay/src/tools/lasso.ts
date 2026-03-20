// packages/overlay/src/tools/lasso.ts
import type { ToolEventHandler } from "../interaction.js";
import { getShadowRoot } from "../toolbar.js";
import { resolveComponentFromElement } from "./resolve-helper.js";
import { getElementsInArea } from "../utils/area-selection.js";
import { COLORS } from "../design-tokens.js";

const SVG_NS = "http://www.w3.org/2000/svg";

let lassoPoints: Array<{ x: number; y: number }> = [];
let lassoPath: SVGPathElement | null = null;
let lassoSvg: SVGSVGElement | null = null;
let selectedElements: HTMLElement[] = [];
let selectionBorders: HTMLDivElement[] = [];

export const lassoHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    clearLassoSelection();
    lassoPoints = [{ x: e.clientX, y: e.clientY }];

    const shadowRoot = getShadowRoot();
    if (!shadowRoot) return;

    // Create temporary SVG for lasso visualization
    lassoSvg = document.createElementNS(SVG_NS, "svg");
    lassoSvg.setAttribute("style",
      "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483647;"
    );
    lassoPath = document.createElementNS(SVG_NS, "path");
    lassoPath.setAttribute("stroke", COLORS.accent);
    lassoPath.setAttribute("stroke-width", "1.5");
    lassoPath.setAttribute("fill", COLORS.accentSoft);
    lassoSvg.appendChild(lassoPath);
    shadowRoot.appendChild(lassoSvg);
  },

  onMouseMove(e: MouseEvent) {
    if (!lassoPath || lassoPoints.length === 0) return;
    lassoPoints.push({ x: e.clientX, y: e.clientY });
    updateLassoPath();
  },

  async onMouseUp(_e: MouseEvent) {
    if (lassoPoints.length < 3) {
      cleanupLassoVisual();
      return;
    }

    const bounds = getLassoBounds();
    cleanupLassoVisual();

    const elements = getElementsInArea({
      x: bounds.left,
      y: bounds.top,
      width: bounds.right - bounds.left,
      height: bounds.bottom - bounds.top,
    });

    const seen = new Set<string>();
    const results = await Promise.all(
      elements.map(el => resolveComponentFromElement(el))
    );

    for (let i = 0; i < elements.length; i++) {
      const comp = results[i];
      const el = elements[i];
      if (comp && !seen.has(`${comp.filePath}:${comp.lineNumber}`)) {
        seen.add(`${comp.filePath}:${comp.lineNumber}`);
        selectedElements.push(el);
        showSelectionBorder(el.getBoundingClientRect());
      }
    }
  },
};

function updateLassoPath(): void {
  if (!lassoPath || lassoPoints.length < 2) return;
  let d = `M${lassoPoints[0].x},${lassoPoints[0].y}`;
  for (let i = 1; i < lassoPoints.length; i++) {
    d += ` L${lassoPoints[i].x},${lassoPoints[i].y}`;
  }
  d += " Z";
  lassoPath.setAttribute("d", d);
}

function getLassoBounds(): { left: number; top: number; right: number; bottom: number } {
  let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;
  for (const p of lassoPoints) {
    left = Math.min(left, p.x);
    top = Math.min(top, p.y);
    right = Math.max(right, p.x);
    bottom = Math.max(bottom, p.y);
  }
  return { left, top, right, bottom };
}

function showSelectionBorder(rect: DOMRect): void {
  const border = document.createElement("div");
  border.setAttribute("data-sketch-ui-ghost", "true");
  border.style.cssText = `
    position: fixed;
    left: ${rect.left}px;
    top: ${rect.top}px;
    width: ${rect.width}px;
    height: ${rect.height}px;
    border: 1.5px solid ${COLORS.accent};
    pointer-events: none;
    z-index: 2147483645;
  `;
  document.body.appendChild(border);
  selectionBorders.push(border);
}

function cleanupLassoVisual(): void {
  lassoSvg?.remove();
  lassoSvg = null;
  lassoPath = null;
  lassoPoints = [];
}

export function clearLassoSelection(): void {
  cleanupLassoVisual();
  selectionBorders.forEach(b => b.remove());
  selectionBorders = [];
  selectedElements = [];
}

