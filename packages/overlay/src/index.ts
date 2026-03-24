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
  canvasUndo, canUndo, resetCanvas, hasChanges, serializeAnnotations,
  onAnnotationRemoved,
  getMoves, removeMove,
} from "./canvas-state.js";
import { initPropertyController, destroyPropertyController } from "./properties/property-controller.js";
import { textHandler, cleanupTextTool } from "./tools/text.js";
import { initInlineTextEdit, destroyInlineTextEdit } from "./inline-text-edit.js";
import { initCanvasTransform, destroyCanvasTransform, resetCanvasTransform } from "./canvas-transform.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { initChangelog, destroyChangelog, addChangeEntry, isChangelogOpen, setChangelogOpen } from "./changelog.js";

declare global {
  interface Window {
    __FRAMEUP_WS_PORT__?: number;
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
  return /frameup|overlay/i.test(stack);
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
  console.error("[FrameUp]", error);
  showErrorToast("FrameUp encountered an error. Your app is unaffected.");
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

function restoreMoveToElement(id: string, entry: MoveEntry, newEl: HTMLElement): void {
  entry.originalCssText = newEl.style.cssText;
  entry.element = newEl;
  applyMoveTransform(entry);
}

function init(): void {
  const wsPort = window.__FRAMEUP_WS_PORT__;
  if (!wsPort) {
    console.warn("[FrameUp] No WebSocket port found.");
    return;
  }

  if (document.getElementById("frameup-root")) return; // Already initialized

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
  registerToolHandler("text", textHandler);

  // Tool change listener — handles mode switching
  onToolChange((tool, prev) => {
    dismissOnboarding();
    flashToolButton(tool);

    // Cleanup previous tool
    if (prev === "text") cleanupTextTool();

    // Clear caches on tool switch
    clearElementCache();
    clearVisibilityCache();

    // Enable/disable selection capture-phase listeners based on tool
    setEnabled(tool === "select");

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

  // Generate button — sends annotations to CLI → Claude API → writes code
  let generating = false;
  let cooldownUntil = 0; // (#8) Error cooldown timestamp
  setOnGenerate(() => {
    if (generating) {
      showToast("Generation in progress");
      return;
    }
    // (#8) Cooldown after errors
    const now = Date.now();
    if (now < cooldownUntil) {
      const remaining = Math.ceil((cooldownUntil - now) / 1000);
      showToast(`Please wait ${remaining}s before retrying`);
      return;
    }
    const data = serializeAnnotations();
    if (!data.moves.length && !data.annotations.length && !data.colorChanges.length && !data.textEdits.length) {
      showToast("Nothing to confirm — make some visual changes first");
      return;
    }
    generating = true;
    updateGenerateButton(false);
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
      updateGenerateButton(hasChanges());
      if (msg.success) {
        const fileCount = msg.changes.length;
        addChangeEntry({
          type: "generate",
          componentName: "AI Generate",
          filePath: msg.changes[0]?.filePath || "",
          summary: `${fileCount} file${fileCount !== 1 ? "s" : ""} changed`,
          state: "active",
          revertData: { type: "generateUndo", undoIds: msg.undoIds || [] },
        });
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

  // Canvas undo (Ctrl+Z) — works in all tool modes
  setOnCanvasUndo(() => {
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
    updateEyeButton(true); // Reset eye icon to closed (originals hidden)
    showToast("Canvas cleared");
  });

  console.log("[FrameUp] Overlay initialized with Phase 2A canvas tools");
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
