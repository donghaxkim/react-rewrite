import * as fs from "node:fs";
import * as path from "node:path";
import { spawnSync } from "node:child_process";
import type { ProjectConfig } from "@react-rewrite/shared";

function readProjectPackageJson(projectRoot: string): any | null {
  const packageJsonPath = path.join(projectRoot, "package.json");
  if (!fs.existsSync(packageJsonPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
  } catch {
    return null;
  }
}

function getPackageNameFromSpec(spec: string): string {
  if (spec.startsWith("@")) {
    const match = spec.match(/^(@[^/]+\/[^@/]+)/);
    return match?.[1] ?? spec;
  }
  const match = spec.match(/^([^@/]+)/);
  return match?.[1] ?? spec;
}

function getInstalledPackageNames(projectRoot: string): Set<string> {
  const pkg = readProjectPackageJson(projectRoot);
  if (!pkg) return new Set();

  return new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    ...Object.keys(pkg.optionalDependencies ?? {}),
  ]);
}

function buildInstallCommand(
  packageManager: ProjectConfig["packageManager"],
  packages: string[],
): { command: string; args: string[] } {
  switch (packageManager) {
    case "pnpm":
      return { command: "pnpm", args: ["add", ...packages] };
    case "yarn":
      return { command: "yarn", args: ["add", ...packages] };
    case "npm":
    default:
      return { command: "npm", args: ["install", ...packages] };
  }
}

export function installMissingDependencies(
  config: ProjectConfig,
  packageSpecs: string[],
): { installed: string[]; skipped: string[] } {
  const installedPackageNames = getInstalledPackageNames(config.projectRoot);
  const dedupedSpecs = new Map<string, string>();

  for (const spec of packageSpecs) {
    const packageName = getPackageNameFromSpec(spec);
    if (!packageName) continue;
    if (packageName === "react" || packageName === "react-dom") continue;
    if (!dedupedSpecs.has(packageName)) {
      dedupedSpecs.set(packageName, spec);
    }
  }

  const missing = Array.from(dedupedSpecs.entries())
    .filter(([packageName]) => !installedPackageNames.has(packageName))
    .map(([, spec]) => spec);

  if (missing.length === 0) {
    return { installed: [], skipped: Array.from(dedupedSpecs.values()) };
  }

  const { command, args } = buildInstallCommand(config.packageManager, missing);
  const result = spawnSync(command, args, {
    cwd: config.projectRoot,
    encoding: "utf-8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    const stderr = result.stderr?.trim();
    const stdout = result.stdout?.trim();
    throw new Error(
      `Failed to install component dependencies with \`${command} ${args.join(" ")}\`.\n${stderr || stdout || "Unknown install error"}`,
    );
  }

  return { installed: missing, skipped: [] };
}
