// packages/overlay/src/tools/resolve-helper.ts
import type { ComponentRef } from "@sketch-ui/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack, normalizeFileName, isSourceFile } from "bippy/source";
import { isInternalName } from "../utils/component-filter.js";
import { getPageElementAtPoint } from "../interaction.js";

/**
 * Async resolve of the nearest React component under a viewport point.
 * Uses getOwnerStack (React 19 owner stacks + symbolication) with fiber walk fallback.
 * Used by draw/text/color tools to attach annotations to components.
 */
export async function resolveComponentAtPoint(clientX: number, clientY: number): Promise<ComponentRef | null> {
  const el = getPageElementAtPoint(clientX, clientY);
  if (!el) return null;

  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  // Try owner stack first (React 19 + source map symbolication)
  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        let filePath = "";
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized)) filePath = normalized;
        }

        return {
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
        };
      }
    }
  } catch {
    // Fall through to fiber walk
  }

  // Fallback: synchronous fiber walk (React 18 / _debugSource)
  let current = fiber;
  while (current) {
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current.type);
      if (name && name[0] === name[0].toUpperCase() && !isInternalName(name)) {
        const debugSource = (current as any)._debugSource || (current as any)._debugOwner?._debugSource;
        return {
          componentName: name,
          filePath: debugSource?.fileName || "",
          lineNumber: debugSource?.lineNumber || 0,
        };
      }
    }
    current = current.return;
  }
  return null;
}

/**
 * Resolve component from a known DOM element (no point lookup needed).
 * Used by lasso when elements are already discovered via area selection.
 */
export async function resolveComponentFromElement(el: HTMLElement): Promise<ComponentRef | null> {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        let filePath = "";
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized)) filePath = normalized;
        }

        return {
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
        };
      }
    }
  } catch {
    // Fall through to fiber walk
  }

  let current = fiber;
  while (current) {
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current.type);
      if (name && name[0] === name[0].toUpperCase() && !isInternalName(name)) {
        const debugSource = (current as any)._debugSource || (current as any)._debugOwner?._debugSource;
        return {
          componentName: name,
          filePath: debugSource?.fileName || "",
          lineNumber: debugSource?.lineNumber || 0,
        };
      }
    }
    current = current.return;
  }
  return null;
}
