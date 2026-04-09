import * as fs from "node:fs";
import * as path from "node:path";
import type { RegistryItem, RegistryItemFull } from "@react-rewrite/shared";

const STALE_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getCacheDir(projectRoot: string): string {
  return path.join(projectRoot, ".react-rewrite", "cache", "shadcn");
}

export function writeCachedIndex(cacheDir: string, items: RegistryItem[]): void {
  fs.mkdirSync(cacheDir, { recursive: true });
  fs.writeFileSync(path.join(cacheDir, "registry-index.json"), JSON.stringify(items, null, 2));
}

export function readCachedIndex(cacheDir: string): RegistryItem[] | null {
  const indexPath = path.join(cacheDir, "registry-index.json");
  if (!fs.existsSync(indexPath)) return null;
  return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
}

export function writeCachedItem(cacheDir: string, type: "component" | "block", item: RegistryItemFull): void {
  const dir = path.join(cacheDir, type === "component" ? "components" : "blocks");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${item.name}.json`), JSON.stringify(item, null, 2));
}

export function readCachedItem(cacheDir: string, type: "component" | "block", name: string): RegistryItemFull | null {
  const filePath = path.join(cacheDir, type === "component" ? "components" : "blocks", `${name}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function isCacheStale(cacheDir: string): boolean {
  const indexPath = path.join(cacheDir, "registry-index.json");
  if (!fs.existsSync(indexPath)) return true;
  const stat = fs.statSync(indexPath);
  return Date.now() - stat.mtimeMs > STALE_MS;
}
