import type { PropertyDescriptor } from "@sketch-ui/shared";
import type { PropertyControl, OnPreview, OnCommit } from "./types.js";
import { COLORS, FONT_FAMILY, RADII } from "../../design-tokens.js";

export function createSegmented(
  descriptors: PropertyDescriptor[],
  values: Map<string, string>,
  onPreview: OnPreview,
  onCommit: OnCommit,
): PropertyControl {
  const descriptor = descriptors[0];
  const enumValues = descriptor.enumValues ?? [];

  const container = document.createElement("div");
  container.style.cssText = `
    display:flex;
    align-items:center;
    gap:2px;
    background:${COLORS.bgTertiary};
    border-radius:${RADII.sm};
    padding:2px;
    flex-wrap:wrap;
  `.trim().replace(/\n\s*/g, " ");

  let activeValue = values.get(descriptor.key) ?? descriptor.defaultValue;

  const buttons: Array<{ btn: HTMLButtonElement; value: string; opt: typeof enumValues[number] }> = [];

  function setActiveButton(cssValue: string): void {
    activeValue = cssValue;
    for (const { btn, value, opt } of buttons) {
      const isActive = value === cssValue;
      btn.style.background = isActive ? COLORS.accent : "transparent";
      btn.style.color = isActive ? COLORS.textOnAccent : COLORS.textSecondary;
      // Show Tailwind class as tooltip on the active segment
      btn.title = isActive && opt.tailwindValue
        ? `${opt.label} (${opt.tailwindValue})`
        : opt.label;
    }
  }

  for (const opt of enumValues) {
    const btn = document.createElement("button");
    btn.style.cssText = `
      display:flex;
      align-items:center;
      justify-content:center;
      padding:2px 6px;
      border:none;
      border-radius:${RADII.xs};
      font-family:${FONT_FAMILY};
      font-size:10px;
      cursor:pointer;
      background:transparent;
      color:${COLORS.textSecondary};
      min-width:20px;
      transition:background 100ms ease, color 100ms ease;
      white-space:nowrap;
    `.trim().replace(/\n\s*/g, " ");

    btn.textContent = opt.icon ?? opt.label;
    btn.title = opt.label;

    btn.addEventListener("click", () => {
      setActiveButton(opt.value);
      onPreview(descriptor.key, opt.value);
      onCommit();
    });

    buttons.push({ btn, value: opt.value, opt });
    container.appendChild(btn);
  }

  setActiveButton(activeValue);

  return {
    element: container,
    setValue(key: string, cssValue: string): void {
      if (key !== descriptor.key) return;
      setActiveButton(cssValue);
    },
    destroy(): void {
      // No document-level listeners to clean up
    },
  };
}
