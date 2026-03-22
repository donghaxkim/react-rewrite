// packages/overlay/src/canvas-state.ts
import type {
  ToolType, Annotation, DrawAnnotation, TextAnnotation, ColorOverride,
  ComponentRef, CanvasUndoAction, SerializedAnnotations,
} from "@frameup/shared";

export interface GhostEntry {
  id: string;
  componentRef: ComponentRef;
  originalRect: { top: number; left: number; width: number; height: number };
  currentPos: { x: number; y: number };
  cloneEl: HTMLElement;
  originalEl: HTMLElement;
  originalOpacity: string;
  originalVisibility: string;
}

/** Runtime extension of ColorOverride — adds the DOM element reference (not serializable). */
export type ColorOverrideRuntime = ColorOverride & { targetElement: HTMLElement };

/** Runtime extension of propertyChange — adds DOM element reference (not serializable). */
export type PropertyChangeRuntime = Extract<CanvasUndoAction, { type: "propertyChange" }> & {
  element: HTMLElement;
};

let ghosts: Map<string, GhostEntry> = new Map();
let annotations: Annotation[] = [];
let undoStack: CanvasUndoAction[] = [];
let activeTool: ToolType = "pointer";
let originalsHidden = true;

let toolOptions = {
  brushSize: 4,
  brushColor: "#ef4444",
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

// --- Ghosts ---

export function getGhosts(): Map<string, GhostEntry> { return ghosts; }

export function addGhost(entry: GhostEntry): void {
  ghosts.set(entry.id, entry);
  undoStack.push({ type: "ghostCreate", ghostId: entry.id });
  notifyStateChange();
}

export function moveGhost(id: string, pos: { x: number; y: number }, previousPos?: { x: number; y: number }): void {
  const ghost = ghosts.get(id);
  if (!ghost) return;
  const prev = previousPos ?? { ...ghost.currentPos };
  ghost.currentPos = pos;
  undoStack.push({ type: "ghostMove", ghostId: id, previousPos: prev });
  notifyStateChange();
}

export function removeGhost(id: string): void {
  const ghost = ghosts.get(id);
  if (!ghost) return;
  ghost.cloneEl.remove();
  ghost.originalEl.style.opacity = ghost.originalOpacity;
  ghost.originalEl.style.visibility = ghost.originalVisibility;
  ghosts.delete(id);
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

let annotationRemovedCallback: ((id: string) => void) | null = null;
export function onAnnotationRemoved(fn: (id: string) => void): void {
  annotationRemovedCallback = fn;
}

let ghostPositionCallback: ((id: string, pageX: number, pageY: number) => void) | null = null;
export function onGhostPositionUpdate(fn: (id: string, pageX: number, pageY: number) => void): void {
  ghostPositionCallback = fn;
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
  for (const ghost of ghosts.values()) {
    if (hidden) {
      ghost.originalEl.style.opacity = "0";
      ghost.originalEl.style.visibility = "hidden";
    } else {
      // Restore to dimmed state (ghost exists, so original stays dimmed)
      ghost.originalEl.style.opacity = "0.3";
      ghost.originalEl.style.visibility = "visible";
    }
  }
  notifyStateChange();
}

/** Check if an element already has a ghost clone */
export function hasGhostForElement(el: HTMLElement): boolean {
  for (const ghost of ghosts.values()) {
    if (ghost.originalEl === el) return true;
    // Prevent nested ghost: el is inside an existing ghost's original, or vice versa
    if (ghost.originalEl.contains(el) || el.contains(ghost.originalEl)) return true;
  }
  return false;
}

// --- Undo ---

export function canvasUndo(): string | null {
  const action = undoStack.pop();
  if (!action) return null;

  switch (action.type) {
    case "ghostCreate": {
      removeGhost(action.ghostId);
      return "ghost removed";
    }
    case "ghostMove": {
      const ghost = ghosts.get(action.ghostId);
      if (ghost) {
        ghost.currentPos = action.previousPos;
        // Route DOM update through ghost-layer callback (handles wrapper vs body positioning)
        ghostPositionCallback?.(action.ghostId, action.previousPos.x, action.previousPos.y);
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
  for (const ghost of ghosts.values()) {
    ghost.cloneEl.remove();
    ghost.originalEl.style.opacity = ghost.originalOpacity;
    ghost.originalEl.style.visibility = ghost.originalVisibility;
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
  ghosts = new Map();
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
  return ghosts.size > 0 || annotations.length > 0;
}

export function canUndo(): boolean {
  return undoStack.length > 0;
}

// --- Serialization ---

export function serializeAnnotations(): SerializedAnnotations {
  const moves: SerializedAnnotations["moves"] = [];
  for (const ghost of ghosts.values()) {
    moves.push({
      component: ghost.componentRef.componentName,
      file: ghost.componentRef.filePath,
      line: ghost.componentRef.lineNumber,
      from: ghost.originalRect,
      to: ghost.currentPos,
    });
  }

  const anns: SerializedAnnotations["annotations"] = [];
  const colorChanges: SerializedAnnotations["colorChanges"] = [];

  for (const ann of annotations) {
    if (ann.type === "draw") {
      anns.push({
        type: "draw",
        startComponent: ann.targetComponent?.componentName,
        startFile: ann.targetComponent?.filePath,
        startLine: ann.targetComponent?.lineNumber,
        points: ann.points,
        color: ann.color,
        strokeWidth: ann.strokeWidth,
      });
    } else if (ann.type === "text") {
      anns.push({
        type: "text",
        content: ann.content,
        position: ann.position,
        targetComponent: ann.targetComponent?.componentName,
        targetFile: ann.targetComponent?.filePath,
        targetLine: ann.targetComponent?.lineNumber,
      });
    } else if (ann.type === "colorChange") {
      colorChanges.push({
        component: ann.component.componentName,
        file: ann.component.filePath,
        line: ann.component.lineNumber,
        property: ann.property,
        from: ann.fromColor,
        to: ann.toColor,
      });
    }
  }

  return { moves, annotations: anns, colorChanges };
}
