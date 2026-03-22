import type { PropertyDescriptor } from "@frameup/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./types.js";
import { COLORS, FONT_FAMILY, RADII } from "../../design-tokens.js";

type Side = "top" | "right" | "bottom" | "left";

interface SpacingEntry {
  descriptor: PropertyDescriptor;
  side: Side;
  layer: "padding" | "margin";
}

function parseSide(key: string): { layer: "padding" | "margin"; side: Side } | null {
  if (key === "paddingTop") return { layer: "padding", side: "top" };
  if (key === "paddingRight") return { layer: "padding", side: "right" };
  if (key === "paddingBottom") return { layer: "padding", side: "bottom" };
  if (key === "paddingLeft") return { layer: "padding", side: "left" };
  if (key === "marginTop") return { layer: "margin", side: "top" };
  if (key === "marginRight") return { layer: "margin", side: "right" };
  if (key === "marginBottom") return { layer: "margin", side: "bottom" };
  if (key === "marginLeft") return { layer: "margin", side: "left" };
  return null;
}

export function createBoxModel(
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): PropertyControl {
  const currentValues = new Map(values);

  // Map descriptors to their layer/side
  const entries: SpacingEntry[] = [];
  for (const descriptor of descriptors) {
    const parsed = parseSide(descriptor.key);
    if (parsed) {
      entries.push({ descriptor, ...parsed });
    }
  }

  // -----------------------------------------------------------------------
  // Root container
  // -----------------------------------------------------------------------
  const root = document.createElement("div");
  root.style.cssText = `
    display:flex;
    flex-direction:column;
    gap:4px;
    font-family:${FONT_FAMILY};
    font-size:10px;
    color:${COLORS.textSecondary};
    position:relative;
  `.trim().replace(/\n\s*/g, " ");

  // -----------------------------------------------------------------------
  // Nested box layout  (margin outer, padding inner, "content" center)
  // We use a CSS grid approach with a fixed template.
  // Layout:
  //   [margin-top label]
  //   [margin-left | [padding-top label] | margin-right]
  //   [            | [pad-left | CONTENT | pad-right]   ]
  //   [            | [padding-bottom]                   ]
  //   [margin-bottom]
  // -----------------------------------------------------------------------

  const boxWrapper = document.createElement("div");
  boxWrapper.style.cssText = `position:relative; padding:4px;`;

  // Outer margin box
  const marginBox = document.createElement("div");
  marginBox.style.cssText = `
    background:${COLORS.marginBoxBg};
    border:1px dashed ${COLORS.marginBoxBorder};
    border-radius:${RADII.sm};
    padding:10px;
    position:relative;
  `.trim().replace(/\n\s*/g, " ");

  // Padding box
  const paddingBox = document.createElement("div");
  paddingBox.style.cssText = `
    background:${COLORS.paddingBoxBg};
    border:1px dashed ${COLORS.paddingBoxBorder};
    border-radius:${RADII.sm};
    padding:8px;
    position:relative;
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g, " ");

  // Content center label
  const contentCenter = document.createElement("div");
  contentCenter.style.cssText = `
    grid-row:2;
    grid-column:2;
    text-align:center;
    color:${COLORS.textTertiary};
    font-size:9px;
    padding:4px 6px;
    background:${COLORS.bgSecondary};
    border-radius:3px;
    user-select:none;
  `.trim().replace(/\n\s*/g, " ");
  contentCenter.textContent = "content";

  // -----------------------------------------------------------------------
  // Track all interactive value cells
  // -----------------------------------------------------------------------
  interface Cell {
    key: string;
    span: HTMLElement;
    descriptor: PropertyDescriptor;
  }
  const cells: Cell[] = [];

  function makeValueCell(descriptor: PropertyDescriptor): HTMLElement {
    const span = document.createElement("span");
    const cssVal = currentValues.get(descriptor.key) ?? descriptor.defaultValue;
    span.textContent = formatValue(cssVal);
    span.title = descriptor.label;
    span.style.cssText = `
      cursor:pointer;
      color:${COLORS.textPrimary};
      font-size:10px;
      font-family:${FONT_FAMILY};
      padding:1px 4px;
      border-radius:3px;
      text-align:center;
      transition:background 100ms ease;
      display:inline-block;
      min-width:18px;
    `.trim().replace(/\n\s*/g, " ");

    span.addEventListener("mouseenter", () => {
      span.style.background = COLORS.bgTertiary;
    });
    span.addEventListener("mouseleave", () => {
      if (document.activeElement !== editInput || editInput.dataset.key !== descriptor.key) {
        span.style.background = "transparent";
      }
    });

    span.addEventListener("click", () => {
      activateEdit(descriptor, span);
    });

    cells.push({ key: descriptor.key, span, descriptor });
    return span;
  }

  // -----------------------------------------------------------------------
  // Inline edit input (shared single instance)
  // -----------------------------------------------------------------------
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "prop-input";
  editInput.style.cssText = `width:40px; text-align:center; display:none; position:absolute; z-index:10;`;

  root.appendChild(editInput);

  let editingDescriptor: PropertyDescriptor | null = null;
  let editingSpan: HTMLElement | null = null;

  function activateEdit(descriptor: PropertyDescriptor, span: HTMLElement): void {
    // Commit any pending edit first
    if (editingDescriptor && editingDescriptor !== descriptor) {
      commitEdit();
    }

    editingDescriptor = descriptor;
    editingSpan = span;
    editInput.dataset.key = descriptor.key;

    const cssVal = currentValues.get(descriptor.key) ?? descriptor.defaultValue;
    editInput.value = formatValue(cssVal);

    // Walk up offset parents to get position relative to root (scroll-independent)
    let offsetLeft = 0;
    let offsetTop = 0;
    let el: HTMLElement | null = span;
    while (el && el !== root) {
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.offsetParent as HTMLElement | null;
    }

    editInput.style.display = "block";
    editInput.style.left = `${offsetLeft}px`;
    editInput.style.top = `${offsetTop}px`;
    const spanRect = span.getBoundingClientRect();
    editInput.style.width = `${Math.max(40, spanRect.width + 10)}px`;

    editInput.focus();
    editInput.select();
  }

  function commitEdit(): void {
    if (!editingDescriptor || !editingSpan) return;
    const raw = editInput.value.trim();
    const descriptor = editingDescriptor;
    const span = editingSpan;

    let cssValue: string;
    const num = parseFloat(raw);
    const VALID_KEYWORDS = new Set(["auto", "none", "normal", "inherit", "initial", "0"]);
    if (!isNaN(num)) {
      const unitMatch = raw.match(/(px|rem|em|%|vw|vh|ch)$/);
      cssValue = unitMatch ? raw : `${num}px`;
    } else if (VALID_KEYWORDS.has(raw)) {
      cssValue = raw;
    } else {
      // Revert to current
      cssValue = currentValues.get(descriptor.key) ?? descriptor.defaultValue;
    }

    currentValues.set(descriptor.key, cssValue);
    span.textContent = formatValue(cssValue);
    span.style.background = "transparent";

    editInput.style.display = "none";
    editInput.dataset.key = "";
    editingDescriptor = null;
    editingSpan = null;

    onPreview(descriptor.key, cssValue);
    onCommit();
  }

  editInput.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      commitEdit();
    } else if (e.key === "Escape") {
      // Revert
      if (editingDescriptor && editingSpan) {
        const cssVal = currentValues.get(editingDescriptor.key) ?? editingDescriptor.defaultValue;
        editingSpan.textContent = formatValue(cssVal);
      }
      editInput.style.display = "none";
      editInput.dataset.key = "";
      editingDescriptor = null;
      editingSpan = null;
    }
  });

  editInput.addEventListener("blur", () => {
    commitEdit();
  });

  // -----------------------------------------------------------------------
  // Format helper
  // -----------------------------------------------------------------------
  function formatValue(cssValue: string): string {
    const num = parseFloat(cssValue);
    if (!isNaN(num)) {
      // Show integer if it rounds cleanly
      return num === Math.round(num) ? String(Math.round(num)) : cssValue;
    }
    return cssValue;
  }

  // -----------------------------------------------------------------------
  // Layer label
  // -----------------------------------------------------------------------
  function makeLayerLabel(text: string): HTMLElement {
    const el = document.createElement("span");
    el.textContent = text;
    el.style.cssText = `
      font-size:9px;
      color:${COLORS.textTertiary};
      text-transform:uppercase;
      letter-spacing:0.05em;
      user-select:none;
    `.trim().replace(/\n\s*/g, " ");
    return el;
  }

  // -----------------------------------------------------------------------
  // Build padding box grid
  //   row 1: [empty] [pad-top]   [empty]
  //   row 2: [pad-left] [content] [pad-right]
  //   row 3: [empty] [pad-bottom] [empty]
  // -----------------------------------------------------------------------
  function getByKeyword(layer: "padding" | "margin", side: Side): SpacingEntry | undefined {
    return entries.find((e) => e.layer === layer && e.side === side);
  }

  function makeCell(layer: "padding" | "margin", side: Side): HTMLElement {
    const entry = getByKeyword(layer, side);
    if (!entry) {
      const placeholder = document.createElement("span");
      placeholder.textContent = "-";
      placeholder.style.cssText = `text-align:center; color:${COLORS.textTertiary};`;
      return placeholder;
    }
    return makeValueCell(entry.descriptor);
  }

  // Padding grid (inner)
  const padTop = makeCell("padding", "top");
  padTop.style.gridRow = "1";
  padTop.style.gridColumn = "2";
  padTop.style.textAlign = "center";

  const padLeft = makeCell("padding", "left");
  padLeft.style.gridRow = "2";
  padLeft.style.gridColumn = "1";

  const padRight = makeCell("padding", "right");
  padRight.style.gridRow = "2";
  padRight.style.gridColumn = "3";

  const padBottom = makeCell("padding", "bottom");
  padBottom.style.gridRow = "3";
  padBottom.style.gridColumn = "2";
  padBottom.style.textAlign = "center";

  contentCenter.style.gridRow = "2";
  contentCenter.style.gridColumn = "2";

  paddingBox.appendChild(padTop);
  paddingBox.appendChild(padLeft);
  paddingBox.appendChild(contentCenter);
  paddingBox.appendChild(padRight);
  paddingBox.appendChild(padBottom);

  // Margin grid (outer) - similar layout wrapping the padding box
  const marginGrid = document.createElement("div");
  marginGrid.style.cssText = `
    display:grid;
    grid-template-rows:auto auto auto;
    grid-template-columns:auto 1fr auto;
    align-items:center;
    gap:2px;
  `.trim().replace(/\n\s*/g, " ");

  const mTop = makeCell("margin", "top");
  mTop.style.gridRow = "1";
  mTop.style.gridColumn = "2";
  mTop.style.textAlign = "center";

  const mLeft = makeCell("margin", "left");
  mLeft.style.gridRow = "2";
  mLeft.style.gridColumn = "1";

  const mRight = makeCell("margin", "right");
  mRight.style.gridRow = "2";
  mRight.style.gridColumn = "3";

  const mBottom = makeCell("margin", "bottom");
  mBottom.style.gridRow = "3";
  mBottom.style.gridColumn = "2";
  mBottom.style.textAlign = "center";

  // Center cell of margin grid = padding box
  const paddingWrapper = document.createElement("div");
  paddingWrapper.style.cssText = `grid-row:2; grid-column:2;`;
  paddingWrapper.appendChild(paddingBox);

  marginGrid.appendChild(mTop);
  marginGrid.appendChild(mLeft);
  marginGrid.appendChild(paddingWrapper);
  marginGrid.appendChild(mRight);
  marginGrid.appendChild(mBottom);

  // -----------------------------------------------------------------------
  // Assemble labels + margin box
  // -----------------------------------------------------------------------
  const marginLabel = makeLayerLabel("margin");
  const paddingLabel = makeLayerLabel("padding");

  const labelRow = document.createElement("div");
  labelRow.style.cssText = `display:flex; gap:8px; padding:0 4px;`;
  labelRow.appendChild(marginLabel);
  labelRow.appendChild(paddingLabel);

  marginBox.appendChild(marginGrid);
  boxWrapper.appendChild(marginBox);

  root.appendChild(labelRow);
  root.appendChild(boxWrapper);

  return {
    element: root,
    setValue(key: string, cssValue: string): void {
      const parsed = parseSide(key);
      if (!parsed) return;
      currentValues.set(key, cssValue);
      const cell = cells.find((c) => c.key === key);
      if (cell) {
        cell.span.textContent = formatValue(cssValue);
      }
    },
    destroy(): void {
      // No document-level listeners beyond the shared editInput (no capture)
    },
  };
}
