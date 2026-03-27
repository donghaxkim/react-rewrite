// packages/overlay/src/tools/resolve-helper.ts
import type { ComponentRef } from "@react-rewrite/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack } from "bippy/source";

interface FiberDebugSource {
  fileName: string;
  lineNumber: number;
  columnNumber?: number;
}

interface FiberWithDebugInfo {
  _debugSource?: FiberDebugSource;
  _debugOwner?: FiberWithDebugInfo;
}

export function getDebugSource(fiber: unknown): FiberDebugSource | undefined {
  const f = fiber as FiberWithDebugInfo;
  return f._debugSource ?? f._debugOwner?._debugSource;
}
import { resolveFrameFilePath } from "../utils/source-resolve.js";
import { isInternalName, isLibraryPath } from "../utils/component-filter.js";
import { getPageElementAtPoint } from "../interaction.js";
import { getCachedFilePath, setCachedFilePath } from "../file-discovery-cache.js";
import { requestFileDiscovery } from "../bridge.js";

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

  let result: ComponentRef | null = null;

  // Try owner stack first (React 19 + source map symbolication)
  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        const filePath = resolveFrameFilePath(frame.fileName);
        if (!filePath || isLibraryPath(filePath) || isLibraryPath(frame.fileName || "")) continue;

        result = {
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
          columnNumber: frame.columnNumber ?? 0,
        };
        break;
      }
    }
  } catch {
    // Fall through to fiber walk
  }

  // Fallback: synchronous fiber walk (React 18 / _debugSource)
  if (!result) {
    let current = fiber;
    while (current) {
      if (isCompositeFiber(current)) {
        const name = getDisplayName(current.type);
        if (name && name[0] === name[0].toUpperCase() && !isInternalName(name)) {
          const debugSource = getDebugSource(current);
          result = {
            componentName: name,
            filePath: debugSource?.fileName || "",
            lineNumber: debugSource?.lineNumber || 0,
            columnNumber: debugSource?.columnNumber ?? 0,
          };
          break;
        }
      }
      current = current.return;
    }
  }

  // Layer 2: grep-based discovery when filePath is empty
  if (result && !result.filePath && result.componentName) {
    const cached = getCachedFilePath(result.componentName);
    if (cached === undefined) {
      const discovered = await requestFileDiscovery(result.componentName);
      setCachedFilePath(result.componentName, discovered);
      if (discovered) {
        result.filePath = discovered;
      }
    } else if (cached) {
      result.filePath = cached;
    }
  }

  return result;
}

/**
 * Resolve component from a known DOM element (no point lookup needed).
 * Used by lasso when elements are already discovered via area selection.
 */
export async function resolveComponentFromElement(el: HTMLElement): Promise<ComponentRef | null> {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  let result: ComponentRef | null = null;

  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        const filePath = resolveFrameFilePath(frame.fileName);
        if (!filePath || isLibraryPath(filePath) || isLibraryPath(frame.fileName || "")) continue;

        result = {
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
          columnNumber: frame.columnNumber ?? 0,
        };
        break;
      }
    }
  } catch {
    // Fall through to fiber walk
  }

  if (!result) {
    let current = fiber;
    while (current) {
      if (isCompositeFiber(current)) {
        const name = getDisplayName(current.type);
        if (name && name[0] === name[0].toUpperCase() && !isInternalName(name)) {
          const debugSource = getDebugSource(current);
          result = {
            componentName: name,
            filePath: debugSource?.fileName || "",
            lineNumber: debugSource?.lineNumber || 0,
            columnNumber: debugSource?.columnNumber ?? 0,
          };
          break;
        }
      }
      current = current.return;
    }
  }

  // Layer 2: grep-based discovery when filePath is empty
  if (result && !result.filePath && result.componentName) {
    const cached = getCachedFilePath(result.componentName);
    if (cached === undefined) {
      const discovered = await requestFileDiscovery(result.componentName);
      setCachedFilePath(result.componentName, discovered);
      if (discovered) {
        result.filePath = discovered;
      }
    } else if (cached) {
      result.filePath = cached;
    }
  }

  return result;
}
