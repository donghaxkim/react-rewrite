export type ClientMessage =
  | {
      type: "reorder";
      filePath: string;
      fromLine: number;
      toLine: number;
      fromComponent: string;
      toComponent: string;
    }
  | { type: "getSiblings"; filePath: string; parentLine: number }
  | { type: "undo" }
  | { type: "ping" };

export type ServerMessage =
  | { type: "reorderComplete"; success: boolean; error?: string }
  | {
      type: "siblingsList";
      siblings: Array<{ componentName: string; lineNumber: number }>;
    }
  | { type: "undoComplete"; success: boolean; error?: string }
  | { type: "devServerDisconnected" }
  | { type: "devServerReconnected" }
  | { type: "pong" };

export interface ComponentInfo {
  tagName: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  stack: Array<{
    filePath: string;
    lineNumber: number;
    columnNumber: number;
    componentName: string;
  }>;
  boundingRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export interface UndoEntry {
  filePath: string;
  content: string;
  timestamp: number;
}

export interface SiblingInfo {
  componentName: string;
  lineNumber: number;
}

export interface DetectionResult {
  framework: "nextjs" | "vite" | "cra";
  port: number;
  projectRoot: string;
}

/** Reference to a resolved component — used across all annotation types */
export interface ComponentRef {
  componentName: string;
  filePath: string;
  lineNumber: number;
}

export type ToolType = "pointer" | "grab" | "move" | "draw" | "color" | "text" | "lasso";

export interface DrawAnnotation {
  type: "draw";
  id: string;
  points: Array<{ x: number; y: number }>;
  color: string;
  strokeWidth: number;
  targetComponent: ComponentRef | null;
}

export interface TextAnnotation {
  type: "text";
  id: string;
  position: { x: number; y: number };
  content: string;
  fontSize: number;
  color: string;
  targetComponent: ComponentRef | null;
}

export interface ColorOverride {
  type: "colorChange";
  id: string;
  component: ComponentRef;
  property: "color" | "backgroundColor";
  fromColor: string;
  toColor: string;
}

export type Annotation = DrawAnnotation | TextAnnotation | ColorOverride;

// Note: CanvasUndoAction.colorChange omits `element: HTMLElement` from the spec
// because shared types must be serializable. The overlay package defines
// ColorOverrideRuntime (in canvas-state.ts) which adds the runtime-only field.
export type CanvasUndoAction =
  | { type: "ghostCreate"; ghostId: string }
  | { type: "ghostMove"; ghostId: string; previousPos: { x: number; y: number } }
  | { type: "annotationAdd"; annotationId: string }
  | { type: "colorChange"; annotationId: string; property: string; previousColor: string };

export interface SerializedAnnotations {
  moves: Array<{
    component: string;
    file: string;
    line: number;
    from: { top: number; left: number; width: number; height: number };
    to: { x: number; y: number };
  }>;
  annotations: Array<{
    type: "draw" | "text";
    startComponent?: string;
    startFile?: string;
    startLine?: number;
    targetComponent?: string;
    targetFile?: string;
    targetLine?: number;
    points?: Array<{ x: number; y: number }>;
    color?: string;
    strokeWidth?: number;
    content?: string;
    position?: { x: number; y: number };
  }>;
  colorChanges: Array<{
    component: string;
    file: string;
    line: number;
    property: string;
    from: string;
    to: string;
  }>;
}
