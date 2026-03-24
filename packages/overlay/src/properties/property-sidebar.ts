import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "../design-tokens.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_WIDTH = 300;
const MIN_WIDTH = 260;
const MAX_WIDTH = 380;
const STORAGE_KEY = "frameup-sidebar-width";
const RESIZE_HANDLE_WIDTH = 4;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const SIDEBAR_STYLES = `
  .prop-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background: ${COLORS.bgPrimary};
    border-left: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.lg};
    z-index: 2147483645;
    font-family: ${FONT_FAMILY};
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform ${TRANSITIONS.settle};
    overflow: hidden;
  }
  .prop-sidebar.visible {
    transform: translateX(0);
  }
  .prop-sidebar-resize {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${RESIZE_HANDLE_WIDTH}px;
    cursor: col-resize;
    z-index: 1;
  }
  .prop-sidebar-resize:hover,
  .prop-sidebar-resize.active {
    background: ${COLORS.accent};
    opacity: 0.3;
  }
  .prop-sidebar-header {
    padding: 12px 16px;
    border-bottom: 1px solid ${COLORS.border};
    flex-shrink: 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }
  .prop-sidebar-header-info {
    flex: 1;
    min-width: 0;
  }
  .prop-sidebar-close {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border: none;
    background: none;
    cursor: pointer;
    color: ${COLORS.textTertiary};
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${RADII.sm};
  }
  .prop-sidebar-close:hover {
    background: ${COLORS.bgTertiary};
    color: ${COLORS.textPrimary};
  }
  .prop-sidebar-component-name {
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textPrimary};
    margin: 0 0 4px;
    line-height: 1.3;
  }
  .prop-sidebar-file-path {
    font-size: 11px;
    color: ${COLORS.textTertiary};
    margin: 0;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
    text-align: left;
  }
  .prop-sidebar-saving-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${COLORS.accent};
    margin-left: 6px;
    vertical-align: middle;
    opacity: 0;
    transition: opacity 150ms ease;
  }
  .prop-sidebar-saving-dot.active {
    opacity: 1;
    animation: prop-saving-pulse 0.8s ease-in-out infinite;
  }
  @keyframes prop-saving-pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  .prop-sidebar-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: ${COLORS.dangerSoft};
    border-bottom: 1px solid ${COLORS.danger};
    font-family: ${FONT_FAMILY};
    font-size: 11px;
    color: ${COLORS.danger};
    flex-shrink: 0;
  }
  .prop-sidebar-warning-text {
    flex: 1;
    font-weight: 500;
  }
  .prop-sidebar-warning-btn {
    border: 1px solid ${COLORS.danger};
    background: none;
    color: ${COLORS.danger};
    font-family: ${FONT_FAMILY};
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: ${RADII.xs};
    cursor: pointer;
    white-space: nowrap;
  }
  .prop-sidebar-warning-btn:hover {
    background: ${COLORS.danger};
    color: #ffffff;
  }
  .prop-sidebar-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .prop-sidebar-content::-webkit-scrollbar {
    width: 6px;
  }
  .prop-sidebar-content::-webkit-scrollbar-track {
    background: transparent;
  }
  .prop-sidebar-content::-webkit-scrollbar-thumb {
    background: ${COLORS.borderStrong};
    border-radius: 3px;
  }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadWidth(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= MIN_WIDTH && parsed <= MAX_WIDTH) {
        return parsed;
      }
    }
  } catch {
    // localStorage not available
  }
  return Math.min(DEFAULT_WIDTH, Math.floor(window.innerWidth * 0.22));
}

function saveWidth(width: number): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(width));
  } catch {
    // localStorage not available
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function createSidebar(shadowRoot: ShadowRoot, onClose?: () => void): {
  show: (componentName: string, filePath: string, lineNumber: number, content: HTMLElement) => void;
  hide: () => void;
  isVisible: () => boolean;
  getElement: () => HTMLElement;
  replaceContent: (contentEl: HTMLElement) => void;
  showWarning: (message: string, actionLabel: string, onAction: () => void) => void;
  clearWarning: () => void;
  showSaving: () => void;
  hideSaving: () => void;
} {
  // Inject styles
  const style = document.createElement("style");
  style.textContent = SIDEBAR_STYLES;
  shadowRoot.appendChild(style);

  // Sidebar element
  const sidebar = document.createElement("div");
  sidebar.className = "prop-sidebar";
  sidebar.style.width = `${loadWidth()}px`;

  // Resize handle
  const resizeHandle = document.createElement("div");
  resizeHandle.className = "prop-sidebar-resize";
  sidebar.appendChild(resizeHandle);

  // Header
  const header = document.createElement("div");
  header.className = "prop-sidebar-header";

  const headerInfo = document.createElement("div");
  headerInfo.className = "prop-sidebar-header-info";

  const componentNameEl = document.createElement("div");
  componentNameEl.className = "prop-sidebar-component-name";

  const savingDot = document.createElement("span");
  savingDot.className = "prop-sidebar-saving-dot";

  const filePathEl = document.createElement("div");
  filePathEl.className = "prop-sidebar-file-path";

  headerInfo.appendChild(componentNameEl);
  headerInfo.appendChild(filePathEl);

  const closeBtn = document.createElement("button");
  closeBtn.className = "prop-sidebar-close";
  closeBtn.title = "Collapse panel";
  closeBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="8,2 4,6 8,10"/></svg>`;

  header.appendChild(headerInfo);
  header.appendChild(closeBtn);
  sidebar.appendChild(header);

  // Warning banner (hidden by default)
  const warningBanner = document.createElement("div");
  warningBanner.className = "prop-sidebar-warning";
  warningBanner.style.display = "none";
  sidebar.appendChild(warningBanner);

  // Scrollable content area
  const content = document.createElement("div");
  content.className = "prop-sidebar-content";
  sidebar.appendChild(content);

  shadowRoot.appendChild(sidebar);

  // --- Resize logic ---
  let resizing = false;
  let startX = 0;
  let startWidth = 0;

  resizeHandle.addEventListener("pointerdown", (e: PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizing = true;
    startX = e.clientX;
    startWidth = sidebar.offsetWidth;
    resizeHandle.classList.add("active");
    resizeHandle.setPointerCapture(e.pointerId);
  });

  resizeHandle.addEventListener("pointermove", (e: PointerEvent) => {
    if (!resizing) return;
    // Dragging left makes sidebar wider (handle is on left edge, sidebar on right)
    const delta = startX - e.clientX;
    const newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startWidth + delta));
    sidebar.style.width = `${newWidth}px`;
  });

  const endResize = () => {
    if (!resizing) return;
    resizing = false;
    resizeHandle.classList.remove("active");
    saveWidth(sidebar.offsetWidth);
  };

  resizeHandle.addEventListener("pointerup", endResize);
  resizeHandle.addEventListener("pointercancel", endResize);

  // Prevent sidebar events from propagating to interaction layer
  sidebar.addEventListener("pointerdown", (e) => e.stopPropagation());
  sidebar.addEventListener("mousedown", (e) => e.stopPropagation());
  sidebar.addEventListener("click", (e) => e.stopPropagation());
  sidebar.addEventListener("mouseup", (e) => e.stopPropagation());

  // Close button
  closeBtn.addEventListener("click", () => {
    hide();
    if (onClose) onClose();
  });

  // --- Public methods ---

  let visible = false;

  function show(
    componentName: string,
    filePath: string,
    lineNumber: number,
    contentEl: HTMLElement,
  ): void {
    componentNameEl.textContent = `<${componentName}>`;
    componentNameEl.appendChild(savingDot);
    filePathEl.textContent = `${filePath}:${lineNumber}`;
    filePathEl.title = `${filePath}:${lineNumber}`;

    // Replace content
    content.innerHTML = "";
    content.appendChild(contentEl);

    if (!visible) {
      visible = true;
      // Force reflow so transition fires
      sidebar.offsetHeight;
      sidebar.classList.add("visible");
    }
  }

  function hide(): void {
    if (!visible) return;
    visible = false;
    sidebar.classList.remove("visible");
  }

  function replaceContent(contentEl: HTMLElement): void {
    content.innerHTML = "";
    content.appendChild(contentEl);
  }

  function showWarning(message: string, actionLabel: string, onAction: () => void): void {
    warningBanner.innerHTML = "";
    const text = document.createElement("span");
    text.className = "prop-sidebar-warning-text";
    text.textContent = message;
    const btn = document.createElement("button");
    btn.className = "prop-sidebar-warning-btn";
    btn.textContent = actionLabel;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      onAction();
    });
    warningBanner.appendChild(text);
    warningBanner.appendChild(btn);
    warningBanner.style.display = "flex";
  }

  function clearWarning(): void {
    warningBanner.style.display = "none";
    warningBanner.innerHTML = "";
  }

  function showSaving(): void {
    savingDot.classList.add("active");
  }

  function hideSaving(): void {
    savingDot.classList.remove("active");
  }

  return {
    show,
    hide,
    isVisible: () => visible,
    getElement: () => sidebar,
    replaceContent,
    showWarning,
    clearWarning,
    showSaving,
    hideSaving,
  };
}
