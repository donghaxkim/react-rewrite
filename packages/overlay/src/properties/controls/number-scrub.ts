import type { PropertyDescriptor } from "@react-rewrite/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./types.js";
import { getSnapPoints } from "../tailwind-resolver.js";
import { COLORS, FONT_FAMILY } from "../../design-tokens.js";

const VALID_KEYWORDS = new Set(["auto", "none", "normal", "inherit", "initial"]);

export function createNumberScrub(
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): PropertyControl {
  const descriptor = descriptors[0];
  const scaleName = descriptor.tailwindScale as Parameters<typeof getSnapPoints>[0];

  const container = document.createElement("div");
  container.style.cssText = `display:flex; align-items:center; gap:4px;`;

  const input = document.createElement("input");
  input.type = "text";
  input.className = "prop-input";
  input.style.cssText = `width:60px; cursor:text;`;

  const tokenLabel = document.createElement("span");
  tokenLabel.style.cssText = `font-size:10px; color:${COLORS.textSecondary}; font-family:${FONT_FAMILY};`;

  container.appendChild(input);
  container.appendChild(tokenLabel);

  // State
  let currentValues = new Map(values);

  function getCurrentCssValue(): string {
    return currentValues.get(descriptor.key) ?? descriptor.defaultValue;
  }

  function updateDisplay(cssValue: string): void {
    const num = parseFloat(cssValue);
    input.value = isNaN(num) ? cssValue : String(num);

    // Look up token
    try {
      const snapPoints = getSnapPoints(scaleName, cssValue);
      const match = snapPoints.find((p) => p.cssValue === cssValue);
      if (match?.token) {
        tokenLabel.textContent = `${descriptor.tailwindPrefix}-${match.token}`;
      } else {
        tokenLabel.textContent = "";
      }
    } catch {
      tokenLabel.textContent = "";
    }
  }

  // Text input editing — commit on blur
  input.addEventListener("blur", () => {
    const raw = input.value.trim();
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      const unitMatch = raw.match(/(px|rem|em|%|vw|vh|ch)$/);
      const cssValue = unitMatch ? raw : `${num}px`;
      currentValues.set(descriptor.key, cssValue);
      updateDisplay(cssValue);
      onPreview(descriptor.key, cssValue);
      onCommit();
    } else if (VALID_KEYWORDS.has(raw)) {
      currentValues.set(descriptor.key, raw);
      updateDisplay(raw);
      onPreview(descriptor.key, raw);
      onCommit();
    } else {
      // Revert
      updateDisplay(getCurrentCssValue());
    }
  });

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      input.blur();
    } else if (e.key === "Escape") {
      updateDisplay(getCurrentCssValue());
      input.blur();
    }
  });

  // Init
  updateDisplay(getCurrentCssValue());

  return {
    element: container,
    setValue(key: string, cssValue: string): void {
      if (key !== descriptor.key) return;
      currentValues.set(key, cssValue);
      updateDisplay(cssValue);
    },
    destroy(): void {
      // No document-level listeners
    },
  };
}
