// packages/cli/src/jsx-path-resolver.ts
// Resolves a JSX structural path to an AST node (jscodeshift path object).

import type { JSXStructuralPath, JSXPathSegment } from "@react-rewrite/shared";

/**
 * Get the tag name from a JSXElement node.
 * Handles JSXIdentifier ("div") and JSXMemberExpression ("motion.div").
 */
function getTagName(node: any): string | null {
  const name = node.openingElement?.name;
  if (!name) return null;
  if (name.type === "JSXIdentifier") return name.name;
  if (name.type === "JSXMemberExpression") {
    return `${name.object?.name}.${name.property?.name}`;
  }
  return null;
}

/**
 * Check if an AST tag name matches a segment name.
 * Handles motion.div matching "motion.div", and also "div" matching "div".
 */
function tagMatches(astTag: string, segmentName: string): boolean {
  if (astTag === segmentName) return true;
  // motion.div → div
  if (astTag.includes(".")) {
    const suffix = astTag.split(".").pop()!;
    if (suffix === segmentName) return true;
  }
  if (segmentName.includes(".")) {
    const suffix = segmentName.split(".").pop()!;
    if (suffix === astTag) return true;
  }
  return false;
}

/**
 * Get a string attribute value from a JSX element.
 * Handles StringLiteral and Literal node types.
 */
function getStringAttr(node: any, attrName: string): string | null {
  const attrs = node.openingElement?.attributes ?? [];
  const attr = attrs.find(
    (a: any) => a.type === "JSXAttribute" && a.name?.name === attrName,
  );
  if (!attr?.value) return null;
  const val = attr.value;
  if (val.type === "StringLiteral" || val.type === "Literal") return val.value;
  return null;
}

/**
 * Find the root JSX element returned by a component function.
 * Searches for function declarations, arrow functions, and export defaults.
 */
function findComponentRootJSX(
  j: any,
  root: any,
  componentName: string,
): any | null {
  let funcBody: any = null;
  let isExpressionBody = false;

  // 1. FunctionDeclaration: function ComponentName() {}
  root.find(j.FunctionDeclaration).forEach((p: any) => {
    if (p.node.id?.name === componentName) {
      funcBody = p.node.body;
    }
  });

  // 2. VariableDeclarator: const ComponentName = () => {} or function expression
  if (!funcBody) {
    root.find(j.VariableDeclarator).forEach((p: any) => {
      if (p.node.id?.name === componentName) {
        const init = p.node.init;
        if (init?.type === "ArrowFunctionExpression") {
          if (init.body?.type === "BlockStatement") {
            funcBody = init.body;
          } else {
            // Expression body: () => <div />
            funcBody = init.body;
            isExpressionBody = true;
          }
        } else if (init?.type === "FunctionExpression") {
          funcBody = init.body;
        }
      }
    });
  }

  // 3. ExportDefaultDeclaration with FunctionDeclaration
  if (!funcBody) {
    root.find(j.ExportDefaultDeclaration).forEach((p: any) => {
      const decl = p.node.declaration;
      if (decl?.type === "FunctionDeclaration" && decl.id?.name === componentName) {
        funcBody = decl.body;
      }
      // Also handle: export default function() {} — anonymous default
      if (decl?.type === "FunctionDeclaration" && !decl.id && componentName === "default") {
        funcBody = decl.body;
      }
      // Arrow function default export
      if (decl?.type === "ArrowFunctionExpression") {
        if (decl.body?.type === "BlockStatement") {
          funcBody = decl.body;
        } else {
          funcBody = decl.body;
          isExpressionBody = true;
        }
      }
    });
  }

  if (!funcBody) return null;

  // Find the root JSX element from the function body
  let rootJSXNode: any = null;

  if (isExpressionBody) {
    // Arrow function expression body — the body IS the JSX
    if (funcBody.type === "JSXElement" || funcBody.type === "JSXFragment") {
      rootJSXNode = funcBody;
    }
    // Parenthesized expression — sometimes wrapped
    if (funcBody.type === "ParenthesizedExpression") {
      rootJSXNode = funcBody.expression;
    }
  } else {
    // Block body — find the return statement
    const body = funcBody.body ?? [];
    for (const stmt of body) {
      if (stmt.type === "ReturnStatement" && stmt.argument) {
        rootJSXNode = stmt.argument;
        break;
      }
    }
  }

  if (!rootJSXNode) return null;

  // Convert raw AST node to a jscodeshift path by finding it in the tree
  if (rootJSXNode.type === "JSXElement") {
    let matchedPath: any = null;
    root.find(j.JSXElement).forEach((p: any) => {
      if (p.node === rootJSXNode) matchedPath = p;
    });
    return matchedPath;
  }

  // JSXFragment — look for JSXElement inside it as the effective root
  // For fragments, the first JSXElement child is typically the root
  if (rootJSXNode.type === "JSXFragment") {
    // Return the fragment node itself — but we need a path.
    // Since jscodeshift doesn't easily give paths for fragments,
    // return null if root is a fragment (structural path assumes a root element)
    return null;
  }

  return null;
}

/**
 * Get JSXElement children of a node, filtering out text and expression containers
 * (unless we need expression containers for map-template).
 */
function getJSXElementChildren(node: any): any[] {
  const children = node.children ?? [];
  return children.filter((c: any) => c.type === "JSXElement");
}

/**
 * Resolve a single path segment against the current JSXElement.
 * Returns the matched child JSXElement node (raw AST node, not path), or null.
 */
function resolveSegmentNode(
  currentNode: any,
  segment: JSXPathSegment,
): any | null {
  const disc = segment.discriminator;

  if (disc.type === "map-template") {
    // Look through children for JSXExpressionContainer with .map() call
    const children = currentNode.children ?? [];
    for (const child of children) {
      if (child.type === "JSXExpressionContainer") {
        const expr = child.expression;
        if (
          expr?.type === "CallExpression" &&
          expr.callee?.type === "MemberExpression" &&
          expr.callee.property?.name === "map"
        ) {
          // Get the callback (first argument)
          const callback = expr.arguments?.[0];
          if (!callback) continue;

          let callbackBody: any = null;
          if (
            callback.type === "ArrowFunctionExpression" ||
            callback.type === "FunctionExpression"
          ) {
            if (callback.body?.type === "BlockStatement") {
              // Find return statement
              for (const stmt of callback.body.body ?? []) {
                if (stmt.type === "ReturnStatement" && stmt.argument) {
                  callbackBody = stmt.argument;
                  break;
                }
              }
            } else {
              // Expression body
              callbackBody = callback.body;
            }
          }

          if (callbackBody?.type === "JSXElement") {
            const tag = getTagName(callbackBody);
            if (tag && tagMatches(tag, segment.name)) {
              return callbackBody;
            }
          }
          // Handle parenthesized JSX in map callbacks
          if (callbackBody?.type === "ParenthesizedExpression" && callbackBody.expression?.type === "JSXElement") {
            const tag = getTagName(callbackBody.expression);
            if (tag && tagMatches(tag, segment.name)) {
              return callbackBody.expression;
            }
          }
        }
      }
    }
    return null;
  }

  // For key, id, index discriminators — filter JSXElement children by name
  const jsxChildren = getJSXElementChildren(currentNode);
  const sameNameChildren = jsxChildren.filter((child: any) => {
    const tag = getTagName(child);
    return tag !== null && tagMatches(tag, segment.name);
  });

  if (sameNameChildren.length === 0) return null;

  switch (disc.type) {
    case "key": {
      return sameNameChildren.find(
        (child: any) => getStringAttr(child, "key") === disc.value,
      ) ?? null;
    }
    case "id": {
      return sameNameChildren.find(
        (child: any) => getStringAttr(child, "id") === disc.value,
      ) ?? null;
    }
    case "index": {
      return sameNameChildren[disc.value] ?? null;
    }
    case "root": {
      // Should not appear after index 0, but handle gracefully
      return sameNameChildren[0] ?? null;
    }
    default:
      return null;
  }
}

/**
 * Resolve a JSX structural path to an AST node.
 * Returns the jscodeshift path object for the matched JSXElement, or null if resolution fails.
 */
export function resolveJSXPath(
  j: any,
  root: any,
  path: JSXStructuralPath,
): any | null {
  if (!path.segments || path.segments.length === 0) return null;

  // Step 1: Find the component's root JSX element
  const rootJSX = findComponentRootJSX(j, root, path.componentName);
  if (!rootJSX) return null;

  // Validate root segment name matches
  const rootSegment = path.segments[0];
  const rootTag = getTagName(rootJSX.node);
  if (rootTag && rootSegment.name && !tagMatches(rootTag, rootSegment.name)) {
    // Root element tag mismatch — path is stale
    return null;
  }

  // If only the root segment, return it
  if (path.segments.length === 1) return rootJSX;

  // Step 2: Walk remaining segments
  let currentNode = rootJSX.node;
  let targetNode: any = rootJSX.node;

  for (let i = 1; i < path.segments.length; i++) {
    const segment = path.segments[i];
    const nextNode = resolveSegmentNode(currentNode, segment);
    if (!nextNode) return null;
    currentNode = nextNode;
    targetNode = nextNode;
  }

  // Step 3: Convert the raw AST node back to a jscodeshift path
  let matchedPath: any = null;
  root.find(j.JSXElement).forEach((p: any) => {
    if (p.node === targetNode) matchedPath = p;
  });

  return matchedPath;
}
