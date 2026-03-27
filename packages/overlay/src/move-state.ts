import type { ComponentRef, ElementIdentity } from "@react-rewrite/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack, normalizeFileName, isSourceFile } from "bippy/source";
import { SHADOWS } from "./design-tokens.js";
import { setStyle } from "./utils/style-access.js";
import { getDebugSource } from "./tools/resolve-helper.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ParentLayout {
  display: "flex" | "grid" | "block" | "inline" | string;
  flexDirection: string;
  elementPosition: string; // "static" | "relative" | "absolute" | "fixed" | "sticky"
}

export interface MoveEntry {
  id: string;
  componentRef: ComponentRef;
  element: HTMLElement;
  placeholder: HTMLElement | null; // null for absolute/fixed/sticky
  originalRect: DOMRect;
  delta: { dx: number; dy: number };
  originalCssText: string;
  existingTransform: string;
  identity: ElementIdentity;
  parentLayout?: ParentLayout;
  nthOfType?: number;
  jsxKey?: string;
  fileMtime?: number;
  fileSize?: number;
}

/** Capture the parent layout context for a moved element. */
export function captureParentLayout(element: HTMLElement): ParentLayout {
  const parent = element.parentElement;
  const parentStyle = parent ? getComputedStyle(parent) : null;
  const elementStyle = getComputedStyle(element);
  return {
    display: parentStyle?.display ?? "block",
    flexDirection: parentStyle?.flexDirection ?? "row",
    elementPosition: elementStyle.position,
  };
}

// ---------------------------------------------------------------------------
// Placeholder
// ---------------------------------------------------------------------------

/** Properties to copy from getComputedStyle for an exact box-model match. */
const PLACEHOLDER_PROPS = [
  "display",
  "width", "height",
  "marginTop", "marginRight", "marginBottom", "marginLeft",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "boxSizing",
  // Flex/grid child properties
  "flex", "flexGrow", "flexShrink", "flexBasis",
  "gridColumn", "gridRow",
  "alignSelf", "justifySelf",
  "order",
] as const;

export function createPlaceholder(element: HTMLElement): HTMLElement {
  const ph = document.createElement("div");
  ph.setAttribute("data-react-rewrite-placeholder", "true");
  const computed = getComputedStyle(element);
  for (const prop of PLACEHOLDER_PROPS) {
    setStyle(ph, prop, computed[prop as keyof CSSStyleDeclaration] as string);
  }
  ph.style.visibility = "hidden";
  return ph;
}

// ---------------------------------------------------------------------------
// Transform helpers
// ---------------------------------------------------------------------------

export function composeTransform(dx: number, dy: number, existingTransform: string): string {
  const base = existingTransform && existingTransform !== "none" ? ` ${existingTransform}` : "";
  return `translate(${dx}px, ${dy}px)${base}`;
}

export function applyMoveTransform(entry: MoveEntry): void {
  entry.element.style.transform = composeTransform(entry.delta.dx, entry.delta.dy, entry.existingTransform);
}

export function clearMoveTransform(entry: MoveEntry): void {
  if (entry.existingTransform && entry.existingTransform !== "none") {
    entry.element.style.transform = entry.existingTransform;
  } else {
    entry.element.style.transform = "";
  }
}

/** Apply dragging visual: elevated shadow + slight scale. */
export function applyDragVisual(element: HTMLElement, dx: number, dy: number, existingTransform: string): void {
  element.style.transform = `translate(${dx}px, ${dy}px) scale(1.02)${existingTransform && existingTransform !== "none" ? ` ${existingTransform}` : ""}`;
  element.style.boxShadow = SHADOWS.lg;
  element.style.transition = "none";
  element.style.zIndex = "2147483644";
}

/** Remove dragging visual, settle to final transform. */
export function settleDragVisual(entry: MoveEntry): void {
  applyMoveTransform(entry);
  entry.element.style.boxShadow = "";
  entry.element.style.transition = "";
  entry.element.style.zIndex = "";
}

// ---------------------------------------------------------------------------
// Position detection
// ---------------------------------------------------------------------------

const OUT_OF_FLOW = new Set(["absolute", "fixed", "sticky"]);

export function isOutOfFlow(element: HTMLElement): boolean {
  return OUT_OF_FLOW.has(getComputedStyle(element).position);
}

/** Count same-tag siblings before this element in its parent (0-indexed). */
export function computeNthOfType(element: HTMLElement): number {
  const parent = element.parentElement;
  if (!parent) return 0;
  const tag = element.tagName;
  let count = 0;
  for (const child of Array.from(parent.children)) {
    if (child === element) break;
    if (child.tagName === tag) count++;
  }
  return count;
}

// ---------------------------------------------------------------------------
// HMR Re-acquisition (mirrors property-controller.ts pattern)
// ---------------------------------------------------------------------------

export function reacquireMovedElement(identity: ElementIdentity): HTMLElement | null {
  // Strategy 1: synchronous _debugSource fiber walk (React 18)
  const candidates = document.querySelectorAll(identity.tagName);
  for (const el of candidates) {
    if (!(el instanceof HTMLElement)) continue;
    try {
      let fiber = getFiberFromHostInstance(el);
      while (fiber) {
        if (isCompositeFiber(fiber)) {
          const source = getDebugSource(fiber);
          const name = getDisplayName(fiber);
          if (
            source &&
            name === identity.componentName &&
            source.fileName?.endsWith(identity.filePath) &&
            source.lineNumber === identity.lineNumber
          ) {
            return el;
          }
        }
        fiber = fiber.return;
      }
    } catch {
      // fiber walk may fail
    }
  }
  return null;
}

export async function reacquireMovedElementAsync(identity: ElementIdentity): Promise<HTMLElement | null> {
  const candidates = document.querySelectorAll(identity.tagName);
  for (const el of candidates) {
    if (!(el instanceof HTMLElement)) continue;
    try {
      const fiber = getFiberFromHostInstance(el);
      if (!fiber) continue;
      const frames = await getOwnerStack(fiber);
      if (!frames || frames.length === 0) continue;
      for (const frame of frames) {
        if (!frame.functionName || frame.functionName !== identity.componentName) continue;
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized) && normalized.endsWith(identity.filePath)) {
            return el;
          }
        }
      }
    } catch {
      // owner stack may fail
    }
  }
  return null;
}
