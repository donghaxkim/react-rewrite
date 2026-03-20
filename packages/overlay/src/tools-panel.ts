// packages/overlay/src/tools-panel.ts
import type { ToolType } from "@sketch-ui/shared";
import { getActiveTool, setActiveTool, getToolOptions, setToolOption } from "./canvas-state.js";
import { getShadowRoot } from "./toolbar.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";

const ICONS = {
  pointer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l14 9-7 1-4 7z"/></svg>`,
  grab: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V8a2 2 0 0 0-4 0v3"/><path d="M14 10V6a2 2 0 0 0-4 0v4"/><path d="M10 9.5V5a2 2 0 0 0-4 0v9"/><path d="M6 14c0 3.31 2.69 6 6 6h2a6 6 0 0 0 6-6v-2"/></svg>`,
  move: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,
  draw: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
  color: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l1-1h3l9-9"/><path d="M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7"/><path d="M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14"/><path d="m9 7 6 6"/><path d="M20 2a2.83 2.83 0 0 1 0 4L16 10"/></svg>`,
  text: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>`,
  lasso: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-4.42 0-8 2.24-8 5 0 1.72 1.3 3.24 3.3 4.2"/><path d="M12 4c4.42 0 8 2.24 8 5 0 2.76-3.58 5-8 5"/><path d="M7.3 13.2C5.71 14.08 5 15.27 5 16.5c0 2.49 3.13 4.5 7 4.5s7-2.01 7-4.5c0-1.23-.71-2.42-2.3-3.3"/></svg>`,
  trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
};

const TOOL_DEFS: Array<{ type: ToolType; icon: string; label: string; shortcut: string }> = [
  { type: "pointer", icon: ICONS.pointer, label: "Pointer", shortcut: "V" },
  { type: "grab", icon: ICONS.grab, label: "Grab", shortcut: "H" },
  { type: "move", icon: ICONS.move, label: "Move", shortcut: "M" },
  { type: "draw", icon: ICONS.draw, label: "Draw", shortcut: "D" },
  { type: "color", icon: ICONS.color, label: "Color", shortcut: "C" },
  { type: "text", icon: ICONS.text, label: "Text", shortcut: "T" },
  { type: "lasso", icon: ICONS.lasso, label: "Lasso", shortcut: "L" },
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
  .clear-btn {
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
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast};
  }
  .clear-btn svg {
    width: 18px;
    height: 18px;
  }
  .clear-btn:hover {
    background: ${COLORS.dangerSoft};
    color: ${COLORS.danger};
  }
`;

let panelEl: HTMLDivElement | null = null;
let subOptionsEl: HTMLDivElement | null = null;
let toolButtons: Map<ToolType, HTMLButtonElement> = new Map();
let onClearAll: (() => void) | null = null;

export function setOnClearAll(fn: () => void): void { onClearAll = fn; }

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
    ["lasso"],
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
      btn.innerHTML = `${def.icon}<span class="tooltip">${def.label}<span class="shortcut-badge">${def.shortcut}</span></span>`;
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

  // Clear All divider + button
  const clearDivider = document.createElement("div");
  clearDivider.className = "tool-divider";
  panelEl.appendChild(clearDivider);

  const clearBtn = document.createElement("button");
  clearBtn.className = "clear-btn";
  clearBtn.innerHTML = ICONS.trash;
  clearBtn.title = "Clear All";
  clearBtn.addEventListener("click", () => { if (onClearAll) onClearAll(); });
  panelEl.appendChild(clearBtn);

  shadowRoot.appendChild(panelEl);
  document.addEventListener("keydown", handleToolShortcut, true);
}

function handleToolShortcut(e: KeyboardEvent): void {
  // Suppress shortcuts when text input is focused
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;

  const key = e.key.toUpperCase();
  const tool = TOOL_DEFS.find(d => d.shortcut === key);
  if (tool) {
    setActiveTool(tool.type);
    e.preventDefault();
  }
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
      // Opens custom color picker (Task 9)
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
      // Opens custom color picker (Task 9)
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

export function destroyToolsPanel(): void {
  document.removeEventListener("keydown", handleToolShortcut, true);
  panelEl?.remove();
  panelEl = null;
  subOptionsEl = null;
  toolButtons.clear();
}
