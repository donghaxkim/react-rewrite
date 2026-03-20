// packages/overlay/src/utils/element-cache.ts

/** Constants from react-grab — proven production values */
export const ELEMENT_CACHE_DISTANCE_THRESHOLD_PX = 2;
export const ELEMENT_CACHE_THROTTLE_MS = 16;

interface PositionCache {
  clientX: number;
  clientY: number;
  element: HTMLElement | null;
  timestamp: number;
}

let cache: PositionCache | null = null;

export function getCachedElement(clientX: number, clientY: number): HTMLElement | null | undefined {
  if (!cache) return undefined; // cache miss

  const now = performance.now();
  const dx = Math.abs(clientX - cache.clientX);
  const dy = Math.abs(clientY - cache.clientY);
  const isPositionClose = dx <= ELEMENT_CACHE_DISTANCE_THRESHOLD_PX && dy <= ELEMENT_CACHE_DISTANCE_THRESHOLD_PX;
  const isWithinThrottle = now - cache.timestamp < ELEMENT_CACHE_THROTTLE_MS;

  if (isPositionClose || isWithinThrottle) {
    return cache.element; // cache hit
  }

  return undefined; // cache miss (stale)
}

export function setCachedElement(clientX: number, clientY: number, element: HTMLElement | null): void {
  cache = { clientX, clientY, element, timestamp: performance.now() };
}

export function clearElementCache(): void {
  cache = null;
}
