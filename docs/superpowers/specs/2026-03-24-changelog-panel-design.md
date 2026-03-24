# Changelog Panel — Design Spec

**Date:** 2026-03-24
**Status:** Approved
**Workstream:** UX Improvements — Changelog

## Overview

A collapsible changelog panel pinned to the bottom-left that logs every code change SketchUI makes. Each entry is one line showing component name, what changed, which file, and relative time. Entries are revertible individually via a revert button. This replaces the ambiguous undo behavior with a visible, unified change history.

## Motivation

Three UX gaps exist today:

1. **No feedback on property commits.** The user changes a font size; it previews instantly, commits via debounce, but nothing confirms the code was updated.
2. **Opaque generate results.** After AI generation, the user doesn't know what changed without checking their editor.
3. **Two undo stacks.** CLI undo stack for source writes, canvas undo stack for annotations. Ctrl+Z behavior depends on which stack is active — the user can't predict what will be undone.

The changelog solves (1) and (2) immediately by surfacing every change in one chronological list with per-entry revert. Ctrl+Z unification (3) is deferred to a follow-up once changelog logging is proven stable.

## Design Decisions

### D1: Panel Position — Bottom-Left Anchor

**Decision:** `position: fixed; left: 16px; bottom: 16px`

**Rationale:** Predictable regardless of viewport height. Doesn't compete with the vertically-centered tools panel for space. Bottom-left is where changelogs and consoles naturally live in dev tools. The tools panel and changelog are independent — no layout coordination needed.

### D2: Ctrl+Z — Log-Only First Pass

**Decision:** The changelog logs everything and supports per-entry revert via the revert button. Ctrl+Z continues to work through the existing dual stacks (CLI undo + canvas undo) unchanged.

**Rationale:** Intercepting Ctrl+Z and routing through the changelog touches every undo path simultaneously. Ship the changelog as a visible, useful feature first. Unify Ctrl+Z in a follow-up once the entry-to-undo mapping is trusted.

**Future:** Ctrl+Z will revert the most recent non-reverted changelog entry. Ctrl+Shift+Z will re-apply the most recently reverted entry. This unifies the two stacks into one chronological sequence.

### D3: CLI Undo IDs for Coalescing

**Decision:** The CLI returns an `undoId: string` on each `updatePropertyComplete` and `updateTextComplete` response. The changelog entry stores a list of undo IDs accumulated during the coalesce window. On revert, all IDs are sent.

**Rationale:** Tracking undo stack depth is fragile if other changes interleave. Explicit IDs per undo entry are a small server-side change and give a reliable handle for revert.

## Behavior

### Panel Location & Layout

- **Position:** Bottom-left, fixed. `left: 16px; bottom: 16px`. Independent of the tools panel.
- **Hidden until first entry:** The panel does not render until `entries.size > 0`. No empty state, no "0 changes" badge. The user discovers the changelog organically by making their first change. On first entry, the panel animates in with a subtle slide-up (200ms ease-out).
- **Collapsed state:** A small bar showing a counter badge (e.g., "12 changes") and a chevron to expand.
- **Expanded state:** Scrollable list of change entries, most recent at top. Max height: 50vh. Beyond that, scroll within the panel.
- **Transition:** Slide-up expand animation (200ms ease-out), consistent with property sidebar animation.
- **Width:** 360px (enough for entry format without truncation).

### Entry Format

Each entry is a single scannable line:

```
ComponentName → what changed                    file.tsx    4s ago
```

Examples by change type:

| Type | Entry Format |
|------|-------------|
| Property change | `Navbar → font-size: 16px → 20px` |
| Color change | `Button → bg: white → blue-500` |
| Move | `HeroSection → moved right ~spacing-4` (pending) |
| Text edit (AST) | `Heading → "Welcome" → "Get Started"` |
| Text edit (annotation) | `Heading → "Welcome" → "Get Started" (pending)` |
| AI Generate | `AI Generate → 3 files, +12 -4 lines` |
| AI Generate (expanded) | Sub-entries for each file: `  page.tsx → Updated padding (+3 -1)` |

The `(pending)` suffix indicates the change is visual-only (canvas annotation) and will be applied to source at Generate time. This applies to text annotation edits, moves, and color overrides.

### Time Formatting

Relative time uses human-readable units, not m:ss duration format:
- < 5s: "just now"
- < 60s: "Xs ago" (e.g., "47s ago")
- < 60m: "Xm ago" (e.g., "3m ago")
- < 24h: "Xh ago" (e.g., "2h ago")

**Update interval:** A 10-second interval updates only the `.entry-time` text nodes (not the full DOM). The interval runs only when the panel is expanded; it stops when collapsed and resumes on expand. This avoids rebuilding the entire entry list every tick.

### Entry States

- **Active:** Normal text, revert icon visible on hover.
- **Reverting:** Subtle opacity reduction (0.6), revert icon replaced with a small spinner. Transient state while waiting for CLI `revertComplete`. On success → "reverted". On failure → restored to "active" with error toast.
- **Reverted:** `opacity: 0.5`, strikethrough on `.entry-summary` only (not the file name or timestamp). Entry remains visible in the log.
- **Pending:** Italic text with `(pending)` suffix — annotation-based changes not yet written to source. Includes: moves, text annotations, color overrides.

### Coalescing

If the same property on the same element changes multiple times within 3 seconds, collapse into one entry showing the first original value and the latest new value. The entry accumulates all `undoId`s from the CLI responses during the coalesce window.

Example: User scrubs font-size from 12 → 14 → 16 → 18 → 20 over 2 seconds. Log shows one entry: `Navbar → font-size: 12px → 20px` with 4 accumulated undo IDs.

**Implementation:** Coalescing is checked in the `updatePropertyComplete` response handler (not at commit time), since `undoId` is only available after the CLI confirms. The handler finds the most recent *property* entry (filtering by `type === "property"`, not just the last entry in the map) that matches the same element + same property + was created within the coalesce window. If found, update the entry's `newValue`, `timestamp`, and append the new `undoId` instead of creating a new entry. The 3-second window is measured from the candidate entry's timestamp at response time. Non-property entries between the current and candidate entry are skipped, not used as a break condition.

**Batch commits:** A single `updateProperties` call (multiple properties in one commit) produces one `undoId` covering the entire batch. The changelog creates one entry per property in the batch, but all share the same `undoId`. Reverting any one of them reverts the entire batch — this is a CLI limitation since the undo entry is a file snapshot.

### Per-Entry Revert

- **Trigger:** Small revert icon (↩) appears on hover, right side of the entry.
- **On click:** Entry transitions to "reverting" state. The change is dispatched to the appropriate backend:
  - Property changes → send CLI revert with all accumulated undo IDs
  - Moves → call `removeMove(moveId)` from canvas-state (moves are annotations, not source writes)
  - Text edits (AST) → send CLI revert with undo ID
  - Text edits (annotation) → remove annotation from canvas state, restore via `textContent` (not `innerHTML` — avoids XSS surface from CMS/API-injected content in user components)
  - AI Generate → revert all file changes from that generation (batch revert via undo IDs)
- **After revert response:** On `revertComplete` success → entry transitions to "reverted". On failure → entry restored to "active" with error toast. The `revertComplete` handler finds entries by scanning `entries` for any whose `revertData.undoIds` contains the returned `undoId` (reverse lookup — entries are keyed by entry ID, not undo ID).
- **Out-of-order revert:** Users can revert any entry, not just the most recent. Each revert is independent. If reverting an earlier change would conflict with a later change to the same code location, show a warning toast: "Cannot revert — file has changed since this edit."

### Keyboard Shortcut

**TBD — requires audit.** `Cmd+Shift+L` conflicts with Safari's "Show Downloads" and Linux "Lock Screen." The shortcut must be audited against Chrome, Firefox, and Safari defaults before finalizing. Candidates: `Cmd+Shift+H` (history), `Cmd+\` (less contested), or a key that doesn't conflict with any major browser.

**Note:** `Ctrl+L` / `Cmd+L` conflicts with the browser's "focus address bar" and is not usable.

## Architecture

### New Module: `changelog.ts`

**Location:** `packages/overlay/src/changelog.ts`

Self-contained module owning the changelog panel UI and state.

**Exports:**
- `initChangelog(): void` — creates the panel DOM in Shadow DOM, registers listeners
- `destroyChangelog(): void` — removes panel, clears state
- `addChangeEntry(entry: ChangeEntry): string` — adds entry, returns entry ID
- `updateChangeEntry(id: string, updates: Partial<ChangeEntry>): void` — for coalescing
- `revertEntry(id: string): void` — marks entry as reverted, triggers undo dispatch
- `getChangeCount(): number` — for badge display
- `isChangelogOpen(): boolean` — for layout coordination

**Types (in shared/types.ts):**

```typescript
interface ChangeEntry {
  id: string;                          // crypto.randomUUID()
  timestamp: number;                   // Date.now()
  type: "property" | "move" | "textEdit" | "textAnnotation" | "generate";
  componentName: string;
  filePath: string;                    // displayed as basename in UI
  summary: string;                     // human-readable one-line summary
  state: "active" | "reverting" | "reverted" | "pending";
  // move and textAnnotation entries start as "pending"
  // property and textEdit entries start as "active"
  // "reverting" is a transient state while waiting for CLI confirmation

  // For coalescing
  propertyKey?: string;                // e.g., "font-size"
  elementIdentity?: ElementIdentity;   // for matching same-element changes

  // For revert dispatch
  revertData: RevertData;
}

type RevertData =
  | { type: "cliUndo"; undoIds: string[] }
  | { type: "moveRemove"; moveId: string }
  | { type: "annotationRemove"; annotationId: string; originalTextContent: string; elementIdentity: ElementIdentity }
  | { type: "generateUndo"; undoIds: string[] };
```

### State Storage

Entries stored in a `Map<string, ChangeEntry>` within `changelog.ts`. Ordered by insertion (Map preserves insertion order). No localStorage persistence — the changelog is session-scoped. When SketchUI closes, the log is gone.

### Listener Pattern

Follow the existing `canvas-state.ts` pattern:

```typescript
type ChangelogListener = () => void;
let changelogListeners: ChangelogListener[] = [];

export function onChangelogChange(fn: ChangelogListener): () => void {
  changelogListeners.push(fn);
  return () => { changelogListeners = changelogListeners.filter(f => f !== fn); };
}
```

### Panel DOM

Built in the Shadow DOM (`#frameup-root`), same as other overlay UI. Structure:

```
div.changelog-panel
  div.changelog-header          ← click to toggle, shows count badge
    span.changelog-count        ← "12 changes"
    span.changelog-chevron      ← ▼ / ▲
  div.changelog-body            ← scrollable list, hidden when collapsed
    div.changelog-entry         ← one per change
      span.entry-summary        ← "Navbar → font-size: 16px → 20px"
      span.entry-file           ← "file.tsx"
      span.entry-time           ← "4s ago"
      button.entry-revert       ← ↩ icon, visible on hover
```

### Integration Points

**`property-controller.ts` — property commits:**
In the `updatePropertyComplete` response handler (via `onMessage()`, not `onCommitResult` which is single-slot), call `addChangeEntry()` with property change data and the returned `undoId`. Check for coalescing against the most recent entry. Note: `onCommitResult` in bridge.ts is a single-slot listener already used by property-controller — changelog must use the multi-listener `onMessage()` pattern.

**`tools/move.ts` — move commits:**
After move settles (`settleDragVisual`), call `addChangeEntry()` with `state: "pending"` and `type: "move"`. Moves are canvas annotations, not source writes — they have no `undoId`.

**`inline-text-edit.ts` — text edit commits:**
In the `updateTextComplete` response handler (async, not at edit-exit time), call `addChangeEntry()` with `undoId` from response and `type: "textEdit"`. For annotation fallback path (no AST match), call `addChangeEntry()` with `state: "pending"` and `type: "textAnnotation"`.

**`index.ts` — generate results:**
On `generateComplete`, call `addChangeEntry()` with generate summary and `undoIds` from the response.

**`index.ts` — init/destroy:**
Call `initChangelog()` during init, `destroyChangelog()` during close.

### CLI Changes

**`UndoEntry` gains `id: string` and `afterContent: string` fields:**
Each undo entry gets a `crypto.randomUUID()` at push time. The existing LIFO undo stack is preserved; the ID is an additional handle for targeted revert.

**`afterContent` capture requirement:** The existing undo stack only stores `beforeContent` (the file snapshot before the write). Conflict detection requires `afterContent` — the file content *after* the write was applied. Every file write path must capture both snapshots: `beforeContent` (read before write, already exists) and `afterContent` (read after write, or use the content that was written). This applies to all write paths: property changes (`updateProperty`/`updateProperties`), text edits (`updateText`), and generate applies. This is new per-entry overhead (~2x string storage) but necessary for reliable out-of-order revert.

**`updatePropertyComplete` response** — add `undoId: string` field (the ID of the undo entry just pushed).
**`updateTextComplete` response** — add `undoId: string` field.
**`generateComplete` response** — add `undoIds: string[]` field (one per file changed).

**New message type: `revertChanges`** — accepts `undoIds: string[]`.
- For each `undoId`, look up the `UndoEntry` by ID.
- **Conflict detection:** Compare the file's current content against the entry's `afterContent` (the content after the change was applied). If they don't match, the file has been modified since — return an error for that ID and show a toast.
- **Revert:** If content matches, restore the file from the entry's `beforeContent` snapshot.
- **Coalesced revert (same file):** When multiple `undoIds` from a coalesced entry target the same file, do NOT process them individually — the `afterContent` conflict check on the second revert would fail because the first already changed the file. Instead, find the earliest `beforeContent` in the batch and apply a single write restoring to that state. This is one file write, not N sequential reverts. The `afterContent` check runs once against the most recent entry's `afterContent` (which reflects the file's current expected state).
- **Stack cleanup:** Reverted entries are marked as reverted in the undo stack but not removed, preserving stack integrity for the existing Ctrl+Z flow.

### Visual Style

| Property | Value |
|----------|-------|
| Panel background | `COLORS.bgSecondary` |
| Panel border | `1px solid ${COLORS.border}` |
| Panel border-radius | `RADII.md` (10px) |
| Panel shadow | `SHADOWS.md` |
| Entry font | `12px Inter` (same as property panel) |
| Entry height | `32px` minimum (28px is too tight for trackpad targeting; revert button needs at least 24×24 hit area) |
| Component name | `COLORS.textPrimary`, semi-bold |
| Arrow (→) | `COLORS.textTertiary` |
| Change detail | `COLORS.textSecondary` |
| File path | `COLORS.textTertiary`, right-aligned |
| Time | `COLORS.textTertiary`, right-aligned |
| Revert icon | `COLORS.accent`, visible on hover only |
| Reverted entry | `opacity: 0.5` on row; `text-decoration: line-through` on `.entry-summary` only (not file name or timestamp) |
| Pending entry | `COLORS.textSecondary`, italic |
| Count badge | `COLORS.accent` background, white text, pill shape |
| Max panel height | `50vh` |
| Expand animation | `200ms ease-out` |

## Edge Cases

- **HMR during revert:** If the file has been modified by HMR between the original change and the revert attempt, the CLI revert may fail. Show a toast: "Cannot revert — file has changed."
- **Generate revert with subsequent edits:** Reverting a generate undoes the AI's changes but leaves subsequent property changes intact (separate entries). If property changes depended on generated code, the file may be inconsistent — user's decision.
- **Rapid coalescing:** 50 rapid changes to the same property → one entry with up to 50 undo IDs. On revert, the CLI groups IDs by file, finds the earliest `beforeContent` in each group, and writes once per file (not N sequential reverts). The `afterContent` conflict check uses the most recent entry's `afterContent`.
- **Session loss:** If the browser tab closes, the changelog is lost but all source changes persist on disk. Acceptable — the changelog is a session aid.
- **Panel overflow:** Beyond ~50 visible entries, the panel scrolls. No virtualization initially — 200 DOM entries is negligible.

## Files Changed

| File | Change |
|------|--------|
| `packages/overlay/src/changelog.ts` | **New** — panel UI, state management, coalescing, revert dispatch |
| `packages/overlay/src/index.ts` | Init/destroy changelog, wire generate results |
| `packages/overlay/src/properties/property-controller.ts` | Call `addChangeEntry()` on successful commit |
| `packages/overlay/src/tools/move.ts` | Call `addChangeEntry()` on move settle |
| `packages/overlay/src/inline-text-edit.ts` | Call `addChangeEntry()` on text edit commit |
| `packages/shared/src/types.ts` | Add `ChangeEntry` type, `RevertData` union |
| `packages/cli/src/server.ts` (or equivalent) | Add `undoId` to response messages, add `revertChanges` handler |

## Non-Goals (First Pass)

- **Ctrl+Z interception** — deferred to follow-up after logging is proven stable
- **Persistent changelog across sessions** — session-scoped only
- **Collaborative changelog** — single-user tool
- **Diff viewer** — summaries, not full diffs
- **File-level grouping** — chronological order only
- **Tools panel layout coordination** — changelog is independent, bottom-left anchored

## Follow-Up Work

1. **Ctrl+Z unification** — Route Ctrl+Z through changelog's most recent active entry. Requires trusted entry-to-undo mapping.
2. **Ctrl+Shift+Z redo** — Re-apply most recently reverted entry.
3. **Virtualization** — If sessions routinely exceed 500 changes.
