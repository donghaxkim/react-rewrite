// packages/overlay/src/clone-state.ts
//
// Manages the lifecycle of cloned DOM elements (copy-paste duplication).
// Structurally parallel to move-state.ts — clones are instant DOM nodes
// that become real React elements after Confirm writes to source.

import type { ComponentInfo, JSXStructuralPath } from "@react-rewrite/shared";
import { send } from "./bridge.js";

// ── Types ────────────────────────────────────────────────────────────────

export interface CloneEntry {
  id: string;
  element: HTMLElement;
  originalElement: HTMLElement;
  sourceInfo: ComponentInfo;
  sourceLocation: {
    filePath: string;
    lineNumber: number;
    columnNumber: number;
    componentName: string;
  };
  domHints: {
    tagName: string;
    className?: string;
    parentTagName?: string;
    parentClassName?: string;
    nthOfType?: number;
    elementId?: string;
    jsxKey?: string;
    jsxPath?: JSXStructuralPath;
  };
  fileMtime?: number;
  fileSize?: number;
  originalCssText: string;
}

// ── Clipboard state ─────────────────────────────────────────────────────

interface ClipboardRef {
  element: HTMLElement;
  info: ComponentInfo;
  sourceLocation: {
    filePath: string;
    lineNumber: number;
    columnNumber: number;
    componentName: string;
  };
}

let clipboard: ClipboardRef | null = null;
const lastPastedBySource = new Map<string, HTMLElement>();
const clones = new Map<string, CloneEntry>();

// ── Public API ──────────────────────────────────────────────────────────

export function copyElement(el: HTMLElement, info: ComponentInfo): void {
  // If copying a clone, resolve to the real original element so re-duplication
  // creates siblings of the original source element, not nested clones.
  let resolvedEl = el;
  const existingClone = getCloneForElement(el);
  if (existingClone) {
    resolvedEl = existingClone.originalElement;
  }

  clipboard = {
    element: resolvedEl,
    info,
    sourceLocation: {
      filePath: info.filePath,
      lineNumber: info.lineNumber,
      columnNumber: info.columnNumber,
      componentName: info.componentName,
    },
  };
  lastPastedBySource.clear();
}

export function hasClipboard(): boolean {
  return clipboard !== null;
}

export function pasteElement(): CloneEntry | null {
  if (!clipboard) return null;
  const { element: originalElement, info, sourceLocation } = clipboard;
  if (!document.contains(originalElement)) return null;
  const parent = originalElement.parentElement;
  if (!parent) return null;

  const cloneId = crypto.randomUUID();
  const clone = originalElement.cloneNode(true) as HTMLElement;
  clone.setAttribute("data-react-rewrite-clone", cloneId);

  const sourceKey = `${sourceLocation.filePath}:${sourceLocation.lineNumber}:${sourceLocation.columnNumber}`;
  const insertAfter = lastPastedBySource.get(sourceKey) ?? originalElement;
  parent.insertBefore(clone, insertAfter.nextSibling);
  lastPastedBySource.set(sourceKey, clone);

  const computedPosition = getComputedStyle(originalElement).position;
  if (computedPosition === "absolute" || computedPosition === "fixed") {
    clone.style.transform = "translate(20px, 20px)";
  }

  clone.style.opacity = "0";
  clone.style.transition = "opacity 150ms ease, transform 150ms ease";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      clone.style.opacity = "1";
    });
  });
  setTimeout(() => { clone.style.transition = ""; }, 200);

  const tagName = originalElement.tagName.toLowerCase();
  const className = originalElement.className || undefined;
  const parentTagName = parent.tagName.toLowerCase();
  const parentClassName = parent.className || undefined;
  const elementId = originalElement.id || undefined;

  let nthOfType = 0;
  for (const child of Array.from(parent.children)) {
    if (child === originalElement) break;
    if (child.tagName === originalElement.tagName) nthOfType++;
  }

  const entry: CloneEntry = {
    id: cloneId,
    element: clone,
    originalElement,
    sourceInfo: info,
    sourceLocation,
    domHints: {
      tagName,
      className,
      parentTagName,
      parentClassName,
      nthOfType,
      elementId,
      jsxKey: info.jsxPath?.segments.at(-1)?.discriminator.type === "key"
        ? (info.jsxPath.segments.at(-1)!.discriminator as { type: "key"; value: string }).value
        : undefined,
      jsxPath: info.jsxPath,
    },
    originalCssText: clone.style.cssText,
  };

  if (sourceLocation.filePath) {
    send({ type: "fileStat", filePath: sourceLocation.filePath });
  }

  clones.set(cloneId, entry);
  return entry;
}

export function removeClone(id: string): void {
  const entry = clones.get(id);
  if (!entry) return;
  if (entry.element.parentNode) {
    entry.element.parentNode.removeChild(entry.element);
  }
  clones.delete(id);
}

export function getClones(): Map<string, CloneEntry> {
  return clones;
}

export function getCloneForElement(el: HTMLElement): CloneEntry | undefined {
  for (const entry of clones.values()) {
    if (entry.element === el) return entry;
  }
  let current: HTMLElement | null = el;
  while (current) {
    const cloneId = current.getAttribute("data-react-rewrite-clone");
    if (cloneId) return clones.get(cloneId);
    current = current.parentElement;
  }
  return undefined;
}

export function getOriginalForCloneChild(el: HTMLElement): HTMLElement | null {
  const cloneEntry = getCloneForElement(el);
  if (!cloneEntry) return null;
  if (el === cloneEntry.element) return cloneEntry.originalElement;

  const path: number[] = [];
  let current: HTMLElement | null = el;
  while (current && current !== cloneEntry.element) {
    const parent = current.parentElement;
    if (!parent) return null;
    const index = Array.from(parent.children).indexOf(current);
    if (index < 0) return null;
    path.unshift(index);
    current = parent;
  }

  let target: Element = cloneEntry.originalElement;
  for (const idx of path) {
    const child = target.children[idx];
    if (!child) return null;
    target = child;
  }
  return target as HTMLElement;
}

export function resolveFromCloneAncestry(el: HTMLElement): {
  originalElement: HTMLElement;
  sourceInfo: ComponentInfo;
} | null {
  const cloneEntry = getCloneForElement(el);
  if (!cloneEntry) return null;
  if (el === cloneEntry.element) {
    return { originalElement: cloneEntry.originalElement, sourceInfo: cloneEntry.sourceInfo };
  }
  const originalChild = getOriginalForCloneChild(el);
  if (!originalChild) return null;
  return { originalElement: originalChild, sourceInfo: cloneEntry.sourceInfo };
}

export function updateCloneFileStat(filePath: string, mtime: number, size: number): void {
  for (const entry of clones.values()) {
    if (entry.sourceLocation.filePath === filePath && entry.fileMtime == null) {
      entry.fileMtime = mtime;
      entry.fileSize = size;
    }
  }
}

export function isInsideMapTemplate(info: ComponentInfo): boolean {
  if (!info.jsxPath) return false;
  return info.jsxPath.segments.some(s => s.discriminator.type === "map-template");
}

export function clearAllClones(): void {
  for (const entry of clones.values()) {
    if (entry.element.parentNode) {
      entry.element.parentNode.removeChild(entry.element);
    }
  }
  clones.clear();
  lastPastedBySource.clear();
}

export function clearClipboard(): void {
  clipboard = null;
  lastPastedBySource.clear();
}
