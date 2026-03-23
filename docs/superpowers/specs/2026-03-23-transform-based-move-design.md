# Transform-Based Move System

**Date:** 2026-03-23
**Status:** Approved
**Replaces:** Ghost-clone move system (`ghost-layer.ts`)

## Problem

When a component is moved via the Move tool, the system clones the element and hides the original. This causes:

1. Property panel edits apply to the hidden original — changes are invisible
2. The ghost clone diverges from the real element (no React state, event listeners, or HMR updates)
3. The clone looks visually detached from the page — clearly not part of the project

## Solution

Move the actual DOM element using CSS `transform: translate(dx, dy)` instead of cloning. Insert a box-model-accurate placeholder to prevent layout shift. The move is an annotation (visual instruction for the generate step), not a literal code change.

## Move Mechanism

### On Drag Start

1. Record `element.getBoundingClientRect()` as `originalRect`
2. Snapshot `element.style.cssText` as `originalCssText`
3. Create a placeholder `div` with box-model properties copied from `getComputedStyle(element)`:
   - `width`, `height`, `margin` (all four sides), `padding` (all four sides), `boxSizing`
   - For flex/grid children, also copy: `flex`, `flexGrow`, `flexShrink`, `flexBasis`, `gridColumn`, `gridRow`, `alignSelf`, `justifySelf`, `order`
   - `visibility: hidden`
4. Insert placeholder before the element in the DOM
5. **Position handling based on current computed position:**
   - `static`: Set `position: relative`, apply `transform: translate(dx, dy)`
   - `relative`: Preserve `position: relative`, compose translate with existing transform (see Transform Composition below)
   - `absolute` / `fixed` / `sticky`: Skip placeholder insertion (element is already out of flow). Apply `transform: translate(dx, dy)` composed with any existing transform.
6. Override `transition: none !important` during drag to prevent sluggish following when the element has CSS transitions on transform
7. Apply `transform` as the user drags (composed — see below)
8. Add subtle elevated shadow + `scale(1.02)` during drag to signal movement

### On Drag End

1. Remove the drag shadow, scale, and `transition: none` override — settle to composed transform with translate only
2. Record the annotation: `{ componentRef, delta: {dx, dy}, originalRect }`
3. Element stays transformed until undo or canvas clear

### Transform Composition

Elements may already have CSS transforms (e.g., `rotate(45deg)`, `scale(0.5)`). The move must compose, not overwrite.

**Strategy:** Read `getComputedStyle(element).transform` before any modification (this is part of the `originalCssText` snapshot). During drag, set:

```
element.style.transform = `translate(${dx}px, ${dy}px) ${existingTransform}`
```

Where `existingTransform` is the original computed transform value (or empty string if `none`). The translate is prepended so it operates in screen space regardless of the element's existing rotation/scale.

**Note on matrix representation:** `getComputedStyle().transform` returns a `matrix(...)` string, not the authored `rotate(45deg) scale(0.5)`. So during the move, the composed transform is `translate(dx, dy) matrix(...)` — visually identical but not human-readable. This is fine because: (a) undo restores the original `cssText` which preserves the authored form, and (b) the matrix is only used transiently during the move session.

### Why This Works for Property Panel

The element is real. `getComputedStyle()` returns real values. Inline style changes are immediately visible. HMR updates flow through naturally. Zero changes needed to `property-sidebar.ts` or `property-controller.ts`.

## State Model

### MoveEntry (replaces GhostEntry)

```typescript
interface MoveEntry {
  id: string;                    // crypto.randomUUID()
  componentRef: ComponentRef;
  element: HTMLElement;
  placeholder: HTMLElement | null; // null for absolute/fixed/sticky elements
  originalRect: DOMRect;
  delta: { dx: number; dy: number };
  originalCssText: string;       // full element.style.cssText snapshot
  existingTransform: string;     // computed transform before move (for composition)
}
```

State stored in `canvas-state.ts` as `moves: Map<string, MoveEntry>` (replaces `ghosts` map).

### Undo Action Types

Replace `ghostCreate` and `ghostMove` with:

- **`moveCreate`** — pushed when a move is first created. Payload: `{ moveId: string }`. Undo: restore `cssText`, remove placeholder, delete `MoveEntry`.
- **`moveDelta`** — pushed when an already-moved element is dragged again. Payload: `{ moveId: string, previousDelta: {dx, dy} }`. Undo: restore the previous delta and reapply the composed transform.

### Undo Behavior

For `moveCreate`:
1. Restore `element.style.cssText = entry.originalCssText`
2. If `entry.placeholder`, remove it from DOM
3. Delete `MoveEntry` from state map

For `moveDelta`:
1. Set `entry.delta = previousDelta`
2. Reapply `element.style.transform = translate(previousDelta) + existingTransform`

### Serialization

`serializeAnnotations()` output changes from:

```typescript
// Old
moves: [{ component, file, line, from: {x, y}, to: {x, y} }]

// New
moves: [{ component, file, line, originalRect, delta: {dx, dy} }]
```

The generate step receives the same semantic information — where the component was, where the user wants it — expressed as a delta.

## Eye Toggle (Before/After Comparison)

The existing eye toggle (`setOriginalsHidden`) is repurposed:

- **On (default):** All moved elements have their transforms applied (moved state)
- **Off:** Temporarily clear transforms on all moved elements — they snap back to original positions
- **Toggle back on:** Re-apply composed transforms from `MoveEntry.delta` + `existingTransform`

Same UX intent (compare before/after), different implementation (remove/restore transforms instead of show/hide originals).

## Nested Moves

If a parent element is moved and then a child within it is also moved, both get their own `MoveEntry`. The child's transform is relative to the parent's transformed position (CSS transforms nest naturally). The child's placeholder sits inside the parent. On undo, each is independent — undoing the child's move doesn't affect the parent, and undoing the parent's move leaves the child's relative offset intact.

**Edge case with scaled parents:** The child's delta is captured in screen-space pixels (from mouse movement). If the parent has `scale(0.5)`, dragging the child 100px on screen produces `translate(100px, 0)` prepended before the parent's scale — visually correct during drag. But if the parent's move is later undone (removing the scale context), the child's 100px translate now operates in a different visual scale. This is an acceptable trade-off: the nested-move-then-partial-undo scenario is rare, and the user can re-drag the child to adjust.

## Scroll Containers

`originalRect` is captured via `getBoundingClientRect()` (viewport-relative). During drag, the delta is computed from the initial mouse position, not from `originalRect`, so scroll changes during drag don't corrupt the delta. If the container scrolls between moves, the element's visual position changes but the stored delta remains correct — the transform is relative to the element's flow position, not absolute viewport coordinates.

## HMR Survival

When HMR replaces a component, the DOM element in `MoveEntry.element` goes stale. Without re-acquisition, all active moves silently break. The property controller already solves this problem via `ElementIdentity`-based re-acquisition — the move system uses the same pattern.

### MoveEntry additions for HMR

```typescript
interface MoveEntry {
  // ... existing fields ...
  identity: ElementIdentity;     // { componentName, filePath, lineNumber, columnNumber, tagName }
}
```

`identity` is captured at move creation time from the component's fiber metadata (same source as `property-controller.ts`).

### Re-acquisition flow

1. **Detect:** Use a MutationObserver on each moved element's parent. When the element is removed from the DOM, start a re-acquisition timer (80ms delay, matching property controller).
2. **Find:** Walk the DOM looking for an element matching `identity` (same component name, file, line). Use the same `reacquireElement()` logic from property controller.
3. **Restore:** If found:
   - Update `entry.element` to the new DOM element
   - Snapshot new `originalCssText` (HMR may have changed inline styles)
   - Re-insert placeholder before the new element (if applicable)
   - Re-apply the composed transform (`translate(delta) + existingTransform`)
   - Re-apply `position: relative` if the element was static
4. **Fail gracefully:** If not found after timeout, remove the `MoveEntry` and its placeholder. Show a toast: "Component [name] was removed — move annotation cleared."

### Coordination with property controller

Both systems observe the same element. To avoid duplicate observers, the move system hooks into the property controller's existing HMR observation when the moved element is also selected. When the element is not selected (no property panel open), the move system runs its own observer.

## Impact on Existing Code

### Removed Entirely

- `ghost-layer.ts` — no more clones
- `GhostEntry` type and ghost map in `canvas-state.ts`
- `onGhostPositionUpdate`, `setGhostDragging`, `setGhostSettled` helpers
- Ghost-related wrapper sync logic in `canvas-transform.ts`

### Modified

| File | Change |
|------|--------|
| `canvas-state.ts` | `ghosts` map → `moves` map with `MoveEntry`. Undo action types: `moveCreate`, `moveDelta`. Serialization uses delta format. Eye toggle repurposed. Remove `selectedGhost` tracking — no longer needed since `getBoundingClientRect()` on the real element returns the transformed position. |
| `selection.ts` | Remove `findGhostAtPoint()`, `selectedGhost` variable, and all ghost branching. Selection works naturally — `getBoundingClientRect()` accounts for CSS transforms automatically. |
| `tools/move.ts` | **Full rewrite.** Replace ghost creation/management with transform application. Remove all imports of ghost helpers (`createGhost`, `findGhostAtPoint`, `setGhostDragging`, `setGhostSettled`, `hasGhostForElement`, `moveGhost`, `updateGhostPosition`). Implement placeholder creation, transform composition, transition override, and drag animation. |
| `interaction.ts` | Update `getPageElementAtPoint()` to remove `data-frameup-ghost` filtering. |
| `index.ts` | Swap `initGhostLayer()` for new move system init. Remove `onGhostPositionUpdate` wiring. Wire up HMR re-acquisition for move entries. |
| `canvas-transform.ts` | Remove ghost-filtering check (`data-frameup-ghost` attribute check when moving children into wrapper). |
| `component-filter.ts` | Remove `data-frameup-ghost` attribute check. |
| `highlight-canvas.ts` | Remove `data-frameup-ghost` attribute on canvas element (no longer meaningful). |
| `tools/text.ts` | Review `data-frameup-ghost` attribute usage — replace with appropriate FrameUp marker if still needed for filtering. |
| `design-tokens.ts` | Update comment referencing "ghost shadow on drop." |

### Unchanged

| File | Reason |
|------|--------|
| `property-sidebar.ts` | Element is real — works as-is |
| `property-controller.ts` | Element is real — works as-is |
| `annotation-layer.ts` | Unrelated system |
| `drag.ts` (reorder) | Separate system, untouched |

## Placeholder Box-Model Matching

The placeholder must be an exact space match for the original element. Copy from `getComputedStyle(element)`:

- `display` (a flex item with `display: inline-flex` behaves differently than a `display: block` placeholder)
- `width`, `height`
- `margin` (top, right, bottom, left)
- `padding` (top, right, bottom, left)
- `boxSizing`
- Flex/grid properties: `flex`, `flexGrow`, `flexShrink`, `flexBasis`, `gridColumn`, `gridRow`, `alignSelf`, `justifySelf`, `order`

Set `visibility: hidden` on the placeholder. This prevents surrounding layout from shifting regardless of the element's box model or parent layout mode.

**Skip placeholder** for elements with `position: absolute | fixed | sticky` — they are already out of flow.

## Design Decisions

1. **Transform composition over replacement:** Prepend `translate(dx, dy)` to existing transforms so the translate operates in screen space. This preserves the element's visual identity (rotation, scale) while moving it.

2. **Full cssText snapshot vs. individual properties:** `cssText` catches everything — position, transform, zIndex, boxShadow, transition, and any other properties modified during drag animation. One string, never miss a property.

3. **Delta-based annotation vs. absolute coordinates:** Delta is more robust — if the page layout changes between annotation and generation, the intent ("move this 200px right and 50px down") is preserved. Absolute coordinates would be invalidated by layout shifts.

4. **Transition override during drag:** `transition: none !important` prevents the element from animating to the cursor instead of snapping to it. Removed on drag end so the element can animate normally afterward.

5. **Position-aware placeholder strategy:** Static/relative elements need placeholders to hold their space. Absolute/fixed/sticky elements don't — they're already out of flow, and inserting a placeholder would create phantom space.
