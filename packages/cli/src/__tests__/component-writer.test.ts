import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import type { RegistryItemFull, ProjectConfig } from "@react-rewrite/shared";
import {
  writeComponentFiles,
  detectExistingComponents,
  detectConflict,
} from "../registry/component-writer.js";

const BUTTON_CONTENT =
  'import { cva } from "class-variance-authority";\n\nexport function Button() { return <button />; }';

function makeButton(): RegistryItemFull {
  return {
    name: "button",
    displayName: "Button",
    description: "A button component",
    category: "ui",
    type: "component",
    dependencies: ["class-variance-authority"],
    registryDependencies: [],
    files: [
      {
        path: "registry/new-york/ui/button.tsx",
        content: BUTTON_CONTENT,
        type: "registry:ui",
      },
    ],
  };
}

function makeConfig(tmpDir: string): ProjectConfig {
  return {
    projectRoot: tmpDir,
    componentDir: path.join(tmpDir, "src/components/ui"),
    isTypeScript: true,
    pathAlias: "@/",
    packageManager: "pnpm",
  };
}

describe("component-writer", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "component-writer-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("writeComponentFiles writes the file to the correct path and returns correct importPath and exportNames", () => {
    const config = makeConfig(tmpDir);
    const item = makeButton();

    const results = writeComponentFiles(item, config);

    expect(results).toHaveLength(1);
    const [result] = results;

    // File should exist at the target path
    const expectedPath = path.join(config.componentDir, "button.tsx");
    expect(fs.existsSync(expectedPath)).toBe(true);
    expect(result.sourcePath).toBe(expectedPath);

    // Content should match
    const written = fs.readFileSync(expectedPath, "utf-8");
    expect(written).toBe(BUTTON_CONTENT);

    // Import path should use path alias
    expect(result.importPath).toBe("@/src/components/ui/button");

    // Export names should include Button
    expect(result.exportNames).toContain("Button");
  });

  it("writeComponentFiles skips writing if file already exists (does not overwrite)", () => {
    const config = makeConfig(tmpDir);
    const item = makeButton();

    // Pre-create the file with custom content
    fs.mkdirSync(config.componentDir, { recursive: true });
    const targetPath = path.join(config.componentDir, "button.tsx");
    const customContent = "// my custom button";
    fs.writeFileSync(targetPath, customContent, "utf-8");

    writeComponentFiles(item, config);

    // File should still have the custom content
    const content = fs.readFileSync(targetPath, "utf-8");
    expect(content).toBe(customContent);
  });

  it("writeComponentFiles builds correct import path without path alias", () => {
    const config: ProjectConfig = {
      projectRoot: tmpDir,
      componentDir: path.join(tmpDir, "src/components/ui"),
      isTypeScript: true,
      pathAlias: null,
      packageManager: "pnpm",
    };
    const item = makeButton();

    const results = writeComponentFiles(item, config);

    expect(results).toHaveLength(1);
    // Without alias, should be a relative path
    expect(results[0].importPath).toBe("./src/components/ui/button");
  });

  it("detectExistingComponents finds installed component files", () => {
    const config = makeConfig(tmpDir);
    fs.mkdirSync(config.componentDir, { recursive: true });
    fs.writeFileSync(path.join(config.componentDir, "button.tsx"), BUTTON_CONTENT);
    fs.writeFileSync(path.join(config.componentDir, "card.tsx"), "export function Card() {}");

    const existing = detectExistingComponents(config);

    expect(existing).toContain("button");
    expect(existing).toContain("card");
    expect(existing).toHaveLength(2);
  });

  it("detectConflict returns 'none' for missing file", () => {
    const config = makeConfig(tmpDir);
    const result = detectConflict(config, "button", BUTTON_CONTENT);
    expect(result).toBe("none");
  });

  it("detectConflict returns 'unmodified' for matching content", () => {
    const config = makeConfig(tmpDir);
    fs.mkdirSync(config.componentDir, { recursive: true });
    fs.writeFileSync(path.join(config.componentDir, "button.tsx"), BUTTON_CONTENT);

    const result = detectConflict(config, "button", BUTTON_CONTENT);
    expect(result).toBe("unmodified");
  });

  it("detectConflict returns 'modified' for changed content", () => {
    const config = makeConfig(tmpDir);
    fs.mkdirSync(config.componentDir, { recursive: true });
    fs.writeFileSync(path.join(config.componentDir, "button.tsx"), "// modified by user");

    const result = detectConflict(config, "button", BUTTON_CONTENT);
    expect(result).toBe("modified");
  });
});
