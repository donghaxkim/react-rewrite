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
