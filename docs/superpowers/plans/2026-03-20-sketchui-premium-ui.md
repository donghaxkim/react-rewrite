# SketchUI Premium UI Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the dark-themed functional prototype into a premium, minimalistic, Figma-inspired light-themed overlay UI.

**Architecture:** All UI lives in a Shadow DOM attached to `#sketch-ui-root`. Design tokens are centralized in a new `design-tokens.ts` module. The Inter font is bundled as base64 woff2 inside the Shadow DOM styles. Each existing file is restyled in-place — no structural changes to the module graph except five new files (`design-tokens.ts`, `fonts/inter.ts`, `utils/color-math.ts`, `color-picker.ts`, `onboarding.ts`).

**Tech Stack:** Vanilla TypeScript, Shadow DOM, inline SVG icons, CSS-in-JS via template literals, HSV↔RGB color math for custom picker, vitest for color math unit tests.

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `packages/overlay/src/fonts/inter.ts` | Base64-encoded Inter woff2 font data (weights 400 + 600). Isolated to keep design-tokens.ts readable (~200KB of base64 text). |
| `packages/overlay/src/design-tokens.ts` | All color, shadow, radius, transition, and font constants. Imports font data from `fonts/inter.ts`. Shared `@font-face` + CSS custom properties block. Cursor SVG generators. |
| `packages/overlay/src/utils/color-math.ts` | Pure `hexToHsv` and `hsvToHex` conversion functions. Extracted for independent unit testing. |
| `packages/overlay/src/color-picker.ts` | Custom color picker popup: gradient area (saturation/brightness canvas), hue strip, hex input, preset swatches, Fill/Text segmented toggle. Rendered in Shadow DOM. |
| `packages/overlay/src/onboarding.ts` | First-launch hint card: localStorage persistence, render near tools panel, auto-dismiss after 5s or on tool interaction. |

### Modified Files

| File | Summary of Changes |
|------|-------------------|
| `toolbar.ts` | Complete restyle as action bar: light theme, reordered items (Eye → Undo → Generate → Close), SVG icons for all buttons, spinner/checkmark states for undo, Inter font injection via design tokens. Remove mode label and component-info span. |
| `selection.ts` | Light accent overlays, thinner borders (1.5px), corner-radius matching from computed style, contextual selection label (floats near element with flip/clamp logic), loading dots for async resolve, solid marquee border. Remove `updateComponentInfo` calls (replaced by contextual label). |
| `tools-panel.ts` | Complete restyle as floating pill: light theme, grouped dividers, segmented controls for sub-options, tooltip delay system, trash icon for Clear All. |
| `interaction.ts` | Full-viewport layout (`left: 0; width: 100vw`), custom SVG cursor system per tool, dynamic draw cursor cached on brush size change. |
| `ghost-layer.ts` | Shadow management: `--shadow-lg` while dragging, `--shadow-sm` on drop with 200ms transition, `opacity: 0.9` during drag. |
| `annotation-layer.ts` | Light-themed text annotations (white bg, dark text, border, shadow). |
| `tools/text.ts` | Light-themed text input (white bg, accent border). |
| `tools/lasso.ts` | Accent color stroke/fill, solid stroke (remove dash), accent-colored selection borders. |
| `tools/draw.ts` | No code changes (cursor handled by interaction.ts). |
| `tools/color.ts` | Replace native `<input type="color">` with custom color picker from `color-picker.ts`. |
| `tools/move.ts` | Ghost shadow transitions on drag start/drop (delegate to ghost-layer helpers). |
| `index.ts` | Wire onboarding, keyboard shortcut flash on tool buttons, remove `updateModeLabel` and `TOOL_LABELS`. |

---

## Task 1: Design Tokens Module

**Files:**
- Create: `packages/overlay/src/fonts/inter.ts`
- Create: `packages/overlay/src/design-tokens.ts`

This is the foundation everything else depends on. All color, shadow, radius, transition, and font values in one place. Font data lives in a separate file to keep tokens readable.

- [ ] **Step 1: Download and encode Inter font files**

```bash
cd /tmp
curl -L "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" -o Inter-Regular.woff2
curl -L "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2" -o Inter-SemiBold.woff2
base64 -i Inter-Regular.woff2 | tr -d '\n' > inter-regular.b64
base64 -i Inter-SemiBold.woff2 | tr -d '\n' > inter-semibold.b64
```

- [ ] **Step 2: Create fonts/inter.ts with base64 data**

```typescript
// packages/overlay/src/fonts/inter.ts
// Inter font (woff2) — weights 400 and 600, base64-encoded for offline reliability.
// ~100KB per weight. Isolated from design-tokens.ts to keep that file readable.

export const INTER_REGULAR_BASE64 = "..."; // Paste content of inter-regular.b64
export const INTER_SEMIBOLD_BASE64 = "..."; // Paste content of inter-semibold.b64
```

- [ ] **Step 3: Create design-tokens.ts with all token constants**

```typescript
// packages/overlay/src/design-tokens.ts
import { INTER_REGULAR_BASE64, INTER_SEMIBOLD_BASE64 } from "./fonts/inter.js";

// --- Colors ---
export const COLORS = {
  bgPrimary: "#ffffff",
  bgSecondary: "#f7f7f8",
  bgTertiary: "#efefef",
  border: "rgba(0,0,0,0.08)",
  borderStrong: "rgba(0,0,0,0.15)",
  textPrimary: "#1a1a1a",
  textSecondary: "#6b6b6b",
  textTertiary: "#9b9b9b",
  accent: "#a259ff",
  accentHover: "#8b3ee0",
  accentSoft: "rgba(162,89,255,0.08)",
  accentMedium: "rgba(162,89,255,0.15)",
  danger: "#e5484d",
  dangerSoft: "rgba(229,72,77,0.08)",
} as const;

// --- Shadows ---
export const SHADOWS = {
  sm: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
  md: "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
  lg: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
} as const;

// --- Border Radius ---
export const RADII = {
  sm: "6px",
  md: "10px",
  lg: "14px",
} as const;

// --- Transitions ---
export const TRANSITIONS = {
  fast: "100ms ease",      // color/opacity hover
  medium: "150ms ease",    // fade in/out panels
  settle: "200ms ease",    // ghost shadow on drop, panel entrance
} as const;

// --- Typography ---
export const FONT_FAMILY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const FONT_FACE_CSS = `
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(data:font/woff2;base64,${INTER_REGULAR_BASE64}) format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(data:font/woff2;base64,${INTER_SEMIBOLD_BASE64}) format('woff2');
  }
`;

// --- Cursor SVG Generators ---

/** Move tool cursor: crosshair with arrows, accent colored */
export function moveCursorSvg(): string {
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${COLORS.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`;
}

/** Draw tool cursor: circle matching brush size */
let cachedDrawCursor: { size: number; uri: string } | null = null;

export function drawCursorSvg(brushSize: number): string {
  if (cachedDrawCursor && cachedDrawCursor.size === brushSize) {
    return cachedDrawCursor.uri;
  }
  const r = Math.max(brushSize, 2);
  const svgSize = r * 2 + 4;
  const center = svgSize / 2;
  const uri = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${svgSize}' height='${svgSize}'><circle cx='${center}' cy='${center}' r='${r}' fill='none' stroke='${COLORS.accent}' stroke-width='1.5'/></svg>`)}") ${center} ${center}, crosshair`;
  cachedDrawCursor = { size: brushSize, uri };
  return uri;
}

/** Color tool cursor: eyedropper */
export function colorCursorSvg(): string {
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${COLORS.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M2 22l1-1h3l9-9'/><path d='M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7'/><path d='M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14'/><path d='m9 7 6 6'/><path d='M20 2a2.83 2.83 0 0 1 0 4L16 10'/></svg>`)}") 2 22, pointer`;
}

/** Lasso tool cursor: small crosshair dot */
export function lassoCursorSvg(): string {
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><line x1='8' y1='2' x2='8' y2='14' stroke='${COLORS.accent}' stroke-width='1'/><line x1='2' y1='8' x2='14' y2='8' stroke='${COLORS.accent}' stroke-width='1'/></svg>`)}") 8 8, crosshair`;
}
```

- [ ] **Step 4: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

Expected: Clean build, no errors. The new files are not imported anywhere yet — just need to compile.

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/fonts/inter.ts packages/overlay/src/design-tokens.ts
git commit -m "feat(overlay): add design tokens module with colors, shadows, fonts, cursors"
```

---

## Task 2: Interaction Layer — Full Viewport + Cursor System

**Files:**
- Modify: `packages/overlay/src/interaction.ts`

The interaction layer currently offsets `left: 48px` for the old full-height sidebar. With the floating pill, it becomes full-viewport. Also adds the custom SVG cursor system.

- [ ] **Step 1: Update interaction layer to full viewport and add cursor system**

Replace the entire `packages/overlay/src/interaction.ts`:

```typescript
// packages/overlay/src/interaction.ts
import { getActiveTool, getToolOptions } from "./canvas-state.js";
import { moveCursorSvg, drawCursorSvg, colorCursorSvg, lassoCursorSvg } from "./design-tokens.js";

export type ToolEventHandler = {
  onMouseDown?: (e: MouseEvent) => void | Promise<void>;
  onMouseMove?: (e: MouseEvent) => void;
  onMouseUp?: (e: MouseEvent) => void | Promise<void>;
};

let interactionEl: HTMLDivElement | null = null;
let activeHandler: ToolEventHandler | null = null;
let toolHandlers: Map<string, ToolEventHandler> = new Map();

export function registerToolHandler(tool: string, handler: ToolEventHandler): void {
  toolHandlers.set(tool, handler);
}

export function initInteraction(): void {
  interactionEl = document.createElement("div");
  interactionEl.setAttribute("data-sketch-ui-interaction", "true");
  interactionEl.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483646;
    pointer-events: none;
  `;

  document.body.appendChild(interactionEl);

  interactionEl.addEventListener("mousedown", (e) => {
    activeHandler?.onMouseDown?.(e);
  });
  interactionEl.addEventListener("mousemove", (e) => {
    activeHandler?.onMouseMove?.(e);
  });
  interactionEl.addEventListener("mouseup", (e) => {
    activeHandler?.onMouseUp?.(e);
  });
}

export function activateInteraction(tool: string): void {
  activeHandler = toolHandlers.get(tool) || null;
  if (interactionEl) {
    interactionEl.style.pointerEvents = tool === "pointer" ? "none" : "auto";
  }
  updateCursor(tool);
}

function updateCursor(tool: string): void {
  if (!interactionEl) return;
  switch (tool) {
    case "pointer": interactionEl.style.cursor = "default"; break;
    case "grab": interactionEl.style.cursor = "grab"; break;
    case "move": interactionEl.style.cursor = moveCursorSvg(); break;
    case "draw": interactionEl.style.cursor = drawCursorSvg(getToolOptions().brushSize); break;
    case "color": interactionEl.style.cursor = colorCursorSvg(); break;
    case "text": interactionEl.style.cursor = "text"; break;
    case "lasso": interactionEl.style.cursor = lassoCursorSvg(); break;
    default: interactionEl.style.cursor = "default";
  }
}

/** Call when brush size changes to update the draw cursor */
export function refreshDrawCursor(): void {
  if (getActiveTool() === "draw" && interactionEl) {
    interactionEl.style.cursor = drawCursorSvg(getToolOptions().brushSize);
  }
}

export function setInteractionCursor(cursor: string): void {
  if (interactionEl) interactionEl.style.cursor = cursor;
}

export function destroyInteraction(): void {
  interactionEl?.remove();
  interactionEl = null;
  activeHandler = null;
  toolHandlers.clear();
}
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

Expected: Clean build. `interaction.ts` now imports from `design-tokens.ts`.

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/interaction.ts
git commit -m "feat(overlay): full-viewport interaction layer with custom SVG cursors"
```

---

## Task 3: Action Bar (toolbar.ts restyle)

**Files:**
- Modify: `packages/overlay/src/toolbar.ts`

Complete restyle from dark theme to light premium action bar. Reordered items: Eye → Undo Reorder → Generate → Close. Remove mode label and component-info span (mode is implicit from tools panel, component info moves to contextual selection label in Task 4). Add Inter font injection. Add spinner/checkmark states for undo.

- [ ] **Step 1: Rewrite toolbar.ts with light theme**

Replace `TOOLBAR_STYLES` (lines 17–123) with:

```typescript
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
```

- [ ] **Step 2: Update toolbar.innerHTML and element references**

Replace the `toolbar.innerHTML` block (lines 138–146) and surrounding logic. The new layout is: Eye → Divider → Undo → Divider → Generate → Close. Remove `mode` span and `component-info` span entirely.

```typescript
toolbar.innerHTML = `
  <button class="icon-btn eye-btn" title="Toggle originals (.)">
    ${EYE_OPEN_SVG}
  </button>
  <span class="divider"></span>
  <button class="icon-btn undo-btn" disabled title="Undo Reorder">
    ${UNDO_SVG}
  </button>
  <span class="divider"></span>
  <button class="generate-btn" disabled>Generate</button>
  <button class="icon-btn close-btn" title="Close SketchUI">
    ${CLOSE_SVG}
  </button>
`;
```

Add new SVG constants near the top (after existing EYE_OPEN_SVG/EYE_CLOSED_SVG):

```typescript
const UNDO_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>`;
const CLOSE_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const CHECK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
```

- [ ] **Step 3: Add import for design tokens at top of file**

```typescript
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY, FONT_FACE_CSS } from "./design-tokens.js";
```

- [ ] **Step 4: Remove `componentInfoEl`, `updateComponentInfo`, `showError`, `updateModeLabel`**

Remove the `componentInfoEl` variable, `updateComponentInfo()`, `showError()`, and `updateModeLabel()` exports. The contextual selection label (Task 4, immediately next) replaces `updateComponentInfo`. Redirect `showError` to `showToast`:

```typescript
export function showError(message: string): void {
  showToast(message);
}
```

Remove `componentInfoEl` from `mountToolbar()`, `destroyToolbar()`, and the `devServerDisconnected`/`devServerReconnected` message handlers (replace `updateComponentInfo` calls in those handlers with `showToast` or remove).

- [ ] **Step 5: Add spinner/checkmark states to undo button**

In the `reorderComplete` message handler, before enabling the undo button, briefly show a checkmark:

```typescript
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
  }
  break;
```

When undo is clicked, show spinner while waiting:

```typescript
undoBtn!.addEventListener("click", () => {
  send({ type: "undo" });
  if (undoBtn) {
    undoBtn.innerHTML = `<div class="spinner"></div>`;
    undoBtn.disabled = true;
  }
});
```

On `undoComplete`, restore the undo icon:

```typescript
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
  }
  break;
```

- [ ] **Step 6: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

Expected: Build will have errors in `selection.ts` and `index.ts` from removed `updateComponentInfo`/`updateModeLabel` — that's expected. Task 4 (immediately next) fixes `selection.ts`, and Task 11 cleans up `index.ts`. If you need a green build at this checkpoint, temporarily comment out the broken call sites.

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/toolbar.ts
git commit -m "feat(overlay): restyle action bar with light theme, spinner states, SVG icons"
```

---

## Task 4: Selection Overlays + Contextual Label

**Files:**
- Modify: `packages/overlay/src/selection.ts`

Restyle overlays to light accent theme. Add contextual selection label that floats near the element (replaces the `updateComponentInfo` removed in Task 3). Add corner-radius matching. Add loading dots for async resolve.

- [ ] **Step 1: Update OVERLAY_STYLES with light theme**

Replace `OVERLAY_STYLES` (lines 149–188):

```typescript
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";

const OVERLAY_STYLES = `
  .hover-overlay {
    position: fixed;
    pointer-events: none;
    border: 1.5px solid ${COLORS.accent};
    background: ${COLORS.accentSoft};
    z-index: 2147483646;
    transition: all ${TRANSITIONS.fast};
    display: none;
  }
  .selection-overlay {
    position: fixed;
    pointer-events: none;
    border: 1.5px solid ${COLORS.accent};
    background: ${COLORS.accentMedium};
    z-index: 2147483646;
    display: none;
  }
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.sm};
    border-radius: ${RADII.sm};
    padding: 4px 8px;
    z-index: 2147483646;
    font-family: ${FONT_FAMILY};
    white-space: nowrap;
    display: none;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
  }
  .selection-label.visible {
    opacity: 1;
  }
  .selection-label .comp-name {
    color: ${COLORS.textPrimary};
    font-size: 12px;
    font-weight: 600;
  }
  .selection-label .comp-path {
    color: ${COLORS.textSecondary};
    font-size: 11px;
    margin-left: 8px;
  }
  .selection-label .loading-dots {
    color: ${COLORS.textTertiary};
    font-size: 12px;
  }
  @keyframes dotPulse {
    0%, 80%, 100% { opacity: 0.2; }
    40% { opacity: 1; }
  }
  .selection-label .loading-dots span {
    animation: dotPulse 1.4s infinite;
  }
  .selection-label .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .selection-label .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  .marquee-box {
    position: fixed;
    border: 1px solid ${COLORS.accent};
    background: ${COLORS.accentSoft};
    border-radius: 2px;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`;
```

- [ ] **Step 2: Add corner-radius matching to hover/selection overlays**

Create helper function:

```typescript
function getMatchedBorderRadius(el: HTMLElement): string {
  const computed = getComputedStyle(el).borderRadius;
  if (!computed || computed === "0px") return "4px";
  // Single-value check (all corners equal)
  const parts = computed.split(" ");
  if (parts.length === 1) {
    const px = parseFloat(parts[0]);
    return isNaN(px) ? "4px" : `${px + 2}px`;
  }
  // Multi-value: fall back
  return "4px";
}
```

Apply in the hover highlight code (handleMouseMove idle branch and showHoverHighlightAt):

```typescript
hoverOverlay.style.borderRadius = getMatchedBorderRadius(el);
```

And in showSelectionOverlay:

```typescript
if (selectionOverlay) {
  // ... existing position code ...
  selectionOverlay.style.borderRadius = getMatchedBorderRadius(selectedElement!);
}
```

- [ ] **Step 3: Rewrite showSelectionOverlay with contextual label positioning**

```typescript
function showSelectionOverlay(rect: DOMRect, info: ComponentInfo): void {
  if (selectionOverlay && selectedElement) {
    selectionOverlay.style.display = "block";
    selectionOverlay.style.left = `${rect.left}px`;
    selectionOverlay.style.top = `${rect.top}px`;
    selectionOverlay.style.width = `${rect.width}px`;
    selectionOverlay.style.height = `${rect.height}px`;
    selectionOverlay.style.borderRadius = getMatchedBorderRadius(selectedElement);
  }

  if (selectionLabel) {
    const labelHeight = 28;
    const gap = 8;

    // Default: above element, left-aligned
    let top = rect.top - labelHeight - gap;
    let left = rect.left;

    // Vertical flip if above viewport
    if (top < 0) {
      top = rect.bottom + gap;
    }

    // Horizontal clamp
    selectionLabel.style.left = `${left}px`;
    selectionLabel.style.top = `${top}px`;
    selectionLabel.style.display = "block";
    selectionLabel.style.right = "auto";

    // Show loading state initially
    selectionLabel.innerHTML = `<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>`;
    requestAnimationFrame(() => selectionLabel?.classList.add("visible"));

    // After a frame, check if it overflows right edge
    requestAnimationFrame(() => {
      if (!selectionLabel) return;
      const labelRect = selectionLabel.getBoundingClientRect();
      if (labelRect.right > window.innerWidth - 8) {
        selectionLabel.style.left = "auto";
        selectionLabel.style.right = "8px";
      }
    });
  }
}
```

- [ ] **Step 4: Update selectElement() to populate contextual label**

After resolving the component, update the label content instead of calling `updateComponentInfo`:

```typescript
// In selectElement(), after setting currentSelection:
if (selectionLabel) {
  const pathText = resolved.filePath ? `${resolved.filePath}:${resolved.lineNumber}` : "";
  selectionLabel.innerHTML = `<span class="comp-name">${resolved.componentName}</span>${pathText ? `<span class="comp-path">${pathText}</span>` : ""}`;
}
```

Also show loading dots before the async `resolveComponentFromElement` call:

```typescript
async function selectElement(el: HTMLElement): Promise<void> {
  // Show loading label immediately
  const rect = el.getBoundingClientRect();
  showSelectionOverlay(rect, {} as any); // Shows loading dots

  try {
    const resolved = await resolveComponentFromElement(el);
    // ... rest of existing logic, then update label content ...
  }
}
```

- [ ] **Step 5: Remove all `updateComponentInfo` calls**

Since the contextual label now shows component info:
- Remove `updateComponentInfo(display)` call from `selectElement()`
- Remove `updateComponentInfo(...)` call from `performMarqueeSelect()`
- Remove `updateComponentInfo("No selection")` from `clearSelection()`
- Remove the `import { updateComponentInfo, ... }` from the toolbar import line

This eliminates the broken reference from Task 3 — no stubs needed.

- [ ] **Step 6: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

- [ ] **Step 7: Manual test — hover, select, verify label positioning**

Test: hover shows accent border with corner-radius matching, selection shows contextual label above element, label flips below when near top edge, label clamps when near right edge.

- [ ] **Step 8: Commit**

```bash
git add packages/overlay/src/selection.ts
git commit -m "feat(overlay): light theme overlays with contextual selection label"
```

---

## Task 5: Floating Tools Panel (tools-panel.ts restyle)

**Files:**
- Modify: `packages/overlay/src/tools-panel.ts`

Transform from full-height dark sidebar to floating pill with light theme, grouped dividers, delayed tooltips, segmented controls, and trash icon.

- [ ] **Step 1: Rewrite PANEL_STYLES with light theme**

Replace `PANEL_STYLES` (lines 27–146) with the new light-themed styles. Key changes:
- Floating pill: `left: 16px; top: 50%; transform: translateY(-50%); width: 44px`
- White background, `--shadow-md`, `border-radius: 14px`
- Tool buttons: 32x32, circular hover/active states
- Active tool: `accent-soft` bg + 2px left bar indicator
- Tooltips: 400ms delay, white bg, shadow
- Segmented controls replacing individual size buttons
- Trash icon replacing X character for Clear All

```typescript
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";

// ... (keep existing imports for canvas-state, toolbar)

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
```

- [ ] **Step 2: Update ICONS — replace Clear All emoji with trash SVG**

Add to ICONS object:

```typescript
trash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
```

- [ ] **Step 3: Update initToolsPanel() — add grouped dividers and tooltip delays**

Rewrite the tool button creation loop to insert dividers between groups and add 400ms tooltip hover delay:

```typescript
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
```

- [ ] **Step 4: Update updateSubOptions() — use segmented controls**

Replace individual buttons with segmented control:

```typescript
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
```

- [ ] **Step 5: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

- [ ] **Step 6: Manual test — launch overlay, verify floating pill appearance**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI/test-app && node ../packages/cli/bin/sketch-ui.js
```

Verify: White floating pill centered on left side, grouped dividers, hover tooltips with 400ms delay, segmented controls in draw/text sub-options, trash icon for Clear All.

- [ ] **Step 7: Commit**

```bash
git add packages/overlay/src/tools-panel.ts
git commit -m "feat(overlay): restyle tools panel as floating pill with light theme"
```

---

## Task 6: Lasso + Annotation Layer Restyle

**Files:**
- Modify: `packages/overlay/src/tools/lasso.ts`
- Modify: `packages/overlay/src/annotation-layer.ts`

- [ ] **Step 1: Update lasso.ts — accent colors, solid stroke**

In `lassoHandler.onMouseDown`, update the lasso path attributes (lines 28–31):

```typescript
lassoPath.setAttribute("stroke", COLORS.accent);
lassoPath.setAttribute("stroke-width", "1.5");
// Remove: lassoPath.setAttribute("stroke-dasharray", "4,4");
lassoPath.setAttribute("fill", COLORS.accentSoft);
```

In `showSelectionBorder`, update the border style (line 121):

```typescript
border.style.cssText = `
  position: fixed;
  left: ${rect.left}px;
  top: ${rect.top}px;
  width: ${rect.width}px;
  height: ${rect.height}px;
  border: 1.5px solid ${COLORS.accent};
  pointer-events: none;
  z-index: 2147483645;
`;
```

Add import at top:

```typescript
import { COLORS } from "../design-tokens.js";
```

- [ ] **Step 2: Update annotation-layer.ts — light text annotations**

In `addTextAnnotation` (lines 85–95), change the div styling:

```typescript
div.style.cssText = `
  background: ${COLORS.bgPrimary};
  color: ${COLORS.textPrimary};
  border: 1px solid ${COLORS.border};
  box-shadow: ${SHADOWS.sm};
  padding: 4px 8px;
  border-radius: ${RADII.sm};
  font-size: ${fontSize}px;
  font-family: ${FONT_FAMILY};
  display: inline-block;
  white-space: pre-wrap;
  max-width: 280px;
`;
```

Add import:

```typescript
import { COLORS, SHADOWS, RADII, FONT_FAMILY } from "./design-tokens.js";
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/tools/lasso.ts packages/overlay/src/annotation-layer.ts
git commit -m "feat(overlay): accent-colored lasso and light text annotations"
```

---

## Task 7: Ghost Layer Shadow Management

**Files:**
- Modify: `packages/overlay/src/ghost-layer.ts`
- Modify: `packages/overlay/src/tools/move.ts`

- [ ] **Step 1: Add shadow helpers to ghost-layer.ts**

Add imports and helper functions:

```typescript
import { SHADOWS, TRANSITIONS } from "./design-tokens.js";

/** Apply dragging visual state to a ghost */
export function setGhostDragging(id: string): void {
  const ghost = getGhosts().get(id);
  if (!ghost) return;
  ghost.cloneEl.style.boxShadow = SHADOWS.lg;
  ghost.cloneEl.style.opacity = "0.9";
  ghost.cloneEl.style.transition = `box-shadow ${TRANSITIONS.settle}`;
}

/** Apply settled visual state to a ghost (after drop) */
export function setGhostSettled(id: string): void {
  const ghost = getGhosts().get(id);
  if (!ghost) return;
  ghost.cloneEl.style.boxShadow = SHADOWS.sm;
  ghost.cloneEl.style.opacity = "1";
}
```

Also in `createGhost`, add initial settled shadow:

```typescript
cloneEl.style.boxShadow = SHADOWS.sm;
```

- [ ] **Step 2: Update move.ts — call shadow helpers on drag/drop**

In `onMouseDown`, after setting `isDragging = true`:

```typescript
import { setGhostDragging, setGhostSettled } from "../ghost-layer.js";

// After isDragging = true (both branches — existing ghost and new ghost):
setGhostDragging(dragTarget.id);
```

In `onMouseUp`, before clearing dragTarget:

```typescript
if (isDragging && dragTarget) {
  moveGhost(dragTarget.id, dragTarget.currentPos);
  setGhostSettled(dragTarget.id);
  clearSelection();
}
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/ghost-layer.ts packages/overlay/src/tools/move.ts
git commit -m "feat(overlay): ghost shadow transitions on drag and drop"
```

---

## Task 8: Text Tool Light Theme

**Files:**
- Modify: `packages/overlay/src/tools/text.ts`

- [ ] **Step 1: Update text input styling**

Replace the input `style.cssText` (lines 27–41):

```typescript
import { COLORS, RADII, FONT_FAMILY } from "../design-tokens.js";

// In textHandler.onMouseDown:
activeInput.style.cssText = `
  position: fixed;
  left: ${e.clientX}px;
  top: ${e.clientY}px;
  z-index: 2147483647;
  background: ${COLORS.bgPrimary};
  color: ${COLORS.textPrimary};
  border: 1.5px solid ${COLORS.accent};
  border-radius: ${RADII.sm};
  padding: 4px 8px;
  font-size: ${getToolOptions().fontSize}px;
  font-family: ${FONT_FAMILY};
  outline: none;
  min-width: 120px;
  box-shadow: 0 0 0 3px ${COLORS.accentSoft};
`;
```

- [ ] **Step 2: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

- [ ] **Step 3: Commit**

```bash
git add packages/overlay/src/tools/text.ts
git commit -m "feat(overlay): light-themed text input with accent focus ring"
```

---

## Task 9: Custom Color Picker

**Files:**
- Create: `packages/overlay/src/utils/color-math.ts`
- Create: `packages/overlay/src/utils/color-math.test.ts`
- Create: `packages/overlay/src/color-picker.ts`
- Modify: `packages/overlay/src/tools/color.ts`
- Modify: `packages/overlay/src/tools-panel.ts` (wire swatch click)

The color math is extracted into a utility and unit-tested before building the picker UI. This catches conversion bugs (invisible until someone picks a color and gets wrong output) before wrapping them in 200 lines of canvas drag handling.

- [ ] **Step 1: Create color-math.ts with HSV↔hex conversion functions**

```typescript
// packages/overlay/src/utils/color-math.ts

export type HSV = { h: number; s: number; v: number };

export function hexToHsv(hex: string): HSV {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;
  return { h, s, v };
}

export function hsvToHex(hsv: HSV): string {
  const h = hsv.h / 360, s = hsv.s / 100, v = hsv.v / 100;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r: number, g: number, b: number;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = 0; g = 0; b = 0;
  }
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
```

- [ ] **Step 2: Write failing tests for color-math**

```typescript
// packages/overlay/src/utils/color-math.test.ts
import { describe, it, expect } from "vitest";
import { hexToHsv, hsvToHex } from "./color-math.js";

describe("hexToHsv / hsvToHex round-trip", () => {
  const cases = [
    { hex: "#ff0000", name: "pure red" },
    { hex: "#00ff00", name: "pure green" },
    { hex: "#0000ff", name: "pure blue" },
    { hex: "#ffffff", name: "pure white" },
    { hex: "#000000", name: "pure black" },
    { hex: "#a259ff", name: "figma purple (accent)" },
    { hex: "#808080", name: "mid gray" },
    { hex: "#f76b15", name: "orange preset" },
  ];

  for (const { hex, name } of cases) {
    it(`round-trips ${name} (${hex})`, () => {
      const hsv = hexToHsv(hex);
      const result = hsvToHex(hsv);
      expect(result).toBe(hex);
    });
  }
});

describe("hexToHsv edge cases", () => {
  it("black has zero saturation and value", () => {
    const hsv = hexToHsv("#000000");
    expect(hsv.s).toBe(0);
    expect(hsv.v).toBe(0);
  });

  it("white has zero saturation and full value", () => {
    const hsv = hexToHsv("#ffffff");
    expect(hsv.s).toBe(0);
    expect(hsv.v).toBeCloseTo(100, 0);
  });

  it("pure red has hue 0, full saturation and value", () => {
    const hsv = hexToHsv("#ff0000");
    expect(hsv.h).toBeCloseTo(0, 0);
    expect(hsv.s).toBeCloseTo(100, 0);
    expect(hsv.v).toBeCloseTo(100, 0);
  });
});

describe("hsvToHex edge cases", () => {
  it("hue 360 wraps to same as hue 0", () => {
    const a = hsvToHex({ h: 0, s: 100, v: 100 });
    const b = hsvToHex({ h: 360, s: 100, v: 100 });
    expect(a).toBe(b);
  });
});
```

- [ ] **Step 3: Run tests to verify they pass**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && npx vitest run packages/overlay/src/utils/color-math.test.ts
```

Expected: All tests pass. If any fail, fix the conversion functions before proceeding.

- [ ] **Step 4: Commit color-math module and tests**

```bash
git add packages/overlay/src/utils/color-math.ts packages/overlay/src/utils/color-math.test.ts
git commit -m "feat(overlay): add color-math utility with HSV/hex conversions and tests"
```

- [ ] **Step 5: Create color-picker.ts — UI component**

```typescript
// packages/overlay/src/color-picker.ts
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { getShadowRoot } from "./toolbar.js";
import { hexToHsv, hsvToHex } from "./utils/color-math.js";

type ColorPickerOptions = {
  initialColor: string;
  position: { x: number; y: number };
  showPropertyToggle: boolean;
  onColorChange: (color: string) => void;
  onPropertyChange?: (property: "backgroundColor" | "color") => void;
  onClose: () => void;
};

let activePickerEl: HTMLDivElement | null = null;

export function openColorPicker(opts: ColorPickerOptions): void {
  closeColorPicker();

  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    left: ${opts.position.x}px;
    top: ${opts.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.lg};
    border-radius: ${RADII.md};
    font-family: ${FONT_FAMILY};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  // Viewport bounds check
  requestAnimationFrame(() => {
    const rect = container.getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) {
      container.style.left = `${window.innerWidth - rect.width - 8}px`;
    }
    if (rect.bottom > window.innerHeight - 8) {
      container.style.top = `${window.innerHeight - rect.height - 8}px`;
    }
    container.style.opacity = "1";
  });

  let currentHsv = hexToHsv(opts.initialColor);
  let selectedProperty: "backgroundColor" | "color" = "backgroundColor";

  // --- Property toggle (Fill / Text) ---
  if (opts.showPropertyToggle) {
    const toggle = createSegmentedToggle(["Fill", "Text"], 0, (idx) => {
      selectedProperty = idx === 0 ? "backgroundColor" : "color";
      opts.onPropertyChange?.(selectedProperty);
    });
    container.appendChild(toggle);
  }

  // --- Color area (saturation/brightness) ---
  const colorArea = document.createElement("canvas");
  colorArea.width = 176;
  colorArea.height = 120;
  colorArea.style.cssText = `width:176px;height:120px;border-radius:4px;cursor:crosshair;`;
  const colorCtx = colorArea.getContext("2d")!;

  const colorPicker = document.createElement("div");
  colorPicker.style.cssText = `
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${SHADOWS.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;

  const colorAreaWrapper = document.createElement("div");
  colorAreaWrapper.style.cssText = "position:relative;width:176px;height:120px;";
  colorAreaWrapper.appendChild(colorArea);
  colorAreaWrapper.appendChild(colorPicker);
  container.appendChild(colorAreaWrapper);

  function drawColorArea() {
    const hue = currentHsv.h;
    const gradH = colorCtx.createLinearGradient(0, 0, 176, 0);
    gradH.addColorStop(0, `hsl(${hue}, 0%, 100%)`);
    gradH.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    colorCtx.fillStyle = gradH;
    colorCtx.fillRect(0, 0, 176, 120);
    const gradV = colorCtx.createLinearGradient(0, 0, 0, 120);
    gradV.addColorStop(0, "rgba(0,0,0,0)");
    gradV.addColorStop(1, "rgba(0,0,0,1)");
    colorCtx.fillStyle = gradV;
    colorCtx.fillRect(0, 0, 176, 120);

    const px = (currentHsv.s / 100) * 176;
    const py = (1 - currentHsv.v / 100) * 120;
    colorPicker.style.left = `${px}px`;
    colorPicker.style.top = `${py}px`;
  }

  let draggingArea = false;
  colorArea.addEventListener("mousedown", (e) => {
    draggingArea = true;
    updateAreaFromMouse(e);
  });

  function updateAreaFromMouse(e: MouseEvent) {
    const rect = colorArea.getBoundingClientRect();
    const x = Math.max(0, Math.min(176, e.clientX - rect.left));
    const y = Math.max(0, Math.min(120, e.clientY - rect.top));
    currentHsv.s = (x / 176) * 100;
    currentHsv.v = (1 - y / 120) * 100;
    drawColorArea();
    emitColor();
  }

  // --- Hue strip ---
  const hueStrip = document.createElement("canvas");
  hueStrip.width = 176;
  hueStrip.height = 14;
  hueStrip.style.cssText = "width:176px;height:14px;border-radius:7px;cursor:crosshair;";
  const hueCtx = hueStrip.getContext("2d")!;

  const huePickerEl = document.createElement("div");
  huePickerEl.style.cssText = `
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${SHADOWS.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;

  const hueWrapper = document.createElement("div");
  hueWrapper.style.cssText = "position:relative;width:176px;height:14px;";
  hueWrapper.appendChild(hueStrip);
  hueWrapper.appendChild(huePickerEl);
  container.appendChild(hueWrapper);

  function drawHueStrip() {
    const grad = hueCtx.createLinearGradient(0, 0, 176, 0);
    for (let i = 0; i <= 6; i++) {
      grad.addColorStop(i / 6, `hsl(${i * 60}, 100%, 50%)`);
    }
    hueCtx.fillStyle = grad;
    hueCtx.fillRect(0, 0, 176, 14);
    huePickerEl.style.left = `${(currentHsv.h / 360) * 176}px`;
  }

  let draggingHue = false;
  hueStrip.addEventListener("mousedown", (e) => {
    draggingHue = true;
    updateHueFromMouse(e);
  });

  function updateHueFromMouse(e: MouseEvent) {
    const rect = hueStrip.getBoundingClientRect();
    const x = Math.max(0, Math.min(176, e.clientX - rect.left));
    currentHsv.h = (x / 176) * 360;
    drawHueStrip();
    drawColorArea();
    emitColor();
  }

  // --- Hex input ---
  const hexInput = document.createElement("input");
  hexInput.type = "text";
  hexInput.value = hsvToHex(currentHsv);
  hexInput.style.cssText = `
    width: 100%; box-sizing: border-box;
    background: ${COLORS.bgSecondary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.sm};
    color: ${COLORS.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `;
  hexInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") hexInput.blur();
    e.stopPropagation();
  });
  hexInput.addEventListener("blur", () => {
    const val = hexInput.value.trim();
    if (/^#?[0-9a-fA-F]{6}$/.test(val)) {
      const hex = val.startsWith("#") ? val : `#${val}`;
      currentHsv = hexToHsv(hex);
      drawColorArea();
      drawHueStrip();
      emitColor();
    } else {
      hexInput.value = hsvToHex(currentHsv);
    }
  });
  container.appendChild(hexInput);

  // --- Preset swatches ---
  const presets = ["#000000", "#ffffff", "#e5484d", "#f76b15", "#f5d90a", "#30a46c", "#0091ff", "#a259ff"];
  const swatchRow = document.createElement("div");
  swatchRow.style.cssText = "display:flex;gap:4px;justify-content:center;";
  for (const color of presets) {
    const swatch = document.createElement("button");
    swatch.style.cssText = `
      width: 12px; height: 12px; border-radius: 50%;
      background: ${color};
      border: 1px solid ${COLORS.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${TRANSITIONS.fast};
    `;
    swatch.addEventListener("mouseenter", () => { swatch.style.boxShadow = SHADOWS.sm; });
    swatch.addEventListener("mouseleave", () => { swatch.style.boxShadow = "none"; });
    swatch.addEventListener("click", () => {
      currentHsv = hexToHsv(color);
      drawColorArea();
      drawHueStrip();
      hexInput.value = color;
      emitColor();
    });
    swatchRow.appendChild(swatch);
  }
  container.appendChild(swatchRow);

  function emitColor() {
    const hex = hsvToHex(currentHsv);
    hexInput.value = hex;
    opts.onColorChange(hex);
  }

  shadowRoot.appendChild(container);
  activePickerEl = container;

  // Draw initial state
  drawColorArea();
  drawHueStrip();

  // Drag event listeners (must be cleaned up)
  const onDocMouseMove = (e: MouseEvent) => {
    if (draggingArea) updateAreaFromMouse(e);
    if (draggingHue) updateHueFromMouse(e);
  };
  const onDocMouseUp = () => { draggingArea = false; draggingHue = false; };
  document.addEventListener("mousemove", onDocMouseMove);
  document.addEventListener("mouseup", onDocMouseUp);

  // Dismiss handlers
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeColorPicker(); };
  document.addEventListener("keydown", onKey, true);

  const onClickOutside = (e: MouseEvent) => {
    if (activePickerEl && !activePickerEl.contains(e.target as Node)) {
      closeColorPicker();
    }
  };
  setTimeout(() => document.addEventListener("mousedown", onClickOutside, true), 0);

  // Store cleanup and onClose callback
  (container as any)._cleanup = () => {
    document.removeEventListener("mousemove", onDocMouseMove);
    document.removeEventListener("mouseup", onDocMouseUp);
    document.removeEventListener("keydown", onKey, true);
    document.removeEventListener("mousedown", onClickOutside, true);
  };
  (container as any)._onClose = opts.onClose;
}

export function closeColorPicker(): void {
  if (activePickerEl) {
    (activePickerEl as any)._cleanup?.();
    (activePickerEl as any)._onClose?.();
    activePickerEl.remove();
    activePickerEl = null;
  }
}

// --- Helpers ---

function createSegmentedToggle(labels: string[], activeIdx: number, onChange: (idx: number) => void): HTMLDivElement {
  const track = document.createElement("div");
  track.style.cssText = `
    display: flex;
    background: ${COLORS.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;
  const segments: HTMLButtonElement[] = [];
  for (let i = 0; i < labels.length; i++) {
    const seg = document.createElement("button");
    seg.textContent = labels[i];
    seg.style.cssText = `
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i === activeIdx ? COLORS.bgPrimary : "transparent"};
      box-shadow: ${i === activeIdx ? SHADOWS.sm : "none"};
      color: ${i === activeIdx ? COLORS.textPrimary : COLORS.textSecondary};
      font-family: ${FONT_FAMILY}; font-size: 12px; cursor: pointer;
      transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast};
    `;
    seg.addEventListener("click", () => {
      segments.forEach((s, j) => {
        s.style.background = j === i ? COLORS.bgPrimary : "transparent";
        s.style.boxShadow = j === i ? SHADOWS.sm : "none";
        s.style.color = j === i ? COLORS.textPrimary : COLORS.textSecondary;
      });
      onChange(i);
    });
    segments.push(seg);
    track.appendChild(seg);
  }
  return track;
}
```

- [ ] **Step 6: Rewrite color.ts to use custom picker**

Replace the native `<input type="color">` with `openColorPicker`:

```typescript
// packages/overlay/src/tools/color.ts
import type { ToolEventHandler } from "../interaction.js";
import { addAnnotation, type ColorOverrideRuntime } from "../canvas-state.js";
import { addColorBadge } from "../annotation-layer.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";
import { openColorPicker, closeColorPicker } from "../color-picker.js";

let targetEl: HTMLElement | null = null;
let targetComp: Awaited<ReturnType<typeof resolveComponentAtPoint>> = null;
let selectedProperty: "backgroundColor" | "color" = "backgroundColor";
let originalValues: { bg: string; color: string } = { bg: "", color: "" };

export const colorHandler: ToolEventHandler = {
  async onMouseDown(e: MouseEvent) {
    closeColorPicker();

    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!el || el.closest("#sketch-ui-root") || el.hasAttribute("data-sketch-ui-ghost")) return;

    targetEl = el;
    originalValues = {
      bg: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
    };

    const comp = await resolveComponentAtPoint(e.clientX, e.clientY);
    if (!comp) return;
    targetComp = comp;

    const initialColor = rgbToHex(originalValues.bg);

    openColorPicker({
      initialColor,
      position: { x: e.clientX + 10, y: e.clientY + 10 },
      showPropertyToggle: true,
      onColorChange(hex) {
        if (targetEl) {
          (targetEl.style as any)[selectedProperty] = hex;
        }
      },
      onPropertyChange(prop) {
        selectedProperty = prop;
      },
      onClose() {
        if (!targetEl || !targetComp) return;
        const fromColor = selectedProperty === "backgroundColor" ? originalValues.bg : originalValues.color;
        const toColor = (targetEl.style as any)[selectedProperty];
        if (toColor && toColor !== fromColor) {
          const id = crypto.randomUUID();
          const rect = targetEl.getBoundingClientRect();
          addColorBadge(id, rect.right + window.scrollX, rect.top + window.scrollY, toColor);
          addAnnotation({
            type: "colorChange",
            id,
            component: targetComp,
            targetElement: targetEl,
            property: selectedProperty,
            fromColor,
            toColor,
          } as ColorOverrideRuntime);
        }
        targetEl = null;
        targetComp = null;
      },
    });
  },
  onMouseMove() {},
  onMouseUp() {},
};

function rgbToHex(rgb: string): string {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return "#000000";
  return "#" + match.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, "0")).join("");
}

export function cleanupColorTool(): void {
  closeColorPicker();
  targetEl = null;
  targetComp = null;
}
```

- [ ] **Step 7: Wire color swatch clicks in tools-panel.ts**

In `updateSubOptions()`, update the swatch click handlers for both draw and text:

```typescript
// Draw swatch click:
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

// Text swatch click:
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
```

Add import in tools-panel.ts:

```typescript
import { openColorPicker } from "./color-picker.js";
```

- [ ] **Step 8: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

- [ ] **Step 9: Manual test — open color picker from Color tool and from sub-options**

Test: Click element with Color tool → custom picker appears. Drag gradient area → color updates live. Click presets → applies. Type hex → validates on blur. Click swatch in Draw sub-options → picker opens for brush color.

- [ ] **Step 10: Commit**

```bash
git add packages/overlay/src/color-picker.ts packages/overlay/src/tools/color.ts packages/overlay/src/tools-panel.ts
git commit -m "feat(overlay): custom color picker with gradient area, hue strip, presets"
```

---

## Task 10: Onboarding Hint

**Files:**
- Create: `packages/overlay/src/onboarding.ts`
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Create onboarding.ts**

```typescript
// packages/overlay/src/onboarding.ts
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { getShadowRoot } from "./toolbar.js";

const STORAGE_KEY = "sketch-ui-onboarding-seen";

let hintEl: HTMLDivElement | null = null;
let dismissTimer: ReturnType<typeof setTimeout> | null = null;

export function showOnboardingHint(): void {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  hintEl = document.createElement("div");
  hintEl.style.cssText = `
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.md};
    border-radius: ${RADII.md};
    padding: 12px 16px;
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    color: ${COLORS.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
    max-width: 260px;
  `;

  const shortcuts = ["V", "H", "M", "D", "C", "T", "L"];
  const badgeStyle = `
    display: inline-block;
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${FONT_FAMILY};
    margin: 0 2px;
  `;

  hintEl.innerHTML = `Press ${shortcuts.map(k => `<span style="${badgeStyle}">${k}</span>`).join(" ")} to switch tools`;

  shadowRoot.appendChild(hintEl);
  requestAnimationFrame(() => {
    if (hintEl) hintEl.style.opacity = "1";
  });

  dismissTimer = setTimeout(dismissOnboarding, 5000);
}

export function dismissOnboarding(): void {
  if (!hintEl) return;
  localStorage.setItem(STORAGE_KEY, "1");
  hintEl.style.opacity = "0";
  setTimeout(() => {
    hintEl?.remove();
    hintEl = null;
  }, 150);
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }
}
```

- [ ] **Step 2: Wire in index.ts — show onboarding, dismiss on tool interaction**

In `index.ts`, add imports and calls:

```typescript
import { showOnboardingHint, dismissOnboarding } from "./onboarding.js";
```

After `initToolsPanel()`:

```typescript
showOnboardingHint();
```

In the `onToolChange` listener, dismiss on first tool change:

```typescript
onToolChange((tool, prev) => {
  dismissOnboarding(); // Dismiss onboarding on any tool interaction
  // ... rest of existing logic
});
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/onboarding.ts packages/overlay/src/index.ts
git commit -m "feat(overlay): onboarding hint with localStorage persistence"
```

---

## Task 11: Keyboard Shortcut Flash + Final Wiring

**Files:**
- Modify: `packages/overlay/src/tools-panel.ts`
- Modify: `packages/overlay/src/index.ts`

- [ ] **Step 1: Add keyboard shortcut flash to tools-panel.ts**

Export a function that briefly highlights a tool button:

```typescript
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
```

- [ ] **Step 2: Wire flash in index.ts and clean up remaining references**

```typescript
import { flashToolButton } from "./tools-panel.js";
```

Update the `onToolChange` listener and remove `updateModeLabel` / `TOOL_LABELS`:

```typescript
// Remove: import { ..., updateModeLabel, ... } from "./toolbar.js";
// Remove: const TOOL_LABELS: Record<string, string> = { ... };

onToolChange((tool, prev) => {
  dismissOnboarding();
  flashToolButton(tool);

  // Cleanup previous tool
  if (prev === "pointer") deactivatePointer();
  if (prev === "text") cleanupTextTool();
  if (prev === "color") cleanupColorTool();
  if (prev === "lasso") clearLassoSelection();

  // Activate new tool
  if (tool === "pointer") activatePointer();
  activateInteraction(tool);
  updateActiveToolUI(tool);
  // Removed: updateModeLabel(TOOL_LABELS[tool] || tool);
});
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI && pnpm build
```

Expected: Clean build with no errors.

- [ ] **Step 4: Full manual test**

```bash
cd /Users/gimdongha/Desktop/Projects/sketchUI/test-app && node ../packages/cli/bin/sketch-ui.js
```

Verify all features:
1. Light floating tools panel with grouped dividers
2. White action bar (bottom-right) with Eye, Undo, Generate, Close
3. Hover highlights with accent color and corner-radius matching
4. Contextual selection label floating near element
5. Custom SVG cursors per tool
6. Custom color picker (from Color tool and from sub-options)
7. Ghost shadows on drag/drop
8. Light-themed text input
9. Solid-stroke accent-colored lasso
10. Onboarding hint (first launch only, clear localStorage to test)
11. Keyboard shortcut flash on tool buttons
12. Toast notifications with light theme
13. Segmented controls in draw/text sub-options

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/tools-panel.ts packages/overlay/src/index.ts
git commit -m "feat(overlay): keyboard shortcut flash, final wiring cleanup"
```

---

## Summary

| Task | Files | Description |
|------|-------|-------------|
| 1 | `fonts/inter.ts` (new), `design-tokens.ts` (new) | Color, shadow, radius, transition, font, cursor tokens |
| 2 | `interaction.ts` | Full-viewport, custom SVG cursor system |
| 3 | `toolbar.ts` | Light action bar, reordered items, spinner/check states |
| 4 | `selection.ts` | Light overlays, contextual label, corner-radius matching |
| 5 | `tools-panel.ts` | Floating pill, grouped dividers, segmented controls, tooltips |
| 6 | `lasso.ts`, `annotation-layer.ts` | Accent colors, solid stroke, light text annotations |
| 7 | `ghost-layer.ts`, `move.ts` | Shadow transitions on drag/drop |
| 8 | `text.ts` | Light-themed text input |
| 9 | `color-math.ts` (new + tests), `color-picker.ts` (new), `color.ts`, `tools-panel.ts` | Color math with tests, custom picker component |
| 10 | `onboarding.ts` (new), `index.ts` | First-launch hint with localStorage |
| 11 | `tools-panel.ts`, `index.ts` | Shortcut flash, final cleanup |
