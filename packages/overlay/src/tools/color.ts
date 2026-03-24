// packages/overlay/src/tools/color.ts
import type { ToolEventHandler } from "../interaction.js";
import { getPageElementAtPoint, setInteractionPointerEvents } from "../interaction.js";
import { addAnnotation, viewportToPage, type ColorOverrideRuntime } from "../canvas-state.js";
import { addColorBadge } from "../annotation-layer.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";
import { openColorPicker, closeColorPicker } from "../color-picker.js";
import { getProjectColors } from "../properties/tailwind-resolver.js";

let targetEl: HTMLElement | null = null;
let targetComp: Awaited<ReturnType<typeof resolveComponentAtPoint>> = null;
let selectedProperty: "backgroundColor" | "color" = "backgroundColor";
let originalValues: { bg: string; color: string } = { bg: "", color: "" };
let currentPickedToken: string | undefined;

export const colorHandler: ToolEventHandler = {
  async onMouseDown(e: MouseEvent) {
    closeColorPicker();

    const el = getPageElementAtPoint(e.clientX, e.clientY);
    if (!el) return;

    targetEl = el;
    originalValues = {
      bg: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
    };

    const comp = await resolveComponentAtPoint(e.clientX, e.clientY);
    if (!comp) return;
    targetComp = comp;

    const initialColor = rgbToHex(originalValues.bg);

    // Disable interaction layer so the picker can receive clicks
    setInteractionPointerEvents(false);

    openColorPicker({
      initialColor,
      position: { x: e.clientX + 10, y: e.clientY + 10 },
      showPropertyToggle: true,
      projectColors: getProjectColors(),
      onColorChange(hex) {
        if (targetEl) {
          (targetEl.style as any)[selectedProperty] = hex;
        }
      },
      onPickedToken(token) {
        currentPickedToken = token;
      },
      onPropertyChange(prop) {
        selectedProperty = prop;
      },
      onClose() {
        // Re-enable interaction layer
        setInteractionPointerEvents(true);
        if (!targetEl || !targetComp) return;
        const fromColor = selectedProperty === "backgroundColor" ? originalValues.bg : originalValues.color;
        const toColor = (targetEl.style as any)[selectedProperty];
        if (toColor && toColor !== fromColor) {
          const id = crypto.randomUUID();
          const rect = targetEl.getBoundingClientRect();
          const page = viewportToPage(rect.right, rect.top);
          addColorBadge(id, page.x, page.y, toColor);
          addAnnotation({
            type: "colorChange",
            id,
            component: targetComp,
            targetElement: targetEl,
            property: selectedProperty,
            fromColor,
            toColor,
            pickedToken: currentPickedToken,
          } as ColorOverrideRuntime);
        }
        targetEl = null;
        targetComp = null;
        currentPickedToken = undefined;
      },
    });
  },
  onMouseMove() {},
  onMouseUp() {},
};

function rgbToHex(rgb: string): string {
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return "#000000";
  return "#" + match.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, "0")).join("");
}

export function cleanupColorTool(): void {
  closeColorPicker();
  setInteractionPointerEvents(true);
  targetEl = null;
  targetComp = null;
  currentPickedToken = undefined;
}
