import * as fs from "node:fs";
import * as path from "node:path";
import * as esbuild from "esbuild";
import type { RegistryItemFull } from "@react-rewrite/shared";
import { logger } from "../logger.js";

const SHADCN_BASE_URL = "https://ui.shadcn.com/r/styles/new-york";
const PREVIEW_DEMO_OVERRIDES: Record<string, string> = {
  chart: "chart-tooltip-demo",
};

const LOCAL_UTILS_SOURCE = `
import { clsx } from "https://esm.sh/clsx@2?dev"
import { twMerge } from "https://esm.sh/tailwind-merge@2?dev"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
`.trim();

/**
 * Directory where compiled preview modules are stored for serving via proxy.
 * These are browser-ready ES modules that import React and package dependencies
 * from esm.sh, while local shadcn modules are served from our own proxy.
 */
export function getCompiledDir(projectRoot: string): string {
  return path.join(projectRoot, ".react-rewrite", "compiled");
}

function getCompiledModulePath(projectRoot: string, logicalPath: string): string {
  return path.join(getCompiledDir(projectRoot), logicalPath);
}

function toBrowserModulePath(logicalPath: string): string {
  return `/__react-rewrite/modules/${logicalPath}`;
}

function toJavaScriptPath(logicalPath: string): string {
  return logicalPath.replace(/\.[mc]?[jt]sx?$/i, ".js");
}

function normalizeLogicalPath(filePath: string): string {
  return filePath.replace(/\\/g, "/").replace(/^\/+/, "");
}

function isBareSpecifier(specifier: string): boolean {
  return !specifier.startsWith(".") && !specifier.startsWith("/") && !specifier.startsWith("@/");
}

function toCdnSpecifier(specifier: string): string {
  if (specifier === "react") return "https://esm.sh/react@18?dev";
  if (specifier === "react-dom") return "https://esm.sh/react-dom@18?dev";
  if (specifier === "react-dom/client") return "https://esm.sh/react-dom@18/client?dev";
  if (specifier === "react/jsx-runtime") return "https://esm.sh/react@18/jsx-runtime?dev";
  if (specifier === "react/jsx-dev-runtime") return "https://esm.sh/react@18/jsx-dev-runtime?dev";
  return `https://esm.sh/${specifier}?dev`;
}

function resolveLocalSpecifier(specifier: string, currentLogicalPath: string): string | null {
  if (specifier === "@/lib/utils" || specifier === "@/registry/new-york/lib/utils") {
    return toBrowserModulePath("lib/utils.js");
  }

  if (specifier.startsWith("@/registry/new-york/")) {
    const logicalPath = normalizeLogicalPath(specifier.replace("@/registry/new-york/", "")) + ".js";
    return toBrowserModulePath(logicalPath.replace(/\.tsx?\.js$/i, ".js"));
  }

  if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const fromDir = path.posix.dirname(currentLogicalPath);
    const resolved = normalizeLogicalPath(path.posix.join(fromDir, specifier));

    if (resolved === "lib/utils" || resolved === "lib/utils.ts" || resolved === "lib/utils.tsx") {
      return toBrowserModulePath("lib/utils.js");
    }

    if (resolved.startsWith("ui/") || resolved.startsWith("examples/") || resolved.startsWith("lib/")) {
      return toBrowserModulePath(toJavaScriptPath(resolved));
    }
  }

  return null;
}

function rewriteImportSpecifiers(code: string, currentLogicalPath: string): string {
  const replace = (specifier: string): string => {
    const local = resolveLocalSpecifier(specifier, currentLogicalPath);
    if (local) return local;
    if (isBareSpecifier(specifier)) return toCdnSpecifier(specifier);
    return specifier;
  };

  return code
    .replace(/(\bfrom\s+["'])([^"']+)(["'])/g, (_match, prefix, specifier, suffix) => {
      return `${prefix}${replace(specifier)}${suffix}`;
    })
    .replace(/(\bimport\s+["'])([^"']+)(["'])/g, (_match, prefix, specifier, suffix) => {
      return `${prefix}${replace(specifier)}${suffix}`;
    })
    .replace(/(\bimport\s*\(\s*["'])([^"']+)(["']\s*\))/g, (_match, prefix, specifier, suffix) => {
      return `${prefix}${replace(specifier)}${suffix}`;
    });
}

async function transformModule(sourceCode: string, logicalPath: string): Promise<string> {
  const ext = path.extname(logicalPath).toLowerCase();
  const loader: esbuild.Loader = ext === ".ts" ? "ts" : ext === ".js" ? "js" : ext === ".jsx" ? "jsx" : "tsx";
  const { code } = await esbuild.transform(sourceCode, {
    loader,
    format: "esm",
    target: "es2022",
    jsx: "automatic",
    sourcemap: false,
  });
  return rewriteImportSpecifiers(code, normalizeLogicalPath(logicalPath));
}

function writeModule(projectRoot: string, logicalPath: string, code: string): void {
  const outputPath = getCompiledModulePath(projectRoot, toJavaScriptPath(normalizeLogicalPath(logicalPath)));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, code, "utf-8");
}

async function compileRegistryFiles(
  item: RegistryItemFull,
  projectRoot: string,
): Promise<boolean> {
  try {
    for (const file of item.files) {
      if (!file.content) continue;
      const logicalPath = normalizeLogicalPath(file.path);
      const code = await transformModule(file.content, logicalPath);
      writeModule(projectRoot, logicalPath, code);
    }
    return true;
  } catch (err) {
    logger.warn(
      `[Compiler] Failed to transform ${item.name}: ${err instanceof Error ? err.message : String(err)}`,
    );
    return false;
  }
}

async function fetchPreviewDemoSource(componentName: string): Promise<{ logicalPath: string; sourceCode: string } | null> {
  const demoName = PREVIEW_DEMO_OVERRIDES[componentName] ?? `${componentName}-demo`;
  const res = await fetch(`${SHADCN_BASE_URL}/${demoName}.json`);
  if (!res.ok) return null;

  const data = await res.json();
  const firstFile = data.files?.[0];
  if (!firstFile?.content || !firstFile.path) return null;

  return {
    logicalPath: normalizeLogicalPath(firstFile.path),
    sourceCode: firstFile.content,
  };
}

async function compilePreviewDemo(
  componentName: string,
  projectRoot: string,
): Promise<boolean> {
  try {
    const demo = await fetchPreviewDemoSource(componentName);
    if (!demo) return false;
    const code = await transformModule(demo.sourceCode, demo.logicalPath);
    writeModule(projectRoot, demo.logicalPath, code);
    return true;
  } catch (err) {
    logger.warn(
      `[Compiler] Failed to compile preview for ${componentName}: ${err instanceof Error ? err.message : String(err)}`,
    );
    return false;
  }
}

function writeUtilityModules(projectRoot: string): void {
  writeModule(projectRoot, "lib/utils.ts", LOCAL_UTILS_SOURCE);
}

/**
 * Compiles cached shadcn UI modules and their official demo examples into
 * browser-loadable ES modules for palette previews.
 */
export async function compileAllComponents(
  items: RegistryItemFull[],
  projectRoot: string,
  onProgress?: (compiled: number, total: number) => void,
): Promise<{ compiled: number; failed: number }> {
  const outputDir = getCompiledDir(projectRoot);
  fs.mkdirSync(outputDir, { recursive: true });
  writeUtilityModules(projectRoot);

  const uiComponents = items.filter(
    (item) => item.type === "component" && item.files.length > 0,
  );

  let compiled = 0;
  let failed = 0;

  const batchSize = 8;
  for (let i = 0; i < uiComponents.length; i += batchSize) {
    const batch = uiComponents.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (item) => {
        const componentOk = await compileRegistryFiles(item, projectRoot);
        const previewOk = await compilePreviewDemo(item.name, projectRoot);
        return componentOk || previewOk;
      }),
    );

    for (const result of results) {
      if (result.status === "fulfilled" && result.value) {
        compiled++;
      } else {
        failed++;
      }
      onProgress?.(compiled + failed, uiComponents.length);
    }
  }

  logger.info(
    `[Compiler] Prepared ${compiled}/${uiComponents.length} preview module sets (${failed} failed)`,
  );
  return { compiled, failed };
}

/**
 * Check if a compiled preview module exists and return its file path.
 */
export function getCompiledComponentPath(
  projectRoot: string,
  name: string,
): string | null {
  const filePath = getCompiledModulePath(projectRoot, normalizeLogicalPath(name));
  return fs.existsSync(filePath) ? filePath : null;
}
