export type GenerateStage = "analyzing" | "generating" | "applying" | "complete" | "error";

export interface FileChange {
  filePath: string;
  description: string;
}

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
  | { type: "ping" }
  | { type: "generate"; annotations: SerializedAnnotations }
  | {
      type: "updateProperty";
      filePath: string;
      lineNumber: number;
      columnNumber: number;
      property: string;
      cssProperty: string;
      value: string;
      tailwindPrefix: string;
      tailwindToken: string | null;
      relatedPrefixes?: string[];
      originalValue: string;
      framework: "tailwind";
      classPattern?: string;
      standalone?: boolean;
    }
  | {
      type: "updateProperties";
      filePath: string;
      lineNumber: number;
      columnNumber: number;
      updates: Array<{
        property: string;
        cssProperty: string;
        value: string;
        tailwindPrefix: string;
        tailwindToken: string | null;
        relatedPrefixes?: string[];
        originalValue: string;
        classPattern?: string;
        standalone?: boolean;
      }>;
      framework: "tailwind";
    };

export type ServerMessage =
  | { type: "reorderComplete"; success: boolean; error?: string }
  | {
      type: "siblingsList";
      siblings: Array<{ componentName: string; lineNumber: number }>;
    }
  | { type: "undoComplete"; success: boolean; error?: string }
  | { type: "devServerDisconnected" }
  | { type: "devServerReconnected" }
  | { type: "pong" }
  | {
      type: "updatePropertyComplete";
      success: boolean;
      error?: string;
      errorCode?: TransformErrorCode;
    }
  | { type: "tailwindTokens"; tokens: TailwindTokenMap }
  | { type: "generateProgress"; stage: GenerateStage; message: string }
  | { type: "generateComplete"; success: boolean; changes: FileChange[]; error?: string };

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

// --- Property Inspector Types ---

export type ControlType = "number-scrub" | "segmented" | "color-swatch" | "box-model";
export type PropertyGroup = "layout" | "spacing" | "size" | "typography" | "background";

export interface PropertyDescriptor {
  key: string;
  label: string;
  group: PropertyGroup;
  controlType: ControlType;
  cssProperty: string;
  tailwindPrefix: string;
  tailwindScale: string;
  relatedPrefixes?: string[];
  defaultValue: string;
  enumValues?: EnumOption[];
  min?: number;
  max?: number;
  compound?: boolean;
  compoundGroup?: string;
  /** When true, the Tailwind class is a standalone utility (e.g. "flex", "block")
   *  not a prefix-value pair. The tailwindValue from enumValues IS the full class name. */
  standalone?: boolean;
  /** Regex pattern to match this property's Tailwind classes. Resolves prefix collisions
   *  (e.g. "text" is used by fontSize, textAlign, and color). If not provided,
   *  defaults to matching `tailwindPrefix-*`. */
  classPattern?: string;
}

export interface EnumOption {
  value: string;
  tailwindValue: string;
  icon?: string;
  label: string;
}

export interface TailwindTokenMap {
  spacing: Record<string, string>;
  colors: Record<string, string>;
  fontSize: Record<string, string>;
  fontWeight: Record<string, string>;
  borderRadius: Record<string, string>;
  borderWidth: Record<string, string>;
  opacity: Record<string, string>;
  letterSpacing: Record<string, string>;
  lineHeight: Record<string, string>;
  spacingReverse: Record<string, string>;
  colorsReverse: Record<string, string>;
  fontSizeReverse: Record<string, string>;
  fontWeightReverse: Record<string, string>;
  borderRadiusReverse: Record<string, string>;
  borderWidthReverse: Record<string, string>;
  opacityReverse: Record<string, string>;
  letterSpacingReverse: Record<string, string>;
  lineHeightReverse: Record<string, string>;
}

export type TransformErrorCode =
  | "DYNAMIC_CLASSNAME"
  | "FILE_CHANGED"
  | "MAPPED_ELEMENT"
  | "CONFLICTING_CLASS";

export interface ElementIdentity {
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  tagName: string;
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

export type ToolType = "pointer" | "grab" | "move" | "draw" | "color" | "text";

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
  | { type: "colorChange"; annotationId: string; property: string; previousColor: string }
  | {
      type: "propertyChange";
      elementIdentity: ElementIdentity;
      overrides: Array<{ cssProperty: string; previousValue: string; newValue: string }>;
    };

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
