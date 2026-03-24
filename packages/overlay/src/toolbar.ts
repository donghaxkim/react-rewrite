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

const EYE_OPEN_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path></svg>`;
const EYE_CLOSED_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z"></path></svg>`;
const UNDO_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>`;
const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>`;
const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>`;

const TOOLBAR_STYLES = `
  :host {
    all: initial;
  }
  ${FONT_FACE_CSS}
  .toolbar {
    position: fixed;
    bottom: 16px;
    left: 76px;
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
    left: 76px;
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
  host.id = "frameup-root";
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
      ${EYE_CLOSED_SVG}
    </button>
    <button class="icon-btn undo-btn" disabled title="Undo Reorder">
      ${UNDO_SVG}
    </button>
    <span class="divider"></span>
    <button class="generate-btn" disabled>Confirm</button>
    <button class="icon-btn close-btn" title="Close FrameUp">
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
  const host = document.getElementById("frameup-root");
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
