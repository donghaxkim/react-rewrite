import { COLORS, FONT_FAMILY, TRANSITIONS } from "./design-tokens.js";
import { getShadowRoot } from "./toolbar.js";

const STORAGE_KEY = "react-rewrite-onboarding-dismissed";

let barEl: HTMLDivElement | null = null;

export function showOnboardingHint(): void {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  barEl = document.createElement("div");
  barEl.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: ${COLORS.bgSecondary};
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    color: ${COLORS.textSecondary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
    pointer-events: auto;
  `;

  const text = document.createElement("span");
  text.textContent = "Click any element to edit its properties. Double-click text to edit it.";

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "\u00d7";
  closeBtn.style.cssText = `
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 0 4px;
    color: ${COLORS.textTertiary};
  `;
  closeBtn.addEventListener("click", () => dismissOnboarding());

  barEl.appendChild(text);
  barEl.appendChild(closeBtn);
  shadowRoot.appendChild(barEl);

  requestAnimationFrame(() => {
    if (barEl) barEl.style.opacity = "1";
  });
}

export function dismissOnboarding(): void {
  if (!barEl) return;
  localStorage.setItem(STORAGE_KEY, "1");
  barEl.style.opacity = "0";
  setTimeout(() => {
    barEl?.remove();
    barEl = null;
  }, 150);
}
