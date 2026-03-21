import type { ComponentInfo, ElementIdentity } from "@sketch-ui/shared";
import { ALL_DESCRIPTORS } from "./property-descriptors.js";
import { renderSections } from "./section-renderer.js";
import { createSidebar } from "./property-sidebar.js";
import { getTokenMap, resolveTokenForValue } from "./tailwind-resolver.js";
import type { MergedTokenMap } from "./tailwind-resolver.js";
import { send } from "../bridge.js";
import type { PropertyControl } from "./controls/types.js";
import { pushUndoAction, type PropertyChangeRuntime } from "../canvas-state.js";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";

// Display values that enable flex layout controls
const FLEX_DISPLAYS = new Set(["flex", "inline-flex"]);

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
};

let controls: PropertyControl[] = [];
let sidebar: ReturnType<typeof createSidebar>;
let reacquireTimer: ReturnType<typeof setTimeout>;

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
 */
function reacquireElement(): void {
  const identity = state.elementIdentity;
  const info = state.componentInfo;
  if (!identity || !info) {
    deselect();
    return;
  }

  // Find all elements with the same tag, then check fibers for source match
  const candidates = document.querySelectorAll(identity.tagName);
  let matched: HTMLElement | null = null;

  for (const el of candidates) {
    if (!(el instanceof HTMLElement)) continue;
    try {
      let fiber = getFiberFromHostInstance(el);
      // Walk up fiber tree to find a composite fiber with matching source
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
            matched = el;
            break;
          }
        }
        fiber = fiber.return;
      }
    } catch {
      // fiber walk may fail
    }
    if (matched) break;
  }

  if (matched) {
    inspect(matched, info);
  } else {
    deselect();
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function readComputedValues(element: HTMLElement): Map<string, string> {
  const computed = getComputedStyle(element);
  const values = new Map<string, string>();

  for (const desc of ALL_DESCRIPTORS) {
    const value = computed.getPropertyValue(desc.cssProperty).trim();
    values.set(desc.key, value || desc.defaultValue);
  }

  return values;
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
  const { container, controls: newControls } = renderSections(
    ALL_DESCRIPTORS,
    state.currentValues,
    preview,
    commit,
  );
  controls = newControls;
  sidebar.replaceContent(container);
}

function resetState(): void {
  state = {
    selectedElement: null,
    componentInfo: null,
    elementIdentity: null,
    currentValues: new Map(),
    originalValues: new Map(),
    activeOverrides: new Map(),
    pendingBatch: new Map(),
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
  observer.observe(document.body, { childList: true, subtree: true });
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

  // Set up new state
  state.selectedElement = element;
  state.componentInfo = info;
  state.elementIdentity = {
    componentName: info.componentName,
    filePath: info.filePath,
    lineNumber: info.lineNumber,
    columnNumber: info.columnNumber,
    tagName: info.tagName,
  };

  // Read current computed values
  const values = readComputedValues(element);
  state.currentValues = values;
  state.originalValues = new Map(values);
  state.activeOverrides = new Map();
  state.pendingBatch = new Map();

  // Render sections
  const { container, controls: newControls } = renderSections(
    ALL_DESCRIPTORS,
    state.currentValues,
    preview,
    commit,
  );
  controls = newControls;

  // Show sidebar
  sidebar.show(info.componentName, info.filePath, info.lineNumber, container);
}

/**
 * Applies an instant inline style override (Layer 1) and resolves the
 * corresponding Tailwind token for the pending batch.
 */
export function preview(key: string, cssValue: string): void {
  const desc = ALL_DESCRIPTORS.find((d) => d.key === key);
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
    const desc = ALL_DESCRIPTORS.find(d => d.key === update.property);
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
        const desc = ALL_DESCRIPTORS.find(d => d.key === u.property);
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

  // Update originalValues to new values
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
