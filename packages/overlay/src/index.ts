// packages/overlay/src/index.ts
import { connect, disconnect } from "./bridge.js";
import { mountToolbar, destroyToolbar, setOnEyeToggle, setOnGenerate, setOnCanvasUndo, updateEyeButton, updateGenerateButton, showToast, getShadowRoot } from "./toolbar.js";
import { initSelection, deactivateSelection, clearSelection } from "./selection.js";
import { initHighlightCanvas, destroyHighlightCanvas } from "./highlight-canvas.js";
import { initDrag, deactivateDrag } from "./drag.js";
import { initAnnotationLayer, destroyAnnotationLayer, clearAnnotationLayer, removeAnnotationElement } from "./annotation-layer.js";
import { initGhostLayer, destroyGhostLayer } from "./ghost-layer.js";
import { initToolsPanel, destroyToolsPanel, updateActiveToolUI, setOnClearAll, setOnCanvasUndo as setOnCanvasUndoPanel, updateCanvasUndoButton, flashToolButton } from "./tools-panel.js";
import { initInteraction, destroyInteraction, activateInteraction, registerToolHandler } from "./interaction.js";
import { clearElementCache } from "./utils/element-cache.js";
import { clearVisibilityCache } from "./utils/component-filter.js";
import { showOnboardingHint, dismissOnboarding } from "./onboarding.js";
import {
  onToolChange, onStateChange, getActiveTool, setActiveTool,
  canvasUndo, canUndo, resetCanvas, hasChanges, serializeAnnotations,
  getOriginalsHidden, setOriginalsHidden,
} from "./canvas-state.js";
import { initPropertyController } from "./properties/property-controller.js";
import { activatePointer, deactivatePointer } from "./tools/pointer.js";
import { grabHandler } from "./tools/grab.js";
import { moveHandler, returnToMoveAfterSelect } from "./tools/move.js";
import { drawHandler } from "./tools/draw.js";
import { textHandler, cleanupTextTool } from "./tools/text.js";
import { colorHandler, cleanupColorTool } from "./tools/color.js";
import { lassoHandler, clearLassoSelection } from "./tools/lasso.js";
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

  // Infinite canvas (wraps page content before other layers init)
  initCanvasTransform();

  // Phase 1 systems
  initSelection();
  initHighlightCanvas();
  initDrag();

  // Phase 2A layers
  initAnnotationLayer();
  initGhostLayer();
  initToolsPanel();
  initInteraction();
  showOnboardingHint();

  // Register tool handlers with interaction layer
  registerToolHandler("grab", grabHandler);
  registerToolHandler("move", moveHandler);
  registerToolHandler("draw", drawHandler);
  registerToolHandler("text", textHandler);
  registerToolHandler("color", colorHandler);
  registerToolHandler("lasso", lassoHandler);

  // Tool change listener — handles mode switching
  onToolChange((tool, prev) => {
    dismissOnboarding(); // Dismiss onboarding on any tool interaction
    flashToolButton(tool);
    // Cleanup previous tool
    if (prev === "pointer") deactivatePointer();
    if (prev === "text") cleanupTextTool();
    if (prev === "color") cleanupColorTool();
    if (prev === "lasso") clearLassoSelection();

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

  // Generate button (Phase 2A: log to console)
  setOnGenerate(() => {
    const data = serializeAnnotations();
    console.log("[SketchUI] Generate — serialized annotations:", JSON.stringify(data, null, 2));
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
    clearLassoSelection();
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
