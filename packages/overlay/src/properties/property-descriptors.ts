import type { PropertyDescriptor } from "@sketch-ui/shared";

// --- Layout ---
export const LAYOUT_DESCRIPTORS: PropertyDescriptor[] = [
  {
    key: "display",
    label: "Display",
    group: "layout",
    controlType: "segmented",
    cssProperty: "display",
    tailwindPrefix: "",
    tailwindScale: "display",
    defaultValue: "block",
    standalone: true,
    classPattern: "^(block|flex|grid|inline-flex|inline-block|inline|hidden|contents)$",
    enumValues: [
      { value: "block", tailwindValue: "block", label: "Block" },
      { value: "flex", tailwindValue: "flex", label: "Flex" },
      { value: "grid", tailwindValue: "grid", label: "Grid" },
      { value: "inline-flex", tailwindValue: "inline-flex", label: "Inline Flex" },
      { value: "none", tailwindValue: "hidden", label: "None" },
    ],
  },
  {
    key: "flexDirection",
    label: "Direction",
    group: "layout",
    controlType: "segmented",
    cssProperty: "flex-direction",
    tailwindPrefix: "flex",
    tailwindScale: "flexDirection",
    defaultValue: "row",
    classPattern: "^flex-(row|col|row-reverse|col-reverse)$",
    enumValues: [
      { value: "row", tailwindValue: "row", label: "Row", icon: "→" },
      { value: "column", tailwindValue: "col", label: "Column", icon: "↓" },
      { value: "row-reverse", tailwindValue: "row-reverse", label: "Row Reverse", icon: "←" },
      { value: "column-reverse", tailwindValue: "col-reverse", label: "Column Reverse", icon: "↑" },
    ],
  },
  {
    key: "justifyContent",
    label: "Justify",
    group: "layout",
    controlType: "segmented",
    cssProperty: "justify-content",
    tailwindPrefix: "justify",
    tailwindScale: "justifyContent",
    defaultValue: "flex-start",
    enumValues: [
      { value: "flex-start", tailwindValue: "start", label: "Start" },
      { value: "center", tailwindValue: "center", label: "Center" },
      { value: "flex-end", tailwindValue: "end", label: "End" },
      { value: "space-between", tailwindValue: "between", label: "Between" },
      { value: "space-around", tailwindValue: "around", label: "Around" },
      { value: "space-evenly", tailwindValue: "evenly", label: "Evenly" },
    ],
  },
  {
    key: "alignItems",
    label: "Align",
    group: "layout",
    controlType: "segmented",
    cssProperty: "align-items",
    tailwindPrefix: "items",
    tailwindScale: "alignItems",
    defaultValue: "stretch",
    enumValues: [
      { value: "flex-start", tailwindValue: "start", label: "Start" },
      { value: "center", tailwindValue: "center", label: "Center" },
      { value: "flex-end", tailwindValue: "end", label: "End" },
      { value: "stretch", tailwindValue: "stretch", label: "Stretch" },
      { value: "baseline", tailwindValue: "baseline", label: "Baseline" },
    ],
  },
  {
    key: "gap",
    label: "Gap",
    group: "layout",
    controlType: "number-scrub",
    cssProperty: "gap",
    tailwindPrefix: "gap",
    tailwindScale: "spacing",
    defaultValue: "0",
    min: 0,
  },
];

// --- Spacing (compound: box-model) ---
export const SPACING_DESCRIPTORS: PropertyDescriptor[] = [
  // Padding
  { key: "paddingTop", label: "Top", group: "spacing", controlType: "box-model", cssProperty: "padding-top", tailwindPrefix: "pt", tailwindScale: "spacing", relatedPrefixes: ["p", "py"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  { key: "paddingRight", label: "Right", group: "spacing", controlType: "box-model", cssProperty: "padding-right", tailwindPrefix: "pr", tailwindScale: "spacing", relatedPrefixes: ["p", "px"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  { key: "paddingBottom", label: "Bottom", group: "spacing", controlType: "box-model", cssProperty: "padding-bottom", tailwindPrefix: "pb", tailwindScale: "spacing", relatedPrefixes: ["p", "py"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  { key: "paddingLeft", label: "Left", group: "spacing", controlType: "box-model", cssProperty: "padding-left", tailwindPrefix: "pl", tailwindScale: "spacing", relatedPrefixes: ["p", "px"], defaultValue: "0", min: 0, compound: true, compoundGroup: "spacing" },
  // Margin
  { key: "marginTop", label: "Top", group: "spacing", controlType: "box-model", cssProperty: "margin-top", tailwindPrefix: "mt", tailwindScale: "spacing", relatedPrefixes: ["m", "my"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
  { key: "marginRight", label: "Right", group: "spacing", controlType: "box-model", cssProperty: "margin-right", tailwindPrefix: "mr", tailwindScale: "spacing", relatedPrefixes: ["m", "mx"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
  { key: "marginBottom", label: "Bottom", group: "spacing", controlType: "box-model", cssProperty: "margin-bottom", tailwindPrefix: "mb", tailwindScale: "spacing", relatedPrefixes: ["m", "my"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
  { key: "marginLeft", label: "Left", group: "spacing", controlType: "box-model", cssProperty: "margin-left", tailwindPrefix: "ml", tailwindScale: "spacing", relatedPrefixes: ["m", "mx"], defaultValue: "0", compound: true, compoundGroup: "spacing" },
];

// --- Size ---
export const SIZE_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "width", label: "W", group: "size", controlType: "number-scrub", cssProperty: "width", tailwindPrefix: "w", tailwindScale: "spacing", defaultValue: "auto", min: 0 },
  { key: "height", label: "H", group: "size", controlType: "number-scrub", cssProperty: "height", tailwindPrefix: "h", tailwindScale: "spacing", defaultValue: "auto", min: 0 },
  { key: "minWidth", label: "Min W", group: "size", controlType: "number-scrub", cssProperty: "min-width", tailwindPrefix: "min-w", tailwindScale: "spacing", defaultValue: "0", min: 0 },
  { key: "maxWidth", label: "Max W", group: "size", controlType: "number-scrub", cssProperty: "max-width", tailwindPrefix: "max-w", tailwindScale: "spacing", defaultValue: "none" },
  { key: "minHeight", label: "Min H", group: "size", controlType: "number-scrub", cssProperty: "min-height", tailwindPrefix: "min-h", tailwindScale: "spacing", defaultValue: "0", min: 0 },
  { key: "maxHeight", label: "Max H", group: "size", controlType: "number-scrub", cssProperty: "max-height", tailwindPrefix: "max-h", tailwindScale: "spacing", defaultValue: "none" },
];

// --- Typography ---
export const TYPOGRAPHY_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "fontSize", label: "Size", group: "typography", controlType: "number-scrub", cssProperty: "font-size", tailwindPrefix: "text", tailwindScale: "fontSize", defaultValue: "16px", min: 0, classPattern: "^text-(xs|sm|base|lg|xl|\\d+xl|\\[.+\\])$" },
  {
    key: "fontWeight", label: "Weight", group: "typography", controlType: "segmented", cssProperty: "font-weight", tailwindPrefix: "font", tailwindScale: "fontWeight", defaultValue: "400",
    enumValues: [
      { value: "100", tailwindValue: "thin", label: "100" },
      { value: "200", tailwindValue: "extralight", label: "200" },
      { value: "300", tailwindValue: "light", label: "300" },
      { value: "400", tailwindValue: "normal", label: "400" },
      { value: "500", tailwindValue: "medium", label: "500" },
      { value: "600", tailwindValue: "semibold", label: "600" },
      { value: "700", tailwindValue: "bold", label: "700" },
      { value: "800", tailwindValue: "extrabold", label: "800" },
      { value: "900", tailwindValue: "black", label: "900" },
    ],
  },
  { key: "lineHeight", label: "Height", group: "typography", controlType: "number-scrub", cssProperty: "line-height", tailwindPrefix: "leading", tailwindScale: "lineHeight", defaultValue: "normal" },
  { key: "letterSpacing", label: "Spacing", group: "typography", controlType: "number-scrub", cssProperty: "letter-spacing", tailwindPrefix: "tracking", tailwindScale: "letterSpacing", defaultValue: "normal" },
  {
    key: "textAlign", label: "Align", group: "typography", controlType: "segmented", cssProperty: "text-align", tailwindPrefix: "text", tailwindScale: "textAlign", defaultValue: "left",
    classPattern: "^text-(left|center|right|justify|start|end)$",
    enumValues: [
      { value: "left", tailwindValue: "left", label: "Left" },
      { value: "center", tailwindValue: "center", label: "Center" },
      { value: "right", tailwindValue: "right", label: "Right" },
      { value: "justify", tailwindValue: "justify", label: "Justify" },
    ],
  },
  { key: "color", label: "Color", group: "typography", controlType: "color-swatch", cssProperty: "color", tailwindPrefix: "text", tailwindScale: "colors", defaultValue: "#000000", classPattern: "^text-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$" },
];

// --- Background ---
export const BACKGROUND_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "backgroundColor", label: "Color", group: "background", controlType: "color-swatch", cssProperty: "background-color", tailwindPrefix: "bg", tailwindScale: "colors", defaultValue: "transparent" },
];

// --- Border ---
export const BORDER_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "borderWidth", label: "Width", group: "border", controlType: "number-scrub", cssProperty: "border-width", tailwindPrefix: "border", tailwindScale: "borderWidth", defaultValue: "0", min: 0, classPattern: "^border-(\\d+|\\[.+\\])$" },
  { key: "borderColor", label: "Color", group: "border", controlType: "color-swatch", cssProperty: "border-color", tailwindPrefix: "border", tailwindScale: "colors", defaultValue: "#000000", classPattern: "^border-(\\w+-\\d+|black|white|transparent|current|inherit|\\[.+\\])$" },
  {
    key: "borderStyle", label: "Style", group: "border", controlType: "segmented", cssProperty: "border-style", tailwindPrefix: "border", tailwindScale: "borderStyle", defaultValue: "none",
    classPattern: "^border-(solid|dashed|dotted|double|none)$",
    enumValues: [
      { value: "solid", tailwindValue: "solid", label: "Solid" },
      { value: "dashed", tailwindValue: "dashed", label: "Dashed" },
      { value: "dotted", tailwindValue: "dotted", label: "Dotted" },
      { value: "none", tailwindValue: "none", label: "None" },
    ],
  },
  { key: "borderRadius", label: "Radius", group: "border", controlType: "number-scrub", cssProperty: "border-radius", tailwindPrefix: "rounded", tailwindScale: "borderRadius", defaultValue: "0", min: 0 },
  { key: "borderTopLeftRadius", label: "TL", group: "border", controlType: "number-scrub", cssProperty: "border-top-left-radius", tailwindPrefix: "rounded-tl", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-t", "rounded-l"], defaultValue: "0", min: 0 },
  { key: "borderTopRightRadius", label: "TR", group: "border", controlType: "number-scrub", cssProperty: "border-top-right-radius", tailwindPrefix: "rounded-tr", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-t", "rounded-r"], defaultValue: "0", min: 0 },
  { key: "borderBottomRightRadius", label: "BR", group: "border", controlType: "number-scrub", cssProperty: "border-bottom-right-radius", tailwindPrefix: "rounded-br", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-b", "rounded-r"], defaultValue: "0", min: 0 },
  { key: "borderBottomLeftRadius", label: "BL", group: "border", controlType: "number-scrub", cssProperty: "border-bottom-left-radius", tailwindPrefix: "rounded-bl", tailwindScale: "borderRadius", relatedPrefixes: ["rounded", "rounded-b", "rounded-l"], defaultValue: "0", min: 0 },
];

// --- Effects ---
export const EFFECTS_DESCRIPTORS: PropertyDescriptor[] = [
  { key: "opacity", label: "Opacity", group: "effects", controlType: "slider", cssProperty: "opacity", tailwindPrefix: "opacity", tailwindScale: "opacity", defaultValue: "1", min: 0, max: 100 },
];

// All descriptors in group order
export const ALL_DESCRIPTORS: PropertyDescriptor[] = [
  ...LAYOUT_DESCRIPTORS,
  ...SPACING_DESCRIPTORS,
  ...SIZE_DESCRIPTORS,
  ...TYPOGRAPHY_DESCRIPTORS,
  ...BACKGROUND_DESCRIPTORS,
  ...BORDER_DESCRIPTORS,
  ...EFFECTS_DESCRIPTORS,
];
