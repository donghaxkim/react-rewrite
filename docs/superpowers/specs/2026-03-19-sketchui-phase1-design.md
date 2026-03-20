# SketchUI Phase 1 — Design Spec

## Overview

SketchUI is a CLI tool that overlays on a running localhost React dev server, turning a live website into a visual canvas. Developers select components, drag to reorder, and changes write directly to source code via AST transforms. HMR provides instant feedback.

**Phase 1 scope:** CLI, proxy-based overlay injection, React Grab integration for selection, drag-to-reorder with AST-based file rewrites.

---

## Repository Structure

```
sketch-ui/
├── packages/
│   ├── cli/
│   │   ├── package.json
│   │   ├── bin/sketch-ui.js          # shebang entry
│   │   └── src/
│   │       ├── index.ts              # CLI entry: parse args, orchestrate startup
│   │       ├── detect.ts             # framework + port detection
│   │       ├── inject.ts             # HTTP proxy server, script injection
│   │       ├── server.ts             # WebSocket server
│   │       └── transform.ts          # jscodeshift AST reorder + getSiblings
│   │
│   ├── overlay/
│   │   ├── package.json
│   │   ├── tsup.config.ts            # builds to dist/overlay.js (IIFE)
│   │   ├── dist/
│   │   │   └── overlay.js            # committed built artifact
│   │   └── src/
│   │       ├── index.ts              # init: connect WS, mount toolbar, activate selection
│   │       ├── toolbar.ts            # Shadow DOM floating toolbar
│   │       ├── selection.ts          # react-grab integration, marquee, hierarchy nav
│   │       ├── drag.ts               # drag-to-reorder interaction
│   │       └── bridge.ts             # WebSocket client
│   │
│   └── shared/
│       └── src/
│           └── types.ts              # ClientMessage, ServerMessage, ComponentInfo
│
├── test-app/                         # minimal Next.js fixture (source only, gitignored node_modules)
│   ├── package.json
│   └── src/
│       ├── app/page.tsx
│       └── components/
│           ├── Navbar.tsx
│           ├── HeroSection.tsx
│           ├── Features.tsx
│           ├── Pricing.tsx
│           └── Footer.tsx
│
├── pnpm-workspace.yaml
├── package.json                      # root: build scripts
└── tsconfig.base.json
```

**Monorepo tool:** pnpm workspaces.

**Shared package consumption:** `@sketch-ui/shared` is listed as a workspace dependency in both `packages/cli/package.json` and `packages/overlay/package.json`. pnpm resolves it via the workspace protocol (`"@sketch-ui/shared": "workspace:*"`). The shared package has its own `package.json` with `"main": "src/types.ts"` — consumed directly as TypeScript source (no separate build step). Both the CLI tsc build and the overlay tsup build handle the TS compilation.

---

## Build Pipeline

1. `pnpm build:overlay` — tsup compiles `packages/overlay/src/index.ts` to `packages/overlay/dist/overlay.js` (IIFE, minified). This artifact is committed to git.
2. `pnpm build:cli` — tsc compiles `packages/cli/src/` to `packages/cli/dist/`, then copies `packages/overlay/dist/overlay.js` into `packages/cli/dist/overlay.js`.
3. Root `pnpm build` runs both in sequence (overlay first).

The CLI locates the overlay bundle via `path.join(__dirname, 'overlay.js')` — works in development (after build) and when published to npm (because the copy step puts it alongside the compiled CLI output).

---

## CLI Startup Sequence

**Entry (`index.ts`):**

1. Parse args with `commander` — `sketch-ui [port]` with optional `--host` flag
2. Call `detect()` → returns `{ framework, port, projectRoot }`
3. Start WebSocket server on preferred port 3457 (with fallback)
4. Start proxy server on preferred port 3456 (with fallback)
5. Call `open('http://localhost:<proxyPort>')` to launch browser
6. Print status with `chalk`: framework detected, ports in use, how to exit

**Port selection:** `getAvailablePort(preferred: number): Promise<number>` — tries the preferred port, increments on `EADDRINUSE` until one is available. Used for both the proxy and WebSocket ports.

**Framework detection (`detect.ts`):**

- `next.config.js` / `.ts` / `.mjs` → Next.js, default port 3000
- `vite.config.js` / `.ts` → Vite, default port 5173
- `react-scripts` in `package.json` → CRA, default port 3000
- Verify React is in dependencies; bail with clear error if not
- Check for development mode; refuse to start against production builds

**Dev server health check:** Before launching the proxy, ping `http://localhost:<detectedPort>` with a simple HTTP request. If it fails, show a clear error: `"No dev server found on port <port>. Start your dev server first, then run sketch-ui."` Retry up to 3 times with 1s delay before giving up.

---

## Proxy Server (`inject.ts`)

Uses `http-proxy` to forward all requests to the target dev server.

**Configuration:**
- `ws: true` — critical for proxying WebSocket upgrades so HMR (Vite/Next.js hot reload) passes through cleanly
- Target: `http://localhost:<detectedPort>`

**Script injection:**
The proxy intercepts responses with `Content-Type: text/html`. It buffers the full response body (not streaming), searches for `</body>`, and injects the script tags before it. For Next.js App Router streaming responses: the proxy sets `Accept-Encoding: identity` on the upstream request to disable chunked transfer encoding, ensuring the full HTML is available for injection. If `</body>` is not found (e.g., partial HTML), append the script tags at the end of the body.

Inject before `</body>`:

```html
<script src="/__sketch-ui/overlay.js"></script>
<script>window.__SKETCH_UI_WS_PORT__ = 3457;</script>
```

**Special route:** `GET /__sketch-ui/overlay.js` → serves the overlay bundle directly from `packages/cli/dist/overlay.js`. Everything else passes through untouched.

No CORS issues (same origin), no separate file server needed, HMR WebSockets pass through naturally.

**Upstream disconnect handling:** If the proxy loses connection to the upstream dev server (server crashes, restart, etc.), it sends a `{ type: "devServerDisconnected" }` message over WebSocket. The overlay shows "Dev server disconnected" in the toolbar. When the upstream becomes available again, the proxy resumes normally and sends `{ type: "devServerReconnected" }`.

---

## WebSocket Server (`server.ts`)

Listens on port 3457 (with fallback). Uses the `ws` npm package.

**Undo stack (in-memory):**

```typescript
interface UndoEntry {
  filePath: string;
  content: string;   // full file content before the write
  timestamp: number;
}
const undoStack: UndoEntry[] = [];
```

- Before every AST write, push `{ filePath, content, timestamp }` to the stack
- Undo pops the last entry and writes `entry.content` to `entry.filePath`
- Stack clears on client disconnect (fresh session)

**Message handling:**

| Incoming | Action |
|----------|--------|
| `reorder` | Read file → push to undo stack → AST transform → write file → send `reorderComplete` |
| `getSiblings` | Parse file → find parent at line → collect direct JSX children → send `siblingsList` |
| `undo` | Pop stack → write previous content → send `undoComplete` |
| `ping` | Send `pong` |

**Sequential processing:** All `reorder` and `undo` messages are processed sequentially via a queue. If a second `reorder` arrives while the first is being processed, it waits. This prevents race conditions where rapid reorders operate on stale line numbers (since the first write shifts them). `getSiblings` and `ping` can be processed concurrently.

**Error handling:** If any operation fails (file not found, AST parse error, jscodeshift failure), the server sends the corresponding response with `success: false` and a human-readable `error` string. The overlay displays errors in the toolbar's component-info area for 3 seconds, then clears. The undo stack is not modified on failure.

**Single client (important):** Phase 1 supports one connected browser tab at a time. If a second WebSocket connection arrives, the server closes the first with close code 4001 and reason "replaced by new connection". The overlay in the disconnected tab shows "Disconnected: another tab took over" prominently in the toolbar, so the user understands what happened. This is common — developers often have multiple localhost tabs open.

---

## AST Transform Engine (`transform.ts`)

Uses `jscodeshift` (wraps `recast` for parsing/printing) to manipulate JSX while preserving formatting.

### `reorderComponent(filePath, fromLine, toLine): string`

**This is a move/insert operation, not a swap.** When the user drags component A (at `fromLine`) to the position of component B (at `toLine`), A is removed from its current position and inserted before B. Other siblings shift to fill the gap. This matches standard drag-and-drop UX expectations.

1. Read source file
2. Parse with jscodeshift — use `tsx` parser for `.tsx`/`.ts`, `babel` for `.jsx`/`.js`
3. Find all `JSXElement` and `JSXFragment` nodes
4. Locate the element whose opening tag starts at `fromLine` (the dragged element)
5. Locate the element whose opening tag starts at `toLine` (the drop target)
6. Walk up to find their common parent's `children` array
7. If an element is inside a `JSXExpressionContainer` (e.g., `{condition && <Comp />}`), operate on the container node, not the inner element
8. Remove the dragged node from the children array
9. Insert it at the position of the drop target (before the target element)
10. Print back to source using recast's printer (preserves indentation, semicolons, trailing commas)
11. Return the new source string

### `getSiblings(filePath, parentLine): Array<{ componentName, lineNumber }>`

1. Parse the file
2. Find the JSX element at `parentLine`
3. Collect direct children that are `JSXElement` or `JSXExpressionContainer` containing JSX (skip whitespace text nodes)
4. Return component name and line number for each

### Recast printer options

Quote style is inferred from the existing file (detect whether the file predominantly uses single or double quotes and pass the matching option). All other formatting is inferred from the original source by recast.

### Comment preservation

Recast can be finicky when moving nodes — comments between siblings may get attached to the wrong node or duplicated. **Mitigation:** write a test case early with inter-sibling comments. **Fallback:** if recast misbehaves, detach comments from both nodes before the move, reattach after.

### Edge cases handled

- **Multi-line components:** AST nodes span full ranges; moving works regardless of line count
- **Self-closing `<Component />`:** JSXElement nodes with no children, handled identically
- **Fragments `<>...</>`:** Valid parent containers; their children are valid swap targets
- **Expression wrappers `{cond && <Comp />}`:** Move operates on the JSXExpressionContainer
- **Comments between components:** Recast preserves attached comments; fallback for misbehavior
- **Whitespace/newlines:** Recast preserves original whitespace since only moved nodes change

### Out of scope for Phase 1

- Cross-file reordering
- Reordering inside `.map()` or loop-generated JSX
- Components rendered from variables (`const el = <Comp />; return el;`)

---

## Browser Overlay (`packages/overlay`)

Built as a single IIFE bundle via tsup. Uses vanilla DOM (no React) for the toolbar. Uses react-grab + element-source for selection.

### Initialization (`index.ts`)

1. Read `window.__SKETCH_UI_WS_PORT__` and connect to WebSocket
2. Call `freeze()` from react-grab to disable normal page interactions
3. Mount floating toolbar inside a Shadow DOM container
4. Activate selection mode

### Selection (`selection.ts`)

**Single click:**
- `mousemove` → `document.elementFromPoint()` → get bounding rect → position hover highlight (blue border, semi-transparent fill)
- `click` → `resolveElementInfo(element)` → get `{ componentName, source, stack, boundingRect }`
- Transition to selection highlight (solid blue border, label: `<ComponentName /> — filePath:lineNumber`)
- Store selected `ComponentInfo` in module state

**Marquee select:**
- `mousedown` on empty space + drag → draw selection rectangle
- `mouseup` → collect all DOM elements intersecting the rectangle
- Call `resolveElementInfo()` on each → get component stacks
- Walk stacks to find lowest common ancestor component
- Select that ancestor with its bounding rect and label

**Hierarchy navigation:**
- Scroll wheel on selected element: up = parent, down = first child (from `stack` array)
- Escape: select parent
- Double-click: drill into first child

### Drag-to-Reorder (`drag.ts`)

1. User mousedowns on selected element and starts dragging
2. Create semi-transparent clone as drag preview (`position: fixed`, follows cursor)
3. **Determine valid drop zones via AST** (not visual layout):
   - Use `stack` from `resolveElementInfo()` to identify parent component + source file
   - Send `{ type: "getSiblings", filePath, parentLine }` to CLI
   - CLI parses file, returns `Array<{ componentName, lineNumber }>` — the AST-derived sibling list
   - Match sibling names/lines to on-screen elements (via `resolveElementInfo()`) to get bounding rects for rendering drop indicators
4. As cursor moves between siblings, show horizontal drop indicator lines
5. On mouseup (drop):
   - Resolve drop position (which sibling the element is placed before/after)
   - Send `{ type: "reorder", filePath, fromLine, toLine, fromComponent, toComponent }` over WebSocket
   - CLI performs AST transform, writes file, HMR updates page
6. **Post-HMR:** clear all selection state entirely. DOM re-renders, all element references are stale. User re-selects.

**No sibling caching:** The overlay must request fresh siblings via `getSiblings` on every new drag start. Never cache the previous response — after a reorder, the file has changed and the previous sibling list (including line numbers) is stale.

**Why AST for siblings, not bounding rects:** Visual siblings aren't always JSX siblings. Wrapper divs, conditional branches, and different nesting levels can make visually adjacent elements structurally unrelated. The AST is the source of truth for what can be reordered.

### Floating Toolbar (`toolbar.ts`)

Vanilla DOM, mounted inside Shadow DOM for style isolation.

```
<div id="sketch-ui-root">
  #shadow-root (open)
    <style>... all toolbar styles ...</style>
    <div class="toolbar">
      <span class="mode">Select</span>
      <span class="divider"></span>
      <span class="component-info">No selection</span>
      <button class="undo" disabled>Undo</button>
      <button class="close">×</button>
    </div>
```

- Position: `fixed`, bottom-right, `z-index: 2147483647`
- Mode indicator: "Select" (only mode in Phase 1; slot exists for future modes)
- Component info: updates when selection changes
- Undo: disabled when stack empty, sends `{ type: "undo" }`, re-enables on `undoComplete`
- Close: calls `unfreeze()`, disconnects WebSocket, removes Shadow DOM container

### Overlay element positioning

All overlay elements (hover highlight, selection box, marquee rectangle, drop indicators) use `position: fixed` with coordinates from `getBoundingClientRect()` (viewport-relative).

**Fallback:** If coordinate issues arise with scrolled pages or CSS transforms on parent elements, move highlight/selection/drop-indicator divs to `document.body` with inline styles. Keep only the toolbar in the Shadow DOM.

### WebSocket Bridge (`bridge.ts`)

- Connect to `ws://localhost:<port>` on init
- Send structured JSON messages for each action
- Receive confirmations, sibling lists, errors
- Handle reconnection if CLI server restarts: exponential backoff starting at 500ms, max 5 retries, then show "Disconnected" in toolbar with a manual reconnect button

---

## WebSocket Protocol

### Client → Server (browser → CLI)

```typescript
export type ClientMessage =
  | { type: "reorder"; filePath: string; fromLine: number; toLine: number; fromComponent: string; toComponent: string } // fromComponent/toComponent are for logging/error messages only; line numbers drive the transform
  | { type: "getSiblings"; filePath: string; parentLine: number }
  | { type: "undo" }
  | { type: "ping" };
```

### Server → Client (CLI → browser)

```typescript
export type ServerMessage =
  | { type: "reorderComplete"; success: boolean; error?: string }
  | { type: "siblingsList"; siblings: Array<{ componentName: string; lineNumber: number }> }
  | { type: "undoComplete"; success: boolean; error?: string }
  | { type: "devServerDisconnected" }
  | { type: "devServerReconnected" }
  | { type: "pong" };
```

### Shared types

```typescript
export interface ComponentInfo {
  tagName: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  stack: Array<{
    filePath: string;
    lineNumber: number;
    columnNumber: number;
    componentName: string;
  }>;
  boundingRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}
```

---

## Test App (`test-app/`)

Minimal Next.js fixture — source files only, `node_modules` gitignored, standard `pnpm install` setup.

```tsx
// test-app/src/app/page.tsx
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { Features } from '@/components/Features';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
```

Each component is a simple React component in its own file with visually distinct content.

**Test cases:**
1. `npx sketch-ui` in test app → overlay appears, HMR still works
2. Hover over `<HeroSection />` → highlight shows "HeroSection — src/components/HeroSection.tsx"
3. Click to select → solid blue selection outline with label
4. Drag `<Pricing />` above `<Features />` → source file updates, page re-renders with new order
5. Verify inter-sibling comments survive the reorder
6. Marquee-select navbar area → selects `<Navbar />` as parent
7. Undo → file reverts, page updates
8. Close button → overlay removed, page returns to normal

---

## Key Dependencies

| Package | Where | Purpose |
|---------|-------|---------|
| `commander` | cli | Arg parsing |
| `chalk` | cli | Terminal output formatting |
| `ws` | cli | WebSocket server |
| `http-proxy` | cli | Proxy server for script injection |
| `jscodeshift` | cli | AST parsing and transforms |
| `open` | cli | Open browser automatically |
| `react-grab` | overlay | Selection UI, freeze/unfreeze, hover highlights |
| `element-source` | overlay | DOM element → source file resolution via React Fiber |
| `tsup` | overlay (dev) | Bundle overlay to IIFE |

---

## Constraints

- **Never modify user's config files.** Proxy approach means no changes to next.config, vite.config, etc.
- **Development mode only.** React Grab depends on Fiber debug info. Refuse to start against production builds.
- **Shadow DOM isolation.** Toolbar and overlay UI must not inherit or conflict with user's CSS.
- **Preserve formatting.** Recast printer preserves original indentation, semicolons, whitespace.
- **Handle TS and JS.** Parser auto-detects from file extension.
- **Zero config.** Works on any standard Next.js or Vite + React project without eject.

---

## Automated Tests

Unit tests for `transform.ts` using vitest (the most critical code path):

- **Basic move:** move element from position 0 to position 2 in a 3-sibling list; verify elements 1 and 2 shift up (not a swap)
- **Non-adjacent move:** move element 0 to position 3 in a 5-sibling list; verify elements 1-3 shift up and elements 4 stays untouched
- **Self-closing tags:** move `<Component />` among multi-line siblings
- **Expression containers:** move `{condition && <Comp />}` — verify the container moves, not just the inner element
- **Comments between siblings:** verify comments stay attached to the correct nodes after a move
- **Fragments as parents:** children of `<>...</>` can be reordered
- **getSiblings:** verify it returns correct direct children names and line numbers, skipping whitespace text nodes
- **Quote style preservation:** verify a file with double quotes is not rewritten to single quotes
- **Error cases:** nonexistent file, invalid line number, elements not siblings → verify clean error, no file write

Test fixtures: small `.tsx` files in `packages/cli/src/__tests__/fixtures/` with known structures.

Integration tests are manual for Phase 1 (using the test-app), with the manual test cases listed above.
