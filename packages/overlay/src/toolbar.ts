// packages/overlay/src/toolbar.ts
import { send, onMessage, setOnMaxRetries, setOnTabTakenOver, setOnReconnected, manualReconnect } from "./bridge.js";

let shadowRoot: ShadowRoot | null = null;
let componentInfoEl: HTMLElement | null = null;
let undoBtn: HTMLButtonElement | null = null;
let errorTimeout: ReturnType<typeof setTimeout> | null = null;
let undoCount = 0;
let generateBtn: HTMLButtonElement | null = null;
let eyeBtn: HTMLButtonElement | null = null;
let toastEl: HTMLDivElement | null = null;
let toastTimeout: ReturnType<typeof setTimeout> | null = null;
let onEyeToggle: (() => void) | null = null;
let onGenerate: (() => void) | null = null;
let onCanvasUndo: (() => boolean) | null = null;

const TOOLBAR_STYLES = `
  :host {
    all: initial;
  }
  .toolbar {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    color: #e0e0e0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    user-select: none;
  }
  .mode {
    color: #64b5f6;
    font-weight: 600;
  }
  .divider {
    width: 1px;
    height: 16px;
    background: #444;
  }
  .component-info {
    color: #aaa;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-info.error {
    color: #ef5350;
  }
  button {
    background: #2a2a3e;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  button:hover:not(:disabled) {
    background: #3a3a4e;
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .close-btn {
    background: transparent;
    border: none;
    color: #888;
    font-size: 16px;
    padding: 2px 6px;
    line-height: 1;
  }
  .close-btn:hover {
    color: #ef5350;
  }
  .generate-btn {
    background: #1e88e5;
    border: 1px solid #1565c0;
    color: white;
  }
  .generate-btn:hover:not(:disabled) {
    background: #1565c0;
  }
  .eye-btn {
    background: transparent;
    border: 1px solid #444;
    font-size: 14px;
    padding: 4px 6px;
  }
  .toast {
    position: fixed;
    bottom: 60px;
    right: 16px;
    background: #333;
    color: #e0e0e0;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    z-index: 2147483647;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .toast.visible {
    opacity: 1;
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
    <span class="mode">Select</span>
    <span class="divider"></span>
    <span class="component-info">No selection</span>
    <button class="generate-btn" disabled>Generate</button>
    <button class="eye-btn" title="Toggle originals (.)">👁</button>
    <button class="undo-btn" disabled>Undo Reorder</button>
    <button class="close-btn">&times;</button>
  `;

  shadowRoot.appendChild(style);
  shadowRoot.appendChild(toolbar);

  componentInfoEl = toolbar.querySelector(".component-info");
  undoBtn = toolbar.querySelector(".undo-btn");
  const closeBtn = toolbar.querySelector(".close-btn");
  generateBtn = toolbar.querySelector(".generate-btn");
  eyeBtn = toolbar.querySelector(".eye-btn");

  // Toast element
  toastEl = document.createElement("div");
  toastEl.className = "toast";
  shadowRoot.appendChild(toastEl);

  undoBtn!.addEventListener("click", () => {
    send({ type: "undo" });
    undoBtn!.disabled = true;
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

  // Keyboard shortcuts: `.` for eye toggle, Ctrl+Z for canvas undo
  document.addEventListener("keydown", (e) => {
    if (e.key === "." && !isTextInputFocused()) {
      if (onEyeToggle) onEyeToggle();
    }
    // Canvas undo — callback returns true if it handled the undo, false if in Pointer mode
    if (e.key === "z" && (e.ctrlKey || e.metaKey) && !e.shiftKey && !isTextInputFocused()) {
      if (onCanvasUndo?.()) e.preventDefault();
    }
  });

  // Show reconnect button when max retries exhausted
  setOnMaxRetries(() => {
    if (componentInfoEl) {
      componentInfoEl.innerHTML = 'Disconnected. <button style="background:none;border:none;color:#64b5f6;cursor:pointer;text-decoration:underline;font:inherit;">Reconnect</button>';
      componentInfoEl.classList.add("error");
      const reconnectBtn = componentInfoEl.querySelector("button");
      reconnectBtn?.addEventListener("click", () => {
        manualReconnect();
        if (componentInfoEl) {
          componentInfoEl.textContent = "Reconnecting...";
        }
      });
    }
  });

  // Show message when another tab takes over
  setOnTabTakenOver(() => {
    showError("Disconnected: another tab took over");
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
          if (undoBtn) undoBtn.disabled = false;
        } else if (msg.error) {
          showError(msg.error);
        }
        break;

      case "undoComplete":
        if (msg.success) {
          undoCount = Math.max(0, undoCount - 1);
          if (undoBtn) undoBtn.disabled = undoCount === 0;
        } else if (msg.error) {
          showError(msg.error);
        }
        break;

      case "devServerDisconnected":
        showError("Dev server disconnected");
        break;

      case "devServerReconnected":
        updateComponentInfo("No selection");
        break;
    }
  });
}

export function updateComponentInfo(text: string): void {
  if (componentInfoEl) {
    componentInfoEl.textContent = text;
    componentInfoEl.classList.remove("error");
  }
}

export function showError(message: string): void {
  if (componentInfoEl) {
    componentInfoEl.textContent = message;
    componentInfoEl.classList.add("error");

    if (errorTimeout) clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
      if (componentInfoEl) {
        componentInfoEl.textContent = "No selection";
        componentInfoEl.classList.remove("error");
      }
    }, 3000);
  }
}

export function destroyToolbar(): void {
  const host = document.getElementById("sketch-ui-root");
  if (host) host.remove();
  shadowRoot = null;
  componentInfoEl = null;
  undoBtn = null;
}

export function getShadowRoot(): ShadowRoot | null {
  return shadowRoot;
}

export function setOnEyeToggle(fn: () => void): void { onEyeToggle = fn; }
export function setOnGenerate(fn: () => void): void { onGenerate = fn; }
export function setOnCanvasUndo(fn: () => boolean): void { onCanvasUndo = fn; }

export function updateEyeButton(hidden: boolean): void {
  if (eyeBtn) eyeBtn.textContent = hidden ? "👁‍🗨" : "👁";
}

export function updateGenerateButton(enabled: boolean): void {
  if (generateBtn) generateBtn.disabled = !enabled;
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

export function updateModeLabel(label: string): void {
  const modeEl = getShadowRoot()?.querySelector(".mode");
  if (modeEl) modeEl.textContent = label;
}

function isTextInputFocused(): boolean {
  const active = document.activeElement;
  return active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement;
}
