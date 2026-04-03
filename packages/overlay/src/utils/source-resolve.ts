// packages/overlay/src/utils/source-resolve.ts
//
// Centralizes source file path extraction from bippy's getOwnerStack frames.
// Handles bundler URL formats that bippy's normalizeFileName/isSourceFile reject.

import { normalizeFileName, isSourceFile } from "bippy/source";

/**
 * Known bundler URL prefixes that wrap real file paths.
 * Order matters — more specific patterns first.
 */
const BUNDLER_PREFIXES = [
  // Next.js / Webpack
  "webpack-internal:///(app-pages-browser)/./",
  "webpack-internal:///(ssr)/./",
  "webpack-internal:///(rsc)/./",
  "webpack-internal:///./",
  "webpack-internal:///",
  "webpack:///(app-pages-browser)/./",
  "webpack:///./",
  "webpack:///",
  // Vite
  "/@fs/",
  // File protocol
  "file:///",
  "file://",
];

/**
 * Suffixes appended by bundlers that aren't part of the real path.
 */
const BUNDLER_SUFFIXES = [
  /\?[a-f0-9]+$/,      // ?abc123 cache busters
  /\?v=\d+$/,          // ?v=123 version params
  /\?t=\d+$/,          // ?t=123 timestamp params
  /\?import$/,         // Vite import suffix
];

/**
 * Extract a real file path from a bundler-mangled URL.
 *
 * Examples:
 *   "webpack-internal:///./src/App.tsx"           → "src/App.tsx"
 *   "webpack-internal:///(app-pages-browser)/./src/app/page.tsx" → "src/app/page.tsx"
 *   "/_next/static/chunks/src/App.tsx"            → "src/App.tsx"
 *   "src/App.tsx"                                 → "src/App.tsx" (passthrough)
 */
export function extractFilePath(rawFileName: string): string {
  if (!rawFileName) return "";

  let cleaned = rawFileName;

  // Strip known bundler prefixes
  for (const prefix of BUNDLER_PREFIXES) {
    if (cleaned.startsWith(prefix)) {
      cleaned = cleaned.slice(prefix.length);
      break;
    }
  }

  // Strip Next.js static chunk path
  // e.g. "/_next/static/chunks/app/src/components/Button.tsx"
  const nextStaticMatch = cleaned.match(/\/_next\/static\/chunks\/(?:app\/)?(.+)/);
  if (nextStaticMatch) {
    cleaned = nextStaticMatch[1];
  }

  // Strip query string suffixes
  for (const suffix of BUNDLER_SUFFIXES) {
    cleaned = cleaned.replace(suffix, "");
  }

  // Remove leading slashes (but not "./" which is intentional relative)
  if (cleaned.startsWith("/") && !cleaned.startsWith("./")) {
    cleaned = cleaned.slice(1);
  }

  // Remove leading "./"
  if (cleaned.startsWith("./")) {
    cleaned = cleaned.slice(2);
  }

  return cleaned;
}

/**
 * Resolve a frame's fileName to a usable source file path.
 * Tries bippy's normalizeFileName + isSourceFile first (handles known good cases).
 * Falls back to extractFilePath for bundler URLs that bippy rejects.
 */
export function resolveFrameFilePath(rawFileName: string | undefined | null): string {
  if (!rawFileName) return "";

  // Try bippy's built-in normalization first
  const normalized = normalizeFileName(rawFileName);
  if (normalized && isSourceFile(normalized)) {
    return normalized;
  }

  // Bippy rejected it — try our extraction
  const extracted = extractFilePath(rawFileName);
  if (extracted && isSourceFile(extracted)) {
    return extracted;
  }

  // Last resort: if it has a source file extension, use it even if isSourceFile rejects
  // (isSourceFile may reject valid paths that happen to match a filter pattern)
  // Reject paths that are clearly library/external code
  if (
    extracted &&
    /\.(tsx?|jsx?|mjs|mdx?)$/.test(extracted) &&
    !extracted.includes("node_modules") &&
    !extracted.startsWith("../") &&            // traverses outside project
    !extracted.includes("/dist/") &&           // built library output
    !extracted.includes("/build/")             // built library output
  ) {
    return extracted;
  }

  return "";
}
