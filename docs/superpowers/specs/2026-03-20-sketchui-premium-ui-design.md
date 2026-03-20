# SketchUI Premium UI Redesign — Design Spec

## Overview

Redesign the SketchUI overlay from a dark-themed functional prototype into a premium, minimalistic light-themed interface inspired by Figma. The goal is a tool that feels polished, fast, and professional — not vibe-coded. Every visual decision should serve clarity and speed.

## Design Principles

1. **Solid and clean** — White panels, real shadows, no glass/blur effects. Elevation comes from shadow intensity alone.
2. **Single accent** — Figma purple (`#a259ff`) is the only color. Everything else is monochrome.
3. **Animate to inform, not to decorate** — If removing an animation makes the interaction harder to follow, keep it. If removing it just makes things faster, cut it.
4. **Contextual information** — Data lives near what it describes (selection labels near elements, not in a distant toolbar).
5. **Snappy and responsive** — Figma-level restraint. No spring bounces, no scale transforms, no marching ants. Instant state swaps where possible.

---

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#ffffff` | Panel/toolbar backgrounds |
| `--bg-secondary` | `#f7f7f8` | Hover states, secondary surfaces |
| `--bg-tertiary` | `#efefef` | Active states, pressed, disabled button bg |
| `--border` | `rgba(0,0,0,0.08)` | Subtle borders |
| `--border-strong` | `rgba(0,0,0,0.15)` | Focused/active borders |
| `--text-primary` | `#1a1a1a` | Labels, headings |
| `--text-secondary` | `#6b6b6b` | Descriptions, hints, idle icons |
| `--text-tertiary` | `#9b9b9b` | Placeholders, disabled text |
| `--accent` | `#a259ff` | Selection, active tool, primary actions |
| `--accent-hover` | `#8b3ee0` | Generate button hover |
| `--accent-soft` | `rgba(162,89,255,0.08)` | Hover fills, selection highlight bg |
| `--accent-medium` | `rgba(162,89,255,0.15)` | Active fills, selection overlay bg |
| `--danger` | `#e5484d` | Destructive actions, errors |
| `--danger-soft` | `rgba(229,72,77,0.08)` | Destructive hover bg |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Tooltips, selection labels, settled ghosts |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)` | Tools panel, action bar |
| `--shadow-lg` | `0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)` | Popovers, color picker, ghost while dragging |

### Spacing

4px base scale: 4, 8, 12, 16, 20, 24, 32.

### Border Radius

| Context | Value |
|---------|-------|
| Small elements (buttons, badges) | `6px` |
| Panels, cards | `10px` |
| Larger containers (tools pill) | `14px` |

### Typography

**Font:** Inter (loaded via Google Fonts `<link>` injected into the page). Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.

| Context | Size | Weight |
|---------|------|--------|
| Body text, labels | 12px | 400 |
| Small labels, hints | 11px | 400 |
| Emphasis, button labels | 12px | 600 |
| Component name in selection label | 12px | 600 |

### Transitions

| Context | Value |
|---------|-------|
| Color/opacity changes (hover, active) | `100ms ease` |
| Fade in/out (panels, labels, toasts) | `150ms ease` |
| Ghost shadow on drop | `200ms ease` |
| Panel entrance (first load only) | `200ms ease` fade |

No spring easing. No scale transforms. No marching ants.

---

## Interaction Layer Change

The Phase 2A interaction layer was offset `left: 48px; width: calc(100vw - 48px)` to avoid the full-height sidebar. With the floating pill design, the interaction layer becomes full-viewport: `left: 0; width: 100vw; height: 100vh`. The floating tools panel lives inside Shadow DOM and handles its own click events independently — the interaction layer ignores clicks that originate from `#sketch-ui-root` (already the case for other Shadow DOM elements).

---

## Floating Tools Panel (Left Side)

### Layout

- Vertically oriented rounded pill, 44px wide
- Positioned: `left: 16px`, vertically centered (`top: 50%; transform: translateY(-50%)`)
- Background: `--bg-primary` solid white
- Border: `1px solid --border`
- Shadow: `--shadow-md`
- Border-radius: `14px`
- Padding: 8px on all sides
- Entrance: fade in, 200ms ease (first load only)

### Tool Buttons (7 total)

- 32x32px hit area
- Icons: 18px stroke-style SVGs, 1.5px stroke weight
- 4px gap between buttons
- Grouped with dividers:
  - Group 1: Pointer, Grab
  - Group 2: Move
  - Group 3: Draw, Color, Text
  - Group 4: Lasso
- Dividers: 1px horizontal lines, `--border` color, 16px wide, centered

**States:**

| State | Background | Icon Color | Transition |
|-------|-----------|------------|------------|
| Idle | transparent | `--text-secondary` | — |
| Hover | `--bg-secondary` circle | `--text-primary` | 100ms ease |
| Active tool | `--accent-soft` circle | `--accent` | instant swap |

Active tool also gets a 2px left bar indicator: `--accent`, `border-radius: 1px`.

### Tooltips

- Appear 8px to the right of the button
- 400ms hover delay before showing (no instant flash)
- Background: `--bg-primary`, border: `1px solid --border`, shadow: `--shadow-sm`, border-radius: `6px`
- Content: tool name in `--text-primary` + shortcut key in a small `--bg-secondary` rounded badge in `--text-tertiary`
- Example: `Move` `M`
- Entrance: fade in, 150ms ease
- Exit: fade out, 100ms ease

### Sub-Options Panel (Draw / Text tools)

Separate small floating card that appears between the last tool button and the Clear All divider, inside the pill. It expands the pill height rather than floating separately — this avoids positioning issues on short viewports.

- Background: separated by 1px `--border` dividers above and below
- Padding: 8px 4px
- Entrance: fade in, 150ms ease (pill height animates smoothly)

**Draw sub-options:**
- Color swatch: 20px circle, `--shadow-sm`, no border. Shows current brush color as fill. Click opens custom color picker (described below).
- Size selector: Segmented control (pill-shaped). `--bg-secondary` track. Three segments: 2px, 4px, 8px. Active segment: white background with `--shadow-sm`. Height: 24px.

**Text sub-options:**
- Color swatch: Same as draw.
- Size selector: Segmented control. Four segments: 12, 16, 20, 24. Same styling.

### Clear All Button

- Positioned at bottom of the pill, separated by a 1px `--border` divider
- Trash icon (SVG, 18px, 1.5px stroke), not an X character
- Same 32x32 hit area
- Idle: `--text-secondary`
- Hover: `--danger` icon, `--danger-soft` background circle, 100ms ease

---

## Action Bar (Bottom-Right)

### Layout

- Floating horizontal bar
- Position: `bottom: 16px; right: 16px`
- Background: `--bg-primary`, border: `1px solid --border`, shadow: `--shadow-md`, border-radius: `10px`
- Height: 40px, padding: `6px 8px`
- Items: 4px gaps between elements, grouped with 1px vertical `--border` dividers (16px tall)
- Entrance: fade in, 200ms ease (first load only)

### Contents (left to right)

**Eye toggle:**
- 28x28 icon button
- Open-eye / closed-eye SVG (18px, 1.5px stroke)
- Idle: `--text-secondary`
- Hover: `--bg-secondary` circle background, `--text-primary` icon, 100ms ease
- Active (originals hidden): `--accent` icon color

**Divider**

**Undo Reorder:**
- 28x28 icon button
- Rotate-left arrow SVG
- Idle: `--text-secondary`
- Hover: `--bg-secondary` circle background, `--text-primary` icon, 100ms ease
- Disabled: `opacity: 0.3`, no hover, `cursor: default`
- While AST write in progress: icon replaced by 12px spinner (`--text-secondary`), returns to icon with brief checkmark flash (200ms) on success

**Divider**

**Generate:**
- Text button with label "Generate", 12px weight 600
- Background: `--accent`, text: white, border-radius: `6px`, padding: `6px 14px`
- Hover: background darkens to `--accent-hover`, 100ms ease
- Disabled: `--bg-tertiary` background, `--text-tertiary` text (not just opacity — intentional swap)

**Close:**
- 28x28 icon button
- X SVG (18px, 1.5px stroke)
- Idle: `--text-tertiary`
- Hover: `--danger` icon, `--danger-soft` background circle, 100ms ease

---

## Selection & Hover Overlays

### Hover Highlight

- Border: `1.5px solid --accent`
- Fill: `--accent-soft`
- Corner radius: reads `getComputedStyle(el).borderRadius`. If it returns a single value (all corners equal), use that value + 2px. If it returns empty or `0px`, fall back to `4px`. Multi-value border-radius (per-corner) is not matched — fall back to `4px` for simplicity.
- Transition: `100ms ease` for position/size changes (smooth tracking between elements)
- No label on hover. Clean.

### Selection Overlay

- Border: `1.5px solid --accent`
- Fill: `--accent-medium`
- Static border (no marching ants, no animation)

### Selection Label (Contextual)

Floats near the selected element, not in the action bar.

- Position: 8px above the selected element's top edge
- If the element's top edge minus the label height (~28px) minus 8px is less than 0, flips to 8px below the element's bottom edge
- Background: `--bg-primary`, border: `1px solid --border`, shadow: `--shadow-sm`, border-radius: `6px`
- Padding: `4px 8px`
- Content:
  - Component name: `--text-primary`, 12px, weight 600
  - File path + line: `--text-secondary`, 11px, weight 400
  - Format: `ComponentName  src/components/File.tsx:12` (name and path separated by spacing)
- Entrance: fade in, 150ms ease
- During async component resolution (>150ms): shows pulsing dots animation (`--text-tertiary`) instead of name, then fades to resolved name

### Marquee

- Border: `1px solid --accent`
- Fill: `--accent-soft`
- Solid line (not dashed)
- Corner radius: `2px`

### Lasso

- Stroke: `--accent`, 1.5px, solid (not dashed — the freehand shape communicates "in progress")
- Fill: `--accent-soft`
- On completion: selected elements get standard selection overlay treatment

---

## Cursor System

Custom SVG cursors encoded as `data:image/svg+xml` URIs.

| Tool | Cursor | Detail |
|------|--------|--------|
| Pointer | System default arrow | No change |
| Grab | System `grab` / `grabbing` | No change |
| Move | Custom crosshair with move arrows | 24x24 SVG, `--accent` colored |
| Draw | Circle matching brush size | Dynamic radius (2/4/8px), `--accent` outline. Updates live when brush size changes. |
| Color | Custom eyedropper | 24x24 SVG |
| Text | System `text` | No change |
| Lasso | Small crosshair dot | 16x16 SVG, thin `--accent` cross |

---

## Ghost Drag Behavior

- Ghost clone receives `--shadow-lg` while being dragged (lifted feel)
- Ghost opacity: `0.9` while dragging (slightly transparent to show motion)
- On drop: shadow transitions from `--shadow-lg` to `--shadow-sm` over 200ms ease (settles in)
- Original element dims to `opacity: 0.25`
- Eye toggle hidden state: `visibility: hidden` (preserves layout, same as current)

---

## Custom Color Picker

Replaces native `<input type="color">`. Rendered inside Shadow DOM.

### Popup Container

- Background: `--bg-primary`, border: `1px solid --border`, shadow: `--shadow-lg`, border-radius: `10px`
- Width: 200px, padding: 12px
- Entrance: fade in, 150ms ease
- Position: offset from click point, with viewport bounds checking (never goes off-screen)
- Dismissal: click outside, Escape key

### Contents (top to bottom)

**Property toggle:** Segmented control, two options: "Fill" / "Text". "Fill" maps to `style.backgroundColor`, "Text" maps to `style.color`. `--bg-secondary` track, active segment is white with `--shadow-sm`. 28px tall. Full width.

**Color area:** 176x120px rectangle. Horizontal axis: saturation (left=0, right=100%). Vertical axis: brightness (top=100%, bottom=0%). Background: gradient composite of the current hue. Picker: 10px circle, white fill, `--shadow-sm`.

**Hue strip:** 176x14px horizontal bar. Rainbow gradient. Same circle picker.

**Hex input:** Text input at bottom. `--bg-secondary` background, `1px solid --border`, border-radius: `6px`. Monospace font, 12px. Shows `#a259ff` format. Editable — validates on blur/enter, reverts if invalid.

**Preset swatches:** Single row of 8 circles (12px diameter), common colors:
`#000000`, `#ffffff`, `#e5484d`, `#f76b15`, `#f5d90a`, `#30a46c`, `#0091ff`, `#a259ff`
All swatches get `1px solid --border` in idle state (prevents white swatch being invisible on white background). `--shadow-sm` on hover. Click applies immediately.

---

## Toast Notifications

- Position: `bottom: 68px; right: 16px` (12px above the 40px action bar at bottom: 16px)
- Background: `--bg-primary`, border: `1px solid --border`, shadow: `--shadow-md`, border-radius: `8px`
- Padding: `8px 12px`
- Content: small contextual icon (undo arrow, trash, checkmark) in `--text-secondary` + message text in `--text-primary`, 12px
- Entrance: fade in, 150ms ease
- Exit: fade out, 150ms ease
- Auto-dismiss: 2000ms
- Only one toast at a time (previous cleared before new)

---

## Onboarding Hint

- **Persistence:** `localStorage.getItem("sketch-ui-onboarding-seen")`. Show only once ever. Flag set on dismiss or any tool interaction.
- Small floating card near the tools panel, 8px to its right
- Background: `--bg-primary`, border: `1px solid --border`, shadow: `--shadow-md`, border-radius: `10px`
- Padding: `12px 16px`
- Content: "Press `V` `H` `M` `D` `C` `T` `L` to switch tools" — shortcut keys in inline `--bg-secondary` rounded badges (`border-radius: 4px`, padding `2px 6px`)
- Auto-dismiss after 5 seconds, or immediately on any tool interaction
- Exit: fade out, 150ms

---

## Keyboard Shortcut Flash

When user presses a tool shortcut key:
- The corresponding tool button element gets a temporary `background-color: --accent-soft` applied directly, which fades out over 300ms via a CSS transition
- Implemented as a temporary inline style on the button element, removed after the transition completes
- Confirms the shortcut registered without being distracting

---

## Loading & Async Feedback

**Component resolution (>150ms):**
- Selection label shows pulsing dots (`--text-tertiary`, three dots cycling opacity)
- On resolve: dots replaced by component name, fade transition

**Reorder AST write:**
- Undo Reorder icon in action bar replaced by 12px spinner (`--text-secondary`)
- On success: spinner replaced by checkmark icon, holds 200ms, then returns to undo arrow

---

## Font Loading

Inter font is loaded by injecting a `<link>` tag into the page `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

Injected once during overlay initialization. The `display=swap` ensures text renders immediately with the fallback font, then swaps to Inter once loaded. All overlay text uses `font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`.

Since the overlay runs inside Shadow DOM, the font-family declaration must be set on the Shadow DOM host and all child elements explicitly (Shadow DOM does not inherit `@font-face` from the outer document in all browsers, but the `<link>` in `<head>` makes the font available globally for any element that references it by name).

---

## File Impact

### Modified Files

| File | Changes |
|------|---------|
| `packages/overlay/src/toolbar.ts` | Complete restyle: light theme, new layout as action bar. Remove mode label and component-info span (both replaced — mode is implicit from tools panel, component info moves to contextual selection label). Add Inter font injection. Add spinner/checkmark states for undo. Note: this is intentionally reordering items from the Phase 2A layout to: Eye, Undo Reorder, Generate, Close. |
| `packages/overlay/src/tools-panel.ts` | Complete restyle: floating pill, light theme, grouped dividers, segmented controls for sub-options. New tooltip system with delay. |
| `packages/overlay/src/selection.ts` | Restyle overlays (light accent, thinner borders, corner-radius matching). Change marquee from dashed to solid border. Add contextual selection label (replaces toolbar component info). Add loading dots for async resolve. |
| `packages/overlay/src/interaction.ts` | Change to full-viewport (`left: 0; width: 100vw`). Add custom cursor system (per-tool SVG data URIs, dynamic draw cursor that updates when brush size changes via canvas-state observation). |
| `packages/overlay/src/tools/color.ts` | Replace native color input with full custom color picker (gradient area, hue strip, hex input, presets, segmented property toggle). |
| `packages/overlay/src/tools/draw.ts` | Notify interaction layer when brush size changes (for dynamic cursor update). |
| `packages/overlay/src/tools/text.ts` | Restyle text input: light theme, `--bg-primary` background, `--border-strong` border. |
| `packages/overlay/src/tools/move.ts` | Add shadow transitions to ghost clones on drag/drop. |
| `packages/overlay/src/tools/lasso.ts` | Update stroke/fill to use accent color tokens. Solid stroke instead of dashed. |
| `packages/overlay/src/ghost-layer.ts` | Add shadow management for ghosts (drag vs settled states). |
| `packages/overlay/src/drag.ts` | No changes (Phase 1 drag-to-reorder behavior unchanged). |
| `packages/overlay/src/canvas-state.ts` | No changes. |
| `packages/overlay/src/annotation-layer.ts` | Update text annotation styling (light pill instead of dark). |
| `packages/overlay/src/index.ts` | Wire onboarding hint, keyboard shortcut flash. |

### New Files

| File | Purpose |
|------|---------|
| `packages/overlay/src/color-picker.ts` | Custom color picker component (gradient canvas, hue strip, hex input, presets) |
| `packages/overlay/src/design-tokens.ts` | Central design token constants (colors, shadows, radii, transitions) exported for all files |
| `packages/overlay/src/onboarding.ts` | Onboarding hint logic (localStorage check, render, dismiss) |

---

## Out of Scope

- Dark mode / theme switching
- Resizable or repositionable panels (fixed positions)
- Custom icon font (inline SVGs are sufficient)
- Redo functionality
- Saving/loading canvas state
- Drag to reposition the tools panel or action bar
