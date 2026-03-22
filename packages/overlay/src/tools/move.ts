// packages/overlay/src/tools/move.ts
import type { ToolEventHandler } from "../interaction.js";
import { getSelection, getSelectedElement, trackGhostAfterDrop } from "../selection.js";
import { setActiveTool, getGhosts, moveGhost, hasGhostForElement, viewportToPage } from "../canvas-state.js";
import { createGhost, updateGhostPosition, findGhostAtPoint, setGhostDragging, setGhostSettled } from "../ghost-layer.js";
import type { GhostEntry } from "../canvas-state.js";

let dragTarget: GhostEntry | null = null;
let dragOffset = { x: 0, y: 0 };
let isDragging = false;
let pendingSelect = false;

export const moveHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    // Check if clicking an existing ghost
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
      // No selection — temporarily switch to pointer to let user select
      pendingSelect = true;
      setActiveTool("pointer");
      return;
    }

    // Use the actual selected DOM element (not elementFromPoint which may hit wrong element)
    const el = getSelectedElement();
    if (!el) return;

    // Prevent creating duplicate or nested ghosts for the same element
    if (hasGhostForElement(el)) {
      // Find the existing ghost (exact match, parent, or child) and drag it instead
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
    if (isDragging && dragTarget) {
      moveGhost(dragTarget.id, dragTarget.currentPos);
      setGhostSettled(dragTarget.id);
      // Update selection highlight to follow the ghost's new position
      trackGhostAfterDrop(dragTarget);
    }
    dragTarget = null;
    isDragging = false;
  },
};

/** Called when pointer mode selects something and we should switch back to move */
export function returnToMoveAfterSelect(): void {
  if (pendingSelect) {
    pendingSelect = false;
    setActiveTool("move");
  }
}
