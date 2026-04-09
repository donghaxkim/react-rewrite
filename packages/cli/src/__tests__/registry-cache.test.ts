import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import type { RegistryItem, RegistryItemFull } from "@react-rewrite/shared";
import {
  getCacheDir,
  writeCachedIndex,
  readCachedIndex,
  writeCachedItem,
  readCachedItem,
  isCacheStale,
} from "../registry/registry-cache.js";

describe("registry-cache", () => {
  let tmpDir: string;
  let cacheDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "registry-cache-test-"));
    cacheDir = getCacheDir(tmpDir);
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("write and read a cached item roundtrip", () => {
    const item: RegistryItemFull = {
      name: "button",
      displayName: "Button",
      description: "A simple button component",
      category: "ui",
      type: "component",
      dependencies: ["class-variance-authority"],
      registryDependencies: [],
      files: [
        {
          path: "components/ui/button.tsx",
          content: "export function Button() { return <button />; }",
          type: "registry:ui",
        },
      ],
    };

    writeCachedItem(cacheDir, "component", item);
    const result = readCachedItem(cacheDir, "component", "button");

    expect(result).not.toBeNull();
    expect(result).toEqual(item);
  });

  it("returns null for missing cache entry", () => {
    const result = readCachedItem(cacheDir, "component", "nonexistent");
    expect(result).toBeNull();
  });

  it("write and read the registry index roundtrip", () => {
    const items: RegistryItem[] = [
      {
        name: "button",
        displayName: "Button",
        description: "A button",
        category: "ui",
        type: "component",
        dependencies: [],
        registryDependencies: [],
      },
      {
        name: "card",
        displayName: "Card",
        description: "A card",
        category: "ui",
        type: "component",
        dependencies: [],
        registryDependencies: [],
      },
    ];

    writeCachedIndex(cacheDir, items);
    const result = readCachedIndex(cacheDir);

    expect(result).not.toBeNull();
    expect(result).toEqual(items);
  });

  it("returns null for missing index", () => {
    const result = readCachedIndex(cacheDir);
    expect(result).toBeNull();
  });

  it("detects stale cache (older than 24h) by backdating the file mtime", () => {
    // Write a fresh index first
    writeCachedIndex(cacheDir, []);

    const indexPath = path.join(cacheDir, "registry-index.json");

    // Backdate the mtime by 25 hours
    const twentyFiveHoursAgo = new Date(Date.now() - 25 * 60 * 60 * 1000);
    fs.utimesSync(indexPath, twentyFiveHoursAgo, twentyFiveHoursAgo);

    expect(isCacheStale(cacheDir)).toBe(true);
  });

  it("detects fresh cache (less than 24h old)", () => {
    // Write a fresh index — mtime will be now
    writeCachedIndex(cacheDir, []);

    expect(isCacheStale(cacheDir)).toBe(false);
  });

  it("reports stale when cache dir does not exist", () => {
    expect(isCacheStale(cacheDir)).toBe(true);
  });

  it("writes block items to the blocks subdirectory", () => {
    const item: RegistryItemFull = {
      name: "hero",
      displayName: "Hero",
      description: "A hero block",
      category: "blocks",
      type: "block",
      dependencies: [],
      registryDependencies: [],
      files: [
        {
          path: "components/blocks/hero.tsx",
          content: "export function Hero() { return <section />; }",
          type: "registry:block",
        },
      ],
    };

    writeCachedItem(cacheDir, "block", item);
    const result = readCachedItem(cacheDir, "block", "hero");

    expect(result).not.toBeNull();
    expect(result).toEqual(item);

    // Verify it's in the blocks subdir, not components
    const blockPath = path.join(cacheDir, "blocks", "hero.json");
    const componentPath = path.join(cacheDir, "components", "hero.json");
    expect(fs.existsSync(blockPath)).toBe(true);
    expect(fs.existsSync(componentPath)).toBe(false);
  });
});
