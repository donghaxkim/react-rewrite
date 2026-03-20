# SketchUI Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a CLI tool that overlays on a running React dev server, enabling visual component selection and drag-to-reorder that writes directly to source JSX files.

**Architecture:** Monorepo with 3 packages — CLI (proxy server + WebSocket server + AST transforms), overlay (IIFE bundle injected into user's page via proxy), shared (TypeScript types). The CLI proxies the user's dev server, injects the overlay script, and handles AST-based file rewrites when the browser sends reorder commands over WebSocket.

**Tech Stack:** TypeScript, pnpm workspaces, jscodeshift/recast (AST), http-proxy, ws, tsup (IIFE bundling), react-grab + element-source (Fiber-based component resolution), vitest (testing), commander/chalk (CLI)

**Spec:** `docs/superpowers/specs/2026-03-19-sketchui-phase1-design.md`

---

## File Map

### Root

| File | Responsibility |
|------|----------------|
| `package.json` | Root scripts: `build`, `build:overlay`, `build:cli`, `dev`, `test` |
| `pnpm-workspace.yaml` | Declares workspace packages |
| `tsconfig.base.json` | Shared TS config (strict, ESNext, NodeNext) |
| `.gitignore` | Node modules, dist (except overlay/dist/overlay.js) |

### `packages/shared/`

| File | Responsibility |
|------|----------------|
| `package.json` | Package metadata, `"main": "src/types.ts"` |
| `src/types.ts` | `ClientMessage`, `ServerMessage`, `ComponentInfo` discriminated unions |

### `packages/cli/`

| File | Responsibility |
|------|----------------|
| `package.json` | CLI deps, `"bin"` entry |
| `bin/sketch-ui.js` | Shebang entry, calls compiled `dist/index.js` |
| `src/index.ts` | CLI entry: arg parsing, orchestration, startup sequence |
| `src/detect.ts` | Framework detection, port detection, health check |
| `src/inject.ts` | HTTP proxy server, HTML response buffering, script injection, overlay serving |
| `src/server.ts` | WebSocket server, message routing, undo stack, sequential queue |
| `src/transform.ts` | `reorderComponent()` and `getSiblings()` — jscodeshift AST operations |
| `src/utils.ts` | `getAvailablePort()`, `detectQuoteStyle()` |
| `src/__tests__/transform.test.ts` | Vitest unit tests for reorder and getSiblings |
| `src/__tests__/fixtures/*.tsx` | Test fixture files with known JSX structures |

### `packages/overlay/`

| File | Responsibility |
|------|----------------|
| `package.json` | Overlay deps (react-grab, element-source) |
| `tsup.config.ts` | IIFE bundle config |
| `src/index.ts` | Entry: init WS, freeze page, mount toolbar, activate selection |
| `src/bridge.ts` | WebSocket client with reconnection, typed message send/receive |
| `src/toolbar.ts` | Shadow DOM floating toolbar, component info display, error display |
| `src/selection.ts` | Hover highlight, click-to-select, marquee select, hierarchy nav |
| `src/drag.ts` | Drag preview, AST-based drop zones, drop indicator lines, reorder dispatch |

### `test-app/`

| File | Responsibility |
|------|----------------|
| `package.json` | Next.js app deps |
| `src/app/page.tsx` | Main page composing 5 components |
| `src/app/layout.tsx` | Root layout |
| `src/components/Navbar.tsx` | Simple navbar component |
| `src/components/HeroSection.tsx` | Hero section with heading + CTA |
| `src/components/Features.tsx` | Feature cards grid |
| `src/components/Pricing.tsx` | Pricing tiers |
| `src/components/Footer.tsx` | Footer with links |

---

## Task 1: Monorepo Scaffold & Shared Types

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.gitignore`
- Create: `packages/shared/package.json`, `packages/shared/src/types.ts`
- Create: `packages/cli/package.json`, `packages/cli/bin/sketch-ui.js`
- Create: `packages/overlay/package.json`, `packages/overlay/tsup.config.ts`

- [ ] **Step 1: Create root package.json**

```json
{
  "name": "sketch-ui-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm build:overlay && pnpm build:cli",
    "build:overlay": "pnpm --filter @sketch-ui/overlay build",
    "build:cli": "pnpm --filter @sketch-ui/cli build",
    "dev": "pnpm build:overlay && pnpm --filter @sketch-ui/cli dev",
    "test": "pnpm --filter @sketch-ui/cli test"
  },
  "engines": {
    "node": ">=18"
  }
}
```

- [ ] **Step 2: Create pnpm-workspace.yaml**

```yaml
packages:
  - "packages/*"
  - "test-app"
```

- [ ] **Step 3: Create tsconfig.base.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
!packages/overlay/dist/overlay.js
.next/
*.tsbuildinfo
```

- [ ] **Step 5: Create packages/shared/package.json**

```json
{
  "name": "@sketch-ui/shared",
  "version": "0.1.0",
  "private": true,
  "main": "src/types.ts",
  "types": "src/types.ts"
}
```

- [ ] **Step 6: Create packages/shared/src/types.ts**

```typescript
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
```

- [ ] **Step 7: Create packages/cli/package.json**

```json
{
  "name": "sketch-ui",
  "version": "0.1.0",
  "bin": {
    "sketch-ui": "./bin/sketch-ui.js"
  },
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc && cp ../overlay/dist/overlay.js dist/overlay.js",
    "dev": "tsc --watch",
    "test": "vitest"
  },
  "dependencies": {
    "chalk": "^5.4.0",
    "commander": "^13.0.0",
    "http-proxy": "^1.18.1",
    "jscodeshift": "^17.1.0",
    "open": "^10.1.0",
    "ws": "^8.18.0"
  },
  "devDependencies": {
    "@sketch-ui/shared": "workspace:*",
    "@types/http-proxy": "^1.17.15",
    "@types/ws": "^8.5.13",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 8: Create packages/cli/bin/sketch-ui.js**

```javascript
#!/usr/bin/env node
import("../dist/index.js");
```

- [ ] **Step 9: Create packages/cli/tsconfig.json**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "references": [{ "path": "../shared" }]
}
```

- [ ] **Step 10: Create packages/overlay/package.json**

```json
{
  "name": "@sketch-ui/overlay",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "tsup"
  },
  "dependencies": {
    "react-grab": "latest",
    "element-source": "latest"
  },
  "devDependencies": {
    "@sketch-ui/shared": "workspace:*",
    "tsup": "^8.4.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 11: Create packages/overlay/tsup.config.ts**

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["iife"],
  globalName: "SketchUI",
  minify: true,
  outDir: "dist",
  platform: "browser",
  noExternal: [/.*/],
});
```

- [ ] **Step 11b: Create packages/overlay/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "lib": ["DOM", "ES2022"],
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

- [ ] **Step 12: Run pnpm install**

Run: `pnpm install`
Expected: All workspace packages linked, dependencies resolved.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffold monorepo with shared types, cli, and overlay packages"
```

---

## Task 2: AST Transform Engine — Tests First

**Files:**
- Create: `packages/cli/src/transform.ts`
- Create: `packages/cli/src/utils.ts`
- Create: `packages/cli/src/__tests__/transform.test.ts`
- Create: `packages/cli/src/__tests__/fixtures/basic.tsx`
- Create: `packages/cli/src/__tests__/fixtures/five-siblings.tsx`
- Create: `packages/cli/src/__tests__/fixtures/with-comments.tsx`
- Create: `packages/cli/src/__tests__/fixtures/with-expressions.tsx`
- Create: `packages/cli/src/__tests__/fixtures/with-fragment.tsx`
- Create: `packages/cli/src/__tests__/fixtures/double-quotes.tsx`
- Create: `packages/cli/vitest.config.ts`

- [ ] **Step 1: Create vitest config**

```typescript
// packages/cli/vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/__tests__/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Create test fixtures**

`packages/cli/src/__tests__/fixtures/basic.tsx`:
```tsx
export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}
```

`packages/cli/src/__tests__/fixtures/five-siblings.tsx`:
```tsx
export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
```

`packages/cli/src/__tests__/fixtures/with-comments.tsx`:
```tsx
export default function Page() {
  return (
    <main>
      {/* Navigation */}
      <Navbar />
      {/* Main content */}
      <Hero />
      {/* Feature list */}
      <Features />
    </main>
  );
}
```

`packages/cli/src/__tests__/fixtures/with-expressions.tsx`:
```tsx
export default function Page() {
  return (
    <main>
      <Navbar />
      {showHero && <Hero />}
      <Features />
    </main>
  );
}
```

`packages/cli/src/__tests__/fixtures/with-fragment.tsx`:
```tsx
export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
    </>
  );
}
```

`packages/cli/src/__tests__/fixtures/double-quotes.tsx`:
```tsx
export default function Page() {
  return (
    <main className="container">
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}
```

- [ ] **Step 3: Write the failing tests**

`packages/cli/src/__tests__/transform.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { reorderComponent, getSiblings } from "../transform.js";
import * as fs from "node:fs";
import * as path from "node:path";

const fixturesDir = path.join(__dirname, "fixtures");

function readFixture(name: string): string {
  return fs.readFileSync(path.join(fixturesDir, name), "utf-8");
}

/** Find the line number of a component's opening tag in a fixture file */
function findLine(fixture: string, componentName: string): number {
  const content = fs.readFileSync(path.join(fixturesDir, fixture), "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`<${componentName}`)) return i + 1; // 1-indexed
  }
  throw new Error(`Component <${componentName}> not found in ${fixture}`);
}

/** Find the line number of a parent element (e.g., <main>) */
function findParentLine(fixture: string, tagName: string): number {
  const content = fs.readFileSync(path.join(fixturesDir, fixture), "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(`<${tagName}`)) return i + 1;
  }
  throw new Error(`Tag <${tagName}> not found in ${fixture}`);
}

describe("reorderComponent", () => {
  it("moves element from position 0 to position 2 (basic 3 siblings)", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const navbarLine = findLine("basic.tsx", "Navbar");
    const featuresLine = findLine("basic.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    // Navbar moved before Features → expected order: Hero, Navbar, Features
    const heroIdx = result.indexOf("<Hero />");
    const navbarIdx = result.indexOf("<Navbar />");
    const featuresIdx = result.indexOf("<Features />");
    expect(heroIdx).toBeLessThan(navbarIdx);
    expect(navbarIdx).toBeLessThan(featuresIdx);
  });

  it("moves element from position 0 to position 3 in 5-sibling list", () => {
    const fixturePath = path.join(fixturesDir, "five-siblings.tsx");
    const navbarLine = findLine("five-siblings.tsx", "Navbar");
    const pricingLine = findLine("five-siblings.tsx", "Pricing");
    const result = reorderComponent(fixturePath, navbarLine, pricingLine);
    // Navbar moved before Pricing → expected: Hero, Features, Navbar, Pricing, Footer
    const lines = result.split("\n");
    const componentLines = lines.filter((l) =>
      l.trim().match(/^<(Navbar|Hero|Features|Pricing|Footer)/)
    );
    expect(componentLines.map((l) => l.trim())).toEqual([
      "<Hero />",
      "<Features />",
      "<Navbar />",
      "<Pricing />",
      "<Footer />",
    ]);
  });

  it("moves self-closing tags correctly", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const featuresLine = findLine("basic.tsx", "Features");
    const navbarLine = findLine("basic.tsx", "Navbar");
    const result = reorderComponent(fixturePath, featuresLine, navbarLine);
    // Features moved before Navbar → expected: Features, Navbar, Hero
    const featuresIdx = result.indexOf("<Features />");
    const navbarIdx = result.indexOf("<Navbar />");
    expect(featuresIdx).toBeLessThan(navbarIdx);
  });

  it("moves expression containers as a unit", () => {
    const fixturePath = path.join(fixturesDir, "with-expressions.tsx");
    // The expression {showHero && <Hero />} — find the line with "showHero"
    const content = fs.readFileSync(fixturePath, "utf-8");
    const exprLine = content.split("\n").findIndex((l) => l.includes("showHero")) + 1;
    const navbarLine = findLine("with-expressions.tsx", "Navbar");
    const result = reorderComponent(fixturePath, exprLine, navbarLine);
    // Expression moved before Navbar
    const exprIdx = result.indexOf("showHero && <Hero />");
    const navbarIdx = result.indexOf("<Navbar />");
    expect(exprIdx).toBeLessThan(navbarIdx);
  });

  it("handles fragments as parent containers", () => {
    const fixturePath = path.join(fixturesDir, "with-fragment.tsx");
    const navbarLine = findLine("with-fragment.tsx", "Navbar");
    const featuresLine = findLine("with-fragment.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    const heroIdx = result.indexOf("<Hero />");
    const navbarIdx = result.indexOf("<Navbar />");
    expect(heroIdx).toBeLessThan(navbarIdx);
  });

  it("preserves comments between siblings", () => {
    const fixturePath = path.join(fixturesDir, "with-comments.tsx");
    const navbarLine = findLine("with-comments.tsx", "Navbar");
    const featuresLine = findLine("with-comments.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    expect(result).toContain("{/* Navigation */}");
    expect(result).toContain("{/* Main content */}");
    expect(result).toContain("{/* Feature list */}");
  });

  it("preserves double quotes when file uses double quotes", () => {
    const fixturePath = path.join(fixturesDir, "double-quotes.tsx");
    const navbarLine = findLine("double-quotes.tsx", "Navbar");
    const featuresLine = findLine("double-quotes.tsx", "Features");
    const result = reorderComponent(fixturePath, navbarLine, featuresLine);
    expect(result).toContain('"container"');
    expect(result).not.toContain("'container'");
  });

  it("throws on nonexistent file", () => {
    expect(() =>
      reorderComponent("/nonexistent/file.tsx", 1, 2)
    ).toThrow();
  });

  it("throws on invalid line numbers", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    expect(() => reorderComponent(fixturePath, 999, 1000)).toThrow(/not found at line/i);
  });

  it("throws when elements are not siblings", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const mainLine = findParentLine("basic.tsx", "main");
    const navbarLine = findLine("basic.tsx", "Navbar");
    expect(() => reorderComponent(fixturePath, mainLine, navbarLine)).toThrow(
      /not siblings/i
    );
  });
});

describe("getSiblings", () => {
  it("returns direct JSX children with names and line numbers", () => {
    const fixturePath = path.join(fixturesDir, "basic.tsx");
    const mainLine = findParentLine("basic.tsx", "main");
    const siblings = getSiblings(fixturePath, mainLine);
    expect(siblings).toHaveLength(3);
    expect(siblings.map((s) => s.componentName)).toEqual(["Navbar", "Hero", "Features"]);
  });

  it("returns expression containers as siblings", () => {
    const fixturePath = path.join(fixturesDir, "with-expressions.tsx");
    const mainLine = findParentLine("with-expressions.tsx", "main");
    const siblings = getSiblings(fixturePath, mainLine);
    expect(siblings).toHaveLength(3);
    expect(siblings[1].componentName).toBe("Hero");
  });

  it("works with fragment parents", () => {
    const fixturePath = path.join(fixturesDir, "with-fragment.tsx");
    // Fragment parent — find the line with <>
    const content = fs.readFileSync(fixturePath, "utf-8");
    const fragLine = content.split("\n").findIndex((l) => l.includes("<>")) + 1;
    const siblings = getSiblings(fixturePath, fragLine);
    expect(siblings).toHaveLength(3);
    expect(siblings[0].componentName).toBe("Navbar");
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `cd packages/cli && pnpm vitest run`
Expected: All tests FAIL (transform.ts doesn't exist yet).

- [ ] **Step 5: Create utils.ts with detectQuoteStyle**

```typescript
// packages/cli/src/utils.ts
import * as net from "node:net";

export async function getAvailablePort(preferred: number): Promise<number> {
  let port = preferred;
  while (port < preferred + 100) {
    const available = await new Promise<boolean>((resolve) => {
      const server = net.createServer();
      server.once("error", () => resolve(false));
      server.once("listening", () => {
        server.close();
        resolve(true);
      });
      server.listen(port);
    });
    if (available) return port;
    port++;
  }
  throw new Error(
    `No available port found in range ${preferred}-${preferred + 99}`
  );
}

export function detectQuoteStyle(source: string): "single" | "double" {
  // Only count quotes in import/require statements to avoid JSX attribute bias
  const importLines = source.split("\n").filter(
    (line) => line.includes("import ") || line.includes("require(")
  );
  const importText = importLines.join("\n");
  const singleCount = (importText.match(/'/g) || []).length;
  const doubleCount = (importText.match(/"/g) || []).length;
  // Fall back to double if no imports found (safe default for most projects)
  return singleCount > doubleCount ? "single" : "double";
}
```

- [ ] **Step 6: Implement transform.ts — reorderComponent**

```typescript
// packages/cli/src/transform.ts
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
  let fromNode: any = null;
  let toNode: any = null;

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

  fromNode = findAtLine(jsxElements, fromLine) || findAtLine(jsxFragments, fromLine);
  toNode = findAtLine(jsxElements, toLine) || findAtLine(jsxFragments, toLine);

  if (!fromNode) throw new Error(`Component not found at line ${fromLine}. If you have unsaved changes in your editor, save your files and try again.`);
  if (!toNode) throw new Error(`Component not found at line ${toLine}. If you have unsaved changes in your editor, save your files and try again.`);

  // Walk up to find the actual nodes in the parent's children array
  // If wrapped in JSXExpressionContainer, use the container
  function getMovableNode(nodePath: any): any {
    if (
      nodePath.parent &&
      nodePath.parent.node.type === "JSXExpressionContainer"
    ) {
      return nodePath.parent;
    }
    return nodePath;
  }

  const fromMovable = getMovableNode(fromNode);
  const toMovable = getMovableNode(toNode);

  // Get the parent's children array
  const parent = fromMovable.parent;
  if (!parent || !parent.node.children) {
    throw new Error("Cannot find parent container with children");
  }

  const children = parent.node.children;
  const fromIndex = children.indexOf(fromMovable.node);
  const toIndex = children.indexOf(toMovable.node);

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error("Elements are not siblings in the same parent");
  }

  // Move/insert: remove from current position, insert before target
  children.splice(fromIndex, 1);
  // Recalculate toIndex after removal
  const newToIndex = children.indexOf(toMovable.node);
  children.splice(newToIndex, 0, fromMovable.node);

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
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `cd packages/cli && pnpm vitest run`
Expected: All tests PASS.

Note: The fixture line numbers in the test must exactly match the fixture files. If any test fails due to line number mismatch, adjust the test line numbers to match the actual fixture content. The important thing is the behavior (move, not swap) is correct.

- [ ] **Step 8: Commit**

```bash
git add packages/cli/src/transform.ts packages/cli/src/utils.ts packages/cli/src/__tests__/ packages/cli/vitest.config.ts
git commit -m "feat: implement AST transform engine with move/insert semantics and tests"
```

---

## Task 3: Framework Detection & Health Check

**Files:**
- Create: `packages/cli/src/detect.ts`

- [ ] **Step 1: Implement detect.ts**

```typescript
// packages/cli/src/detect.ts
import * as fs from "node:fs";
import * as path from "node:path";
import type { DetectionResult } from "@sketch-ui/shared";

export async function detect(cwd?: string): Promise<DetectionResult> {
  const projectRoot = cwd || process.cwd();

  // Check for React dependency
  const pkgJsonPath = path.join(projectRoot, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    throw new Error(
      "No package.json found. Run sketch-ui from your project root."
    );
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  const allDeps = {
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
  };

  if (!allDeps["react"]) {
    throw new Error(
      "React not found in dependencies. SketchUI requires a React project."
    );
  }

  // Check for development mode
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SketchUI requires development mode. React Fiber debug info is not available in production builds."
    );
  }

  // Detect framework
  const nextConfigs = [
    "next.config.js",
    "next.config.ts",
    "next.config.mjs",
  ];
  const viteConfigs = ["vite.config.js", "vite.config.ts"];

  for (const config of nextConfigs) {
    if (fs.existsSync(path.join(projectRoot, config))) {
      return { framework: "nextjs", port: 3000, projectRoot };
    }
  }

  for (const config of viteConfigs) {
    if (fs.existsSync(path.join(projectRoot, config))) {
      return { framework: "vite", port: 5173, projectRoot };
    }
  }

  if (allDeps["react-scripts"]) {
    return { framework: "cra", port: 3000, projectRoot };
  }

  throw new Error(
    "Could not detect framework. SketchUI supports Next.js, Vite, and Create React App."
  );
}

export async function healthCheck(port: number, host: string = "localhost"): Promise<void> {
  const maxRetries = 3;
  const delay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`http://${host}:${port}`, {
        signal: AbortSignal.timeout(2000),
      });
      if (response.ok || response.status < 500) return;
    } catch {
      // Connection refused or timeout
    }

    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw new Error(
    `No dev server found on ${host}:${port}. Start your dev server first, then run sketch-ui.`
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/cli/src/detect.ts
git commit -m "feat: add framework detection and dev server health check"
```

---

## Task 4: Proxy Server with Script Injection

**Files:**
- Create: `packages/cli/src/inject.ts`

- [ ] **Step 1: Implement inject.ts**

```typescript
// packages/cli/src/inject.ts
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import httpProxy from "http-proxy";
import { WebSocket } from "ws";

interface ProxyServerOptions {
  targetPort: number;
  targetHost: string;
  proxyPort: number;
  wsPort: number;
  getActiveClient: () => WebSocket | null;
}

export function createProxyServer(
  options: ProxyServerOptions
): http.Server {
  const { targetPort, targetHost, proxyPort, wsPort, getActiveClient } = options;

  const proxy = httpProxy.createProxyServer({
    target: `http://${targetHost}:${targetPort}`,
    ws: true,
    selfHandleResponse: true,
  });

  const overlayPath = path.join(__dirname, "overlay.js");
  let upstreamDown = false;

  const server = http.createServer((req, res) => {
    // Serve overlay bundle
    if (req.url === "/__sketch-ui/overlay.js") {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(overlayPath).pipe(res);
      return;
    }

    // Set Accept-Encoding to identity to prevent chunked responses
    // (needed for Next.js App Router streaming)
    if (req.headers.accept?.includes("text/html")) {
      req.headers["accept-encoding"] = "identity";
    }

    proxy.web(req, res);
  });

  // Handle proxy response — inject script into HTML
  proxy.on("proxyRes", (proxyRes, req, res) => {
    const contentType = proxyRes.headers["content-type"] || "";
    const isHtml = contentType.includes("text/html");

    if (!isHtml) {
      // Pass through non-HTML responses
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res);
      return;
    }

    // Buffer HTML response for script injection
    const chunks: Buffer[] = [];
    proxyRes.on("data", (chunk: Buffer) => chunks.push(chunk));
    proxyRes.on("end", () => {
      let body = Buffer.concat(chunks).toString("utf-8");

      const injectedScript = `
<script src="/__sketch-ui/overlay.js"></script>
<script>window.__SKETCH_UI_WS_PORT__ = ${wsPort};</script>`;

      if (body.includes("</body>")) {
        body = body.replace("</body>", `${injectedScript}\n</body>`);
      } else {
        body += injectedScript;
      }

      // Update content-length and remove content-encoding
      const headers = { ...proxyRes.headers };
      delete headers["content-encoding"];
      delete headers["content-length"];
      headers["content-length"] = String(Buffer.byteLength(body));

      res.writeHead(proxyRes.statusCode || 200, headers);
      res.end(body);
    });
  });

  // Proxy WebSocket upgrades (for HMR)
  server.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head);
  });

  proxy.on("error", (err, req, res) => {
    if (!upstreamDown) {
      upstreamDown = true;
      const client = getActiveClient();
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "devServerDisconnected" }));
      }
    }
    if (res && "writeHead" in res) {
      (res as http.ServerResponse).writeHead(502, {
        "Content-Type": "text/plain",
      });
      (res as http.ServerResponse).end("Dev server unavailable");
    }
  });

  // Periodically check if upstream recovered
  const recoveryInterval = setInterval(async () => {
    if (!upstreamDown) return;
    try {
      const resp = await fetch(`http://${targetHost}:${targetPort}`, {
        signal: AbortSignal.timeout(1000),
      });
      if (resp.ok || resp.status < 500) {
        upstreamDown = false;
        const client = getActiveClient();
        if (client && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "devServerReconnected" }));
        }
      }
    } catch {
      // Still down
    }
  }, 3000);

  // Clean up interval when server closes
  server.on("close", () => clearInterval(recoveryInterval));

  return server;
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/cli/src/inject.ts
git commit -m "feat: add proxy server with HTML buffering and script injection"
```

---

## Task 5: WebSocket Server with Sequential Queue

**Files:**
- Create: `packages/cli/src/server.ts`

- [ ] **Step 1: Implement server.ts**

```typescript
// packages/cli/src/server.ts
import { WebSocketServer, WebSocket } from "ws";
import * as fs from "node:fs";
import type {
  ClientMessage,
  ServerMessage,
  UndoEntry,
} from "@sketch-ui/shared";
import { reorderComponent, getSiblings } from "./transform.js";

interface SketchServer {
  wss: WebSocketServer;
  close: () => void;
  getActiveClient: () => WebSocket | null;
}

export function createSketchServer(port: number): SketchServer {
  const wss = new WebSocketServer({ port });
  const undoStack: UndoEntry[] = [];
  let activeClient: WebSocket | null = null;
  let processing = false;
  const queue: Array<{ msg: ClientMessage; ws: WebSocket }> = [];

  function send(ws: WebSocket, msg: ServerMessage) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  }

  async function processQueue() {
    if (processing || queue.length === 0) return;
    processing = true;

    const { msg, ws } = queue.shift()!;

    try {
      switch (msg.type) {
        case "reorder": {
          const prevContent = fs.readFileSync(msg.filePath, "utf-8");
          undoStack.push({
            filePath: msg.filePath,
            content: prevContent,
            timestamp: Date.now(),
          });

          try {
            const newSource = reorderComponent(
              msg.filePath,
              msg.fromLine,
              msg.toLine
            );
            fs.writeFileSync(msg.filePath, newSource, "utf-8");
            send(ws, { type: "reorderComplete", success: true });
          } catch (err) {
            // Revert undo stack on failure
            undoStack.pop();
            send(ws, {
              type: "reorderComplete",
              success: false,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          break;
        }

        case "undo": {
          const entry = undoStack.pop();
          if (!entry) {
            send(ws, {
              type: "undoComplete",
              success: false,
              error: "Nothing to undo",
            });
          } else {
            fs.writeFileSync(entry.filePath, entry.content, "utf-8");
            send(ws, { type: "undoComplete", success: true });
          }
          break;
        }
      }
    } catch (err) {
      // Catch-all for unexpected errors
      console.error("Error processing message:", err);
    }

    processing = false;
    processQueue(); // Process next in queue
  }

  wss.on("connection", (ws) => {
    // Single client policy: close previous connection
    if (activeClient && activeClient.readyState === WebSocket.OPEN) {
      activeClient.close(4001, "replaced by new connection");
    }
    activeClient = ws;

    ws.on("message", (data) => {
      let msg: ClientMessage;
      try {
        msg = JSON.parse(data.toString());
      } catch {
        return; // Ignore malformed messages
      }

      switch (msg.type) {
        case "ping":
          send(ws, { type: "pong" });
          break;

        case "getSiblings":
          // Can run concurrently (read-only)
          try {
            const siblings = getSiblings(msg.filePath, msg.parentLine);
            send(ws, { type: "siblingsList", siblings });
          } catch (err) {
            send(ws, { type: "siblingsList", siblings: [] });
          }
          break;

        case "reorder":
        case "undo":
          // Sequential processing
          queue.push({ msg, ws });
          processQueue();
          break;
      }
    });

    ws.on("close", () => {
      if (ws === activeClient) {
        activeClient = null;
        undoStack.length = 0; // Clear undo stack on disconnect
        queue.length = 0;
      }
    });
  });

  return {
    wss,
    close: () => wss.close(),
    getActiveClient: () => activeClient,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/cli/src/server.ts
git commit -m "feat: add WebSocket server with sequential queue and undo stack"
```

---

## Task 6: CLI Entry Point

**Files:**
- Create: `packages/cli/src/index.ts`

- [ ] **Step 1: Implement index.ts**

```typescript
// packages/cli/src/index.ts
import { program } from "commander";
import chalk from "chalk";
import open from "open";
import { detect, healthCheck } from "./detect.js";
import { createProxyServer } from "./inject.js";
import { createSketchServer } from "./server.js";
import { getAvailablePort } from "./utils.js";

program
  .name("sketch-ui")
  .description("Visual overlay for React dev servers")
  .argument("[port]", "Dev server port override")
  .option("--no-open", "Don't open browser automatically")
  .option("--host <host>", "Dev server host", "localhost")
  .action(async (portArg?: string) => {
    try {
      const opts = program.opts();
      const host = opts.host || "localhost";

      console.log(chalk.cyan("\n  SketchUI") + chalk.dim(" — Phase 1\n"));

      // Detect framework
      const detection = await detect();
      const targetPort = portArg ? parseInt(portArg, 10) : detection.port;

      console.log(
        chalk.dim("  Framework: ") + chalk.white(detection.framework)
      );
      console.log(
        chalk.dim("  Dev server: ") +
          chalk.white(`http://${targetHost}:${targetPort}`)
      );

      // Health check
      console.log(chalk.dim("  Checking dev server..."));
      await healthCheck(targetPort, host);

      // Start WebSocket server
      const wsPort = await getAvailablePort(3457);
      const sketchServer = createSketchServer(wsPort);

      // Start proxy server
      const proxyPort = await getAvailablePort(3456);
      const proxyServer = createProxyServer({
        targetPort,
        targetHost: host,
        proxyPort,
        wsPort,
        getActiveClient: sketchServer.getActiveClient,
      });

      proxyServer.listen(proxyPort, () => {
        console.log(
          chalk.dim("  Proxy: ") +
            chalk.green(`http://localhost:${proxyPort}`)
        );
        console.log(
          chalk.dim("  WebSocket: ") + chalk.green(`ws://localhost:${wsPort}`)
        );
        console.log(
          chalk.dim("\n  Press ") +
            chalk.white("Ctrl+C") +
            chalk.dim(" to stop\n")
        );

        if (program.opts().open !== false) {
          open(`http://localhost:${proxyPort}`);
        }
      });

      // Graceful shutdown
      const shutdown = () => {
        console.log(chalk.dim("\n  Shutting down...\n"));
        proxyServer.close();
        sketchServer.close();
        process.exit(0);
      };

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);
    } catch (err) {
      console.error(
        chalk.red("\n  Error: ") +
          (err instanceof Error ? err.message : String(err)) +
          "\n"
      );
      process.exit(1);
    }
  });

program.parse();
```

- [ ] **Step 2: Build the CLI package**

Run: `cd packages/cli && pnpm build`
Expected: Compiles to `dist/`, but build will fail since overlay.js doesn't exist yet. That's expected — we need to build the overlay first. For now, create a placeholder:

```bash
mkdir -p packages/overlay/dist && echo "// placeholder" > packages/overlay/dist/overlay.js
```

Then: `pnpm build:cli`
Expected: Compiles successfully.

- [ ] **Step 3: Commit**

```bash
git add packages/cli/src/index.ts
git commit -m "feat: add CLI entry point with startup orchestration"
```

---

## Task 7: Overlay — WebSocket Bridge

**Files:**
- Create: `packages/overlay/src/bridge.ts`

- [ ] **Step 1: Implement bridge.ts**

```typescript
// packages/overlay/src/bridge.ts
import type { ClientMessage, ServerMessage } from "@sketch-ui/shared";

type MessageHandler = (msg: ServerMessage) => void;

let ws: WebSocket | null = null;
let messageHandlers: MessageHandler[] = [];
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let onMaxRetriesExhausted: (() => void) | null = null;
let onTabTakenOver: (() => void) | null = null;
let savedPort: number | null = null;

export function connect(port: number): void {
  if (ws && ws.readyState === WebSocket.OPEN) return;
  savedPort = port;

  ws = new WebSocket(`ws://localhost:${port}`);

  ws.onopen = () => {
    reconnectAttempts = 0;
  };

  ws.onmessage = (event) => {
    try {
      const msg: ServerMessage = JSON.parse(event.data);
      messageHandlers.forEach((handler) => handler(msg));
    } catch {
      // Ignore malformed messages
    }
  };

  ws.onclose = (event) => {
    ws = null;

    if (event.code === 4001) {
      // Replaced by another tab — notify via disconnect callback
      if (onTabTakenOver) onTabTakenOver();
      return; // Don't reconnect
    }

    // Attempt reconnection with exponential backoff
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      const delay = 500 * Math.pow(2, reconnectAttempts);
      reconnectAttempts++;
      reconnectTimer = setTimeout(() => connect(port), delay);
    } else if (onMaxRetriesExhausted) {
      onMaxRetriesExhausted();
    }
  };

  ws.onerror = () => {
    // onclose will fire after this
  };
}

export function send(msg: ClientMessage): void {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

export function onMessage(handler: MessageHandler): () => void {
  messageHandlers.push(handler);
  return () => {
    messageHandlers = messageHandlers.filter((h) => h !== handler);
  };
}

export function disconnect(): void {
  if (reconnectTimer) clearTimeout(reconnectTimer);
  if (ws) {
    ws.close();
    ws = null;
  }
  messageHandlers = [];
}

export function isConnected(): boolean {
  return ws !== null && ws.readyState === WebSocket.OPEN;
}

export function setOnMaxRetries(callback: () => void): void {
  onMaxRetriesExhausted = callback;
}

export function setOnTabTakenOver(callback: () => void): void {
  onTabTakenOver = callback;
}

export function manualReconnect(): void {
  if (savedPort) {
    reconnectAttempts = 0;
    connect(savedPort);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/bridge.ts
git commit -m "feat: add WebSocket bridge with reconnection and typed messages"
```

---

## Task 8: Overlay — Shadow DOM Toolbar

**Files:**
- Create: `packages/overlay/src/toolbar.ts`

- [ ] **Step 1: Implement toolbar.ts**

```typescript
// packages/overlay/src/toolbar.ts
import { send, onMessage, setOnMaxRetries, setOnTabTakenOver, manualReconnect } from "./bridge.js";

let shadowRoot: ShadowRoot | null = null;
let componentInfoEl: HTMLElement | null = null;
let undoBtn: HTMLButtonElement | null = null;
let errorTimeout: ReturnType<typeof setTimeout> | null = null;
let undoCount = 0;

const TOOLBAR_STYLES = `
  :host {
    all: initial;
  }
  .toolbar {
    position: fixed;
    bottom: 16px;
    right: 16px;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    color: #e0e0e0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    user-select: none;
  }
  .mode {
    color: #64b5f6;
    font-weight: 600;
  }
  .divider {
    width: 1px;
    height: 16px;
    background: #444;
  }
  .component-info {
    color: #aaa;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .component-info.error {
    color: #ef5350;
  }
  button {
    background: #2a2a3e;
    border: 1px solid #444;
    border-radius: 4px;
    color: #e0e0e0;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  button:hover:not(:disabled) {
    background: #3a3a4e;
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .close-btn {
    background: transparent;
    border: none;
    color: #888;
    font-size: 16px;
    padding: 2px 6px;
    line-height: 1;
  }
  .close-btn:hover {
    color: #ef5350;
  }
`;

export function mountToolbar(onClose: () => void): void {
  const host = document.createElement("div");
  host.id = "sketch-ui-root";
  document.body.appendChild(host);

  shadowRoot = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = TOOLBAR_STYLES;

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  toolbar.innerHTML = `
    <span class="mode">Select</span>
    <span class="divider"></span>
    <span class="component-info">No selection</span>
    <button class="undo-btn" disabled>Undo</button>
    <button class="close-btn">&times;</button>
  `;

  shadowRoot.appendChild(style);
  shadowRoot.appendChild(toolbar);

  componentInfoEl = toolbar.querySelector(".component-info");
  undoBtn = toolbar.querySelector(".undo-btn");
  const closeBtn = toolbar.querySelector(".close-btn");

  undoBtn!.addEventListener("click", () => {
    send({ type: "undo" });
    undoBtn!.disabled = true;
  });

  closeBtn!.addEventListener("click", onClose);

  // Show reconnect button when max retries exhausted
  setOnMaxRetries(() => {
    if (componentInfoEl) {
      componentInfoEl.innerHTML = 'Disconnected. <button style="background:none;border:none;color:#64b5f6;cursor:pointer;text-decoration:underline;font:inherit;">Reconnect</button>';
      componentInfoEl.classList.add("error");
      const reconnectBtn = componentInfoEl.querySelector("button");
      reconnectBtn?.addEventListener("click", () => {
        manualReconnect();
        if (componentInfoEl) {
          componentInfoEl.textContent = "Reconnecting...";
        }
      });
    }
  });

  // Show message when another tab takes over
  setOnTabTakenOver(() => {
    showError("Disconnected: another tab took over");
  });

  // Listen for server messages
  onMessage((msg) => {
    switch (msg.type) {
      case "reorderComplete":
        if (msg.success) {
          undoCount++;
          if (undoBtn) undoBtn.disabled = false;
        } else if (msg.error) {
          showError(msg.error);
        }
        break;

      case "undoComplete":
        if (msg.success) {
          undoCount = Math.max(0, undoCount - 1);
          if (undoBtn) undoBtn.disabled = undoCount === 0;
        } else if (msg.error) {
          showError(msg.error);
        }
        break;

      case "devServerDisconnected":
        showError("Dev server disconnected");
        break;

      case "devServerReconnected":
        updateComponentInfo("No selection");
        break;
    }
  });
}

export function updateComponentInfo(text: string): void {
  if (componentInfoEl) {
    componentInfoEl.textContent = text;
    componentInfoEl.classList.remove("error");
  }
}

export function showError(message: string): void {
  if (componentInfoEl) {
    componentInfoEl.textContent = message;
    componentInfoEl.classList.add("error");

    if (errorTimeout) clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
      if (componentInfoEl) {
        componentInfoEl.textContent = "No selection";
        componentInfoEl.classList.remove("error");
      }
    }, 3000);
  }
}

export function destroyToolbar(): void {
  const host = document.getElementById("sketch-ui-root");
  if (host) host.remove();
  shadowRoot = null;
  componentInfoEl = null;
  undoBtn = null;
}

export function getShadowRoot(): ShadowRoot | null {
  return shadowRoot;
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/toolbar.ts
git commit -m "feat: add Shadow DOM floating toolbar with undo and error display"
```

---

## Task 9: Overlay — Selection System

**Files:**
- Create: `packages/overlay/src/selection.ts`

- [ ] **Step 1: Implement selection.ts**

This file handles ALL mouse interaction dispatch: hover, click-to-select, marquee, and drag initiation. Having a single mousedown/mousemove/mouseup handler avoids conflicts between selection and drag. The decision logic: mousedown on a selected element → drag mode. mousedown on empty space or unselected element → selection/marquee mode.

Hierarchy navigation (scroll wheel, escape to parent) is **deferred** — the spec wants it, but without resolving the parent's DOM element for the bounding rect update, the visual would be misleading. A broken-looking feature is worse than a missing one. Escape deselects instead.

```typescript
// packages/overlay/src/selection.ts
import { resolveElementInfo } from "element-source";
import { freeze, unfreeze } from "react-grab/primitives";
import type { ComponentInfo } from "@sketch-ui/shared";
import { updateComponentInfo, getShadowRoot } from "./toolbar.js";

let currentSelection: ComponentInfo | null = null;
let selectedElement: HTMLElement | null = null;
let isActive = false;

// Overlay elements
let hoverOverlay: HTMLDivElement | null = null;
let selectionOverlay: HTMLDivElement | null = null;
let selectionLabel: HTMLDivElement | null = null;
let marqueeBox: HTMLDivElement | null = null;

// Interaction state machine
type InteractionMode = "idle" | "pending" | "marquee" | "drag";
let mode: InteractionMode = "idle";
let mouseDownPos: { x: number; y: number } | null = null;
let mouseDownElement: HTMLElement | null = null;

// Drag callbacks — set by drag.ts via setDragCallbacks
let onDragStartCallback: ((e: MouseEvent, el: HTMLElement, selection: ComponentInfo) => void) | null = null;
let onDragMoveCallback: ((e: MouseEvent) => void) | null = null;
let onDragEndCallback: ((e: MouseEvent) => void) | null = null;

const OVERLAY_STYLES = `
  .hover-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #42a5f5;
    background: rgba(66, 165, 245, 0.08);
    z-index: 2147483646;
    transition: all 0.05s ease-out;
    display: none;
  }
  .selection-overlay {
    position: fixed;
    pointer-events: none;
    border: 2px solid #1e88e5;
    background: rgba(30, 136, 229, 0.05);
    z-index: 2147483646;
    display: none;
  }
  .selection-label {
    position: fixed;
    pointer-events: none;
    background: #1e88e5;
    color: white;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 3px;
    z-index: 2147483646;
    font-family: -apple-system, BlinkMacSystemFont, monospace;
    white-space: nowrap;
    display: none;
  }
  .marquee-box {
    position: fixed;
    border: 1px dashed #42a5f5;
    background: rgba(66, 165, 245, 0.1);
    z-index: 2147483646;
    display: none;
    pointer-events: none;
  }
`;

export function setDragCallbacks(callbacks: {
  onStart: (e: MouseEvent, el: HTMLElement, selection: ComponentInfo) => void;
  onMove: (e: MouseEvent) => void;
  onEnd: (e: MouseEvent) => void;
}): void {
  onDragStartCallback = callbacks.onStart;
  onDragMoveCallback = callbacks.onMove;
  onDragEndCallback = callbacks.onEnd;
}

export function initSelection(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const style = document.createElement("style");
  style.textContent = OVERLAY_STYLES;
  shadowRoot.appendChild(style);

  hoverOverlay = document.createElement("div");
  hoverOverlay.className = "hover-overlay";
  shadowRoot.appendChild(hoverOverlay);

  selectionOverlay = document.createElement("div");
  selectionOverlay.className = "selection-overlay";
  shadowRoot.appendChild(selectionOverlay);

  selectionLabel = document.createElement("div");
  selectionLabel.className = "selection-label";
  shadowRoot.appendChild(selectionLabel);

  marqueeBox = document.createElement("div");
  marqueeBox.className = "marquee-box";
  shadowRoot.appendChild(marqueeBox);

  freeze();
  isActive = true;

  // Single set of event listeners — selection.ts owns all mouse dispatch
  document.addEventListener("mousedown", handleMouseDown, true);
  document.addEventListener("mousemove", handleMouseMove, true);
  document.addEventListener("mouseup", handleMouseUp, true);
  document.addEventListener("keydown", handleKeyDown, true);
}

function handleMouseDown(e: MouseEvent): void {
  if (!isActive) return;
  e.preventDefault();
  e.stopPropagation();

  const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
  if (!el || el.closest("#sketch-ui-root")) return;

  mouseDownPos = { x: e.clientX, y: e.clientY };
  mouseDownElement = el;

  // Decide: if clicking on the currently selected element → drag mode
  // Otherwise → selection/marquee mode
  if (currentSelection && selectedElement && selectedElement.contains(el)) {
    mode = "drag";
    // Notify drag system immediately so it can set up preview
    if (onDragStartCallback) {
      onDragStartCallback(e, selectedElement, currentSelection);
    }
  } else {
    mode = "pending"; // Will become "marquee" if dragged > 10px, or "click" on mouseup
  }
}

function handleMouseMove(e: MouseEvent): void {
  if (!isActive) return;

  if (mode === "drag") {
    // Delegate to drag system
    if (onDragMoveCallback) onDragMoveCallback(e);
    return;
  }

  if (mode === "pending" && mouseDownPos) {
    const dx = Math.abs(e.clientX - mouseDownPos.x);
    const dy = Math.abs(e.clientY - mouseDownPos.y);
    if (dx > 10 || dy > 10) {
      mode = "marquee";
    }
  }

  if (mode === "marquee" && mouseDownPos && marqueeBox) {
    const x = Math.min(e.clientX, mouseDownPos.x);
    const y = Math.min(e.clientY, mouseDownPos.y);
    const w = Math.abs(e.clientX - mouseDownPos.x);
    const h = Math.abs(e.clientY - mouseDownPos.y);
    marqueeBox.style.display = "block";
    marqueeBox.style.left = `${x}px`;
    marqueeBox.style.top = `${y}px`;
    marqueeBox.style.width = `${w}px`;
    marqueeBox.style.height = `${h}px`;
    return;
  }

  // Hover highlight (only when idle — no mouse button down)
  if (mode === "idle") {
    const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
    if (!el || el.closest("#sketch-ui-root")) {
      hideHoverOverlay();
      return;
    }

    const rect = el.getBoundingClientRect();
    if (hoverOverlay) {
      hoverOverlay.style.display = "block";
      hoverOverlay.style.left = `${rect.left}px`;
      hoverOverlay.style.top = `${rect.top}px`;
      hoverOverlay.style.width = `${rect.width}px`;
      hoverOverlay.style.height = `${rect.height}px`;
    }
  }
}

async function handleMouseUp(e: MouseEvent): Promise<void> {
  if (!isActive) return;

  const prevMode = mode;
  mode = "idle";

  if (prevMode === "drag") {
    if (onDragEndCallback) onDragEndCallback(e);
    mouseDownPos = null;
    mouseDownElement = null;
    return;
  }

  if (prevMode === "marquee" && mouseDownPos) {
    if (marqueeBox) marqueeBox.style.display = "none";
    await performMarqueeSelect(
      Math.min(e.clientX, mouseDownPos.x),
      Math.min(e.clientY, mouseDownPos.y),
      Math.max(e.clientX, mouseDownPos.x),
      Math.max(e.clientY, mouseDownPos.y)
    );
    mouseDownPos = null;
    mouseDownElement = null;
    return;
  }

  // prevMode was "pending" — treat as a click (small movement)
  if (mouseDownElement) {
    await selectElement(mouseDownElement);
  }
  mouseDownPos = null;
  mouseDownElement = null;
}

async function selectElement(el: HTMLElement): Promise<void> {
  try {
    const info = await resolveElementInfo(el);
    if (!info || !info.source) return;

    selectedElement = el;
    currentSelection = {
      tagName: info.tagName || el.tagName.toLowerCase(),
      componentName: info.componentName || el.tagName.toLowerCase(),
      filePath: info.source.filePath,
      lineNumber: info.source.lineNumber,
      columnNumber: info.source.columnNumber,
      stack: info.stack || [],
      boundingRect: {
        top: el.getBoundingClientRect().top,
        left: el.getBoundingClientRect().left,
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height,
      },
    };

    showSelectionOverlay(el.getBoundingClientRect(), currentSelection);
    hideHoverOverlay();

    updateComponentInfo(
      `<${currentSelection.componentName} /> — ${currentSelection.filePath}:${currentSelection.lineNumber}`
    );
  } catch {
    // Element might not have React fiber info
  }
}

async function performMarqueeSelect(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): Promise<void> {
  const elements: HTMLElement[] = [];
  const allElements = document.querySelectorAll("*");

  for (const el of allElements) {
    if (el.closest("#sketch-ui-root")) continue;
    const rect = el.getBoundingClientRect();
    if (
      rect.left < x2 &&
      rect.right > x1 &&
      rect.top < y2 &&
      rect.bottom > y1 &&
      rect.width > 0 &&
      rect.height > 0
    ) {
      elements.push(el as HTMLElement);
    }
  }

  if (elements.length === 0) return;

  const stacks: Array<ComponentInfo["stack"]> = [];
  for (const el of elements.slice(0, 50)) {
    try {
      const info = await resolveElementInfo(el);
      if (info?.stack?.length) {
        stacks.push(info.stack);
      }
    } catch {
      // Skip
    }
  }

  if (stacks.length === 0) return;

  const lca = findLowestCommonAncestor(stacks);
  if (!lca) return;

  for (const el of elements) {
    try {
      const info = await resolveElementInfo(el);
      if (
        info?.source?.filePath === lca.filePath &&
        info?.source?.lineNumber === lca.lineNumber
      ) {
        const rect = el.getBoundingClientRect();
        selectedElement = el as HTMLElement;
        currentSelection = {
          tagName: info.tagName || el.tagName.toLowerCase(),
          componentName: lca.componentName,
          filePath: lca.filePath,
          lineNumber: lca.lineNumber,
          columnNumber: lca.columnNumber,
          stack: info.stack || [],
          boundingRect: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
        };

        showSelectionOverlay(rect, currentSelection);
        updateComponentInfo(
          `<${lca.componentName} /> — ${lca.filePath}:${lca.lineNumber}`
        );
        return;
      }
    } catch {
      // Skip
    }
  }
}

function findLowestCommonAncestor(
  stacks: Array<ComponentInfo["stack"]>
): ComponentInfo["stack"][0] | null {
  if (stacks.length === 0) return null;
  if (stacks.length === 1) return stacks[0][0];

  const firstStack = stacks[0];
  let lastCommon: ComponentInfo["stack"][0] | null = null;

  for (let depth = 0; depth < firstStack.length; depth++) {
    const candidate = firstStack[depth];
    const allMatch = stacks.every(
      (stack) =>
        stack[depth] &&
        stack[depth].filePath === candidate.filePath &&
        stack[depth].lineNumber === candidate.lineNumber
    );
    if (allMatch) {
      lastCommon = candidate;
    } else {
      break;
    }
  }

  return lastCommon;
}

function handleKeyDown(e: KeyboardEvent): void {
  if (!isActive) return;

  if (e.key === "Escape" && currentSelection) {
    // Deselect (hierarchy navigation deferred — see spec notes)
    clearSelection();
    e.preventDefault();
  }
}

function showSelectionOverlay(rect: DOMRect, info: ComponentInfo): void {
  if (selectionOverlay) {
    selectionOverlay.style.display = "block";
    selectionOverlay.style.left = `${rect.left}px`;
    selectionOverlay.style.top = `${rect.top}px`;
    selectionOverlay.style.width = `${rect.width}px`;
    selectionOverlay.style.height = `${rect.height}px`;
  }

  if (selectionLabel) {
    selectionLabel.style.display = "block";
    selectionLabel.style.left = `${rect.left}px`;
    selectionLabel.style.top = `${rect.top - 20}px`;
    selectionLabel.textContent = `<${info.componentName} />`;
  }
}

function hideHoverOverlay(): void {
  if (hoverOverlay) hoverOverlay.style.display = "none";
}

export function clearSelection(): void {
  currentSelection = null;
  selectedElement = null;
  if (selectionOverlay) selectionOverlay.style.display = "none";
  if (selectionLabel) selectionLabel.style.display = "none";
  updateComponentInfo("No selection");
}

export function getSelection(): ComponentInfo | null {
  return currentSelection;
}

export function deactivateSelection(): void {
  isActive = false;
  unfreeze();
  document.removeEventListener("mousedown", handleMouseDown, true);
  document.removeEventListener("mousemove", handleMouseMove, true);
  document.removeEventListener("mouseup", handleMouseUp, true);
  document.removeEventListener("keydown", handleKeyDown, true);
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/selection.ts
git commit -m "feat: add selection system with unified mouse dispatch, hover, click, and marquee"
```

---

## Task 10: Overlay — Drag-to-Reorder

**Files:**
- Create: `packages/overlay/src/drag.ts`

- [ ] **Step 1: Implement drag.ts**

drag.ts does NOT register its own mousedown/mousemove/mouseup listeners. Instead, it receives callbacks from selection.ts via `setDragCallbacks`. This eliminates the event handler conflict. The drag preview is created immediately on drag start; sibling data arrives asynchronously and drop indicators appear once it does.

```typescript
// packages/overlay/src/drag.ts
import { resolveElementInfo } from "element-source";
import type { ComponentInfo, SiblingInfo } from "@sketch-ui/shared";
import { send, onMessage } from "./bridge.js";
import { clearSelection, setDragCallbacks } from "./selection.js";
import { getShadowRoot } from "./toolbar.js";

// Drag state — preview is created immediately, siblings arrive async
let preview: HTMLDivElement | null = null;
let dropIndicator: HTMLDivElement | null = null;
let dragSelection: ComponentInfo | null = null;
let dragElement: HTMLElement | null = null;
let isDragging = false;
let dragStartPos: { x: number; y: number } | null = null;

// Sibling data — populated asynchronously after getSiblings response
let siblings: SiblingInfo[] = [];
let siblingElements: Map<number, { el: HTMLElement; rect: DOMRect }> = new Map();
let siblingsReady = false;

const DRAG_STYLES = `
  .drag-preview {
    position: fixed;
    pointer-events: none;
    opacity: 0.6;
    z-index: 2147483647;
    border: 2px solid #1e88e5;
    border-radius: 4px;
    overflow: hidden;
    display: none;
  }
  .drop-indicator {
    position: fixed;
    height: 3px;
    background: #1e88e5;
    z-index: 2147483646;
    display: none;
    pointer-events: none;
    border-radius: 2px;
  }
  .drop-indicator::before,
  .drop-indicator::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: #1e88e5;
    border-radius: 50%;
    top: -3px;
  }
  .drop-indicator::before { left: -4px; }
  .drop-indicator::after { right: -4px; }
`;

let dropTarget: SiblingInfo | null = null;

export function initDrag(): void {
  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const style = document.createElement("style");
  style.textContent = DRAG_STYLES;
  shadowRoot.appendChild(style);

  // Register drag callbacks with selection.ts (no separate event listeners)
  setDragCallbacks({
    onStart: handleDragStart,
    onMove: handleDragMove,
    onEnd: handleDragEnd,
  });

  // Listen for reorder completion
  onMessage((msg) => {
    if (msg.type === "reorderComplete") {
      cleanupDrag();
      clearSelection();
    }
  });
}

function handleDragStart(e: MouseEvent, el: HTMLElement, selection: ComponentInfo): void {
  dragSelection = selection;
  dragElement = el;
  dragStartPos = { x: e.clientX, y: e.clientY };
  isDragging = false;
  siblingsReady = false;
  siblings = [];
  siblingElements = new Map();
  dropTarget = null;

  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  // Create preview element immediately (shown once drag threshold met)
  preview = document.createElement("div");
  preview.className = "drag-preview";
  const rect = el.getBoundingClientRect();
  preview.style.width = `${rect.width}px`;
  preview.style.height = `${rect.height}px`;
  preview.innerHTML = el.outerHTML;
  shadowRoot.appendChild(preview);

  dropIndicator = document.createElement("div");
  dropIndicator.className = "drop-indicator";
  shadowRoot.appendChild(dropIndicator);

  // Request siblings asynchronously (drop indicators appear when ready)
  const parentStack = selection.stack[1];
  if (!parentStack) return;

  send({
    type: "getSiblings",
    filePath: parentStack.filePath,
    parentLine: parentStack.lineNumber,
  });

  const unsubscribe = onMessage(async (msg) => {
    if (msg.type !== "siblingsList") return;
    unsubscribe();

    siblings = msg.siblings;

    // Match siblings to DOM elements
    const allElements = document.querySelectorAll("*");
    for (const sibEl of allElements) {
      if (sibEl.closest("#sketch-ui-root")) continue;
      try {
        const info = await resolveElementInfo(sibEl as HTMLElement);
        if (!info?.source) continue;
        for (const sib of msg.siblings) {
          if (
            info.source.lineNumber === sib.lineNumber &&
            info.source.filePath === parentStack.filePath
          ) {
            siblingElements.set(sib.lineNumber, {
              el: sibEl as HTMLElement,
              rect: (sibEl as HTMLElement).getBoundingClientRect(),
            });
          }
        }
      } catch {
        // Skip
      }
    }

    siblingsReady = true;
  });
}

function handleDragMove(e: MouseEvent): void {
  if (!dragStartPos) return;

  const dx = Math.abs(e.clientX - dragStartPos.x);
  const dy = Math.abs(e.clientY - dragStartPos.y);
  if (dx < 5 && dy < 5) return;

  isDragging = true;

  // Show and move preview immediately
  if (preview) {
    preview.style.display = "block";
    preview.style.left = `${e.clientX + 10}px`;
    preview.style.top = `${e.clientY + 10}px`;
  }

  // Only show drop indicators once sibling data has arrived
  if (!siblingsReady || !dragSelection) return;

  let closestSibling: SiblingInfo | null = null;
  let closestDistance = Infinity;
  let indicatorY = 0;
  let indicatorLeft = 0;
  let indicatorWidth = 0;

  for (const sibling of siblings) {
    if (sibling.lineNumber === dragSelection.lineNumber) continue;

    const sibData = siblingElements.get(sibling.lineNumber);
    if (!sibData) continue;

    const sibRect = sibData.rect;
    const midY = sibRect.top + sibRect.height / 2;
    const distance = Math.abs(e.clientY - midY);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSibling = sibling;
      if (e.clientY < midY) {
        indicatorY = sibRect.top - 2;
      } else {
        indicatorY = sibRect.bottom + 2;
      }
      indicatorLeft = sibRect.left;
      indicatorWidth = sibRect.width;
    }
  }

  dropTarget = closestSibling;

  if (closestSibling && dropIndicator) {
    dropIndicator.style.display = "block";
    dropIndicator.style.top = `${indicatorY}px`;
    dropIndicator.style.left = `${indicatorLeft}px`;
    dropIndicator.style.width = `${indicatorWidth}px`;
  } else if (dropIndicator) {
    dropIndicator.style.display = "none";
  }
}

function handleDragEnd(e: MouseEvent): void {
  if (!isDragging || !dropTarget || !dragSelection) {
    cleanupDrag();
    return;
  }

  send({
    type: "reorder",
    filePath: dragSelection.filePath,
    fromLine: dragSelection.lineNumber,
    toLine: dropTarget.lineNumber,
    fromComponent: dragSelection.componentName,
    toComponent: dropTarget.componentName,
  });

  // Hide visual elements; full cleanup happens on reorderComplete
  if (preview) preview.style.display = "none";
  if (dropIndicator) dropIndicator.style.display = "none";
  isDragging = false;
  dragStartPos = null;
}

function cleanupDrag(): void {
  preview?.remove();
  dropIndicator?.remove();
  preview = null;
  dropIndicator = null;
  dragSelection = null;
  dragElement = null;
  isDragging = false;
  dragStartPos = null;
  siblingsReady = false;
  siblings = [];
  siblingElements = new Map();
  dropTarget = null;
}

export function deactivateDrag(): void {
  cleanupDrag();
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/overlay/src/drag.ts
git commit -m "feat: add drag-to-reorder with immediate preview and async sibling resolution"
```

---

## Task 11: Overlay — Entry Point & Build

**Files:**
- Create: `packages/overlay/src/index.ts`

- [ ] **Step 1: Implement index.ts**

```typescript
// packages/overlay/src/index.ts
import { connect, disconnect } from "./bridge.js";
import { mountToolbar, destroyToolbar } from "./toolbar.js";
import { initSelection, deactivateSelection } from "./selection.js";
import { initDrag, deactivateDrag } from "./drag.js";

function init(): void {
  const wsPort = (window as any).__SKETCH_UI_WS_PORT__;
  if (!wsPort) {
    console.error("[SketchUI] No WebSocket port configured");
    return;
  }

  // Prevent double initialization
  if (document.getElementById("sketch-ui-root")) return;

  // Connect WebSocket
  connect(wsPort);

  // Mount toolbar with close handler
  mountToolbar(() => {
    deactivateSelection();
    deactivateDrag();
    disconnect();
    destroyToolbar();
  });

  // Initialize selection and drag systems
  initSelection();
  initDrag();

  console.log("[SketchUI] Overlay initialized");
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
```

- [ ] **Step 2: Build the overlay**

Run: `cd packages/overlay && pnpm build`
Expected: `dist/overlay.js` generated as a single IIFE file.

- [ ] **Step 3: Build the full project**

Run: `pnpm build`
Expected: Overlay builds, then CLI builds (copies overlay.js into cli/dist/).

- [ ] **Step 4: Commit**

```bash
git add packages/overlay/src/index.ts packages/overlay/dist/overlay.js
git commit -m "feat: add overlay entry point, build IIFE bundle"
```

---

## Task 12: Test App

**Files:**
- Create: `test-app/package.json`
- Create: `test-app/next.config.ts`
- Create: `test-app/tsconfig.json`
- Create: `test-app/src/app/layout.tsx`
- Create: `test-app/src/app/page.tsx`
- Create: `test-app/src/components/Navbar.tsx`
- Create: `test-app/src/components/HeroSection.tsx`
- Create: `test-app/src/components/Features.tsx`
- Create: `test-app/src/components/Pricing.tsx`
- Create: `test-app/src/components/Footer.tsx`

- [ ] **Step 1: Create test-app/package.json**

```json
{
  "name": "sketch-ui-test-app",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 2: Create test-app/next.config.ts**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 3: Create test-app/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create test-app/src/app/layout.tsx**

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Create test-app/src/app/page.tsx**

```tsx
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 6: Create all 5 test components**

`test-app/src/components/Navbar.tsx`:
```tsx
export function Navbar() {
  return (
    <nav style={{ padding: "16px 32px", background: "#1a1a2e", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 20, fontWeight: 700 }}>SketchUI Demo</span>
      <div style={{ display: "flex", gap: 24 }}>
        <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Features</a>
        <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Pricing</a>
        <a href="#" style={{ color: "#aaa", textDecoration: "none" }}>Docs</a>
      </div>
    </nav>
  );
}
```

`test-app/src/components/HeroSection.tsx`:
```tsx
export function HeroSection() {
  return (
    <section style={{ padding: "80px 32px", textAlign: "center", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>Build Visually</h1>
      <p style={{ fontSize: 20, opacity: 0.9, maxWidth: 600, margin: "0 auto 32px" }}>
        Drag, drop, and rearrange your React components directly in the browser.
      </p>
      <button style={{ padding: "12px 32px", fontSize: 16, background: "white", color: "#764ba2", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
        Get Started
      </button>
    </section>
  );
}
```

`test-app/src/components/Features.tsx`:
```tsx
export function Features() {
  const features = [
    { title: "Visual Editing", desc: "Click and drag components to reorder them instantly." },
    { title: "Source Sync", desc: "Changes write directly to your JSX files in real time." },
    { title: "Zero Config", desc: "Works with any Next.js or Vite project out of the box." },
  ];

  return (
    <section style={{ padding: "64px 32px", background: "#f8f9fa" }}>
      <h2 style={{ textAlign: "center", marginBottom: 48 }}>Features</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, maxWidth: 900, margin: "0 auto" }}>
        {features.map((f) => (
          <div key={f.title} style={{ padding: 24, background: "white", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <h3 style={{ marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

`test-app/src/components/Pricing.tsx`:
```tsx
export function Pricing() {
  return (
    <section style={{ padding: "64px 32px", textAlign: "center" }}>
      <h2 style={{ marginBottom: 48 }}>Pricing</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
        <div style={{ padding: 32, border: "1px solid #ddd", borderRadius: 8, width: 240 }}>
          <h3>Free</h3>
          <p style={{ fontSize: 36, fontWeight: 700, margin: "16px 0" }}>$0</p>
          <p style={{ color: "#666" }}>For personal projects</p>
        </div>
        <div style={{ padding: 32, border: "2px solid #764ba2", borderRadius: 8, width: 240, background: "#faf5ff" }}>
          <h3>Pro</h3>
          <p style={{ fontSize: 36, fontWeight: 700, margin: "16px 0" }}>$19</p>
          <p style={{ color: "#666" }}>For teams</p>
        </div>
      </div>
    </section>
  );
}
```

`test-app/src/components/Footer.tsx`:
```tsx
export function Footer() {
  return (
    <footer style={{ padding: "32px", background: "#1a1a2e", color: "#aaa", textAlign: "center" }}>
      <p>SketchUI Demo &mdash; Phase 1 Test App</p>
    </footer>
  );
}
```

- [ ] **Step 7: Add test-app/.gitignore**

```
node_modules/
.next/
```

- [ ] **Step 8: Commit**

```bash
git add test-app/
git commit -m "feat: add minimal Next.js test app with 5 visually distinct components"
```

---

## Task 13: End-to-End Verification

- [ ] **Step 1: Install test-app dependencies**

Run: `cd test-app && pnpm install`

- [ ] **Step 2: Run unit tests**

Run: `cd packages/cli && pnpm vitest run`
Expected: All transform tests pass.

- [ ] **Step 3: Build the full project**

Run: `pnpm build`
Expected: overlay.js and cli dist/ both built successfully.

- [ ] **Step 4: Start the test app dev server**

Run (in one terminal): `cd test-app && pnpm dev`
Expected: Next.js dev server starts on port 3000.

- [ ] **Step 5: Run sketch-ui against the test app**

Run (in another terminal): `cd test-app && node ../packages/cli/bin/sketch-ui.js`
Expected:
- CLI prints framework detection (Next.js), proxy port, WS port
- Browser opens to localhost:3456
- Page shows the test app with SketchUI toolbar in bottom-right
- HMR still works (edit a component file, page updates)

- [ ] **Step 6: Test hover and selection**

In the browser:
- Hover over the Hero section → blue highlight appears
- Click on it → selection outline + label showing component name and file path

- [ ] **Step 7: Test drag-to-reorder**

- Select Pricing section
- Drag it above Features
- Verify: `test-app/src/app/page.tsx` now has `<Pricing />` before `<Features />`
- Page updates via HMR showing new order

- [ ] **Step 8: Test undo**

- Click Undo in toolbar
- Verify: file reverts, page shows original order

- [ ] **Step 9: Fix any issues found, commit**

```bash
git add -A
git commit -m "fix: address issues found during end-to-end testing"
```

- [ ] **Step 10: Final commit if all clean**

```bash
git add -A
git commit -m "feat: SketchUI Phase 1 complete — CLI, proxy, selection, drag-to-reorder"
```
