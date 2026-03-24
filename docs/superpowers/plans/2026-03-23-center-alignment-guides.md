# Center Alignment Guides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Google Slides-style center alignment snap guides that appear when dragging an element to center within its parent container.

**Architecture:** Pure snap computation module (`snap-guides.ts`) → guide rendering in existing highlight canvas → integration in move handler drag loop. Snap compares viewport-space rects, returns page-space deltas.

**Tech Stack:** TypeScript, Canvas 2D API, Vitest

**Spec:** `docs/superpowers/specs/2026-03-23-center-alignment-guides-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `packages/overlay/src/snap-guides.ts` | Create | Pure snap computation — no DOM deps |
| `packages/overlay/src/__tests__/snap-guides.test.ts` | Create | Unit tests for `computeSnap` |
| `packages/overlay/src/highlight-canvas.ts` | Modify | Add guide line rendering to draw loop |
| `packages/overlay/src/tools/move.ts` | Modify | Integrate snap into drag |

---

### Task 1: Create `snap-guides.ts` with `computeSnap` and tests

**Files:**
- Create: `packages/overlay/src/snap-guides.ts`
- Create: `packages/overlay/src/__tests__/snap-guides.test.ts`

- [ ] **Step 1: Write the test file**

```typescript
// packages/overlay/src/__tests__/snap-guides.test.ts
import { describe, it, expect } from "vitest";
import { computeSnap } from "../snap-guides.js";

/** Helper to create a mock DOMRect-like object */
function rect(left: number, top: number, width: number, height: number) {
  return { left, top, width, height, right: left + width, bottom: top + height, x: left, y: top, toJSON() {} } as DOMRect;
}

describe("computeSnap", () => {
  // Parent: 0,0 → 400x300. Center = (200, 150).
  const parentRect = rect(0, 0, 400, 300);

  it("returns raw deltas when element is far from center", () => {
    // Element at (10, 10), 50x50 → center (35, 35). Far from parent center (200, 150).
    const elemRect = rect(10, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 5, 5, 5, 1);
    expect(result.dx).toBe(5);
    expect(result.dy).toBe(5);
    expect(result.snappedX).toBe(false);
    expect(result.snappedY).toBe(false);
    expect(result.guides.verticalLine).toBeNull();
    expect(result.guides.horizontalLine).toBeNull();
  });

  it("snaps X only when horizontally centered within threshold", () => {
    // Element 50x50, center at x=198 → offset to parent center (200) is 2px < 5px threshold
    const elemRect = rect(173, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(true);
    expect(result.snappedY).toBe(false);
    expect(result.dx).toBe(2); // correction: 200 - 198 = 2
    expect(result.guides.verticalLine).toEqual({ x: 200, top: 0, bottom: 300 });
    expect(result.guides.horizontalLine).toBeNull();
  });

  it("snaps Y only when vertically centered within threshold", () => {
    // Element 50x50, center at y=148 → offset to parent center (150) is 2px
    const elemRect = rect(10, 123, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(false);
    expect(result.snappedY).toBe(true);
    expect(result.dy).toBe(2); // correction: 150 - 148 = 2
    expect(result.guides.horizontalLine).toEqual({ y: 150, left: 0, right: 400 });
    expect(result.guides.verticalLine).toBeNull();
  });

  it("snaps both axes when centered on both", () => {
    // Element 50x50, center at (198, 148) → both within threshold
    const elemRect = rect(173, 123, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(true);
    expect(result.snappedY).toBe(true);
    expect(result.dx).toBe(2);
    expect(result.dy).toBe(2);
    expect(result.guides.verticalLine).not.toBeNull();
    expect(result.guides.horizontalLine).not.toBeNull();
  });

  it("snaps at exactly the threshold boundary", () => {
    // Element center at x=195 → offset = 5 = threshold → should snap
    const elemRect = rect(170, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(true);
    expect(result.dx).toBe(5);
  });

  it("does not snap when just beyond threshold", () => {
    // Element center at x=194 → offset = 6 > threshold 5 → no snap
    const elemRect = rect(169, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 1);
    expect(result.snappedX).toBe(false);
    expect(result.dx).toBe(0);
  });

  it("scales delta correction by canvasScale at 2x zoom", () => {
    // Element center at x=198, parent center at 200. Offset = 2 viewport px.
    // At 2x zoom, page-space correction = 2 / 2 = 1
    const elemRect = rect(173, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 0, 0, 5, 2);
    expect(result.snappedX).toBe(true);
    expect(result.dx).toBe(1); // 2px viewport / 2x scale = 1px page
  });

  it("handles parent smaller than child", () => {
    // Parent 40x30 at (100, 100). Element 80x60 at (90, 90).
    // Parent center = (120, 115). Element center = (130, 120).
    // Offset X = -10, beyond threshold → no snap
    const smallParent = rect(100, 100, 40, 30);
    const bigElem = rect(90, 90, 80, 60);
    const result = computeSnap(bigElem, smallParent, 0, 0, 5, 1);
    expect(result.snappedX).toBe(false);

    // Now element center close to parent center
    const closeElem = rect(98, 98, 80, 60);
    // elem center = (138, 128), parent center = (120, 115) → offset X = -18, no snap
    // Let's make it actually close:
    const alignedElem = rect(80, 85, 80, 60);
    // elem center = (120, 115) = parent center → offset 0 → snap
    const result2 = computeSnap(alignedElem, smallParent, 0, 0, 5, 1);
    expect(result2.snappedX).toBe(true);
    expect(result2.snappedY).toBe(true);
    expect(result2.guides.verticalLine).toEqual({ x: 120, top: 100, bottom: 130 });
    expect(result2.guides.horizontalLine).toEqual({ y: 115, left: 100, right: 140 });
  });

  it("passes through rawDx/rawDy when no snap occurs", () => {
    const elemRect = rect(10, 10, 50, 50);
    const result = computeSnap(elemRect, parentRect, 15, -8, 5, 1);
    expect(result.dx).toBe(15);
    expect(result.dy).toBe(-8);
  });

  it("breaks free when raw delta moves element beyond threshold", () => {
    // Element visually at center (snapped), but raw delta keeps increasing.
    // Simulate: element rect shows center at x=197 (3px off parent center 200).
    // Threshold = 5, so 3 < 5 → still snapped.
    const nearCenter = rect(172, 10, 50, 50);
    const snapped = computeSnap(nearCenter, parentRect, 10, 0, 5, 1);
    expect(snapped.snappedX).toBe(true);

    // Now element has been dragged further — rect shows center at x=194 (6px off).
    // 6 > 5 threshold → snap releases, raw delta passes through.
    const pastThreshold = rect(169, 10, 50, 50);
    const freed = computeSnap(pastThreshold, parentRect, 16, 0, 5, 1);
    expect(freed.snappedX).toBe(false);
    expect(freed.dx).toBe(16); // raw delta unchanged
    expect(freed.guides.verticalLine).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run packages/overlay/src/__tests__/snap-guides.test.ts`
Expected: FAIL — `computeSnap` not found / module doesn't exist

- [ ] **Step 3: Write `snap-guides.ts`**

```typescript
// packages/overlay/src/snap-guides.ts

export interface SnapGuides {
  /** Vertical guide line (element centered horizontally in parent) */
  verticalLine: { x: number; top: number; bottom: number } | null;
  /** Horizontal guide line (element centered vertically in parent) */
  horizontalLine: { y: number; left: number; right: number } | null;
}

export interface SnapResult {
  dx: number;
  dy: number;
  snappedX: boolean;
  snappedY: boolean;
  guides: SnapGuides;
}

/**
 * Compute snap-to-center alignment for an element within its parent.
 *
 * All rect inputs are viewport-space (from getBoundingClientRect()).
 * Returned dx/dy are page-space (divided by canvasScale).
 * Returned guide coordinates are viewport-space (for highlight canvas).
 *
 * NOTE: canvasScale assumes uniform scaling with no rotation.
 * If the transform model gains separate x/y scales, this must accept scaleX/scaleY.
 */
export function computeSnap(
  elemRect: DOMRect,
  parentRect: DOMRect,
  rawDx: number,
  rawDy: number,
  threshold: number,
  canvasScale: number,
): SnapResult {
  const elemCenterX = elemRect.left + elemRect.width / 2;
  const elemCenterY = elemRect.top + elemRect.height / 2;
  const parentCenterX = parentRect.left + parentRect.width / 2;
  const parentCenterY = parentRect.top + parentRect.height / 2;

  const offsetX = parentCenterX - elemCenterX;
  const offsetY = parentCenterY - elemCenterY;

  const snappedX = Math.abs(offsetX) <= threshold;
  const snappedY = Math.abs(offsetY) <= threshold;

  return {
    dx: snappedX ? rawDx + offsetX / canvasScale : rawDx,
    dy: snappedY ? rawDy + offsetY / canvasScale : rawDy,
    snappedX,
    snappedY,
    guides: {
      verticalLine: snappedX
        ? { x: parentCenterX, top: parentRect.top, bottom: parentRect.bottom }
        : null,
      horizontalLine: snappedY
        ? { y: parentCenterY, left: parentRect.left, right: parentRect.right }
        : null,
    },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run packages/overlay/src/__tests__/snap-guides.test.ts`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/snap-guides.ts packages/overlay/src/__tests__/snap-guides.test.ts
git commit -m "feat: add computeSnap for center alignment guides"
```

---

### Task 2: Add guide line rendering to highlight canvas

**Files:**
- Modify: `packages/overlay/src/highlight-canvas.ts`

- [ ] **Step 1: Add imports, state, and exports**

At the top of `highlight-canvas.ts`, after the existing imports, add the import for SnapGuides type.
After the existing module-level state variables (around line 53), add:

```typescript
import type { SnapGuides } from "./snap-guides.js";

// ... existing state ...

let activeGuides: SnapGuides | null = null;
```

Add two new exports anywhere in the public API section:

```typescript
export function setSnapGuides(guides: SnapGuides): void {
  activeGuides = guides;
  scheduleFrame();
}

export function clearSnapGuides(): void {
  activeGuides = null;
  scheduleFrame();
}
```

- [ ] **Step 2: Add guide drawing in `tick()`**

In the `tick()` function, insert guide rendering **after** drawing selection rects (after line 313 — `drawRect` + `drawHandlesAt` for selectionAnim) and **before** multi-selection drawing (before line 316 — `if (multiAnims.length > 0)`):

```typescript
  // Draw snap alignment guides
  if (activeGuides) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = ACCENT;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    if (activeGuides.verticalLine) {
      const { x, top, bottom } = activeGuides.verticalLine;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.stroke();
    }
    if (activeGuides.horizontalLine) {
      const { y, left, right } = activeGuides.horizontalLine;
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.stroke();
    }
    ctx.restore();
  }
```

- [ ] **Step 3: Build to verify compilation**

Run: `pnpm build`
Expected: Build succeeds with no TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/highlight-canvas.ts
git commit -m "feat: add snap guide line rendering to highlight canvas"
```

---

### Task 3: Integrate snap into move handler

**Files:**
- Modify: `packages/overlay/src/tools/move.ts`

- [ ] **Step 1: Add imports**

At the top of `move.ts`, add two new import lines and merge `getCanvasTransform` into the existing `canvas-state.js` import:

```typescript
import { computeSnap } from "../snap-guides.js";
import { setSnapGuides, clearSnapGuides } from "../highlight-canvas.js";
```

Then update the existing import from `"../canvas-state.js"` (lines 8-13) to include `getCanvasTransform`:

```typescript
import {
  addMove,
  updateMoveDelta,
  getMoveForElement,
  hasMoveForElement,
  viewportToPage,
  getCanvasTransform,
} from "../canvas-state.js";
```

- [ ] **Step 2: Modify `onMouseMove`**

Replace the current `onMouseMove` body:

```typescript
  onMouseMove(e: MouseEvent) {
    if (!isDragging || !dragEntry) return;
    const pagePos = viewportToPage(e.clientX, e.clientY);
    const rawDx = preDragDelta.dx + (pagePos.x - dragStartMouse.x);
    const rawDy = preDragDelta.dy + (pagePos.y - dragStartMouse.y);

    // Apply raw transform first so getBoundingClientRect() reflects current position
    applyDragVisual(dragEntry.element, rawDx, rawDy, dragEntry.existingTransform);

    // Snap to parent center
    const parent = dragEntry.element.parentElement;
    if (!parent || parent === document.body || parent === document.documentElement) {
      dragEntry.delta = { dx: rawDx, dy: rawDy };
      clearSnapGuides();
      return;
    }

    const elemRect = dragEntry.element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const { scale } = getCanvasTransform();
    const snap = computeSnap(elemRect, parentRect, rawDx, rawDy, 5, scale);

    // Re-apply with snap-adjusted deltas if snapped (corrects position in same frame)
    if (snap.snappedX || snap.snappedY) {
      applyDragVisual(dragEntry.element, snap.dx, snap.dy, dragEntry.existingTransform);
    }

    dragEntry.delta = { dx: snap.dx, dy: snap.dy };
    setSnapGuides(snap.guides);
  },
```

- [ ] **Step 3: Add `clearSnapGuides()` to `onMouseUp`**

In `onMouseUp`, add `clearSnapGuides()` after `settleDragVisual`:

```typescript
  onMouseUp() {
    // Complete drag
    if (isDragging && dragEntry) {
      if (!isNewMove) {
        updateMoveDelta(dragEntry.id, dragEntry.delta, preDragDelta);
      }
      settleDragVisual(dragEntry);
      clearSnapGuides();
      // Re-select at new position so highlight tracks the moved element
      selectElementForMove(dragEntry.element);
    }

    dragEntry = null;
    isDragging = false;
    isNewMove = false;

    // Click-to-select (no drag occurred) — select without sidebar
    if (pendingClickEl) {
      selectElementForMove(pendingClickEl);
      pendingClickEl = null;
    }
  },
```

- [ ] **Step 4: Build and run all tests**

Run: `pnpm build && pnpm test`
Expected: Build succeeds, all tests pass (40 CLI + snap-guides tests)

Also run overlay tests specifically:
Run: `npx vitest run packages/overlay/src/__tests__/snap-guides.test.ts`
Expected: All PASS

- [ ] **Step 5: Commit**

```bash
git add packages/overlay/src/tools/move.ts
git commit -m "feat: integrate center snap guides into move tool drag"
```
