import type { PropertyDescriptor } from "@react-rewrite/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./types.js";
import { COLORS, FONT_FAMILY, RADII } from "../../design-tokens.js";
import { openColorPicker, closeColorPicker } from "../../color-picker.js";
import { getTokenMap, resolveTokenForValue } from "../tailwind-resolver.js";

let _colorCtx: CanvasRenderingContext2D | null = null;
function getColorCtx(): CanvasRenderingContext2D {
  if (!_colorCtx) {
    _colorCtx = document.createElement("canvas").getContext("2d")!;
  }
  return _colorCtx;
}

export function createColorSwatch(
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): PropertyControl {
  const descriptor = descriptors[0];

  const container = document.createElement("div");
  container.style.cssText = `display:flex; align-items:center; gap:6px;`;

  const swatch = document.createElement("div");
  swatch.style.cssText = `
    width:20px;
    height:20px;
    border-radius:${RADII.sm};
    border:1px solid ${COLORS.borderStrong};
    cursor:pointer;
    flex-shrink:0;
  `.trim().replace(/\n\s*/g, " ");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "#rrggbb";
  input.className = "prop-input";
  input.style.cssText = `flex:1; min-width:0;`;

  const tokenLabel = document.createElement("span");
  tokenLabel.style.cssText = `font-size:10px; color:${COLORS.textSecondary}; font-family:${FONT_FAMILY};`;

  container.appendChild(swatch);
  container.appendChild(input);
  container.appendChild(tokenLabel);

  let currentValue = values.get(descriptor.key) ?? descriptor.defaultValue;
  let pickerOpen = false;

  function cssColorToHex(cssValue: string): string {
    const v = cssValue.trim().toLowerCase();
    if (v === "transparent") return "transparent";
    if (v === "inherit" || v === "currentcolor" || v === "unset") return "#000000";
    if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return v;
    // Canvas normalization — handles rgb(), hsl(), named colors, space syntax
    const ctx = getColorCtx();
    ctx.fillStyle = "#000000";
    ctx.fillStyle = v;
    const result = ctx.fillStyle;
    if (result.startsWith("#")) return result;
    const m = result.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (m) {
      const r = parseInt(m[1], 10);
      const g = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    return "#000000";
  }

  function updateDisplay(cssValue: string): void {
    currentValue = cssValue;
    input.value = cssValue;
    if (cssValue === "transparent") {
      swatch.style.background = `repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px`;
    } else {
      swatch.style.background = cssValue;
    }

    // Resolve Tailwind color token
    try {
      const tokenMap = getTokenMap();
      const token = resolveTokenForValue(cssValue, tokenMap.colorsReverse);
      if (token) {
        tokenLabel.textContent = `${descriptor.tailwindPrefix ?? "bg"}-${token}`;
      } else {
        tokenLabel.textContent = "";
      }
    } catch {
      tokenLabel.textContent = "";
    }
  }

  function commitValue(): void {
    if (pickerOpen) return; // Don't commit on blur if picker is open
    const raw = input.value.trim();
    if (!raw) {
      updateDisplay(currentValue);
      return;
    }
    const normalized = cssColorToHex(raw);
    updateDisplay(normalized);
    onPreview(descriptor.key, normalized);
    onCommit();
  }

  // Swatch click — open color picker
  swatch.addEventListener("click", () => {
    if (pickerOpen) {
      closeColorPicker();
      pickerOpen = false;
      return;
    }

    const rect = swatch.getBoundingClientRect();
    pickerOpen = true;

    openColorPicker({
      initialColor: cssColorToHex(currentValue),
      position: { x: rect.left - 210, y: rect.top },
      showPropertyToggle: false,
      onColorChange: (hex: string) => {
        updateDisplay(hex);
        onPreview(descriptor.key, hex);
      },
      onClose: () => {
        pickerOpen = false;
        onCommit();
      },
    });
  });

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      commitValue();
      input.blur();
    } else if (e.key === "Escape") {
      updateDisplay(currentValue);
      input.blur();
    }
  });

  input.addEventListener("blur", () => {
    commitValue();
  });

  input.addEventListener("input", () => {
    // Live preview while typing if the value looks like a valid color
    const raw = input.value.trim();
    const normalized = cssColorToHex(raw);
    swatch.style.background = normalized;
  });

  updateDisplay(currentValue);

  return {
    element: container,
    setValue(key: string, cssValue: string): void {
      if (key !== descriptor.key) return;
      updateDisplay(cssValue);
    },
    destroy(): void {
      if (pickerOpen) {
        closeColorPicker();
        pickerOpen = false;
      }
    },
  };
}
