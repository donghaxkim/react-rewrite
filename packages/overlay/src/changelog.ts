import type { ChangeEntry } from "@frameup/shared";
import { send, onMessage } from "./bridge.js";
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { showToast } from "./toolbar.js";
import { selectElement } from "./selection.js";
import { reacquireMovedElement, reacquireMovedElementAsync } from "./move-state.js";

// --- State ---

const entries = new Map<string, ChangeEntry>();
let panelOpen = false;
const pendingRevertLogEntryIds = new Set<string>();

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
    case "noop":
      return;

    case "cliUndo":
    case "generateUndo":
      pendingRevertLogEntryIds.add(id);
      send({ type: "revertChanges", undoIds: entry.revertData.undoIds });
      break;

    case "moveRemove": {
      const { moveId } = entry.revertData;
      import("./canvas-state.js").then(({ removeMove }) => {
        removeMove(moveId);
      });
      addRevertLogEntry(entry);
      break;
    }

    case "moveRestore": {
      const { moveId, previousDelta } = entry.revertData;
      import("./canvas-state.js").then(({ restoreMoveDelta }) => {
        restoreMoveDelta(moveId, previousDelta);
      });
      addRevertLogEntry(entry);
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
      addRevertLogEntry(entry);
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

export function promoteAllPending(): void {
  let changed = false;
  for (const entry of entries.values()) {
    if (entry.state === "pending") {
      entry.state = "active";
      changed = true;
    }
  }
  if (changed) notifyChangelogChange();
}

export function removeAllPending(): void {
  let changed = false;
  for (const [id, entry] of entries) {
    if (entry.state === "pending") {
      entries.delete(id);
      changed = true;
    }
  }
  if (changed) notifyChangelogChange();
}

// ---------------------------------------------------------------------------
// UI — DOM refs
// ---------------------------------------------------------------------------

let panelEl: HTMLElement | null = null;
let bodyEl: HTMLElement | null = null;
let countEl: HTMLElement | null = null;
let chevronEl: HTMLElement | null = null;
let cleanupMessageListener: (() => void) | null = null;
let styleEl: HTMLElement | null = null;

// ---------------------------------------------------------------------------
// UI — Styles
// ---------------------------------------------------------------------------

const CHANGELOG_STYLES = `
  .changelog-panel {
    position: fixed;
    top: 16px;
    right: 16px;
    bottom: 16px;
    width: 380px;
    max-width: min(380px, calc(100vw - 32px));
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.lg};
    box-shadow: ${SHADOWS.lg};
    z-index: 2147483646;
    display: flex;
    flex-direction: column;
    font-family: ${FONT_FAMILY};
    font-size: 12px;
    user-select: none;
    opacity: 0;
    transform: translateX(16px);
    transition: opacity ${TRANSITIONS.settle}, transform ${TRANSITIONS.settle};
    overflow: hidden;
  }
  .changelog-panel.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .changelog-panel.collapsed {
    bottom: auto;
    width: 320px;
  }
  .changelog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    cursor: pointer;
    gap: 10px;
    border-bottom: 1px solid ${COLORS.border};
    background: ${COLORS.bgSecondary};
    transition: background ${TRANSITIONS.fast};
    flex-shrink: 0;
  }
  .changelog-header:hover {
    background: ${COLORS.bgTertiary};
  }
  .changelog-header-main {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .changelog-header-icon {
    width: 18px;
    height: 18px;
    color: ${COLORS.accent};
    flex-shrink: 0;
  }
  .changelog-title {
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textPrimary};
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
  .changelog-header-copy {
    color: ${COLORS.textTertiary};
    font-size: 11px;
  }
  .changelog-chevron {
    width: 14px;
    height: 14px;
    color: ${COLORS.textTertiary};
    transition: transform ${TRANSITIONS.medium};
    flex-shrink: 0;
  }
  .changelog-panel:not(.collapsed) .changelog-chevron {
    transform: rotate(180deg);
  }
  .changelog-body {
    flex: 1;
    overflow-y: auto;
    background: ${COLORS.bgPrimary};
  }
  .changelog-panel.collapsed .changelog-body {
    display: none;
  }
  .changelog-entry {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 12px;
    min-height: 38px;
    border-bottom: 1px solid ${COLORS.border};
    transition: background ${TRANSITIONS.fast};
    cursor: default;
  }
  .changelog-entry:last-child {
    border-bottom: none;
  }
  .changelog-entry.selectable {
    cursor: pointer;
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
    line-height: 1.3;
  }
  .component-name {
    color: ${COLORS.textPrimary};
    font-weight: 600;
  }
  .entry-separator {
    color: ${COLORS.textTertiary};
    margin: 0 6px;
  }
  .arrow {
    color: ${COLORS.textTertiary};
  }
  .entry-file {
    color: ${COLORS.textTertiary};
    flex-shrink: 0;
    font-size: 11px;
    max-width: 96px;
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
  .changelog-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120px;
    padding: 16px;
    color: ${COLORS.textTertiary};
    text-align: center;
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

function canSelectEntry(entry: ChangeEntry): boolean {
  return Boolean(entry.elementIdentity);
}

function canRevertEntry(entry: ChangeEntry): boolean {
  return entry.state !== "reverted" && entry.revertData.type !== "noop";
}

function formatSummary(entry: ChangeEntry): string {
  const summaryHtml = escapeHtml(entry.summary).replaceAll(
    " → ",
    `<span class="arrow"> → </span>`,
  );
  return `<span class="component-name">${escapeHtml(entry.componentName)}</span><span class="entry-separator">•</span>${summaryHtml}`;
}

function addRevertLogEntry(entry: ChangeEntry): void {
  addChangeEntry({
    type: entry.type,
    componentName: entry.componentName,
    filePath: entry.filePath,
    summary: `reverted ${entry.summary}`,
    state: "active",
    propertyKey: entry.propertyKey,
    elementIdentity: entry.elementIdentity,
    revertData: { type: "noop" },
  });
}

async function focusEntryTarget(id: string): Promise<void> {
  const entry = entries.get(id);
  const identity = entry?.elementIdentity;
  if (!entry || !identity) return;

  let el = reacquireMovedElement(identity);
  if (!el) {
    el = await reacquireMovedElementAsync(identity);
  }
  if (!el) {
    showToast(`Couldn't find ${entry.componentName}`);
    return;
  }
  await selectElement(el, { skipSidebar: false });
}

function renderEntries(): void {
  if (!bodyEl) return;
  const allEntries = Array.from(entries.values()).reverse();
  if (allEntries.length === 0) {
    bodyEl.innerHTML = `<div class="changelog-empty">No logs yet. Changes will appear here.</div>`;
    return;
  }
  bodyEl.innerHTML = allEntries
    .map((entry) => {
      const classes = [
        "changelog-entry",
        canSelectEntry(entry) ? "selectable" : "",
        entry.state === "reverted" ? "reverted" : "",
        entry.state === "pending" ? "pending" : "",
      ]
        .filter(Boolean)
        .join(" ");

      const fileName = entry.filePath
        ? getBasename(entry.filePath)
        : "";
      const time = formatRelativeTime(entry.timestamp);

      return `<div class="${classes}" data-entry-id="${escapeHtml(entry.id)}">
  <span class="entry-summary">${formatSummary(entry)}</span>
  ${fileName ? `<span class="entry-file" title="${escapeHtml(fileName)}">${escapeHtml(fileName)}</span>` : ""}
  <span class="entry-time">${time}</span>
  ${canRevertEntry(entry) ? `<button class="entry-revert" title="Revert this change">↩</button>` : ""}
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

  const entryDivs = Array.from(bodyEl.querySelectorAll(".changelog-entry")) as HTMLElement[];
  for (const entryDiv of entryDivs) {
    const id = entryDiv.dataset["entryId"];
    if (!id) continue;
    const entry = entries.get(id);
    if (!entry || !canSelectEntry(entry)) continue;
    entryDiv.addEventListener("click", () => {
      void focusEntryTarget(id);
    });
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
  panelEl.style.display = "none";

  // Header
  const headerEl = document.createElement("div");
  headerEl.className = "changelog-header";

  const headerMainEl = document.createElement("div");
  headerMainEl.className = "changelog-header-main";

  const iconEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  iconEl.classList.add("changelog-header-icon");
  iconEl.setAttribute("viewBox", "0 0 24 24");
  iconEl.setAttribute("fill", "none");
  iconEl.setAttribute("stroke", "currentColor");
  iconEl.setAttribute("stroke-width", "1.7");
  iconEl.setAttribute("stroke-linecap", "round");
  iconEl.setAttribute("stroke-linejoin", "round");
  iconEl.innerHTML = `<path d="M7 6h12"></path><path d="M7 12h12"></path><path d="M7 18h12"></path><path d="M3.5 6h.01"></path><path d="M3.5 12h.01"></path><path d="M3.5 18h.01"></path>`;

  const titleEl = document.createElement("span");
  titleEl.className = "changelog-title";
  titleEl.textContent = "Logs";

  countEl = document.createElement("span");
  countEl.className = "changelog-badge hidden";
  countEl.textContent = "0";

  const copyEl = document.createElement("span");
  copyEl.className = "changelog-header-copy";
  copyEl.textContent = "Latest changes";

  chevronEl = document.createElement("svg");
  chevronEl.className = "changelog-chevron";
  chevronEl.setAttribute("viewBox", "0 0 16 16");
  chevronEl.setAttribute("fill", "currentColor");
  chevronEl.innerHTML = `<path d="M3.5 5.5L8 10l4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;

  headerMainEl.appendChild(iconEl);
  headerMainEl.appendChild(titleEl);
  headerMainEl.appendChild(countEl);
  headerMainEl.appendChild(copyEl);
  headerEl.appendChild(headerMainEl);
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

    if (panelOpen && panelEl.style.display === "none") {
      panelEl.style.display = "";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panelEl?.classList.add("visible");
        });
      });
    } else if (!panelOpen) {
      panelEl.style.display = "none";
      panelEl.classList.remove("visible");
    }

    panelEl.classList.toggle("collapsed", !panelOpen);
  });

  // Listen for revertComplete messages
  cleanupMessageListener = onMessage((msg) => {
    if (msg.type === "revertComplete") {
      for (const [id, entry] of entries) {
        if (!pendingRevertLogEntryIds.has(id)) continue;
        const revertData = entry.revertData;
        if (revertData.type !== "cliUndo" && revertData.type !== "generateUndo") continue;

        const matchedResults = msg.results.filter((result) =>
          revertData.undoIds.includes(result.undoId),
        );
        if (matchedResults.length === 0) continue;

        pendingRevertLogEntryIds.delete(id);
        if (matchedResults.every((result) => result.success)) {
          addRevertLogEntry(entry);
        } else {
          entry.state = "active";
          notifyChangelogChange();
        }
      }

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

  pendingRevertLogEntryIds.clear();
  clearChangelog();
  changelogListeners = [];
}
