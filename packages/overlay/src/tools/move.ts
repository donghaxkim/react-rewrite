// packages/overlay/src/tools/move.ts
import type { ToolEventHandler } from "../interaction.js";
import { getSelection, getSelectedElement, selectElementForMove, trackGhostAfterDrop } from "../selection.js";
import { getGhosts, moveGhost, hasGhostForElement, viewportToPage } from "../canvas-state.js";
import { createGhost, updateGhostPosition, findGhostAtPoint, setGhostDragging, setGhostSettled } from "../ghost-layer.js";
import { getPageElementAtPoint } from "../interaction.js";
import type { GhostEntry } from "../canvas-state.js";

let dragTarget: GhostEntry | null = null;
let dragOffset = { x: 0, y: 0 };
let isDragging = false;
// Pending click-to-select: store element to select on mouseUp if no drag occurs
let pendingClickEl: HTMLElement | null = null;

export const moveHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    pendingClickEl = null;

    // Check if clicking an existing ghost — start drag immediately
    const existingGhost = findGhostAtPoint(e.clientX, e.clientY);
    if (existingGhost) {
      dragTarget = existingGhost;
      const page = viewportToPage(e.clientX, e.clientY);
      dragOffset = {
        x: page.x - existingGhost.currentPos.x,
        y: page.y - existingGhost.currentPos.y,
      };
      isDragging = true;
      setGhostDragging(dragTarget.id);
      return;
    }

    // Check if there's a current selection to create a ghost from
    const selection = getSelection();
    if (!selection) {
      // No selection — find element at click point for click-to-select on mouseUp
      const el = getPageElementAtPoint(e.clientX, e.clientY);
      if (el) {
        pendingClickEl = el;
      }
      return;
    }

    // Use the actual selected DOM element
    const el = getSelectedElement();
    if (!el) return;

    // Prevent creating duplicate or nested ghosts for the same element
    if (hasGhostForElement(el)) {
      for (const ghost of getGhosts().values()) {
        if (ghost.originalEl === el || ghost.originalEl.contains(el) || el.contains(ghost.originalEl)) {
          dragTarget = ghost;
          const page = viewportToPage(e.clientX, e.clientY);
          dragOffset = {
            x: page.x - ghost.currentPos.x,
            y: page.y - ghost.currentPos.y,
          };
          isDragging = true;
          setGhostDragging(dragTarget.id);
          return;
        }
      }
    }

    const ghost = createGhost(el, {
      componentName: selection.componentName,
      filePath: selection.filePath,
      lineNumber: selection.lineNumber,
    });

    dragTarget = ghost;
    const page = viewportToPage(e.clientX, e.clientY);
    dragOffset = {
      x: page.x - ghost.currentPos.x,
      y: page.y - ghost.currentPos.y,
    };
    isDragging = true;
    setGhostDragging(dragTarget.id);
  },

  onMouseMove(e: MouseEvent) {
    if (!isDragging || !dragTarget) return;
    const page = viewportToPage(e.clientX, e.clientY);
    const pageX = page.x - dragOffset.x;
    const pageY = page.y - dragOffset.y;
    updateGhostPosition(dragTarget.id, pageX, pageY);
  },

  onMouseUp(_e: MouseEvent) {
    // Complete drag
    if (isDragging && dragTarget) {
      moveGhost(dragTarget.id, dragTarget.currentPos);
      setGhostSettled(dragTarget.id);
      trackGhostAfterDrop(dragTarget);
    }
    dragTarget = null;
    isDragging = false;

    // Click-to-select (no drag occurred) — select without sidebar
    if (pendingClickEl) {
      selectElementForMove(pendingClickEl);
      pendingClickEl = null;
    }
  },
};
