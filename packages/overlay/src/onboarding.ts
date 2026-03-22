import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { getShadowRoot } from "./toolbar.js";

const STORAGE_KEY = "frameup-onboarding-seen";

let hintEl: HTMLDivElement | null = null;
let dismissTimer: ReturnType<typeof setTimeout> | null = null;

export function showOnboardingHint(): void {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  hintEl = document.createElement("div");
  hintEl.style.cssText = `
    position: fixed;
    left: 72px;
    top: 50%;
    transform: translateY(-50%);
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.md};
    border-radius: ${RADII.md};
    padding: 12px 16px;
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    color: ${COLORS.textPrimary};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
    max-width: 260px;
  `;

  const shortcuts = ["V", "H", "M", "D", "C", "T", "L"];
  const badgeStyle = `
    display: inline-block;
    background: ${COLORS.bgSecondary};
    color: ${COLORS.textTertiary};
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 11px;
    font-family: ${FONT_FAMILY};
    margin: 0 2px;
  `;

  hintEl.innerHTML = `Press ${shortcuts.map(k => `<span style="${badgeStyle}">${k}</span>`).join(" ")} to switch tools`;

  shadowRoot.appendChild(hintEl);
  requestAnimationFrame(() => {
    if (hintEl) hintEl.style.opacity = "1";
  });

  dismissTimer = setTimeout(dismissOnboarding, 5000);
}

export function dismissOnboarding(): void {
  if (!hintEl) return;
  localStorage.setItem(STORAGE_KEY, "1");
  hintEl.style.opacity = "0";
  setTimeout(() => {
    hintEl?.remove();
    hintEl = null;
  }, 150);
  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }
}
