# Generate Flow UX — Design Spec

**Date:** 2026-03-24
**Status:** Approved

## Overview

Improve the generate button flow with a pre-generate confirmation popover showing queued changes, richer post-generate result toasts, and a proper button state machine. Scoped to work independently — changelog panel integration deferred to Spec 1.

## 1. Pre-Generate Confirmation Popover

### Motivation

The user clicks Generate with no preview of what's about to be sent. For a tool that writes to source files, a brief summary of queued changes helps catch mistakes before spending API tokens.

### Design

When the user clicks the Generate button, show a confirmation popover anchored above the button:

```
┌─────────────────────────────────┐
│  2 color changes, 1 text edit   │
│                                 │
│  [Cancel]          [Confirm]    │
└─────────────────────────────────┘
```

- No title — the annotation summary is the headline
- Shows counts by annotation type (only non-zero types shown). Maps to `SerializedAnnotations` arrays:
  - `moves` → "N moves"
  - `colorChanges` → "N color changes"
  - `annotations` (type: "text") → "N notes"
  - `annotations` (type: "draw") → "N drawings"
  - `textEdits` → "N text edits"
- Two buttons: Cancel (dismiss, do nothing) and Confirm (proceed with generate)
- Popover appears above the Generate button with a small downward-pointing arrow
- Dismiss on: click outside, Escape key, or clicking the Generate button again (toggle)

### Implementation

New `showGenerateConfirmation()` function in `toolbar.ts`. Creates a popover div in Shadow DOM, positioned relative to the Generate button. On Confirm, proceeds with existing generate flow. On Cancel/dismiss, removes the popover.

Annotation counts come from `serializeAnnotations()` — called once when button is clicked, result used both for the summary display and the actual generate message.

## 2. Post-Generate Detailed Toast

### Motivation

After generation, the user sees a generic toast but no detail about what changed. For a tool that just modified source code, they should see what happened.

### Design

Three toast variants based on outcome:

**Success:**
```
✓ 3 files updated, +12 -4 lines
```
Auto-dismisses after 4 seconds.

**Partial success (some changes failed validation):**
```
⚠ 2/3 files updated, 1 skipped
```
Auto-dismisses after 4 seconds.

**Error:**
```
✗ Generation failed: [error message]
```
Persists until manually dismissed. Has a small × dismiss button.

No cost display — billing is an API dashboard concern, not an in-editor concern.

### Line Count Computation

Extend `applyReplacements` in `generate.ts` to return line counts alongside the content:

- For each replacement: count newlines in `search` (removed lines) and `replace` (added lines)
- Return as `{ content: string, linesAdded: number, linesRemoved: number }`
- The `generate()` function aggregates line counts across all files before returning
- **Diff path:** Line counts come from `applyReplacements` return value
- **Full-file fallback path:** Compare original line count vs new line count (simple `split('\n').length` diff)
- Both call sites of `applyReplacements` (`validateDiffChange` and actual apply) are updated. Validation discards the line counts; the apply path collects them.

### Toast Changes

`showToast` gains an optional `persist: boolean` parameter. Persistent toasts get a dismiss button (× icon) and don't auto-dismiss.

Toast deduplication: if the current toast text matches the new message and is already visible, no-op. Prevents stacking from impatient clicks.

`showToast` signature changes: `showToast(message: string, options?: { persist?: boolean, duration?: number })`. Default duration changes from 2000ms to 4000ms for the new detailed toasts. Existing callers (progress toasts during generation) continue using the default.

## 3. Generate Button State Machine

Four mutually exclusive states:

```typescript
type GenerateButtonState = "idle" | "ready" | "generating" | "success";
```

| State | Visual | Behavior |
|-------|--------|----------|
| **idle** | Grayed out, `opacity: 0.3` | Disabled, no click response |
| **ready** | Accent color | Click shows confirmation popover |
| **generating** | Accent color, pulsing opacity | Disabled; click shows "Generation in progress" toast (deduplicated) |
| **success** | Green background (600ms) | Brief feedback, then transitions to idle or ready |

### Transitions

- `idle` → `ready`: when `hasChanges()` becomes true. **Note:** `hasChanges()` in `canvas-state.ts` currently only checks `moves` and `annotations`. It must be extended to also check `colorChanges` and `textEdits` arrays so the button correctly activates for all change types.
- `ready` → `generating`: on Confirm click in popover
- `generating` → `success`: on successful `generateComplete`
- `generating` → `ready`: on error `generateComplete` (changes still exist)
- `success` → `idle` or `ready`: after 600ms, determined by `hasChanges()`

### Pulse Animation

CSS keyframe animation on `.generating` class: `opacity: 1 → 0.5 → 1` over 1.5s with `ease-in-out` timing. Reads as intentional breathing, not mechanical ticking.

### Success Flash

`.success` class with green background, removed after 600ms via `setTimeout`.

### Migration: `updateGenerateButton`

The current signature `updateGenerateButton(enabled: boolean)` changes to `updateGenerateButton(state: GenerateButtonState)`. Existing callers migrate:

- `updateGenerateButton(false)` → `updateGenerateButton("generating")` or `updateGenerateButton("idle")` depending on context
- `updateGenerateButton(hasChanges())` → `updateGenerateButton(hasChanges() ? "ready" : "idle")`
- The `onStateChange` callback in `index.ts` that calls `updateGenerateButton(hasChanges())` uses the same mapping

### Popover Positioning

The popover uses `getBoundingClientRect()` on the Generate button to position itself. It's appended to the Shadow DOM root (not the toolbar), with `position: fixed` and coordinates computed from the button's rect. The Escape listener attaches to `document` (events propagate out of Shadow DOM).

### Cooldown Removed

The existing `cooldownUntil` client-side cooldown is removed. Rate limiting is the API's responsibility. On error, the button returns to `ready` (changes still exist) with no artificial delay.

## Files Changed

| File | Change |
|------|--------|
| `packages/overlay/src/toolbar.ts` | Add `showGenerateConfirmation()` popover, `GenerateButtonState` enum, `updateGenerateButton(state)`, toast persistence + dedup |
| `packages/overlay/src/index.ts` | Wire confirmation flow (button click → popover → confirm → send), richer `generateComplete` handler, remove cooldown logic |
| `packages/cli/src/generate.ts` | `applyReplacements` returns `{ content, linesAdded, linesRemoved }`, propagate through `generate()` |
| `packages/shared/src/types.ts` | Add `linesAdded`, `linesRemoved`, `skippedCount`, `totalCount` to `generateComplete` server message type |
| `packages/overlay/src/canvas-state.ts` | Extend `hasChanges()` to check `colorChanges` and `textEdits` arrays |

## Edge Cases

- **Empty annotations:** If `serializeAnnotations()` returns all empty arrays, Generate button stays in `idle`. Popover never shown.
- **Popover toggle:** Clicking Generate while popover is open dismisses it.
- **Double confirm:** `generating` flag prevents double execution. Popover is removed on confirm so second click can't reach confirm button.
- **Toast during generation:** "Generation in progress" toast is deduplicated — multiple clicks produce one toast.
- **Success → next state:** After 600ms green flash, `hasChanges()` determines `idle` vs `ready`. Handles both HMR-cleared state and edge case of user making new annotations during generation.
- **Error toast persistence:** Error toasts stay until dismissed via × button, click, or Escape. They show the error message from the API.
- **Partial success detection:** If some `validateDiffChange` calls fail but others succeed, the CLI sends `totalCount` (attempted files) and `skippedCount` (failed validation). The overlay uses `totalCount - skippedCount` for "N/M files updated" and `skippedCount` for "N skipped". Success is `skippedCount === 0`; partial is `skippedCount > 0 && changes.length > 0`.
