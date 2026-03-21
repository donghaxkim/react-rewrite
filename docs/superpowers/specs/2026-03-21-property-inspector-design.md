# Property Inspector Design Spec

Visual property editing for React components with Tailwind CSS. Three-layer architecture: instant inline preview (Layer 1), commit to source via AST transform (Layer 2), undo/cancel integration (Layer 3).

## Scope

### Properties (v1) — ~30 total

| Group | Properties | Control Type |
|-------|-----------|--------------|
| Layout | display, flex-direction, justify-content, align-items, gap | segmented (icons), number-scrub (gap) |
| Spacing | padding (4 sides + shorthand), margin (4 sides + shorthand) | box-model diagram |
| Size | width, height, min-width, max-width, min-height, max-height | number-scrub |
| Typography | font-size, font-weight, line-height, letter-spacing, text-align, color | number-scrub, segmented (weight, align), color-swatch |
| Background | background-color | color-swatch |
| Border | border-width, border-color, border-radius (4 corners + shorthand), border-style | number-scrub, color-swatch, segmented (style) |
| Effects | opacity | slider + number input |

### Not in v1

- Gradients, background-image — complex value UI
- box-shadow — multi-input editor needed
- overflow, position, z-index, transform, transition, grid-template-columns — lower frequency edits
- Shorthand recombination (pt-6 pr-6 pb-6 pl-6 → p-6) — v2 optimization

### Tailwind Support

- v3 (resolveConfig) and v4 (CSS @theme / CSS custom properties)
- CLI resolves full config, sends token map to browser on connection
- Browser also reads CSS custom properties from live page as fast path

---

## Architecture

### Unified Property Controller (Approach A + descriptor refinement)

Single `PropertyController` class owns the full lifecycle: read → render → preview → commit/cancel. Property behavior defined declaratively via `PropertyDescriptor` objects. ~5-6 reusable control components instantiated based on descriptor's `controlType`.

### File Structure

```
packages/overlay/src/properties/
  property-controller.ts      — lifecycle owner
  property-descriptors.ts     — ~30 descriptors as const data
  property-sidebar.ts         — sidebar container, slide in/out, scroll
  section-renderer.ts         — groups descriptors by group, instantiates controls
  tailwind-resolver.ts        — reads CSS custom props + merges CLI-sent tokens
  controls/
    number-scrub.ts           — drag-to-scrub with Tailwind snap points
    segmented.ts              — icon segmented control
    color-swatch.ts           — swatch + text input, opens existing color picker
    slider.ts                 — horizontal slider (opacity)
    box-model.ts              — nested rectangle diagram for padding/margin

packages/cli/src/
  tailwind-resolver.ts        — resolves full config, builds reverse map
  transform.ts                — new updateClassName function (alongside existing reorderComponent)

packages/shared/src/types.ts  — new message types, PropertyDescriptor type
```

---

## Data Model

### PropertyDescriptor

```typescript
type ControlType = "number-scrub" | "segmented" | "color-swatch" | "slider" | "box-model";
type PropertyGroup = "layout" | "spacing" | "size" | "typography" | "background" | "border" | "effects";

interface PropertyDescriptor {
  key: string;                    // "paddingTop"
  label: string;                  // "Top"
  group: PropertyGroup;
  controlType: ControlType;
  cssProperty: string;            // "padding-top" — for getComputedStyle + inline override
  tailwindPrefix: string;         // "pt"
  tailwindScale: string;          // "spacing" — key into resolved theme tokens
  relatedPrefixes?: string[];     // ["p", "px"] — shorthands that set this property
  defaultValue: string;           // "0"
  enumValues?: EnumOption[];      // for segmented controls
  min?: number;
  max?: number;
  compound?: boolean;             // true for box-model grouped properties
  compoundGroup?: string;         // "padding-margin" — groups related descriptors
}

interface EnumOption {
  value: string;                  // CSS value: "row", "column"
  tailwindValue: string;          // class suffix: "row", "col"
  icon?: string;                  // SVG string
  label: string;                  // tooltip/a11y
}
```

The `compound` flag enables the box-model control: the section renderer collects all descriptors with the same `compoundGroup` and passes the array to a single control instance instead of creating individual controls.

### WebSocket Messages

```typescript
// New ClientMessage variants
| {
    type: "updateProperty";
    filePath: string;
    lineNumber: number;
    columnNumber: number;
    property: string;
    cssProperty: string;
    value: string;                // always resolved CSS value: "24px", "#3b82f6"
    tailwindPrefix: string;
    tailwindToken: string | null; // "6" if maps to token, null if arbitrary
    relatedPrefixes?: string[];
    originalValue: string;        // previous CSS value for undo
    framework: "tailwind";        // v1 only supports Tailwind. "inline" deferred to v2.
  }
| {
    type: "updateProperties";     // batch — single AST parse, single write
    filePath: string;
    lineNumber: number;
    columnNumber: number;
    updates: Array<{
      property: string;
      cssProperty: string;
      value: string;
      tailwindPrefix: string;
      tailwindToken: string | null;
      relatedPrefixes?: string[];
      originalValue: string;
    }>;
    framework: "tailwind";        // v1 only supports Tailwind. "inline" deferred to v2.
  }

// New ServerMessage variants
| { type: "updatePropertyComplete"; success: boolean; error?: string }
| { type: "tailwindTokens"; tokens: TailwindTokenMap }
```

The `value` is always the resolved CSS value. `tailwindToken` is the scale step if one matches, or `null` for arbitrary values. CLI logic: if `tailwindToken !== null` → write `prefix-token` (e.g. `p-6`); if `null` → write `prefix-[value]` (e.g. `p-[24px]`).

### TailwindTokenMap

```typescript
// Uses Record (not Map) because this is JSON-serialized over WebSocket.
// The browser converts to Map internally for O(1) lookup after receiving.
interface TailwindTokenMap {
  spacing: Record<string, string>;          // "4" → "16px"
  colors: Record<string, string>;           // "blue-500" → "#3b82f6"
  fontSize: Record<string, string>;         // "lg" → "18px"
  fontWeight: Record<string, string>;       // "bold" → "700"
  borderRadius: Record<string, string>;     // "lg" → "8px"
  opacity: Record<string, string>;          // "50" → "0.5"
  spacingReverse: Record<string, string>;   // "16px" → "4"
  colorsReverse: Record<string, string>;    // "#3b82f6" → "blue-500"
  fontSizeReverse: Record<string, string>;
  fontWeightReverse: Record<string, string>;
  borderRadiusReverse: Record<string, string>;
  letterSpacing: Record<string, string>;    // "tight" → "-0.025em"
  lineHeight: Record<string, string>;       // "6" → "1.5rem" (leading-6)
  letterSpacingReverse: Record<string, string>;
  lineHeightReverse: Record<string, string>;
  opacityReverse: Record<string, string>;
}

// Scale reuse: gap uses the "spacing" scale (tailwindScale: "spacing").
// letter-spacing uses "letterSpacing", line-height uses "lineHeight".

// Note on tailwindScale naming: descriptors use camelCase keys matching the
// TailwindTokenMap field names (e.g. tailwindScale: "fontSize", not "font-size").
// This differs from cssProperty which uses kebab-case. The mapping:
//   cssProperty: "font-size"  → tailwindScale: "fontSize"
//   cssProperty: "border-radius" → tailwindScale: "borderRadius"
```

Browser reads CSS custom properties from live page (fast, works for v3 and v4). CLI sends the full resolved config on connection via `tailwindTokens` message. Browser merges both sources — CLI tokens include project-specific extensions not on the current page.

---

## Controller Lifecycle

### State

```typescript
interface PropertyControllerState {
  selectedElement: HTMLElement | null;
  componentInfo: ComponentInfo | null;  // ComponentInfo (not ComponentRef) — has columnNumber
  elementIdentity: ElementIdentity | null;
  currentValues: Map<string, string>;      // key → resolved CSS value
  originalValues: Map<string, string>;     // key → value at selection time
  activeOverrides: Map<string, string>;    // key → inline style currently applied
  pendingBatch: Map<string, PendingUpdate>;
}

interface ElementIdentity {
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  tagName: string;
}

interface PendingUpdate {
  property: string;
  cssProperty: string;
  value: string;
  tailwindPrefix: string;
  tailwindToken: string | null;
  relatedPrefixes?: string[];
  originalValue: string;
}
```

### Flow

```
1. INSPECT — element selected
   controller.inspect(element, componentInfo)
   → receives ComponentInfo (which includes columnNumber), not ComponentRef
   → stores ElementIdentity for HMR re-acquisition
   → reads getComputedStyle for all ~30 descriptors → currentValues + originalValues
   → renders sidebar via section-renderer
   → sidebar slides in

2. PREVIEW — user interacts with control (drag, scrub, type)
   controller.preview(descriptorKey, cssValue)
   → applies element.style[cssProperty] = cssValue (Layer 1 — instant)
   → updates activeOverrides + currentValues
   → calls setValue() on any related controls (e.g. corner handle ↔ sidebar sync)
   → adds to pendingBatch
   → NO network, NO file write

3. COMMIT — interaction ends (mouseup, blur, Enter, click new element, click empty space)
   controller.commit()
   → if pendingBatch.size === 1 → sends updateProperty
   → if pendingBatch.size > 1 → sends updateProperties (batch)
   → pushes to canvas undo stack (type: "propertyChange")
   → clears pendingBatch
   → inline overrides remain until HMR rebuilds DOM

4. CANCEL — user presses Escape while preview is active
   controller.cancel()
   → reverts all activeOverrides: element.style[prop] = originalValues[prop]
   → clears activeOverrides + pendingBatch

5. DESELECT — Escape with no active preview
   controller.deselect()
   → clears all state
   → sidebar slides out
```

### Commit-on-Focus-Change Rule

Clicking a new element or clicking empty space with `activeOverrides.size > 0` calls `commit()` then proceeds to `inspect()` or `deselect()`. Only an explicit Escape calls `cancel()`. Rationale: losing edits silently because the user clicked somewhere else would be infuriating. Matches text editor behavior — switching focus commits.

### Batch Window

When the user edits "all padding" via box model center:

```
User types "16" → controller.preview for all 4 sides → 4 inline styles applied instantly
                → 4 entries in pendingBatch
User presses Enter → controller.commit()
                   → sends single updateProperties with 4 updates
                   → CLI: one AST parse, one file write, one HMR reload
```

### Segmented Control Behavior

Clicking a segment is simultaneously preview and commit — no pending state, no cancel path:

```
Click "column" in flex-direction
  → onPreview("column") — applies inline style
  → onCommit() — sends WebSocket message immediately
```

Undo via Ctrl+Z still works (undo stack captured the change).

---

## Sidebar UI

### Container

- Right edge of viewport, full height, overlays page content (does not push it)
- **Resizable**: drag handle on left edge. 260px min, 380px max. Default: `min(280, viewportWidth * 0.22)`
- Width persisted to `localStorage`
- Semi-transparent backdrop or solid white with shadow
- Slides in on selection, slides out on deselection (CSS transform transition)
- Lives inside Shadow DOM alongside tools panel

### Header

Component name + file path:line number. Same information as the contextual label floating near the element — complementary, not redundant.

### Sections

Seven collapsible sections: Layout, Spacing, Size, Typography, Background, Border, Effects. Each section header is sticky during scroll. All sections expanded by default.

### Control Types

**Number Scrub** (~20 properties: spacing, dimensions, font-size, line-height, border-width, border-radius, gap)
- Text input showing current value + label showing Tailwind token name (or dashed underline if arbitrary)
- Drag horizontally to scrub — snaps to Tailwind scale stops
- Snap points include all tokens from resolved scale AND the current arbitrary value if off-scale
- Current arbitrary value is always a valid stop — user can scrub away and back without losing precision
- Tactile feedback: brief scale animation (102% → 100%, 80ms) on token label at each snap point
- Type to edit — Enter or blur commits. Exact value → token if match exists, arbitrary if not
- Arrow Up/Down: increment/decrement by one scale step

**Segmented Control** (display, flex-direction, justify-content, align-items, text-align, border-style)
- Icons for each option (directional arrows for flex, alignment patterns for justify, etc.)
- Click → onPreview + onCommit immediately (no pending state)
- Disabled state for values not applicable in context (e.g. justify-content when display is block)

**Font Weight Segmented** — all 9 standard weights (100-900). No attempt to detect available font weights — let CSS fallback handle it.

**Color Swatch** (color, background-color, border-color)
- Small colored square + text input showing Tailwind name (`blue-500`) or hex value
- Click swatch → opens existing color picker with project Tailwind palette as presets (grouped by hue)
- Text input accepts Tailwind names or hex values. `#` prefix → hex. Otherwise → token lookup. Invalid token → red border + brief shake
- Live preview: `element.style[cssProperty] = hex` on every picker change

**Slider** (opacity)
- Horizontal 0–100, snaps to Tailwind opacity scale (0, 5, 10, 20, 25, 30... 100)
- Number input beside it for precision
- Drag for exploration, type for precision

**Box Model** (padding + margin)
- Nested rectangles: outer = margin, inner = padding, center = content dimensions
- Click side label → editable input for that side. Single updateProperty on commit
- Click inner center → all 4 padding inputs. Batch updateProperties on commit
- Click outer center → all 4 margin inputs. Batch updateProperties on commit
- Live preview updates both the element and the diagram labels

**Border Radius Corner Handles** (on-canvas, not in sidebar)
- Four circular handles at element corners in the selection overlay
- Drag → `controller.preview()` → sidebar number-scrub updates via `setValue()` (bidirectional sync)
- Release → `controller.commit()`
- Shift+drag → adjusts all four corners uniformly (batch)

### Keyboard Navigation

- Tab moves between inputs in the panel, triggers commit on blur
- Arrow keys increment/decrement focused number value by one scale step
- Escape cancels active preview or deselects

---

## CLI-Side Transforms

### updateClassName Function

```typescript
function updateClassName(
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  updates: Array<{
    tailwindPrefix: string;
    tailwindToken: string | null;
    value: string;
    relatedPrefixes?: string[];
  }>
): string
```

**Algorithm:**

1. Parse file with jscodeshift (same parser detection as reorderComponent)
2. Find JSX element at lineNumber:columnNumber. Column numbers use jscodeshift's
   0-indexed convention (`loc.start.column`). The overlay converts React's 1-indexed
   `columnNumber` (from source maps) by subtracting 1 before sending the message.
   When multiple JSX elements share the same line, columnNumber disambiguates.
3. Find className attribute
   - If no className exists, create one with the new class(es)
   - String literal: modify directly
   - Template literal: modify static parts
   - `cn()`/`clsx()`/`classnames()`: scan ALL string literal arguments (not just first). Find the arg containing the matching prefix. If prefix is inside a conditional expression (`isActive && "p-4"`), return error — don't modify dynamic classes
4. For each update:
   - Build target class: `tailwindToken !== null` → `prefix-token`, else → `prefix-[value]`
   - Scan existing classes for matches on `tailwindPrefix` or any `relatedPrefixes`
   - If matched class is from a related shorthand prefix → split (see below)
   - Replace old class with new class
5. Write modified source, preserve quote style

### Shorthand Splitting

When editing an individual side and the element has a shorthand class:

```
Input:  className="flex px-4 py-2 bg-white"
Edit:   paddingLeft → pl-6

Step 1: Scan for "pl-*", "p-*", "px-*"
Step 2: Found "px-4" (matches relatedPrefix "px")
Step 3: px-4 provides padding-left + padding-right
Step 4: Remove "px-4", add "pl-6" (new) + "pr-4" (preserved)

Result: className="flex pl-6 pr-4 py-2 bg-white"
```

Splitting rules encoded as a lookup table:

```typescript
const SHORTHAND_SPLITS: Record<string, Record<string, string[]>> = {
  "pl": { "px": ["pl-{new}", "pr-{v}"], "p": ["pl-{new}", "pr-{v}", "pt-{v}", "pb-{v}"] },
  "pr": { "px": ["pl-{v}", "pr-{new}"], "p": ["pl-{v}", "pr-{new}", "pt-{v}", "pb-{v}"] },
  "pt": { "py": ["pt-{new}", "pb-{v}"], "p": ["pl-{v}", "pr-{v}", "pt-{new}", "pb-{v}"] },
  "pb": { "py": ["pt-{v}", "pb-{new}"], "p": ["pl-{v}", "pr-{v}", "pt-{v}", "pb-{new}"] },
  // Margin — same pattern as padding
  "ml": { "mx": ["ml-{new}", "mr-{v}"], "m": ["ml-{new}", "mr-{v}", "mt-{v}", "mb-{v}"] },
  "mr": { "mx": ["ml-{v}", "mr-{new}"], "m": ["ml-{v}", "mr-{new}", "mt-{v}", "mb-{v}"] },
  "mt": { "my": ["mt-{new}", "mb-{v}"], "m": ["ml-{v}", "mr-{v}", "mt-{new}", "mb-{v}"] },
  "mb": { "my": ["mt-{v}", "mb-{new}"], "m": ["ml-{v}", "mr-{v}", "mt-{v}", "mb-{new}"] },

  // Border radius — three-level hierarchy:
  //   rounded (all) → rounded-t/r/b/l (side pairs) → rounded-tl/tr/br/bl (corners)
  // Editing a corner must split both the full shorthand AND the side shorthand.
  "rounded-tl": {
    "rounded-t": ["rounded-tl-{new}", "rounded-tr-{v}"],
    "rounded-l": ["rounded-tl-{new}", "rounded-bl-{v}"],
    "rounded": ["rounded-tl-{new}", "rounded-tr-{v}", "rounded-br-{v}", "rounded-bl-{v}"],
  },
  "rounded-tr": {
    "rounded-t": ["rounded-tl-{v}", "rounded-tr-{new}"],
    "rounded-r": ["rounded-tr-{new}", "rounded-br-{v}"],
    "rounded": ["rounded-tl-{v}", "rounded-tr-{new}", "rounded-br-{v}", "rounded-bl-{v}"],
  },
  "rounded-br": {
    "rounded-b": ["rounded-br-{new}", "rounded-bl-{v}"],
    "rounded-r": ["rounded-tr-{v}", "rounded-br-{new}"],
    "rounded": ["rounded-tl-{v}", "rounded-tr-{v}", "rounded-br-{new}", "rounded-bl-{v}"],
  },
  "rounded-bl": {
    "rounded-b": ["rounded-bl-{new}", "rounded-br-{v}"],
    "rounded-l": ["rounded-tl-{v}", "rounded-bl-{new}"],
    "rounded": ["rounded-tl-{v}", "rounded-tr-{v}", "rounded-br-{v}", "rounded-bl-{new}"],
  },
};
```

**No shorthand recombination in v1.** If individual sides are edited across separate commits, they stay as individual classes. Exception: when a batch update sets all four sides to the same value (box model center edit), the transform writes the shorthand directly since the intent is explicit in the batch message.

### className Format Handling

| Format | v1 Support |
|--------|-----------|
| String literal `"flex p-4"` | Full |
| Template literal `` `flex p-4 ${...}` `` | Static parts only |
| `cn("flex", "p-4", ...)` | Scan all string args, skip conditionals |
| Pure dynamic expression | Error: "Cannot modify dynamic className" |
| No className prop | Creates the prop |

### CSS Specificity Conflict Detection

After HMR re-acquisition, compare the element's computed style for the edited property against the expected value. If they differ, a non-Tailwind CSS rule is overriding the Tailwind class. Show warning toast: "Property may be overridden by another CSS rule." Does not attempt to fix — makes the user aware.

---

## Tailwind Config Resolution (CLI)

```typescript
// packages/cli/src/tailwind-resolver.ts

interface TailwindConfig {
  version: 3 | 4;
  tokens: TailwindTokenMap;
}

function resolveTailwindConfig(projectRoot: string): TailwindConfig
```

**Detection:**
1. Read `node_modules/tailwindcss/package.json` → major version
2. v3: `require('tailwind.config.js')` → `resolveConfig()` → extract theme scales
3. v4: Parse CSS file with `@theme` directives or use v4 JS API

**Sent to browser** on WebSocket connection via `tailwindTokens` message. Browser merges with CSS custom properties read from live page.

---

## HMR Survival

### Detection

MutationObserver only — no framework-specific event listeners. Universal across Vite, Next.js, Webpack, Turbopack.

```typescript
const observer = new MutationObserver(() => {
  if (selectedElement && !document.contains(selectedElement)) {
    clearTimeout(reacquireTimer);
    reacquireTimer = setTimeout(reacquireElement, 50);
  }
});
observer.observe(document.body, { childList: true, subtree: true });
```

50ms debounce lets React finish its commit phase before re-acquisition.

### Re-acquisition

1. Use `ElementIdentity` (componentName, filePath, lineNumber, columnNumber)
2. Walk React fiber tree (via bippy) looking for matching debug source
3. **Bounded search**: max 500 nodes or 100ms. Abort → deselect with toast
4. On success: `controller.inspect(newElement, componentRef)` — re-reads computed styles, sidebar updates in place (no slide animation), activeOverrides cleared (DOM was rebuilt)
5. On failure: `controller.deselect()`, toast: "Selection lost — element was modified"

React elements only. No DOM selector fallback for non-React elements — just deselect.

### Post-HMR Validation

After re-acquisition, compare computed style of edited properties to expected values. If mismatch detected (CSS specificity conflict), show warning toast.

---

## Undo Integration

### Canvas Undo (new action type)

```typescript
| {
    type: "propertyChange";
    elementIdentity: ElementIdentity;
    element: HTMLElement;          // runtime reference (not serializable)
    overrides: Array<{ cssProperty: string; previousValue: string; newValue: string }>;
  }
```

**Integration with `canvasUndo()`:** The existing `canvasUndo()` returns `string | null` and has no WebSocket dependency. For `propertyChange`, `canvasUndo()` reverts inline styles on the element (same pattern as `colorChange` handling) and returns `"property reverted"`. The **caller** of `canvasUndo()` (the keyboard handler in `interaction.ts`) inspects the returned action type and conditionally sends the CLI undo message. This keeps `canvasUndo()` pure of WebSocket side effects:

```typescript
// In the Ctrl+Z handler:
const action = peekUndoStack();  // new helper: peek without popping
if (action?.type === "propertyChange") {
  const visualResult = canvasUndo();  // pops + reverts inline styles
  // Only send CLI undo if this was the most recent CLI operation (LIFO constraint)
  if (isLatestCliOperation(action)) {
    ws.send(JSON.stringify({ type: "undo" }));
  }
}
```

Canvas undo reverts inline styles on the element and sends a file undo to the CLI (same `undo` message type, CLI restores previous file content from its undo stack).

**LIFO constraint:** The CLI undo stack is a simple LIFO stack shared across all operations (reorder, property changes). Canvas property undo can only revert the CLI file change if it corresponds to the most recent CLI undo entry. If the user makes a property change, then a reorder, then tries to undo the property change, the canvas undo reverts the inline styles (visual) but does NOT send a file undo — because `undoStack.pop()` would undo the reorder, not the property change. In this case, the user sees the visual revert but the source file retains the property change until they undo the reorder first. A targeted undo mechanism is deferred to v2.

### Cancel Path

Escape during active preview → revert all `activeOverrides` to `originalValues` inline styles. No file write, no undo entry. Element snaps back to original appearance.

---

## Integration Points

### Existing Codebase

1. **Pointer tool** — after `resolveComponentAtPoint()`, calls `controller.inspect(element, componentInfo)` with the full `ComponentInfo` (which includes `columnNumber`). Sidebar appears alongside the existing contextual label
2. **Canvas state** — new `CanvasUndoAction` type for property changes
3. **WebSocket** — new cases in `server.ts` `processQueue` switch
4. **Color picker** — reused by color-swatch control, presets replaced with project Tailwind palette
5. **Shadow DOM** — sidebar rendered inside `#sketch-ui-root`
6. **Design tokens** — sidebar uses existing `COLORS`, `SHADOWS`, `RADII`, `TRANSITIONS`, `FONT_FAMILY`

### New Shared Types

Added to `packages/shared/src/types.ts`:
- `PropertyDescriptor`, `PropertyGroup`, `ControlType`, `EnumOption`
- `updateProperty` and `updateProperties` client messages
- `updatePropertyComplete` and `tailwindTokens` server messages
- `TailwindTokenMap` interface
- `propertyChange` canvas undo action type
