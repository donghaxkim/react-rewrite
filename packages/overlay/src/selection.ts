// packages/overlay/src/selection.ts
//
// Coordinate space note (infinite canvas):
// When the canvas transform is active (zoom/pan via CSS transform on a wrapper div),
// all coordinate APIs used here remain correct without explicit mapping:
//   - getBoundingClientRect() returns viewport coordinates that already account for
//     CSS transforms, so highlight rects and label positioning are correct.
//   - elementFromPoint() / elementsFromPoint() accept viewport coordinates and the
//     browser resolves hit-testing through CSS transforms automatically.
//   - The highlight canvas (highlight-canvas.ts) is position:fixed and draws in
//     viewport space, matching getBoundingClientRect() output.
//   - The selection label and marquee box are position:fixed, so using clientX/clientY
//     and rect.left/rect.top (all viewport coords) is correct.
//   - The area selection (area-selection.ts) compares marquee bounds (viewport coords
//     from clientX/clientY) against getBoundingClientRect() (viewport coords). Consistent.
// Therefore, no viewportToPage/pageToViewport mapping is needed in this module.
//
import { getFiberFromHostInstance, getDisplayName, isCompositeFiber, isInstrumentationActive, instrument } from "bippy";
import { getOwnerStack, normalizeFileName, isSourceFile } from "bippy/source";
import type { ComponentInfo } from "@sketch-ui/shared";
import { getShadowRoot, updateComponentDetail } from "./toolbar.js";
import { isInternalName, isFullPageElement, isValidElement } from "./utils/component-filter.js";
import { getElementsInArea } from "./utils/area-selection.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { setHoverTarget, setSelectionTarget, getHandleAtPoint, getSelectionGeometry, setDragOverrideRadius, type CornerHandle } from "./highlight-canvas.js";
import { inspect, deselect as deselectProperty, commitAndDeselect, cancel as cancelProperty, hasActiveOverrides, preview, scheduledCommit } from "./properties/property-controller.js";
import { findGhostAtPoint } from "./ghost-layer.js";
import type { GhostEntry } from "./canvas-state.js";

// Ensure bippy instrumentation is active so we can read fiber info
if (!isInstrumentationActive()) {
  instrument({
    onCommitFiberRoot() {
      // no-op — we just need the hook installed
    },
  });
}

type ResolvedComponent = {
  tagName: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  stack: Array<{ componentName: string; filePath: string; lineNumber: number; columnNumber: number }>;
};

/**
 * Resolve component info from a DOM element using bippy's owner stack.
 * Handles both React 18 (_debugSource) and React 19 (owner stacks + source maps).
 */
async function resolveComponentFromElement(el: HTMLElement): Promise<ResolvedComponent | null> {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  // Try bippy/source getOwnerStack first — handles React 19 owner stacks with symbolication
  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      const stack: ResolvedComponent["stack"] = [];
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        let filePath = "";
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized)) {
            filePath = normalized;
          }
        }

        stack.push({
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
          columnNumber: frame.columnNumber ?? 0,
        });
      }

      if (stack.length > 0) {
        return {
          tagName: el.tagName.toLowerCase(),
          componentName: stack[0].componentName,
          filePath: stack[0].filePath,
          lineNumber: stack[0].lineNumber,
          columnNumber: stack[0].columnNumber,
          stack,
        };
      }
    }
  } catch (err) {
    console.warn("[SketchUI] getOwnerStack failed, falling back to fiber walk:", err);
  }

  // Fallback: synchronous fiber walk (works when owner stacks aren't available)
  return resolveComponentFromFiberWalk(el, fiber);
}

/** Synchronous fallback — walks fiber.return chain for component names */
function resolveComponentFromFiberWalk(el: HTMLElement, fiber: any): ResolvedComponent | null {
  const stack: ResolvedComponent["stack"] = [];
  let current = fiber;

  while (current) {
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current.type);
      const debugSource = current._debugSource || current._debugOwner?._debugSource;

      let filePath = "";
      let lineNumber = 0;
      let columnNumber = 0;

      if (debugSource) {
        filePath = debugSource.fileName || "";
        lineNumber = debugSource.lineNumber || 0;
        columnNumber = debugSource.columnNumber || 0;
      }

      if (name && name[0] === name[0].toUpperCase() && !isInternalName(name)) {
        stack.push({ componentName: name, filePath, lineNumber, columnNumber });
      }
    }
    current = current.return;
  }

  if (stack.length === 0) return null;

  return {
    tagName: el.tagName.toLowerCase(),
    componentName: stack[0].componentName,
    filePath: stack[0].filePath,
    lineNumber: stack[0].lineNumber,
    columnNumber: stack[0].columnNumber,
    stack,
  };
}

/** Synchronous-only resolve for hover labels and marquee (fast path) */
function resolveComponentSync(el: HTMLElement): ResolvedComponent | null {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;
  return resolveComponentFromFiberWalk(el, fiber);
}


let currentSelection: ComponentInfo | null = null;
let selectedElement: HTMLElement | null = null;
let selectedGhost: GhostEntry | null = null; // non-null when selection is a moved ghost
let isActive = false;
let listenersAttached = false;

// Overlay elements
let selectionLabel: HTMLDivElement | null = null;
let marqueeBox: HTMLDivElement | null = null;

// Interaction state machine
type InteractionMode = "idle" | "pending" | "marquee" | "pending-drag" | "drag" | "radius-drag";
let mode: InteractionMode = "idle";
let mouseDownPos: { x: number; y: number } | null = null;
let mouseDownElement: HTMLElement | null = null;

// Border-radius drag state
let radiusDragCorner: CornerHandle | null = null;
let radiusDragInitialRadius = 0;

// Drag callbacks — set by drag.ts via setDragCallbacks
let onDragStartCallback: ((e: MouseEvent, el: HTMLElement, selection: ComponentInfo) => void) | null = null;
let onDragMoveCallback: ((e: MouseEvent) => void) | null = null;
let onDragEndCallback: ((e: MouseEvent) => void) | null = null;

const OVERLAY_STYLES = `
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.sm};
    border-radius: ${RADII.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${FONT_FAMILY};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
  }
  .selection-label.visible {
    opacity: 1;
  }
  .selection-label .comp-name {
    color: ${COLORS.textPrimary};
    font-size: 12px;
    font-weight: 600;
  }
  .selection-label .comp-path {
    color: ${COLORS.textSecondary};
    font-size: 11px;
    margin-left: 8px;
  }
  .selection-label .loading-dots {
    color: ${COLORS.textTertiary};
    font-size: 12px;
  }
  @keyframes dotPulse {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  }
  .selection-label .loading-dots span {
    animation: dotPulse 1.4s infinite;
  }
  .selection-label .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .selection-label .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  .marquee-box {
    position: fixed;
    border: 1px solid ${COLORS.accent};
    background: ${COLORS.accentSoft};
    border-radius: 2px;
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

  selectionLabel = document.createElement("div");
  selectionLabel.className = "selection-label";
  shadowRoot.appendChild(selectionLabel);

  marqueeBox = document.createElement("div");
  marqueeBox.className = "marquee-box";
  shadowRoot.appendChild(marqueeBox);

  isActive = true;

  // Single set of event listeners — selection.ts owns all mouse dispatch
  document.addEventListener("mousedown", handleMouseDown, true);
  document.addEventListener("mousemove", handleMouseMove, true);
  document.addEventListener("mouseup", handleMouseUp, true);
  document.addEventListener("keydown", handleKeyDown, true);
  document.addEventListener("click", handleClick, true);
  document.addEventListener("scroll", updateSelectionPosition, true);
  window.addEventListener("resize", updateSelectionPosition);
  listenersAttached = true;
}

function handleMouseDown(e: MouseEvent): void {
  if (!isActive) return;

  // Cmd+click (Mac) or Ctrl+click (Win/Linux) → let browser handle (follow links, etc.)
  if (e.metaKey || e.ctrlKey) return;

  // Ignore clicks on the overlay's own UI (sidebar, toolbar, etc.)
  const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  if (el?.closest("#sketch-ui-root")) return;

  // Check if clicking on a border-radius corner handle
  if (currentSelection && selectedElement) {
    const handle = getHandleAtPoint(e.clientX, e.clientY);
    if (handle) {
      e.preventDefault();
      e.stopPropagation();
      const geo = getSelectionGeometry();
      radiusDragCorner = handle;
      radiusDragInitialRadius = geo?.borderRadius ?? 0;
      mouseDownPos = { x: e.clientX, y: e.clientY };
      mode = "radius-drag";
      return;
    }
  }

  e.preventDefault();
  e.stopPropagation();

  // Check if the user clicked on a moved ghost element first
  const ghost = findGhostAtPoint(e.clientX, e.clientY);
  if (ghost) {
    mouseDownPos = { x: e.clientX, y: e.clientY };
    mouseDownElement = ghost.originalEl;
    selectedGhost = ghost;
    mode = "pending";
    return;
  }

  if (!el || !isValidElement(el)) {
    // Clicking on empty/invalid area with a selection → save changes and deselect
    if (currentSelection) {
      commitAndDeselect();
      currentSelection = null;
      selectedElement = null;
      selectedGhost = null;
      setSelectionTarget(null);
      if (selectionLabel) {
        selectionLabel.classList.remove("visible");
        selectionLabel.style.display = "none";
      }
      updateComponentDetail(null);
    }
    return;
  }

  mouseDownPos = { x: e.clientX, y: e.clientY };
  mouseDownElement = el;
  selectedGhost = null;

  // Always use "pending" mode — clicking selects, dragging does marquee.
  // No drag-to-reorder in pointer mode.
  mode = "pending";
}

function handleMouseMove(e: MouseEvent): void {
  if (!isActive) return;

  // Border-radius drag — compute new radius from mouse distance to corner
  if (mode === "radius-drag" && radiusDragCorner && mouseDownPos) {
    e.preventDefault();
    e.stopPropagation();
    const geo = getSelectionGeometry();
    if (!geo) return;

    // Find the actual corner point of the rect
    const cornerX = (radiusDragCorner === "tl" || radiusDragCorner === "bl") ? geo.x : geo.x + geo.w;
    const cornerY = (radiusDragCorner === "tl" || radiusDragCorner === "tr") ? geo.y : geo.y + geo.h;

    // Distance from mouse to corner — use the minimum of dx, dy for diagonal feel
    const dx = Math.abs(e.clientX - cornerX);
    const dy = Math.abs(e.clientY - cornerY);
    const dist = Math.min(dx, dy);

    // Clamp to valid range
    const maxRadius = Math.min(geo.w / 2, geo.h / 2);
    const newRadius = Math.round(Math.min(Math.max(dist, 0), maxRadius));

    // Live preview via property controller + visual update on canvas
    preview("borderRadius", `${newRadius}px`);
    setDragOverrideRadius(newRadius);
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
    // Show resize cursor when hovering over a corner handle
    if (currentSelection && selectedElement) {
      const handle = getHandleAtPoint(e.clientX, e.clientY);
      if (handle) {
        document.body.style.cursor = (handle === "tl" || handle === "br") ? "nwse-resize" : "nesw-resize";
        return;
      } else {
        document.body.style.cursor = "";
      }
    }

    // Check ghosts first — moved elements should be hoverable at their new position
    const ghost = findGhostAtPoint(e.clientX, e.clientY);
    if (ghost) {
      const rect = ghost.cloneEl.getBoundingClientRect();
      const br = parseFloat(getComputedStyle(ghost.originalEl).borderRadius) || 4;
      setHoverTarget(rect, br + 2);
      return;
    }

    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!el || !isValidElement(el)) {
      setHoverTarget(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    const br = parseFloat(getComputedStyle(el).borderRadius) || 4;
    setHoverTarget(rect, br + 2);
  }
}

function handleMouseUp(e: MouseEvent): void {
  if (!isActive) return;

  const prevMode = mode;
  mode = "idle";

  // Commit border-radius change
  if (prevMode === "radius-drag") {
    document.body.style.cursor = "";
    setDragOverrideRadius(null);
    radiusDragCorner = null;
    mouseDownPos = null;
    scheduledCommit();
    return;
  }

  if (prevMode === "marquee" && mouseDownPos) {
    if (marqueeBox) marqueeBox.style.display = "none";
    performMarqueeSelect(
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
    selectElement(mouseDownElement);
  }
  mouseDownPos = null;
  mouseDownElement = null;
}

async function selectElement(el: HTMLElement): Promise<void> {
  try {
    // Use ghost clone rect if selecting a moved element, otherwise use DOM element rect
    const displayRect = selectedGhost
      ? selectedGhost.cloneEl.getBoundingClientRect()
      : el.getBoundingClientRect();

    // Show selection overlay with loading dots immediately, before async resolve
    selectedElement = el;
    showSelectionOverlay(displayRect, {} as any);
    hideHoverOverlay();

    const resolved = await resolveComponentFromElement(el);
    console.log("[SketchUI] selectElement:", el.tagName, "→", resolved?.componentName, resolved?.filePath, "stack:", resolved?.stack?.map(s => s.componentName));
    if (!resolved) return;

    currentSelection = {
      tagName: resolved.tagName,
      componentName: resolved.componentName,
      filePath: resolved.filePath,
      lineNumber: resolved.lineNumber,
      columnNumber: resolved.columnNumber,
      stack: resolved.stack,
      boundingRect: {
        top: displayRect.top,
        left: displayRect.left,
        width: displayRect.width,
        height: displayRect.height,
      },
    };

    if (selectionLabel) {
      const pathText = resolved.filePath ? `${resolved.filePath}:${resolved.lineNumber}` : "";
      selectionLabel.innerHTML = `<span class="comp-name">${resolved.componentName}</span>${pathText ? `<span class="comp-path">${pathText}</span>` : ""}`;
    }

    // Notify property controller of new selection
    inspect(el, currentSelection);

    // Update action bar component detail
    updateComponentDetail({
      tagName: resolved.tagName,
      componentName: resolved.componentName,
      filePath: resolved.filePath,
      lineNumber: resolved.lineNumber,
    });
  } catch (err) {
    console.error("[SketchUI] selectElement error:", err);
  }
}

function performMarqueeSelect(x1: number, y1: number, x2: number, y2: number): void {
  const elements = getElementsInArea({
    x: x1, y: y1,
    width: x2 - x1, height: y2 - y1,
  });

  if (elements.length === 0) return;

  const stacks: Array<ComponentInfo["stack"]> = [];
  for (const el of elements.slice(0, 50)) {
    const resolved = resolveComponentSync(el);
    if (resolved?.stack?.length) {
      stacks.push(resolved.stack);
    }
  }

  if (stacks.length === 0) return;

  const lca = findLowestCommonAncestor(stacks);
  if (!lca) return;

  for (const el of elements) {
    const resolved = resolveComponentSync(el);
    if (resolved && resolved.componentName === lca.componentName) {
      const rect = el.getBoundingClientRect();
      selectedElement = el;
      currentSelection = {
        tagName: el.tagName.toLowerCase(),
        componentName: lca.componentName,
        filePath: lca.filePath,
        lineNumber: lca.lineNumber,
        columnNumber: lca.columnNumber,
        stack: resolved.stack,
        boundingRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      };
      showSelectionOverlay(rect, currentSelection);
      if (selectionLabel) {
        const pathText = lca.filePath ? `${lca.filePath}:${lca.lineNumber}` : "";
        selectionLabel.innerHTML = `<span class="comp-name">${lca.componentName}</span>${pathText ? `<span class="comp-path">${pathText}</span>` : ""}`;
      }
      return;
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

function handleClick(e: MouseEvent): void {
  if (!isActive) return;
  // Ctrl/Cmd+click → let browser follow links normally
  if (e.metaKey || e.ctrlKey) return;
  // Block all other clicks (prevents link navigation, form submission, etc.)
  e.preventDefault();
}

function handleKeyDown(e: KeyboardEvent): void {
  if (!isActive) return;

  if (e.key === "Escape" && currentSelection) {
    // Before clearing selection on Escape, check if property controller has active overrides
    if (hasActiveOverrides()) {
      cancelProperty();
      e.preventDefault();
      return; // Don't clear selection, just cancel the preview
    }
    // Deselect (hierarchy navigation deferred — see spec notes)
    clearSelection();
    e.preventDefault();
  }
}

function showSelectionOverlay(rect: DOMRect, _info: any): void {
  if (selectedElement) {
    const br = parseFloat(getComputedStyle(selectedElement).borderRadius) || 4;
    setSelectionTarget(rect, br + 2);
  }

  if (selectionLabel) {
    const labelHeight = 28;
    const gap = 8;
    let top = rect.top - labelHeight - gap;
    let left = rect.left;

    if (top < 0) {
      top = rect.bottom + gap;
    }

    selectionLabel.style.left = `${left}px`;
    selectionLabel.style.top = `${top}px`;
    selectionLabel.style.display = "block";
    selectionLabel.style.right = "auto";

    selectionLabel.innerHTML = `<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>`;
    requestAnimationFrame(() => selectionLabel?.classList.add("visible"));

    requestAnimationFrame(() => {
      if (!selectionLabel) return;
      const labelRect = selectionLabel.getBoundingClientRect();
      if (labelRect.right > window.innerWidth - 8) {
        selectionLabel.style.left = "auto";
        selectionLabel.style.right = "8px";
      }
    });
  }
}

/** Update selection highlight + label to track the selected element on scroll/resize */
function updateSelectionPosition(): void {
  if (!selectedElement || !currentSelection) return;
  // Use ghost clone rect if this selection is a moved element
  const rect = selectedGhost
    ? selectedGhost.cloneEl.getBoundingClientRect()
    : selectedElement.getBoundingClientRect();
  const br = parseFloat(getComputedStyle(selectedElement).borderRadius) || 4;
  setSelectionTarget(rect, br + 2);

  // Reposition label
  if (selectionLabel && selectionLabel.style.display !== "none") {
    const labelHeight = 28;
    const gap = 8;
    let top = rect.top - labelHeight - gap;
    if (top < 0) top = rect.bottom + gap;
    selectionLabel.style.left = `${rect.left}px`;
    selectionLabel.style.top = `${top}px`;
    selectionLabel.style.right = "auto";

    const labelRect = selectionLabel.getBoundingClientRect();
    if (labelRect.right > window.innerWidth - 8) {
      selectionLabel.style.left = "auto";
      selectionLabel.style.right = "8px";
    }
  }
}

function hideHoverOverlay(): void {
  setHoverTarget(null);
}

export function clearSelection(): void {
  deselectProperty();
  currentSelection = null;
  selectedElement = null;
  selectedGhost = null;
  radiusDragCorner = null;
  setDragOverrideRadius(null);
  document.body.style.cursor = "";
  setSelectionTarget(null);
  if (selectionLabel) {
    selectionLabel.classList.remove("visible");
    selectionLabel.style.display = "none";
  }
  updateComponentDetail(null);
}

export function getSelection(): ComponentInfo | null {
  return currentSelection;
}

export function deactivateSelection(): void {
  isActive = false;
  document.removeEventListener("mousedown", handleMouseDown, true);
  document.removeEventListener("mousemove", handleMouseMove, true);
  document.removeEventListener("mouseup", handleMouseUp, true);
  document.removeEventListener("keydown", handleKeyDown, true);
  document.removeEventListener("click", handleClick, true);
  document.removeEventListener("scroll", updateSelectionPosition, true);
  window.removeEventListener("resize", updateSelectionPosition);
  listenersAttached = false;
  selectionLabel?.remove();
  selectionLabel = null;
}

/**
 * Enable/disable Phase 1 selection handlers.
 * setEnabled(false) removes capture-phase listeners so the interaction layer can receive events.
 * setEnabled(true) re-attaches them for Pointer mode.
 * Different from deactivateSelection() which is a permanent teardown.
 */
export function setEnabled(enabled: boolean): void {
  if (enabled && !listenersAttached) {
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("click", handleClick, true);
    document.addEventListener("scroll", updateSelectionPosition, true);
    window.addEventListener("resize", updateSelectionPosition);
    listenersAttached = true;
    isActive = true;
  } else if (!enabled && listenersAttached) {
    document.removeEventListener("mousedown", handleMouseDown, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("keydown", handleKeyDown, true);
    document.removeEventListener("click", handleClick, true);
    document.removeEventListener("scroll", updateSelectionPosition, true);
    window.removeEventListener("resize", updateSelectionPosition);
    listenersAttached = false;
    isActive = false;
  }
}

export function getSelectedElement(): HTMLElement | null {
  return selectedElement ?? null;
}
