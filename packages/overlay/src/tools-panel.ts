// packages/overlay/src/tools-panel.ts
import type { ToolType } from "@sketch-ui/shared";
import { getActiveTool, setActiveTool, getToolOptions, setToolOption } from "./canvas-state.js";
import { getShadowRoot } from "./toolbar.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { openColorPicker } from "./color-picker.js";
import { toggleCanvasTransform, isCanvasActive } from "./canvas-transform.js";

const ICONS = {
  pointer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>`,
  grab: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>`,
  move: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,
  draw: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  color: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>`,
  text: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
  canvas: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>`,
  undo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18c3.87 0 7-3.13 7-7s-3.13-7-7-7H4"/><polyline points="8 10 4 6 8 2"/></svg>`,
  reset: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>`,
};

const MOD_KEY = navigator.platform.includes("Mac") ? "\u2318" : "Ctrl+";
const MOD_LABEL = navigator.platform.includes("Mac") ? "Cmd" : "Ctrl";

const TOOL_DEFS: Array<{ type: ToolType; icon: string; label: string; shortcut: string }> = [
  { type: "pointer", icon: ICONS.pointer, label: "Pointer", shortcut: "V" },
  { type: "grab", icon: ICONS.grab, label: "Grab", shortcut: "H" },
  { type: "move", icon: ICONS.move, label: "Move", shortcut: "M" },
  { type: "draw", icon: ICONS.draw, label: "Draw", shortcut: "D" },
  { type: "color", icon: ICONS.color, label: "Color", shortcut: "E" },
  { type: "text", icon: ICONS.text, label: "Text", shortcut: "T" },
];

const PANEL_STYLES = `
  .tools-panel {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.lg};
    box-shadow: ${SHADOWS.md};
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px;
    gap: 4px;
    font-family: ${FONT_FAMILY};
    user-select: none;
    opacity: 0;
    animation: panelFadeIn ${TRANSITIONS.settle} forwards;
  }
  @keyframes panelFadeIn {
    to { opacity: 1; }
  }
  .tool-divider {
    width: 16px;
    height: 1px;
    background: ${COLORS.border};
    flex-shrink: 0;
  }
  .tool-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: ${COLORS.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    position: relative;
    padding: 0;
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast};
  }
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .tool-btn svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
  .tool-btn:hover {
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textPrimary};
  }
  .tool-btn.active {
    background: ${COLORS.accentSoft};
    color: ${COLORS.accent};
    border-left-color: ${COLORS.accent};
    border-radius: 0 50% 50% 0;
  }
  .tool-btn .tooltip {
    display: none;
    position: absolute;
    left: 44px;
    top: 50%;
    transform: translateY(-50%);
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.sm};
    color: ${COLORS.textPrimary};
    padding: 4px 8px;
    border-radius: ${RADII.sm};
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
    z-index: 2147483647;
  }
  .tool-btn .tooltip .shortcut-badge {
    display: inline-block;
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textTertiary};
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 11px;
    margin-left: 6px;
  }
  .tool-btn:hover .tooltip {
    display: block;
  }
  .tool-btn.tooltip-visible .tooltip {
    opacity: 1;
  }
  .sub-options {
    width: 100%;
    padding: 4px 0;
    border-top: 1px solid ${COLORS.border};
    border-bottom: 1px solid ${COLORS.border};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
  }
  .sub-options.visible {
    opacity: 1;
  }
  .sub-options.hidden {
    display: none;
  }
  .color-swatch {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    padding: 0;
    box-shadow: ${SHADOWS.sm};
  }
  .segmented-control {
    display: flex;
    background: ${COLORS.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  }
  .segment {
    flex: 1;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: ${COLORS.textSecondary};
    font-size: 10px;
    font-family: ${FONT_FAMILY};
    cursor: pointer;
    padding: 0;
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast}, box-shadow ${TRANSITIONS.fast};
  }
  .segment.active {
    background: ${COLORS.bgPrimary};
    color: ${COLORS.textPrimary};
    box-shadow: ${SHADOWS.sm};
  }
  .action-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${COLORS.textSecondary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast}, opacity ${TRANSITIONS.fast};
  }
  .action-btn svg {
    width: 18px;
    height: 18px;
  }
  .action-btn:hover {
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textPrimary};
  }
  .action-btn:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }
  .action-btn.danger:hover {
    background: ${COLORS.dangerSoft};
    color: ${COLORS.danger};
  }
  .help-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${COLORS.textTertiary};
    cursor: pointer;
    border-radius: 50%;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    font-family: ${FONT_FAMILY};
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast};
  }
  .help-btn:hover {
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textPrimary};
  }
  .shortcuts-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.4);
    animation: fadeIn 150ms ease;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .shortcuts-card {
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.lg};
    box-shadow: ${SHADOWS.lg};
    padding: 24px 28px;
    min-width: 320px;
    max-width: 420px;
    font-family: ${FONT_FAMILY};
    animation: cardSlide 200ms ease;
  }
  @keyframes cardSlide {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  .shortcuts-title {
    font-size: 14px;
    font-weight: 600;
    color: ${COLORS.textPrimary};
    margin: 0 0 16px 0;
  }
  .shortcuts-section {
    margin-bottom: 14px;
  }
  .shortcuts-section-label {
    font-size: 10px;
    font-weight: 600;
    color: ${COLORS.textTertiary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
  }
  .shortcut-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
  }
  .shortcut-action {
    font-size: 12px;
    color: ${COLORS.textPrimary};
  }
  .shortcut-keys {
    display: flex;
    gap: 3px;
    align-items: center;
  }
  .shortcut-key {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    background: ${COLORS.bgSecondary};
    border: 1px solid ${COLORS.border};
    border-radius: 5px;
    font-size: 11px;
    font-family: ${FONT_FAMILY};
    color: ${COLORS.textSecondary};
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  }
  .shortcut-plus {
    font-size: 10px;
    color: ${COLORS.textTertiary};
  }
`;

let panelEl: HTMLDivElement | null = null;
let subOptionsEl: HTMLDivElement | null = null;
let toolButtons: Map<ToolType, HTMLButtonElement> = new Map();
let canvasUndoBtn: HTMLButtonElement | null = null;
let onClearAll: (() => void) | null = null;
let onCanvasUndo: (() => void) | null = null;

export function setOnClearAll(fn: () => void): void { onClearAll = fn; }
export function setOnCanvasUndo(fn: () => void): void { onCanvasUndo = fn; }

export function updateCanvasUndoButton(enabled: boolean): void {
  if (canvasUndoBtn) canvasUndoBtn.disabled = !enabled;
}

export function initToolsPanel(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const style = document.createElement("style");
  style.textContent = PANEL_STYLES;
  shadowRoot.appendChild(style);

  panelEl = document.createElement("div");
  panelEl.className = "tools-panel";

  const groups = [
    ["pointer", "grab"],
    ["move"],
    ["draw", "color", "text"],
  ];

  for (let gi = 0; gi < groups.length; gi++) {
    if (gi > 0) {
      const divider = document.createElement("div");
      divider.className = "tool-divider";
      panelEl.appendChild(divider);
    }
    for (const toolType of groups[gi]) {
      const def = TOOL_DEFS.find(d => d.type === toolType)!;
      const btn = document.createElement("button");
      btn.className = `tool-btn${def.type === "pointer" ? " active" : ""}`;
      btn.innerHTML = `${def.icon}<span class="tooltip">${def.label}<span class="shortcut-badge">${MOD_KEY}${def.shortcut}</span></span>`;
      btn.addEventListener("click", () => setActiveTool(def.type));

      // 400ms tooltip delay
      let tooltipTimer: ReturnType<typeof setTimeout> | null = null;
      btn.addEventListener("mouseenter", () => {
        tooltipTimer = setTimeout(() => btn.classList.add("tooltip-visible"), 400);
      });
      btn.addEventListener("mouseleave", () => {
        if (tooltipTimer) clearTimeout(tooltipTimer);
        btn.classList.remove("tooltip-visible");
      });

      panelEl.appendChild(btn);
      toolButtons.set(def.type, btn);
    }
  }

  // Sub-options container
  subOptionsEl = document.createElement("div");
  subOptionsEl.className = "sub-options hidden";
  panelEl.appendChild(subOptionsEl);

  // Bottom section: undo + reset
  const bottomDivider = document.createElement("div");
  bottomDivider.className = "tool-divider";
  panelEl.appendChild(bottomDivider);

  canvasUndoBtn = document.createElement("button");
  canvasUndoBtn.className = "action-btn";
  canvasUndoBtn.innerHTML = ICONS.undo;
  canvasUndoBtn.title = "Undo (Ctrl+Z)";
  canvasUndoBtn.disabled = true;
  canvasUndoBtn.addEventListener("click", () => { if (onCanvasUndo) onCanvasUndo(); });
  panelEl.appendChild(canvasUndoBtn);

  const clearBtn = document.createElement("button");
  clearBtn.className = "action-btn danger";
  clearBtn.innerHTML = ICONS.reset;
  clearBtn.title = "Reset Canvas";
  clearBtn.addEventListener("click", () => { if (onClearAll) onClearAll(); });
  panelEl.appendChild(clearBtn);

  const canvasBtn = document.createElement("button");
  canvasBtn.className = "action-btn";
  canvasBtn.innerHTML = ICONS.canvas;
  canvasBtn.title = "Toggle Infinite Canvas";
  canvasBtn.addEventListener("click", () => {
    toggleCanvasTransform();
    // Visual feedback: toggle active state
    canvasBtn.style.color = isCanvasActive() ? COLORS.accent : "";
  });
  panelEl.appendChild(canvasBtn);

  // Help button — shows keyboard shortcuts
  const helpBtn = document.createElement("button");
  helpBtn.className = "help-btn";
  helpBtn.textContent = "?";
  helpBtn.title = `Keyboard Shortcuts (${MOD_KEY}/)`;
  helpBtn.addEventListener("click", () => toggleShortcutsOverlay());
  panelEl.appendChild(helpBtn);

  shadowRoot.appendChild(panelEl);
  document.addEventListener("keydown", handleToolShortcut, true);
}

function handleToolShortcut(e: KeyboardEvent): void {
  // Suppress shortcuts when text input is focused
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;

  // All tool shortcuts require Ctrl (Win/Linux) or Cmd (Mac)
  if (!e.ctrlKey && !e.metaKey) return;

  const key = e.key.toUpperCase();

  // Toggle shortcuts overlay with Ctrl/Cmd + /
  if (e.key === "/" || e.key === "?") {
    toggleShortcutsOverlay();
    e.preventDefault();
    return;
  }

  const tool = TOOL_DEFS.find(d => d.shortcut === key);
  if (tool) {
    setActiveTool(tool.type);
    e.preventDefault();
  }
}

// ---------------------------------------------------------------------------
// Shortcuts Overlay
// ---------------------------------------------------------------------------

let shortcutsOverlayEl: HTMLDivElement | null = null;
let shortcutsKeyHandler: ((e: KeyboardEvent) => void) | null = null;

function toggleShortcutsOverlay(): void {
  if (shortcutsOverlayEl) {
    closeShortcutsOverlay();
  } else {
    openShortcutsOverlay();
  }
}

function openShortcutsOverlay(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot || shortcutsOverlayEl) return;

  shortcutsOverlayEl = document.createElement("div");
  shortcutsOverlayEl.className = "shortcuts-overlay";

  const card = document.createElement("div");
  card.className = "shortcuts-card";

  const title = document.createElement("div");
  title.className = "shortcuts-title";
  title.textContent = "Keyboard Shortcuts";
  card.appendChild(title);

  const sections: Array<{ label: string; items: Array<{ action: string; keys: string[] }> }> = [
    {
      label: "Tools",
      items: TOOL_DEFS.map(d => ({
        action: d.label,
        keys: [MOD_LABEL, d.shortcut],
      })),
    },
    {
      label: "Actions",
      items: [
        { action: "Undo", keys: [MOD_LABEL, "Z"] },
        { action: "Toggle Originals", keys: [MOD_LABEL, "."] },
        { action: "Keyboard Shortcuts", keys: [MOD_LABEL, "/"] },
        { action: "Cancel / Deselect", keys: ["Esc"] },
      ],
    },
    {
      label: "Canvas",
      items: [
        { action: "Pan", keys: ["Grab Tool", "Drag"] },
        { action: "Zoom", keys: ["Scroll Wheel"] },
      ],
    },
  ];

  for (const section of sections) {
    const sectionEl = document.createElement("div");
    sectionEl.className = "shortcuts-section";

    const labelEl = document.createElement("div");
    labelEl.className = "shortcuts-section-label";
    labelEl.textContent = section.label;
    sectionEl.appendChild(labelEl);

    for (const item of section.items) {
      const row = document.createElement("div");
      row.className = "shortcut-row";

      const action = document.createElement("span");
      action.className = "shortcut-action";
      action.textContent = item.action;
      row.appendChild(action);

      const keysWrap = document.createElement("span");
      keysWrap.className = "shortcut-keys";
      for (let i = 0; i < item.keys.length; i++) {
        if (i > 0) {
          const plus = document.createElement("span");
          plus.className = "shortcut-plus";
          plus.textContent = "+";
          keysWrap.appendChild(plus);
        }
        const key = document.createElement("span");
        key.className = "shortcut-key";
        key.textContent = item.keys[i];
        keysWrap.appendChild(key);
      }
      row.appendChild(keysWrap);

      sectionEl.appendChild(row);
    }

    card.appendChild(sectionEl);
  }

  shortcutsOverlayEl.appendChild(card);

  // Close on backdrop click
  shortcutsOverlayEl.addEventListener("click", (e) => {
    if (e.target === shortcutsOverlayEl) closeShortcutsOverlay();
  });

  shadowRoot.appendChild(shortcutsOverlayEl);

  // Dismiss on any keypress
  shortcutsKeyHandler = (e: KeyboardEvent) => {
    closeShortcutsOverlay();
    // Don't prevent the key from also triggering its shortcut
  };
  document.addEventListener("keydown", shortcutsKeyHandler, true);
}

function closeShortcutsOverlay(): void {
  if (shortcutsKeyHandler) {
    document.removeEventListener("keydown", shortcutsKeyHandler, true);
    shortcutsKeyHandler = null;
  }
  shortcutsOverlayEl?.remove();
  shortcutsOverlayEl = null;
}

export function updateActiveToolUI(tool: ToolType): void {
  for (const [type, btn] of toolButtons) {
    btn.classList.toggle("active", type === tool);
  }
  updateSubOptions(tool);
}

function updateSubOptions(tool: ToolType): void {
  if (!subOptionsEl) return;
  subOptionsEl.innerHTML = "";
  subOptionsEl.classList.add("hidden");
  subOptionsEl.classList.remove("visible");

  if (tool === "draw") {
    subOptionsEl.classList.remove("hidden");
    requestAnimationFrame(() => subOptionsEl?.classList.add("visible"));
    const opts = getToolOptions();

    // Color swatch
    const swatch = document.createElement("button");
    swatch.className = "color-swatch";
    swatch.style.background = opts.brushColor;
    swatch.addEventListener("click", () => {
      const rect = swatch.getBoundingClientRect();
      openColorPicker({
        initialColor: opts.brushColor,
        position: { x: rect.right + 8, y: rect.top },
        showPropertyToggle: false,
        onColorChange(hex) {
          setToolOption("brushColor", hex);
          swatch.style.background = hex;
        },
        onClose() {},
      });
    });
    subOptionsEl.appendChild(swatch);

    // Segmented control for sizes
    const segmented = document.createElement("div");
    segmented.className = "segmented-control";
    for (const size of [2, 4, 8]) {
      const seg = document.createElement("button");
      seg.className = `segment${size === opts.brushSize ? " active" : ""}`;
      seg.textContent = `${size}`;
      seg.addEventListener("click", () => {
        setToolOption("brushSize", size);
        segmented.querySelectorAll(".segment").forEach(s => s.classList.remove("active"));
        seg.classList.add("active");
        // Update draw cursor
        import("./interaction.js").then(m => m.refreshDrawCursor());
      });
      segmented.appendChild(seg);
    }
    subOptionsEl.appendChild(segmented);
  } else if (tool === "text") {
    subOptionsEl.classList.remove("hidden");
    requestAnimationFrame(() => subOptionsEl?.classList.add("visible"));
    const opts = getToolOptions();

    // Color swatch
    const swatch = document.createElement("button");
    swatch.className = "color-swatch";
    swatch.style.background = opts.textColor;
    swatch.addEventListener("click", () => {
      const rect = swatch.getBoundingClientRect();
      openColorPicker({
        initialColor: opts.textColor,
        position: { x: rect.right + 8, y: rect.top },
        showPropertyToggle: false,
        onColorChange(hex) {
          setToolOption("textColor", hex);
          swatch.style.background = hex;
        },
        onClose() {},
      });
    });
    subOptionsEl.appendChild(swatch);

    // Segmented control for font sizes
    const segmented = document.createElement("div");
    segmented.className = "segmented-control";
    for (const size of [12, 16, 20, 24]) {
      const seg = document.createElement("button");
      seg.className = `segment${size === opts.fontSize ? " active" : ""}`;
      seg.textContent = `${size}`;
      seg.addEventListener("click", () => {
        setToolOption("fontSize", size);
        segmented.querySelectorAll(".segment").forEach(s => s.classList.remove("active"));
        seg.classList.add("active");
      });
      segmented.appendChild(seg);
    }
    subOptionsEl.appendChild(segmented);
  }
}

export function flashToolButton(tool: ToolType): void {
  const btn = toolButtons.get(tool);
  if (!btn) return;
  btn.style.backgroundColor = COLORS.accentSoft;
  btn.style.transition = `background-color 300ms ease`;
  setTimeout(() => {
    btn.style.backgroundColor = "";
    btn.style.transition = "";
  }, 300);
}

export function destroyToolsPanel(): void {
  document.removeEventListener("keydown", handleToolShortcut, true);
  closeShortcutsOverlay();
  panelEl?.remove();
  panelEl = null;
  subOptionsEl = null;
  toolButtons.clear();
}
