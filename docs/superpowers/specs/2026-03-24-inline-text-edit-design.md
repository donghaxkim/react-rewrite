# Inline Text Editing — Design Spec

**Date:** 2026-03-24
**Status:** Approved

## Overview

Double-click any text element on the page to edit it in-place using the browser's native `contentEditable`. Works in any tool mode. Changes persist via immediate AST source write when possible, with invisible fallback to annotation-based persistence for dynamic/complex text.

## Behavior

- **Activation:** Double-click any element with visible text content (non-empty `textContent.trim()`)
- **Works in any tool mode** — pointer, move, draw, text, grab. Not tied to a specific tool.
- **Edit experience:** Native browser contentEditable — cursor positioning, selection, copy/paste all work natively with the element's real styles
- **Commit triggers:** Blur (click away), Escape, or Enter (single-line elements)
- **No cancel path.** Escape commits, same as blur. Undo is handled post-commit via Ctrl+Z through the undo stack.
- **Multi-line detection:** Based on rendered state, not tag names:
  - Multi-line if: `scrollHeight > clientHeight + 4`, or element contains `<br>`, or (`whiteSpace !== "nowrap"` and `getClientRects().length > 1`)
  - Multi-line → Enter inserts newline
  - Single-line → Enter commits

## Architecture

### 1. `inline-text-edit.ts` (new file)

Self-contained module owning the entire edit lifecycle. Independent of tool handlers — the double-click listener lives on the document.

**Exports:**
- `initInlineTextEdit(): void` — registers `dblclick` listener on the document
- `destroyInlineTextEdit(): void` — removes listener, exits edit mode if active
- `isTextEditing(): boolean` — true while an element is in contentEditable mode

**Internal state:**
- `editingElement: HTMLElement | null` — the element currently being edited
- `originalTextContent: string` — snapshot at double-click time, used for diffing on commit
- `originalInnerHTML: string` — snapshot at double-click time, used as restore point for undo
- `componentInfo: ComponentInfo | null` — resolved at double-click time via bippy (uses `ComponentInfo` which has `columnNumber`, not `ComponentRef` which lacks it). The `updateText` message pulls `filePath`, `lineNumber`, `columnNumber` from this object.
- `lastKnownText: string` — updated on every `input` event via `element.textContent` (not `innerText` — `innerText` is layout-dependent and triggers reflow on every keystroke; `textContent` matches what we diff against on commit). Used by blur handler (survives HMR detachment).
- `savedOutline: string` — element's original outline style, restored on exit

**Lifecycle (4 steps):**

1. **`dblclick` → `enterEditMode(element)`**
   - Verify element has text: `element.textContent?.trim()` is non-empty
   - Skip if element is inside `#frameup-root` (don't edit overlay UI)
   - Snapshot `originalTextContent = element.textContent` and `originalInnerHTML = element.innerHTML` — captured NOW, not at commit time (survives HMR)
   - Resolve component via bippy (`getOwnerStack` / fiber walk) — same pattern as selection.ts
   - Save `element.style.outline`, apply accent outline: `2px solid ${COLORS.accent}`
   - Set `element.contentEditable = "true"`
   - Save current interaction pointer-events state, then disable: `setInteractionPointerEvents(false)`
   - Suppress FrameUp keyboard shortcuts: import and check `isTextEditing()` in `handleToolShortcut` (in `tools-panel.ts`, not `interaction.ts`) — bail early if true. The element-scoped `stopPropagation()` alone is insufficient because `handleToolShortcut` uses `{ capture: true }` on the document, which fires before the element's keydown.
   - Focus element. For single-line elements: `window.getSelection().selectAllChildren(element)`. For multi-line elements: let the browser's native double-click word selection stand — the user double-clicked a specific word for a reason. (Use the same multi-line detection heuristic from the Behavior section.)
   - Register `blur`, `keydown`, `input` listeners on the element (`input` updates `lastKnownText`)

2. **User edits text** — browser handles everything natively

3. **`blur` / `Escape` / `Enter` (single-line) → `commitAndExit()`**
   - Read `newTextContent = lastKnownText` (not `editingElement.textContent` — element may be detached after HMR)
   - If `newTextContent !== originalTextContent` → persist the change (see Persistence section)
   - If unchanged → skip persistence, just exit
   - Call `exitEditMode()`

4. **`exitEditMode()`**
   - Remove `contentEditable` attribute
   - Restore original outline
   - Restore interaction layer to tool-appropriate state: call `activateInteraction(getActiveTool())` (not a blind `setInteractionPointerEvents(true)` — pointer mode needs `pointer-events: none`)
   - Re-enable FrameUp keyboard shortcuts (the `isTextEditing()` flag clears when internal state is cleared)
   - Remove `blur`, `keydown` listeners
   - Clear internal state

**Keyboard handling during edit:**
- `keydown` listener on the editing element (not document — scoped to the element)
- `Enter` → check multi-line. If single-line: `preventDefault()`, `commitAndExit()`. If multi-line: let browser handle.
- `Escape` → `commitAndExit()`
- All other keys → `stopPropagation()` to prevent FrameUp shortcuts (tool switching etc.), but let the event reach the element for normal typing

**Double-click while already editing:**
- If `editingElement` is non-null when `dblclick` fires, call `commitAndExit()` on the current element first, then `enterEditMode(newElement)`. This prevents the first element from getting stuck in contentEditable.

**Double-click target resolution:**
- Use the event target (`e.target`) directly when it's a page element (not the interaction layer, document, or frameup overlay). Only fall back to `getPageElementAtPoint(e.clientX, e.clientY)` when `e.target` is the interaction layer or document. This avoids a redundant hit-test and prevents mismatches between event bubbling and `elementsFromPoint` rendering order.
- The `dblclick` listener must be on the document (not the interaction layer) since the interaction layer may have `pointer-events: none` in pointer mode

### 2. Persistence — Two-Path Routing

On commit, try AST write first. If it fails, fall back to annotation.

**Path A: AST Write (immediate)**

Send WebSocket message:
```typescript
{
  type: "updateText",
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  originalText: string,  // snapshot from double-click time
  newText: string,
}
```

CLI handler:
1. `isPathSafe` + `resolveFilePath` check
2. Read file, push to undo stack
3. Call `updateTextContent(filePath, lineNumber, columnNumber, originalText, newText)`
4. If transform succeeds → write file, respond `{ success: true }`
5. If transform fails (no match) → pop undo stack, respond `{ success: false, reason: "no-match" }`

**Path B: Annotation Fallback (deferred to Generate)**

If AST write responds with `success: false`:
- Store a `TextEditAnnotation` in canvas state:
```typescript
{
  type: "textEdit",
  id: string,
  componentName: string,
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  originalText: string,
  newText: string,
}
```
- Push to canvas undo stack as `{ type: "annotationAdd", annotationId }`
- The text on screen already shows the edit (contentEditable changed it). The annotation carries the intent to Generate.

**The user sees no difference between paths.** Text is already updated visually. Whether source changed immediately or will change at Generate time is invisible.

### 3. CLI Transform — `updateTextContent()`

New function in `packages/cli/src/transform.ts`.

**Position-based matching (not file-wide string scan):**
1. Parse file with jscodeshift
2. Find the JSX opening element at `lineNumber:columnNumber`
3. Get the parent JSXElement's children
4. Walk children in order, find the first child that is:
   - `JSXText` node whose trimmed value matches `originalText`, OR
   - `JSXExpressionContainer` containing a `StringLiteral` whose value matches `originalText`
5. Replace the matched text with `newText`
6. If no child matches → return null (signals fallback to annotation)

This handles: `<h1>Hello World</h1>`, `<button>{"Submit"}</button>`, `<p>Some text</p>`.
It does NOT handle: `<p>{user.name}</p>`, `<span>{isLoggedIn ? "Yes" : "No"}</span>` — those fall back to annotation.

### 4. Shared Types Changes

Add to `ClientMessage` union:
```typescript
| {
    type: "updateText";
    filePath: string;
    lineNumber: number;
    columnNumber: number;
    originalText: string;
    newText: string;
  }
```

Add to `ServerMessage` union:
```typescript
| { type: "updateTextComplete"; success: boolean; error?: string; reason?: string }
```

Add `TextEditAnnotation` type (uses explicit fields instead of `ComponentRef` since we need `columnNumber`):
```typescript
export interface TextEditAnnotation {
  type: "textEdit";
  id: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  originalText: string;
  newText: string;
}
```

Add `textEdits` array to `SerializedAnnotations`:
```typescript
textEdits: Array<{
  component: string;
  file: string;
  line: number;
  originalText: string;
  newText: string;
}>
```

Add to `Annotation` union type and `CanvasUndoAction`.

### 5. Integration Points

**`index.ts`:** Call `initInlineTextEdit()` during init, `destroyInlineTextEdit()` during close.

**`tools-panel.ts`:** Import `isTextEditing()` from `inline-text-edit.ts`. Add early return in `handleToolShortcut()` when `isTextEditing()` returns true.

**`canvas-state.ts`:** Add `TextEditAnnotation` to annotation types. In `serializeAnnotations()`, add a new `textEdits` array to `SerializedAnnotations`:
```typescript
textEdits: Array<{
  component: string;
  file: string;
  line: number;
  originalText: string;
  newText: string;
}>
```
Also update `hasChanges()` to account for text edit annotations.

**`server.ts`:** New `updateText` case requires changes in **two locations** (split architecture):
1. Add `"updateText"` to the fall-through cases in `ws.on("message")` switch (lines 313-319) to route it into the sequential queue
2. Add `"updateText"` handler inside `processQueue()` switch — same pattern as `updateProperty`

## Edge Cases

- **HMR during edit:** `originalTextContent` and component info are captured at double-click time. To survive HMR: listen for `input` events on the editing element and snapshot `editingElement.textContent` into a `lastKnownText` variable on each input. If HMR fires and removes the element, `blur` fires on the now-detached node — the blur handler uses `lastKnownText` (not `editingElement.textContent`, which may be stale on a detached node) for the commit.
- **Empty text after edit:** If user deletes all text and commits, treat as a valid edit — send empty string. The AST transform or Claude can decide what to do.
- **Elements inside Shadow DOM:** Skip — FrameUp's own UI should not be editable. Already handled by `getPageElementAtPoint()` which filters overlay elements. No additional `closest()` check needed (it wouldn't cross the shadow boundary anyway).
- **Non-text elements:** If `textContent.trim()` is empty (images, empty divs), don't enter edit mode.
- **Replaced elements** (`<img>`, `<input>`, `<video>`, `<iframe>`, `<canvas>`, `<select>`, `<textarea>`, `<hr>`, `<br>`, `<embed>`, `<object>`, `<progress>`): `contentEditable` doesn't work usefully on these. Skip them — check against a `Set` blocklist for O(1) lookup (not `contentEditable !== undefined`, which is always true for HTMLElements).
- **Undo for AST writes:** CLI undo stack (same as property changes). Ctrl+Z in the CLI restores the file.
- **Undo for annotation fallback:** Canvas undo stack. Ctrl+Z removes the annotation and restores `originalInnerHTML` on the element. If HMR has fired since the edit, the element reference may be stale — use `ElementIdentity`-based re-acquisition (find element by component name, file path, line number — same pattern as the property controller) before restoring innerHTML. Without this, undo after HMR silently fails.

## Files Changed

| File | Change |
|------|--------|
| `packages/overlay/src/inline-text-edit.ts` | New — edit lifecycle, contentEditable, commit routing |
| `packages/overlay/src/index.ts` | Init/destroy calls |
| `packages/overlay/src/tools-panel.ts` | Import `isTextEditing()`, suppress shortcuts during text edit |
| `packages/overlay/src/canvas-state.ts` | TextEditAnnotation type, serialization, undo |
| `packages/shared/src/types.ts` | updateText message, TextEditAnnotation, server response |
| `packages/cli/src/transform.ts` | `updateTextContent()` AST transform |
| `packages/cli/src/server.ts` | updateText handler |