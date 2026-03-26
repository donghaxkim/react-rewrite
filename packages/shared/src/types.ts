export type GenerateStage = "analyzing" | "generating" | "applying" | "complete" | "error";

export interface FileChange {
  filePath: string;
  description: string;
}

export type ApplyChange =
  | {
      type: "property";
      componentName: string;
      tag: string;
      filePath: string;
      textContent: string;
      className: string;
      nthOfType: number;
      parentTag: string;
      parentClassName: string;
      lineHint: number;
      updates: Array<{
        cssProperty: string;
        tailwindPrefix: string;
        tailwindToken: string | null;
        value: string;
        oldClass: string;
        newClass: string;
        relatedOldClasses: string[];
      }>;
    }
  | {
      type: "text";
      componentName: string;
      tag: string;
      filePath: string;
      className: string;
      nthOfType: number;
      parentTag: string;
      parentClassName: string;
      lineHint: number;
      originalText: string;
      newText: string;
    }
  | {
      type: "reorder";
      componentName: string;
      tag: string;
      filePath: string;
      parentClassName: string;
      lineHint: number;
      childrenContext: Array<{
        tag: string;
        className: string;
        textContent: string;
      }>;
      fromIndex: number;
      toIndex: number;
    }
  | {
      type: "move";
      componentName: string;
      tag: string;
      filePath: string;
      className: string;
      nthOfType: number;
      parentTag: string;
      parentClassName: string;
      lineHint: number;
      delta: { dx: number; dy: number };
      resolvedDx: string | null;
      resolvedDy: string | null;
    };

export type BatchOperation =
  | {
      op: "updateClass";
      file: string;
      line: number;
      col: number;
      componentName?: string;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      id?: string;
      jsxKey?: string;
      fileMtime?: number;
      fileSize?: number;
      updates: Array<{
        tailwindPrefix: string;
        tailwindToken: string | null;
        value: string;
        relatedPrefixes?: string[];
        classPattern?: string;
        standalone?: boolean;
      }>;
    }
  | {
      op: "updateText";
      file: string;
      line: number;
      col: number;
      componentName?: string;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      id?: string;
      jsxKey?: string;
      fileMtime?: number;
      fileSize?: number;
      originalText: string;
      newText: string;
    }
  | {
      op: "reorder";
      file: string;
      fromLine: number;
      toLine: number;
    }
  | {
      op: "moveSpacing";
      file: string;
      line: number;
      col: number;
      componentName?: string;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      id?: string;
      jsxKey?: string;
      fileMtime?: number;
      fileSize?: number;
      axis: "x" | "y";
      token: string;
      direction: "positive" | "negative";
      layoutContext: "flex" | "grid" | "block" | "positioned";
    };

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
    }
  | {
      type: "updateText";
      filePath: string;
      lineNumber: number;
      columnNumber: number;
      originalText: string;
      newText: string;
    }
  | { type: "revertChanges"; undoIds: string[] }
  | { type: "discoverFile"; componentName: string }
  | { type: "applyAllChanges"; changes: ApplyChange[] }
  | {
      type: "commitBatch";
      operations: BatchOperation[];
    }
  | { type: "fileStat"; filePath: string };

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
      undoId?: string;
    }
  | { type: "tailwindTokens"; tokens: TailwindTokenMap }
  | { type: "generateProgress"; stage: GenerateStage; message: string }
  | { type: "generateComplete"; success: boolean; changes: FileChange[]; error?: string; undoIds?: string[] }
  | { type: "updateTextComplete"; success: boolean; error?: string; reason?: string; undoId?: string }
  | { type: "revertComplete"; results: Array<{ undoId: string; success: boolean; error?: string }> }
  | { type: "discoverFileResult"; componentName: string; filePath: string | null }
  | {
      type: "applyAllComplete";
      success: boolean;
      appliedCount: number;
      failedCount: number;
      error?: string;
      undoIds: string[];
    }
  | {
      type: "commitBatchComplete";
      success: boolean;
      results: Array<{
        op: BatchOperation["op"];
        file: string;
        line: number;
        success: boolean;
        error?: string;
        undoId?: string;
      }>;
      error?: string;
      undoIds: string[];
    }
  | { type: "fileStatResult"; filePath: string; mtime: number; size: number }
  | { type: "config"; hasApiKey: boolean };

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
  id: string;
  filePath: string;
  content: string;          // beforeContent — the file state before the write
  afterContent: string;     // the file state after the write — for conflict detection
  timestamp: number;
  reverted?: boolean;       // marked true when reverted via revertChanges (not removed from stack)
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
  columnNumber?: number;
}

export type ToolType = "select" | "text";

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
  columnNumber: number;
  property: "color" | "backgroundColor";
  fromColor: string;
  toColor: string;
  pickedToken?: string;
}

export interface TextEditAnnotation {
  type: "textEdit";
  id: string;
  componentName: string;
  filePath: string;
  lineNumber: number;
  columnNumber: number;
  originalText: string;
  newText: string;
}

export type Annotation = TextAnnotation | ColorOverride | TextEditAnnotation;

// Note: CanvasUndoAction.colorChange omits `element: HTMLElement` from the spec
// because shared types must be serializable. The overlay package defines
// ColorOverrideRuntime (in canvas-state.ts) which adds the runtime-only field.
export type CanvasUndoAction =
  | { type: "moveCreate"; moveId: string }
  | { type: "moveDelta"; moveId: string; previousDelta: { dx: number; dy: number } }
  | { type: "annotationAdd"; annotationId: string }
  | { type: "colorChange"; annotationId: string; property: string; previousColor: string }
  | {
      type: "propertyChange";
      elementIdentity: ElementIdentity;
      overrides: Array<{ cssProperty: string; previousValue: string; newValue: string }>;
    }
  | {
      type: "textEditRestore";
      annotationId: string;
      elementIdentity: ElementIdentity;
      originalInnerHTML: string;
    };

// --- Changelog Types ---

export type RevertData =
  | { type: "noop" }
  | { type: "cliUndo"; undoIds: string[] }
  | { type: "moveRemove"; moveId: string }
  | { type: "moveRestore"; moveId: string; previousDelta: { dx: number; dy: number } }
  | { type: "annotationRemove"; annotationId: string; originalInnerHTML: string; elementIdentity: ElementIdentity }
  | { type: "generateUndo"; undoIds: string[] }
  | { type: "batchApplyUndo"; undoIds: string[] };

export interface ChangeEntry {
  id: string;
  timestamp: number;
  type: "property" | "move" | "textEdit" | "textAnnotation" | "generate" | "commitBatch";
  componentName: string;
  filePath: string;
  summary: string;
  state: "active" | "reverted" | "pending";
  propertyKey?: string;
  elementIdentity?: ElementIdentity;
  revertData: RevertData;
}

export interface SerializedAnnotations {
  moves: Array<{
    component: string;
    file: string;
    line: number;
    originalRect: { top: number; left: number; width: number; height: number };
    delta: { dx: number; dy: number };
    siblingRects?: Array<{ component: string; rect: { top: number; left: number; width: number; height: number } }>;
  }>;
  annotations: Array<{
    type: "text";
    targetComponent?: string;
    targetFile?: string;
    targetLine?: number;
    content?: string;
    position?: { x: number; y: number };
    fontSize?: number;
    color?: string;
  }>;
  colorChanges: Array<{
    component: string;
    file: string;
    line: number;
    property: string;
    from: string;
    to: string;
    pickedToken?: string;
  }>;
  textEdits: Array<{
    component: string;
    file: string;
    line: number;
    column: number;
    originalText: string;
    newText: string;
  }>;
}

export interface ResolvedValue<T> {
  raw: T;
  resolved: string | null;
  resolvedValue: string | null;
  confidence: number;
  type: "exact" | "snapped" | "arbitrary";
}

export interface ResolvedAnnotations {
  moves: Array<{
    component: string;
    file: string;
    line: number;
    originalRect: { top: number; left: number; width: number; height: number };
    delta: { dx: number; dy: number };
    resolvedDx: ResolvedValue<number> | null;
    resolvedDy: ResolvedValue<number> | null;
    nearestSiblings: {
      left?: { component: string; distance: number };
      right?: { component: string; distance: number };
      above?: { component: string; distance: number };
      below?: { component: string; distance: number };
    };
  }>;
  annotations: SerializedAnnotations["annotations"];
  colorChanges: Array<{
    component: string;
    file: string;
    line: number;
    property: string;
    from: string;
    to: string;
    resolvedTo: ResolvedValue<string>;
    pickedToken?: string;
  }>;
}
