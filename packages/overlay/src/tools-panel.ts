// packages/overlay/src/tools-panel.ts
import type { ToolType } from "@react-rewrite/shared";
import { getActiveTool, setActiveTool } from "./canvas-state.js";
import { getShadowRoot } from "./toolbar.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { toggleCanvasTransform, isCanvasActive } from "./canvas-transform.js";
import { isTextEditing } from "./inline-text-edit.js";
import { getActiveCount, isChangelogOpen, onChangelogChange, setChangelogOpen } from "./changelog.js";

const ICONS = {
  pointer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9093 12.3603L17.0007 20.8537L14.1816 21.8798L11.0902 13.3864L6.91797 16.5422L8.4087 1.63318L19.134 12.0959L13.9093 12.3603Z"></path></svg>`,
  text: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 6V21H11V6H5V4H19V6H13Z"></path></svg>`,
  canvas: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM11 13H4V19H11V13ZM20 13H13V19H20V13ZM11 5H4V11H11V5ZM20 5H13V11H20V5Z"></path></svg>`,
  logs: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path></svg>`,
  undo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7.18,4,8.6,5.44,6.06,8h9.71a6,6,0,0,1,0,12h-2V18h2a4,4,0,0,0,0-8H6.06L8.6,12.51,7.18,13.92,2.23,9Z"></path></svg>`,
  reset: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12C22 17.5228 17.5229 22 12 22C6.4772 22 2 17.5228 2 12C2 6.47715 6.4772 2 12 2V4C7.5817 4 4 7.58172 4 12C4 16.4183 7.5817 20 12 20C16.4183 20 20 16.4183 20 12C20 9.53614 18.8862 7.33243 17.1346 5.86492L15 8V2L21 2L18.5535 4.44656C20.6649 6.28002 22 8.9841 22 12Z"></path></svg>`,
  palette: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v1A2.5 2.5 0 0 1 17.5 11h-11A2.5 2.5 0 0 1 4 8.5v-1Z"/><path d="M4 15.5A2.5 2.5 0 0 1 6.5 13h11a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-1Z"/><path d="M8 8h4"/><path d="M8 16h7"/></svg>`,
};

const MOD_KEY = navigator.platform.includes("Mac") ? "\u2318" : "Ctrl+";
const MOD_LABEL = navigator.platform.includes("Mac") ? "Cmd" : "Ctrl";

const TOOL_DEFS: Array<{ type: ToolType; icon: string; label: string; shortcut: string }> = [
  { type: "select", icon: ICONS.pointer, label: "Select", shortcut: "S" },
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
    position: relative;
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
  .action-btn.active {
    background: ${COLORS.accentSoft};
    color: ${COLORS.accent};
  }
  .action-btn:disabled {
    opacity: 0.3;
    cursor: default;
    pointer-events: none;
  }
  .action-btn.has-badge {
    position: relative;
  }
  .action-badge {
    position: absolute;
    top: 3px;
    right: 3px;
    min-width: 14px;
    height: 14px;
    padding: 0 4px;
    border-radius: 999px;
    background: ${COLORS.accent};
    color: #ffffff;
    font-size: 9px;
    font-weight: 700;
    line-height: 14px;
    text-align: center;
    box-sizing: border-box;
    pointer-events: none;
  }
  .action-badge.hidden {
    display: none;
  }
  .action-btn.danger:hover {
    background: ${COLORS.dangerSoft};
    color: ${COLORS.danger};
  }
  .action-btn .tooltip {
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
  .action-btn .tooltip .shortcut-badge {
    display: inline-block;
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textTertiary};
    border-radius: 4px;
    padding: 1px 5px;
    font-size: 11px;
    margin-left: 6px;
  }
  .action-btn:hover .tooltip {
    display: block;
  }
  .action-btn.tooltip-visible .tooltip {
    opacity: 1;
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
let logsBtn: HTMLButtonElement | null = null;
let logsBadgeEl: HTMLSpanElement | null = null;
let onClearAll: (() => void) | null = null;
let onCanvasUndo: (() => void) | null = null;
let onPaletteToggle: (() => void) | null = null;
let cleanupChangelogSubscription: (() => void) | null = null;

export function setOnClearAll(fn: () => void): void { onClearAll = fn; }
export function setOnCanvasUndo(fn: () => void): void { onCanvasUndo = fn; }
export function setOnPaletteToggle(fn: () => void): void { onPaletteToggle = fn; }

export function updateCanvasUndoButton(enabled: boolean): void {
  if (canvasUndoBtn) canvasUndoBtn.disabled = !enabled;
}

function updateLogsButton(): void {
  if (!logsBtn || !logsBadgeEl) return;
  const activeCount = getActiveCount();
  logsBtn.classList.toggle("active", isChangelogOpen());
  logsBadgeEl.classList.toggle("hidden", activeCount === 0);
  logsBadgeEl.textContent = String(activeCount);
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
    ["select"],
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
      btn.className = `tool-btn${def.type === "select" ? " active" : ""}`;
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

  logsBtn = document.createElement("button");
  logsBtn.className = "action-btn has-badge";
  logsBtn.innerHTML = `${ICONS.logs}<span class="action-badge hidden">0</span>`;
  logsBtn.title = "Logs";
  logsBtn.addEventListener("click", () => {
    setChangelogOpen(!isChangelogOpen());
  });
  logsBadgeEl = logsBtn.querySelector(".action-badge");
  panelEl.appendChild(logsBtn);

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

  // Palette divider + button
  const paletteDivider = document.createElement("div");
  paletteDivider.className = "tool-divider";
  panelEl.appendChild(paletteDivider);

  const paletteBtn = document.createElement("button");
  paletteBtn.className = "action-btn";
  paletteBtn.innerHTML = `${ICONS.palette}<span class="tooltip">Components<span class="shortcut-badge">${navigator.platform.includes("Mac") ? "⇧⌘K" : "⇧Ctrl+K"}</span></span>`;
  // 400ms tooltip delay matching tool buttons
  let paletteTipTimer: ReturnType<typeof setTimeout> | null = null;
  paletteBtn.addEventListener("mouseenter", () => {
    paletteTipTimer = setTimeout(() => paletteBtn.classList.add("tooltip-visible"), 400);
  });
  paletteBtn.addEventListener("mouseleave", () => {
    if (paletteTipTimer) clearTimeout(paletteTipTimer);
    paletteBtn.classList.remove("tooltip-visible");
  });
  paletteBtn.addEventListener("click", () => {
    if (onPaletteToggle) onPaletteToggle();
  });
  panelEl.appendChild(paletteBtn);

  // Help button — shows keyboard shortcuts
  const helpBtn = document.createElement("button");
  helpBtn.className = "help-btn";
  helpBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 8H14V6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5C21 8.433 19.433 10 17.5 10H16V14H17.5C19.433 14 21 15.567 21 17.5C21 19.433 19.433 21 17.5 21C15.567 21 14 19.433 14 17.5V16H10V17.5C10 19.433 8.433 21 6.5 21C4.567 21 3 19.433 3 17.5C3 15.567 4.567 14 6.5 14H8V10H6.5C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5V8ZM8 8V6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8H8ZM8 16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19C7.32843 19 8 18.3284 8 17.5V16ZM16 8H17.5C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5V8ZM16 16V17.5C16 18.3284 16.6716 19 17.5 19C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H16ZM10 10V14H14V10H10Z"></path></svg>`;
  helpBtn.title = `Keyboard Shortcuts (${MOD_KEY}/)`;
  helpBtn.addEventListener("click", () => toggleShortcutsOverlay());
  panelEl.appendChild(helpBtn);

  shadowRoot.appendChild(panelEl);
  document.addEventListener("keydown", handleToolShortcut, true);
  cleanupChangelogSubscription = onChangelogChange(updateLogsButton);
  updateLogsButton();
}

function handleToolShortcut(e: KeyboardEvent): void {
  // Suppress shortcuts when text input is focused
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
  if (isTextEditing()) return;

  // ⇧⌘K / ⇧Ctrl+K → toggle palette
  if (e.key === "K" && e.shiftKey && (e.metaKey || e.ctrlKey)) {
    if (onPaletteToggle) onPaletteToggle();
    e.preventDefault();
    return;
  }

  // Modifier keys → ignore (let browser handle Cmd+T, Ctrl+V, etc.)
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const key = e.key.toUpperCase();

  // Toggle shortcuts overlay with ?
  if (e.key === "?") {
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
        keys: [d.shortcut],
      })),
    },
    {
      label: "Actions",
      items: [
        { action: "Copy", keys: [MOD_LABEL, "C"] },
        { action: "Paste", keys: [MOD_LABEL, "V"] },
        { action: "Duplicate", keys: [MOD_LABEL, "D"] },
        { action: "Delete", keys: ["Del / ⌫"] },
        { action: "Undo", keys: [MOD_LABEL, "Z"] },
        { action: "Toggle Logs", keys: [MOD_LABEL, "Shift", "L"] },
        { action: "Keyboard Shortcuts", keys: ["?"] },
        { action: "Cancel / Deselect", keys: ["Esc"] },
      ],
    },
    {
      label: "Canvas",
      items: [
        { action: "Pan", keys: ["Space", "Drag"] },
        { action: "Zoom", keys: [MOD_LABEL, "Scroll"] },
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
  cleanupChangelogSubscription?.();
  cleanupChangelogSubscription = null;
  closeShortcutsOverlay();
  panelEl?.remove();
  panelEl = null;
  subOptionsEl = null;
  canvasUndoBtn = null;
  logsBtn = null;
  logsBadgeEl = null;
  toolButtons.clear();
}
