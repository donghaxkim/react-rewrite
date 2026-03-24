import type { ComponentInfo, ElementIdentity, PropertyGroup } from "@frameup/shared";
import { ALL_DESCRIPTORS } from "./property-descriptors.js";
const DESCRIPTOR_MAP = new Map(ALL_DESCRIPTORS.map(d => [d.key, d]));
import { renderSections, isGroupCollapsed, onSectionExpand } from "./section-renderer.js";
import { createSidebar } from "./property-sidebar.js";
import { getTokenMap, resolveTokenForValue } from "./tailwind-resolver.js";
import type { MergedTokenMap } from "./tailwind-resolver.js";
import { send, onCommitResult } from "../bridge.js";
import type { PropertyControl } from "./controls/types.js";
import { pushUndoAction, type PropertyChangeRuntime } from "../canvas-state.js";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack, normalizeFileName, isSourceFile } from "bippy/source";

// Display values that enable flex layout controls
const FLEX_DISPLAYS = new Set(["flex", "inline-flex"]);

// Groups whose CSS properties are read immediately on inspect
const ESSENTIAL_GROUPS: Set<PropertyGroup> = new Set(["layout", "spacing", "size"]);

// Groups whose CSS properties are deferred until the section is expanded
const DEFERRED_GROUPS: Set<PropertyGroup> = new Set(["typography", "background"]);

// Tags that are inherently text-oriented
const TEXT_TAGS = new Set([
  "h1","h2","h3","h4","h5","h6","p","span","a",
  "button","label","li","td","th","blockquote","figcaption",
]);

/**
 * Determines which property groups are relevant for the given element
 * based on its computed styles, tag name, and children.
 * Future: for multi-select, compute intersection of relevant groups across all elements
 */
function getRelevantGroups(element: HTMLElement): Set<PropertyGroup> {
  const groups = new Set<PropertyGroup>(["spacing", "size", "background"] as PropertyGroup[]);
  const computed = getComputedStyle(element);

  // Layout: flex/grid containers or elements with children (potential containers)
  const display = computed.display;
  if (display === "flex" || display === "inline-flex" ||
      display === "grid" || display === "inline-grid" ||
      element.children.length > 0) {
    groups.add("layout");
  }

  // Typography: text elements or elements with direct text nodes
  const tagName = element.tagName.toLowerCase();
  const hasDirectText = Array.from(element.childNodes).some(
    n => n.nodeType === Node.TEXT_NODE && (n.textContent?.trim() ?? "").length > 0,
  );
  if (hasDirectText || TEXT_TAGS.has(tagName)) {
    groups.add("typography");
  }

  return groups;
}

// Timeout for commit result — if no response arrives, assume success
const COMMIT_RESULT_TIMEOUT_MS = 5_000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PendingUpdate {
  property: string;
  cssProperty: string;
  value: string;
  tailwindPrefix: string;
  tailwindToken: string | null;
  relatedPrefixes?: string[];
  originalValue: string;
}

// ---------------------------------------------------------------------------
// Module state
// ---------------------------------------------------------------------------

let state = {
  selectedElement: null as HTMLElement | null,
  componentInfo: null as ComponentInfo | null,
  elementIdentity: null as ElementIdentity | null,
  currentValues: new Map<string, string>(),
  originalValues: new Map<string, string>(),
  activeOverrides: new Map<string, string>(),
  pendingBatch: new Map<string, PendingUpdate>(),
  showAllGroups: false,
};

let controls: PropertyControl[] = [];
let sidebar: ReturnType<typeof createSidebar>;
let reacquireTimer: ReturnType<typeof setTimeout>;
let commitTimer: ReturnType<typeof setTimeout> | null = null;
const COMMIT_DEBOUNCE_MS = 300;

// Tracks in-flight commit so we can revert on failure
let inflightCommit: {
  batch: Map<string, PendingUpdate>;
  previousOriginals: Map<string, string>;
  timeoutId: ReturnType<typeof setTimeout>;
} | null = null;

// Cleanup for section-expand listener
let cleanupExpandListener: (() => void) | null = null;

// ---------------------------------------------------------------------------
// HMR survival observer
// ---------------------------------------------------------------------------

const observer = new MutationObserver(() => {
  if (state.selectedElement && !document.contains(state.selectedElement)) {
    clearTimeout(reacquireTimer);
    reacquireTimer = setTimeout(() => {
      reacquireElement();
    }, 80);
  }
});

/**
 * After HMR replaces the DOM, find the new element matching the stored
 * elementIdentity by walking fibers to match componentName + source location.
 * Re-inspects without slide animation if found; deselects if not.
 *
 * Uses a dual strategy:
 * 1. Synchronous fiber walk with _debugSource (React 18)
 * 2. Async getOwnerStack from bippy/source (React 19, where _debugSource is absent)
 */
function reacquireElement(): void {
  const identity = state.elementIdentity;
  const info = state.componentInfo;
  if (!identity || !info) {
    deselect();
    return;
  }

  // Strategy 1: synchronous _debugSource fiber walk (React 18)
  const matched = reacquireViaDebugSource(identity);
  if (matched) {
    inspect(matched, info);
    return;
  }

  // Strategy 2: async getOwnerStack (React 19)
  reacquireViaOwnerStack(identity).then((asyncMatched) => {
    if (asyncMatched) {
      inspect(asyncMatched, info);
    } else {
      deselect();
    }
  });
}

/** Synchronous reacquisition via _debugSource (React 18). */
function reacquireViaDebugSource(identity: ElementIdentity): HTMLElement | null {
  const candidates = document.querySelectorAll(identity.tagName);

  for (const el of candidates) {
    if (!(el instanceof HTMLElement)) continue;
    try {
      let fiber = getFiberFromHostInstance(el);
      while (fiber) {
        if (isCompositeFiber(fiber)) {
          const source = fiber._debugSource;
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

/** Async reacquisition via getOwnerStack (React 19). */
async function reacquireViaOwnerStack(identity: ElementIdentity): Promise<HTMLElement | null> {
  const candidates = document.querySelectorAll(identity.tagName);

  for (const el of candidates) {
    if (!(el instanceof HTMLElement)) continue;
    try {
      const fiber = getFiberFromHostInstance(el);
      if (!fiber) continue;

      const frames = await getOwnerStack(fiber);
      if (!frames || frames.length === 0) continue;

      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name !== identity.componentName) continue;

        let filePath = "";
        if (frame.fileName) {
          const normalized = normalizeFileName(frame.fileName);
          if (isSourceFile(normalized)) {
            filePath = normalized;
          }
        }

        if (
          filePath &&
          identity.filePath.endsWith(filePath) &&
          (frame.lineNumber ?? 0) === identity.lineNumber
        ) {
          return el;
        }
      }
    } catch {
      // getOwnerStack may fail — continue to next candidate
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Reads computed CSS values for the given element.
 * When `onlyGroups` is provided, only reads properties belonging to those groups.
 * This avoids unnecessary getPropertyValue calls for collapsed sections on initial inspect.
 */
function readComputedValues(
  element: HTMLElement,
  onlyGroups?: Set<PropertyGroup>,
): Map<string, string> {
  const computed = getComputedStyle(element);
  const values = new Map<string, string>();

  for (const desc of ALL_DESCRIPTORS) {
    if (onlyGroups && !onlyGroups.has(desc.group)) {
      // Use default placeholder — will be read lazily when section expands
      values.set(desc.key, desc.defaultValue);
      continue;
    }
    const value = computed.getPropertyValue(desc.cssProperty).trim();
    values.set(desc.key, value || desc.defaultValue);
  }

  return values;
}

/**
 * Reads deferred computed values for a specific group and updates state + controls.
 */
function readDeferredGroup(group: string): void {
  if (!state.selectedElement) return;

  const computed = getComputedStyle(state.selectedElement);
  for (const desc of ALL_DESCRIPTORS) {
    if (desc.group !== group) continue;
    // Skip properties that already have active overrides
    if (state.activeOverrides.has(desc.key)) continue;

    const value = computed.getPropertyValue(desc.cssProperty).trim();
    const resolved = value || desc.defaultValue;
    state.currentValues.set(desc.key, resolved);

    // Also update originalValues if this group hasn't been read yet
    if (state.originalValues.get(desc.key) === desc.defaultValue) {
      state.originalValues.set(desc.key, resolved);
    }

    // Update controls that display this value
    for (const ctrl of controls) {
      ctrl.setValue(desc.key, resolved);
    }
  }
}

function destroyControls(): void {
  for (const ctrl of controls) {
    ctrl.destroy();
  }
  controls = [];
}

/**
 * Re-renders sections (e.g., when display changes and flex controls need to appear/disappear).
 */
function rerenderSections(): void {
  if (!state.selectedElement || !state.componentInfo) return;
  destroyControls();

  const relevantGroups = state.showAllGroups
    ? null
    : getRelevantGroups(state.selectedElement);
  const descriptorsToRender = relevantGroups
    ? ALL_DESCRIPTORS.filter(d => relevantGroups.has(d.group))
    : ALL_DESCRIPTORS;

  const isFiltered = relevantGroups !== null && descriptorsToRender.length < ALL_DESCRIPTORS.length;
  const onShowAll = isFiltered ? () => setShowAllGroups(true) : undefined;

  const { container, controls: newControls } = renderSections(
    descriptorsToRender,
    state.currentValues,
    preview,
    scheduledCommit,
    onShowAll,
  );
  controls = newControls;
  sidebar.replaceContent(container);
}

/**
 * Debounced version of commit() for rapid-fire changes (e.g. arrow key increments).
 * Batches multiple calls within COMMIT_DEBOUNCE_MS into a single commit.
 */
export function scheduledCommit(): void {
  if (commitTimer) clearTimeout(commitTimer);
  commitTimer = setTimeout(() => {
    commitTimer = null;
    commit();
  }, COMMIT_DEBOUNCE_MS);
}

function resetState(): void {
  if (commitTimer) { clearTimeout(commitTimer); commitTimer = null; }
  if (cleanupExpandListener) { cleanupExpandListener(); cleanupExpandListener = null; }
  if (inflightCommit) { clearTimeout(inflightCommit.timeoutId); inflightCommit = null; }
  state = {
    selectedElement: null,
    componentInfo: null,
    elementIdentity: null,
    currentValues: new Map(),
    originalValues: new Map(),
    activeOverrides: new Map(),
    pendingBatch: new Map(),
    showAllGroups: false,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Initialises the property controller. Call once during overlay setup.
 */
export function initPropertyController(shadowRoot: ShadowRoot): void {
  sidebar = createSidebar(shadowRoot, () => {
    // Close button pressed — cancel overrides and clear state
    cancel();
    destroyControls();
    resetState();
  });

  // Surface transform errors from the CLI back to the user, and resolve in-flight commits
  onCommitResult((success, errorCode, errorMessage) => {
    // Always hide saving indicator
    if (sidebar) sidebar.hideSaving();

    if (inflightCommit) {
      clearTimeout(inflightCommit.timeoutId);

      if (success) {
        // Commit succeeded — in-flight state already applied optimistically
        inflightCommit = null;
      } else {
        // Commit failed — revert to previous originals and remove inline overrides
        const { batch, previousOriginals } = inflightCommit;
        inflightCommit = null;

        // Restore originalValues to pre-commit state
        for (const [key] of batch) {
          const prev = previousOriginals.get(key);
          if (prev !== undefined) {
            state.originalValues.set(key, prev);
          }
        }

        // Remove inline style overrides for the failed batch
        if (state.selectedElement) {
          for (const [key] of batch) {
            (state.selectedElement.style as any)[key] = "";
            state.activeOverrides.delete(key);
            const orig = state.originalValues.get(key);
            if (orig !== undefined) {
              state.currentValues.set(key, orig);
            }
          }
          // Refresh control displays
          for (const ctrl of controls) {
            for (const [key] of batch) {
              const orig = state.originalValues.get(key);
              if (orig !== undefined) ctrl.setValue(key, orig);
            }
          }
        }

        // Show error
        if (sidebar) {
          const friendlyMessages: Record<string, string> = {
            DYNAMIC_CLASSNAME: "Cannot modify dynamic className expression",
            CONFLICTING_CLASS: "Conflicting conditional class detected",
            ELEMENT_NOT_FOUND: "Could not find element in source",
          };
          const msg = friendlyMessages[errorCode || ""] || errorMessage || "Failed to write changes";
          sidebar.showWarning(msg, "Dismiss", () => sidebar.clearWarning());
        }
      }
    } else if (!success && sidebar) {
      // No in-flight commit tracked but got an error — still show it
      const friendlyMessages: Record<string, string> = {
        DYNAMIC_CLASSNAME: "Cannot modify dynamic className expression",
        CONFLICTING_CLASS: "Conflicting conditional class detected",
        ELEMENT_NOT_FOUND: "Could not find element in source",
      };
      const msg = friendlyMessages[errorCode || ""] || errorMessage || "Failed to write changes";
      sidebar.showWarning(msg, "Dismiss", () => sidebar.clearWarning());
    }
  });
}

/**
 * Inspect an element: read its computed styles, render controls, show sidebar.
 * If there are pending changes from a previous selection, commits them first.
 */
export function inspect(element: HTMLElement, info: ComponentInfo): void {
  // Commit any pending changes from previous selection
  if (state.pendingBatch.size > 0) {
    commit();
  }

  // Clean up previous controls
  destroyControls();

  // Set up new state — reset showAllGroups so new selections start with contextual filtering
  state.showAllGroups = false;
  state.selectedElement = element;
  state.componentInfo = info;
  state.elementIdentity = {
    componentName: info.componentName,
    filePath: info.filePath,
    lineNumber: info.lineNumber,
    columnNumber: info.columnNumber,
    tagName: info.tagName,
  };

  // Read essential groups immediately; defer collapsed groups
  const groupsToRead = new Set<PropertyGroup>(ESSENTIAL_GROUPS);
  for (const g of DEFERRED_GROUPS) {
    if (!isGroupCollapsed(g)) groupsToRead.add(g);
  }
  const values = readComputedValues(element, groupsToRead);
  state.currentValues = values;
  state.originalValues = new Map(values);
  state.activeOverrides = new Map();
  state.pendingBatch = new Map();

  // Listen for section expansions to lazily read deferred values
  if (cleanupExpandListener) cleanupExpandListener();
  cleanupExpandListener = onSectionExpand((group) => {
    if (DEFERRED_GROUPS.has(group as PropertyGroup)) {
      readDeferredGroup(group);
    }
  });

  // Determine which groups are relevant for this element
  const relevantGroups = state.showAllGroups
    ? null
    : getRelevantGroups(element);

  // Filter descriptors to only relevant groups
  const descriptorsToRender = relevantGroups
    ? ALL_DESCRIPTORS.filter(d => relevantGroups.has(d.group))
    : ALL_DESCRIPTORS;

  // Render sections
  const isFiltered = relevantGroups !== null && descriptorsToRender.length < ALL_DESCRIPTORS.length;
  const onShowAll = isFiltered ? () => setShowAllGroups(true) : undefined;

  const { container, controls: newControls } = renderSections(
    descriptorsToRender,
    state.currentValues,
    preview,
    scheduledCommit,
    onShowAll,
  );
  controls = newControls;

  // Reconnect observer scoped to selected element's parent
  observer.disconnect();
  observer.observe(element.parentElement || document.body, { childList: true, subtree: true });

  // Show sidebar
  sidebar.show(info.componentName, info.filePath, info.lineNumber, container);
}

/**
 * Applies an instant inline style override (Layer 1) and resolves the
 * corresponding Tailwind token for the pending batch.
 */
export function preview(key: string, cssValue: string): void {
  const desc = DESCRIPTOR_MAP.get(key);
  if (!desc || !state.selectedElement) return;

  // Layer 1: instant inline style override
  (state.selectedElement.style as any)[desc.key] = cssValue;
  state.activeOverrides.set(key, cssValue);
  state.currentValues.set(key, cssValue);

  // Resolve Tailwind token from the merged token map
  const tokens = getTokenMap();
  const reverseScaleKey = (desc.tailwindScale + "Reverse") as keyof MergedTokenMap;
  const reverseMap = tokens[reverseScaleKey] as Map<string, string> | undefined;
  let tailwindToken = reverseMap ? resolveTokenForValue(cssValue, reverseMap) : null;

  // For enum properties with enumValues, use the tailwindValue directly
  if (!tailwindToken && desc.enumValues) {
    const enumMatch = desc.enumValues.find(e => e.value === cssValue);
    if (enumMatch) {
      tailwindToken = enumMatch.tailwindValue;
    }
  }

  // Add to pending batch
  state.pendingBatch.set(key, {
    property: key,
    cssProperty: desc.cssProperty,
    value: cssValue,
    tailwindPrefix: desc.tailwindPrefix,
    tailwindToken,
    relatedPrefixes: desc.relatedPrefixes,
    originalValue: state.originalValues.get(key) || desc.defaultValue,
  });

  // When display changes, re-render sections so flex controls appear/disappear
  if (key === "display") {
    rerenderSections();

    // Show warning when element is hidden
    if (cssValue === "none") {
      const originalDisplay = state.originalValues.get("display") || "block";
      sidebar.showWarning("Element hidden", "Restore", () => {
        // Revert display to original value
        if (state.selectedElement) {
          (state.selectedElement.style as any).display = originalDisplay;
        }
        state.activeOverrides.delete("display");
        state.currentValues.set("display", originalDisplay);
        state.pendingBatch.delete("display");
        rerenderSections();
        sidebar.clearWarning();
      });
    } else {
      sidebar.clearWarning();
    }
  }
}

/**
 * Sends all pending property changes to the CLI via WebSocket.
 */
export function commit(): void {
  if (state.pendingBatch.size === 0) return;
  if (!state.componentInfo) return;

  const filePath = state.componentInfo.filePath;
  const lineNumber = state.componentInfo.lineNumber;
  const columnNumber = state.componentInfo.columnNumber - 1; // Convert 1-indexed to 0-indexed

  if (state.pendingBatch.size === 1) {
    const update = [...state.pendingBatch.values()][0];
    const desc = DESCRIPTOR_MAP.get(update.property);
    send({
      type: "updateProperty",
      filePath,
      lineNumber,
      columnNumber,
      ...update,
      framework: "tailwind",
      classPattern: desc?.classPattern,
      standalone: desc?.standalone,
    });
  } else {
    send({
      type: "updateProperties",
      filePath,
      lineNumber,
      columnNumber,
      updates: [...state.pendingBatch.values()].map(u => {
        const desc = DESCRIPTOR_MAP.get(u.property);
        return {
          ...u,
          classPattern: desc?.classPattern,
          standalone: desc?.standalone,
        };
      }),
      framework: "tailwind",
    });
  }

  // Push to canvas undo stack
  if (state.selectedElement && state.elementIdentity) {
    pushUndoAction({
      type: "propertyChange",
      elementIdentity: state.elementIdentity,
      element: state.selectedElement,
      overrides: [...state.pendingBatch.values()].map(u => ({
        cssProperty: u.cssProperty,
        previousValue: u.originalValue,
        newValue: u.value,
      })),
    } as PropertyChangeRuntime);
  }

  // Show saving indicator
  if (sidebar) sidebar.showSaving();

  // Save previous originals so we can revert on failure
  const previousOriginals = new Map<string, string>();
  for (const [key] of state.pendingBatch) {
    previousOriginals.set(key, state.originalValues.get(key) || "");
  }

  // Optimistically update originalValues to new values
  for (const [key, update] of state.pendingBatch) {
    state.originalValues.set(key, update.value);
  }

  // Track in-flight commit for potential revert on failure
  const batchSnapshot = new Map(state.pendingBatch);
  const timeoutId = setTimeout(() => {
    // No response within timeout — assume success and clear
    if (inflightCommit && inflightCommit.batch === batchSnapshot) {
      inflightCommit = null;
      if (sidebar) sidebar.hideSaving();
    }
  }, COMMIT_RESULT_TIMEOUT_MS);

  inflightCommit = { batch: batchSnapshot, previousOriginals, timeoutId };
  state.pendingBatch.clear();
}

/**
 * Reverts all inline style overrides and clears the pending batch.
 */
export function cancel(): void {
  if (!state.selectedElement) return;

  // Revert inline style overrides
  for (const [key] of state.activeOverrides) {
    (state.selectedElement.style as any)[key] = "";
  }

  // Restore currentValues to originals
  for (const [key, value] of state.originalValues) {
    state.currentValues.set(key, value);
  }

  // Update control displays
  for (const ctrl of controls) {
    for (const [key, value] of state.originalValues) {
      ctrl.setValue(key, value);
    }
  }

  state.activeOverrides.clear();
  state.pendingBatch.clear();
}

/**
 * Cancels pending changes, hides the sidebar, and clears all state.
 * Used by Escape key and Clear All (revert to original).
 */
export function deselect(): void {
  if (commitTimer) { clearTimeout(commitTimer); commitTimer = null; }
  observer.disconnect();
  cancel();
  destroyControls();
  if (sidebar) {
    sidebar.hide();
  }
  resetState();
}

/**
 * Commits pending changes, hides the sidebar, and clears all state.
 * Used when clicking outside the sidebar (click-away = confirm).
 */
export function commitAndDeselect(): void {
  if (commitTimer) { clearTimeout(commitTimer); commitTimer = null; }
  observer.disconnect();
  commit();
  destroyControls();
  if (sidebar) {
    sidebar.hide();
  }
  resetState();
}

/**
 * Returns true if there are uncommitted inline style overrides,
 * used by selection.ts to decide Escape key behavior.
 */
export function hasActiveOverrides(): boolean {
  return state.activeOverrides.size > 0;
}

export function setShowAllGroups(showAll: boolean): void {
  state.showAllGroups = showAll;
  rerenderSections();
}
