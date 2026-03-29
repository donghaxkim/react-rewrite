import type { ComponentInfo, ElementIdentity, PropertyGroup } from "@react-rewrite/shared";
import { ALL_DESCRIPTORS } from "./property-descriptors.js";
const DESCRIPTOR_MAP = new Map(ALL_DESCRIPTORS.map(d => [d.key, d]));
import { renderSections, isGroupCollapsed, onSectionExpand } from "./section-renderer.js";
import { createSidebar } from "./property-sidebar.js";
import { getTokenMap, resolveTokenForValue } from "./tailwind-resolver.js";
import type { MergedTokenMap } from "./tailwind-resolver.js";
import { send, onMessage, requestFileDiscovery } from "../bridge.js";
import { getCachedFilePath, setCachedFilePath } from "../file-discovery-cache.js";
import { addChangeEntry } from "../changelog.js";
import { showToast } from "../toolbar.js";
import type { PropertyControl } from "./controls/types.js";
import { addPendingPropertyOperation, pushUndoAction, type PropertyChangeRuntime } from "../canvas-state.js";
import { dismissOnboarding } from "../onboarding.js";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack } from "bippy/source";
import { resolveFrameFilePath } from "../utils/source-resolve.js";
import { computeNthOfType } from "../utils/nth-of-type.js";
import { classMatchesPrefix } from "../utils/class-matches-prefix.js";
import { setStyle, clearStyle } from "../utils/style-access.js";

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
  readOnly: false,
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

// Snapshot of commit data saved just before send(), used by onMessage handler
// (onCommitResult fires before onMessage, clearing inflightCommit — so we snapshot here)
let lastCommitSnapshot: {
  componentInfo: ComponentInfo;
  batch: Array<{ cssProperty: string; originalValue: string; value: string }>;
} | null = null;

// Cleanup for section-expand listener
let cleanupExpandListener: (() => void) | null = null;

// Cleanup for changelog onMessage listener
let cleanupChangelogListener: (() => void) | null = null;
let cleanupCommitListener: (() => void) | null = null;

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
    resolveFreshComponentInfo(matched, info).then((freshInfo) => {
      inspect(matched, freshInfo);
    });
    return;
  }

  // Strategy 2: async getOwnerStack (React 19)
  reacquireViaOwnerStack(identity).then(async (asyncMatched) => {
    if (asyncMatched) {
      const freshInfo = await resolveFreshComponentInfo(asyncMatched, info);
      inspect(asyncMatched, freshInfo);
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

        const filePath = resolveFrameFilePath(frame.fileName);

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

/**
 * Re-resolve fresh ComponentInfo from a DOM element's fiber.
 * Used after HMR to get updated line:col from the new fiber tree.
 */
async function resolveFreshComponentInfo(
  element: HTMLElement,
  fallbackInfo: ComponentInfo
): Promise<ComponentInfo> {
  const fiber = getFiberFromHostInstance(element);
  if (!fiber) return fallbackInfo;

  // Try getOwnerStack (React 19)
  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (name === fallbackInfo.componentName || !fallbackInfo.componentName) {
          const filePath = resolveFrameFilePath(frame.fileName);

          if (filePath) {
            const rect = element.getBoundingClientRect();
            return {
              ...fallbackInfo,
              filePath,
              lineNumber: frame.lineNumber ?? fallbackInfo.lineNumber,
              columnNumber: frame.columnNumber ?? fallbackInfo.columnNumber,
              boundingRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
            };
          }
        }
      }
    }
  } catch {
    // Fall through
  }

  // Try _debugSource (React 18)
  let current = fiber;
  while (current) {
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current.type);
      const debugSource = current._debugSource || current._debugOwner?._debugSource;
      if (name === fallbackInfo.componentName && debugSource?.fileName) {
        const rect = element.getBoundingClientRect();
        return {
          ...fallbackInfo,
          filePath: debugSource.fileName,
          lineNumber: debugSource.lineNumber ?? fallbackInfo.lineNumber,
          columnNumber: debugSource.columnNumber ?? fallbackInfo.columnNumber,
          boundingRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        };
      }
    }
    current = current.return;
  }

  return fallbackInfo;
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

function addPendingFromCurrentState(): void {
  if (!state.selectedElement || !state.componentInfo || state.pendingBatch.size === 0) return;

  const el = state.selectedElement;
  const info = state.componentInfo;
  const parentEl = el.parentElement;

  const originalClassName = el.getAttribute("class") || "";
  const classes = originalClassName.split(/\s+/).filter(Boolean);
  const updates: Array<{
    cssProperty: string;
    tailwindPrefix: string;
    tailwindToken: string | null;
    value: string;
    oldClass: string;
    newClass: string;
    relatedOldClasses: string[];
  }> = [];

  for (const [cssProperty, entry] of state.pendingBatch) {
    const desc = DESCRIPTOR_MAP.get(entry.property);

    // Layer 1: Use classPattern if available (disambiguates shared prefixes like "text")
    let oldClass = "";
    if (desc?.classPattern) {
      const pattern = new RegExp(desc.classPattern);
      oldClass = classes.find((c) => !c.includes(":") && pattern.test(c)) || "";
    } else {
      oldClass = classes.find((c) => classMatchesPrefix(c, entry.tailwindPrefix)) || "";
    }

    // Layer 2: Find related shorthand classes (e.g. p-4 when changing pt)
    const relatedOldClasses: string[] = [];
    for (const rp of entry.relatedPrefixes ?? []) {
      const found = classes.find((c) => classMatchesPrefix(c, rp));
      if (found) relatedOldClasses.push(found);
    }

    const newClass = entry.tailwindToken || "";
    updates.push({
      cssProperty,
      tailwindPrefix: entry.tailwindPrefix,
      tailwindToken: entry.tailwindToken,
      value: entry.value,
      oldClass,
      newClass,
      relatedOldClasses,
    });
  }

  const mergeKey = [
    info.filePath,
    info.lineNumber,
    info.columnNumber,
    info.tagName,
    el.id || "",
    computeNthOfType(el),
  ].join(":");

  addPendingPropertyOperation(
    mergeKey,
    {
      op: "updateClass",
      file: info.filePath,
      line: info.lineNumber,
      col: info.columnNumber - 1,
      componentName: info.componentName,
      tagName: el.tagName.toLowerCase(),
      className: el.className || undefined,
      parentTagName: parentEl?.tagName.toLowerCase(),
      parentClassName: parentEl?.className || undefined,
      nthOfType: computeNthOfType(el),
      id: el.id || undefined,
      jsxPath: state.componentInfo?.jsxPath,
      updates: [...state.pendingBatch.values()].map((entry) => {
        const desc = DESCRIPTOR_MAP.get(entry.property);
        return {
          tailwindPrefix: entry.tailwindPrefix,
          tailwindToken: entry.tailwindToken,
          value: entry.value,
          relatedPrefixes: entry.relatedPrefixes,
          classPattern: desc?.classPattern,
          standalone: desc?.standalone,
        };
      }),
    },
    [...state.pendingBatch.values()].map((entry) => entry.property),
  );
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
    readOnly: false,
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

  const handleCommitResult = (success: boolean, errorCode?: string, errorMessage?: string) => {
    if (sidebar) sidebar.hideSaving();

    if (inflightCommit) {
      clearTimeout(inflightCommit.timeoutId);

      if (success) {
        inflightCommit = null;
      } else {
        const { batch, previousOriginals } = inflightCommit;
        inflightCommit = null;

        for (const [key] of batch) {
          const prev = previousOriginals.get(key);
          if (prev !== undefined) {
            state.originalValues.set(key, prev);
          }
        }

        if (state.selectedElement) {
          for (const [key] of batch) {
            clearStyle(state.selectedElement, key);
            state.activeOverrides.delete(key);
            const orig = state.originalValues.get(key);
            if (orig !== undefined) {
              state.currentValues.set(key, orig);
            }
          }

          for (const ctrl of controls) {
            for (const [key] of batch) {
              const orig = state.originalValues.get(key);
              if (orig !== undefined) ctrl.setValue(key, orig);
            }
          }
        }

        lastCommitSnapshot = null;

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
      const friendlyMessages: Record<string, string> = {
        DYNAMIC_CLASSNAME: "Cannot modify dynamic className expression",
        CONFLICTING_CLASS: "Conflicting conditional class detected",
        ELEMENT_NOT_FOUND: "Could not find element in source",
      };
      const msg = friendlyMessages[errorCode || ""] || errorMessage || "Failed to write changes";
      sidebar.showWarning(msg, "Dismiss", () => sidebar.clearWarning());
    }
  };

  cleanupCommitListener = onMessage((msg) => {
    if (msg.type !== "commitBatchComplete" || !inflightCommit) return;

    const propertyResult = msg.results.find((result) => result.op === "updateClass");
    if (!propertyResult) return;

    const errorCodeMatch = propertyResult.error?.match(
      /^(DYNAMIC_CLASSNAME|FILE_CHANGED|MAPPED_ELEMENT|CONFLICTING_CLASS|ELEMENT_NOT_FOUND)/
    );

    handleCommitResult(
      propertyResult.success,
      errorCodeMatch?.[1],
      propertyResult.error || msg.error,
    );
  });

  // Listen for successful commits to add changelog entries
  cleanupChangelogListener = onMessage((msg) => {
    if (msg.type === "commitBatchComplete" && msg.success && lastCommitSnapshot) {
      const { componentInfo, batch } = lastCommitSnapshot;
      const undoId = msg.results.find((result) => result.op === "updateClass")?.undoId ?? msg.undoIds[0];
      if (!undoId) return;
      const identity = {
        componentName: componentInfo.componentName,
        filePath: componentInfo.filePath,
        lineNumber: componentInfo.lineNumber,
        columnNumber: componentInfo.columnNumber,
        tagName: componentInfo.tagName,
      };

      for (const update of batch) {
        addChangeEntry({
          type: "property",
          componentName: componentInfo.componentName,
          filePath: componentInfo.filePath,
          summary: `${update.cssProperty}: ${update.originalValue} → ${update.value}`,
          state: "active",
          propertyKey: update.cssProperty,
          elementIdentity: identity,
          revertData: { type: "cliUndo", undoIds: [undoId] },
        });
      }
      lastCommitSnapshot = null;
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

  dismissOnboarding();

  // Clean up previous controls
  destroyControls();

  // Set up new state — reset showAllGroups so new selections start with contextual filtering
  state.showAllGroups = false;
  state.readOnly = false; // Reset — previous selection may have been read-only
  state.selectedElement = element;
  state.componentInfo = info;

  // If filePath is empty (React 19), try file discovery by component name
  if (!info.filePath && info.componentName) {
    const cached = getCachedFilePath(info.componentName);
    if (cached) {
      state.componentInfo = { ...info, filePath: cached };
    } else {
      requestFileDiscovery(info.componentName).then((discovered) => {
        if (discovered) {
          setCachedFilePath(info.componentName, discovered);
          if (state.componentInfo?.componentName === info.componentName) {
            state.componentInfo = { ...state.componentInfo, filePath: discovered };
          }
        }
      });
    }
  }

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
  if (!info.filePath) {
    state.readOnly = true;
  }

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
  if (!info.filePath) {
    sidebar.showWarning("Source file couldn't be resolved for this element", "Dismiss", () => sidebar.clearWarning());
  } else {
    sidebar.clearWarning();
  }
}

/**
 * Applies an instant inline style override (Layer 1) and resolves the
 * corresponding Tailwind token for the pending batch.
 */
export function preview(key: string, cssValue: string): void {
  const desc = DESCRIPTOR_MAP.get(key);
  if (!desc || !state.selectedElement) return;

  // Layer 1: instant inline style override
  setStyle(state.selectedElement, desc.key, cssValue);
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
          setStyle(state.selectedElement, "display", originalDisplay);
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

  const filePath = state.componentInfo.filePath || "";
  const lineNumber = state.componentInfo.lineNumber;
  const columnNumber = state.componentInfo.columnNumber - 1;
  const el = state.selectedElement;

  // Build the batch operation with identity hints for React 19 resolution
  const updates = [...state.pendingBatch.values()].map(u => {
    const desc = DESCRIPTOR_MAP.get(u.property);
    return {
      tailwindPrefix: u.tailwindPrefix,
      tailwindToken: u.tailwindToken,
      value: u.value,
      relatedPrefixes: u.relatedPrefixes,
      classPattern: desc?.classPattern,
      standalone: desc?.standalone,
    };
  });

  const mergeKey = [
    filePath,
    lineNumber,
    columnNumber,
    el?.tagName.toLowerCase() || "",
    el?.id || "",
    el ? computeNthOfType(el) : 0,
  ].join(":");

  addPendingFromCurrentState();

  // Push to canvas undo stack
  if (el && state.elementIdentity) {
    pushUndoAction({
      type: "propertyChange",
      elementIdentity: state.elementIdentity,
      element: el,
      pendingMergeKey: mergeKey,
      pendingPropertyKeys: [...state.pendingBatch.values()].map(u => u.property),
      overrides: [...state.pendingBatch.values()].map(u => ({
        cssProperty: u.cssProperty,
        previousValue: u.originalValue,
        newValue: u.value,
      })),
    } as PropertyChangeRuntime);
  }

  // Update originalValues so next change is relative to this one
  for (const [key, update] of state.pendingBatch) {
    state.originalValues.set(key, update.value);
  }

  state.pendingBatch.clear();
}

/**
 * Reverts all inline style overrides and clears the pending batch.
 */
export function cancel(): void {
  if (!state.selectedElement) return;

  // Revert inline style overrides
  for (const [key] of state.activeOverrides) {
    clearStyle(state.selectedElement, key);
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

/**
 * Tears down the property controller — cleans up module-level listeners.
 * Call once during overlay teardown.
 */
export function destroyPropertyController(): void {
  if (cleanupCommitListener) {
    cleanupCommitListener();
    cleanupCommitListener = null;
  }
  if (cleanupChangelogListener) {
    cleanupChangelogListener();
    cleanupChangelogListener = null;
  }
  lastCommitSnapshot = null;
  deselect();
}
