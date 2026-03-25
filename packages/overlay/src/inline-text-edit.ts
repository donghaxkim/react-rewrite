import type { ServerMessage, ComponentInfo, ElementIdentity, TextEditAnnotation } from "@frameup/shared";
import { getFiberFromHostInstance, isCompositeFiber, getDisplayName } from "bippy";
import { getOwnerStack } from "bippy/source";
import { resolveFrameFilePath } from "./utils/source-resolve.js";
import { send, onMessage } from "./bridge.js";
import { COLORS } from "./design-tokens.js";
import { setInteractionPointerEvents, activateInteraction, getPageElementAtPoint } from "./interaction.js";
import { getActiveTool } from "./canvas-state.js";
import { addTextEditAnnotation } from "./canvas-state.js";
import { isInternalName, isValidElement } from "./utils/component-filter.js";
import { clearSelection, selectElement } from "./selection.js";
import { addChangeEntry } from "./changelog.js";
import { addToPending } from "./pending-changes.js";
import { computeNthOfType } from "./utils/nth-of-type.js";
import { hasApiKey } from "./config.js";

// --- Helpers ---

function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
}

// --- Blocklist: replaced/void elements where contentEditable is useless ---
const BLOCKED_TAGS = new Set([
  "IMG", "INPUT", "VIDEO", "IFRAME", "CANVAS", "SELECT",
  "TEXTAREA", "HR", "BR", "EMBED", "OBJECT", "PROGRESS",
]);

// --- Internal state ---
let editingElement: HTMLElement | null = null;
let originalTextContent = "";
let originalInnerHTML = "";
let lastKnownText = "";
let componentInfo: ComponentInfo | null = null;
let savedOutline = "";
let unsubscribeMessage: (() => void) | null = null;

// --- Pending commit for annotation fallback ---
let pendingCommit: {
  componentInfo: ComponentInfo;
  originalText: string;
  newText: string;
  originalInnerHTML: string;
  tagName: string;
} | null = null;

// --- Exports ---

export function isTextEditing(): boolean {
  return editingElement !== null;
}

export function initInlineTextEdit(): void {
  document.addEventListener("dblclick", handleDblClick, true);
  document.addEventListener("mousedown", handleOutsidePointerDown, true);
  unsubscribeMessage = onMessage((msg: ServerMessage) => {
    if (msg.type === "updateTextComplete") {
      handleUpdateTextResponse(msg);
    }
  });
}

export function destroyInlineTextEdit(): void {
  if (editingElement) {
    exitEditMode();
  }
  document.removeEventListener("dblclick", handleDblClick, true);
  document.removeEventListener("mousedown", handleOutsidePointerDown, true);
  unsubscribeMessage?.();
  unsubscribeMessage = null;
}

function handleUpdateTextResponse(msg: Extract<ServerMessage, { type: "updateTextComplete" }>): void {
  if (msg.success && msg.undoId && pendingCommit) {
    // Path A: AST write succeeded — record as active change with undo support
    const pc = pendingCommit;
    const identity: ElementIdentity = {
      componentName: pc.componentInfo.componentName,
      filePath: pc.componentInfo.filePath,
      lineNumber: pc.componentInfo.lineNumber,
      columnNumber: pc.componentInfo.columnNumber,
      tagName: pc.tagName,
    };
    addChangeEntry({
      type: "textEdit",
      componentName: pc.componentInfo.componentName,
      filePath: pc.componentInfo.filePath,
      summary: `"${truncate(pc.originalText, 20)}" → "${truncate(pc.newText, 20)}"`,
      state: "active",
      elementIdentity: identity,
      revertData: { type: "cliUndo", undoIds: [msg.undoId] },
    });
  } else if (!msg.success && msg.reason === "no-match" && pendingCommit) {
    // Path B-1: AST write returned no-match — fall back to annotation
    const pc = pendingCommit;
    const ann: TextEditAnnotation = {
      type: "textEdit",
      id: `text-edit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      componentName: pc.componentInfo.componentName,
      filePath: pc.componentInfo.filePath,
      lineNumber: pc.componentInfo.lineNumber,
      columnNumber: pc.componentInfo.columnNumber,
      originalText: pc.originalText,
      newText: pc.newText,
    };
    const identity: ElementIdentity = {
      componentName: pc.componentInfo.componentName,
      filePath: pc.componentInfo.filePath,
      lineNumber: pc.componentInfo.lineNumber,
      columnNumber: pc.componentInfo.columnNumber,
      tagName: pc.tagName,
    };
    addTextEditAnnotation(ann, identity, pc.originalInnerHTML);
    addChangeEntry({
      type: "textAnnotation",
      componentName: ann.componentName,
      filePath: ann.filePath || "",
      summary: `"${truncate(ann.originalText, 20)}" → "${truncate(ann.newText, 20)}"`,
      state: "pending",
      elementIdentity: identity,
      revertData: {
        type: "annotationRemove",
        annotationId: ann.id,
        originalInnerHTML: pc.originalInnerHTML,
        elementIdentity: identity,
      },
    });
  }
  pendingCommit = null;
}

// --- Multi-line detection ---

function isMultiLine(el: HTMLElement): boolean {
  if (el.scrollHeight > el.clientHeight + 4) return true;
  if (el.querySelector("br")) return true;
  const style = getComputedStyle(el);
  if (style.whiteSpace !== "nowrap" && el.getClientRects().length > 1) return true;
  return false;
}

// --- Component resolution (matches selection.ts async pattern for React 19) ---

async function resolveComponent(el: HTMLElement): Promise<ComponentInfo | null> {
  const fiber = getFiberFromHostInstance(el);
  if (!fiber) return null;

  // Strategy 1: async getOwnerStack (React 19 — _debugSource is absent)
  try {
    const frames = await getOwnerStack(fiber);
    if (frames && frames.length > 0) {
      for (const frame of frames) {
        if (!frame.functionName) continue;
        const name = frame.functionName;
        if (name[0] !== name[0].toUpperCase()) continue;
        if (isInternalName(name)) continue;

        const filePath = resolveFrameFilePath(frame.fileName);

        return {
          tagName: el.tagName.toLowerCase(),
          componentName: name,
          filePath,
          lineNumber: frame.lineNumber ?? 0,
          columnNumber: frame.columnNumber ?? 0,
          stack: [],
          boundingRect: el.getBoundingClientRect(),
        };
      }
    }
  } catch {
    // getOwnerStack failed — fall through to fiber walk
  }

  // Strategy 2: synchronous fiber walk fallback (React 18 — uses _debugSource)
  try {
    let current = fiber;
    while (current) {
      if (isCompositeFiber(current)) {
        const name = getDisplayName(current.type);
        const debugSource = current._debugSource || current._debugOwner?._debugSource;

        if (name && name[0] === name[0].toUpperCase() && !isInternalName(name) && debugSource) {
          return {
            tagName: el.tagName.toLowerCase(),
            componentName: name,
            filePath: debugSource.fileName || "",
            lineNumber: debugSource.lineNumber || 0,
            columnNumber: debugSource.columnNumber || 0,
            stack: [],
            boundingRect: el.getBoundingClientRect(),
          };
        }
      }
      if (!current.return) break;
      current = current.return;
    }
  } catch {
    // Fiber resolution can fail
  }
  return null;
}

// --- Double-click handler ---

function handleDblClick(e: MouseEvent): void {
  if (editingElement) {
    commitAndExit();
  }

  let target: HTMLElement | null = null;
  const eventTarget = e.target as HTMLElement;

  if (
    eventTarget instanceof HTMLElement &&
    eventTarget !== document.documentElement &&
    eventTarget !== document.body &&
    !eventTarget.hasAttribute("data-frameup-interaction") &&
    !eventTarget.closest("#frameup-root")
  ) {
    target = eventTarget;
  } else {
    target = getPageElementAtPoint(e.clientX, e.clientY);
  }

  if (!target) return;
  if (BLOCKED_TAGS.has(target.tagName)) return;
  if (!target.textContent?.trim()) return;

  // Prevent browser's native word selection on double-click
  e.preventDefault();
  enterEditMode(target);
}

// --- Edit lifecycle ---

function enterEditMode(element: HTMLElement): void {
  editingElement = element;

  originalTextContent = element.textContent || "";
  originalInnerHTML = element.innerHTML;
  lastKnownText = originalTextContent;

  // Resolve async — result stored when ready, used at commit time
  componentInfo = null;
  resolveComponent(element).then((info) => {
    // Only store if we're still editing the same element
    if (editingElement === element) {
      componentInfo = info;
    }
  });

  savedOutline = element.style.outline;
  element.style.outline = `2px solid ${COLORS.accent}`;

  element.contentEditable = "true";

  setInteractionPointerEvents(false);

  element.focus();
  // Place cursor at the end of text content
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false); // collapse to end
    sel.addRange(range);
  }

  element.addEventListener("blur", handleBlur);
  element.addEventListener("keydown", handleKeydown);
  element.addEventListener("input", handleInput);
}

function handleInput(): void {
  if (editingElement) {
    lastKnownText = editingElement.textContent || "";
  }
}

function handleBlur(): void {
  commitAndExit();
}

function handleOutsidePointerDown(e: MouseEvent): void {
  if (!editingElement) return;

  const eventTarget = e.target;
  if (
    eventTarget instanceof Node &&
    (eventTarget === editingElement || editingElement.contains(eventTarget))
  ) {
    return;
  }

  const targetElement = eventTarget instanceof HTMLElement ? eventTarget : null;
  if (targetElement?.closest("#frameup-root")) {
    commitAndExit();
    return;
  }

  const clickedElement = resolveClickTarget(e);
  if (clickedElement && isValidElement(clickedElement)) {
    e.preventDefault();
    e.stopPropagation();
    commitAndExit({ nextSelection: clickedElement, reselectEditedElement: false });
    return;
  }

  e.preventDefault();
  e.stopPropagation();
  commitAndExit({ clearSelection: true, reselectEditedElement: false });
}

function handleKeydown(e: KeyboardEvent): void {
  if (e.key === "Escape") {
    e.preventDefault();
    commitAndExit();
    return;
  }

  if (e.key === "Enter" && editingElement && !isMultiLine(editingElement)) {
    e.preventDefault();
    commitAndExit();
    return;
  }

  e.stopPropagation();
}

function resolveClickTarget(e: MouseEvent): HTMLElement | null {
  const eventTarget = e.target;
  if (
    eventTarget instanceof HTMLElement &&
    eventTarget !== document.documentElement &&
    eventTarget !== document.body &&
    !eventTarget.hasAttribute("data-frameup-interaction") &&
    !eventTarget.closest("#frameup-root")
  ) {
    return eventTarget;
  }
  return getPageElementAtPoint(e.clientX, e.clientY);
}

function commitAndExit(options?: {
  nextSelection?: HTMLElement | null;
  clearSelection?: boolean;
  reselectEditedElement?: boolean;
}): void {
  if (!editingElement) return;

  const newText = lastKnownText;
  const changed = newText !== originalTextContent;

  if (changed && componentInfo) {
    // Path B: API key present + filePath available → add to pending store
    if (hasApiKey() && componentInfo.filePath) {
      const el = editingElement;
      const parentEl = el?.parentElement;

      addToPending({
        type: "text",
        componentName: componentInfo.componentName,
        tag: componentInfo.tagName,
        filePath: componentInfo.filePath,
        className: el?.className || "",
        nthOfType: el ? computeNthOfType(el) : 1,
        parentTag: parentEl?.tagName.toLowerCase() || "",
        parentClassName: parentEl?.className || "",
        lineHint: componentInfo.lineNumber,
        originalText: originalTextContent,
        newText,
      });

      const elementToSelectB = editingElement;
      exitEditMode();
      if (options?.nextSelection && document.contains(options.nextSelection)) {
        selectElement(options.nextSelection, { skipSidebar: false });
        return;
      }
      if (options?.clearSelection) {
        clearSelection();
        return;
      }
      if (options?.reselectEditedElement === false) {
        return;
      }
      if (elementToSelectB && document.contains(elementToSelectB)) {
        selectElement(elementToSelectB, { skipSidebar: false });
      }
      return;
    }

    if (componentInfo.filePath) {
      // Path A: AST write — we have source location info
      pendingCommit = {
        componentInfo,
        originalText: originalTextContent,
        newText,
        originalInnerHTML,
        tagName: componentInfo.tagName,
      };

      send({
        type: "updateText",
        filePath: componentInfo.filePath,
        lineNumber: componentInfo.lineNumber,
        columnNumber: componentInfo.columnNumber,
        originalText: originalTextContent,
        newText,
      });
    } else {
      // Path B-2: No source location — go directly to annotation fallback
      const ann: TextEditAnnotation = {
        type: "textEdit",
        id: `text-edit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        componentName: componentInfo.componentName,
        filePath: "",
        lineNumber: 0,
        columnNumber: 0,
        originalText: originalTextContent,
        newText,
      };
      const identity: ElementIdentity = {
        componentName: componentInfo.componentName,
        filePath: "",
        lineNumber: 0,
        columnNumber: 0,
        tagName: componentInfo.tagName,
      };
      addTextEditAnnotation(ann, identity, originalInnerHTML);
      addChangeEntry({
        type: "textAnnotation",
        componentName: ann.componentName,
        filePath: ann.filePath || "",
        summary: `"${truncate(ann.originalText, 20)}" → "${truncate(ann.newText, 20)}"`,
        state: "pending",
        elementIdentity: identity,
        revertData: {
          type: "annotationRemove",
          annotationId: ann.id,
          originalInnerHTML: originalInnerHTML,
          elementIdentity: identity,
        },
      });
    }
  }

  const elementToSelect = editingElement;
  exitEditMode();
  if (options?.nextSelection && document.contains(options.nextSelection)) {
    selectElement(options.nextSelection, { skipSidebar: false });
    return;
  }
  if (options?.clearSelection) {
    clearSelection();
    return;
  }
  if (options?.reselectEditedElement === false) {
    return;
  }
  // After exiting edit mode, highlight the edited element as selected
  if (elementToSelect && document.contains(elementToSelect)) {
    selectElement(elementToSelect, { skipSidebar: false });
  }
}

function exitEditMode(): void {
  if (!editingElement) return;

  // Remove listeners BEFORE removeAttribute — removing contenteditable
  // can trigger a synchronous blur event, causing re-entrant commitAndExit
  editingElement.removeEventListener("blur", handleBlur);
  editingElement.removeEventListener("keydown", handleKeydown);
  editingElement.removeEventListener("input", handleInput);

  editingElement.removeAttribute("contenteditable");

  editingElement.style.outline = savedOutline;

  activateInteraction(getActiveTool());

  editingElement = null;
  originalTextContent = "";
  originalInnerHTML = "";
  lastKnownText = "";
  componentInfo = null;
  savedOutline = "";
}
