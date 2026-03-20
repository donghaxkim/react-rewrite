// packages/overlay/src/canvas-state.ts
import type {
  ToolType, Annotation, DrawAnnotation, TextAnnotation, ColorOverride,
  ComponentRef, CanvasUndoAction, SerializedAnnotations,
} from "@sketch-ui/shared";

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

let ghosts: Map<string, GhostEntry> = new Map();
let annotations: Annotation[] = [];
let undoStack: CanvasUndoAction[] = [];
let activeTool: ToolType = "pointer";
let originalsHidden = false;

let toolOptions = {
  brushSize: 4,
  brushColor: "#ef4444",
  fontSize: 16,
  textColor: "#ffffff",
};

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

export function moveGhost(id: string, pos: { x: number; y: number }): void {
  const ghost = ghosts.get(id);
  if (!ghost) return;
  const prev = { ...ghost.currentPos };
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
  undoStack.push({ type: "annotationAdd", annotationId: ann.id });
  notifyStateChange();
}

export function removeAnnotation(id: string): void {
  annotations = annotations.filter(a => a.id !== id);
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
        ghost.cloneEl.style.left = `${action.previousPos.x}px`;
        ghost.cloneEl.style.top = `${action.previousPos.y}px`;
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
  }
  return null;
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
  ghosts = new Map();
  annotations = [];
  undoStack = [];
  originalsHidden = false;
  notifyStateChange();
}

// --- Has Changes ---

export function hasChanges(): boolean {
  return ghosts.size > 0 || annotations.length > 0;
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
