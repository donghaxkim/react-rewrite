import * as fs from "node:fs";
import * as path from "node:path";
import type { RegistryItemFull, ProjectConfig, WrittenFile } from "@react-rewrite/shared";

function extractFilename(registryPath: string): string {
  return path.basename(registryPath);
}

function extractExportNames(content: string): string[] {
  const names: string[] = [];
  const patterns = [
    /export\s+function\s+(\w+)/g,
    /export\s+const\s+(\w+)/g,
    /export\s+\{([^}]+)\}/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      if (pattern === patterns[2]) {
        match[1].split(",").forEach((n) => {
          const name = n.trim().split(/\s+as\s+/).pop()!.trim();
          if (name) names.push(name);
        });
      } else {
        names.push(match[1]);
      }
    }
  }
  return names;
}

function buildImportPath(config: ProjectConfig, filename: string): string {
  const nameNoExt = filename.replace(/\.(tsx?|jsx?)$/, "");
  if (config.pathAlias) {
    const relFromRoot = path.relative(config.projectRoot, config.componentDir);
    return `${config.pathAlias}${relFromRoot}/${nameNoExt}`.replace(/\\/g, "/");
  }
  const relFromRoot = path.relative(config.projectRoot, config.componentDir);
  return `./${relFromRoot}/${nameNoExt}`.replace(/\\/g, "/");
}

export function writeComponentFiles(item: RegistryItemFull, config: ProjectConfig): WrittenFile[] {
  const results: WrittenFile[] = [];
  fs.mkdirSync(config.componentDir, { recursive: true });
  for (const file of item.files) {
    const filename = extractFilename(file.path);
    const targetPath = path.join(config.componentDir, filename);
    const importPath = buildImportPath(config, filename);
    const exportNames = extractExportNames(file.content);
    if (!fs.existsSync(targetPath)) {
      fs.writeFileSync(targetPath, file.content, "utf-8");
    }
    results.push({ sourcePath: targetPath, importPath, exportNames });
  }
  return results;
}

export function detectExistingComponents(config: ProjectConfig): string[] {
  if (!fs.existsSync(config.componentDir)) return [];
  return fs
    .readdirSync(config.componentDir)
    .filter((f) => /\.(tsx?|jsx?)$/.test(f))
    .map((f) => f.replace(/\.(tsx?|jsx?)$/, ""));
}

export function detectConflict(
  config: ProjectConfig,
  name: string,
  knownContent: string,
): "none" | "unmodified" | "modified" {
  const targetPath = path.join(config.componentDir, `${name}.tsx`);
  if (!fs.existsSync(targetPath)) return "none";
  const existing = fs.readFileSync(targetPath, "utf-8");
  return existing === knownContent ? "unmodified" : "modified";
}
