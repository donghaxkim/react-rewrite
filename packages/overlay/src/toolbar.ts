// packages/overlay/src/toolbar.ts
import { send, onMessage, setOnMaxRetries, setOnTabTakenOver, setOnReconnected, manualReconnect } from "./bridge.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY, FONT_FACE_CSS } from "./design-tokens.js";

let shadowRoot: ShadowRoot | null = null;
let undoBtn: HTMLButtonElement | null = null;
let undoCount = 0;
let generateBtn: HTMLButtonElement | null = null;
let eyeBtn: HTMLButtonElement | null = null;
let toastEl: HTMLDivElement | null = null;
let toastTimeout: ReturnType<typeof setTimeout> | null = null;
let componentDetailEl: HTMLDivElement | null = null;
let onEyeToggle: (() => void) | null = null;
let onGenerate: (() => void) | null = null;
let onCanvasUndo: (() => boolean) | null = null;

const EYE_OPEN_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_CLOSED_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
const UNDO_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`;
const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const TOOLBAR_STYLES = `
  :host {
    all: initial;
  }
  ${FONT_FACE_CSS}
  .toolbar {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.md};
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    color: ${COLORS.textPrimary};
    box-shadow: ${SHADOWS.md};
    user-select: none;
    opacity: 0;
    animation: fadeIn ${TRANSITIONS.settle} forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .divider {
    width: 1px;
    height: 16px;
    background: ${COLORS.border};
    flex-shrink: 0;
  }
  .icon-btn {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 50%;
    color: ${COLORS.textSecondary};
    cursor: pointer;
    padding: 0;
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast};
  }
  .icon-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .icon-btn:hover:not(:disabled) {
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textPrimary};
  }
  .icon-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }
  .icon-btn.active {
    color: ${COLORS.accent};
  }
  .close-btn {
    color: ${COLORS.textTertiary};
  }
  .close-btn:hover {
    background: ${COLORS.dangerSoft};
    color: ${COLORS.danger};
  }
  .generate-btn {
    background: ${COLORS.accent};
    border: none;
    border-radius: ${RADII.sm};
    color: white;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 600;
    font-family: ${FONT_FAMILY};
    cursor: pointer;
    transition: background ${TRANSITIONS.fast};
  }
  .generate-btn:hover:not(:disabled) {
    background: ${COLORS.accentHover};
  }
  .generate-btn:disabled {
    background: ${COLORS.bgTertiary};
    color: ${COLORS.textTertiary};
    cursor: default;
  }
  .component-detail {
    display: flex;
    align-items: center;
    gap: 6px;
    max-width: 280px;
    overflow: hidden;
  }
  .component-detail .tag {
    color: ${COLORS.accent};
    font-size: 11px;
    font-weight: 600;
    font-family: monospace;
    flex-shrink: 0;
  }
  .component-detail .name {
    color: ${COLORS.textPrimary};
    font-size: 12px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .component-detail .path {
    color: ${COLORS.textTertiary};
    font-size: 11px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-detail.empty {
    color: ${COLORS.textTertiary};
    font-size: 12px;
  }
  .toast {
    position: fixed;
    bottom: 68px;
    right: 16px;
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    color: ${COLORS.textPrimary};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: ${FONT_FAMILY};
    box-shadow: ${SHADOWS.md};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
  }
  .toast.visible {
    opacity: 1;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .spinner {
    width: 12px;
    height: 12px;
    border: 2px solid ${COLORS.border};
    border-top-color: ${COLORS.textSecondary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
`;

export function mountToolbar(onClose: () => void): void {
  const host = document.createElement("div");
  host.id = "sketch-ui-root";
  document.body.appendChild(host);

  shadowRoot = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = TOOLBAR_STYLES;

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  toolbar.innerHTML = `
    <div class="component-detail empty">No selection</div>
    <span class="divider"></span>
    <button class="icon-btn eye-btn" title="Toggle originals (.)">
      ${EYE_OPEN_SVG}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${UNDO_SVG}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="icon-btn close-btn" title="Close SketchUI">
      ${CLOSE_SVG}
    </button>
  `;

  shadowRoot.appendChild(style);
  shadowRoot.appendChild(toolbar);

  undoBtn = toolbar.querySelector(".undo-btn");
  const closeBtn = toolbar.querySelector(".close-btn");
  generateBtn = toolbar.querySelector(".generate-btn");
  eyeBtn = toolbar.querySelector(".eye-btn");
  componentDetailEl = toolbar.querySelector(".component-detail");

  // Toast element
  toastEl = document.createElement("div");
  toastEl.className = "toast";
  shadowRoot.appendChild(toastEl);

  undoBtn!.addEventListener("click", () => {
    send({ type: "undo" });
    if (undoBtn) {
      undoBtn.innerHTML = `<div class="spinner"></div>`;
      undoBtn.disabled = true;
    }
  });

  closeBtn!.addEventListener("click", onClose);

  // Eye toggle button
  eyeBtn!.addEventListener("click", () => {
    if (onEyeToggle) onEyeToggle();
  });

  // Generate button
  generateBtn!.addEventListener("click", () => {
    if (onGenerate) onGenerate();
  });

  // Keyboard shortcuts: Ctrl/Cmd+. for eye toggle, Ctrl/Cmd+Z for canvas undo
  document.addEventListener("keydown", (e) => {
    if (e.key === "." && (e.ctrlKey || e.metaKey) && !isTextInputFocused()) {
      if (onEyeToggle) onEyeToggle();
      e.preventDefault();
    }
    // Canvas undo — callback returns true if it handled the undo, false if in Pointer mode
    if (e.key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey && !isTextInputFocused()) {
      if (onCanvasUndo?.()) e.preventDefault();
    }
  });

  // Show reconnect button when max retries exhausted
  setOnMaxRetries(() => {
    showToast("Disconnected. Click to reconnect.");
    manualReconnect();
  });

  // Show message when another tab takes over
  setOnTabTakenOver(() => {
    showToast("Disconnected: another tab took over");
  });

  // Reset undo counter on reconnect (server clears undo stack on disconnect)
  setOnReconnected(() => {
    undoCount = 0;
    if (undoBtn) undoBtn.disabled = true;
  });

  // Listen for server messages
  onMessage((msg) => {
    switch (msg.type) {
      case "reorderComplete":
        if (msg.success) {
          undoCount++;
          if (undoBtn) {
            undoBtn.innerHTML = CHECK_SVG;
            setTimeout(() => {
              if (undoBtn) {
                undoBtn.innerHTML = UNDO_SVG;
                undoBtn.disabled = false;
              }
            }, 200);
          }
        } else if (msg.error) {
          showToast(msg.error);
        }
        break;

      case "undoComplete":
        if (msg.success) {
          undoCount = Math.max(0, undoCount - 1);
          if (undoBtn) {
            undoBtn.innerHTML = CHECK_SVG;
            setTimeout(() => {
              if (undoBtn) {
                undoBtn.innerHTML = UNDO_SVG;
                undoBtn.disabled = undoCount === 0;
              }
            }, 200);
          }
        } else if (msg.error) {
          showToast(msg.error);
        }
        break;

      case "devServerDisconnected":
        showToast("Dev server disconnected");
        break;

      case "devServerReconnected":
        showToast("Dev server reconnected");
        break;
    }
  });
}


export function destroyToolbar(): void {
  const host = document.getElementById("sketch-ui-root");
  if (host) host.remove();
  shadowRoot = null;
  undoBtn = null;
}

export function getShadowRoot(): ShadowRoot | null {
  return shadowRoot;
}

export function setOnEyeToggle(fn: () => void): void { onEyeToggle = fn; }
export function setOnGenerate(fn: () => void): void { onGenerate = fn; }
export function setOnCanvasUndo(fn: () => boolean): void { onCanvasUndo = fn; }

export function updateEyeButton(hidden: boolean): void {
  if (eyeBtn) eyeBtn.innerHTML = hidden ? EYE_CLOSED_SVG : EYE_OPEN_SVG;
}

export function updateGenerateButton(enabled: boolean): void {
  if (generateBtn) generateBtn.disabled = !enabled;
}


/**
 * Update the component detail section in the action bar.
 * Shows tag name, component name, and file path.
 */
export function updateComponentDetail(info: {
  tagName: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
} | null): void {
  if (!componentDetailEl) return;
  if (!info) {
    componentDetailEl.className = "component-detail empty";
    componentDetailEl.textContent = "No selection";
    return;
  }
  componentDetailEl.className = "component-detail";
  const shortPath = info.filePath
    ? info.filePath.replace(/^.*?\/src\//, "src/") + ":" + info.lineNumber
    : "";
  componentDetailEl.innerHTML = `<span class="tag">&lt;${info.tagName}&gt;</span><span class="name">${info.componentName}</span>${shortPath ? `<span class="path">${shortPath}</span>` : ""}`;
}

export function showToast(message: string): void {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl?.classList.remove("visible");
  }, 2000);
}

function isTextInputFocused(): boolean {
  const active = document.activeElement;
  return active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
}
