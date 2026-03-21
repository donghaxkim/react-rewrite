import * as fs from "node:fs";
import * as path from "node:path";
import jscodeshift from "jscodeshift";
import type { SiblingInfo } from "@sketch-ui/shared";
import { detectQuoteStyle } from "./utils.js";

function getParser(filePath: string): string {
  const ext = path.extname(filePath);
  return ext === ".tsx" || ext === ".ts" ? "tsx" : "babel";
}

export function reorderComponent(
  filePath: string,
  fromLine: number,
  toLine: number
): string {
  const source = fs.readFileSync(filePath, "utf-8");
  const parser = getParser(filePath);
  const j = jscodeshift.withParser(parser);
  const root = j(source);
  const quoteStyle = detectQuoteStyle(source);

  // Find all JSX elements and fragments
  const jsxElements = root.find(j.JSXElement);
  const jsxFragments = root.find(j.JSXFragment);

  // Find elements at the specified lines
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

  // Walk up to find the actual node that lives in the parent's children array.
  // A JSXElement might be wrapped in a LogicalExpression inside a JSXExpressionContainer.
  // We need to walk up until we find a node whose parent has a `children` array containing it.
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

  // Get the parent's children array
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

  // Capture the whitespace (JSXText) node before the fromNode to move with it
  // This preserves formatting: each element has leading whitespace
  const fromWhitespace = fromIndex > 0 && children[fromIndex - 1]?.type === "JSXText"
    ? children[fromIndex - 1]
    : null;

  // Remove the element and its preceding whitespace
  if (fromWhitespace) {
    const wsIndex = children.indexOf(fromWhitespace);
    children.splice(wsIndex, 2); // remove whitespace + element
  } else {
    children.splice(fromIndex, 1);
  }

  // Recalculate toIndex after removal
  const newToIndex = children.indexOf(toMovable.node);

  // Insert before the target's preceding whitespace if it exists
  // Find the whitespace before the target
  const toWsIndex = newToIndex > 0 && children[newToIndex - 1]?.type === "JSXText"
    ? newToIndex - 1
    : newToIndex;

  if (fromWhitespace) {
    children.splice(toWsIndex, 0, fromWhitespace, fromMovable.node);
  } else {
    children.splice(toWsIndex, 0, fromMovable.node);
  }

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

interface ClassNameUpdate {
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
    extractToken: (cls) => cls.replace(/^rounded-t-/, ""),
  },
  "rounded-r": {
    sides: ["rounded-tr", "rounded-br"],
    extractToken: (cls) => cls.replace(/^rounded-r-/, ""),
  },
  "rounded-b": {
    sides: ["rounded-br", "rounded-bl"],
    extractToken: (cls) => cls.replace(/^rounded-b-/, ""),
  },
  "rounded-l": {
    sides: ["rounded-tl", "rounded-bl"],
    extractToken: (cls) => cls.replace(/^rounded-l-/, ""),
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

export function updateClassName(
  filePath: string,
  lineNumber: number,
  columnNumber: number,
  updates: ClassNameUpdate[]
): string {
  const source = fs.readFileSync(filePath, "utf-8");
  const parser = getParser(filePath);
  const j = jscodeshift.withParser(parser);
  const root = j(source);
  const quoteStyle = detectQuoteStyle(source);

  // Find JSX element at line:col
  let target: any = null;
  root.find(j.JSXElement).forEach((p) => {
    const loc = p.node.openingElement.loc;
    if (
      loc &&
      loc.start.line === lineNumber &&
      loc.start.column === columnNumber
    ) {
      target = p;
    }
  });

  if (!target) {
    throw new Error(
      `No JSX element found at ${lineNumber}:${columnNumber}`
    );
  }

  const openingElement = target.node.openingElement;
  const attrs = openingElement.attributes ?? [];

  // Find className attribute
  const classNameAttr = attrs.find(
    (a: any) =>
      a.type === "JSXAttribute" &&
      a.name?.type === "JSXIdentifier" &&
      a.name.name === "className"
  );

  if (!classNameAttr) {
    // No className — create one
    const allClasses = updates.map(buildClass).join(" ");
    openingElement.attributes.push(
      j.jsxAttribute(
        j.jsxIdentifier("className"),
        j.stringLiteral(allClasses)
      )
    );
    return root.toSource({ quote: quoteStyle });
  }

  const attrValue = classNameAttr.value;

  // Case 1: String literal — className="flex p-4 bg-white"
  if (attrValue.type === "StringLiteral") {
    attrValue.value = updateClassString(attrValue.value, updates);
    return root.toSource({ quote: quoteStyle });
  }

  // Case 2: JSXExpressionContainer
  if (attrValue.type === "JSXExpressionContainer") {
    const expr = attrValue.expression;

    // 2a: Template literal — className={`flex px-4 ${color}`}
    if (expr.type === "TemplateLiteral") {
      // Update static quasis
      for (const quasi of expr.quasis) {
        const raw = quasi.value.raw;
        const classes = raw.split(/\s+/).filter(Boolean);
        if (classes.length === 0) continue;

        // Check if any class matches any update prefix or related prefix
        let hasMatch = false;
        for (const update of updates) {
          const allPrefixes = [
            update.tailwindPrefix,
            ...(update.relatedPrefixes ?? []),
          ];
          if (classes.some((c) => allPrefixes.some((p) => classMatchesPrefix(c, p)))) {
            hasMatch = true;
            break;
          }
        }

        if (hasMatch) {
          // Preserve leading/trailing whitespace in template parts
          const leadingWs = raw.match(/^(\s*)/)?.[1] ?? "";
          const trailingWs = raw.match(/(\s*)$/)?.[1] ?? "";
          const updated = updateClassString(raw.trim(), updates);
          quasi.value = {
            raw: `${leadingWs}${updated}${trailingWs}`,
            cooked: `${leadingWs}${updated}${trailingWs}`,
          };
        }
      }
      return root.toSource({ quote: quoteStyle });
    }

    // 2b: Call expression — className={cn("flex p-4", ...)}
    if (expr.type === "CallExpression") {
      const args = expr.arguments;

      for (const update of updates) {
        // Check for conflicting conditional args
        if (checkConflictingConditional(args, update.tailwindPrefix)) {
          throw new Error(
            `CONFLICTING_CLASS: "${update.tailwindPrefix}" appears in a conditional argument`
          );
        }

        // Find the string arg that contains the prefix and modify it
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

        // If not found in any existing string, append to the first string arg
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

      return root.toSource({ quote: quoteStyle });
    }

    // 2c: Dynamic — className={cls}
    throw new Error(
      `DYNAMIC_CLASSNAME: className is a dynamic expression that cannot be statically modified`
    );
  }

  throw new Error(`Unsupported className value type: ${attrValue.type}`);
}
