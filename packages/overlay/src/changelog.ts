import type { ChangeEntry, ElementIdentity } from "@frameup/shared";
import { send, onMessage } from "./bridge.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { showToast } from "./toolbar.js";

// --- State ---

const entries = new Map<string, ChangeEntry>();
let panelOpen = false;

// --- Listener pattern (matches canvas-state.ts) ---

type ChangelogListener = () => void;
let changelogListeners: ChangelogListener[] = [];

export function onChangelogChange(fn: ChangelogListener): () => void {
  changelogListeners.push(fn);
  return () => {
    changelogListeners = changelogListeners.filter((f) => f !== fn);
  };
}

function notifyChangelogChange(): void {
  changelogListeners.forEach((fn) => fn());
}

// --- Coalesce window ---

const COALESCE_WINDOW_MS = 3000;

function findCoalesceTarget(
  elementIdentity: ElementIdentity,
  propertyKey: string,
): ChangeEntry | null {
  // Walk entries in reverse insertion order
  const allEntries = Array.from(entries.values());
  for (let i = allEntries.length - 1; i >= 0; i--) {
    const entry = allEntries[i];
    if (
      entry.type === "property" &&
      entry.state === "active" &&
      entry.propertyKey === propertyKey &&
      entry.elementIdentity &&
      entry.elementIdentity.filePath === elementIdentity.filePath &&
      entry.elementIdentity.lineNumber === elementIdentity.lineNumber &&
      entry.elementIdentity.columnNumber === elementIdentity.columnNumber &&
      Date.now() - entry.timestamp < COALESCE_WINDOW_MS
    ) {
      return entry;
    }
    break; // Only check the most recent entry
  }
  return null;
}

// --- Public API ---

export function addChangeEntry(
  entry: Omit<ChangeEntry, "id" | "timestamp">,
): string {
  const id = crypto.randomUUID();
  const fullEntry: ChangeEntry = {
    ...entry,
    id,
    timestamp: Date.now(),
  };
  entries.set(id, fullEntry);
  notifyChangelogChange();
  return id;
}

export function addOrCoalescePropertyEntry(
  entry: Omit<ChangeEntry, "id" | "timestamp">,
  elementIdentity: ElementIdentity,
  propertyKey: string,
  undoId: string,
): string {
  const target = findCoalesceTarget(elementIdentity, propertyKey);
  if (target) {
    target.timestamp = Date.now();
    target.summary = entry.summary;
    if (target.revertData.type === "cliUndo") {
      target.revertData.undoIds.push(undoId);
    }
    notifyChangelogChange();
    return target.id;
  }
  return addChangeEntry(entry);
}

export function updateChangeEntry(
  id: string,
  updates: Partial<ChangeEntry>,
): void {
  const entry = entries.get(id);
  if (!entry) return;
  Object.assign(entry, updates);
  notifyChangelogChange();
}

export function revertEntry(id: string): void {
  const entry = entries.get(id);
  if (!entry || entry.state === "reverted") return;

  switch (entry.revertData.type) {
    case "cliUndo":
    case "generateUndo":
      send({ type: "revertChanges", undoIds: entry.revertData.undoIds });
      break;

    case "moveRemove": {
      const { moveId } = entry.revertData;
      import("./canvas-state.js").then(({ removeMove }) => {
        removeMove(moveId);
      });
      break;
    }

    case "annotationRemove": {
      const { annotationId, originalInnerHTML } = entry.revertData;
      // TODO: canvas-state.ts does not export findElementByIdentity.
      // Restoring innerHTML on the live DOM element is not currently possible
      // without a DOM query by identity. The annotation is removed from state;
      // visual restoration of innerHTML is deferred until findElementByIdentity
      // (or equivalent) is available.
      import("./canvas-state.js").then(({ removeAnnotation }) => {
        removeAnnotation(annotationId);
        // If findElementByIdentity is added to canvas-state.ts in the future:
        // const el = findElementByIdentity(entry.revertData.elementIdentity);
        // if (el) el.innerHTML = originalInnerHTML;
        void originalInnerHTML; // suppress unused variable warning
      });
      break;
    }
  }

  entry.state = "reverted";
  notifyChangelogChange();
}

export function getEntries(): ChangeEntry[] {
  return Array.from(entries.values());
}

export function getChangeCount(): number {
  return entries.size;
}

export function getActiveCount(): number {
  let count = 0;
  for (const entry of entries.values()) {
    if (entry.state !== "reverted") count++;
  }
  return count;
}

export function isChangelogOpen(): boolean {
  return panelOpen;
}

export function setChangelogOpen(open: boolean): void {
  panelOpen = open;
  notifyChangelogChange();
}

export function clearChangelog(): void {
  entries.clear();
  notifyChangelogChange();
}

// ---------------------------------------------------------------------------
// UI — DOM refs
// ---------------------------------------------------------------------------

let panelEl: HTMLElement | null = null;
let bodyEl: HTMLElement | null = null;
let countEl: HTMLElement | null = null;
let chevronEl: HTMLElement | null = null;
let cleanupMessageListener: (() => void) | null = null;
let timeUpdateInterval: number | null = null;
let styleEl: HTMLElement | null = null;

// ---------------------------------------------------------------------------
// UI — Styles
// ---------------------------------------------------------------------------

const CHANGELOG_STYLES = `
  .changelog-panel {
    position: fixed;
    left: 16px;
    bottom: 16px;
    width: 360px;
    max-height: 50vh;
    background: ${COLORS.bgSecondary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.md};
    box-shadow: ${SHADOWS.md};
    z-index: 2147483646;
    display: flex;
    flex-direction: column;
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    user-select: none;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity ${TRANSITIONS.settle}, transform ${TRANSITIONS.settle};
  }
  .changelog-panel.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .changelog-header {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    cursor: pointer;
    gap: 6px;
    border-bottom: 1px solid transparent;
    transition: border-color ${TRANSITIONS.fast};
    flex-shrink: 0;
  }
  .changelog-panel.open .changelog-header {
    border-bottom-color: ${COLORS.border};
  }
  .changelog-title {
    font-size: 12px;
    font-weight: 600;
    color: ${COLORS.textPrimary};
    flex: 1;
  }
  .changelog-badge {
    background: ${COLORS.accent};
    color: #ffffff;
    font-size: 10px;
    font-weight: 600;
    font-family: ${FONT_FAMILY};
    padding: 1px 6px;
    border-radius: 9999px;
    line-height: 16px;
  }
  .changelog-badge.hidden {
    display: none;
  }
  .changelog-chevron {
    width: 14px;
    height: 14px;
    color: ${COLORS.textTertiary};
    transition: transform ${TRANSITIONS.medium};
    flex-shrink: 0;
  }
  .changelog-panel.open .changelog-chevron {
    transform: rotate(180deg);
  }
  .changelog-body {
    overflow-y: auto;
    max-height: calc(50vh - 37px);
    display: none;
  }
  .changelog-panel.open .changelog-body {
    display: block;
  }
  .changelog-entry {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 10px;
    height: 28px;
    border-bottom: 1px solid ${COLORS.border};
    transition: background ${TRANSITIONS.fast};
  }
  .changelog-entry:last-child {
    border-bottom: none;
  }
  .changelog-entry:hover {
    background: ${COLORS.bgTertiary};
  }
  .changelog-entry.reverted {
    opacity: 0.5;
  }
  .changelog-entry.reverted .entry-summary {
    text-decoration: line-through;
  }
  .changelog-entry.pending .entry-summary {
    font-style: italic;
  }
  .entry-summary {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${COLORS.textSecondary};
    min-width: 0;
  }
  .component-name {
    color: ${COLORS.textPrimary};
    font-weight: 600;
  }
  .arrow {
    color: ${COLORS.textTertiary};
  }
  .entry-file {
    color: ${COLORS.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .entry-time {
    color: ${COLORS.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    min-width: 48px;
    text-align: right;
  }
  .entry-revert {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: ${COLORS.accent};
    font-size: 14px;
    border-radius: ${RADII.xs};
    opacity: 0;
    transition: opacity ${TRANSITIONS.fast}, background ${TRANSITIONS.fast};
  }
  .changelog-entry:hover .entry-revert {
    opacity: 1;
  }
  .entry-revert:hover {
    background: ${COLORS.accentSoft};
  }
  .changelog-entry.reverted .entry-revert {
    display: none;
  }
`;

// ---------------------------------------------------------------------------
// UI — Helpers
// ---------------------------------------------------------------------------

function formatRelativeTime(timestamp: number): string {
  const elapsed = Math.floor((Date.now() - timestamp) / 1000);
  if (elapsed < 10) return "just now";
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")} ago`;
}

function getBasename(filePath: string): string {
  return filePath.split("/").pop() ?? filePath;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEntries(): void {
  if (!bodyEl) return;
  const allEntries = Array.from(entries.values()).reverse();
  if (allEntries.length === 0) {
    bodyEl.innerHTML = "";
    return;
  }
  bodyEl.innerHTML = allEntries
    .map((entry) => {
      const classes = [
        "changelog-entry",
        entry.state === "reverted" ? "reverted" : "",
        entry.state === "pending" ? "pending" : "",
      ]
        .filter(Boolean)
        .join(" ");

      // Build summary: split on " → " if present
      const summaryText = escapeHtml(entry.summary);
      const arrowIdx = entry.summary.indexOf(" → ");
      let summaryHtml: string;
      if (arrowIdx !== -1) {
        const before = escapeHtml(entry.summary.slice(0, arrowIdx));
        const after = escapeHtml(entry.summary.slice(arrowIdx + 3));
        // component name is the first token before a space in 'before'
        const spaceIdx = before.indexOf(" ");
        if (spaceIdx !== -1) {
          const comp = before.slice(0, spaceIdx);
          const rest = before.slice(spaceIdx);
          summaryHtml = `<span class="component-name">${comp}</span>${escapeHtml(rest)}<span class="arrow"> → </span>${after}`;
        } else {
          summaryHtml = `<span class="component-name">${before}</span><span class="arrow"> → </span>${after}`;
        }
      } else {
        summaryHtml = summaryText;
      }

      const fileName = entry.elementIdentity
        ? getBasename(entry.elementIdentity.filePath)
        : "";
      const time = formatRelativeTime(entry.timestamp);

      return `<div class="${classes}" data-entry-id="${escapeHtml(entry.id)}">
  <span class="entry-summary">${summaryHtml}</span>
  ${fileName ? `<span class="entry-file" title="${escapeHtml(fileName)}">${escapeHtml(fileName)}</span>` : ""}
  <span class="entry-time">${time}</span>
  <button class="entry-revert" title="Revert this change">↩</button>
</div>`;
    })
    .join("");

  // Attach revert button listeners
  const revertBtns = Array.from(bodyEl.querySelectorAll(".entry-revert")) as HTMLButtonElement[];
  for (const btn of revertBtns) {
    const entryDiv = btn.closest(".changelog-entry") as HTMLElement | null;
    const id = entryDiv?.dataset["entryId"];
    if (id) {
      btn.addEventListener("click", (e: MouseEvent) => {
        e.stopPropagation();
        revertEntry(id);
      });
    }
  }
}

function updateCount(): void {
  if (!countEl) return;
  const active = getActiveCount();
  if (active === 0) {
    countEl.classList.add("hidden");
  } else {
    countEl.classList.remove("hidden");
    countEl.textContent = String(active);
  }
}

// ---------------------------------------------------------------------------
// UI — Init / Destroy
// ---------------------------------------------------------------------------

export function initChangelog(shadowRoot: ShadowRoot): void {
  // Style
  styleEl = document.createElement("style");
  styleEl.textContent = CHANGELOG_STYLES;
  shadowRoot.appendChild(styleEl);

  // Panel
  panelEl = document.createElement("div");
  panelEl.className = "changelog-panel";
  // Hidden until first entry
  panelEl.style.display = "none";

  // Header
  const headerEl = document.createElement("div");
  headerEl.className = "changelog-header";

  const titleEl = document.createElement("span");
  titleEl.className = "changelog-title";
  titleEl.textContent = "Changes";

  countEl = document.createElement("span");
  countEl.className = "changelog-badge hidden";
  countEl.textContent = "0";

  chevronEl = document.createElement("svg");
  chevronEl.className = "changelog-chevron";
  chevronEl.setAttribute("viewBox", "0 0 16 16");
  chevronEl.setAttribute("fill", "currentColor");
  chevronEl.innerHTML = `<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

  headerEl.appendChild(titleEl);
  headerEl.appendChild(countEl);
  headerEl.appendChild(chevronEl);
  headerEl.addEventListener("click", () => setChangelogOpen(!panelOpen));

  panelEl.appendChild(headerEl);

  // Body
  bodyEl = document.createElement("div");
  bodyEl.className = "changelog-body";
  panelEl.appendChild(bodyEl);

  shadowRoot.appendChild(panelEl);

  // Subscribe to state changes
  const unsubscribe = onChangelogChange(() => {
    renderEntries();
    updateCount();

    if (!panelEl) return;

    // Show panel on first entry
    if (entries.size > 0 && panelEl.style.display === "none") {
      panelEl.style.display = "";
      // Trigger animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panelEl?.classList.add("visible");
        });
      });
      // Open panel on first entry if not already open
      if (!panelOpen) {
        setChangelogOpen(true);
        return; // setChangelogOpen triggers another notify, avoid double update
      }
    } else if (entries.size === 0) {
      panelEl.style.display = "none";
      panelEl.classList.remove("visible");
    }

    // Toggle open/closed
    panelEl.classList.toggle("open", panelOpen);

    // Start/stop interval based on open state
    if (panelOpen && timeUpdateInterval === null) {
      timeUpdateInterval = window.setInterval(() => {
        renderEntries();
      }, 10000);
    } else if (!panelOpen && timeUpdateInterval !== null) {
      clearInterval(timeUpdateInterval);
      timeUpdateInterval = null;
    }
  });

  // Listen for revertComplete messages
  cleanupMessageListener = onMessage((msg) => {
    if (msg.type === "revertComplete") {
      for (const result of msg.results) {
        if (!result.success && result.error) {
          showToast(`Revert failed: ${result.error}`);
        }
      }
    }
  });

  // Store unsubscribe so destroyChangelog can clean up
  // We push it into the listeners array so clearChangelog resets it
  // Actually we need to hold it separately — store as cleanup fn
  const origDestroy = destroyChangelogCleanup;
  destroyChangelogCleanup = () => {
    origDestroy();
    unsubscribe();
  };
}

// Internal cleanup accumulator (used by destroyChangelog)
let destroyChangelogCleanup: () => void = () => {};

export function destroyChangelog(): void {
  if (timeUpdateInterval !== null) {
    clearInterval(timeUpdateInterval);
    timeUpdateInterval = null;
  }
  if (cleanupMessageListener) {
    cleanupMessageListener();
    cleanupMessageListener = null;
  }
  destroyChangelogCleanup();
  destroyChangelogCleanup = () => {};

  panelEl?.remove();
  panelEl = null;
  styleEl?.remove();
  styleEl = null;
  bodyEl = null;
  countEl = null;
  chevronEl = null;

  clearChangelog();
  changelogListeners = [];
}
