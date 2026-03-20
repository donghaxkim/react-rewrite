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
