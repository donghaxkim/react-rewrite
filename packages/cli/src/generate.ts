// packages/cli/src/generate.ts
// Phase 2B: AI-powered code generation from visual annotations
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "node:fs";
import * as path from "node:path";
import type { SerializedAnnotations, FileChange, GenerateStage, TailwindTokenMap, ResolvedAnnotations, ResolvedValue } from "@frameup/shared";
import { resolveIntent } from "./resolve-intent.js";
import jscodeshift from "jscodeshift";
import { getParser } from "./transform.js";

export const DEFAULT_MODEL = "claude-sonnet-4-20250514";

interface GenerateOptions {
  annotations: SerializedAnnotations;
  apiKey: string;
  projectRoot: string;
  model?: string;
  tokens?: TailwindTokenMap | null;
  onProgress: (stage: GenerateStage, message: string) => void;
}

export interface UndoFileEntry {
  filePath: string;
  content: string;
}

interface GenerateResult {
  success: boolean;
  changes: FileChange[];
  undoEntries: UndoFileEntry[];
  error?: string;
}

// --- Helpers ---

/**
 * Collect all unique file paths referenced in the annotations.
 */
function getReferencedFiles(annotations: SerializedAnnotations): string[] {
  const files = new Set<string>();

  for (const move of annotations.moves) {
    if (move.file) files.add(move.file);
  }
  for (const ann of annotations.annotations) {
    if (ann.startFile) files.add(ann.startFile);
    if (ann.targetFile) files.add(ann.targetFile);
  }
  for (const cc of annotations.colorChanges) {
    if (cc.file) files.add(cc.file);
  }

  return Array.from(files);
}

/**
 * Read source files and return a map of filePath → content.
 * Also saves original content for undo BEFORE any API call (#3).
 */
function readSourceFiles(
  filePaths: string[],
  projectRoot: string,
): { sources: Map<string, string>; undoEntries: UndoFileEntry[] } {
  const sources = new Map<string, string>();
  const undoEntries: UndoFileEntry[] = [];

  for (const fp of filePaths) {
    const resolved = path.isAbsolute(fp) ? fp : path.resolve(projectRoot, fp);
    try {
      const content = fs.readFileSync(resolved, "utf-8");
      sources.set(fp, content);
      // Save undo entry NOW, before any API call or file write (#3)
      undoEntries.push({ filePath: resolved, content });
    } catch {
      console.warn(`[FrameUp] Could not read source file: ${fp}`);
    }
  }

  return { sources, undoEntries };
}

/**
 * Estimate token count from a string (rough: 1 token ≈ 4 chars). (#5)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Format estimated cost based on token count (Sonnet pricing).
 */
function formatCost(inputTokens: number, outputTokens: number, model: string): string {
  if (model !== DEFAULT_MODEL) {
    return `~${Math.round((inputTokens + outputTokens) / 1000)}K tokens`;
  }
  // Sonnet pricing: $3/M input, $15/M output
  const cost = (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15;
  if (cost < 0.01) return "<$0.01";
  return `~$${cost.toFixed(2)}`;
}

/**
 * Static system prompt — cached across calls by the Anthropic API.
 * Contains role, rules, and response format (nothing request-specific).
 */
const SYSTEM_PROMPT = `You are a frontend code modifier for a React application using Tailwind CSS.

The user has made visual changes using a design overlay tool. Your job is to modify the source code to implement these changes. Color values and spacing tokens have been pre-resolved — use them as provided.

## Rules
- Only modify the files referenced in the annotations
- Use Tailwind CSS classes (not inline styles) for styling changes
- Preserve the existing code structure — only change what the annotations specify
- If an annotation is ambiguous, make a reasonable interpretation
- Source files include line numbers for reference (e.g. "42: <Button>")

## Annotation Type Guidelines

### Component Moves
For moves, the spacing token and nearest sibling context are provided. Choose the appropriate CSS mechanism (margin, padding, gap, positioning) based on the layout context. Consider: Is this element in a flex/grid container? Would gap be more appropriate than margin? Is relative positioning needed?

### Color Changes
Color values are pre-resolved to Tailwind tokens where possible. Use the token name directly for resolved colors. For arbitrary values, use Tailwind arbitrary syntax like \`bg-[#hex]\` or \`text-[#hex]\`.

### Text Annotations
Text annotations are instructions from the user. Interpret them as code change requests for the nearest referenced component.

### Drawing Annotations
Drawings typically circle or highlight areas the user wants changed. Consider them as visual emphasis on the nearby components.

## Response Format

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
- Only include files that need changes`;

/**
 * Build the user message for Claude with resolved annotations (preferred path).
 */
function buildUserMessage(
  annotations: ResolvedAnnotations,
  sources: Map<string, string>,
): string {
  let message = `## Visual Changes\n\n`;

  // Moves — with resolved spacing and sibling context
  if (annotations.moves.length > 0) {
    message += `### Component Moves\n`;
    for (const move of annotations.moves) {
      message += `- **${move.component}** (${move.file}:${move.line}):\n`;

      if (move.resolvedDx) {
        message += `  ${move.delta.dx > 0 ? "Right" : "Left"} by ${formatResolvedSpacing(move.resolvedDx)}\n`;
      }
      if (move.resolvedDy) {
        message += `  ${move.delta.dy > 0 ? "Down" : "Up"} by ${formatResolvedSpacing(move.resolvedDy)}\n`;
      }

      const sibs = move.nearestSiblings;
      const sibParts: string[] = [];
      if (sibs.left) sibParts.push(`left: ${sibs.left.component} at ${Math.round(sibs.left.distance)}px`);
      if (sibs.right) sibParts.push(`right: ${sibs.right.component} at ${Math.round(sibs.right.distance)}px`);
      if (sibs.above) sibParts.push(`above: ${sibs.above.component} at ${Math.round(sibs.above.distance)}px`);
      if (sibs.below) sibParts.push(`below: ${sibs.below.component} at ${Math.round(sibs.below.distance)}px`);
      if (sibParts.length > 0) {
        message += `  Nearest siblings: ${sibParts.join(", ")}\n`;
      }
      message += `  Choose the appropriate CSS mechanism for this layout context.\n`;
    }
    message += `\n`;
  }

  // Color changes — tiered phrasing
  if (annotations.colorChanges.length > 0) {
    message += `### Color Changes\n`;
    for (const cc of annotations.colorChanges) {
      const prop = cc.property === "backgroundColor" ? "background color" : "text color";
      message += `- **${cc.component}** (${cc.file}:${cc.line}): ${prop} changed from \`${cc.from}\` to ${formatResolvedColor(cc.resolvedTo)}\n`;
    }
    message += `\n`;
  }

  // Draw/text annotations — unchanged from raw version
  const drawAnns = annotations.annotations.filter(a => a.type === "draw");
  const textAnns = annotations.annotations.filter(a => a.type === "text");

  if (textAnns.length > 0) {
    message += `### Text Annotations (User Instructions)\n`;
    for (const ann of textAnns) {
      const target = ann.targetComponent
        ? `near **${ann.targetComponent}** (${ann.targetFile}:${ann.targetLine})`
        : `at position (${Math.round(ann.position!.x)}, ${Math.round(ann.position!.y)})`;
      message += `- "${ann.content}" — placed ${target}\n`;
    }
    message += `\n`;
  }

  if (drawAnns.length > 0) {
    message += `### Drawing Annotations\n`;
    for (const ann of drawAnns) {
      const target = ann.startComponent
        ? `near **${ann.startComponent}** (${ann.startFile}:${ann.startLine})`
        : "on the page";
      const points = ann.points?.length ?? 0;
      message += `- Drawing with ${points} points ${target} (color: ${ann.color})\n`;
    }
    message += `\n`;
  }

  // Source files
  message += `## Source Files\n\n`;
  for (const [filePath, content] of sources) {
    const ext = path.extname(filePath).slice(1) || "tsx";
    const numberedLines = content
      .split("\n")
      .map((line, i) => `${i + 1}: ${line}`)
      .join("\n");
    message += `### \`${filePath}\`\n\`\`\`${ext}\n${numberedLines}\n\`\`\`\n\n`;
  }

  return message;
}

function formatResolvedSpacing(val: ResolvedValue<number>): string {
  const absPx = Math.abs(val.raw);
  if (val.type === "exact") {
    return `\`spacing-${val.resolved}\` (${val.resolvedValue})`;
  }
  if (val.type === "snapped") {
    return `~\`spacing-${val.resolved}\` (${val.resolvedValue}, actual ${Math.round(absPx)}px)`;
  }
  return `${Math.round(absPx)}px (use arbitrary value)`;
}

function formatResolvedColor(val: ResolvedValue<string>): string {
  if (val.confidence >= 0.95) {
    return `\`${val.resolved}\``;
  }
  if (val.confidence >= 0.7) {
    return `approximately \`${val.resolved}\` (user picked \`${val.raw}\`)`;
  }
  // Detect alpha colors — tell Claude to use raw values, not Tailwind arbitrary syntax
  const raw = val.raw;
  if (raw.startsWith("rgba(") || raw.startsWith("hsla(") || /^#[0-9a-fA-F]{8}$/.test(raw)) {
    return `\`${raw}\` (alpha channel present — use raw value)`;
  }
  return `\`${val.raw}\` (use arbitrary value)`;
}

/**
 * Build the user message for Claude with raw annotations (fallback when tokens unavailable).
 */
function buildUserMessageRaw(
  annotations: SerializedAnnotations,
  sources: Map<string, string>,
): string {
  let message = `## Visual Changes\n\n`;

  // Moves
  if (annotations.moves.length > 0) {
    message += `### Component Moves\n`;
    for (const move of annotations.moves) {
      const toX = move.originalRect.left + move.delta.dx;
      const toY = move.originalRect.top + move.delta.dy;
      message += `- **${move.component}** (${move.file}:${move.line}): moved from (${Math.round(move.originalRect.left)}, ${Math.round(move.originalRect.top)}) to (${Math.round(toX)}, ${Math.round(toY)})\n`;
      const dx = Math.round(move.delta.dx);
      const dy = Math.round(move.delta.dy);
      message += `  Offset: ${dx > 0 ? "+" : ""}${dx}px horizontal, ${dy > 0 ? "+" : ""}${dy}px vertical\n`;
    }
    message += `\n`;
  }

  // Color changes
  if (annotations.colorChanges.length > 0) {
    message += `### Color Changes\n`;
    for (const cc of annotations.colorChanges) {
      const prop = cc.property === "backgroundColor" ? "background color" : "text color";
      message += `- **${cc.component}** (${cc.file}:${cc.line}): ${prop} changed from \`${cc.from}\` to \`${cc.to}\`\n`;
    }
    message += `\n`;
  }

  // Draw/text annotations
  const drawAnns = annotations.annotations.filter(a => a.type === "draw");
  const textAnns = annotations.annotations.filter(a => a.type === "text");

  if (textAnns.length > 0) {
    message += `### Text Annotations (User Instructions)\n`;
    for (const ann of textAnns) {
      const target = ann.targetComponent
        ? `near **${ann.targetComponent}** (${ann.targetFile}:${ann.targetLine})`
        : `at position (${Math.round(ann.position!.x)}, ${Math.round(ann.position!.y)})`;
      message += `- "${ann.content}" — placed ${target}\n`;
    }
    message += `\n`;
  }

  if (drawAnns.length > 0) {
    message += `### Drawing Annotations\n`;
    for (const ann of drawAnns) {
      const target = ann.startComponent
        ? `near **${ann.startComponent}** (${ann.startFile}:${ann.startLine})`
        : "on the page";
      const points = ann.points?.length ?? 0;
      message += `- Drawing with ${points} points ${target} (color: ${ann.color})\n`;
    }
    message += `\n`;
  }

  // Source files with line numbers (#4)
  message += `## Source Files\n\n`;
  for (const [filePath, content] of sources) {
    const ext = path.extname(filePath).slice(1) || "tsx";
    const numberedLines = content
      .split("\n")
      .map((line, i) => `${i + 1}: ${line}`)
      .join("\n");
    message += `### \`${filePath}\`\n\`\`\`${ext}\n${numberedLines}\n\`\`\`\n\n`;
  }

  return message;
}

export interface ParsedChange {
  filePath: string;
  replacements: Array<{ search: string; replace: string }>;
  description: string;
}

interface ParsedFullFile {
  filePath: string;
  content: string;
  description: string;
}

/**
 * Parse Claude's response into search/replace changes.
 * Falls back to full-file parsing if no SEARCH/REPLACE blocks are found.
 */
function parseResponse(responseText: string): { mode: "diff"; changes: ParsedChange[] } | { mode: "full"; changes: ParsedFullFile[] } {
  const diffChanges = parseDiffResponse(responseText);
  if (diffChanges.length > 0) {
    return { mode: "diff", changes: diffChanges };
  }

  // Fallback: try old full-file format
  const fullChanges = parseFullFileResponse(responseText);
  return { mode: "full", changes: fullChanges };
}

/**
 * Parse SEARCH/REPLACE block format.
 */
export function parseDiffResponse(responseText: string): ParsedChange[] {
  const changes: ParsedChange[] = [];

  // Split response by FILE: markers to process each file's blocks
  const fileSections = responseText.split(/(?=FILE:\s*)/);

  for (const section of fileSections) {
    const fileMatch = section.match(/^FILE:\s*(.+?)(?:\n|$)/);
    if (!fileMatch) continue;

    const filePath = fileMatch[1].trim();
    if (filePath.startsWith("DESCRIPTION")) continue;

    // Find all SEARCH/REPLACE blocks in this section
    const blockRegex = /<<<<<<< SEARCH\n([\s\S]*?)\n=======\n([\s\S]*?)\n>>>>>>> REPLACE/g;
    const replacements: Array<{ search: string; replace: string }> = [];
    let blockMatch;

    while ((blockMatch = blockRegex.exec(section)) !== null) {
      replacements.push({
        search: blockMatch[1],
        replace: blockMatch[2],
      });
    }

    if (replacements.length === 0) continue;

    // Check for description
    let description = "";
    const descMatch = section.match(/DESCRIPTION:\s*.+?\n([\s\S]*?)(?=(?:FILE:|$))/);
    if (descMatch) {
      description = descMatch[1].trim();
    }

    // Merge with existing entry for same file, or create new
    const existing = changes.find(c => c.filePath === filePath);
    if (existing) {
      existing.replacements.push(...replacements);
      if (description && !existing.description) existing.description = description;
    } else {
      changes.push({ filePath, replacements, description });
    }
  }

  // Also pick up DESCRIPTION blocks that appear outside file sections
  const descRegex = /DESCRIPTION:\s*(.+?)\n([\s\S]*?)(?=(?:FILE:|DESCRIPTION:|```)|$)/g;
  let descMatch;
  while ((descMatch = descRegex.exec(responseText)) !== null) {
    const fp = descMatch[1].trim();
    const desc = descMatch[2].trim();
    const change = changes.find(c => c.filePath === fp);
    if (change && !change.description) {
      change.description = desc;
    }
  }

  return changes;
}

/**
 * Parse old full-file format (fallback).
 */
function parseFullFileResponse(responseText: string): ParsedFullFile[] {
  const changes: ParsedFullFile[] = [];

  const fileRegex = /FILE:\s*(.+?)\n```\w*\n([\s\S]*?)```/g;
  let match;

  while ((match = fileRegex.exec(responseText)) !== null) {
    const filePath = match[1].trim();
    const content = match[2];
    if (filePath.startsWith("DESCRIPTION")) continue;
    changes.push({ filePath, content, description: "" });
  }

  const descRegex = /DESCRIPTION:\s*(.+?)\n([\s\S]*?)(?=(?:FILE:|DESCRIPTION:|```)|$)/g;
  while ((match = descRegex.exec(responseText)) !== null) {
    const filePath = match[1].trim();
    const description = match[2].trim();
    const change = changes.find(c => c.filePath === filePath);
    if (change) {
      change.description = description;
    }
  }

  return changes;
}

/**
 * Validate a diff-based change before applying.
 * Returns null if valid, error string if invalid.
 */
export function validateDiffChange(
  change: ParsedChange,
  originalContent: string | undefined,
  projectRoot: string,
): string | null {
  const resolved = path.isAbsolute(change.filePath)
    ? change.filePath
    : path.resolve(projectRoot, change.filePath);

  if (!fs.existsSync(resolved)) {
    return `File does not exist: ${change.filePath}`;
  }

  if (!originalContent) {
    return `No original content available for ${change.filePath}`;
  }

  // Validate each search string exists and is unique
  for (let i = 0; i < change.replacements.length; i++) {
    const { search } = change.replacements[i];
    const occurrences = countOccurrences(originalContent, search);
    if (occurrences === 0) {
      // Show a snippet of the search string for debugging
      const snippet = search.length > 80 ? search.slice(0, 80) + "..." : search;
      return `SEARCH block ${i + 1} not found in ${change.filePath}: "${snippet}"`;
    }
    if (occurrences > 1) {
      const snippet = search.length > 80 ? search.slice(0, 80) + "..." : search;
      return `SEARCH block ${i + 1} matches ${occurrences} locations in ${change.filePath} (must be unique): "${snippet}"`;
    }
  }

  // Apply all replacements and syntax-check the result
  let result = originalContent;
  for (const { search, replace } of change.replacements) {
    result = result.replace(search, replace);
  }

  const ext = path.extname(change.filePath);
  if ([".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
    try {
      const parserName = getParser(resolved);
      const j = jscodeshift.withParser(parserName);
      j(result);
    } catch {
      return `Invalid syntax after applying replacements to ${change.filePath}`;
    }
  }

  return null;
}

/**
 * Count non-overlapping occurrences of a substring.
 */
export function countOccurrences(text: string, sub: string): number {
  let count = 0;
  let pos = 0;
  while ((pos = text.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
}

/**
 * Apply search/replace blocks to original content sequentially.
 */
export function applyReplacements(original: string, replacements: Array<{ search: string; replace: string }>): string {
  let result = original;
  for (const { search, replace } of replacements) {
    result = result.replace(search, replace);
  }
  return result;
}

/**
 * Validate a full-file change before writing (fallback path).
 * Returns null if valid, error string if invalid.
 */
function validateFullFileChange(
  change: ParsedFullFile,
  originalContent: string | undefined,
  projectRoot: string,
): string | null {
  const resolved = path.isAbsolute(change.filePath)
    ? change.filePath
    : path.resolve(projectRoot, change.filePath);

  if (!fs.existsSync(resolved)) {
    return `File does not exist: ${change.filePath}`;
  }

  if (!change.content.trim()) {
    return `Empty content for ${change.filePath}`;
  }

  if (originalContent) {
    const ratio = change.content.length / originalContent.length;
    if (ratio < 0.3) {
      return `Content too short for ${change.filePath} (${Math.round(ratio * 100)}% of original — likely a fragment)`;
    }
    if (ratio > 3.0) {
      return `Content too long for ${change.filePath} (${Math.round(ratio * 100)}% of original — likely includes explanation text)`;
    }
  }

  const ext = path.extname(change.filePath);
  if ([".tsx", ".jsx", ".ts", ".js"].includes(ext)) {
    try {
      const parserName = getParser(resolved);
      const j = jscodeshift.withParser(parserName);
      j(change.content);
    } catch {
      return `Invalid syntax in generated content for ${change.filePath}`;
    }
  }

  return null;
}

// --- Main ---

/**
 * Main generate function — orchestrates the full flow.
 */
export async function generate(options: GenerateOptions): Promise<GenerateResult> {
  const { annotations, apiKey, projectRoot, onProgress } = options;
  const model = options.model || DEFAULT_MODEL;

  try {
    // 1. Analyze — collect referenced files and save originals for undo (#3)
    onProgress("analyzing", "Reading source files...");

    const referencedFiles = getReferencedFiles(annotations);
    if (referencedFiles.length === 0) {
      return { success: false, changes: [], undoEntries: [], error: "No source files referenced in annotations" };
    }

    // Read files AND capture undo entries BEFORE the API call (#3)
    const { sources, undoEntries } = readSourceFiles(referencedFiles, projectRoot);
    if (sources.size === 0) {
      return { success: false, changes: [], undoEntries: [], error: "Could not read any referenced source files" };
    }

    // 2. Resolve intent — deterministic math before the prompt
    const resolved = options.tokens
      ? resolveIntent(annotations, options.tokens)
      : null;

    // 3. Build prompt and estimate tokens (#5)
    const userMessage = resolved
      ? buildUserMessage(resolved, sources)
      : buildUserMessageRaw(annotations, sources);
    const inputTokens = estimateTokens(SYSTEM_PROMPT + userMessage);
    const estimatedOutputTokens = Math.min(inputTokens, 8192); // Conservative estimate
    const costEstimate = formatCost(inputTokens, estimatedOutputTokens, model);

    onProgress("generating", `Sending ~${Math.round(inputTokens / 1000)}K tokens to Claude (${costEstimate})...`);

    // 3. Call Claude API (system prompt is cached across calls within a session)
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: model,
      max_tokens: 16384,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    // Check for truncation (#7)
    if (response.stop_reason === "max_tokens") {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: "Response was truncated — too many changes at once. Try generating with fewer annotations.",
      };
    }

    const responseText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map(block => block.text)
      .join("\n");

    if (!responseText) {
      return { success: false, changes: [], undoEntries: [], error: "Empty response from Claude API" };
    }

    // 4. Parse and validate response (#2)
    onProgress("applying", "Validating and applying changes...");

    const parsed = parseResponse(responseText);
    if (parsed.changes.length === 0) {
      return { success: false, changes: [], undoEntries: [], error: "Could not parse any file changes from AI response" };
    }

    const appliedChanges: FileChange[] = [];
    const skippedFiles: string[] = [];

    if (parsed.mode === "diff") {
      // Diff-based path: apply search/replace blocks
      for (const change of parsed.changes) {
        const resolved = path.isAbsolute(change.filePath)
          ? change.filePath
          : path.resolve(projectRoot, change.filePath);

        const originalContent = sources.get(change.filePath);
        const validationError = validateDiffChange(change, originalContent, projectRoot);
        if (validationError) {
          console.warn(`[FrameUp] Skipping ${change.filePath}: ${validationError}`);
          skippedFiles.push(`${change.filePath}: ${validationError}`);
          continue;
        }

        const finalContent = applyReplacements(originalContent!, change.replacements);
        fs.writeFileSync(resolved, finalContent, "utf-8");
        appliedChanges.push({
          filePath: change.filePath,
          description: change.description || "Modified by AI",
        });
      }
    } else {
      // Fallback: full-file replacement
      for (const change of parsed.changes) {
        const resolved = path.isAbsolute(change.filePath)
          ? change.filePath
          : path.resolve(projectRoot, change.filePath);

        const originalContent = sources.get(change.filePath);
        const validationError = validateFullFileChange(change, originalContent, projectRoot);
        if (validationError) {
          console.warn(`[FrameUp] Skipping ${change.filePath}: ${validationError}`);
          skippedFiles.push(`${change.filePath}: ${validationError}`);
          continue;
        }

        fs.writeFileSync(resolved, change.content, "utf-8");
        appliedChanges.push({
          filePath: change.filePath,
          description: change.description || "Modified by AI",
        });
      }
    }

    if (appliedChanges.length === 0) {
      return {
        success: false,
        changes: [],
        undoEntries: [],
        error: `All changes failed validation:\n${skippedFiles.join("\n")}`,
      };
    }

    const msg = skippedFiles.length > 0
      ? `Modified ${appliedChanges.length} file(s), skipped ${skippedFiles.length}`
      : `Modified ${appliedChanges.length} file(s)`;
    onProgress("complete", msg);

    return { success: true, changes: appliedChanges, undoEntries };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes("401") || message.includes("authentication")) {
      return { success: false, changes: [], undoEntries: [], error: "Invalid API key. Check your ANTHROPIC_API_KEY." };
    }
    if (message.includes("429") || message.includes("rate")) {
      return { success: false, changes: [], undoEntries: [], error: "Rate limited. Please wait a moment and try again." };
    }
    if (message.includes("insufficient") || message.includes("credit")) {
      return { success: false, changes: [], undoEntries: [], error: "Insufficient API credits. Check your Anthropic account." };
    }

    return { success: false, changes: [], undoEntries: [], error: message };
  }
}
