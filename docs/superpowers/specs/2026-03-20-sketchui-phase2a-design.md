# SketchUI Phase 2A: Visual Canvas + Tools Panel — Design Spec

## Goal

Add a visual manipulation layer to SketchUI that lets users freely move components, draw annotations, change colors, and place text on top of a live React page — all without writing to source code. This is the visual sandbox half of a two-phase workflow: Phase 2A builds the canvas tools, Phase 2B (separate spec) will wire the "Generate" button to the Claude API for AI-driven code generation from the visual changes.

## Architecture

### Three-Layer System

Three transparent layers sit on top of the live page:

1. **Ghost Layer** — Contains DOM clones of moved components. Ghosts are appended **directly to `document.body`** (not inside Shadow DOM) so they inherit page stylesheets. Each ghost is `position: fixed` with `pointer-events: none` and a high `z-index` (2147483644). The original element is dimmed to `opacity: 0.3`. Ghosts are created via `el.cloneNode(true)` and marked with `data-sketch-ui-ghost="true"` so SketchUI tools can identify and skip them, and so the user's own JavaScript (mutation observers, query selectors) can distinguish them from real DOM.

2. **Annotation Layer** — A full-viewport `<svg>` element inside the Shadow DOM (`position: fixed`, `top: 0`, `left: 0`, `100vw x 100vh`, `pointer-events: none`, `z-index: 2147483645`). Contains draw strokes, text labels, color change badges, and lasso paths. All annotations are children of a single `<g>` wrapper whose `transform` is updated on scroll: `translate(-scrollX, -scrollY)`. All positions are stored in page coordinates (`pageX`/`pageY`). Scroll listener uses `{ passive: true }` and updates are batched via `requestAnimationFrame`.

3. **Interaction Layer** — A transparent full-viewport div (`z-index: 2147483646`, `pointer-events: auto` when a non-Pointer tool is active, `pointer-events: none` when Pointer is active) that captures mouse/stylus events and dispatches them to the active tool. Marked with `data-sketch-ui-interaction="true"` for identification. **Covers the page viewport area only (left offset by 48px) — does not overlap the left sidebar.** The sidebar lives in Shadow DOM and handles its own events independently.

### Relationship to Phase 1

Phase 1's `selection.ts` currently registers `mousedown`, `mousemove`, `mouseup`, and `keydown` listeners on `document` with `capture: true`, and calls `e.preventDefault()` + `e.stopPropagation()` in `handleMouseDown`. This creates an event routing conflict with the interaction layer.

**`setEnabled(boolean)` behavior:**
- `setEnabled(false)`: Removes all four capture-phase document listeners (`mousedown`, `mousemove`, `mouseup`, `keydown`). This fully yields event control to the interaction layer. Called when any non-Pointer tool becomes active.
- `setEnabled(true)`: Re-attaches all four capture-phase listeners. The interaction layer sets `pointer-events: none` on itself, so events flow through to the document where `selection.ts` handles them. Called when Pointer tool becomes active.
- This is different from `deactivateSelection()` (which is a permanent teardown for close). `setEnabled` is a reversible toggle.

**Other Phase 1 integration:**
- The bottom-right status toolbar remains for component info, undo reorder, eye toggle, generate button, and close.
- Phase 1's selection overlays (hover highlight, selection box, selection label) remain and work in Pointer mode.
- Phase 1's WebSocket bridge and bippy-based component resolution are reused by all tools.
- Phase 1's drag-to-reorder (Pointer + drag on selected element) still writes to source immediately. Move tool drag creates visual ghosts only. These are distinct behaviors tied to distinct tools.

## Tools Panel (Left Sidebar)

### Layout

- Fixed left edge, full viewport height, 48px wide
- Background: `#1a1a2e` (matches existing toolbar)
- Icon buttons stacked vertically, 36x36px, with tooltip on hover
- Active tool: highlight background `#3a3a4e` + 2px accent left border (`#64b5f6`)
- Rendered inside the Shadow DOM host (`#sketch-ui-root`)
- Bottom-right status toolbar position (`right: 16px`) is unaffected by the sidebar

### Tool Set

| Order | Icon | Tool | Shortcut | Description |
|-------|------|------|----------|-------------|
| 1 | Arrow | **Pointer** | `V` | Phase 1 select mode — hover highlights, click selects, drag reorders |
| 2 | Hand | **Grab** | `H` | Pan/scroll the viewport via mouse drag |
| 3 | Move arrows | **Move** | `M` | Drag selected component to create/reposition a ghost clone |
| 4 | Pencil | **Draw** | `D` | Freehand SVG strokes on the annotation layer |
| 5 | Droplet | **Color** | `C` | Click element → inline color picker → visual color override |
| 6 | T | **Text** | `T` | Click to place editable text annotation |
| 7 | Dashed loop | **Lasso** | `L` | Freehand multi-select of components |

### Sub-Options Panel

- Appears below tool icons when relevant, same 48px width, slides down
- **Draw**: stroke color swatch (default `#ef4444`), stroke width toggle (2/4/8px)
- **Text**: font size selector (12/16/20/24px), color swatch (default white)
- Other tools have no sub-options initially

### Tool Switching

- Click icon or press keyboard shortcut
- **Tool keyboard shortcuts are suppressed when a text input is active (focused).** Only Enter and Escape are handled specially during text editing.
- Switching tools cancels any in-progress operation (mid-draw stroke discarded, text input cancelled)
- Pointer is the default tool on startup

## Tool Behaviors

### Pointer (V)

Identical to Phase 1 select mode. Hover highlights, click selects component (async bippy resolution), Escape deselects. Drag on selected element triggers Phase 1 reorder (source write). No changes from Phase 1.

When Pointer is active: interaction layer has `pointer-events: none`, `selection.ts` listeners are re-attached via `setEnabled(true)`.

### Grab (H)

- Mouse drag calls `window.scrollBy(-deltaX, -deltaY)` on each mousemove — inverted delta so it feels like grabbing the page
- No hover highlights, no selection changes
- Does not toggle any freeze/unfreeze mechanism — uses explicit `scrollBy` calls
- Cursor: `grab` default, `grabbing` while dragging

### Move (M)

- Requires a selected component. If nothing is selected, the tool temporarily acts as Pointer: user clicks to select, then the tool **automatically reverts to Move behavior** — no extra keypress needed.
- **Drag start**: Clone selected element via `el.cloneNode(true)`, append to `document.body` as ghost (`position: fixed`, high z-index), dim original to `opacity: 0.3` (or `visibility: hidden` if eye toggle is off).
- **Drag move**: Update ghost `left`/`top` to follow cursor.
- **Drag end**: Ghost stays at final position, pushed to canvas state.
- Dragging an existing ghost updates its position (no new ghost created).
- Cursor: `move`

### Draw (D)

- Mousedown starts a new SVG `<path>` in the annotation layer, mousemove appends points, mouseup finalizes.
- Raw points simplified with Ramer-Douglas-Peucker algorithm (epsilon ~2px) to reduce count.
- Rendered as `<path>` with `stroke-linecap: round`, `stroke-linejoin: round`.
- Each stroke wrapped in a `<g>` group with a data attribute linking to its annotation ID.
- `targetComponent` resolved from the element under the **start point** of the stroke (not midpoint or endpoint). If no component under start point, `targetComponent` is `null`.
- Sub-options: stroke color, stroke width.
- Cursor: `crosshair`

### Color (C)

- Click an element → resolve component via bippy → show a native `<input type="color">` picker positioned near the click point (rendered inside Shadow DOM, absolutely positioned).
- A small popover wrapper shows two radio buttons for the target property: `color` or `backgroundColor`. Default is `backgroundColor`.
- Picker's initial value is the element's current computed value for the chosen property.
- On color select: apply as inline style override on the real DOM element (visual only, reversed on reset). Record as `ColorOverride` annotation.
- Clicking same element again reopens picker with the overridden color.
- Picker dismissed by: selecting a color (auto-close), clicking outside, or pressing Escape.
- Cursor: `pointer`

### Text (T)

- Click anywhere → place a real `<input>` at that position on the interaction layer (temporarily `pointer-events: auto` for just that input).
- User types, hits Enter or clicks away to commit.
- On commit: input replaced with SVG `<foreignObject>` containing styled HTML — dark pill background (`rgba(0,0,0,0.8)`) with white text.
- `targetComponent` resolved from element under the click point.
- Sub-options: font size, color.
- Cursor: `text`

### Lasso (L)

- Mousedown starts a freehand SVG path, mouseup closes it.
- All components whose bounding rects intersect the closed path become selected (multi-select).
- Multi-selection shown with blue borders on all matched elements.
- **Transient** — no annotation created. This is a selection tool only.
- After lasso selection, the user can switch to another tool (Move, Color) to act on the selection. Multi-select behavior for Move and Color is deferred to implementation — Phase 2A delivers lasso as a multi-select mechanism; batch operations on multi-selections are out of scope for this spec and will be designed if needed during implementation.
- Cursor: `crosshair`

## Canvas State (`canvas-state.ts`)

### Shared Type Alias

```typescript
/** Reference to a resolved component — used across all annotation types */
interface ComponentRef {
  componentName: string;
  filePath: string;
  lineNumber: number;
}
```

### Data Model

```typescript
type ToolType = "pointer" | "grab" | "move" | "draw" | "color" | "text" | "lasso";

interface Ghost {
  id: string;                    // unique ID via crypto.randomUUID()
  componentInfo: ComponentInfo;
  componentRef: ComponentRef;    // for serialization (filePath:lineNumber:componentName)
  originalRect: DOMRect;
  currentPos: { x: number; y: number };
  cloneEl: HTMLElement;
  originalOpacity: string;       // stored to restore on reset
}

interface DrawAnnotation {
  type: "draw";
  id: string;
  points: Array<{ x: number; y: number }>;
  color: string;
  strokeWidth: number;
  targetComponent: ComponentRef | null;
}

interface TextAnnotation {
  type: "text";
  id: string;
  position: { x: number; y: number };
  content: string;
  fontSize: number;
  color: string;
  targetComponent: ComponentRef | null;
}

interface ColorOverride {
  type: "colorChange";
  id: string;
  component: ComponentRef;
  targetElement: HTMLElement;
  property: "color" | "backgroundColor";
  fromColor: string;
  toColor: string;
}

type Annotation = DrawAnnotation | TextAnnotation | ColorOverride;

interface CanvasState {
  ghosts: Map<string, Ghost>;
  annotations: Annotation[];
  activeTool: ToolType;
  activeToolOptions: {
    brushSize: number;
    brushColor: string;
    fontSize: number;
    textColor: string;
  };
  originalsHidden: boolean;      // eye toggle state
}
```

### Canvas Undo

- Separate from Phase 1's source-code undo stack
- Simple action stack: each ghost creation/move, annotation, or color change pushes an action
- **Ctrl+Z** pops and reverses the last canvas action
- Shows a brief toast: "Undo: draw stroke removed", "Undo: move reverted", etc.
- Phase 1's toolbar button labeled **"Undo Reorder"** (not just "Undo") for clarity

**Undo action types:**

```typescript
type CanvasUndoAction =
  | { type: "ghostCreate"; ghostId: string }
  | { type: "ghostMove"; ghostId: string; previousPos: { x: number; y: number } }
  | { type: "annotationAdd"; annotationId: string }
  | { type: "colorChange"; annotationId: string; element: HTMLElement; property: string; previousColor: string };
```

### Reset

- "Clear All" button at bottom of left sidebar
- No keyboard shortcut (avoids conflicting with Ctrl+Shift+Z Redo convention)
- Removes all ghosts (from `document.body`), annotations, color overrides
- Restores original element opacity and visibility
- Clears the canvas undo stack

## Eye Toggle

- Button in the bottom-right status toolbar, between Generate and Undo Reorder
- Default state: eye-open icon (originals visible at 0.3 opacity)
- Toggle (click or `.` key): sets all originals **that have a corresponding ghost** to `visibility: hidden` (preserves layout space, hides visually). User sees only ghost clones in proposed positions.
- Toggle back: restores those originals to `opacity: 0.3`, `visibility: visible`
- Icon switches between open eye and crossed-out eye SVG
- State stored in `canvas-state.ts` as `originalsHidden: boolean`

Note: `visibility: hidden` is used instead of `display: none` to prevent layout collapse, which would shift other elements and make ghost positions meaningless relative to the new layout.

## Generate Button

- Added to bottom-right status toolbar
- Disabled until canvas state has at least one change (ghost, annotation, or color override)
- **Phase 2A behavior**: calls `serializeAnnotations()` and logs the structured payload to console (debug/preview)
- **Phase 2B** (separate spec) will wire this to Claude API

### Serialization Format (`serializeAnnotations()`)

```json
{
  "moves": [
    {
      "component": "Navbar",
      "file": "src/components/Navbar.tsx",
      "line": 2,
      "from": { "top": 0, "left": 0, "width": 1200, "height": 64 },
      "to": { "x": 0, "y": 400 }
    }
  ],
  "annotations": [
    {
      "type": "draw",
      "startComponent": "HeroSection",
      "startFile": "src/components/HeroSection.tsx",
      "startLine": 3,
      "points": [{ "x": 100, "y": 200 }, { "x": 150, "y": 250 }],
      "color": "#ef4444",
      "strokeWidth": 4
    },
    {
      "type": "text",
      "content": "make this bigger",
      "position": { "x": 300, "y": 400 },
      "targetComponent": "Button",
      "targetFile": "src/components/Hero.tsx",
      "targetLine": 24
    }
  ],
  "colorChanges": [
    {
      "component": "Button",
      "file": "src/components/Hero.tsx",
      "line": 24,
      "property": "backgroundColor",
      "from": "#3b82f6",
      "to": "#22c55e"
    }
  ]
}
```

## Annotation Layer Rendering

### SVG Structure

```svg
<svg style="position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:2147483645;">
  <g class="annotation-root" transform="translate(-scrollX, -scrollY)">
    <!-- draw strokes -->
    <g data-annotation-id="draw-1">
      <path d="M100,200 L150,250..." stroke="#ef4444" stroke-width="4"
            stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </g>
    <!-- text annotations -->
    <foreignObject x="300" y="400" width="200" height="40">
      <div style="background:rgba(0,0,0,0.8); color:white; padding:4px 8px; border-radius:4px; font-size:16px;">
        make this bigger
      </div>
    </foreignObject>
    <!-- color change badges -->
    <circle cx="520" cy="100" r="6" fill="#22c55e" stroke="white" stroke-width="1.5" />
  </g>
</svg>
```

### Scroll Synchronization

- Single `<g class="annotation-root">` wraps all annotation elements
- On scroll: update `transform: translate(-scrollX, -scrollY)` on this `<g>`
- Ghost clones (on `document.body`) use the same offset pattern (adjust `left`/`top` by scroll delta, batched via `requestAnimationFrame`)
- Scroll listener uses `{ passive: true }` — one transform update per animation frame, no per-element recalculation

### Draw Stroke Simplification

- Raw mousemove points are simplified using Ramer-Douglas-Peucker (epsilon ~2px) on mouseup
- Reduces storage and rendering cost for complex strokes

## File Structure (New/Modified)

### New Files

```
packages/overlay/src/
  canvas-state.ts     — Central state: ghosts, annotations, tool options, undo stack, serialization
  tools-panel.ts      — Left sidebar rendering, tool switching, sub-options panel
  interaction.ts      — Interaction layer setup, event dispatch to active tool handler
  annotation-layer.ts — SVG overlay creation, rendering, scroll sync
  ghost-layer.ts      — Ghost clone creation, positioning, opacity management
  tools/
    pointer.ts        — Pointer tool handler (delegates to selection.ts)
    grab.ts           — Grab/pan tool handler
    move.ts           — Move tool handler (ghost creation/positioning)
    draw.ts           — Draw tool handler (SVG path recording)
    color.ts          — Color tool handler (picker, inline style override)
    text.ts           — Text tool handler (input → foreignObject)
    lasso.ts          — Lasso tool handler (freehand multi-select)
  utils/
    rdp.ts            — Ramer-Douglas-Peucker point simplification
```

### Modified Files

```
packages/overlay/src/
  selection.ts        — Add setEnabled(boolean) export: removes/re-attaches capture-phase listeners
  toolbar.ts          — Rename Undo → "Undo Reorder", add Eye toggle + Generate button
  index.ts            — Wire up new subsystems (tools panel, canvas state, layers)
packages/shared/src/
  types.ts            — Add ComponentRef, annotation types, ToolType, CanvasUndoAction, serialization format types
```

## Out of Scope (Phase 2A)

- Claude API integration (Phase 2B)
- Screenshot capture (Phase 2B)
- Diff preview UI (Phase 2B)
- Applying AI-generated changes to filesystem (Phase 2B)
- Redo (no Redo implementation in Phase 2A)
- Batch operations on lasso multi-selections (Move all, Color all)
- Multi-user / collaborative editing
- Saving/loading canvas state to disk
- Stylus pressure sensitivity
- Component resizing (only repositioning)
