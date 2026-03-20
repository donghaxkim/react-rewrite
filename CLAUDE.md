# CLAUDE.md — SketchUI Project

## Project Overview

SketchUI is a CLI tool that overlays on running React dev servers, enabling visual component selection, drag-to-reorder (writes to source JSX), and a Figma-style visual canvas with drawing, color, text, move, lasso tools. Built as a pnpm monorepo.

### Architecture

- `packages/cli/` — CLI entry, HTTP proxy, WebSocket server, jscodeshift AST transforms
- `packages/overlay/` — IIFE bundle injected into user's page via proxy, lives in Shadow DOM
- `packages/shared/` — TypeScript types shared between CLI and overlay
- `test-app/` — Next.js app for manual testing

### Running

```bash
# From test-app/: start test app
pnpm dev

# From root: build overlay + start CLI in watch mode
pnpm dev

# From test-app/: launch SketchUI against running app
node ../packages/cli/bin/sketch-ui.js 3000

# Full build
pnpm build

# Tests
pnpm test                    # CLI transform tests (13 tests)
npx vitest run packages/overlay/src/__tests__/rdp.test.ts     # RDP tests
npx vitest run packages/overlay/src/utils/color-math.test.ts  # Color math tests
```

### Key Design Decisions

- Overlay is an IIFE bundle (tsup), injected via reverse proxy — no modifications to user's app
- All UI lives in Shadow DOM (`#sketch-ui-root`) for style isolation
- bippy library for React Fiber traversal (component resolution)
- Uses `getOwnerStack` (React 19) with fiber walk fallback (React 18)
- Canvas state is centralized in `canvas-state.ts` with listener pattern
- Phase 2B will consume `serializeAnnotations()` output to generate code

---

## Working Principles

### 1. Plan Mode Default

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

---

## Task Management

- **Plan First:** Write plan to tasks/todo.md with checkable items
- **Verify Plan:** Check in before starting implementation
- **Track Progress:** Mark items complete as you go
- **Explain Changes:** High-level summary at each step
- **Document Results:** Add review section to tasks/todo.md
- **Capture Lessons:** Update tasks/lessons.md after corrections
