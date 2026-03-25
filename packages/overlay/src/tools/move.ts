// packages/overlay/src/tools/move.ts
//
// Move logic — called by selection.ts when the Select tool detects a move-drag.
// No longer a ToolEventHandler; these are standalone functions.

import type { MoveEntry } from "../move-state.js";
import { applyDragVisual, settleDragVisual } from "../move-state.js";
import { addChangeEntry } from "../changelog.js";
import {
  addMove,
  updateMoveDelta,
  getMoveForElement,
  viewportToPage,
  getCanvasTransform,
} from "../canvas-state.js";
import { getSelection, getSelectedElement } from "../selection.js";
import { computeSnap } from "../snap-guides.js";
import { setSnapGuides, clearSnapGuides } from "../highlight-canvas.js";
import { addToPending } from "../pending-changes.js";
import { computeNthOfType } from "../utils/nth-of-type.js";
import { hasApiKey } from "../config.js";

let dragEntry: MoveEntry | null = null;
let dragStartMouse = { x: 0, y: 0 };
let preDragDelta = { dx: 0, dy: 0 };
let isNewMove = false;

/**
 * Attempt to start a move for the given element.
 * Returns true if a move was initiated. Returns false if no move is possible.
 */
export function tryStartMove(clientX: number, clientY: number, el: HTMLElement): boolean {
  const pagePos = viewportToPage(clientX, clientY);

  // Check if the element already has a move entry → re-drag it
  const existingForEl = getMoveForElement(el);
  if (existingForEl) {
    dragEntry = existingForEl;
    dragStartMouse = { x: pagePos.x, y: pagePos.y };
    preDragDelta = { ...existingForEl.delta };
    isNewMove = false;
    applyDragVisual(existingForEl.element, existingForEl.delta.dx, existingForEl.delta.dy, existingForEl.existingTransform);
    return true;
  }

  // Element must be the currently selected element to create a new move
  const selection = getSelection();
  const selectedEl = getSelectedElement();
  if (!selection || !selectedEl || el !== selectedEl) return false;

  // Create new move entry
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
  applyDragVisual(selectedEl, 0, 0, entry.existingTransform);
  return true;
}

/** Update the active move drag with new mouse position. */
export function updateMovePosition(clientX: number, clientY: number): void {
  if (!dragEntry) return;
  const pagePos = viewportToPage(clientX, clientY);
  const rawDx = preDragDelta.dx + (pagePos.x - dragStartMouse.x);
  const rawDy = preDragDelta.dy + (pagePos.y - dragStartMouse.y);

  applyDragVisual(dragEntry.element, rawDx, rawDy, dragEntry.existingTransform);

  const parent = dragEntry.element.parentElement;
  if (!parent || parent === document.body || parent === document.documentElement) {
    dragEntry.delta = { dx: rawDx, dy: rawDy };
    clearSnapGuides();
    return;
  }

  const elemRect = dragEntry.element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const { scale } = getCanvasTransform();
  const snap = computeSnap(elemRect, parentRect, rawDx, rawDy, 5, scale);

  if (snap.snappedX || snap.snappedY) {
    applyDragVisual(dragEntry.element, snap.dx, snap.dy, dragEntry.existingTransform);
  }

  dragEntry.delta = { dx: snap.dx, dy: snap.dy };
  setSnapGuides(snap.guides);
}

/** End the active move drag. Returns the moved element for re-selection by caller. */
export function endMove(): HTMLElement | null {
  if (!dragEntry) return null;

  const entry = dragEntry;
  const previousDelta = { ...preDragDelta };
  const nextDelta = { ...entry.delta };

  if (!isNewMove) {
    updateMoveDelta(entry.id, nextDelta, previousDelta);
  }
  settleDragVisual(entry);
  clearSnapGuides();

  addChangeEntry({
    type: "move",
    componentName: entry.componentRef.componentName,
    filePath: entry.componentRef.filePath,
    summary: `moved (${Math.round(nextDelta.dx)}px, ${Math.round(nextDelta.dy)}px)`,
    state: "pending",
    elementIdentity: entry.identity,
    revertData: isNewMove
      ? { type: "moveRemove", moveId: entry.id }
      : { type: "moveRestore", moveId: entry.id, previousDelta },
  });

  // Path B: API key present → also add to pending store for batched apply
  if (hasApiKey() && entry.componentRef.filePath) {
    const el = entry.element;
    const parentEl = el?.parentElement;

    addToPending({
      type: "move",
      componentName: entry.componentRef.componentName,
      tag: el?.tagName.toLowerCase() || "div",
      filePath: entry.componentRef.filePath,
      className: el?.className || "",
      nthOfType: el ? computeNthOfType(el) : 1,
      parentTag: parentEl?.tagName.toLowerCase() || "",
      parentClassName: parentEl?.className || "",
      lineHint: entry.componentRef.lineNumber,
      delta: { dx: nextDelta.dx, dy: nextDelta.dy },
      resolvedDx: null, // TODO: resolved Tailwind class for dx
      resolvedDy: null, // TODO: resolved Tailwind class for dy
    });
  }

  const el = entry.element;
  dragEntry = null;
  isNewMove = false;
  return el;
}

/** Returns true if a move drag is currently in progress. */
export function isMoveDragging(): boolean {
  return dragEntry !== null;
}

/** Cancel any in-progress move drag without committing. */
export function cancelMove(): void {
  dragEntry = null;
  isNewMove = false;
  clearSnapGuides();
}
