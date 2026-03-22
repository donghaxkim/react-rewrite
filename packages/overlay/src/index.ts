// packages/overlay/src/index.ts
import { connect, disconnect, send, onMessage } from "./bridge.js";
import { mountToolbar, destroyToolbar, setOnEyeToggle, setOnGenerate, setOnCanvasUndo, updateEyeButton, updateGenerateButton, showToast, getShadowRoot } from "./toolbar.js";
import { initSelection, deactivateSelection, clearSelection } from "./selection.js";
import { initHighlightCanvas, destroyHighlightCanvas } from "./highlight-canvas.js";
import { initDrag, deactivateDrag } from "./drag.js";
import { initAnnotationLayer, destroyAnnotationLayer, clearAnnotationLayer, removeAnnotationElement } from "./annotation-layer.js";
import { initGhostLayer, destroyGhostLayer, updateGhostPosition } from "./ghost-layer.js";
import { initToolsPanel, destroyToolsPanel, updateActiveToolUI, setOnClearAll, setOnCanvasUndo as setOnCanvasUndoPanel, updateCanvasUndoButton, flashToolButton } from "./tools-panel.js";
import { initInteraction, destroyInteraction, activateInteraction, registerToolHandler } from "./interaction.js";
import { clearElementCache } from "./utils/element-cache.js";
import { clearVisibilityCache } from "./utils/component-filter.js";
import { showOnboardingHint, dismissOnboarding } from "./onboarding.js";
import {
  onToolChange, onStateChange, getActiveTool, setActiveTool,
  canvasUndo, canUndo, resetCanvas, hasChanges, serializeAnnotations,
  getOriginalsHidden, setOriginalsHidden, onAnnotationRemoved, onGhostPositionUpdate,
} from "./canvas-state.js";
import { initPropertyController } from "./properties/property-controller.js";
import { activatePointer, deactivatePointer } from "./tools/pointer.js";
import { grabHandler } from "./tools/grab.js";
import { moveHandler, returnToMoveAfterSelect } from "./tools/move.js";
import { drawHandler } from "./tools/draw.js";
import { textHandler, cleanupTextTool } from "./tools/text.js";
import { colorHandler, cleanupColorTool } from "./tools/color.js";
import { initCanvasTransform, destroyCanvasTransform, resetCanvasTransform } from "./canvas-transform.js";

declare global {
  interface Window {
    __SKETCH_UI_WS_PORT__?: number;
  }
}


function init(): void {
  const wsPort = window.__SKETCH_UI_WS_PORT__;
  if (!wsPort) {
    console.warn("[SketchUI] No WebSocket port found.");
    return;
  }

  if (document.getElementById("sketch-ui-root")) return; // Already initialized

  connect(wsPort);
  mountToolbar(close);

  // Initialize property controller (requires Shadow DOM from mountToolbar)
  const shadowRoot = getShadowRoot();
  if (shadowRoot) {
    initPropertyController(shadowRoot);
  }

  // Phase 1 systems
  initSelection();
  initHighlightCanvas();
  initDrag();

  // Phase 2A layers
  initAnnotationLayer();
  initGhostLayer();

  // Wire annotation removal from undo to SVG layer cleanup
  onAnnotationRemoved((id) => removeAnnotationElement(id));
  // Wire ghost position updates from undo to ghost-layer (handles wrapper vs body positioning)
  onGhostPositionUpdate((id, x, y) => updateGhostPosition(id, x, y));
  initToolsPanel();
  initInteraction();
  showOnboardingHint();

  // Register tool handlers with interaction layer
  registerToolHandler("grab", grabHandler);
  registerToolHandler("move", moveHandler);
  registerToolHandler("draw", drawHandler);
  registerToolHandler("text", textHandler);
  registerToolHandler("color", colorHandler);

  // Tool change listener — handles mode switching
  onToolChange((tool, prev) => {
    dismissOnboarding(); // Dismiss onboarding on any tool interaction
    flashToolButton(tool);
    // Cleanup previous tool
    if (prev === "pointer") deactivatePointer();
    if (prev === "text") cleanupTextTool();
    if (prev === "color") cleanupColorTool();

    // Clear caches on tool switch
    clearElementCache();
    clearVisibilityCache();

    // Activate new tool
    if (tool === "pointer") activatePointer();
    activateInteraction(tool);
    updateActiveToolUI(tool);
  });

  // State change → update generate + canvas undo buttons
  onStateChange(() => {
    updateGenerateButton(hasChanges());
    updateCanvasUndoButton(canUndo());
  });

  // Canvas undo from tools panel sidebar
  setOnCanvasUndoPanel(() => {
    const description = canvasUndo();
    if (description) showToast(`Undo: ${description}`);
  });

  // Eye toggle — only works when ghosts exist
  setOnEyeToggle(() => {
    if (!hasChanges()) {
      showToast("No moved components to toggle");
      return;
    }
    const next = !getOriginalsHidden();
    setOriginalsHidden(next);
    updateEyeButton(next);
  });

  // Generate button — sends annotations to CLI → Claude API → writes code
  let generating = false;
  let cooldownUntil = 0; // (#8) Error cooldown timestamp
  setOnGenerate(() => {
    if (generating) return;
    // (#8) Cooldown after errors
    const now = Date.now();
    if (now < cooldownUntil) {
      const remaining = Math.ceil((cooldownUntil - now) / 1000);
      showToast(`Please wait ${remaining}s before retrying`);
      return;
    }
    const data = serializeAnnotations();
    if (!data.moves.length && !data.annotations.length && !data.colorChanges.length) {
      showToast("Nothing to generate — make some visual changes first");
      return;
    }
    generating = true;
    showToast("Generating...");
    send({ type: "generate", annotations: data });
  });

  // Handle generate progress + completion from CLI
  onMessage((msg) => {
    if (msg.type === "generateProgress") {
      showToast(msg.message);
    }
    if (msg.type === "generateComplete") {
      generating = false;
      if (msg.success) {
        const summary = msg.changes
          .map((c) => c.description || c.filePath)
          .join(", ");
        showToast(`Applied: ${summary}`);
        // (#6) Clear selection first (closes sidebar, avoids stale refs after HMR)
        clearSelection();
        clearAnnotationLayer();

        resetCanvas();
      } else {
        showToast(`Error: ${msg.error || "Generation failed"}`);
        // (#8) 5 second cooldown after errors to prevent spam
        cooldownUntil = Date.now() + 5000;
      }
    }
  });

  // Canvas undo (Ctrl+Z) — returns true if handled, false if Pointer mode (Phase 1 source undo)
  setOnCanvasUndo(() => {
    if (getActiveTool() === "pointer") return false; // Let selection.ts handle Ctrl+Z
    const description = canvasUndo();
    if (description) {
      showToast(`Undo: ${description}`);
      return true;
    }
    return false;
  });

  // Clear All
  setOnClearAll(() => {
    clearSelection();
    clearAnnotationLayer();
    resetCanvas();
    resetCanvasTransform();
    showToast("Canvas cleared");
  });

  console.log("[SketchUI] Overlay initialized with Phase 2A canvas tools");
}

function close(): void {
  clearElementCache();
  clearVisibilityCache();
  deactivateSelection();
  destroyHighlightCanvas();
  deactivateDrag();
  destroyAnnotationLayer();
  destroyGhostLayer();
  destroyToolsPanel();
  destroyInteraction();
  resetCanvas();
  destroyCanvasTransform();
  disconnect();
  destroyToolbar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
