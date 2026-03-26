import * as fs from "node:fs";
import * as path from "node:path";
import jscodeshift from "jscodeshift";
import type { SiblingInfo } from "@frameup/shared";
import { detectQuoteStyle } from "./utils.js";

export function getParser(filePath: string): string {
  const ext = path.extname(filePath);
  return ext === ".tsx" || ext === ".ts" ? "tsx" : "babel";
}

// ── I/O-free helpers (used by both single-op wrappers and batch engine) ──

/**
 * Parse source code into a jscodeshift Collection.
 * Pure function — no file I/O.
 */
export function parseSource(source: string, filePath: string) {
  const parser = getParser(filePath);
  const j = jscodeshift.withParser(parser);
  const root = j(source);
  const quoteStyle = detectQuoteStyle(source);
  return { j, root, quoteStyle };
}

/**
 * Find a JSXElement at a given line:col in the AST.
 * Returns the ASTPath or null.
 */
export function findJSXElementAt(j: any, root: any, line: number, col: number): any | null {
  let target: any = null;
  root.find(j.JSXElement).forEach((p: any) => {
    const loc = p.node.openingElement.loc;
    if (loc && loc.start.line === line && loc.start.column === col) {
      target = p;
    }
  });
  return target;
}

/**
 * Reorder JSX siblings by swapping elements at the given lines.
 * Mutates the AST in place — no I/O.
 */
export function mutateReorder(j: any, root: any, fromLine: number, toLine: number): void {
  const jsxElements = root.find(j.JSXElement);
  const jsxFragments = root.find(j.JSXFragment);

  const findAtLine = (collection: any, line: number) => {
    let found: any = null;
    collection.forEach((p: any) => {
      const startLine = p.node.openingElement
        ? p.node.openingElement.loc?.start.line
        : p.node.openingFragment?.loc?.start.line;
      if (startLine === line) {
        found = p;
      }
    });
    return found;
  };

  const fromNode = findAtLine(jsxElements, fromLine) || findAtLine(jsxFragments, fromLine);
  const toNode = findAtLine(jsxElements, toLine) || findAtLine(jsxFragments, toLine);

  if (!fromNode) throw new Error(`Component not found at line ${fromLine}. If you have unsaved changes in your editor, save your files and try again.`);
  if (!toNode) throw new Error(`Component not found at line ${toLine}. If you have unsaved changes in your editor, save your files and try again.`);

  function getMovableNode(nodePath: any): any {
    let current = nodePath;
    while (current.parent) {
      const parentNode = current.parent.node;
      if (parentNode.children && parentNode.children.indexOf(current.node) !== -1) {
        return current;
      }
      current = current.parent;
    }
    return nodePath;
  }

  const fromMovable = getMovableNode(fromNode);
  const toMovable = getMovableNode(toNode);

  const fromParent = fromMovable.parent;
  const toParent = toMovable.parent;

  if (!fromParent || !fromParent.node.children) {
    throw new Error("Elements are not siblings in the same parent container");
  }

  const children = fromParent.node.children;
  const fromIndex = children.indexOf(fromMovable.node);
  const toIndex = children.indexOf(toMovable.node);

  if (fromIndex === -1 || toIndex === -1 || fromParent.node !== toParent.node) {
    throw new Error("Elements are not siblings in the same parent");
  }

  const fromWhitespace = fromIndex > 0 && children[fromIndex - 1]?.type === "JSXText"
    ? children[fromIndex - 1]
    : null;

  if (fromWhitespace) {
    const wsIndex = children.indexOf(fromWhitespace);
    children.splice(wsIndex, 2);
  } else {
    children.splice(fromIndex, 1);
  }

  const newToIndex = children.indexOf(toMovable.node);

  const toWsIndex = newToIndex > 0 && children[newToIndex - 1]?.type === "JSXText"
    ? newToIndex - 1
    : newToIndex;

  if (fromWhitespace) {
    children.splice(toWsIndex, 0, fromWhitespace, fromMovable.node);
  } else {
    children.splice(toWsIndex, 0, fromMovable.node);
  }
}

export function reorderComponent(
  filePath: string,
  fromLine: number,
  toLine: number
): string {
  const source = fs.readFileSync(filePath, "utf-8");
  const { j, root, quoteStyle } = parseSource(source, filePath);

  mutateReorder(j, root, fromLine, toLine);
  return root.toSource({ quote: quoteStyle });
}

export function getSiblings(
  filePath: string,
  parentLine: number
): SiblingInfo[] {
  const source = fs.readFileSync(filePath, "utf-8");
  const parser = getParser(filePath);
  const j = jscodeshift.withParser(parser);
  const root = j(source);

  // Find the parent element at the given line
  let parentNode: any = null;

  root.find(j.JSXElement).forEach((p) => {
    if (p.node.openingElement.loc?.start.line === parentLine) {
      parentNode = p;
    }
  });

  if (!parentNode) {
    root.find(j.JSXFragment).forEach((p) => {
      if (p.node.openingFragment?.loc?.start.line === parentLine) {
        parentNode = p;
      }
    });
  }

  if (!parentNode) {
    throw new Error(`No JSX element found at line ${parentLine}`);
  }

  const siblings: SiblingInfo[] = [];

  for (const child of parentNode.node.children) {
    if (child.type === "JSXElement") {
      const name =
        child.openingElement.name.type === "JSXIdentifier"
          ? child.openingElement.name.name
          : child.openingElement.name.type === "JSXMemberExpression"
            ? `${child.openingElement.name.object.name}.${child.openingElement.name.property.name}`
            : "Unknown";
      siblings.push({
        componentName: name,
        lineNumber: child.openingElement.loc?.start.line ?? 0,
      });
    } else if (child.type === "JSXExpressionContainer") {
      // Look inside for JSX elements (e.g., {cond && <Comp />})
      const expr = child.expression;
      if (expr.type === "LogicalExpression" && expr.right?.type === "JSXElement") {
        const innerName =
          expr.right.openingElement.name.type === "JSXIdentifier"
            ? expr.right.openingElement.name.name
            : "Unknown";
        siblings.push({
          componentName: innerName,
          lineNumber: child.loc?.start.line ?? 0,
        });
      } else if (expr.type === "ConditionalExpression") {
        // {cond ? <A /> : <B />} — treat as a single sibling
        const consequent = expr.consequent;
        if (consequent?.type === "JSXElement") {
          const innerName =
            consequent.openingElement.name.type === "JSXIdentifier"
              ? consequent.openingElement.name.name
              : "Unknown";
          siblings.push({
            componentName: innerName,
            lineNumber: child.loc?.start.line ?? 0,
          });
        }
      }
    }
    // Skip JSXText (whitespace), JSXSpreadChild, etc.
  }

  return siblings;
}

// ── updateClassName ─────────────────────────────────────────────────────

export interface ClassNameUpdate {
  tailwindPrefix: string;
  tailwindToken: string | null;
  value: string;
  relatedPrefixes?: string[];
  classPattern?: string;
  standalone?: boolean;
}

const SHORTHAND_SPLITS: Record<
  string,
  { sides: string[]; extractToken: (cls: string) => string }
> = {
  p: {
    sides: ["pt", "pr", "pb", "pl"],
    extractToken: (cls) => cls.replace(/^p-/, ""),
  },
  px: {
    sides: ["pl", "pr"],
    extractToken: (cls) => cls.replace(/^px-/, ""),
  },
  py: {
    sides: ["pt", "pb"],
    extractToken: (cls) => cls.replace(/^py-/, ""),
  },
  m: {
    sides: ["mt", "mr", "mb", "ml"],
    extractToken: (cls) => cls.replace(/^m-/, ""),
  },
  mx: {
    sides: ["ml", "mr"],
    extractToken: (cls) => cls.replace(/^mx-/, ""),
  },
  my: {
    sides: ["mt", "mb"],
    extractToken: (cls) => cls.replace(/^my-/, ""),
  },
  rounded: {
    sides: ["rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
    extractToken: (cls) =>
      cls === "rounded" ? "DEFAULT" : cls.replace(/^rounded-/, ""),
  },
  "rounded-t": {
    sides: ["rounded-tl", "rounded-tr"],
    extractToken: (cls) => cls === "rounded-t" ? "DEFAULT" : cls.replace(/^rounded-t-/, ""),
  },
  "rounded-r": {
    sides: ["rounded-tr", "rounded-br"],
    extractToken: (cls) => cls === "rounded-r" ? "DEFAULT" : cls.replace(/^rounded-r-/, ""),
  },
  "rounded-b": {
    sides: ["rounded-br", "rounded-bl"],
    extractToken: (cls) => cls === "rounded-b" ? "DEFAULT" : cls.replace(/^rounded-b-/, ""),
  },
  "rounded-l": {
    sides: ["rounded-tl", "rounded-bl"],
    extractToken: (cls) => cls === "rounded-l" ? "DEFAULT" : cls.replace(/^rounded-l-/, ""),
  },
};

/**
 * Build the target class string from an update descriptor.
 */
function buildClass(update: ClassNameUpdate): string {
  if (update.standalone) {
    return update.tailwindToken ?? `${update.tailwindPrefix}-[${update.value}]`;
  }
  return update.tailwindToken
    ? `${update.tailwindPrefix}-${update.tailwindToken}`
    : `${update.tailwindPrefix}-[${update.value}]`;
}

/**
 * Check whether a class string matches a given Tailwind prefix.
 * E.g. prefix "p" matches "p-4", "p-[13px]", but not "px-4" or "pl-2".
 */
function classMatchesPrefix(cls: string, prefix: string): boolean {
  // Skip variant-prefixed classes (e.g. hover:bg-blue-700, dark:bg-gray-900).
  // These are intentional state/responsive overrides and should not be
  // matched when replacing the base utility class.
  if (cls.includes(":")) return false;
  // Exact match for standalone classes like "rounded"
  if (cls === prefix) return true;
  // prefix- followed by something
  return cls.startsWith(`${prefix}-`);
}

/**
 * Apply a single update to an array of class strings.
 * Returns the modified array.
 */
function applyUpdate(classes: string[], update: ClassNameUpdate): string[] {
  const newClass = buildClass(update);
  const result = [...classes];

  // 1. Check relatedPrefixes for shorthand splitting
  for (const relatedPrefix of update.relatedPrefixes ?? []) {
    const existingIdx = result.findIndex((c) =>
      classMatchesPrefix(c, relatedPrefix)
    );
    if (existingIdx === -1) continue;

    const existingCls = result[existingIdx];
    const split = SHORTHAND_SPLITS[relatedPrefix];
    if (!split) continue;

    const token = split.extractToken(existingCls);
    // Remove the shorthand class
    result.splice(existingIdx, 1);
    // Insert individual side classes, replacing the edited side with the new value
    const expansions: string[] = [];
    for (const side of split.sides) {
      if (side === update.tailwindPrefix) {
        expansions.push(newClass);
      } else {
        expansions.push(token === "DEFAULT" ? side : `${side}-${token}`);
      }
    }
    result.splice(existingIdx, 0, ...expansions);
    return result;
  }

  // 2. Find and replace existing class with same prefix
  const directIdx = result.findIndex((c) =>
    update.classPattern
      ? new RegExp(update.classPattern).test(c)
      : classMatchesPrefix(c, update.tailwindPrefix)
  );

  if (directIdx !== -1) {
    result[directIdx] = newClass;
  } else {
    result.push(newClass);
  }

  return result;
}

/**
 * Apply updates to a class string (space-separated list of classes).
 */
function updateClassString(
  classStr: string,
  updates: ClassNameUpdate[]
): string {
  let classes = classStr.split(/\s+/).filter(Boolean);
  for (const update of updates) {
    classes = applyUpdate(classes, update);
  }
  return classes.join(" ");
}

/**
 * Check if a cn()/clsx() call has the prefix in a conditional argument.
 */
function checkConflictingConditional(
  args: any[],
  prefix: string
): boolean {
  for (const arg of args) {
    // LogicalExpression: `active && "bg-blue-500"`
    if (arg.type === "LogicalExpression") {
      if (
        arg.right?.type === "StringLiteral" &&
        arg.right.value
          .split(/\s+/)
          .some((c: string) => classMatchesPrefix(c, prefix))
      ) {
        return true;
      }
    }
    // ConditionalExpression: `active ? "bg-blue-500" : "bg-red-500"`
    if (arg.type === "ConditionalExpression") {
      for (const branch of [arg.consequent, arg.alternate]) {
        if (
          branch?.type === "StringLiteral" &&
          branch.value
            .split(/\s+/)
            .some((c: string) => classMatchesPrefix(c, prefix))
        ) {
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Apply className updates to a JSX element node.
 * Mutates the AST in place — no I/O. The `j` parameter is the jscodeshift API instance.
 * Throws on dynamic className or conflicting conditional classes.
 */
export function mutateClassName(j: any, target: any, updates: ClassNameUpdate[]): void {
  const openingElement = target.node.openingElement;
  const attrs = openingElement.attributes ?? [];

  const classNameAttr = attrs.find(
    (a: any) =>
      a.type === "JSXAttribute" &&
      a.name?.type === "JSXIdentifier" &&
      a.name.name === "className"
  );

  if (!classNameAttr) {
    const allClasses = updates.map(buildClass).join(" ");
    openingElement.attributes.push(
      j.jsxAttribute(
        j.jsxIdentifier("className"),
        j.stringLiteral(allClasses)
      )
    );
    return;
  }

  const attrValue = classNameAttr.value;

  if (attrValue.type === "StringLiteral") {
    attrValue.value = updateClassString(attrValue.value, updates);
    return;
  }

  if (attrValue.type === "JSXExpressionContainer") {
    const expr = attrValue.expression;

    if (expr.type === "TemplateLiteral") {
      for (const quasi of expr.quasis) {
        const raw = quasi.value.raw;
        const classes = raw.split(/\s+/).filter(Boolean);
        if (classes.length === 0) continue;

        let hasMatch = false;
        for (const update of updates) {
          const allPrefixes = [
            update.tailwindPrefix,
            ...(update.relatedPrefixes ?? []),
          ];
          if (classes.some((c: string) => allPrefixes.some((p) => classMatchesPrefix(c, p)))) {
            hasMatch = true;
            break;
          }
        }

        if (hasMatch) {
          const leadingWs = raw.match(/^(\s*)/)?.[1] ?? "";
          const trailingWs = raw.match(/(\s*)$/)?.[1] ?? "";
          const updated = updateClassString(raw.trim(), updates);
          quasi.value = {
            raw: `${leadingWs}${updated}${trailingWs}`,
            cooked: `${leadingWs}${updated}${trailingWs}`,
          };
        }
      }
      return;
    }

    if (expr.type === "CallExpression") {
      const args = expr.arguments;

      for (const update of updates) {
        if (checkConflictingConditional(args, update.tailwindPrefix)) {
          throw new Error(
            `CONFLICTING_CLASS: "${update.tailwindPrefix}" appears in a conditional argument`
          );
        }

        let found = false;
        for (const arg of args) {
          if (arg.type === "StringLiteral") {
            const classes = arg.value.split(/\s+/).filter(Boolean);
            const allPrefixes = [
              update.tailwindPrefix,
              ...(update.relatedPrefixes ?? []),
            ];
            if (classes.some((c: string) => allPrefixes.some((p) => classMatchesPrefix(c, p)))) {
              arg.value = updateClassString(arg.value, [update]);
              found = true;
              break;
            }
          }
        }

        if (!found) {
          const firstStr = args.find((a: any) => a.type === "StringLiteral");
          if (firstStr) {
            const newClass = buildClass(update);
            firstStr.value = firstStr.value
              ? `${firstStr.value} ${newClass}`
              : newClass;
          }
        }
      }
      return;
    }

    throw new Error(
      `DYNAMIC_CLASSNAME: className is a dynamic expression that cannot be statically modified`
    );
  }

  throw new Error(`Unsupported className value type: ${attrValue.type}`);
}

export function updateClassName(
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  updates: ClassNameUpdate[]
): string {
  const source = fs.readFileSync(filePath, "utf-8");
  const { j, root, quoteStyle } = parseSource(source, filePath);

  const target = findJSXElementAt(j, root, lineNumber, columnNumber);
  if (!target) {
    throw new Error(
      `No JSX element found at ${lineNumber}:${columnNumber}`
    );
  }

  mutateClassName(j, target, updates);
  return root.toSource({ quote: quoteStyle });
}

// ── updateTextContent ────────────────────────────────────────────────────

/**
 * Replace text content of a JSX element node.
 * Mutates the AST in place — no I/O.
 * Returns true if a matching text child was found and replaced.
 */
export function mutateTextContent(target: any, originalText: string, newText: string): boolean {
  const children = target.node.children;
  if (!children) return false;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === "JSXText") {
      const trimmed = child.value.trim();
      if (trimmed === originalText.trim()) {
        const idx = child.value.indexOf(trimmed);
        const prefixWs = child.value.slice(0, idx);
        const suffixWs = child.value.slice(idx + trimmed.length);
        child.value = prefixWs + newText + suffixWs;
        return true;
      }
    }
    if (
      child.type === "JSXExpressionContainer" &&
      child.expression.type === "StringLiteral" &&
      child.expression.value === originalText
    ) {
      child.expression.value = newText;
      return true;
    }
  }

  return false;
}

/**
 * Replace text content of a JSX element at the given source position.
 * Returns the new source string, or null if no matching text child was found.
 */
export function updateTextContent(
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  originalText: string,
  newText: string,
): string | null {
  const source = fs.readFileSync(filePath, "utf-8");
  const { j, root, quoteStyle } = parseSource(source, filePath);

  const target = findJSXElementAt(j, root, lineNumber, columnNumber);
  if (!target) return null;

  if (mutateTextContent(target, originalText, newText)) {
    return root.toSource({ quote: quoteStyle });
  }
  return null;
}
