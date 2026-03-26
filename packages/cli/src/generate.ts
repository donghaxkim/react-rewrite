// packages/cli/src/generate.ts
// Phase 2B: AI-powered code generation from visual annotations
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "node:fs";
import * as path from "node:path";
import type { SerializedAnnotations, FileChange, GenerateStage } from "@frameup/shared";
import jscodeshift from "jscodeshift";
import { getParser } from "./transform.js";
import {
  parseDiffResponse,
  applyReplacements,
  resolveReplacementOffset,
  readSourceFiles,
  validateDiffChange,
  countOccurrences,
  type ParsedChange,
  type Replacement,
  type UndoFileEntry,
} from "./claude-shared.js";
import { resolveProjectFilePath } from "./path-resolver.js";

// Re-export shared utilities so existing importers of generate.ts continue to work
export {
  parseDiffResponse,
  applyReplacements,
  resolveReplacementOffset,
  validateDiffChange,
  countOccurrences,
  type ParsedChange,
  type Replacement,
  type UndoFileEntry,
} from "./claude-shared.js";

export const DEFAULT_MODEL = "claude-sonnet-4-20250514";

interface GenerateOptions {
  annotations: SerializedAnnotations;
  apiKey: string;
  projectRoot: string;
  model?: string;
  onProgress: (stage: GenerateStage, message: string) => void;
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

  for (const ann of annotations.annotations) {
    if (ann.targetFile) files.add(ann.targetFile);
  }

  return Array.from(files);
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

The user has made visual changes using a design overlay tool. Your job is to modify the source code to implement these changes.

## Rules
- Only modify the files referenced in the annotations
- Use Tailwind CSS classes (not inline styles) for styling changes
- Preserve the existing code structure — only change what the annotations specify
- If an annotation is ambiguous, make a reasonable interpretation
- Source files include line numbers for reference (e.g. "42: <Button>")

## Annotation Type Guidelines

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
 * Build the user message for Claude with annotations.
 */
function buildUserMessage(
  annotations: SerializedAnnotations,
  sources: Map<string, string>,
): string {
  let message = `## Visual Changes\n\n`;

  // Text annotations
  if (annotations.annotations.length > 0) {
    message += `### Text Annotations (User Instructions)\n`;
    for (const ann of annotations.annotations) {
      const target = ann.targetComponent
        ? `near **${ann.targetComponent}** (${ann.targetFile}:${ann.targetLine})`
        : `at position (${Math.round(ann.position!.x)}, ${Math.round(ann.position!.y)})`;
      message += `- "${ann.content}" — placed ${target}\n`;
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

    // 2. Build prompt and estimate tokens (#5)
    const userMessage = buildUserMessage(annotations, sources);
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
        const resolved = resolveProjectFilePath(change.filePath, projectRoot)
          ?? path.resolve(projectRoot, change.filePath);

        const originalContent = sources.get(change.filePath);
        const validationError = validateDiffChange(change, originalContent, resolved);
        if (validationError) {
          console.warn(`[FrameUp] Skipping ${change.filePath}: ${validationError}`);
          skippedFiles.push(`${change.filePath}: ${validationError}`);
          continue;
        }

        const finalContent = applyReplacements(originalContent!, change.replacements);
        fs.writeFileSync(resolved, finalContent, "utf-8");
        // Update afterContent for the matching undo entry
        const undoEntry = undoEntries.find(e => e.filePath === resolved);
        if (undoEntry) undoEntry.afterContent = finalContent;
        appliedChanges.push({
          filePath: change.filePath,
          description: change.description || "Modified by AI",
        });
      }
    } else {
      // Fallback: full-file replacement
      for (const change of parsed.changes) {
        const resolved = resolveProjectFilePath(change.filePath, projectRoot)
          ?? path.resolve(projectRoot, change.filePath);

        const originalContent = sources.get(change.filePath);
        const validationError = validateFullFileChange(change, originalContent, projectRoot);
        if (validationError) {
          console.warn(`[FrameUp] Skipping ${change.filePath}: ${validationError}`);
          skippedFiles.push(`${change.filePath}: ${validationError}`);
          continue;
        }

        fs.writeFileSync(resolved, change.content, "utf-8");
        // Update afterContent for the matching undo entry
        const undoEntry = undoEntries.find(e => e.filePath === resolved);
        if (undoEntry) undoEntry.afterContent = change.content;
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
