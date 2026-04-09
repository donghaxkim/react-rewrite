// ---------------------------------------------------------------------------
// JSX Structural Path — deterministic element identity
// ---------------------------------------------------------------------------

/** A single segment in a JSX structural path. */
export interface JSXPathSegment {
  /** Tag name (host: "div", "span") or component name (composite: "Card") */
  name: string;
  /** Disambiguator */
  discriminator:
    | { type: "key"; value: string }
    | { type: "id"; value: string }
    | { type: "index"; value: number }
    | { type: "map-template" }
    | { type: "root" };
  /** First 3 static class names — debugging hint, NOT used for matching */
  classHint?: string[];
}

/** Structural path to a JSX element within a single file's component. */
export interface JSXStructuralPath {
  /** The component function name that contains this element */
  componentName: string;
  /** Source file path (relative to project root) */
  filePath: string;
  /** Ordered segments from component render root down to target element */
  segments: JSXPathSegment[];
}

export interface TextEditAnchor {
  /** Start offset of the changed range in the original rendered text */
  start: number;
  /** End offset of the changed range in the original rendered text */
  end: number;
  /** Suffix of the text immediately before the changed range */
  contextBefore: string;
  /** Prefix of the text immediately after the changed range */
  contextAfter: string;
}

// ---------------------------------------------------------------------------
// Batch Operations
// ---------------------------------------------------------------------------

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
      jsxPath?: JSXStructuralPath;
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
      jsxPath?: JSXStructuralPath;
      originalText: string;
      newText: string;
      cursorOffset?: number;
      textAnchor?: TextEditAnchor;
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
      jsxPath?: JSXStructuralPath;
      axis: "x" | "y";
      token: string;
      pxDelta: number;
      direction: "positive" | "negative";
      layoutContext: "flex" | "grid" | "block" | "positioned";
    }
  | {
      op: "duplicateElement";
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
      jsxPath?: JSXStructuralPath;
      insertAfterLine?: number;
    }
  | {
      op: "deleteElement";
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
      jsxPath?: JSXStructuralPath;
    }
  | {
      op: "insertComponent";
      file: string;
      line: number;
      col: number;
      position: "inside" | "before" | "after";
      componentName: string;
      importPath: string;
      importNames: string[];
      jsxString: string;
      registryName: string;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      id?: string;
      jsxKey?: string;
      fileMtime?: number;
      fileSize?: number;
      jsxPath?: JSXStructuralPath;
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
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      elementId?: string;
      jsxPath?: JSXStructuralPath;
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
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      elementId?: string;
      jsxPath?: JSXStructuralPath;
    }
  | {
      type: "updateText";
      filePath: string;
      lineNumber: number;
      columnNumber: number;
      originalText: string;
      newText: string;
      cursorOffset?: number;
      textAnchor?: TextEditAnchor;
      tagName?: string;
      className?: string;
      parentTagName?: string;
      parentClassName?: string;
      nthOfType?: number;
      elementId?: string;
      jsxPath?: JSXStructuralPath;
    }
  | { type: "revertChanges"; undoIds: string[] }
  | { type: "discoverFile"; componentName: string }
  | {
      type: "commitBatch";
      operations: BatchOperation[];
    }
  | { type: "fileStat"; filePath: string }
  | { type: "getComponentRegistry" };

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
  | { type: "updateTextComplete"; success: boolean; error?: string; reason?: string; undoId?: string }
  | { type: "revertComplete"; results: Array<{ undoId: string; success: boolean; error?: string }> }
  | { type: "discoverFileResult"; componentName: string; filePath: string | null }
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
  | {
      type: "componentRegistry";
      components: import("./registry-types.js").RegistryItem[];
      blocks: import("./registry-types.js").RegistryItem[];
    }
  | {
      type: "registryPrefetchProgress";
      fetched: number;
      total: number;
    };

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
  jsxPath?: JSXStructuralPath;
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
  jsxPath?: JSXStructuralPath;
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

export type ToolType = "select";

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
  cursorOffset?: number;
  textAnchor?: TextEditAnchor;
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
    }
  | { type: "cloneCreate"; cloneId: string }
  | { type: "deleteCreate"; deleteId: string };

// --- Changelog Types ---

export type RevertData =
  | { type: "noop" }
  | { type: "cliUndo"; undoIds: string[] }
  | { type: "moveRemove"; moveId: string }
  | { type: "moveRestore"; moveId: string; previousDelta: { dx: number; dy: number } }
  | { type: "annotationRemove"; annotationId: string; originalInnerHTML: string; elementIdentity: ElementIdentity }
  | { type: "batchApplyUndo"; undoIds: string[] }
  | { type: "cloneRemove"; cloneId: string }
  | { type: "deleteRestore"; deleteId: string };

export interface ChangeEntry {
  id: string;
  timestamp: number;
  type: "property" | "move" | "textEdit" | "textAnnotation" | "commitBatch" | "clone" | "delete";
  componentName: string;
  filePath: string;
  summary: string;
  state: "active" | "reverted" | "pending";
  propertyKey?: string;
  elementIdentity?: ElementIdentity;
  revertData: RevertData;
}
