// packages/overlay/src/index.ts
import { connect, disconnect } from "./bridge.js";
import { mountToolbar, destroyToolbar } from "./toolbar.js";
import { initSelection, deactivateSelection } from "./selection.js";
import { initDrag, deactivateDrag } from "./drag.js";

function init(): void {
  const wsPort = (window as any).__SKETCH_UI_WS_PORT__;
  if (!wsPort) {
    console.error("[SketchUI] No WebSocket port configured");
    return;
  }

  // Prevent double initialization
  if (document.getElementById("sketch-ui-root")) return;

  // Connect WebSocket
  connect(wsPort);

  // Mount toolbar with close handler
  mountToolbar(() => {
    deactivateSelection();
    deactivateDrag();
    disconnect();
    destroyToolbar();
  });

  // Initialize selection and drag systems
  initSelection();
  initDrag();

  console.log("[SketchUI] Overlay initialized");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
