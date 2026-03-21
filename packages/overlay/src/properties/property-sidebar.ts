import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "../design-tokens.js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_WIDTH = 300;
const MIN_WIDTH = 260;
const MAX_WIDTH = 380;
const STORAGE_KEY = "sketch-ui-sidebar-width";
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
  return DEFAULT_WIDTH;
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

export function createSidebar(shadowRoot: ShadowRoot): {
  show: (componentName: string, filePath: string, lineNumber: number, content: HTMLElement) => void;
  hide: () => void;
  isVisible: () => boolean;
  getElement: () => HTMLElement;
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

  const componentNameEl = document.createElement("div");
  componentNameEl.className = "prop-sidebar-component-name";

  const filePathEl = document.createElement("div");
  filePathEl.className = "prop-sidebar-file-path";

  header.appendChild(componentNameEl);
  header.appendChild(filePathEl);
  sidebar.appendChild(header);

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

  // Prevent sidebar clicks from propagating to interaction layer
  sidebar.addEventListener("pointerdown", (e) => e.stopPropagation());
  sidebar.addEventListener("click", (e) => e.stopPropagation());

  // --- Public methods ---

  let visible = false;

  function show(
    componentName: string,
    filePath: string,
    lineNumber: number,
    contentEl: HTMLElement,
  ): void {
    componentNameEl.textContent = `<${componentName}>`;
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

  return {
    show,
    hide,
    isVisible: () => visible,
    getElement: () => sidebar,
  };
}
