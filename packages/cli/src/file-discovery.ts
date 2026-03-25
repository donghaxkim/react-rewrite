import * as fs from "node:fs";
import * as path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

/**
 * Discover which source file defines a React component by name.
 * Greps the project asynchronously (won't block the event loop),
 * ranks results by definition likelihood,
 * follows re-exports in barrel files.
 */
export async function discoverFile(
  componentName: string,
  projectRoot: string,
): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "grep",
      ["-rn", componentName, "--include=*.tsx", "--include=*.ts", "--include=*.jsx", "--include=*.js", "--exclude-dir=node_modules", "--exclude-dir=.next", "--exclude-dir=dist", "."],
      { cwd: projectRoot, timeout: 3000 },
    );
    const result = stdout.trim();

    if (!result) return null;

    const lines = result.split("\n").filter(Boolean);

    const DEFINITION_PATTERNS = [
      new RegExp(`function\\s+${componentName}\\b`),
      new RegExp(`const\\s+${componentName}\\s*[=:]`),
      new RegExp(`let\\s+${componentName}\\s*=`),
      new RegExp(`class\\s+${componentName}\\s`),
      new RegExp(`export\\s+default\\s+function\\s+${componentName}\\b`),
    ];
    const REEXPORT_PATTERN = new RegExp(
      `export\\s*\\{[^}]*${componentName}[^}]*\\}\\s*from`,
    );

    const definitions: string[] = [];
    const reexports: string[] = [];

    for (const line of lines) {
      const parts = line.split(":");
      let filePath = parts[0];
      if (filePath.startsWith("./")) filePath = filePath.slice(2);
      const content = parts.slice(2).join(":");

      if (DEFINITION_PATTERNS.some((p) => p.test(content))) {
        definitions.push(filePath);
      } else if (REEXPORT_PATTERN.test(content)) {
        reexports.push(filePath);
      }
    }

    const isBarrelFile = (f: string) =>
      /\/index\.(ts|tsx|js|jsx)$/.test(f) || /^index\.(ts|tsx|js|jsx)$/.test(f);

    const realDefinitions = definitions.filter((f) => !isBarrelFile(f));
    if (realDefinitions.length > 0) {
      return (
        realDefinitions.find((f) => f.startsWith("src/") || f.startsWith("app/")) ||
        realDefinitions[0]
      );
    }

    // Follow re-exports from barrel files
    const barrelSources = [
      ...reexports,
      ...definitions.filter(isBarrelFile),
    ];
    for (const barrel of barrelSources) {
      const resolved = followReexport(barrel, componentName, projectRoot);
      if (resolved) return resolved;
    }

    // Fallback: any non-barrel file mentioning the name
    const allFiles = [
      ...new Set(
        lines
          .map((l) => {
            const f = l.split(":")[0];
            return f.startsWith("./") ? f.slice(2) : f;
          })
          .filter((f) => !isBarrelFile(f) && !f.includes("node_modules")),
      ),
    ];
    if (allFiles.length > 0) {
      return (
        allFiles.find((f) => f.startsWith("src/") || f.startsWith("app/")) ||
        allFiles[0]
      );
    }
  } catch {
    // grep found nothing or failed
  }

  return null;
}

function followReexport(
  barrelFilePath: string,
  componentName: string,
  projectRoot: string,
): string | null {
  try {
    const fullPath = path.resolve(projectRoot, barrelFilePath);
    const content = fs.readFileSync(fullPath, "utf-8");
    const match = content.match(
      new RegExp(
        `export\\s*\\{[^}]*${componentName}[^}]*\\}\\s*from\\s*["']([^"']+)["']`,
      ),
    );
    if (!match) return null;

    const importPath = match[1];
    const barrelDir = path.dirname(fullPath);
    for (const ext of [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]) {
      const candidate = path.resolve(barrelDir, importPath + ext);
      if (fs.existsSync(candidate)) {
        return path.relative(projectRoot, candidate);
      }
    }
    const direct = path.resolve(barrelDir, importPath);
    if (fs.existsSync(direct)) {
      return path.relative(projectRoot, direct);
    }
  } catch {
    // barrel read failed
  }
  return null;
}
