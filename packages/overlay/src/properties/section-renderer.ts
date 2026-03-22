import type { PropertyDescriptor, PropertyGroup } from "@frameup/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./controls/types.js";
import { createNumberScrub } from "./controls/number-scrub.js";
import { createSegmented } from "./controls/segmented.js";
import { createColorSwatch } from "./controls/color-swatch.js";
import { createBoxModel } from "./controls/box-model.js";
import { COLORS, FONT_FAMILY, RADII, TRANSITIONS } from "../design-tokens.js";

// Persists collapse state across re-renders and element selections
const collapsedGroups = new Set<string>();

/** Returns true if the given group is currently collapsed in the sidebar. */
export function isGroupCollapsed(group: string): boolean {
  return collapsedGroups.has(group);
}

/** Listeners notified when a section is expanded so deferred values can be read. */
type SectionExpandListener = (group: string) => void;
const expandListeners: SectionExpandListener[] = [];

/** Register a callback for when a collapsed section is expanded. */
export function onSectionExpand(fn: SectionExpandListener): () => void {
  expandListeners.push(fn);
  return () => {
    const idx = expandListeners.indexOf(fn);
    if (idx >= 0) expandListeners.splice(idx, 1);
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GROUP_LABELS: Record<PropertyGroup, string> = {
  layout: "Layout",
  spacing: "Spacing",
  size: "Size",
  typography: "Typography",
  background: "Background",
};

type ControlFactory = (
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
) => PropertyControl;

const CONTROL_FACTORIES: Record<string, ControlFactory> = {
  "number-scrub": createNumberScrub,
  "segmented": createSegmented,
  "color-swatch": createColorSwatch,
  "box-model": createBoxModel,
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const SECTION_STYLES = `
  .prop-section {
    border-bottom: 1px solid ${COLORS.border};
  }
  .prop-section:last-child {
    border-bottom: none;
  }
  .prop-section-header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: ${COLORS.bgSecondary};
    cursor: pointer;
    user-select: none;
    font-family: ${FONT_FAMILY};
    font-size: 11px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .prop-section-header:hover {
    background: ${COLORS.bgTertiary};
  }
  .prop-section-chevron {
    width: 12px;
    height: 12px;
    transition: transform 150ms ease;
    color: ${COLORS.textTertiary};
  }
  .prop-section-chevron.collapsed {
    transform: rotate(-90deg);
  }
  .prop-section-body {
    padding: 10px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .prop-section-body.collapsed {
    display: none;
  }
  .prop-input {
    background: ${COLORS.bgTertiary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.xs};
    padding: 4px 6px;
    font-family: ${FONT_FAMILY};
    font-size: 11px;
    color: ${COLORS.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${TRANSITIONS.fast}, box-shadow ${TRANSITIONS.fast};
  }
  .prop-input:hover {
    border-color: ${COLORS.borderStrong};
  }
  .prop-input:focus {
    border-color: ${COLORS.accent};
    box-shadow: 0 0 0 2px ${COLORS.focusRing};
  }
  .prop-control-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .prop-control-label {
    width: 48px;
    flex-shrink: 0;
    font-size: 10px;
    font-family: ${FONT_FAMILY};
    color: ${COLORS.textTertiary};
    text-transform: capitalize;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .prop-control-value {
    flex: 1;
    min-width: 0;
  }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createChevronSvg(): string {
  return `<svg class="prop-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 4.5 6 7.5 9 4.5"/></svg>`;
}

/**
 * Groups descriptors by their `group` field, maintaining the order they appear
 * in the input array (i.e. the canonical descriptor order).
 */
function groupDescriptors(
  descriptors: PropertyDescriptor[],
): Map<PropertyGroup, PropertyDescriptor[]> {
  const groups = new Map<PropertyGroup, PropertyDescriptor[]>();
  for (const desc of descriptors) {
    let list = groups.get(desc.group);
    if (!list) {
      list = [];
      groups.set(desc.group, list);
    }
    list.push(desc);
  }
  return groups;
}

/**
 * Splits a group's descriptors into individual controls and compound controls.
 * Compound descriptors sharing the same `compoundGroup` are collected into a
 * single entry so the factory receives all of them at once.
 */
function splitCompound(
  descriptors: PropertyDescriptor[],
): Array<{ controlType: string; descriptors: PropertyDescriptor[] }> {
  const result: Array<{ controlType: string; descriptors: PropertyDescriptor[] }> = [];
  const compoundBuckets = new Map<string, PropertyDescriptor[]>();

  for (const desc of descriptors) {
    if (desc.compound && desc.compoundGroup) {
      let bucket = compoundBuckets.get(desc.compoundGroup);
      if (!bucket) {
        bucket = [];
        compoundBuckets.set(desc.compoundGroup, bucket);
      }
      bucket.push(desc);
    } else {
      result.push({ controlType: desc.controlType, descriptors: [desc] });
    }
  }

  // Append compound groups in the order they were first encountered
  for (const [, bucket] of compoundBuckets) {
    result.push({ controlType: bucket[0].controlType, descriptors: bucket });
  }

  return result;
}

// ---------------------------------------------------------------------------
// Flex-specific descriptor keys (only shown when display is flex/inline-flex)
// ---------------------------------------------------------------------------

const FLEX_ONLY_KEYS = new Set(["flexDirection", "justifyContent", "alignItems", "gap"]);

function isFlexDisplay(currentValues: Map<string, string>): boolean {
  const display = currentValues.get("display") ?? "";
  return display === "flex" || display === "inline-flex";
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function renderSections(
  descriptors: PropertyDescriptor[],
  currentValues: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): { container: HTMLElement; controls: PropertyControl[] } {
  const container = document.createElement("div");
  container.className = "prop-sections";

  // Inject styles once
  const style = document.createElement("style");
  style.textContent = SECTION_STYLES;
  container.appendChild(style);

  const allControls: PropertyControl[] = [];
  const grouped = groupDescriptors(descriptors);

  for (const [group, descs] of grouped) {
    // Filter out flex-only descriptors when display is not flex/inline-flex
    const filteredDescs = group === "layout" && !isFlexDisplay(currentValues)
      ? descs.filter(d => !FLEX_ONLY_KEYS.has(d.key))
      : descs;

    if (filteredDescs.length === 0) continue;

    const section = document.createElement("div");
    section.className = "prop-section";

    // Header
    const header = document.createElement("div");
    header.className = "prop-section-header";
    header.innerHTML = `<span>${GROUP_LABELS[group]}</span>${createChevronSvg()}`;

    const body = document.createElement("div");
    body.className = "prop-section-body";

    let collapsed = collapsedGroups.has(group);
    if (collapsed) {
      const chevron = header.querySelector(".prop-section-chevron");
      if (chevron) chevron.classList.add("collapsed");
      body.classList.add("collapsed");
    }

    header.addEventListener("click", () => {
      collapsed = !collapsed;
      if (collapsed) {
        collapsedGroups.add(group);
      } else {
        collapsedGroups.delete(group);
        // Notify listeners so deferred values can be read
        for (const fn of expandListeners) fn(group);
      }
      const chevron = header.querySelector(".prop-section-chevron");
      if (chevron) {
        chevron.classList.toggle("collapsed", collapsed);
      }
      body.classList.toggle("collapsed", collapsed);
    });

    section.appendChild(header);

    // Controls
    const entries = splitCompound(filteredDescs);
    for (const entry of entries) {
      const factory = CONTROL_FACTORIES[entry.controlType];
      if (!factory) continue;

      const control = factory(entry.descriptors, currentValues, onPreview, onCommit);

      // Compound controls (box-model) have their own layout — no label wrapper
      if (entry.descriptors.length > 1 || entry.controlType === "box-model") {
        body.appendChild(control.element);
      } else {
        const row = document.createElement("div");
        row.className = "prop-control-row";

        const label = document.createElement("span");
        label.className = "prop-control-label";
        label.textContent = entry.descriptors[0].label;
        label.title = entry.descriptors[0].label;

        const valueWrap = document.createElement("div");
        valueWrap.className = "prop-control-value";
        valueWrap.appendChild(control.element);

        row.appendChild(label);
        row.appendChild(valueWrap);
        body.appendChild(row);
      }

      allControls.push(control);
    }

    section.appendChild(body);
    container.appendChild(section);
  }

  return { container, controls: allControls };
}
