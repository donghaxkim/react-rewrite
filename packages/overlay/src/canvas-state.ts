// packages/overlay/src/canvas-state.ts
import type {
  ToolType, Annotation, TextAnnotation, ColorOverride,
  ComponentRef, CanvasUndoAction, SerializedAnnotations,
  TextEditAnnotation, ElementIdentity, BatchOperation,
} from "@frameup/shared";
import type { MoveEntry, ParentLayout } from "./move-state.js";
import { applyMoveTransform, clearMoveTransform, reacquireMovedElement } from "./move-state.js";
import { getTokenMap } from "./properties/tailwind-resolver.js";

/** Runtime extension of ColorOverride — adds the DOM element reference (not serializable). */
export type ColorOverrideRuntime = ColorOverride & { targetElement: HTMLElement };

/** Runtime extension of propertyChange — adds DOM element reference (not serializable). */
export type PropertyChangeRuntime = Extract<CanvasUndoAction, { type: "propertyChange" }> & {
  element: HTMLElement;
};

let moves: Map<string, MoveEntry> = new Map();
let annotations: Annotation[] = [];
let undoStack: CanvasUndoAction[] = [];
let activeTool: ToolType = "select";
let originalsHidden = true;

let toolOptions = {
  fontSize: 16,
  textColor: "#ffffff",
};

// --- Canvas Transform (infinite canvas zoom/pan) ---

let canvasScale = 1;
let canvasOffsetX = 0;
let canvasOffsetY = 0;

type CanvasTransformListener = () => void;
let canvasTransformListeners: CanvasTransformListener[] = [];

type ToolChangeListener = (tool: ToolType, prev: ToolType) => void;
type StateChangeListener = () => void;
let toolChangeListeners: ToolChangeListener[] = [];
let stateChangeListeners: StateChangeListener[] = [];

export function onToolChange(fn: ToolChangeListener): () => void {
  toolChangeListeners.push(fn);
  return () => { toolChangeListeners = toolChangeListeners.filter(f => f !== fn); };
}

export function onStateChange(fn: StateChangeListener): () => void {
  stateChangeListeners.push(fn);
  return () => { stateChangeListeners = stateChangeListeners.filter(f => f !== fn); };
}

function notifyStateChange(): void {
  stateChangeListeners.forEach(fn => fn());
}

// --- Tool ---

export function getActiveTool(): ToolType { return activeTool; }

export function setActiveTool(tool: ToolType): void {
  const prev = activeTool;
  if (prev === tool) return;
  activeTool = tool;
  toolChangeListeners.forEach(fn => fn(tool, prev));
}

export function getToolOptions() { return { ...toolOptions }; }

export function setToolOption<K extends keyof typeof toolOptions>(key: K, value: typeof toolOptions[K]): void {
  toolOptions[key] = value;
}

// --- Moves ---

export function getMoves(): Map<string, MoveEntry> {
  return moves;
}

export function addMove(entry: MoveEntry): void {
  moves.set(entry.id, entry);
  pushUndoAction({ type: "moveCreate", moveId: entry.id });
}

export function updateMoveDelta(id: string, delta: { dx: number; dy: number }, previousDelta: { dx: number; dy: number }): void {
  const entry = moves.get(id);
  if (!entry) return;
  entry.delta = delta;
  applyMoveTransform(entry);
  pushUndoAction({ type: "moveDelta", moveId: id, previousDelta });
}

export function restoreMoveDelta(id: string, previousDelta: { dx: number; dy: number }): void {
  const entry = moves.get(id);
  if (!entry) return;
  entry.delta = previousDelta;
  applyMoveTransform(entry);
  notifyStateChange();
}

export function removeMove(id: string): void {
  const entry = moves.get(id);
  if (!entry) return;
  // Restore original element state
  entry.element.style.cssText = entry.originalCssText;
  // Remove placeholder
  if (entry.placeholder && entry.placeholder.parentNode) {
    entry.placeholder.parentNode.removeChild(entry.placeholder);
  }
  moves.delete(id);
  notifyStateChange();
}

// --- Annotations ---

export function getAnnotations(): Annotation[] { return annotations; }

export function addAnnotation(ann: Annotation): void {
  annotations.push(ann);
  // Push the right undo action based on annotation type
  if (ann.type === "colorChange") {
    const colorAnn = ann as ColorOverrideRuntime;
    undoStack.push({
      type: "colorChange",
      annotationId: ann.id,
      property: colorAnn.property,
      previousColor: colorAnn.fromColor,
    });
  } else {
    undoStack.push({ type: "annotationAdd", annotationId: ann.id });
  }
  notifyStateChange();
}

export function addTextEditAnnotation(
  ann: TextEditAnnotation,
  elementIdentity: ElementIdentity,
  originalInnerHTML: string,
): void {
  annotations.push(ann);
  undoStack.push({
    type: "textEditRestore",
    annotationId: ann.id,
    elementIdentity,
    originalInnerHTML,
  });
  notifyStateChange();
}

let annotationRemovedCallback: ((id: string) => void) | null = null;
export function onAnnotationRemoved(fn: (id: string) => void): void {
  annotationRemovedCallback = fn;
}

export function removeAnnotation(id: string): void {
  annotations = annotations.filter(a => a.id !== id);
  annotationRemovedCallback?.(id);
  notifyStateChange();
}

// --- Eye Toggle ---

export function getOriginalsHidden(): boolean { return originalsHidden; }

export function setOriginalsHidden(hidden: boolean): void {
  originalsHidden = hidden;
  for (const entry of moves.values()) {
    if (hidden) {
      // "Hidden" = transforms applied (moved state)
      applyMoveTransform(entry);
    } else {
      // "Visible" = transforms cleared (original positions)
      clearMoveTransform(entry);
    }
  }
  notifyStateChange();
}

export function hasMoveForElement(el: HTMLElement): boolean {
  for (const entry of moves.values()) {
    if (entry.element === el) return true;
    if (entry.element.contains(el) || el.contains(entry.element)) return true;
  }
  return false;
}

export function getMoveForElement(el: HTMLElement): MoveEntry | undefined {
  for (const entry of moves.values()) {
    if (entry.element === el) return entry;
  }
  return undefined;
}

export function getMoveContainingElement(el: HTMLElement): MoveEntry | undefined {
  for (const entry of moves.values()) {
    if (entry.element === el) return entry;
    if (entry.element.contains(el) || el.contains(entry.element)) return entry;
  }
  return undefined;
}

// --- Undo ---

export function canvasUndo(): string | null {
  const action = undoStack.pop();
  if (!action) return null;

  switch (action.type) {
    case "moveCreate":
      removeMove(action.moveId);
      return "move removed";
    case "moveDelta": {
      const moveEntry = moves.get(action.moveId);
      if (moveEntry) {
        moveEntry.delta = action.previousDelta;
        applyMoveTransform(moveEntry);
      }
      return "move reverted";
    }
    case "annotationAdd": {
      removeAnnotation(action.annotationId);
      return "annotation removed";
    }
    case "colorChange": {
      const ann = annotations.find(a => a.id === action.annotationId) as ColorOverrideRuntime | undefined;
      if (ann?.targetElement) {
        (ann.targetElement.style as any)[action.property] = action.previousColor;
      }
      removeAnnotation(action.annotationId);
      return "color reverted";
    }
    case "propertyChange": {
      const propAction = action as PropertyChangeRuntime;
      if (propAction.element && document.contains(propAction.element)) {
        for (const override of propAction.overrides) {
          (propAction.element.style as any)[override.cssProperty] = override.previousValue;
        }
      }
      return "property reverted";
    }
    case "textEditRestore": {
      const el = reacquireMovedElement(action.elementIdentity);
      if (el) {
        el.innerHTML = action.originalInnerHTML;
      }
      removeAnnotation(action.annotationId);
      return "text edit reverted";
    }
  }
  return null;
}

export function pushUndoAction(action: CanvasUndoAction): void {
  undoStack.push(action);
  notifyStateChange();
}

export function peekUndoStack(): CanvasUndoAction | null {
  return undoStack.length > 0 ? undoStack[undoStack.length - 1] : null;
}

// --- Canvas Transform ---

export function getCanvasTransform(): { scale: number; offsetX: number; offsetY: number } {
  return { scale: canvasScale, offsetX: canvasOffsetX, offsetY: canvasOffsetY };
}

export function setCanvasTransform(scale: number, offsetX: number, offsetY: number): void {
  canvasScale = scale;
  canvasOffsetX = offsetX;
  canvasOffsetY = offsetY;
  canvasTransformListeners.forEach(fn => fn());
}

export function onCanvasTransformChange(fn: CanvasTransformListener): () => void {
  canvasTransformListeners.push(fn);
  return () => { canvasTransformListeners = canvasTransformListeners.filter(f => f !== fn); };
}

/** Convert viewport (mouse) coordinates to page coordinates, accounting for canvas transform */
export function viewportToPage(clientX: number, clientY: number): { x: number; y: number } {
  return {
    x: (clientX - canvasOffsetX) / canvasScale,
    y: (clientY - canvasOffsetY) / canvasScale,
  };
}

/** Convert page coordinates to viewport (screen) coordinates */
export function pageToViewport(pageX: number, pageY: number): { x: number; y: number } {
  return {
    x: pageX * canvasScale + canvasOffsetX,
    y: pageY * canvasScale + canvasOffsetY,
  };
}

// --- Reset ---

export function resetCanvas(): void {
  for (const entry of moves.values()) {
    entry.element.style.cssText = entry.originalCssText;
    if (entry.placeholder && entry.placeholder.parentNode) {
      entry.placeholder.parentNode.removeChild(entry.placeholder);
    }
  }
  // Revert color overrides
  for (const ann of annotations) {
    if (ann.type === "colorChange") {
      const co = ann as ColorOverrideRuntime;
      if (co.targetElement) {
        (co.targetElement.style as any)[co.property] = co.fromColor;
      }
    }
  }
  // Revert committed property overrides
  for (const action of undoStack) {
    if (action.type === "propertyChange") {
      const propAction = action as PropertyChangeRuntime;
      if (propAction.element && document.contains(propAction.element)) {
        for (const override of propAction.overrides) {
          (propAction.element.style as any)[override.cssProperty] = override.previousValue;
        }
      }
    }
  }
  moves = new Map();
  annotations = [];
  undoStack = [];
  originalsHidden = true;
  canvasScale = 1;
  canvasOffsetX = 0;
  canvasOffsetY = 0;
  canvasTransformListeners.forEach(fn => fn());
  notifyStateChange();
}

// --- Has Changes ---

export function hasChanges(): boolean {
  return moves.size > 0 || annotations.length > 0;
}

export function canUndo(): boolean {
  return undoStack.length > 0;
}

// ── Batch operations (deterministic transforms) ──────────────────────────

const ROOT_FONT_SIZE_PX = 16;

/**
 * Snap a pixel delta to the nearest Tailwind spacing token.
 * Returns the token name (e.g., "4") or an arbitrary value string (e.g., "[32px]").
 */
function snapToSpacingToken(px: number): string {
  const absPx = Math.abs(px);
  const tokenMap = getTokenMap();

  let bestToken: string | null = null;
  let bestDist = Infinity;

  for (const [token, cssValue] of tokenMap.spacing) {
    let tokenPx: number;
    if (cssValue.endsWith("rem")) {
      tokenPx = parseFloat(cssValue) * ROOT_FONT_SIZE_PX;
    } else if (cssValue.endsWith("px")) {
      tokenPx = parseFloat(cssValue);
    } else {
      continue;
    }
    if (Number.isNaN(tokenPx)) continue;

    const dist = Math.abs(absPx - tokenPx);
    if (dist < bestDist) {
      bestDist = dist;
      bestToken = token;
    }
  }

  // Accept if within 15% relative threshold (max 8px)
  if (bestToken !== null && bestDist <= Math.min(absPx * 0.15, 8)) {
    return bestToken;
  }

  // Arbitrary value fallback
  return `[${Math.round(absPx)}px]`;
}

/**
 * Derive the batch engine layout context from the captured parent layout.
 */
function deriveLayoutContext(layout?: ParentLayout): "flex" | "grid" | "block" | "positioned" {
  if (!layout) return "block";
  const pos = layout.elementPosition;
  if (pos === "absolute" || pos === "fixed") return "positioned";
  const display = layout.display;
  if (display === "flex" || display === "inline-flex") return "flex";
  if (display === "grid" || display === "inline-grid") return "grid";
  return "block";
}

/**
 * Build deterministic batch operations from current canvas state.
 * Returns operations for color changes, text edits, and moves.
 * Text annotations (freeform) are NOT included — they remain in the AI path.
 */
export function buildBatchOperations(): BatchOperation[] {
  const ops: BatchOperation[] = [];

  // Color changes → updateClass
  for (const ann of annotations) {
    if (ann.type === "colorChange") {
      const colorAnn = ann as ColorOverride;
      const prefix = colorAnn.property === "backgroundColor" ? "bg" : "text";
      ops.push({
        op: "updateClass",
        file: colorAnn.component.filePath,
        line: colorAnn.component.lineNumber,
        col: colorAnn.columnNumber ?? 0,
        componentName: colorAnn.component.componentName,
        updates: [{
          tailwindPrefix: prefix,
          tailwindToken: colorAnn.pickedToken ?? null,
          value: colorAnn.toColor,
        }],
      });
    }

    // Text edits → updateText
    if (ann.type === "textEdit") {
      const textAnn = ann as TextEditAnnotation;
      if (textAnn.filePath) { // Only if we have a file path
        ops.push({
          op: "updateText",
          file: textAnn.filePath,
          line: textAnn.lineNumber,
          col: textAnn.columnNumber,
          componentName: textAnn.componentName,
          originalText: textAnn.originalText,
          newText: textAnn.newText,
        });
      }
    }
  }

  // Moves → moveSpacing
  for (const entry of moves.values()) {
    if (!entry.componentRef.filePath) continue;

    const col = entry.identity.columnNumber;
    const layout = deriveLayoutContext(entry.parentLayout);

    if (Math.abs(entry.delta.dx) >= 1) {
      ops.push({
        op: "moveSpacing",
        file: entry.componentRef.filePath,
        line: entry.componentRef.lineNumber,
        col,
        componentName: entry.componentRef.componentName,
        axis: "x",
        token: snapToSpacingToken(entry.delta.dx),
        direction: entry.delta.dx > 0 ? "positive" : "negative",
        layoutContext: layout,
      });
    }

    if (Math.abs(entry.delta.dy) >= 1) {
      ops.push({
        op: "moveSpacing",
        file: entry.componentRef.filePath,
        line: entry.componentRef.lineNumber,
        col,
        componentName: entry.componentRef.componentName,
        axis: "y",
        token: snapToSpacingToken(entry.delta.dy),
        direction: entry.delta.dy > 0 ? "positive" : "negative",
        layoutContext: layout,
      });
    }
  }

  return ops;
}

/**
 * Check if there are any text annotations (freeform notes) that need AI generation.
 */
export function hasTextAnnotations(): boolean {
  return annotations.some(a => a.type === "text");
}

/**
 * Serialize only the text annotations for the AI generate path.
 */
export function serializeTextAnnotationsOnly(): SerializedAnnotations {
  const anns: SerializedAnnotations["annotations"] = [];
  for (const ann of annotations) {
    if (ann.type === "text") {
      anns.push({
        type: "text",
        content: ann.content,
        position: ann.position,
        targetComponent: ann.targetComponent?.componentName,
        targetFile: ann.targetComponent?.filePath,
        targetLine: ann.targetComponent?.lineNumber,
      });
    }
  }
  return { moves: [], annotations: anns, colorChanges: [], textEdits: [] };
}
