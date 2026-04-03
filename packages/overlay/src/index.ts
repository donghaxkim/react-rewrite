// packages/overlay/src/index.ts
import { connect, disconnect, send, onMessage } from "./bridge.js";
import { mountToolbar, destroyToolbar, setOnGenerate, setOnCanvasUndo, updateGenerateButton, showToast, getShadowRoot } from "./toolbar.js";
import { initSelection, deactivateSelection, clearSelection, setEnabled } from "./selection.js";
import { initHighlightCanvas, destroyHighlightCanvas } from "./highlight-canvas.js";
import { initDrag, deactivateDrag } from "./drag.js";
import { initAnnotationLayer, destroyAnnotationLayer, clearAnnotationLayer, removeAnnotationElement } from "./annotation-layer.js";
import type { MoveEntry } from "./move-state.js";
import {
  reacquireMovedElement,
  reacquireMovedElementAsync,
  applyMoveTransform,
} from "./move-state.js";
import { initToolsPanel, destroyToolsPanel, updateActiveToolUI, setOnClearAll, setOnCanvasUndo as setOnCanvasUndoPanel, updateCanvasUndoButton, flashToolButton } from "./tools-panel.js";
import { initInteraction, destroyInteraction, activateInteraction, registerToolHandler } from "./interaction.js";
import { clearElementCache } from "./utils/element-cache.js";
import { clearVisibilityCache } from "./utils/component-filter.js";
import { showOnboardingHint, dismissOnboarding } from "./onboarding.js";
import {
  onToolChange, onStateChange, getActiveTool, setActiveTool,
  canvasUndo, canUndo, resetCanvas, hasChanges,
  onAnnotationRemoved,
  getMoves, removeMove,
  getClones, removeCloneEntry,
  buildBatchOperations,
} from "./canvas-state.js";
import { updateCloneFileStat } from "./clone-state.js";
import { updateDeleteFileStat } from "./delete-state.js";
import { initPropertyController, destroyPropertyController } from "./properties/property-controller.js";
import { initInlineTextEdit, destroyInlineTextEdit, cancelTextEditSession } from "./inline-text-edit.js";
import { initCanvasTransform, destroyCanvasTransform, resetCanvasTransform } from "./canvas-transform.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { initChangelog, destroyChangelog, addChangeEntry, isChangelogOpen, setChangelogOpen, clearChangelog } from "./changelog.js";

declare global {
  interface Window {
    __REACT_REWRITE_WS_PORT__?: number;
  }
}

// ---------------------------------------------------------------------------
// Error boundary — prevents overlay crashes from affecting the host app
// ---------------------------------------------------------------------------

let errorToastEl: HTMLDivElement | null = null;
let errorToastTimeout: ReturnType<typeof setTimeout> | null = null;

/** Check if an error likely originated from overlay code */
function isOverlayError(error: unknown): boolean {
  const stack = (error instanceof Error && error.stack) ? error.stack : String(error);
  return /react-rewrite|overlay/i.test(stack);
}

/** Show a minimal error toast inside the Shadow DOM */
function showErrorToast(message: string): void {
  const root = getShadowRoot();
  if (!root) return;

  // Remove existing error toast if present
  if (errorToastEl && errorToastEl.parentNode) {
    errorToastEl.parentNode.removeChild(errorToastEl);
  }
  if (errorToastTimeout) clearTimeout(errorToastTimeout);

  const container = document.createElement("div");
  container.setAttribute("style", [
    "position: fixed",
    "bottom: 72px",
    "right: 16px",
    `z-index: 2147483647`,
    `background: rgba(30, 30, 30, 0.92)`,
    `color: #fff`,
    `font-family: ${FONT_FAMILY}`,
    `font-size: 12px`,
    `padding: 10px 14px`,
    `border-radius: ${RADII.sm}`,
    `box-shadow: ${SHADOWS.md}`,
    `max-width: 320px`,
    `display: flex`,
    `align-items: center`,
    `gap: 10px`,
    `opacity: 0`,
    `transition: opacity ${TRANSITIONS.medium}`,
  ].join("; "));

  const text = document.createElement("span");
  text.textContent = message;
  text.setAttribute("style", "flex: 1;");

  const dismissBtn = document.createElement("button");
  dismissBtn.textContent = "Dismiss";
  dismissBtn.setAttribute("style", [
    "background: rgba(255,255,255,0.15)",
    "border: none",
    "color: #fff",
    `font-family: ${FONT_FAMILY}`,
    "font-size: 11px",
    "padding: 3px 8px",
    `border-radius: ${RADII.xs}`,
    "cursor: pointer",
    "white-space: nowrap",
  ].join("; "));
  dismissBtn.addEventListener("click", () => {
    container.style.opacity = "0";
    setTimeout(() => container.remove(), 200);
    if (errorToastTimeout) clearTimeout(errorToastTimeout);
    errorToastEl = null;
  });

  container.appendChild(text);
  container.appendChild(dismissBtn);
  root.appendChild(container);
  errorToastEl = container;

  // Fade in
  requestAnimationFrame(() => {
    container.style.opacity = "1";
  });

  // Auto-dismiss after 8 seconds
  errorToastTimeout = setTimeout(() => {
    container.style.opacity = "0";
    setTimeout(() => container.remove(), 200);
    errorToastEl = null;
  }, 8000);
}

/** Handle an overlay error: log it and show toast */
function handleOverlayError(error: unknown): void {
  console.error("[ReactRewrite]", error);
  showErrorToast("ReactRewrite encountered an error. Your app is unaffected.");
}

/** Install global error handlers that catch overlay-originating errors */
function installGlobalErrorHandlers(): void {
  window.addEventListener("error", (event: ErrorEvent) => {
    if (isOverlayError(event.error ?? event.message)) {
      handleOverlayError(event.error ?? event.message);
      event.preventDefault(); // Prevent default browser error logging
    }
    // Non-overlay errors pass through untouched
  });

  window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
    if (isOverlayError(event.reason)) {
      handleOverlayError(event.reason);
      event.preventDefault();
    }
  });
}

let moveObserver: MutationObserver | null = null;

function resetOverlayState(): void {
  cancelTextEditSession();
  clearSelection();
  clearAnnotationLayer();
  clearChangelog();
  setChangelogOpen(false);
  resetCanvas();
  resetCanvasTransform();
  clearElementCache();
  clearVisibilityCache();

  if (getActiveTool() !== "select") {
    setActiveTool("select");
  } else {
    setEnabled(true);
    activateInteraction("select");
    updateActiveToolUI("select");
  }
}

function restoreMoveToElement(id: string, entry: MoveEntry, newEl: HTMLElement): void {
  entry.originalCssText = newEl.style.cssText;
  entry.element = newEl;
  applyMoveTransform(entry);
}

function init(): void {
  // Only run in the top-level frame — skip iframes to avoid duplicate WS connections
  if (window !== window.top) return;

  const wsPort = window.__REACT_REWRITE_WS_PORT__;
  if (!wsPort) {
    console.warn("[ReactRewrite] No WebSocket port found.");
    return;
  }

  if (document.getElementById("react-rewrite-root")) return; // Already initialized

  connect(wsPort);
  mountToolbar(close);

  // Initialize property controller (requires Shadow DOM from mountToolbar)
  const shadowRoot = getShadowRoot();
  if (shadowRoot) {
    initPropertyController(shadowRoot);
    initChangelog(shadowRoot);
  }

  // Phase 1 systems
  initSelection();
  initHighlightCanvas();
  initDrag();

  // Phase 2A layers
  initAnnotationLayer();

  // Wire annotation removal from undo to SVG layer cleanup
  onAnnotationRemoved((id) => removeAnnotationElement(id));

  // HMR survival for moved elements
  moveObserver = new MutationObserver(() => {
    for (const [id, entry] of getMoves()) {
      if (!document.contains(entry.element)) {
        setTimeout(() => {
          // Try sync reacquisition first
          let newEl = reacquireMovedElement(entry.identity);
          if (newEl) {
            restoreMoveToElement(id, entry, newEl);
            return;
          }
          // Try async reacquisition
          reacquireMovedElementAsync(entry.identity).then((asyncEl) => {
            if (asyncEl) {
              restoreMoveToElement(id, entry, asyncEl);
            } else {
              removeMove(id);
              showToast(`Component ${entry.componentRef.componentName} removed — move cleared`);
            }
          });
        }, 80);
      }
    }

    // Check if clones were detached by HMR
    for (const [id, entry] of getClones()) {
      if (!document.contains(entry.element)) {
        setTimeout(() => {
          if (document.contains(entry.originalElement)) {
            const parent = entry.originalElement.parentElement;
            if (parent) {
              parent.insertBefore(entry.element, entry.originalElement.nextSibling);
              return;
            }
          }
          removeCloneEntry(id);
          showToast(`Clone of ${entry.sourceLocation.componentName} removed — original no longer present`);
        }, 80);
      }
    }
  });

  moveObserver.observe(document.body, { childList: true, subtree: true });

  // Keyboard shortcut: Cmd+Shift+L / Ctrl+Shift+L — toggle changelog
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "l") {
      e.preventDefault();
      setChangelogOpen(!isChangelogOpen());
    }
  });

  initToolsPanel();
  initInlineTextEdit();
  initInteraction();
  showOnboardingHint();

  // Select tool uses selection.ts capture-phase listeners directly (no interaction handler needed).
  // Only text tool needs an interaction handler.

  // Tool change listener — handles mode switching
  onToolChange((tool, prev) => {
    dismissOnboarding();
    flashToolButton(tool);

    // Clear caches on tool switch
    clearElementCache();
    clearVisibilityCache();

    // Enable/disable selection capture-phase listeners based on tool
    setEnabled(tool === "select");

    activateInteraction(tool);
    updateActiveToolUI(tool);
  });

  // State change → update confirm + canvas undo buttons
  onStateChange(() => {
    updateGenerateButton(hasChanges());
    updateCanvasUndoButton(canUndo());
  });

  // Canvas undo from tools panel sidebar
  setOnCanvasUndoPanel(() => {
    const description = canvasUndo();
    if (description) showToast(`Undo: ${description}`);
  });

  // Confirm button — deterministic batch for moves/colors/text edits
  let generating = false;
  setOnGenerate(() => {
    if (generating) {
      showToast("Operation in progress");
      return;
    }
    if (!hasChanges()) {
      showToast("Nothing to confirm — make some visual changes first");
      return;
    }

    const batchOps = buildBatchOperations();
    if (batchOps.length > 0) {
      generating = true;
      updateGenerateButton(false);
      showToast(`Applying ${batchOps.length} change${batchOps.length !== 1 ? "s" : ""}...`);
      send({ type: "commitBatch", operations: batchOps });
    } else {
      showToast("Could not resolve source files for these changes — try re-selecting");
    }
  });

  // Handle commitBatch completion from CLI
  onMessage((msg) => {
    if (msg.type === "commitBatchComplete") {
      // Property sidebar saves also use commitBatch now; only the explicit
      // confirm/apply flow should drive the global generate/apply UI.
      if (!generating) return;

      generating = false;
      updateGenerateButton(hasChanges());

      const successCount = msg.results?.filter((r) => r.success).length ?? 0;
      const totalCount = msg.results?.length ?? 0;
      const undoIds = msg.undoIds ?? [];

      if (msg.success) {
        addChangeEntry({
          type: "commitBatch",
          componentName: "Batch Apply",
          filePath: "",
          summary: `${successCount}/${totalCount} changes applied`,
          state: "active",
          revertData: { type: "batchApplyUndo", undoIds },
        });
        showToast(`Applied ${successCount}/${totalCount} changes`);
        clearSelection();
        clearAnnotationLayer();
        resetCanvas();
        // Reload after source files are written — HMR may handle this,
        // but force reload as fallback to ensure the page reflects changes
        setTimeout(() => window.location.reload(), 600);
      } else if (successCount > 0) {
        // Partial success
        addChangeEntry({
          type: "commitBatch",
          componentName: "Batch Apply",
          filePath: "",
          summary: `${successCount}/${totalCount} changes applied (${totalCount - successCount} failed)`,
          state: "active",
          revertData: { type: "batchApplyUndo", undoIds },
        });
        showToast(`Applied ${successCount}/${totalCount} — ${totalCount - successCount} failed`);
        clearSelection();
        clearAnnotationLayer();
        resetCanvas();
        setTimeout(() => window.location.reload(), 600);
      } else {
        const failedDetails = msg.results?.filter((r: any) => !r.success).map((r: any) => r.error).filter(Boolean).join("; ");
        showToast(`Error: ${failedDetails || msg.error || "Batch apply failed"}`);
        console.error("[ReactRewrite] Batch apply failed:", msg.results);
        generating = false;
        updateGenerateButton(hasChanges());
      }
    }
  });

  // Canvas undo (Ctrl+Z) — works in all tool modes
  setOnCanvasUndo(() => {
    const description = canvasUndo();
    if (description) {
      showToast(`Undo: ${description}`);
      return true;
    }
    return false;
  });

  // File stat responses — update clone and delete staleness data
  onMessage((msg) => {
    if (msg.type === "fileStatResult") {
      updateCloneFileStat(msg.filePath, msg.mtime, msg.size);
      updateDeleteFileStat(msg.filePath, msg.mtime, msg.size);
    }
  });

  // Clear All
  setOnClearAll(() => {
    resetOverlayState();
    showToast("Everything reset");
  });

  console.log("[ReactRewrite] Overlay initialized with Phase 2A canvas tools");
}

function close(): void {
  clearElementCache();
  clearVisibilityCache();
  deactivateSelection();
  destroyHighlightCanvas();
  deactivateDrag();
  destroyPropertyController();
  destroyAnnotationLayer();
  moveObserver?.disconnect();
  destroyToolsPanel();
  destroyChangelog();
  destroyInlineTextEdit();
  destroyInteraction();
  resetCanvas();
  destroyCanvasTransform();
  disconnect();
  destroyToolbar();
}

function safeInit(): void {
  try {
    init();
    installGlobalErrorHandlers();
  } catch (err) {
    handleOverlayError(err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", safeInit);
} else {
  safeInit();
}
