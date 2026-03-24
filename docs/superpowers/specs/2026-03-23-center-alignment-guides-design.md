# Center Alignment Guides — Design Spec

**Date:** 2026-03-23
**Status:** Approved

## Overview

Add Google Slides-style center alignment guides to the move tool. When dragging an element, dashed guide lines appear when the element is horizontally and/or vertically centered within its parent container. The element snaps to center within a 5px threshold and breaks free when the mouse moves beyond that threshold.

## Behavior

- **Trigger:** Active during move tool drag (`onMouseMove`)
- **Reference frame:** The dragged element's direct DOM parent
- **Snap threshold:** 5px — if the element's center is within 5px of the parent's center on either axis, snap to exact center
- **Break free:** Snap releases naturally when raw mouse delta exceeds the snap offset (no modifier key needed)
- **Visual:** Dashed guide lines spanning the parent bounds, drawn at the parent's center axis
- **Cleanup:** Guides disappear instantly on `mouseUp`

## Architecture

Three touchpoints, one new file:

### 1. `snap-guides.ts` (new file)

Pure-function module with no DOM dependencies. Computes snap-adjusted deltas and guide line coordinates.

**Coordinate space:** All rects and guide coordinates are in **viewport space** (from `getBoundingClientRect()`), matching the highlight canvas coordinate system (`position:fixed`). The deltas (`rawDx`/`rawDy`) are in **page space** (from `viewportToPage()` in the move handler). Since `getBoundingClientRect()` already accounts for CSS transforms including canvas zoom/pan, the snap comparison (element center vs parent center) is done entirely in viewport space. The function computes a **viewport-space correction** (how many viewport pixels to shift), then converts it back to page space by dividing by canvas scale for the returned `dx`/`dy`.

**Scale assumption:** `canvasScale` is a single uniform number (`getCanvasTransform()` returns `{ scale, offsetX, offsetY }`). The viewport→page conversion (`offset / canvasScale`) assumes uniform scaling with no rotation. If the transform model ever gains separate x/y scales or rotation, `computeSnap` must be updated to accept `scaleX`/`scaleY`. Add a comment in the implementation noting this assumption.

```typescript
interface SnapGuides {
  /** Vertical guide line (element centered horizontally) */
  verticalLine: { x: number; top: number; bottom: number } | null;
  /** Horizontal guide line (element centered vertically) */
  horizontalLine: { y: number; left: number; right: number } | null;
}

interface SnapResult {
  dx: number;       // snap-adjusted delta X (page space, for move handler)
  dy: number;       // snap-adjusted delta Y (page space, for move handler)
  snappedX: boolean;
  snappedY: boolean;
  guides: SnapGuides; // viewport space, for highlight canvas
}

function computeSnap(
  elemRect: DOMRect,      // element's current viewport rect (includes transform)
  parentRect: DOMRect,    // parent's current viewport rect
  rawDx: number,          // raw page-space delta from move handler
  rawDy: number,          // raw page-space delta from move handler
  threshold: number,      // snap threshold in viewport pixels
  canvasScale: number,    // current canvas zoom scale (for vp↔page conversion)
): SnapResult;
```

**Logic:**
1. Compute element center in viewport space: `elemCenterX = elemRect.left + elemRect.width / 2`
2. Compute parent center in viewport space: `parentCenterX = parentRect.left + parentRect.width / 2`
3. Compute offset: `offsetX = parentCenterX - elemCenterX`
4. If `|offsetX| < threshold` → snap: adjust dx by `offsetX / canvasScale` (convert viewport correction to page space), set `snappedX: true`, populate `verticalLine` with `{ x: parentCenterX, top: parentRect.top, bottom: parentRect.bottom }`
5. Same for Y axis
6. If not within threshold → pass through `rawDx`/`rawDy` unchanged, guides are `null`

The snap adjusts the delta, not the mouse position. When the raw delta moves the element center beyond the threshold from parent center, snap breaks naturally.

### 2. `highlight-canvas.ts` (modified)

Add guide line rendering to the existing `tick()` draw loop.

**New state:**
- `activeGuides: SnapGuides | null` — set via new exports

**New exports:**
- `setSnapGuides(guides: SnapGuides): void` — updates active guides and schedules a frame
- `clearSnapGuides(): void` — clears guides and schedules a frame

**Rendering (in `tick()`, after selection rects, before handles):**

Guide rendering is non-animated — a single frame is sufficient (no `needsMore` participation needed). `setSnapGuides`/`clearSnapGuides` each call `scheduleFrame()` to trigger one redraw. Note: `scheduleFrame()` guarantees at least one `tick()` fires via `requestAnimationFrame`, so `clearSnapGuides()` on mouseUp will always produce a frame that clears the lines — no risk of ghost guides stuck on screen.

Draw procedure:
1. Save canvas state: `ctx.save()`
2. Set style: `ctx.globalAlpha = 0.6`, `ctx.strokeStyle = COLORS.accent`, `ctx.lineWidth = 1`, `ctx.setLineDash([4, 4])`
3. If `verticalLine`: `moveTo(x, top)` → `lineTo(x, bottom)` → `stroke()`
4. If `horizontalLine`: `moveTo(left, y)` → `lineTo(right, y)` → `stroke()`
5. Restore canvas state: `ctx.restore()` — this automatically resets `globalAlpha`, `setLineDash`, and `strokeStyle`, matching the existing cleanup pattern

### 3. `tools/move.ts` (modified)

Integrate snap calculation into the drag loop.

**In `onMouseMove` — ordering is critical:**
1. Compute raw `dx`/`dy` in page space as before
2. **First apply the raw transform** so `getBoundingClientRect()` reflects the current frame's position: `applyDragVisual(dragEntry.element, rawDx, rawDy, dragEntry.existingTransform)`
3. Get parent element: `const parent = dragEntry.element.parentElement`
4. If no parent or parent is `document.body` or `document.documentElement` → skip snap, use raw deltas, call `clearSnapGuides()`, done
5. **Read rects after transform applied:** `dragEntry.element.getBoundingClientRect()` and `parent.getBoundingClientRect()` — this ensures snap computes against the current position, not the previous frame
6. Get canvas scale from `getCanvasTransform().scale`
7. Call `computeSnap(elemRect, parentRect, rawDx, rawDy, 5, canvasScale)`
8. If snapped, **re-apply with adjusted deltas:** `applyDragVisual(dragEntry.element, result.dx, result.dy, dragEntry.existingTransform)` — this corrects the position to the snap point in the same frame (no one-frame lag)
9. Update `dragEntry.delta` with `result.dx`/`result.dy`
10. Call `setSnapGuides(result.guides)`

**In `onMouseUp`:**
- Call `clearSnapGuides()` after `settleDragVisual`

## Edge Cases

- **No parent / body child:** skip snap, no guides shown
- **Parent smaller than element:** snap still works — centers can still align. Guide lines stay within parent bounds.
- **Full-viewport wrapper parents** (e.g., `<main>`, layout shells spanning the viewport): snap will fire but centering within a full-width container is visually meaningless (parent center ≈ page center). Not worth over-engineering a heuristic for — watch in testing, acceptable behavior.
- **Existing transform on element:** handled by the move system's `existingTransform` composition; `getBoundingClientRect()` returns the visual rect post-transform
- **Canvas zoom/pan:** `getBoundingClientRect()` returns viewport coords accounting for all CSS transforms. Snap comparison is in viewport space. Delta correction is divided by `canvasScale` to convert back to page space.
- **Detached element during drag:** if `parentElement` becomes null (e.g., HMR), skip snap gracefully

## Visual Style

| Property | Value |
|----------|-------|
| Line width | 1px |
| Line style | Dashed (4px dash, 4px gap) |
| Color | `COLORS.accent` (purple #A259FF) |
| Opacity | 60% |
| Span | Full parent bounds (not viewport) |
| Z-order | Drawn after selection rects, before handles |

## Testing

Unit tests for `computeSnap` (pure function, no DOM):
- No snap: element far from center → returns raw deltas, null guides
- X-only snap: element centered horizontally within threshold → snapped dx, vertical guide
- Y-only snap: element centered vertically within threshold → snapped dy, horizontal guide
- Both axes: centered on both → both guides present
- Threshold boundary: exactly at threshold → snaps; threshold + 1 → does not snap
- Canvas scale: verify delta correction scales correctly at 2x zoom
- Break free: verify snap releases when raw delta moves element beyond threshold
- Parent smaller than child: verify snap computes correctly and guide coordinates stay within parent bounds

## Files Changed

| File | Change |
|------|--------|
| `packages/overlay/src/snap-guides.ts` | New — pure snap computation |
| `packages/overlay/src/highlight-canvas.ts` | Add guide rendering to draw loop |
| `packages/overlay/src/tools/move.ts` | Integrate snap into drag |
