const CACHE_TTL_MS = 30_000; // 30 seconds

interface CacheEntry {
  filePath: string | null;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

/** Returns filePath if cached and fresh, null if cached as not-found, undefined if not looked up. */
export function getCachedFilePath(componentName: string): string | null | undefined {
  const entry = cache.get(componentName);
  if (!entry) return undefined;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(componentName);
    return undefined;
  }
  return entry.filePath;
}

export function setCachedFilePath(componentName: string, filePath: string | null): void {
  cache.set(componentName, { filePath, timestamp: Date.now() });
}

export function clearCache(): void {
  cache.clear();
}
