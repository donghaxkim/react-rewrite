import type { PropertyDescriptor, PropertyGroup } from "@sketch-ui/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./controls/types.js";
import { createNumberScrub } from "./controls/number-scrub.js";
import { createSegmented } from "./controls/segmented.js";
import { createColorSwatch } from "./controls/color-swatch.js";
import { createSlider } from "./controls/slider.js";
import { createBoxModel } from "./controls/box-model.js";
import { COLORS, FONT_FAMILY, RADII } from "../design-tokens.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GROUP_LABELS: Record<PropertyGroup, string> = {
  layout: "Layout",
  spacing: "Spacing",
  size: "Size",
  typography: "Typography",
  background: "Background",
  border: "Border",
  effects: "Effects",
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
  "slider": createSlider,
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
    padding: 8px 12px;
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
    padding: 8px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .prop-section-body.collapsed {
    display: none;
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
    const section = document.createElement("div");
    section.className = "prop-section";

    // Header
    const header = document.createElement("div");
    header.className = "prop-section-header";
    header.innerHTML = `<span>${GROUP_LABELS[group]}</span>${createChevronSvg()}`;

    const body = document.createElement("div");
    body.className = "prop-section-body";

    let collapsed = false;
    header.addEventListener("click", () => {
      collapsed = !collapsed;
      const chevron = header.querySelector(".prop-section-chevron");
      if (chevron) {
        chevron.classList.toggle("collapsed", collapsed);
      }
      body.classList.toggle("collapsed", collapsed);
    });

    section.appendChild(header);

    // Controls
    const entries = splitCompound(descs);
    for (const entry of entries) {
      const factory = CONTROL_FACTORIES[entry.controlType];
      if (!factory) continue;

      const control = factory(entry.descriptors, currentValues, onPreview, onCommit);
      body.appendChild(control.element);
      allControls.push(control);
    }

    section.appendChild(body);
    container.appendChild(section);
  }

  return { container, controls: allControls };
}
