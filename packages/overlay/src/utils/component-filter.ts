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

// --- Visibility cache (from react-grab pattern, avoids redundant getComputedStyle) ---
const VISIBILITY_CACHE_TTL_MS = 50;
const VIEWPORT_COVERAGE_THRESHOLD = 0.9;
const DEV_TOOLS_Z_INDEX_THRESHOLD = 2147483600;
const OVERLAY_Z_INDEX_THRESHOLD = 1000;

interface VisibilityEntry {
  isValid: boolean;
  timestamp: number;
}

let visibilityCache = new WeakMap<Element, VisibilityEntry>();

export function clearVisibilityCache(): void {
  visibilityCache = new WeakMap();
}

function isElementVisible(el: Element, style: CSSStyleDeclaration): boolean {
  return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
}

function isDevToolsOverlay(style: CSSStyleDeclaration): boolean {
  const z = parseInt(style.zIndex, 10);
  return style.pointerEvents === "none" && style.position === "fixed" && !isNaN(z) && z >= DEV_TOOLS_Z_INDEX_THRESHOLD;
}

function isFullViewportOverlay(el: Element, style: CSSStyleDeclaration): boolean {
  const pos = style.position;
  if (pos !== "fixed" && pos !== "absolute") return false;

  const rect = el.getBoundingClientRect();
  if (rect.width / window.innerWidth < VIEWPORT_COVERAGE_THRESHOLD || rect.height / window.innerHeight < VIEWPORT_COVERAGE_THRESHOLD) return false;

  const bg = style.backgroundColor;
  if (bg === "transparent" || bg === "rgba(0, 0, 0, 0)" || parseFloat(style.opacity) < 0.1) return true;

  const z = parseInt(style.zIndex, 10);
  return !isNaN(z) && z > OVERLAY_Z_INDEX_THRESHOLD;
}

/**
 * Validates whether an element is a valid selection/hover target.
 * Ported from react-grab's isValidGrabbableElement with adaptations for SketchUI.
 */
export function isValidElement(el: Element): boolean {
  const tag = el instanceof HTMLElement ? el.tagName.toLowerCase() : "";
  if (tag === "html" || tag === "body") return false;
  if (el instanceof HTMLElement && isFullPageElement(el)) return false;

  if (el.closest("#sketch-ui-root")) return false;
  if (el instanceof HTMLElement && el.hasAttribute("data-sketch-ui-interaction")) return false;
  if (el instanceof HTMLElement && el.hasAttribute("data-sketch-ui-ghost")) return false;

  const now = performance.now();
  const cached = visibilityCache.get(el);
  if (cached && now - cached.timestamp < VISIBILITY_CACHE_TTL_MS) {
    return cached.isValid;
  }

  const style = window.getComputedStyle(el);

  if (!isElementVisible(el, style)) {
    visibilityCache.set(el, { isValid: false, timestamp: now });
    return false;
  }

  const coversViewport = el.clientWidth / window.innerWidth >= VIEWPORT_COVERAGE_THRESHOLD
    && el.clientHeight / window.innerHeight >= VIEWPORT_COVERAGE_THRESHOLD;

  if (coversViewport) {
    if (isDevToolsOverlay(style) || isFullViewportOverlay(el, style)) {
      visibilityCache.set(el, { isValid: false, timestamp: now });
      return false;
    }
  }

  visibilityCache.set(el, { isValid: true, timestamp: now });
  return true;
}
