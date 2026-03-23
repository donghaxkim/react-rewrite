import type { ToolEventHandler } from "../interaction.js";
import type { MoveEntry } from "../move-state.js";
import {
  applyDragVisual,
  settleDragVisual,
} from "../move-state.js";
import {
  addMove,
  updateMoveDelta,
  getMoveForElement,
  hasMoveForElement,
  viewportToPage,
} from "../canvas-state.js";
import { getSelection, getSelectedElement, selectElementForMove, clearSelection } from "../selection.js";
import { getPageElementAtPoint } from "../interaction.js";

let dragEntry: MoveEntry | null = null;
let dragStartMouse = { x: 0, y: 0 };
let preDragDelta = { dx: 0, dy: 0 };
let isNewMove = false;
let isDragging = false;
let pendingClickEl: HTMLElement | null = null;

export const moveHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    pendingClickEl = null;
    isNewMove = false;
    isDragging = false;

    const pagePos = viewportToPage(e.clientX, e.clientY);

    // Check if clicking on an already-moved element
    const clickedEl = getPageElementAtPoint(e.clientX, e.clientY);

    // Clicking empty space → deselect
    if (!clickedEl) {
      clearSelection();
      return;
    }

    // Check if the clicked element already has a move entry
    const existingForClicked = getMoveForElement(clickedEl);
    if (existingForClicked) {
      dragEntry = existingForClicked;
      dragStartMouse = { x: pagePos.x, y: pagePos.y };
      preDragDelta = { ...existingForClicked.delta };
      isNewMove = false;
      isDragging = true;
      applyDragVisual(existingForClicked.element, existingForClicked.delta.dx, existingForClicked.delta.dy, existingForClicked.existingTransform);
      return;
    }

    // Get currently selected element
    const selection = getSelection();
    const selectedEl = getSelectedElement();

    // If clicking a different element than currently selected → switch selection on mouseUp
    if (!selection || !selectedEl || clickedEl !== selectedEl) {
      pendingClickEl = clickedEl;
      return;
    }

    // Clicking the currently selected element → check for existing move or create new
    const existingMove = getMoveForElement(selectedEl);
    if (existingMove) {
      dragEntry = existingMove;
      dragStartMouse = { x: pagePos.x, y: pagePos.y };
      preDragDelta = { ...existingMove.delta };
      isNewMove = false;
      isDragging = true;
      applyDragVisual(existingMove.element, existingMove.delta.dx, existingMove.delta.dy, existingMove.existingTransform);
      return;
    }

    // Create new move
    // No placeholder needed — position:relative + transform:translate() visually
    // moves the element while its original layout space is naturally preserved.
    const originalRect = selectedEl.getBoundingClientRect();
    const originalCssText = selectedEl.style.cssText;
    const existingTransform = getComputedStyle(selectedEl).transform;

    const entry: MoveEntry = {
      id: crypto.randomUUID(),
      componentRef: {
        componentName: selection.componentName,
        filePath: selection.filePath,
        lineNumber: selection.lineNumber,
      },
      element: selectedEl,
      placeholder: null,
      originalRect,
      delta: { dx: 0, dy: 0 },
      originalCssText,
      existingTransform: existingTransform === "none" ? "" : existingTransform,
      identity: {
        componentName: selection.componentName,
        filePath: selection.filePath,
        lineNumber: selection.lineNumber,
        columnNumber: selection.columnNumber,
        tagName: selectedEl.tagName.toLowerCase(),
      },
    };

    addMove(entry);
    dragEntry = entry;
    dragStartMouse = { x: pagePos.x, y: pagePos.y };
    preDragDelta = { dx: 0, dy: 0 };
    isNewMove = true;
    isDragging = true;

    applyDragVisual(selectedEl, 0, 0, entry.existingTransform);
  },

  onMouseMove(e: MouseEvent) {
    if (!isDragging || !dragEntry) return;
    const pagePos = viewportToPage(e.clientX, e.clientY);
    const dx = preDragDelta.dx + (pagePos.x - dragStartMouse.x);
    const dy = preDragDelta.dy + (pagePos.y - dragStartMouse.y);
    dragEntry.delta = { dx, dy };
    applyDragVisual(dragEntry.element, dx, dy, dragEntry.existingTransform);
  },

  onMouseUp() {
    // Complete drag
    if (isDragging && dragEntry) {
      if (!isNewMove) {
        updateMoveDelta(dragEntry.id, dragEntry.delta, preDragDelta);
      }
      settleDragVisual(dragEntry);
      // Re-select at new position so highlight tracks the moved element
      selectElementForMove(dragEntry.element);
    }

    dragEntry = null;
    isDragging = false;
    isNewMove = false;

    // Click-to-select (no drag occurred) — select without sidebar
    if (pendingClickEl) {
      selectElementForMove(pendingClickEl);
      pendingClickEl = null;
    }
  },
};
