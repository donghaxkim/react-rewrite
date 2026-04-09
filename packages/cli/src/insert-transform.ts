// packages/cli/src/insert-transform.ts
// AST transform that inserts a JSX element into a target file with import merging.

import * as fs from "node:fs";
import jscodeshift from "jscodeshift";
import { getParser, parseSource, findJSXElementAt } from "./transform.js";
import { logger } from "./logger.js";

// ── Types ────────────────────────────────────────────────────────────────

export interface InsertOptions {
  line: number;
  col: number;
  position: "inside" | "before" | "after";
  componentName: string;
  importPath: string;
  importNames: string[];
  jsxString: string;
}

export interface InsertResult {
  success: boolean;
  error?: string;
  beforeContent: string;
  afterContent?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────

/**
 * Ensure the target file has the required import specifiers from the given path.
 * If an import from that path already exists, merge new specifiers into it.
 * Otherwise, create a new ImportDeclaration after the last existing import.
 */
function ensureImport(
  j: ReturnType<typeof jscodeshift.withParser>,
  root: ReturnType<ReturnType<typeof jscodeshift.withParser>>,
  importPath: string,
  importNames: string[],
  quoteStyle: "single" | "double",
): void {
  const existingImports = root.find(j.ImportDeclaration, {
    source: { value: importPath },
  });

  if (existingImports.length > 0) {
    // Merge into existing import
    const importDecl = existingImports.at(0).get();
    const existingSpecifierNames = new Set(
      importDecl.node.specifiers?.map((s: any) => {
        if (s.type === "ImportSpecifier") return s.imported.name;
        if (s.type === "ImportDefaultSpecifier") return s.local?.name;
        return null;
      }).filter(Boolean) ?? [],
    );

    for (const name of importNames) {
      if (!existingSpecifierNames.has(name)) {
        importDecl.node.specifiers!.push(
          j.importSpecifier(j.identifier(name)),
        );
      }
    }
  } else {
    // Create new import declaration
    const specifiers = importNames.map((name) =>
      j.importSpecifier(j.identifier(name)),
    );
    const newImport = j.importDeclaration(specifiers, j.literal(importPath));

    // Insert after the last existing import
    const allImports = root.find(j.ImportDeclaration);
    if (allImports.length > 0) {
      allImports.at(allImports.length - 1).insertAfter(newImport);
    } else {
      // No imports at all — insert at the top of the program body
      const program = root.find(j.Program);
      if (program.length > 0) {
        program.get().node.body.unshift(newImport);
      }
    }
  }
}

/**
 * Parse a JSX string into an AST node by wrapping it in a function body.
 */
function parseJSXString(
  j: ReturnType<typeof jscodeshift.withParser>,
  jsxString: string,
  filePath: string,
): any {
  const wrapper = `function _rr_tmp_() { return (${jsxString}); }`;
  const parser = getParser(filePath);
  const tmpJ = jscodeshift.withParser(parser);
  const tmpRoot = tmpJ(wrapper);

  // Extract the JSX node from the return statement
  let jsxNode: any = null;
  tmpRoot.find(j.ReturnStatement).forEach((p: any) => {
    if (p.node.argument) {
      jsxNode = p.node.argument;
    }
  });

  if (!jsxNode) {
    throw new Error(`Failed to parse JSX string: ${jsxString}`);
  }

  return jsxNode;
}

// ── Main ─────────────────────────────────────────────────────────────────

export function applyInsertComponent(
  filePath: string,
  opts: InsertOptions,
): InsertResult {
  const beforeContent = fs.readFileSync(filePath, "utf-8");

  try {
    const { j, root, quoteStyle } = parseSource(beforeContent, filePath);

    // 1. Ensure imports
    ensureImport(j, root, opts.importPath, opts.importNames, quoteStyle);

    // 2. Find the target JSX element
    const target = findJSXElementAt(j, root, opts.line, opts.col);
    if (!target) {
      return {
        success: false,
        error: `JSX element not found at line ${opts.line}, col ${opts.col}`,
        beforeContent,
      };
    }

    // 3. Parse the JSX string to insert
    const newNode = parseJSXString(j, opts.jsxString, filePath);

    // 4. Apply the insertion
    switch (opts.position) {
      case "inside": {
        // Append as last child
        const children = target.node.children;
        // Add a newline text node for formatting, then the new element
        children.push(j.jsxText("\n      "));
        children.push(newNode);
        children.push(j.jsxText("\n    "));
        break;
      }

      case "before":
      case "after": {
        // Find target in parent's children and splice
        const parent = target.parent;
        if (!parent || !parent.node.children) {
          return {
            success: false,
            error: "Cannot insert before/after: target has no parent with children",
            beforeContent,
          };
        }

        const siblings = parent.node.children;
        const idx = siblings.indexOf(target.node);
        if (idx === -1) {
          return {
            success: false,
            error: "Target element not found in parent children",
            beforeContent,
          };
        }

        if (opts.position === "before") {
          // Insert new node before target, with whitespace
          siblings.splice(idx, 0, newNode, j.jsxText("\n      "));
        } else {
          // Insert new node after target, with whitespace
          siblings.splice(idx + 1, 0, j.jsxText("\n      "), newNode);
        }
        break;
      }
    }

    // 5. Serialize and write
    const afterContent = root.toSource({ quote: quoteStyle });
    fs.writeFileSync(filePath, afterContent, "utf-8");

    return {
      success: true,
      beforeContent,
      afterContent,
    };
  } catch (err: any) {
    logger.error(`Insert transform failed: ${err.message}`);
    return {
      success: false,
      error: err.message,
      beforeContent,
    };
  }
}
