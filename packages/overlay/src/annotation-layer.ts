// packages/overlay/src/annotation-layer.ts
import { getShadowRoot } from "./toolbar.js";
import { COLORS, SHADOWS, RADII, FONT_FAMILY } from "./design-tokens.js";
import { getCanvasTransform, onCanvasTransformChange } from "./canvas-state.js";

const SVG_NS = "http://www.w3.org/2000/svg";

let svgEl: SVGSVGElement | null = null;
let rootGroup: SVGGElement | null = null;
let unsubTransform: (() => void) | null = null;

export function initAnnotationLayer(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  svgEl = document.createElementNS(SVG_NS, "svg");
  svgEl.setAttribute("style",
    "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483645;"
  );

  rootGroup = document.createElementNS(SVG_NS, "g");
  rootGroup.setAttribute("class", "annotation-root");
  svgEl.appendChild(rootGroup);

  shadowRoot.appendChild(svgEl);

  window.addEventListener("scroll", syncTransform, { passive: true });
  unsubTransform = onCanvasTransformChange(syncTransform);
  syncTransform();
}

let rafId: number | null = null;

/**
 * Sync the annotation root group with both scroll offset and canvas transform.
 * Annotations are stored in page coordinates, so we apply:
 *   1. Canvas scale + offset (zoom/pan)
 *   2. Scroll offset is already baked into the canvas transform when active
 */
function syncTransform(): void {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    if (!rootGroup) return;
    const { scale, offsetX, offsetY } = getCanvasTransform();
    // When canvas is active (scale !== 1 or offset !== 0), the canvas transform
    // already accounts for panning. Annotations in page coords need the same
    // scale + translate as the page content wrapper.
    rootGroup.setAttribute(
      "transform",
      `translate(${offsetX}, ${offsetY}) scale(${scale})`
    );
  });
}

export function addStrokePath(
  id: string,
  points: Array<{ x: number; y: number }>,
  color: string,
  strokeWidth: number
): SVGGElement | null {
  if (!rootGroup || points.length < 2) return null;

  const g = document.createElementNS(SVG_NS, "g");
  g.setAttribute("data-annotation-id", id);

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", pointsToPathD(points));
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", String(strokeWidth));
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("fill", "none");

  g.appendChild(path);
  rootGroup.appendChild(g);
  return g;
}

export function addTextAnnotation(
  id: string,
  x: number,
  y: number,
  content: string,
  fontSize: number,
  color: string
): SVGForeignObjectElement | null {
  if (!rootGroup) return null;

  const fo = document.createElementNS(SVG_NS, "foreignObject");
  fo.setAttribute("data-annotation-id", id);
  fo.setAttribute("x", String(x));
  fo.setAttribute("y", String(y));
  fo.setAttribute("width", "300");
  fo.setAttribute("height", "100");

  const div = document.createElement("div");
  div.style.cssText = `
    background: ${COLORS.bgPrimary};
    color: ${COLORS.textPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.sm};
    padding: 4px 8px;
    border-radius: ${RADII.sm};
    font-size: ${fontSize}px;
    font-family: ${FONT_FAMILY};
    display: inline-block;
    white-space: pre-wrap;
    max-width: 280px;
  `;
  div.textContent = content;
  fo.appendChild(div);

  rootGroup.appendChild(fo);
  return fo;
}

export function addColorBadge(
  id: string,
  x: number,
  y: number,
  color: string
): SVGCircleElement | null {
  if (!rootGroup) return null;

  const circle = document.createElementNS(SVG_NS, "circle");
  circle.setAttribute("data-annotation-id", id);
  circle.setAttribute("cx", String(x));
  circle.setAttribute("cy", String(y));
  circle.setAttribute("r", "6");
  circle.setAttribute("fill", color);
  circle.setAttribute("stroke", "white");
  circle.setAttribute("stroke-width", "1.5");

  rootGroup.appendChild(circle);
  return circle;
}

export function removeAnnotationElement(id: string): void {
  if (!rootGroup) return;
  const el = rootGroup.querySelector(`[data-annotation-id="${id}"]`);
  if (el) el.remove();
}

export function clearAnnotationLayer(): void {
  if (rootGroup) rootGroup.innerHTML = "";
}

export function destroyAnnotationLayer(): void {
  window.removeEventListener("scroll", syncTransform);
  unsubTransform?.();
  unsubTransform = null;
  svgEl?.remove();
  svgEl = null;
  rootGroup = null;
}

function pointsToPathD(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L${points[i].x},${points[i].y}`;
  }
  return d;
}

export function createLivePath(color: string, strokeWidth: number): {
  path: SVGPathElement;
  group: SVGGElement;
  addPoint: (x: number, y: number) => void;
  getPoints: () => Array<{ x: number; y: number }>;
} | null {
  if (!rootGroup) return null;

  const points: Array<{ x: number; y: number }> = [];
  const g = document.createElementNS(SVG_NS, "g");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("stroke", color);
  path.setAttribute("stroke-width", String(strokeWidth));
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("fill", "none");
  g.appendChild(path);
  rootGroup.appendChild(g);

  return {
    path,
    group: g,
    addPoint(x: number, y: number) {
      points.push({ x, y });
      path.setAttribute("d", pointsToPathD(points));
    },
    getPoints() { return points; },
  };
}
