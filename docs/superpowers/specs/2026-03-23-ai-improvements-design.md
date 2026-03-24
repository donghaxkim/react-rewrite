# AI Generate Improvements: Model Flag, Line-Range Validation, Locked-State UX

## Summary

Three targeted improvements to the AI generation pipeline. No architectural changes — all modifications fit within the existing flow.

1. **`--model` CLI flag** — configurable model with conditional cost display
2. **Required LINES directive** — every SEARCH/REPLACE block includes target line range for disambiguation
3. **Generate button locked-state UX** — visual disable + toast during generation

## 1. `--model` CLI Flag

### Motivation

The model is hardcoded to `claude-sonnet-4-20250514` at `generate.ts:625`. Users who want to try Opus or a newer Sonnet version must edit source code.

### Design

Add a single CLI option with a default. No config files, no model registry, no validation.

**CLI (`index.ts`):**
```typescript
.option("--model <model>", "Claude model to use", "claude-sonnet-4-20250514")
```

**Threading:** `opts.model` flows through `SketchServerOptions.model?` (optional — `generate.ts` applies the default when undefined) → `createSketchServer()` → `generate()` call in the `"generate"` case handler → `GenerateOptions.model` → `client.messages.create({ model })`.

**`server.ts` change:**
```typescript
// SketchServerOptions gains optional model
interface SketchServerOptions {
  port: number;
  apiKey?: string;
  model?: string;
}

// In the "generate" case handler:
generate({
  annotations: msg.annotations,
  apiKey: resolvedKey,
  projectRoot: projectRoot,
  model: model,  // ← thread through
  tokens: resolvedTokens,
  onProgress(stage, message) { ... },
})
```

**Cost display (`generate.ts`):**

```typescript
const DEFAULT_MODEL = "claude-sonnet-4-20250514";

function formatCost(inputTokens: number, outputTokens: number, model: string): string {
  if (model !== DEFAULT_MODEL) {
    return `~${Math.round((inputTokens + outputTokens) / 1000)}K tokens`;
  }
  // Sonnet pricing: $3/M input, $15/M output
  const cost = (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15;
  if (cost < 0.01) return "<$0.01";
  return `~$${cost.toFixed(2)}`;
}
```

**Startup log (`index.ts`):** When a non-default model is passed, show it:
```
  AI Generate: enabled (key: ...abc123, model: claude-opus-4-20250514)
```
When using the default, current log format is unchanged.

### Files Changed

| File | Change |
|------|--------|
| `packages/cli/src/index.ts` | Add `--model` option, thread to `createSketchServer` and startup log |
| `packages/cli/src/server.ts` | Accept `model` in `SketchServerOptions`, pass to `generate()` |
| `packages/cli/src/generate.ts` | Accept `model` in `GenerateOptions`, use in API call, conditional cost display |

## 2. Required LINES Directive in SEARCH/REPLACE

### Motivation

`applyReplacements` uses `String.replace()` which matches the first occurrence. The current `validateDiffChange` rejects SEARCH blocks that match more than once (`occurrences > 1`). This is overly conservative — it fails on files with repeated JSX patterns (list items, repeated components) even when Claude knows exactly which instance to target.

The fix: Claude already receives line-numbered source files. Require it to output which line range each SEARCH block targets. Use this to disambiguate multiple matches.

### Design

**LINES is always required.** No optional parsing, no branching on "is lines present." Every SEARCH/REPLACE block includes a `LINES: start-end` directive. This gives consistent disambiguation data for every replacement.

**System prompt change** — update response format section:

```
For each file you modify, respond with one or more SEARCH/REPLACE blocks:

\`\`\`
FILE: path/to/file.tsx
\`\`\`
\`\`\`
LINES: 42-48
<<<<<<< SEARCH
exact lines to find in the original file
=======
replacement lines
>>>>>>> REPLACE
\`\`\`
\`\`\`
DESCRIPTION: path/to/file.tsx
Brief description of what was changed.
\`\`\`

Rules for SEARCH/REPLACE blocks:
- Every SEARCH/REPLACE block MUST start with a LINES: start-end directive indicating the target line range in the original file
- SEARCH content must match the original file EXACTLY (including whitespace and indentation)
- You can have multiple SEARCH/REPLACE blocks per file
- Each block should be the minimal change needed
- Order blocks from top-of-file to bottom-of-file
- Include enough context lines in SEARCH to uniquely identify the location
- Do NOT include line numbers in SEARCH/REPLACE content — those are only for reference
- Only include files that need changes
```

**Parser changes (`parseDiffResponse`):**

Note: The triple backticks in the system prompt are markdown formatting for the instruction itself. Claude outputs the raw LINES/SEARCH/REPLACE markers without backtick wrapping, matching the regex as written.

Currently the block regex is:
```typescript
const blockRegex = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
```

Updated to capture the LINES directive:
```typescript
const blockRegex = /LINES:\s*(\d+)-(\d+)\n<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
```

`ParsedChange.replacements` type changes from `Array<{ search: string; replace: string }>` to `Replacement[]`:
```typescript
interface Replacement {
  search: string;
  replace: string;
  lines?: { start: number; end: number };  // optional for fallback parse path
}
```

**Fallback parsing:** If the LINES directive is missing (Claude occasionally drops formatting), fall back to the original regex without line data. Replacements parsed this way have `lines: undefined`. This is a resilience path, not a designed code path — the prompt requires LINES, but the parser shouldn't crash if Claude omits it.

**Shared helper — `resolveReplacementOffset`:**

Both validation and application need to find the correct match in multi-occurrence cases. Extract this into a shared helper to avoid logic duplication:

```typescript
/**
 * Find the character offset of the correct occurrence of `search` in `content`.
 * Returns the offset, or -1 if disambiguation fails.
 *
 * - Single occurrence: returns its offset (ignores lines)
 * - Multiple occurrences + lines present: returns the one in range
 * - Multiple occurrences + no lines: returns -1 (ambiguous)
 */
function resolveReplacementOffset(
  content: string,
  search: string,
  lines?: { start: number; end: number },
): number
```

Line-to-offset mapping: split `content` on `\n`, accumulate lengths to build a `lineStartOffsets` array. For each occurrence of `search`, compute which line it starts on. If the start line falls within `lines.start..lines.end`, it's the target.

**Validation changes (`validateDiffChange`):**

Current behavior when `occurrences > 1`: reject with error.

New behavior uses `resolveReplacementOffset` for each replacement:
1. If `resolveReplacementOffset` returns a valid offset: the replacement is valid
2. If it returns -1: reject with error (ambiguous or no match in range)

The validation step's trial-apply (syntax check) must also use `resolveReplacementOffset` — not `String.replace()` — to ensure it applies the correct occurrence during the syntax check.

**`applyReplacements` changes:**

```typescript
function applyReplacements(
  original: string,
  replacements: Replacement[],
): string
```

**Critical: line offset drift.** LINES values refer to the original file's line numbers, but sequential replacements shift line positions. Strategy: compute all replacement offsets on the original content upfront, then apply in reverse-offset order so earlier positions are unaffected.

```
1. For each replacement, call resolveReplacementOffset(original, search, lines)
   → produces an array of { offset, length, replace } entries
2. Sort entries by offset descending (bottom-of-file first)
3. Apply each via String.slice() concatenation:
   result = result.slice(0, offset) + replace + result.slice(offset + length)
```

This ensures all offsets are computed against the original content and remain valid throughout application. The "order blocks from top-of-file to bottom-of-file" prompt instruction is for Claude's readability — the application order is always reverse-offset. Add a comment in `applyReplacements` explaining this:

```typescript
// Blocks arrive top-to-bottom (prompt instructs Claude to order them that way for readability),
// but we apply bottom-to-top so that earlier offsets remain valid after each splice.
// All offsets are computed against the original content before any replacements.
```

### Files Changed

| File | Change |
|------|--------|
| `packages/cli/src/generate.ts` | Updated system prompt, parser regex, `Replacement` type, `validateDiffChange` logic, `applyReplacements` with line-aware matching |

## 3. Generate Button Locked-State UX

### Motivation

When a generation is in progress, clicking the Generate button is silently swallowed (`if (generating) return` at `index.ts:269`). The button still looks clickable — users think it's broken.

### Design

**Disable the button visually when generation starts.** Re-enable on completion.

In `index.ts`, the generate handler:
```typescript
setOnGenerate(() => {
  if (generating) {
    showToast("Generation in progress");  // safety net
    return;
  }
  // ... existing validation ...
  generating = true;
  updateGenerateButton(false);  // ← disable visually
  showToast("Generating...");
  send({ type: "generate", annotations: data });
});
```

In the `generateComplete` handler:
```typescript
if (msg.type === "generateComplete") {
  generating = false;
  updateGenerateButton(hasChanges());  // ← re-enable based on state
  // ... existing success/error handling ...
}
```

The button already has `:disabled` styling in `toolbar.ts` (lines 109–113):
```css
.generate-btn:disabled {
  background: ${COLORS.bgTertiary};
  color: ${COLORS.textTertiary};
  cursor: default;
}
```

No CSS changes needed. The `showToast("Generation in progress")` line is a fallback safety net — with the button disabled, users shouldn't reach it, but if they do (keyboard shortcut, race condition), they get feedback instead of silence.

**Cooldown behavior:** During the existing 5-second error cooldown (`cooldownUntil`), the button remains visually enabled but the toast guard blocks re-trigger. No visual disable is needed for the cooldown path — it's a brief window with explicit feedback ("Please wait Ns before retrying"). The visual disable applies only during active generation.

### Files Changed

| File | Change |
|------|--------|
| `packages/overlay/src/index.ts` | Add `updateGenerateButton(false)` on generate start, `updateGenerateButton(hasChanges())` on complete, toast on locked re-trigger |

## Non-Goals

- **Provider abstraction:** FrameUp is Anthropic-powered. Prompts are tuned for Claude's behavior. No multi-provider support.
- **Streaming:** Worth building later for incremental "changing X..." feedback, but current progress stages cover the main UX anxiety. Deferred until core features stabilize.
- **Model validation/registry:** If someone passes an invalid model string, the Anthropic SDK returns a clear error. No need to validate ahead of the API call.

## Testing

- **Model flag:** Manual test — pass `--model claude-sonnet-4-20250514` (default behavior unchanged), pass `--model claude-opus-4-20250514` (cost display shows token count)
- **LINES validation:** Add unit tests for:
  - `parseDiffResponse` with LINES directives parses correctly
  - `parseDiffResponse` fallback: SEARCH/REPLACE block without LINES directive parses successfully with `lines: undefined`
  - `validateDiffChange` with multi-occurrence SEARCH blocks disambiguated by line range
  - `validateDiffChange` fallback: no LINES directive + single occurrence → applies successfully
  - `validateDiffChange` fallback: no LINES directive + multiple occurrences → rejects (preserves original safety behavior)
  - `applyReplacements` with line-targeted replacements, including reverse-offset application order
- **Button UX:** Manual test — trigger generation, verify button is visually disabled, verify toast on re-trigger attempt
