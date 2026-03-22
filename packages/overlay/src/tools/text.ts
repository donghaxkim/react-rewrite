// packages/overlay/src/tools/text.ts
import type { ToolEventHandler } from "../interaction.js";
import type { ComponentRef } from "@sketch-ui/shared";
import { getToolOptions, addAnnotation, viewportToPage } from "../canvas-state.js";
import { addTextAnnotation } from "../annotation-layer.js";
import { resolveComponentAtPoint } from "./resolve-helper.js";
import { COLORS, RADII, FONT_FAMILY } from "../design-tokens.js";

let activeInput: HTMLInputElement | null = null;
let clickPos: { pageX: number; pageY: number } | null = null;
let targetComp: ComponentRef | null = null;

export const textHandler: ToolEventHandler = {
  onMouseDown(e: MouseEvent) {
    // If there's an active input, commit it first
    if (activeInput) commitText();

    const page = viewportToPage(e.clientX, e.clientY);
    clickPos = { pageX: page.x, pageY: page.y };
    // Resolve target async — will be available by the time user finishes typing
    resolveComponentAtPoint(e.clientX, e.clientY).then(comp => { targetComp = comp; });

    // Create a text input at the click position
    activeInput = document.createElement("input");
    activeInput.type = "text";
    activeInput.placeholder = "Type annotation...";
    activeInput.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 2147483647;
      background: ${COLORS.bgPrimary};
      color: ${COLORS.textPrimary};
      border: 1.5px solid ${COLORS.accent};
      border-radius: ${RADII.sm};
      padding: 4px 8px;
      font-size: ${getToolOptions().fontSize}px;
      font-family: ${FONT_FAMILY};
      outline: none;
      min-width: 120px;
      box-shadow: 0 0 0 3px ${COLORS.accentSoft};
    `;

    activeInput.setAttribute("data-sketch-ui-ghost", "true");
    activeInput.addEventListener("keydown", (ke) => {
      if (ke.key === "Enter") { commitText(); ke.preventDefault(); }
      if (ke.key === "Escape") { cancelText(); ke.preventDefault(); }
      ke.stopPropagation(); // Prevent tool shortcuts while typing
    });

    document.body.appendChild(activeInput);
    activeInput.focus();
  },
  onMouseMove() {},
  onMouseUp() {},
};

function commitText(): void {
  if (!activeInput || !clickPos) return;
  const content = activeInput.value.trim();
  activeInput.remove();
  activeInput = null;

  if (!content) return;

  const opts = getToolOptions();
  const id = crypto.randomUUID();
  addTextAnnotation(id, clickPos.pageX, clickPos.pageY, content, opts.fontSize, opts.textColor);
  addAnnotation({
    type: "text",
    id,
    position: clickPos,
    content,
    fontSize: opts.fontSize,
    color: opts.textColor,
    targetComponent: targetComp,
  });

  clickPos = null;
  targetComp = null;
}

function cancelText(): void {
  if (activeInput) {
    activeInput.remove();
    activeInput = null;
  }
  clickPos = null;
  targetComp = null;
}

export function cleanupTextTool(): void {
  cancelText();
}
