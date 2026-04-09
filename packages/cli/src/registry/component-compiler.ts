import * as fs from "node:fs";
import * as path from "node:path";
import * as esbuild from "esbuild";
import type { RegistryItemFull } from "@react-rewrite/shared";
import { logger } from "../logger.js";

/**
 * Directory where compiled component JS files are stored for serving via proxy.
 * These are browser-ready ES modules that can be dynamically imported.
 */
export function getCompiledDir(projectRoot: string): string {
  return path.join(projectRoot, ".react-rewrite", "compiled");
}

/**
 * Compiles a single shadcn component TSX source to a browser-ready JS module.
 * The output is a self-contained ES module that exports the component.
 *
 * Since shadcn components depend on @radix-ui, class-variance-authority, etc.,
 * we externalize React (expected to be on the page already) and bundle everything
 * else into the output.
 */
async function compileComponent(
  name: string,
  sourceCode: string,
  outputDir: string,
): Promise<boolean> {
  const inputPath = path.join(outputDir, `_src_${name}.tsx`);
  const outputPath = path.join(outputDir, `${name}.js`);

  try {
    // Write source to temp file for esbuild
    fs.writeFileSync(inputPath, sourceCode, "utf-8");

    await esbuild.build({
      entryPoints: [inputPath],
      outfile: outputPath,
      bundle: true,
      format: "esm",
      platform: "browser",
      target: "es2022",
      jsx: "automatic",
      // React is already on the page — externalize it so the component
      // uses the same React instance as the user's app
      external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
      // Suppress warnings about missing peer deps
      logLevel: "silent",
    });

    // Clean up temp source file
    try { fs.unlinkSync(inputPath); } catch {}

    return true;
  } catch (err) {
    // Clean up on failure
    try { fs.unlinkSync(inputPath); } catch {}
    logger.warn(`[Compiler] Failed to compile ${name}: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

/**
 * Compiles all cached registry items to browser-ready JS modules.
 * Called on startup after the registry prefetch completes.
 */
export async function compileAllComponents(
  items: RegistryItemFull[],
  projectRoot: string,
  onProgress?: (compiled: number, total: number) => void,
): Promise<{ compiled: number; failed: number }> {
  const outputDir = getCompiledDir(projectRoot);
  fs.mkdirSync(outputDir, { recursive: true });

  let compiled = 0;
  let failed = 0;

  // Only compile UI components (not blocks — blocks are multi-file compositions)
  const uiComponents = items.filter(
    (item) => item.type === "component" && item.files.length > 0,
  );

  // Compile in parallel batches of 10 to avoid overwhelming the system
  const batchSize = 10;
  for (let i = 0; i < uiComponents.length; i += batchSize) {
    const batch = uiComponents.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (item) => {
        // Use the first file (the main component file)
        const mainFile = item.files[0];
        if (!mainFile?.content) return false;
        return compileComponent(item.name, mainFile.content, outputDir);
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

  logger.info(`[Compiler] Compiled ${compiled}/${uiComponents.length} components (${failed} failed)`);
  return { compiled, failed };
}

/**
 * Check if a compiled component exists and return its file path.
 */
export function getCompiledComponentPath(
  projectRoot: string,
  name: string,
): string | null {
  const filePath = path.join(getCompiledDir(projectRoot), `${name}.js`);
  return fs.existsSync(filePath) ? filePath : null;
}
