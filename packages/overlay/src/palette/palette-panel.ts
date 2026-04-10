// packages/overlay/src/palette/palette-panel.ts
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "../design-tokens.js";
import { requestComponentRegistry } from "../bridge.js";
import { invalidateThemeCache } from "./palette-theme.js";
import { createPalettePreviewElement, hasPalettePreviewBuilder } from "./palette-mount.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InsertPosition = "before" | "inside" | "after";

export interface PaletteItem {
  name: string;
  registryName: string;
  category: string;
  type: "component" | "block";
  props?: Record<string, string>;
}

export interface PaletteVariant {
  name: string;
  props: Record<string, string>;
}

export interface PaletteCallbacks {
  onInsert: (item: PaletteItem, variant?: PaletteVariant) => void;
}

const PANEL_STORAGE_KEY = "react-rewrite-sidebar-width";
const DEFAULT_WIDTH = 300;
const MIN_WIDTH = 260;
const MAX_WIDTH = 380;

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

const COMPONENT_VARIANTS: Record<string, Array<{ name: string; props: Record<string, string> }>> = {
  button: [
    { name: "Default", props: {} },
    { name: "Destructive", props: { variant: "destructive" } },
    { name: "Outline", props: { variant: "outline" } },
    { name: "Secondary", props: { variant: "secondary" } },
    { name: "Ghost", props: { variant: "ghost" } },
    { name: "Link", props: { variant: "link" } },
  ],
  badge: [
    { name: "Default", props: {} },
    { name: "Secondary", props: { variant: "secondary" } },
    { name: "Outline", props: { variant: "outline" } },
    { name: "Destructive", props: { variant: "destructive" } },
  ],
  alert: [
    { name: "Default", props: {} },
    { name: "Destructive", props: { variant: "destructive" } },
  ],
};

// ---------------------------------------------------------------------------
// Component thumbnail SVGs — small visual previews like Figma
// ---------------------------------------------------------------------------

const THUMBNAILS: Record<string, string> = {
  button: `<svg viewBox="0 0 80 40" fill="none"><rect x="8" y="10" width="64" height="20" rx="6" fill="#3b82f6"/><text x="40" y="24" text-anchor="middle" font-size="9" font-weight="600" fill="white">Button</text></svg>`,
  input: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="10" width="72" height="20" rx="4" fill="none" stroke="#555" stroke-width="1"/><text x="12" y="24" font-size="8" fill="#666">Type here...</text></svg>`,
  textarea: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="4" width="72" height="32" rx="4" fill="none" stroke="#555" stroke-width="1"/><line x1="12" y1="12" x2="52" y2="12" stroke="#555" stroke-width="1"/><line x1="12" y1="20" x2="44" y2="20" stroke="#555" stroke-width="1"/><line x1="12" y1="28" x2="36" y2="28" stroke="#555" stroke-width="1"/></svg>`,
  card: `<svg viewBox="0 0 80 40" fill="none"><rect x="6" y="2" width="68" height="36" rx="4" fill="#1e1e24" stroke="#333" stroke-width="1"/><rect x="10" y="6" width="30" height="4" rx="1" fill="#888"/><rect x="10" y="14" width="56" height="2" rx="1" fill="#444"/><rect x="10" y="20" width="48" height="2" rx="1" fill="#444"/><rect x="10" y="28" width="24" height="8" rx="3" fill="#3b82f6"/></svg>`,
  badge: `<svg viewBox="0 0 80 40" fill="none"><rect x="20" y="12" width="40" height="16" rx="8" fill="#3b82f6"/><text x="40" y="24" text-anchor="middle" font-size="8" font-weight="500" fill="white">Badge</text></svg>`,
  label: `<svg viewBox="0 0 80 40" fill="none"><text x="8" y="24" font-size="10" font-weight="500" fill="#ccc">Label</text></svg>`,
  checkbox: `<svg viewBox="0 0 80 40" fill="none"><rect x="12" y="12" width="16" height="16" rx="3" fill="#3b82f6"/><polyline points="16,20 20,24 28,16" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="34" y="24" font-size="9" fill="#ccc">Checked</text></svg>`,
  switch: `<svg viewBox="0 0 80 40" fill="none"><rect x="16" y="12" width="32" height="16" rx="8" fill="#3b82f6"/><circle cx="40" cy="20" r="6" fill="white"/></svg>`,
  select: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="10" width="72" height="20" rx="4" fill="none" stroke="#555" stroke-width="1"/><text x="12" y="24" font-size="8" fill="#888">Select...</text><polyline points="64,17 68,23 72,17" fill="none" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  separator: `<svg viewBox="0 0 80 40" fill="none"><line x1="8" y1="20" x2="72" y2="20" stroke="#444" stroke-width="1"/></svg>`,
  avatar: `<svg viewBox="0 0 80 40" fill="none"><circle cx="40" cy="16" r="10" fill="#444"/><circle cx="40" cy="13" r="4" fill="#888"/><ellipse cx="40" cy="22" rx="6" ry="4" fill="#888"/><text x="40" y="36" text-anchor="middle" font-size="6" fill="#666">CN</text></svg>`,
  skeleton: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="6" width="72" height="8" rx="4" fill="#333"/><rect x="4" y="18" width="56" height="8" rx="4" fill="#2a2a2a"/><rect x="4" y="30" width="40" height="8" rx="4" fill="#252525"/></svg>`,
  progress: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="17" width="72" height="6" rx="3" fill="#333"/><rect x="4" y="17" width="36" height="6" rx="3" fill="#3b82f6"/></svg>`,
  slider: `<svg viewBox="0 0 80 40" fill="none"><rect x="8" y="18" width="64" height="4" rx="2" fill="#333"/><rect x="8" y="18" width="32" height="4" rx="2" fill="#3b82f6"/><circle cx="40" cy="20" r="6" fill="white" stroke="#3b82f6" stroke-width="2"/></svg>`,
  alert: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="4" width="72" height="32" rx="4" fill="none" stroke="#555" stroke-width="1"/><circle cx="14" cy="14" r="4" fill="#eab308"/><text x="14" y="16" text-anchor="middle" font-size="6" font-weight="700" fill="#1e1e24">!</text><rect x="22" y="12" width="40" height="3" rx="1" fill="#888"/><rect x="22" y="22" width="50" height="2" rx="1" fill="#555"/><rect x="22" y="28" width="36" height="2" rx="1" fill="#555"/></svg>`,
  tabs: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="8" width="24" height="4" rx="1" fill="#3b82f6"/><rect x="32" y="8" width="24" height="4" rx="1" fill="#444"/><line x1="4" y1="14" x2="76" y2="14" stroke="#333" stroke-width="1"/><rect x="4" y="20" width="56" height="2" rx="1" fill="#444"/><rect x="4" y="26" width="48" height="2" rx="1" fill="#444"/></svg>`,
  table: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="4" width="72" height="32" rx="3" fill="none" stroke="#444" stroke-width="1"/><line x1="4" y1="14" x2="76" y2="14" stroke="#444" stroke-width="1"/><line x1="4" y1="22" x2="76" y2="22" stroke="#333" stroke-width="0.5"/><line x1="4" y1="30" x2="76" y2="30" stroke="#333" stroke-width="0.5"/><line x1="36" y1="4" x2="36" y2="36" stroke="#333" stroke-width="0.5"/><text x="12" y="11" font-size="5" font-weight="600" fill="#888">Name</text><text x="44" y="11" font-size="5" font-weight="600" fill="#888">Status</text></svg>`,
  toast: `<svg viewBox="0 0 80 40" fill="none"><rect x="8" y="8" width="64" height="24" rx="4" fill="#1e1e24" stroke="#333" stroke-width="1"/><circle cx="18" cy="20" r="4" fill="#22c55e"/><polyline points="16,20 18,22 21,18" fill="none" stroke="white" stroke-width="1.2"/><rect x="26" y="16" width="32" height="3" rx="1" fill="#888"/><rect x="26" y="22" width="24" height="2" rx="1" fill="#555"/></svg>`,
  dialog: `<svg viewBox="0 0 80 40" fill="none"><rect x="0" y="0" width="80" height="40" fill="rgba(0,0,0,0.3)"/><rect x="12" y="6" width="56" height="28" rx="4" fill="#1e1e24" stroke="#444" stroke-width="1"/><rect x="18" y="11" width="28" height="3" rx="1" fill="#888"/><rect x="18" y="18" width="44" height="2" rx="1" fill="#555"/><rect x="36" y="26" width="26" height="6" rx="3" fill="#3b82f6"/></svg>`,
  dropdown: `<svg viewBox="0 0 80 40" fill="none"><rect x="8" y="2" width="48" height="36" rx="4" fill="#1e1e24" stroke="#444" stroke-width="1"/><rect x="12" y="6" width="40" height="6" rx="2" fill="#333"/><text x="16" y="11" font-size="5" fill="#ccc">Option 1</text><rect x="12" y="14" width="40" height="6" rx="2" fill="#3b82f6"/><text x="16" y="19" font-size="5" fill="white">Option 2</text><rect x="12" y="22" width="40" height="6" rx="2" fill="#333"/><text x="16" y="27" font-size="5" fill="#ccc">Option 3</text></svg>`,
  "navigation-menu": `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="10" width="72" height="20" rx="4" fill="#1e1e24" stroke="#333" stroke-width="1"/><text x="14" y="24" font-size="7" fill="#ccc">Home</text><text x="36" y="24" font-size="7" fill="#3b82f6">About</text><text x="58" y="24" font-size="7" fill="#ccc">Blog</text></svg>`,
  accordion: `<svg viewBox="0 0 80 40" fill="none"><rect x="4" y="2" width="72" height="12" rx="3" fill="#1e1e24" stroke="#444" stroke-width="1"/><text x="10" y="10" font-size="6" fill="#ccc">Section 1</text><polyline points="68,6 72,10 68,14" fill="none" stroke="#666" stroke-width="1"/><rect x="4" y="16" width="72" height="12" rx="3" fill="#1e1e24" stroke="#3b82f6" stroke-width="1"/><text x="10" y="24" font-size="6" fill="#3b82f6">Section 2</text><polyline points="68,19 72,23 68,27" fill="none" stroke="#3b82f6" stroke-width="1" transform="rotate(90 70 23)"/></svg>`,
  popover: `<svg viewBox="0 0 80 40" fill="none"><rect x="12" y="6" width="56" height="28" rx="4" fill="#1e1e24" stroke="#444" stroke-width="1"/><polygon points="28,34 34,40 40,34" fill="#1e1e24" stroke="#444" stroke-width="1" stroke-linejoin="round"/><rect x="18" y="12" width="32" height="3" rx="1" fill="#888"/><rect x="18" y="20" width="44" height="2" rx="1" fill="#555"/><rect x="18" y="26" width="28" height="2" rx="1" fill="#555"/></svg>`,
  form: `<svg viewBox="0 0 80 40" fill="none"><text x="4" y="8" font-size="5" font-weight="600" fill="#888">Name</text><rect x="4" y="10" width="72" height="8" rx="2" fill="none" stroke="#555" stroke-width="1"/><text x="4" y="26" font-size="5" font-weight="600" fill="#888">Email</text><rect x="4" y="28" width="72" height="8" rx="2" fill="none" stroke="#555" stroke-width="1"/></svg>`,
  calendar: `<svg viewBox="0 0 80 40" fill="none"><rect x="6" y="2" width="68" height="36" rx="3" fill="#1e1e24" stroke="#444" stroke-width="1"/><line x1="6" y1="12" x2="74" y2="12" stroke="#444" stroke-width="1"/><text x="40" y="9" text-anchor="middle" font-size="6" font-weight="600" fill="#ccc">April 2026</text><circle cx="40" cy="24" r="5" fill="#3b82f6"/><text x="40" y="27" text-anchor="middle" font-size="5" fill="white">9</text><text x="20" y="27" text-anchor="middle" font-size="5" fill="#888">7</text><text x="30" y="27" text-anchor="middle" font-size="5" fill="#888">8</text><text x="50" y="27" text-anchor="middle" font-size="5" fill="#888">10</text><text x="60" y="27" text-anchor="middle" font-size="5" fill="#888">11</text></svg>`,
  // Blocks
  "login-form": `<svg viewBox="0 0 80 40" fill="none"><rect x="12" y="2" width="56" height="36" rx="4" fill="#1e1e24" stroke="#333" stroke-width="1"/><rect x="18" y="6" width="32" height="3" rx="1" fill="#888"/><rect x="18" y="12" width="44" height="6" rx="2" fill="none" stroke="#555" stroke-width="1"/><rect x="18" y="22" width="44" height="6" rx="2" fill="none" stroke="#555" stroke-width="1"/><rect x="18" y="32" width="44" height="5" rx="2" fill="#3b82f6"/></svg>`,
  "hero-section": `<svg viewBox="0 0 80 40" fill="none"><rect x="16" y="4" width="48" height="5" rx="1" fill="#ccc"/><rect x="20" y="12" width="40" height="3" rx="1" fill="#666"/><rect x="24" y="18" width="32" height="3" rx="1" fill="#666"/><rect x="28" y="26" width="24" height="8" rx="4" fill="#3b82f6"/></svg>`,
  "nav-bar": `<svg viewBox="0 0 80 40" fill="none"><rect x="2" y="10" width="76" height="20" rx="4" fill="#1e1e24" stroke="#333" stroke-width="1"/><circle cx="14" cy="20" r="4" fill="#3b82f6"/><text x="30" y="22" font-size="6" fill="#888">Home</text><text x="48" y="22" font-size="6" fill="#888">About</text><rect x="62" y="16" width="12" height="8" rx="3" fill="#3b82f6"/></svg>`,
  footer: `<svg viewBox="0 0 80 40" fill="none"><line x1="4" y1="4" x2="76" y2="4" stroke="#444" stroke-width="1"/><rect x="4" y="10" width="20" height="3" rx="1" fill="#888"/><rect x="4" y="16" width="16" height="2" rx="1" fill="#555"/><rect x="4" y="20" width="14" height="2" rx="1" fill="#555"/><rect x="32" y="10" width="20" height="3" rx="1" fill="#888"/><rect x="32" y="16" width="16" height="2" rx="1" fill="#555"/><rect x="32" y="20" width="12" height="2" rx="1" fill="#555"/><rect x="4" y="32" width="40" height="2" rx="1" fill="#444"/></svg>`,
  sidebar: `<svg viewBox="0 0 80 40" fill="none"><rect x="2" y="2" width="24" height="36" rx="3" fill="#1a1a1f" stroke="#333" stroke-width="1"/><rect x="6" y="6" width="16" height="3" rx="1" fill="#888"/><rect x="6" y="14" width="16" height="3" rx="1" fill="#3b82f6"/><rect x="6" y="20" width="16" height="3" rx="1" fill="#444"/><rect x="6" y="26" width="16" height="3" rx="1" fill="#444"/><rect x="30" y="2" width="48" height="36" rx="3" fill="none" stroke="#333" stroke-width="1"/></svg>`,
  dashboard: `<svg viewBox="0 0 80 40" fill="none"><rect x="2" y="2" width="36" height="18" rx="3" fill="#1e1e24" stroke="#333" stroke-width="1"/><rect x="6" y="6" width="12" height="3" rx="1" fill="#888"/><rect x="6" y="12" width="20" height="5" rx="1" fill="#3b82f6"/><rect x="42" y="2" width="36" height="18" rx="3" fill="#1e1e24" stroke="#333" stroke-width="1"/><rect x="46" y="6" width="12" height="3" rx="1" fill="#888"/><rect x="46" y="12" width="20" height="5" rx="1" fill="#22c55e"/><rect x="2" y="22" width="76" height="16" rx="3" fill="#1e1e24" stroke="#333" stroke-width="1"/></svg>`,
  "pricing-table": `<svg viewBox="0 0 80 40" fill="none"><rect x="2" y="2" width="24" height="36" rx="3" fill="#1e1e24" stroke="#333" stroke-width="1"/><rect x="28" y="2" width="24" height="36" rx="3" fill="#1e1e24" stroke="#3b82f6" stroke-width="1.5"/><rect x="54" y="2" width="24" height="36" rx="3" fill="#1e1e24" stroke="#333" stroke-width="1"/><text x="14" y="12" text-anchor="middle" font-size="5" fill="#888">Basic</text><text x="40" y="12" text-anchor="middle" font-size="5" fill="#3b82f6">Pro</text><text x="66" y="12" text-anchor="middle" font-size="5" fill="#888">Team</text><text x="14" y="22" text-anchor="middle" font-size="7" font-weight="700" fill="#ccc">$9</text><text x="40" y="22" text-anchor="middle" font-size="7" font-weight="700" fill="#ccc">$19</text><text x="66" y="22" text-anchor="middle" font-size="7" font-weight="700" fill="#ccc">$49</text></svg>`,
};

/** Get a thumbnail SVG for a component/block, or a generic fallback. */
function getThumbnail(name: string): string {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  const aliases: Record<string, string> = {
    "dropdown-menu": "dropdown",
  };
  if (THUMBNAILS[key]) return THUMBNAILS[key];
  if (aliases[key] && THUMBNAILS[aliases[key]]) return THUMBNAILS[aliases[key]];
  // Generic component icon
  return `<svg viewBox="0 0 80 40" fill="none"><rect x="16" y="6" width="48" height="28" rx="4" fill="#1e1e24" stroke="#444" stroke-width="1" stroke-dasharray="4 2"/><text x="40" y="24" text-anchor="middle" font-size="7" fill="#666">&lt;${name.split(" ")[0]} /&gt;</text></svg>`;
}

function getItemKey(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
function fitPreviewNode(container: HTMLElement, previewNode: HTMLElement): void {
  requestAnimationFrame(() => {
    const width = previewNode.offsetWidth || 1;
    const height = previewNode.offsetHeight || 1;
    const availableWidth = Math.max(1, container.clientWidth - 12);
    const availableHeight = Math.max(1, container.clientHeight - 12);
    const scale = Math.min(1, availableWidth / width, availableHeight / height);
    previewNode.style.transform = `scale(${scale})`;
  });
}

function createPreviewContent(item: PaletteItem): HTMLElement {
  const key = item.registryName || getItemKey(item.name);
  const hasBuilder = hasPalettePreviewBuilder(key);
  if (item.type === "component" && hasBuilder) {
    const wrapper = document.createElement("div");
    wrapper.className = "palette-card-preview-dom";
    const previewNode = createPalettePreviewElement(key);
    previewNode.style.transformOrigin = "center center";
    previewNode.style.pointerEvents = "none";
    wrapper.appendChild(previewNode);
    fitPreviewNode(wrapper, previewNode);
    return wrapper;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "palette-card-preview-thumb";
  wrapper.innerHTML = getThumbnail(key);
  return wrapper;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const PANEL_STYLES = `
  .palette-panel {
    position: fixed;
    right: 12px;
    top: 12px;
    height: calc(100vh - 24px);
    width: ${DEFAULT_WIDTH}px;
    background:
      linear-gradient(180deg, ${COLORS.glassPanelStrong} 0%, ${COLORS.glassPanel} 100%);
    border: 1px solid ${COLORS.glassPanelBorder};
    border-radius: 22px;
    box-shadow: ${SHADOWS.glass};
    backdrop-filter: blur(24px) saturate(1.15);
    -webkit-backdrop-filter: blur(24px) saturate(1.15);
    z-index: 2147483644;
    font-family: ${FONT_FAMILY};
    display: flex;
    flex-direction: column;
    user-select: none;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateX(24px);
    transition: opacity 150ms ease, transform 150ms ease, visibility 0s linear 150ms;
  }
  .palette-panel.visible {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(0);
    transition: opacity 150ms ease, transform 150ms ease, visibility 0s linear 0s;
  }
  .palette-header {
    padding: 14px 14px 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.16) 100%);
  }
  .palette-header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .palette-title {
    font-size: 12px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 4px;
  }
  .palette-close {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    color: ${COLORS.textTertiary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${RADII.sm};
  }
  .palette-close:hover {
    background: rgba(255,255,255,0.72);
    color: ${COLORS.textPrimary};
  }
  .palette-search {
    width: 100%;
    height: 34px;
    background: rgba(255,255,255,0.62);
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: ${RADII.md};
    padding: 0 12px;
    font-size: 12px;
    font-family: ${FONT_FAMILY};
    color: ${COLORS.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${TRANSITIONS.fast};
  }
  .palette-search::placeholder {
    color: ${COLORS.textTertiary};
  }
  .palette-search:focus {
    border-color: ${COLORS.accent};
    background: rgba(255,255,255,0.92);
    box-shadow: 0 0 0 4px ${COLORS.focusRing};
  }
  .palette-tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid rgba(15,23,42,0.06);
    padding: 2px 0 10px;
  }
  .palette-tab {
    flex: 1;
    height: 30px;
    background: rgba(255,255,255,0.34);
    border: 1px solid transparent;
    border-radius: ${RADII.md};
    color: ${COLORS.textSecondary};
    font-size: 12px;
    font-family: ${FONT_FAMILY};
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    transition: color ${TRANSITIONS.fast}, border-color ${TRANSITIONS.fast}, background ${TRANSITIONS.fast}, box-shadow ${TRANSITIONS.fast};
  }
  .palette-tab:hover {
    color: ${COLORS.textPrimary};
    background: rgba(255,255,255,0.56);
  }
  .palette-tab.active {
    color: ${COLORS.accentHover};
    background: rgba(255,255,255,0.92);
    border-color: ${COLORS.accentMedium};
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.72), 0 0 0 1px ${COLORS.accentSoft};
    font-weight: 600;
  }
  .palette-position-picker {
    display: flex;
    gap: 4px;
    padding: 10px 14px;
    border-bottom: 1px solid rgba(15,23,42,0.06);
    flex-shrink: 0;
    background: rgba(255,255,255,0.18);
  }
  .palette-pos-btn {
    flex: 1;
    height: 28px;
    background: rgba(255,255,255,0.44);
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: ${RADII.md};
    color: ${COLORS.textSecondary};
    font-size: 10px;
    font-family: ${FONT_FAMILY};
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast}, border-color ${TRANSITIONS.fast};
  }
  .palette-pos-btn:hover {
    color: ${COLORS.textPrimary};
    background: rgba(255,255,255,0.72);
  }
  .palette-pos-btn:active {
    transform: scale(0.95);
  }
  .palette-pos-btn.active {
    background: rgba(255,255,255,0.92);
    border-color: ${COLORS.accentMedium};
    color: ${COLORS.accentHover};
    box-shadow: 0 0 0 1px ${COLORS.accentSoft};
    font-weight: 600;
  }
  .palette-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px 0 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.26) 100%);
  }
  .palette-content::-webkit-scrollbar {
    width: 4px;
  }
  .palette-content::-webkit-scrollbar-track {
    background: transparent;
  }
  .palette-content::-webkit-scrollbar-thumb {
    background: rgba(15,23,42,0.14);
    border-radius: 2px;
  }
  .palette-category-header {
    font-size: 10px;
    font-weight: 600;
    color: ${COLORS.textTertiary};
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 12px 14px 8px;
  }
  /* Grid layout for component cards */
  .palette-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 0 14px 6px;
  }
  .palette-card {
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: ${RADII.md};
    background: rgba(255,255,255,0.62);
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.55);
    transition: border-color 120ms ease, background 120ms ease, box-shadow 120ms ease, transform 120ms ease;
  }
  .palette-card:hover {
    border-color: rgba(15,23,42,0.12);
    background: rgba(255,255,255,0.86);
    box-shadow: 0 12px 28px rgba(15,23,42,0.1), inset 0 1px 0 rgba(255,255,255,0.65);
  }
  .palette-card:active {
    transform: scale(0.98);
  }
  .palette-card-preview {
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    overflow: hidden;
    background: linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(246,247,249,0.94) 100%);
  }
  .palette-card-preview svg {
    width: 100%;
    height: 100%;
  }
  .palette-card-preview-thumb {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .palette-card-preview-thumb svg {
    width: 100%;
    height: 100%;
  }
  .palette-card-preview-dom {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .palette-card-name {
    font-size: 11px;
    color: ${COLORS.textSecondary};
    padding: 8px 8px 9px;
    border-top: 1px solid rgba(15,23,42,0.06);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-weight: 500;
  }
  .palette-card:hover .palette-card-name {
    color: ${COLORS.textPrimary};
  }
  /* Variant drawer within card */
  .palette-card-variants {
    display: none;
    border-top: 1px solid rgba(15,23,42,0.06);
    background: rgba(255,255,255,0.88);
  }
  .palette-card-variants.open {
    display: block;
  }
  .palette-variant-item {
    display: flex;
    align-items: center;
    padding: 4px 8px;
    cursor: pointer;
    transition: background ${TRANSITIONS.fast};
    gap: 4px;
  }
  .palette-variant-item:hover {
    background: rgba(255,255,255,0.74);
  }
  .palette-variant-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${COLORS.textTertiary};
    flex-shrink: 0;
  }
  .palette-variant-name {
    font-size: 9px;
    color: ${COLORS.textSecondary};
  }
  .palette-variant-item:hover .palette-variant-name {
    color: ${COLORS.textPrimary};
  }
  .palette-empty {
    padding: 24px 16px;
    text-align: center;
    font-size: 12px;
    color: ${COLORS.textTertiary};
  }
  .palette-loading {
    padding: 24px 16px;
    text-align: center;
    font-size: 12px;
    color: ${COLORS.textTertiary};
  }
`;

function loadPanelWidth(): number {
  try {
    const stored = localStorage.getItem(PANEL_STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!Number.isNaN(parsed) && parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
        return parsed;
      }
    }
  } catch {
    // ignore localStorage failures
  }
  return DEFAULT_WIDTH;
}

// ---------------------------------------------------------------------------
// Default items (fallback when registry is empty)
// ---------------------------------------------------------------------------

const DEFAULT_COMPONENT_ITEMS: PaletteItem[] = [
  { name: "Button", registryName: "button", category: "Inputs", type: "component" },
  { name: "Input", registryName: "input", category: "Inputs", type: "component" },
  { name: "Textarea", registryName: "textarea", category: "Inputs", type: "component" },
  { name: "Select", registryName: "select", category: "Inputs", type: "component" },
  { name: "Checkbox", registryName: "checkbox", category: "Inputs", type: "component" },
  { name: "Switch", registryName: "switch", category: "Inputs", type: "component" },
  { name: "Slider", registryName: "slider", category: "Inputs", type: "component" },
  { name: "Label", registryName: "label", category: "Inputs", type: "component" },
  { name: "Calendar", registryName: "calendar", category: "Inputs", type: "component" },
  { name: "Form", registryName: "form", category: "Inputs", type: "component" },
  { name: "Card", registryName: "card", category: "Display", type: "component" },
  { name: "Badge", registryName: "badge", category: "Display", type: "component" },
  { name: "Avatar", registryName: "avatar", category: "Display", type: "component" },
  { name: "Skeleton", registryName: "skeleton", category: "Display", type: "component" },
  { name: "Table", registryName: "table", category: "Data", type: "component" },
  { name: "Tabs", registryName: "tabs", category: "Navigation", type: "component" },
  { name: "Accordion", registryName: "accordion", category: "Display", type: "component" },
  { name: "Separator", registryName: "separator", category: "Layout", type: "component" },
  { name: "Alert", registryName: "alert", category: "Feedback", type: "component" },
  { name: "Toast", registryName: "toast", category: "Feedback", type: "component" },
  { name: "Dialog", registryName: "dialog", category: "Feedback", type: "component" },
  { name: "Progress", registryName: "progress", category: "Feedback", type: "component" },
  { name: "Popover", registryName: "popover", category: "Display", type: "component" },
  { name: "Dropdown", registryName: "dropdown-menu", category: "Navigation", type: "component" },
  { name: "Navigation Menu", registryName: "navigation-menu", category: "Navigation", type: "component" },
];

const DEFAULT_BLOCK_ITEMS: PaletteItem[] = [
  { name: "Login Form", registryName: "login-form", category: "Authentication", type: "block" },
  { name: "Hero Section", registryName: "hero-section", category: "Marketing", type: "block" },
  { name: "Nav Bar", registryName: "nav-bar", category: "Navigation", type: "block" },
  { name: "Footer", registryName: "footer", category: "Navigation", type: "block" },
  { name: "Sidebar", registryName: "sidebar", category: "Dashboard", type: "block" },
  { name: "Dashboard", registryName: "dashboard", category: "Dashboard", type: "block" },
  { name: "Pricing Table", registryName: "pricing-table", category: "Marketing", type: "block" },
];

// ---------------------------------------------------------------------------
// Public factory
// ---------------------------------------------------------------------------

export function createPalettePanel(
  shadowRoot: ShadowRoot,
  callbacks: PaletteCallbacks,
): {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  isVisible: () => boolean;
  getInsertPosition: () => InsertPosition;
} {
  const style = document.createElement("style");
  style.textContent = PANEL_STYLES;
  shadowRoot.appendChild(style);

  const panel = document.createElement("div");
  panel.className = "palette-panel";
  panel.style.width = `${loadPanelWidth()}px`;
  shadowRoot.appendChild(panel);

  panel.addEventListener("pointerdown", (e) => e.stopPropagation());
  panel.addEventListener("mousedown", (e) => e.stopPropagation());
  panel.addEventListener("click", (e) => e.stopPropagation());

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  let visible = false;
  let activeTab: "components" | "blocks" = "components";
  let searchQuery = "";
  let insertPosition: InsertPosition = "inside";
  let allComponents: PaletteItem[] = DEFAULT_COMPONENT_ITEMS;
  let allBlocks: PaletteItem[] = DEFAULT_BLOCK_ITEMS;
  let registryLoaded = false;

  // ---------------------------------------------------------------------------
  // Header
  // ---------------------------------------------------------------------------

  const header = document.createElement("div");
  header.className = "palette-header";

  const headerTop = document.createElement("div");
  headerTop.className = "palette-header-top";

  const titleEl = document.createElement("div");
  titleEl.className = "palette-title";
  titleEl.textContent = "Components";

  const closeBtn = document.createElement("button");
  closeBtn.className = "palette-close";
  closeBtn.title = "Close components";
  closeBtn.setAttribute("aria-label", "Close components");
  closeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 3l6 6"/><path d="M9 3 3 9"/></svg>`;

  headerTop.appendChild(titleEl);
  headerTop.appendChild(closeBtn);
  header.appendChild(headerTop);

  let searchDebounce: ReturnType<typeof setTimeout> | null = null;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "palette-search";
  searchInput.placeholder = "Search...";
  searchInput.addEventListener("input", () => {
    if (searchDebounce) clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchQuery = searchInput.value.trim().toLowerCase();
      renderContent();
    }, 80);
  });
  searchInput.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      searchInput.value = "";
      searchQuery = "";
      renderContent();
      searchInput.blur();
    }
  });
  header.appendChild(searchInput);

  const tabsEl = document.createElement("div");
  tabsEl.className = "palette-tabs";

  const tabComponents = document.createElement("button");
  tabComponents.className = "palette-tab active";
  tabComponents.textContent = "Components";
  tabComponents.addEventListener("click", () => setTab("components"));

  const tabBlocks = document.createElement("button");
  tabBlocks.className = "palette-tab";
  tabBlocks.textContent = "Blocks";
  tabBlocks.addEventListener("click", () => setTab("blocks"));

  tabsEl.appendChild(tabComponents);
  tabsEl.appendChild(tabBlocks);
  header.appendChild(tabsEl);
  panel.appendChild(header);

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hide();
  });

  // Position picker
  const positionPicker = document.createElement("div");
  positionPicker.className = "palette-position-picker";

  const positions: Array<{ key: InsertPosition; label: string }> = [
    { key: "before", label: "Before" },
    { key: "inside", label: "Inside" },
    { key: "after", label: "After" },
  ];

  const posButtons: Map<InsertPosition, HTMLButtonElement> = new Map();
  for (const pos of positions) {
    const btn = document.createElement("button");
    btn.className = `palette-pos-btn${pos.key === "inside" ? " active" : ""}`;
    btn.textContent = pos.label;
    btn.addEventListener("click", () => {
      insertPosition = pos.key;
      for (const [k, b] of posButtons) {
        b.classList.toggle("active", k === pos.key);
      }
    });
    posButtons.set(pos.key, btn);
    positionPicker.appendChild(btn);
  }
  panel.appendChild(positionPicker);

  // Content area
  const contentEl = document.createElement("div");
  contentEl.className = "palette-content";
  panel.appendChild(contentEl);

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  function setTab(tab: "components" | "blocks"): void {
    activeTab = tab;
    tabComponents.classList.toggle("active", tab === "components");
    tabBlocks.classList.toggle("active", tab === "blocks");
    renderContent();
  }

  function renderContent(): void {
    const fragment = document.createDocumentFragment();

    const items = activeTab === "components" ? allComponents : allBlocks;
    const filtered = searchQuery
      ? items.filter((item) => item.name.toLowerCase().includes(searchQuery))
      : items;

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "palette-empty";
      empty.textContent = searchQuery ? `No results for "${searchQuery}"` : "No items available";
      fragment.appendChild(empty);
    } else {
      // Group by category
      const categories = new Map<string, PaletteItem[]>();
      for (const item of filtered) {
        if (!categories.has(item.category)) categories.set(item.category, []);
        categories.get(item.category)!.push(item);
      }

      for (const [category, categoryItems] of categories) {
        const catHeader = document.createElement("div");
        catHeader.className = "palette-category-header";
        catHeader.textContent = category;
        fragment.appendChild(catHeader);

        const grid = document.createElement("div");
        grid.className = "palette-grid";

        for (const item of categoryItems) {
          renderCard(grid, item);
        }

        fragment.appendChild(grid);
      }
    }

    // Single DOM swap — no flicker
    contentEl.innerHTML = "";
    contentEl.appendChild(fragment);
  }

  function renderCard(grid: HTMLElement, item: PaletteItem): void {
    const itemKey = item.registryName;
    const variants = activeTab === "components" ? COMPONENT_VARIANTS[itemKey] : undefined;
    const hasVariants = !!variants && variants.length > 0;

    const card = document.createElement("div");
    card.className = "palette-card";

    // Thumbnail preview
    const preview = document.createElement("div");
    preview.className = "palette-card-preview";
    preview.appendChild(createPreviewContent(item));
    card.appendChild(preview);

    // Name label
    const nameEl = document.createElement("div");
    nameEl.className = "palette-card-name";
    nameEl.textContent = item.name;
    card.appendChild(nameEl);

    if (hasVariants) {
      // Variants drawer
      const variantsEl = document.createElement("div");
      variantsEl.className = "palette-card-variants";

      for (const variant of variants!) {
        const variantEl = document.createElement("div");
        variantEl.className = "palette-variant-item";

        const dot = document.createElement("span");
        dot.className = "palette-variant-dot";
        variantEl.appendChild(dot);

        const variantName = document.createElement("span");
        variantName.className = "palette-variant-name";
        variantName.textContent = variant.name;
        variantEl.appendChild(variantName);

        variantEl.addEventListener("click", (e) => {
          e.stopPropagation();
          callbacks.onInsert(item, variant);
        });

        variantsEl.appendChild(variantEl);
      }

      card.appendChild(variantsEl);

      // Click card to toggle variants
      card.addEventListener("click", () => {
        const isOpen = variantsEl.classList.contains("open");
        // Close all other variant drawers
        grid.querySelectorAll(".palette-card-variants.open").forEach((el) => {
          if (el !== variantsEl) el.classList.remove("open");
        });
        variantsEl.classList.toggle("open", !isOpen);
      });
    } else {
      // No variants — click to insert directly
      card.addEventListener("click", () => {
        callbacks.onInsert(item, undefined);
      });
    }

    grid.appendChild(card);
  }

  // ---------------------------------------------------------------------------
  // Registry loading
  // ---------------------------------------------------------------------------

  async function loadRegistry(): Promise<void> {
    if (registryLoaded) return;
    try {
      const registry = await requestComponentRegistry();
      if (registry.components && registry.components.length > 0) {
        allComponents = registry.components.map((c: any) => ({
          name: c.displayName ?? c.name ?? String(c),
          registryName: c.name ?? getItemKey(c.displayName ?? String(c)),
          category: c.category ?? "Components",
          type: "component" as const,
          props: c.props,
        }));
      }
      if (registry.blocks && registry.blocks.length > 0) {
        allBlocks = registry.blocks.map((b: any) => ({
          name: b.displayName ?? b.name ?? String(b),
          registryName: b.name ?? getItemKey(b.displayName ?? String(b)),
          category: b.category ?? "Blocks",
          type: "block" as const,
        }));
      }
      registryLoaded = true;
      renderContent();
    } catch {
      registryLoaded = true;
    }
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  function show(): void {
    if (visible) return;
    visible = true;
    invalidateThemeCache();
    panel.style.width = `${loadPanelWidth()}px`;
    panel.classList.add("visible");
    renderContent();
    loadRegistry();
  }

  function hide(): void {
    if (!visible) return;
    visible = false;
    if (searchDebounce) {
      clearTimeout(searchDebounce);
      searchDebounce = null;
    }
    searchInput.blur();
    panel.classList.remove("visible");
  }

  function toggle(): void {
    if (visible) hide();
    else show();
  }

  return {
    show,
    hide,
    toggle,
    isVisible: () => visible,
    getInsertPosition: () => insertPosition,
  };
}
