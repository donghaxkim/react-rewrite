// packages/overlay/src/utils/component-filter.ts

/**
 * Shared internal-component skip list for React fiber traversal.
 * Used by selection.ts and resolve-helper.ts to filter out framework internals.
 * Single source of truth — update this file when adding framework support.
 */
const INTERNAL_NAMES = new Set([
  // Next.js internals
  "InnerLayoutRouter", "OuterLayoutRouter", "RedirectErrorBoundary",
  "RedirectBoundary", "HTTPAccessFallbackErrorBoundary", "HTTPAccessFallbackBoundary",
  "LoadingBoundary", "ErrorBoundary", "ScrollAndFocusHandler", "InnerScrollAndFocusHandler",
  "RenderFromTemplateContext", "DevRootHTTPAccessFallbackBoundary",
  "AppDevOverlayErrorBoundary", "AppDevOverlay", "HotReload", "Router",
  "ErrorBoundaryHandler", "AppRouter", "ServerRoot", "SegmentStateProvider",
  "RootErrorBoundary",
  // React internals
  "Suspense", "Fragment", "StrictMode",
  // Next.js RSC internals
  "ReplaySsrOnlyErrors", "SegmentViewNode", "SegmentTrieNode",
]);

export function isInternalName(name: string): boolean {
  if (INTERNAL_NAMES.has(name)) return true;
  if (name.startsWith("_") || name.startsWith("$")) return true;
  if (name.includes("Provider") || name.includes("Context")) return true;
  if (name === "Head" || name === "html" || name === "body") return true;
  return false;
}

/** Returns true if the element is effectively the whole page and should not be selectable. */
export function isFullPageElement(el: HTMLElement): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === "html" || tag === "body") return true;

  // Skip elements that cover ≥90% of the viewport in both dimensions
  const rect = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (rect.width >= vw * 0.9 && rect.height >= vh * 0.9) return true;

  return false;
}
