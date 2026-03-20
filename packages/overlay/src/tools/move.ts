// packages/overlay/src/tools/move.ts
import type { ToolEventHandler } from "../interaction.js";
import { getSelection, getSelectedElement } from "../selection.js";
import { setActiveTool, getGhosts, moveGhost, hasGhostForElement } from "../canvas-state.js";
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
      dragOffset = {
        x: e.clientX + window.scrollX - existingGhost.currentPos.x,
        y: e.clientY + window.scrollY - existingGhost.currentPos.y,
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

    // Prevent creating duplicate ghosts for the same element
    if (hasGhostForElement(el)) {
      // Find the existing ghost and drag it instead
      for (const ghost of getGhosts().values()) {
        if (ghost.originalEl === el) {
          dragTarget = ghost;
          dragOffset = {
            x: e.clientX + window.scrollX - ghost.currentPos.x,
            y: e.clientY + window.scrollY - ghost.currentPos.y,
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
    dragOffset = {
      x: e.clientX + window.scrollX - ghost.currentPos.x,
      y: e.clientY + window.scrollY - ghost.currentPos.y,
    };
    isDragging = true;
    setGhostDragging(dragTarget.id);
  },

  onMouseMove(e: MouseEvent) {
    if (!isDragging || !dragTarget) return;
    const pageX = e.clientX + window.scrollX - dragOffset.x;
    const pageY = e.clientY + window.scrollY - dragOffset.y;
    updateGhostPosition(dragTarget.id, pageX, pageY);
  },

  onMouseUp(_e: MouseEvent) {
    if (isDragging && dragTarget) {
      moveGhost(dragTarget.id, dragTarget.currentPos);
      setGhostSettled(dragTarget.id);
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
