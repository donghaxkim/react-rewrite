// packages/cli/src/resolve-intent.ts
// Intent resolver — pre-processes annotations before the Claude prompt.
// Handles deterministic math (color matching, spacing snapping) so
// the AI can focus on judgment calls.

import type {
  SerializedAnnotations,
  ResolvedAnnotations,
  ResolvedValue,
  TailwindTokenMap,
} from "@frameup/shared";

// ---------------------------------------------------------------------------
// Color math: RGB → XYZ → Lab (D65 illuminant)
// ---------------------------------------------------------------------------

export function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // Normalize to 0-1 and apply sRGB companding
  let rr = r / 255;
  let gg = g / 255;
  let bb = b / 255;

  rr = rr > 0.04045 ? Math.pow((rr + 0.055) / 1.055, 2.4) : rr / 12.92;
  gg = gg > 0.04045 ? Math.pow((gg + 0.055) / 1.055, 2.4) : gg / 12.92;
  bb = bb > 0.04045 ? Math.pow((bb + 0.055) / 1.055, 2.4) : bb / 12.92;

  // RGB to XYZ (D65)
  let x = (rr * 0.4124564 + gg * 0.3575761 + bb * 0.1804375) / 0.95047;
  let y = (rr * 0.2126729 + gg * 0.7151522 + bb * 0.0721750) / 1.00000;
  let z = (rr * 0.0193339 + gg * 0.1191920 + bb * 0.9503041) / 1.08883;

  // XYZ to Lab
  const f = (t: number) => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116;
  x = f(x);
  y = f(y);
  z = f(z);

  return [
    116 * y - 16,       // L
    500 * (x - y),      // a
    200 * (y - z),      // b
  ];
}

export function deltaE(
  lab1: [number, number, number],
  lab2: [number, number, number],
): number {
  return Math.sqrt(
    (lab1[0] - lab2[0]) ** 2 +
    (lab1[1] - lab2[1]) ** 2 +
    (lab1[2] - lab2[2]) ** 2,
  );
}

// ---------------------------------------------------------------------------
// Lab palette cache — built eagerly at session start
// ---------------------------------------------------------------------------

export type LabCache = Map<string, { token: string; lab: [number, number, number] }>;

export function buildLabCache(colors: Record<string, string>): LabCache {
  const cache: LabCache = new Map();
  for (const [token, hex] of Object.entries(colors)) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) continue;
    const [r, g, b] = hexToRgb(hex);
    cache.set(hex.toLowerCase(), { token, lab: rgbToLab(r, g, b) });
  }
  return cache;
}

// ---------------------------------------------------------------------------
// Color resolver
// ---------------------------------------------------------------------------

export function resolveColor(hex: string, cache: LabCache): ResolvedValue<string> {
  const normalizedHex = hex.toLowerCase();

  const exact = cache.get(normalizedHex);
  if (exact) {
    return {
      raw: hex,
      resolved: exact.token,
      resolvedValue: normalizedHex,
      confidence: 1.0,
      type: "exact",
    };
  }

  const [r, g, b] = hexToRgb(hex);
  const inputLab = rgbToLab(r, g, b);

  let bestToken: string | null = null;
  let bestHex: string | null = null;
  let bestDist = Infinity;

  for (const [paletteHex, { token, lab }] of cache) {
    const dist = deltaE(inputLab, lab);
    if (dist < bestDist) {
      bestDist = dist;
      bestToken = token;
      bestHex = paletteHex;
    }
  }

  if (bestDist < 3) {
    return { raw: hex, resolved: bestToken, resolvedValue: bestHex, confidence: 0.95, type: "snapped" };
  }
  if (bestDist < 8) {
    return { raw: hex, resolved: bestToken, resolvedValue: bestHex, confidence: 0.7, type: "snapped" };
  }

  return { raw: hex, resolved: null, resolvedValue: null, confidence: 0, type: "arbitrary" };
}

// ---------------------------------------------------------------------------
// Spacing cache — parsed token values in pixels, built at session start
// ---------------------------------------------------------------------------

// Assumption: root font size is 16px (browser default).
// If a project uses a different root font size (e.g., html { font-size: 14px }),
// spacing resolution will be slightly off. This is a known limitation.
const ROOT_FONT_SIZE_PX = 16;

export type SpacingCache = Map<number, { token: string; value: string }>;

export function buildSpacingCache(spacing: Record<string, string>): SpacingCache {
  const cache: SpacingCache = new Map();
  for (const [token, value] of Object.entries(spacing)) {
    let px: number;
    if (value.endsWith("rem")) {
      px = parseFloat(value) * ROOT_FONT_SIZE_PX;
    } else if (value.endsWith("px")) {
      px = parseFloat(value);
    } else {
      continue;
    }
    if (!Number.isNaN(px)) {
      cache.set(px, { token, value });
    }
  }
  return cache;
}

// ---------------------------------------------------------------------------
// Spacing resolver — relative threshold: min(tokenPx * 0.15, 8)
// ---------------------------------------------------------------------------

export function resolveSpacing(px: number, cache: SpacingCache): ResolvedValue<number> {
  const absPx = Math.abs(px);

  let bestToken: string | null = null;
  let bestValue: string | null = null;
  let bestDist = Infinity;
  let bestThreshold = 0;

  for (const [tokenPx, { token, value }] of cache) {
    const dist = Math.abs(absPx - tokenPx);
    if (dist < bestDist) {
      bestDist = dist;
      bestToken = token;
      bestValue = value;
      bestThreshold = Math.min(tokenPx * 0.15, 8);
    }
  }

  if (bestDist === 0) {
    return { raw: px, resolved: bestToken, resolvedValue: bestValue, confidence: 1.0, type: "exact" };
  }

  if (bestThreshold > 0 && bestDist <= bestThreshold) {
    // Linear interpolation: 0.95 at distance 0 → 0.75 at threshold boundary.
    // Note: spec table shows non-linear tiers but spec text says "scales linearly" —
    // true linear is correct and matches the endpoints.
    const ratio = bestDist / bestThreshold;
    const confidence = 0.95 - ratio * 0.2;
    return { raw: px, resolved: bestToken, resolvedValue: bestValue, confidence, type: "snapped" };
  }

  return { raw: px, resolved: null, resolvedValue: null, confidence: 0, type: "arbitrary" };
}

// ---------------------------------------------------------------------------
// Alpha channel detection
// ---------------------------------------------------------------------------

export function hasAlpha(color: string): boolean {
  return (
    color.startsWith("rgba(") ||
    color.startsWith("hsla(") ||
    /^#[0-9a-fA-F]{8}$/.test(color)
  );
}

// ---------------------------------------------------------------------------
// Color change resolver — handles pickedToken passthrough and staleness guard
// ---------------------------------------------------------------------------

export function resolveColorChange(
  hex: string,
  pickedToken: string | undefined,
  paletteForward: Record<string, string>,
  cache: LabCache,
): ResolvedValue<string> {
  // pickedToken passthrough with staleness guard
  if (pickedToken) {
    const tokenHex = paletteForward[pickedToken];
    if (tokenHex && tokenHex.toLowerCase() === hex.toLowerCase()) {
      return {
        raw: hex,
        resolved: pickedToken,
        resolvedValue: tokenHex,
        confidence: 1.0,
        type: "exact",
      };
    }
    // Stale — hex was manually edited after picking swatch. Fall through to Delta-E.
  }

  return resolveColor(hex, cache);
}

// ---------------------------------------------------------------------------
// Nearest sibling computation (from raw serialized rects)
// ---------------------------------------------------------------------------

type SiblingRect = { component: string; rect: { top: number; left: number; width: number; height: number } };

interface NearestSiblings {
  left?: { component: string; distance: number };
  right?: { component: string; distance: number };
  above?: { component: string; distance: number };
  below?: { component: string; distance: number };
}

export function computeNearestSiblings(
  movedRect: { top: number; left: number; width: number; height: number },
  delta: { dx: number; dy: number },
  siblings: SiblingRect[] | undefined,
): NearestSiblings {
  if (!siblings || siblings.length === 0) return {};

  const finalLeft = movedRect.left + delta.dx;
  const finalTop = movedRect.top + delta.dy;
  const finalRight = finalLeft + movedRect.width;
  const finalBottom = finalTop + movedRect.height;

  const result: NearestSiblings = {};

  for (const sib of siblings) {
    const sRight = sib.rect.left + sib.rect.width;
    const sBottom = sib.rect.top + sib.rect.height;

    if (sRight <= finalLeft) {
      const dist = finalLeft - sRight;
      if (!result.left || dist < result.left.distance) {
        result.left = { component: sib.component, distance: dist };
      }
    }
    if (sib.rect.left >= finalRight) {
      const dist = sib.rect.left - finalRight;
      if (!result.right || dist < result.right.distance) {
        result.right = { component: sib.component, distance: dist };
      }
    }
    if (sBottom <= finalTop) {
      const dist = finalTop - sBottom;
      if (!result.above || dist < result.above.distance) {
        result.above = { component: sib.component, distance: dist };
      }
    }
    if (sib.rect.top >= finalBottom) {
      const dist = sib.rect.top - finalBottom;
      if (!result.below || dist < result.below.distance) {
        result.below = { component: sib.component, distance: dist };
      }
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export interface IntentCache {
  labCache: LabCache;
  spacingCache: SpacingCache;
  colorsForward: Record<string, string>;
}

export function buildIntentCache(tokens: TailwindTokenMap): IntentCache {
  return {
    labCache: buildLabCache(tokens.colors),
    spacingCache: buildSpacingCache(tokens.spacing),
    colorsForward: tokens.colors,
  };
}

export function resolveIntent(
  annotations: SerializedAnnotations,
  tokens: TailwindTokenMap,
  cache?: IntentCache,
): ResolvedAnnotations {
  const { labCache, spacingCache, colorsForward } = cache ?? buildIntentCache(tokens);

  const moves = annotations.moves.map((move) => ({
    component: move.component,
    file: move.file,
    line: move.line,
    originalRect: move.originalRect,
    delta: move.delta,
    resolvedDx: move.delta.dx !== 0 ? resolveSpacing(move.delta.dx, spacingCache) : null,
    resolvedDy: move.delta.dy !== 0 ? resolveSpacing(move.delta.dy, spacingCache) : null,
    nearestSiblings: computeNearestSiblings(
      move.originalRect,
      move.delta,
      move.siblingRects,
    ),
  }));

  const colorChanges = annotations.colorChanges.map((cc) => {
    let resolvedTo: ResolvedValue<string>;

    if (hasAlpha(cc.to) || hasAlpha(cc.from)) {
      resolvedTo = { raw: cc.to, resolved: null, resolvedValue: null, confidence: 0, type: "arbitrary" as const };
    } else {
      resolvedTo = resolveColorChange(cc.to, cc.pickedToken, colorsForward, labCache);
    }

    return {
      component: cc.component,
      file: cc.file,
      line: cc.line,
      property: cc.property,
      from: cc.from,
      to: cc.to,
      resolvedTo,
      pickedToken: cc.pickedToken,
    };
  });

  return {
    moves,
    annotations: annotations.annotations,
    colorChanges,
  };
}
