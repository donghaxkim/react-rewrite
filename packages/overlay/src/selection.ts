// packages/overlay/src/selection.ts
import { resolveElementInfo } from "element-source";
import { freeze, unfreeze } from "react-grab/primitives";
import type { ComponentInfo } from "@sketch-ui/shared";
import { updateComponentInfo, getShadowRoot } from "./toolbar.js";

let currentSelection: ComponentInfo | null = null;
let selectedElement: HTMLElement | null = null;
let isActive = false;

// Overlay elements
let hoverOverlay: HTMLDivElement | null = null;
let selectionOverlay: HTMLDivElement | null = null;
let selectionLabel: HTMLDivElement | null = null;
let marqueeBox: HTMLDivElement | null = null;

// Interaction state machine
type InteractionMode = "idle" | "pending" | "marquee" | "drag";
let mode: InteractionMode = "idle";
let mouseDownPos: { x: number; y: number } | null = null;
let mouseDownElement: HTMLElement | null = null;

// Drag callbacks — set by drag.ts via setDragCallbacks
let onDragStartCallback: ((e: MouseEvent, el: HTMLElement, selection: ComponentInfo) => void) | null = null;
let onDragMoveCallback: ((e: MouseEvent) => void) | null = null;
let onDragEndCallback: ((e: MouseEvent) => void) | null = null;

const OVERLAY_STYLES = `
  .hover-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #42a5f5;
    background: rgba(66, 165, 245, 0.08);
    z-index: 2147483646;
    transition: all 0.05s ease-out;
    display: none;
  }
  .selection-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #1e88e5;
    background: rgba(30, 136, 229, 0.05);
    z-index: 2147483646;
    display: none;
  }
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: #1e88e5;
    color: white;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 3px;
    z-index: 2147483646;
    font-family: -apple-system, BlinkMacSystemFont, monospace;
    white-space: nowrap;
    display: none;
  }
  .marquee-box {
    position: fixed;
    border: 1px dashed #42a5f5;
    background: rgba(66, 165, 245, 0.1);
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`;

export function setDragCallbacks(callbacks: {
  onStart: (e: MouseEvent, el: HTMLElement, selection: ComponentInfo) => void;
  onMove: (e: MouseEvent) => void;
  onEnd: (e: MouseEvent) => void;
}): void {
  onDragStartCallback = callbacks.onStart;
  onDragMoveCallback = callbacks.onMove;
  onDragEndCallback = callbacks.onEnd;
}

export function initSelection(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const style = document.createElement("style");
  style.textContent = OVERLAY_STYLES;
  shadowRoot.appendChild(style);

  hoverOverlay = document.createElement("div");
  hoverOverlay.className = "hover-overlay";
  shadowRoot.appendChild(hoverOverlay);

  selectionOverlay = document.createElement("div");
  selectionOverlay.className = "selection-overlay";
  shadowRoot.appendChild(selectionOverlay);

  selectionLabel = document.createElement("div");
  selectionLabel.className = "selection-label";
  shadowRoot.appendChild(selectionLabel);

  marqueeBox = document.createElement("div");
  marqueeBox.className = "marquee-box";
  shadowRoot.appendChild(marqueeBox);

  freeze();
  isActive = true;

  // Single set of event listeners — selection.ts owns all mouse dispatch
  document.addEventListener("mousedown", handleMouseDown, true);
  document.addEventListener("mousemove", handleMouseMove, true);
  document.addEventListener("mouseup", handleMouseUp, true);
  document.addEventListener("keydown", handleKeyDown, true);
}

function handleMouseDown(e: MouseEvent): void {
  if (!isActive) return;
  e.preventDefault();
  e.stopPropagation();

  const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  if (!el || el.closest("#sketch-ui-root")) return;

  mouseDownPos = { x: e.clientX, y: e.clientY };
  mouseDownElement = el;

  // Decide: if clicking on the currently selected element → drag mode
  // Otherwise → selection/marquee mode
  if (currentSelection && selectedElement && selectedElement.contains(el)) {
    mode = "drag";
    // Notify drag system immediately so it can set up preview
    if (onDragStartCallback) {
      onDragStartCallback(e, selectedElement, currentSelection);
    }
  } else {
    mode = "pending"; // Will become "marquee" if dragged > 10px, or "click" on mouseup
  }
}

function handleMouseMove(e: MouseEvent): void {
  if (!isActive) return;

  if (mode === "drag") {
    // Delegate to drag system
    if (onDragMoveCallback) onDragMoveCallback(e);
    return;
  }

  if (mode === "pending" && mouseDownPos) {
    const dx = Math.abs(e.clientX - mouseDownPos.x);
    const dy = Math.abs(e.clientY - mouseDownPos.y);
    if (dx > 10 || dy > 10) {
      mode = "marquee";
    }
  }

  if (mode === "marquee" && mouseDownPos && marqueeBox) {
    const x = Math.min(e.clientX, mouseDownPos.x);
    const y = Math.min(e.clientY, mouseDownPos.y);
    const w = Math.abs(e.clientX - mouseDownPos.x);
    const h = Math.abs(e.clientY - mouseDownPos.y);
    marqueeBox.style.display = "block";
    marqueeBox.style.left = `${x}px`;
    marqueeBox.style.top = `${y}px`;
    marqueeBox.style.width = `${w}px`;
    marqueeBox.style.height = `${h}px`;
    return;
  }

  // Hover highlight (only when idle — no mouse button down)
  if (mode === "idle") {
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!el || el.closest("#sketch-ui-root")) {
      hideHoverOverlay();
      return;
    }

    const rect = el.getBoundingClientRect();
    if (hoverOverlay) {
      hoverOverlay.style.display = "block";
      hoverOverlay.style.left = `${rect.left}px`;
      hoverOverlay.style.top = `${rect.top}px`;
      hoverOverlay.style.width = `${rect.width}px`;
      hoverOverlay.style.height = `${rect.height}px`;
    }
  }
}

async function handleMouseUp(e: MouseEvent): Promise<void> {
  if (!isActive) return;

  const prevMode = mode;
  mode = "idle";

  if (prevMode === "drag") {
    if (onDragEndCallback) onDragEndCallback(e);
    mouseDownPos = null;
    mouseDownElement = null;
    return;
  }

  if (prevMode === "marquee" && mouseDownPos) {
    if (marqueeBox) marqueeBox.style.display = "none";
    await performMarqueeSelect(
      Math.min(e.clientX, mouseDownPos.x),
      Math.min(e.clientY, mouseDownPos.y),
      Math.max(e.clientX, mouseDownPos.x),
      Math.max(e.clientY, mouseDownPos.y)
    );
    mouseDownPos = null;
    mouseDownElement = null;
    return;
  }

  // prevMode was "pending" — treat as a click (small movement)
  if (mouseDownElement) {
    await selectElement(mouseDownElement);
  }
  mouseDownPos = null;
  mouseDownElement = null;
}

async function selectElement(el: HTMLElement): Promise<void> {
  try {
    const info = await resolveElementInfo(el);
    if (!info || !info.source) return;

    selectedElement = el;
    currentSelection = {
      tagName: info.tagName || el.tagName.toLowerCase(),
      componentName: info.componentName || el.tagName.toLowerCase(),
      filePath: info.source.filePath,
      lineNumber: info.source.lineNumber,
      columnNumber: info.source.columnNumber,
      stack: info.stack || [],
      boundingRect: {
        top: el.getBoundingClientRect().top,
        left: el.getBoundingClientRect().left,
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height,
      },
    };

    showSelectionOverlay(el.getBoundingClientRect(), currentSelection);
    hideHoverOverlay();

    updateComponentInfo(
      `<${currentSelection.componentName} /> — ${currentSelection.filePath}:${currentSelection.lineNumber}`
    );
  } catch {
    // Element might not have React fiber info
  }
}

async function performMarqueeSelect(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): Promise<void> {
  const elements: HTMLElement[] = [];
  const allElements = document.querySelectorAll("*");

  for (const el of allElements) {
    if (el.closest("#sketch-ui-root")) continue;
    const rect = el.getBoundingClientRect();
    if (
      rect.left < x2 &&
      rect.right > x1 &&
      rect.top < y2 &&
      rect.bottom > y1 &&
      rect.width > 0 &&
      rect.height > 0
    ) {
      elements.push(el as HTMLElement);
    }
  }

  if (elements.length === 0) return;

  const stacks: Array<ComponentInfo["stack"]> = [];
  for (const el of elements.slice(0, 50)) {
    try {
      const info = await resolveElementInfo(el);
      if (info?.stack?.length) {
        stacks.push(info.stack);
      }
    } catch {
      // Skip
    }
  }

  if (stacks.length === 0) return;

  const lca = findLowestCommonAncestor(stacks);
  if (!lca) return;

  for (const el of elements) {
    try {
      const info = await resolveElementInfo(el);
      if (
        info?.source?.filePath === lca.filePath &&
        info?.source?.lineNumber === lca.lineNumber
      ) {
        const rect = el.getBoundingClientRect();
        selectedElement = el as HTMLElement;
        currentSelection = {
          tagName: info.tagName || el.tagName.toLowerCase(),
          componentName: lca.componentName,
          filePath: lca.filePath,
          lineNumber: lca.lineNumber,
          columnNumber: lca.columnNumber,
          stack: info.stack || [],
          boundingRect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
        };

        showSelectionOverlay(rect, currentSelection);
        updateComponentInfo(
          `<${lca.componentName} /> — ${lca.filePath}:${lca.lineNumber}`
        );
        return;
      }
    } catch {
      // Skip
    }
  }
}

function findLowestCommonAncestor(
  stacks: Array<ComponentInfo["stack"]>
): ComponentInfo["stack"][0] | null {
  if (stacks.length === 0) return null;
  if (stacks.length === 1) return stacks[0][0];

  const firstStack = stacks[0];
  let lastCommon: ComponentInfo["stack"][0] | null = null;

  for (let depth = 0; depth < firstStack.length; depth++) {
    const candidate = firstStack[depth];
    const allMatch = stacks.every(
      (stack) =>
        stack[depth] &&
        stack[depth].filePath === candidate.filePath &&
        stack[depth].lineNumber === candidate.lineNumber
    );
    if (allMatch) {
      lastCommon = candidate;
    } else {
      break;
    }
  }

  return lastCommon;
}

function handleKeyDown(e: KeyboardEvent): void {
  if (!isActive) return;

  if (e.key === "Escape" && currentSelection) {
    // Deselect (hierarchy navigation deferred — see spec notes)
    clearSelection();
    e.preventDefault();
  }
}

function showSelectionOverlay(rect: DOMRect, info: ComponentInfo): void {
  if (selectionOverlay) {
    selectionOverlay.style.display = "block";
    selectionOverlay.style.left = `${rect.left}px`;
    selectionOverlay.style.top = `${rect.top}px`;
    selectionOverlay.style.width = `${rect.width}px`;
    selectionOverlay.style.height = `${rect.height}px`;
  }

  if (selectionLabel) {
    selectionLabel.style.display = "block";
    selectionLabel.style.left = `${rect.left}px`;
    selectionLabel.style.top = `${rect.top - 20}px`;
    selectionLabel.textContent = `<${info.componentName} />`;
  }
}

function hideHoverOverlay(): void {
  if (hoverOverlay) hoverOverlay.style.display = "none";
}

export function clearSelection(): void {
  currentSelection = null;
  selectedElement = null;
  if (selectionOverlay) selectionOverlay.style.display = "none";
  if (selectionLabel) selectionLabel.style.display = "none";
  updateComponentInfo("No selection");
}

export function getSelection(): ComponentInfo | null {
  return currentSelection;
}

export function deactivateSelection(): void {
  isActive = false;
  unfreeze();
  document.removeEventListener("mousedown", handleMouseDown, true);
  document.removeEventListener("mousemove", handleMouseMove, true);
  document.removeEventListener("mouseup", handleMouseUp, true);
  document.removeEventListener("keydown", handleKeyDown, true);
}
