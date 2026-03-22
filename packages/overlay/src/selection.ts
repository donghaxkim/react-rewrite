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
import { setHoverTarget, setSelectionTarget, setMultiSelectionTargets, clearMultiSelection, isMultiSelectActive, getHandleAtPoint, getSelectionGeometry, type CornerHandle } from "./highlight-canvas.js";
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

// Multi-selection state
interface MultiSelectEntry {
  element: HTMLElement;
  info: ComponentInfo;
}
let multiSelected: Map<HTMLElement, MultiSelectEntry> = new Map();

// Overlay elements
let selectionLabel: HTMLDivElement | null = null;
let marqueeBox: HTMLDivElement | null = null;

// Interaction state machine
type InteractionMode = "idle" | "pending" | "marquee" | "pending-drag" | "drag" | "resize-drag";
let mode: InteractionMode = "idle";
let mouseDownPos: { x: number; y: number } | null = null;
let mouseDownElement: HTMLElement | null = null;

// Resize drag state
let resizeDragCorner: CornerHandle | null = null;
let resizeInitialRect: { x: number; y: number; w: number; h: number } | null = null;
let resizeInitialWidth = 0;
let resizeInitialHeight = 0;
let multiResizeInitials: Array<{ element: HTMLElement; width: number; height: number }> = [];

// Shift+click tracking
let isShiftClick = false;

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

  // Check if clicking on a resize corner handle (works for both single and multi-select)
  const hasSelection = currentSelection || multiSelected.size > 0;
  if (hasSelection) {
    const handle = getHandleAtPoint(e.clientX, e.clientY);
    if (handle) {
      e.preventDefault();
      e.stopPropagation();
      const geo = getSelectionGeometry();
      resizeDragCorner = handle;
      resizeInitialRect = geo ? { ...geo } : null;

      if (multiSelected.size > 0) {
        // Multi-select resize: store initial sizes for all selected elements
        multiResizeInitials = [];
        for (const [element] of multiSelected) {
          const computed = getComputedStyle(element);
          multiResizeInitials.push({
            element,
            width: parseFloat(computed.width) || element.offsetWidth,
            height: parseFloat(computed.height) || element.offsetHeight,
          });
        }
        resizeInitialWidth = 0;
        resizeInitialHeight = 0;
      } else if (selectedElement) {
        const computed = getComputedStyle(selectedElement);
        resizeInitialWidth = parseFloat(computed.width) || selectedElement.offsetWidth;
        resizeInitialHeight = parseFloat(computed.height) || selectedElement.offsetHeight;
        multiResizeInitials = [];
      }

      mouseDownPos = { x: e.clientX, y: e.clientY };
      mode = "resize-drag";
      return;
    }
  }

  e.preventDefault();
  e.stopPropagation();

  // Check if the user clicked on a moved ghost element first
  const ghost = findGhostAtPoint(e.clientX, e.clientY);
  if (ghost) {
    if (!e.shiftKey) clearMultiSelectState();
    mouseDownPos = { x: e.clientX, y: e.clientY };
    mouseDownElement = ghost.originalEl;
    selectedGhost = ghost;
    mode = "pending";
    return;
  }

  if (!el || !isValidElement(el)) {
    // Clicking on empty/invalid area → save changes and deselect everything
    if (currentSelection || multiSelected.size > 0) {
      commitAndDeselect();
      currentSelection = null;
      selectedElement = null;
      selectedGhost = null;
      clearMultiSelectState();
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
  isShiftClick = e.shiftKey;

  // Always use "pending" mode — clicking selects, dragging does marquee.
  mode = "pending";
}

function handleMouseMove(e: MouseEvent): void {
  if (!isActive) return;

  // Resize drag — compute new width/height from mouse delta
  if (mode === "resize-drag" && resizeDragCorner && mouseDownPos && resizeInitialRect) {
    e.preventDefault();
    e.stopPropagation();

    const dx = e.clientX - mouseDownPos.x;
    const dy = e.clientY - mouseDownPos.y;

    if (multiResizeInitials.length > 0) {
      // Multi-select resize: apply same delta to all elements
      for (const entry of multiResizeInitials) {
        let newW = entry.width;
        let newH = entry.height;
        if (resizeDragCorner === "tr" || resizeDragCorner === "br") {
          newW = Math.max(10, entry.width + dx);
        } else {
          newW = Math.max(10, entry.width - dx);
        }
        if (resizeDragCorner === "bl" || resizeDragCorner === "br") {
          newH = Math.max(10, entry.height + dy);
        } else {
          newH = Math.max(10, entry.height - dy);
        }
        entry.element.style.width = `${Math.round(newW)}px`;
        entry.element.style.height = `${Math.round(newH)}px`;
      }
      updateMultiSelectionHighlights();
    } else {
      // Single-select resize
      let newWidth = resizeInitialWidth;
      let newHeight = resizeInitialHeight;

      if (resizeDragCorner === "tr" || resizeDragCorner === "br") {
        newWidth = Math.max(10, resizeInitialWidth + dx);
      } else {
        newWidth = Math.max(10, resizeInitialWidth - dx);
      }
      if (resizeDragCorner === "bl" || resizeDragCorner === "br") {
        newHeight = Math.max(10, resizeInitialHeight + dy);
      } else {
        newHeight = Math.max(10, resizeInitialHeight - dy);
      }

      newWidth = Math.round(newWidth);
      newHeight = Math.round(newHeight);

      preview("width", `${newWidth}px`);
      preview("height", `${newHeight}px`);
      updateSelectionPosition();
    }
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
    // Show resize cursor when hovering over a corner handle (single or multi-select)
    const hasAnySelection = (currentSelection && selectedElement) || multiSelected.size > 0;
    if (hasAnySelection) {
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

  // Commit resize
  if (prevMode === "resize-drag") {
    document.body.style.cursor = "";
    resizeDragCorner = null;
    resizeInitialRect = null;
    mouseDownPos = null;
    if (multiResizeInitials.length > 0) {
      // Multi-select resize complete — no property controller commit (direct inline styles)
      multiResizeInitials = [];
    } else {
      scheduledCommit();
    }
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
    isShiftClick = false;
    return;
  }

  // prevMode was "pending" — treat as a click
  if (mouseDownElement) {
    if (isShiftClick) {
      toggleMultiSelect(mouseDownElement);
    } else {
      // Regular click: clear multi-select, do single select
      clearMultiSelectState();
      selectElement(mouseDownElement);
    }
  }
  mouseDownPos = null;
  mouseDownElement = null;
  isShiftClick = false;
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

  // Clear single selection when marquee selects
  deselectProperty();
  currentSelection = null;
  selectedElement = null;
  selectedGhost = null;
  setSelectionTarget(null);
  if (selectionLabel) {
    selectionLabel.classList.remove("visible");
    selectionLabel.style.display = "none";
  }

  // Resolve each element and add to multi-select
  multiSelected.clear();
  for (const el of elements.slice(0, 50)) {
    const resolved = resolveComponentSync(el);
    if (!resolved) continue;

    const rect = el.getBoundingClientRect();
    const info: ComponentInfo = {
      tagName: resolved.tagName,
      componentName: resolved.componentName,
      filePath: resolved.filePath,
      lineNumber: resolved.lineNumber,
      columnNumber: resolved.columnNumber,
      stack: resolved.stack,
      boundingRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
    };
    multiSelected.set(el, { element: el, info });
  }

  if (multiSelected.size === 0) return;

  // If only one element selected by marquee, convert to single select
  if (multiSelected.size === 1) {
    const [el, entry] = [...multiSelected.entries()][0];
    multiSelected.clear();
    selectedElement = el;
    currentSelection = entry.info;
    const rect = el.getBoundingClientRect();
    showSelectionOverlay(rect, currentSelection);
    if (selectionLabel) {
      const pathText = entry.info.filePath ? `${entry.info.filePath}:${entry.info.lineNumber}` : "";
      selectionLabel.innerHTML = `<span class="comp-name">${entry.info.componentName}</span>${pathText ? `<span class="comp-path">${pathText}</span>` : ""}`;
    }
    inspect(el, currentSelection);
    updateComponentDetail({
      tagName: entry.info.tagName,
      componentName: entry.info.componentName,
      filePath: entry.info.filePath,
      lineNumber: entry.info.lineNumber,
    });
    return;
  }

  // Multiple elements → update highlights + show count label
  updateMultiSelectionHighlights();
  updateComponentDetail(null); // No single-element detail for multi-select
  if (selectionLabel) {
    selectionLabel.innerHTML = `<span class="comp-name">${multiSelected.size} elements selected</span>`;
    selectionLabel.style.display = "block";
    selectionLabel.style.left = `${x1}px`;
    selectionLabel.style.top = `${Math.max(0, y1 - 36)}px`;
    selectionLabel.style.right = "auto";
    requestAnimationFrame(() => selectionLabel?.classList.add("visible"));
  }
}


/** Shift+click: toggle an element in/out of multi-select */
function toggleMultiSelect(el: HTMLElement): void {
  if (multiSelected.has(el)) {
    // Remove from multi-select
    multiSelected.delete(el);
    if (multiSelected.size === 1) {
      // Collapse back to single select
      const [remainEl, entry] = [...multiSelected.entries()][0];
      multiSelected.clear();
      clearMultiSelection();
      selectedElement = remainEl;
      currentSelection = entry.info;
      const rect = remainEl.getBoundingClientRect();
      showSelectionOverlay(rect, currentSelection);
      inspect(remainEl, currentSelection);
      if (selectionLabel) {
        const pathText = entry.info.filePath ? `${entry.info.filePath}:${entry.info.lineNumber}` : "";
        selectionLabel.innerHTML = `<span class="comp-name">${entry.info.componentName}</span>${pathText ? `<span class="comp-path">${pathText}</span>` : ""}`;
      }
      updateComponentDetail({
        tagName: entry.info.tagName,
        componentName: entry.info.componentName,
        filePath: entry.info.filePath,
        lineNumber: entry.info.lineNumber,
      });
    } else if (multiSelected.size === 0) {
      clearMultiSelection();
      clearSelection();
    } else {
      updateMultiSelectionHighlights();
      if (selectionLabel) {
        selectionLabel.innerHTML = `<span class="comp-name">${multiSelected.size} elements selected</span>`;
      }
    }
    return;
  }

  // Add to multi-select
  const resolved = resolveComponentSync(el);
  if (!resolved) return;

  // If there's a current single selection, promote it to multi-select first
  if (currentSelection && selectedElement && multiSelected.size === 0) {
    multiSelected.set(selectedElement, { element: selectedElement, info: currentSelection });
    deselectProperty();
    currentSelection = null;
    selectedElement = null;
    setSelectionTarget(null);
  }

  const rect = el.getBoundingClientRect();
  const info: ComponentInfo = {
    tagName: resolved.tagName,
    componentName: resolved.componentName,
    filePath: resolved.filePath,
    lineNumber: resolved.lineNumber,
    columnNumber: resolved.columnNumber,
    stack: resolved.stack,
    boundingRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
  };
  multiSelected.set(el, { element: el, info });

  updateMultiSelectionHighlights();
  updateComponentDetail(null);
  if (selectionLabel) {
    selectionLabel.innerHTML = `<span class="comp-name">${multiSelected.size} elements selected</span>`;
    selectionLabel.style.display = "block";
    requestAnimationFrame(() => selectionLabel?.classList.add("visible"));
  }
}

/** Clear multi-select state and highlight canvas */
function clearMultiSelectState(): void {
  multiSelected.clear();
  clearMultiSelection();
}

/** Refresh highlight-canvas multi-selection targets from current multiSelected state */
function updateMultiSelectionHighlights(): void {
  if (multiSelected.size === 0) {
    clearMultiSelection();
    return;
  }
  const targets: Array<{ rect: DOMRect; borderRadius: number }> = [];
  for (const [element] of multiSelected) {
    const rect = element.getBoundingClientRect();
    const br = parseFloat(getComputedStyle(element).borderRadius) || 4;
    targets.push({ rect, borderRadius: br + 2 });
  }
  setMultiSelectionTargets(targets);
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

  if (e.key === "Escape") {
    // Clear multi-select first
    if (multiSelected.size > 0) {
      clearMultiSelectState();
      if (selectionLabel) {
        selectionLabel.classList.remove("visible");
        selectionLabel.style.display = "none";
      }
      updateComponentDetail(null);
      e.preventDefault();
      return;
    }
    if (currentSelection) {
      // Before clearing selection on Escape, check if property controller has active overrides
      if (hasActiveOverrides()) {
        cancelProperty();
        e.preventDefault();
        return; // Don't clear selection, just cancel the preview
      }
      clearSelection();
      e.preventDefault();
    }
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
  // Handle multi-select position update
  if (multiSelected.size > 0) {
    updateMultiSelectionHighlights();
    return;
  }

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
  resizeDragCorner = null;
  resizeInitialRect = null;
  multiResizeInitials = [];
  clearMultiSelectState();
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
