import * as fs from "node:fs";
import * as path from "node:path";
import jscodeshift from "jscodeshift";
import type { BatchOperation, ProjectConfig, RegistryItemFull } from "@react-rewrite/shared";
import { ShadcnProvider } from "./shadcn-provider.js";
import { resolveProjectFilePath } from "../path-resolver.js";

const SHADCN_BASE_URL = "https://ui.shadcn.com/r/styles/new-york";
const PREVIEW_DEMO_OVERRIDES: Record<string, string> = {
  chart: "chart-tooltip-demo",
};

const GENERATED_UTILS_SOURCE = `
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`.trim();

const FALLBACK_WRAPPERS: Record<string, string> = {
  form: `
"use client"

import { Button } from "@/registry/new-york/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Input } from "@/registry/new-york/ui/input"
import { useForm } from "react-hook-form"

export default function Component() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  })

  return (
    <Form {...form}>
      <form className="w-full max-w-sm space-y-4 rounded-xl border p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ada Lovelace" {...field} />
              </FormControl>
              <FormDescription>Use your full name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
`.trim(),
};

type InsertComponentOp = Extract<BatchOperation, { op: "insertComponent" }>;

interface PreparationContext {
  config: ProjectConfig;
  projectRoot: string;
  sourceRoot: string;
  generatedRoot: string;
  shadcnProvider: ShadcnProvider;
  registryItemCache: Map<string, RegistryItemFull>;
  materializedRegistryItems: Set<string>;
  packageSpecByName: Map<string, string>;
}

export interface PreparedInsertBatch {
  operations: BatchOperation[];
  packageSpecs: string[];
}

function toPascalCase(value: string): string {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, "/");
}

function getSourceRoot(config: ProjectConfig): string {
  const srcDir = path.join(config.projectRoot, "src");
  return fs.existsSync(srcDir) ? srcDir : config.projectRoot;
}

function getGeneratedRoot(config: ProjectConfig): string {
  return path.join(getSourceRoot(config), "components", "react-rewrite");
}

function stripExtension(filePath: string): string {
  return filePath.replace(/\.[mc]?[jt]sx?$/i, "");
}

function ensureDirectory(filePath: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeIfChanged(filePath: string, content: string): void {
  ensureDirectory(filePath);
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, "utf-8");
    if (existing === content) return;
  }
  fs.writeFileSync(filePath, content, "utf-8");
}

function getImportSpecifier(fromFile: string, toFile: string, ctx: PreparationContext): string {
  const normalizedTo = normalizePath(stripExtension(toFile));
  const sourceRoot = normalizePath(ctx.sourceRoot);
  if (ctx.config.pathAlias && normalizedTo.startsWith(sourceRoot)) {
    const relFromSourceRoot = normalizePath(path.relative(ctx.sourceRoot, stripExtension(toFile)));
    return `${ctx.config.pathAlias}${relFromSourceRoot}`.replace(/\/+/g, "/");
  }

  let rel = normalizePath(path.relative(path.dirname(fromFile), stripExtension(toFile)));
  if (!rel.startsWith(".")) rel = `./${rel}`;
  return rel;
}

function resolveTargetSourceFile(
  incomingFile: string,
  ctx: PreparationContext,
): string {
  const resolved = resolveProjectFilePath(incomingFile, ctx.projectRoot);
  if (resolved) return resolved;
  return path.resolve(ctx.projectRoot, incomingFile);
}

function getGeneratedUtilsFile(ctx: PreparationContext): string {
  return path.join(ctx.generatedRoot, "internal", "utils.ts");
}

function getPackageNameFromSpec(spec: string): string {
  if (spec.startsWith("@")) {
    const match = spec.match(/^(@[^/]+\/[^@/]+)/);
    return match?.[1] ?? spec;
  }
  const match = spec.match(/^([^@/]+)/);
  return match?.[1] ?? spec;
}

function getPackageNameFromSpecifier(specifier: string): string | null {
  if (!specifier) return null;
  if (
    specifier.startsWith(".") ||
    specifier.startsWith("/") ||
    specifier.startsWith("@/") ||
    specifier.startsWith("http://") ||
    specifier.startsWith("https://")
  ) {
    return null;
  }

  if (specifier.startsWith("@")) {
    const parts = specifier.split("/");
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  }

  return specifier.split("/")[0] || null;
}

function rememberPackageSpec(spec: string, ctx: PreparationContext): void {
  const normalized = spec.trim();
  if (!normalized) return;
  ctx.packageSpecByName.set(getPackageNameFromSpec(normalized), normalized);
}

function trackDependencyImports(source: string, ctx: PreparationContext): void {
  const patterns = [
    /\bfrom\s+["']([^"']+)["']/g,
    /\bimport\s+["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(source)) !== null) {
      const packageName = getPackageNameFromSpecifier(match[1]);
      if (!packageName) continue;
      if (!ctx.packageSpecByName.has(packageName)) {
        ctx.packageSpecByName.set(packageName, packageName);
      }
    }
  }
}

function ensureGeneratedUtils(ctx: PreparationContext): string {
  const utilsFile = getGeneratedUtilsFile(ctx);
  writeIfChanged(utilsFile, GENERATED_UTILS_SOURCE);
  rememberPackageSpec("clsx", ctx);
  rememberPackageSpec("tailwind-merge", ctx);
  return utilsFile;
}

function resolveProjectTargetForRegistryFile(registryPath: string, ctx: PreparationContext): string {
  const normalized = normalizePath(registryPath);
  if (normalized.startsWith("ui/")) {
    return path.join(ctx.config.componentDir, path.basename(normalized));
  }
  if (normalized.startsWith("hooks/")) {
    return path.join(ctx.sourceRoot, "hooks", normalized.slice("hooks/".length));
  }
  if (normalized.startsWith("lib/")) {
    return path.join(ctx.sourceRoot, "lib", normalized.slice("lib/".length));
  }
  return path.join(ctx.generatedRoot, "internal", normalized);
}

async function fetchRegistryItem(
  name: string,
  ctx: PreparationContext,
): Promise<RegistryItemFull | null> {
  const cached = ctx.registryItemCache.get(name);
  if (cached) return cached;

  try {
    const item = await ctx.shadcnProvider.fetchItem(name);
    ctx.registryItemCache.set(name, item);
    return item;
  } catch {
    return null;
  }
}

async function fetchDemoSource(name: string): Promise<string | null> {
  const demoName = PREVIEW_DEMO_OVERRIDES[name] ?? `${name}-demo`;
  const res = await fetch(`${SHADCN_BASE_URL}/${demoName}.json`);
  if (!res.ok) return null;
  const data = await res.json();
  const firstFile = data.files?.[0];
  if (!firstFile?.content) return null;
  return firstFile.content as string;
}

function rewriteProjectAliasSpecifier(
  specifier: string,
  currentFile: string,
  ctx: PreparationContext,
): string | null {
  if (!specifier.startsWith("@/")) return null;

  const sourceRoot = ctx.sourceRoot;
  const abs = path.join(sourceRoot, specifier.slice(2));
  return getImportSpecifier(currentFile, abs, ctx);
}

async function rewriteImports(
  source: string,
  currentFile: string,
  ctx: PreparationContext,
  selfBlockRoot?: string,
  selfBlockPrefix?: string,
): Promise<string> {
  const j = jscodeshift.withParser("tsx");
  const root = j(source);

  const replacements = new Map<string, string>();

  const resolveSpecifier = async (specifier: string): Promise<string> => {
    if (replacements.has(specifier)) return replacements.get(specifier)!;

    let rewritten = specifier;

    if (specifier.startsWith("@/registry/new-york/ui/")) {
      const depName = path.basename(specifier);
      const depItem = await fetchRegistryItem(depName, ctx);
      if (depItem) await ensureRegistryItemMaterialized(depItem, ctx);
      const targetPath = path.join(ctx.config.componentDir, `${depName}.${ctx.config.isTypeScript ? "tsx" : "jsx"}`);
      rewritten = getImportSpecifier(currentFile, targetPath, ctx);
    } else if (specifier.startsWith("@/registry/new-york/blocks/")) {
      const localBlockPath = selfBlockPrefix && specifier.startsWith(selfBlockPrefix)
        ? specifier.slice(selfBlockPrefix.length)
        : specifier.replace("@/registry/new-york/blocks/", "");
      if (selfBlockRoot && localBlockPath) {
        rewritten = getImportSpecifier(currentFile, path.join(selfBlockRoot, localBlockPath), ctx);
      }
    } else if (specifier === "@/registry/new-york/lib/utils" || specifier === "@/lib/utils") {
      const projectUtilsTs = path.join(ctx.sourceRoot, "lib", "utils.ts");
      const projectUtilsJs = path.join(ctx.sourceRoot, "lib", "utils.js");
      const projectUtilsTsx = path.join(ctx.sourceRoot, "lib", "utils.tsx");
      const projectUtilsJsx = path.join(ctx.sourceRoot, "lib", "utils.jsx");
      const projectUtils =
        [projectUtilsTs, projectUtilsTsx, projectUtilsJs, projectUtilsJsx].find((candidate) => fs.existsSync(candidate))
        ?? ensureGeneratedUtils(ctx);
      rewritten = getImportSpecifier(currentFile, projectUtils, ctx);
    } else {
      const aliased = rewriteProjectAliasSpecifier(specifier, currentFile, ctx);
      if (aliased) rewritten = aliased;
    }

    replacements.set(specifier, rewritten);
    return rewritten;
  };

  const importDecls = root.find(j.ImportDeclaration);
  for (const p of importDecls.paths()) {
    const sourceNode = p.node.source;
    const value = typeof sourceNode.value === "string" ? sourceNode.value : null;
    if (!value) continue;
    const rewritten = await resolveSpecifier(value);
    if (rewritten !== value) {
      p.node.source = j.literal(rewritten);
    }
  }

  const exportDecls = root.find(j.ExportNamedDeclaration);
  for (const p of exportDecls.paths()) {
    const sourceNode = p.node.source;
    const value = sourceNode && typeof sourceNode.value === "string" ? sourceNode.value : null;
    if (!value) continue;
    const rewritten = await resolveSpecifier(value);
    if (rewritten !== value) {
      p.node.source = j.literal(rewritten);
    }
  }

  return root.toSource({ quote: "double" });
}

async function ensureRegistryItemMaterialized(
  item: RegistryItemFull,
  ctx: PreparationContext,
): Promise<void> {
  if (ctx.materializedRegistryItems.has(item.name)) return;
  ctx.materializedRegistryItems.add(item.name);

  for (const dependency of item.dependencies ?? []) {
    rememberPackageSpec(dependency, ctx);
  }

  for (const dep of item.registryDependencies ?? []) {
    const depItem = await fetchRegistryItem(dep, ctx);
    if (depItem) {
      await ensureRegistryItemMaterialized(depItem, ctx);
    }
  }

  for (const file of item.files) {
    const targetPath = resolveProjectTargetForRegistryFile(file.path, ctx);
    const rewritten = await rewriteImports(file.content, targetPath, ctx);
    writeIfChanged(targetPath, rewritten);
    trackDependencyImports(rewritten, ctx);
  }
}

function buildWrapperName(name: string): string {
  return `ReactRewrite${toPascalCase(name)}`;
}

function buildWrapperComponentSource(wrapperName: string, innerImportPath: string): string {
  return `
"use client"

import Component from "${innerImportPath}"

export function ${wrapperName}() {
  return <Component />
}
`.trim();
}

async function materializeDemoWrapper(
  registryName: string,
  demoSource: string,
  ctx: PreparationContext,
): Promise<{ wrapperName: string; wrapperFile: string }> {
  const wrapperName = buildWrapperName(registryName);
  const innerFile = path.join(ctx.generatedRoot, "internal", `${registryName}.tsx`);
  const wrapperFile = path.join(ctx.generatedRoot, `${registryName}.tsx`);

  const rewrittenDemo = await rewriteImports(demoSource, innerFile, ctx);
  writeIfChanged(innerFile, rewrittenDemo);
  trackDependencyImports(rewrittenDemo, ctx);

  const innerImport = getImportSpecifier(wrapperFile, innerFile, ctx);
  const wrapperSource = buildWrapperComponentSource(wrapperName, innerImport);
  writeIfChanged(wrapperFile, wrapperSource);
  trackDependencyImports(wrapperSource, ctx);

  return { wrapperName, wrapperFile };
}

async function materializeBlockWrapper(
  item: RegistryItemFull,
  ctx: PreparationContext,
): Promise<{ wrapperName: string; wrapperFile: string }> {
  const wrapperName = buildWrapperName(item.name);
  const blockRoot = path.join(ctx.generatedRoot, "internal", "blocks", item.name);
  let pageFile: string | null = null;

  for (const dep of item.registryDependencies ?? []) {
    const depItem = await fetchRegistryItem(dep, ctx);
    if (depItem) {
      await ensureRegistryItemMaterialized(depItem, ctx);
    }
  }

  for (const file of item.files) {
    const normalized = normalizePath(file.path);
    const prefix = `blocks/${item.name}/`;
    const relative = normalized.startsWith(prefix) ? normalized.slice(prefix.length) : path.basename(normalized);
    const targetPath = path.join(blockRoot, relative);
    const rewritten = await rewriteImports(
      file.content,
      targetPath,
      ctx,
      blockRoot,
      `@/registry/new-york/blocks/${item.name}/`,
    );
    writeIfChanged(targetPath, rewritten);
    trackDependencyImports(rewritten, ctx);
    if (relative === "page.tsx" || relative === "page.jsx" || relative === "index.tsx" || relative === "index.jsx") {
      pageFile = targetPath;
    }
  }

  if (!pageFile && item.files[0]) {
    const normalized = normalizePath(item.files[0].path);
    const prefix = `blocks/${item.name}/`;
    const relative = normalized.startsWith(prefix) ? normalized.slice(prefix.length) : path.basename(normalized);
    pageFile = path.join(blockRoot, relative);
  }

  if (!pageFile) {
    throw new Error(`No entry file found for block ${item.name}`);
  }

  const wrapperFile = path.join(ctx.generatedRoot, `${item.name}.tsx`);
  const innerImport = getImportSpecifier(wrapperFile, pageFile, ctx);
  const wrapperSource = buildWrapperComponentSource(wrapperName, innerImport);
  writeIfChanged(wrapperFile, wrapperSource);
  trackDependencyImports(wrapperSource, ctx);

  return { wrapperName, wrapperFile };
}

async function materializeFallbackWrapper(
  registryName: string,
  ctx: PreparationContext,
): Promise<{ wrapperName: string; wrapperFile: string }> {
  const source = FALLBACK_WRAPPERS[registryName];
  if (!source) {
    throw new Error(`No insert recipe available for ${registryName}`);
  }

  const wrapperName = buildWrapperName(registryName);
  const wrapperFile = path.join(ctx.generatedRoot, `${registryName}.tsx`);
  const rewritten = await rewriteImports(source, wrapperFile, ctx);
  const named = rewritten.replace(/export default function\s+([A-Za-z0-9_]+)\s*\(/, `export function ${wrapperName}(`);
  writeIfChanged(wrapperFile, named);
  trackDependencyImports(named, ctx);
  return { wrapperName, wrapperFile };
}

async function prepareWrapperForInsert(
  registryName: string,
  ctx: PreparationContext,
): Promise<{ wrapperName: string; wrapperFile: string }> {
  const item = await fetchRegistryItem(registryName, ctx);
  if (item && item.type === "block") {
    return materializeBlockWrapper(item, ctx);
  }

  if (item) {
    await ensureRegistryItemMaterialized(item, ctx);
  }

  const demoSource = await fetchDemoSource(registryName);
  if (demoSource) {
    return materializeDemoWrapper(registryName, demoSource, ctx);
  }

  return materializeFallbackWrapper(registryName, ctx);
}

export async function prepareInsertOperations(
  operations: BatchOperation[],
  projectRoot: string,
  config: ProjectConfig,
  registryItemCache: Map<string, RegistryItemFull>,
): Promise<PreparedInsertBatch> {
  const sourceRoot = getSourceRoot(config);
  const generatedRoot = getGeneratedRoot(config);
  fs.mkdirSync(generatedRoot, { recursive: true });

  const ctx: PreparationContext = {
    config,
    projectRoot,
    sourceRoot,
    generatedRoot,
    shadcnProvider: new ShadcnProvider(),
    registryItemCache,
    materializedRegistryItems: new Set(),
    packageSpecByName: new Map(),
  };

  const prepared: BatchOperation[] = [];

  for (const operation of operations) {
    if (operation.op !== "insertComponent") {
      prepared.push(operation);
      continue;
    }

    const targetFile = resolveTargetSourceFile(operation.file, ctx);
    const { wrapperName, wrapperFile } = await prepareWrapperForInsert(operation.registryName, ctx);
    const importPath = getImportSpecifier(targetFile, wrapperFile, ctx);

    prepared.push({
      ...operation,
      componentName: wrapperName,
      importPath,
      importNames: [wrapperName],
      jsxString: `<${wrapperName} />`,
    });
  }

  return {
    operations: prepared,
    packageSpecs: Array.from(ctx.packageSpecByName.values()),
  };
}
