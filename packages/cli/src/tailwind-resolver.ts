import * as fs from "node:fs";
import * as path from "node:path";
import type { TailwindTokenMap } from "@react-rewrite/shared";

// ---------------------------------------------------------------------------
// parseThemeBlock
// ---------------------------------------------------------------------------

/**
 * Extracts CSS custom property declarations from @theme { ... } blocks.
 * Returns a flat Record mapping "--property-name" → "value".
 */
export function parseThemeBlock(css: string): Record<string, string> {
  const tokens: Record<string, string> = {};
  const themeBlockRegex = /@theme\s*\{([^}]+)\}/g;
  let match;
  while ((match = themeBlockRegex.exec(css)) !== null) {
    const block = match[1];
    const propRegex = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let propMatch;
    while ((propMatch = propRegex.exec(block)) !== null) {
      tokens[propMatch[1].trim()] = propMatch[2].trim();
    }
  }
  return tokens;
}

// ---------------------------------------------------------------------------
// detectTailwindVersion
// ---------------------------------------------------------------------------

/**
 * Reads node_modules/tailwindcss/package.json to detect major version.
 * Returns "3", "4", or null if tailwindcss is not installed.
 */
export function detectTailwindVersion(projectRoot: string): string | null {
  const pkgPath = path.join(projectRoot, "node_modules", "tailwindcss", "package.json");
  try {
    const raw = fs.readFileSync(pkgPath, "utf-8");
    const pkg = JSON.parse(raw) as { version?: string };
    const version = pkg.version ?? "";
    const major = version.split(".")[0];
    return major || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// DEFAULT_V4_THEME
// ---------------------------------------------------------------------------

const DEFAULT_V4_THEME = {
  spacing: {
    "0": "0px",
    "px": "1px",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "1.5": "0.375rem",
    "2": "0.5rem",
    "2.5": "0.625rem",
    "3": "0.75rem",
    "3.5": "0.875rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
    "11": "2.75rem",
    "12": "3rem",
    "14": "3.5rem",
    "16": "4rem",
    "20": "5rem",
    "24": "6rem",
    "28": "7rem",
    "32": "8rem",
    "36": "9rem",
    "40": "10rem",
    "44": "11rem",
    "48": "12rem",
    "52": "13rem",
    "56": "14rem",
    "60": "15rem",
    "64": "16rem",
    "72": "18rem",
    "80": "20rem",
    "96": "24rem",
  } as Record<string, string>,
  fontSize: {
    "xs": "0.75rem",
    "sm": "0.875rem",
    "base": "1rem",
    "lg": "1.125rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  } as Record<string, string>,
  fontWeight: {
    "thin": "100",
    "extralight": "200",
    "light": "300",
    "normal": "400",
    "medium": "500",
    "semibold": "600",
    "bold": "700",
    "extrabold": "800",
    "black": "900",
  } as Record<string, string>,
  borderRadius: {
    "none": "0px",
    "sm": "0.125rem",
    "DEFAULT": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "full": "9999px",
  } as Record<string, string>,
  borderWidth: {
    "0": "0px",
    "DEFAULT": "1px",
    "2": "2px",
    "4": "4px",
    "8": "8px",
  } as Record<string, string>,
  opacity: {
    "0": "0",
    "5": "0.05",
    "10": "0.1",
    "15": "0.15",
    "20": "0.2",
    "25": "0.25",
    "30": "0.3",
    "35": "0.35",
    "40": "0.4",
    "45": "0.45",
    "50": "0.5",
    "55": "0.55",
    "60": "0.6",
    "65": "0.65",
    "70": "0.7",
    "75": "0.75",
    "80": "0.8",
    "85": "0.85",
    "90": "0.9",
    "95": "0.95",
    "100": "1",
  } as Record<string, string>,
  letterSpacing: {
    "tighter": "-0.05em",
    "tight": "-0.025em",
    "normal": "0em",
    "wide": "0.025em",
    "wider": "0.05em",
    "widest": "0.1em",
  } as Record<string, string>,
  lineHeight: {
    "none": "1",
    "tight": "1.25",
    "snug": "1.375",
    "normal": "1.5",
    "relaxed": "1.625",
    "loose": "2",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  } as Record<string, string>,
  colors: {
    // Slate
    "slate-50": "#f8fafc",
    "slate-100": "#f1f5f9",
    "slate-200": "#e2e8f0",
    "slate-300": "#cbd5e1",
    "slate-400": "#94a3b8",
    "slate-500": "#64748b",
    "slate-600": "#475569",
    "slate-700": "#334155",
    "slate-800": "#1e293b",
    "slate-900": "#0f172a",
    "slate-950": "#020617",
    // Gray
    "gray-50": "#f9fafb",
    "gray-100": "#f3f4f6",
    "gray-200": "#e5e7eb",
    "gray-300": "#d1d5db",
    "gray-400": "#9ca3af",
    "gray-500": "#6b7280",
    "gray-600": "#4b5563",
    "gray-700": "#374151",
    "gray-800": "#1f2937",
    "gray-900": "#111827",
    "gray-950": "#030712",
    // Red
    "red-50": "#fef2f2",
    "red-100": "#fee2e2",
    "red-200": "#fecaca",
    "red-300": "#fca5a5",
    "red-400": "#f87171",
    "red-500": "#ef4444",
    "red-600": "#dc2626",
    "red-700": "#b91c1c",
    "red-800": "#991b1b",
    "red-900": "#7f1d1d",
    "red-950": "#450a0a",
    // Orange
    "orange-50": "#fff7ed",
    "orange-100": "#ffedd5",
    "orange-200": "#fed7aa",
    "orange-300": "#fdba74",
    "orange-400": "#fb923c",
    "orange-500": "#f97316",
    "orange-600": "#ea580c",
    "orange-700": "#c2410c",
    "orange-800": "#9a3412",
    "orange-900": "#7c2d12",
    "orange-950": "#431407",
    // Yellow
    "yellow-50": "#fefce8",
    "yellow-100": "#fef9c3",
    "yellow-200": "#fef08a",
    "yellow-300": "#fde047",
    "yellow-400": "#facc15",
    "yellow-500": "#eab308",
    "yellow-600": "#ca8a04",
    "yellow-700": "#a16207",
    "yellow-800": "#854d0e",
    "yellow-900": "#713f12",
    "yellow-950": "#422006",
    // Green
    "green-50": "#f0fdf4",
    "green-100": "#dcfce7",
    "green-200": "#bbf7d0",
    "green-300": "#86efac",
    "green-400": "#4ade80",
    "green-500": "#22c55e",
    "green-600": "#16a34a",
    "green-700": "#15803d",
    "green-800": "#166534",
    "green-900": "#14532d",
    "green-950": "#052e16",
    // Blue
    "blue-50": "#eff6ff",
    "blue-100": "#dbeafe",
    "blue-200": "#bfdbfe",
    "blue-300": "#93c5fd",
    "blue-400": "#60a5fa",
    "blue-500": "#3b82f6",
    "blue-600": "#2563eb",
    "blue-700": "#1d4ed8",
    "blue-800": "#1e40af",
    "blue-900": "#1e3a8a",
    "blue-950": "#172554",
    // Indigo
    "indigo-50": "#eef2ff",
    "indigo-100": "#e0e7ff",
    "indigo-200": "#c7d2fe",
    "indigo-300": "#a5b4fc",
    "indigo-400": "#818cf8",
    "indigo-500": "#6366f1",
    "indigo-600": "#4f46e5",
    "indigo-700": "#4338ca",
    "indigo-800": "#3730a3",
    "indigo-900": "#312e81",
    "indigo-950": "#1e1b4b",
    // Purple
    "purple-50": "#faf5ff",
    "purple-100": "#f3e8ff",
    "purple-200": "#e9d5ff",
    "purple-300": "#d8b4fe",
    "purple-400": "#c084fc",
    "purple-500": "#a855f7",
    "purple-600": "#9333ea",
    "purple-700": "#7e22ce",
    "purple-800": "#6b21a8",
    "purple-900": "#581c87",
    "purple-950": "#3b0764",
    // Pink
    "pink-50": "#fdf2f8",
    "pink-100": "#fce7f3",
    "pink-200": "#fbcfe8",
    "pink-300": "#f9a8d4",
    "pink-400": "#f472b6",
    "pink-500": "#ec4899",
    "pink-600": "#db2777",
    "pink-700": "#be185d",
    "pink-800": "#9d174d",
    "pink-900": "#831843",
    "pink-950": "#500724",
    // Zinc
    "zinc-50": "#fafafa",
    "zinc-100": "#f4f4f5",
    "zinc-200": "#e4e4e7",
    "zinc-300": "#d4d4d8",
    "zinc-400": "#a1a1aa",
    "zinc-500": "#71717a",
    "zinc-600": "#52525b",
    "zinc-700": "#3f3f46",
    "zinc-800": "#27272a",
    "zinc-900": "#18181b",
    "zinc-950": "#09090b",
    // Neutral
    "neutral-50": "#fafafa",
    "neutral-100": "#f5f5f5",
    "neutral-200": "#e5e5e5",
    "neutral-300": "#d4d4d4",
    "neutral-400": "#a3a3a3",
    "neutral-500": "#737373",
    "neutral-600": "#525252",
    "neutral-700": "#404040",
    "neutral-800": "#262626",
    "neutral-900": "#171717",
    "neutral-950": "#0a0a0a",
    // Stone
    "stone-50": "#fafaf9",
    "stone-100": "#f5f5f4",
    "stone-200": "#e7e5e4",
    "stone-300": "#d6d3d1",
    "stone-400": "#a8a29e",
    "stone-500": "#78716c",
    "stone-600": "#57534e",
    "stone-700": "#44403c",
    "stone-800": "#292524",
    "stone-900": "#1c1917",
    "stone-950": "#0c0a09",
    // Amber
    "amber-50": "#fffbeb",
    "amber-100": "#fef3c7",
    "amber-200": "#fde68a",
    "amber-300": "#fcd34d",
    "amber-400": "#fbbf24",
    "amber-500": "#f59e0b",
    "amber-600": "#d97706",
    "amber-700": "#b45309",
    "amber-800": "#92400e",
    "amber-900": "#78350f",
    "amber-950": "#451a03",
    // Lime
    "lime-50": "#f7fee7",
    "lime-100": "#ecfccb",
    "lime-200": "#d9f99d",
    "lime-300": "#bef264",
    "lime-400": "#a3e635",
    "lime-500": "#84cc16",
    "lime-600": "#65a30d",
    "lime-700": "#4d7c0f",
    "lime-800": "#3f6212",
    "lime-900": "#365314",
    "lime-950": "#1a2e05",
    // Emerald
    "emerald-50": "#ecfdf5",
    "emerald-100": "#d1fae5",
    "emerald-200": "#a7f3d0",
    "emerald-300": "#6ee7b7",
    "emerald-400": "#34d399",
    "emerald-500": "#10b981",
    "emerald-600": "#059669",
    "emerald-700": "#047857",
    "emerald-800": "#065f46",
    "emerald-900": "#064e3b",
    "emerald-950": "#022c22",
    // Teal
    "teal-50": "#f0fdfa",
    "teal-100": "#ccfbf1",
    "teal-200": "#99f6e4",
    "teal-300": "#5eead4",
    "teal-400": "#2dd4bf",
    "teal-500": "#14b8a6",
    "teal-600": "#0d9488",
    "teal-700": "#0f766e",
    "teal-800": "#115e59",
    "teal-900": "#134e4a",
    "teal-950": "#042f2e",
    // Cyan
    "cyan-50": "#ecfeff",
    "cyan-100": "#cffafe",
    "cyan-200": "#a5f3fc",
    "cyan-300": "#67e8f9",
    "cyan-400": "#22d3ee",
    "cyan-500": "#06b6d4",
    "cyan-600": "#0891b2",
    "cyan-700": "#0e7490",
    "cyan-800": "#155e75",
    "cyan-900": "#164e63",
    "cyan-950": "#083344",
    // Sky
    "sky-50": "#f0f9ff",
    "sky-100": "#e0f2fe",
    "sky-200": "#bae6fd",
    "sky-300": "#7dd3fc",
    "sky-400": "#38bdf8",
    "sky-500": "#0ea5e9",
    "sky-600": "#0284c7",
    "sky-700": "#0369a1",
    "sky-800": "#075985",
    "sky-900": "#0c4a6e",
    "sky-950": "#082f49",
    // Violet
    "violet-50": "#f5f3ff",
    "violet-100": "#ede9fe",
    "violet-200": "#ddd6fe",
    "violet-300": "#c4b5fd",
    "violet-400": "#a78bfa",
    "violet-500": "#8b5cf6",
    "violet-600": "#7c3aed",
    "violet-700": "#6d28d9",
    "violet-800": "#5b21b6",
    "violet-900": "#4c1d95",
    "violet-950": "#2e1065",
    // Fuchsia
    "fuchsia-50": "#fdf4ff",
    "fuchsia-100": "#fae8ff",
    "fuchsia-200": "#f5d0fe",
    "fuchsia-300": "#f0abfc",
    "fuchsia-400": "#e879f9",
    "fuchsia-500": "#d946ef",
    "fuchsia-600": "#c026d3",
    "fuchsia-700": "#a21caf",
    "fuchsia-800": "#86198f",
    "fuchsia-900": "#701a75",
    "fuchsia-950": "#4a044e",
    // Rose
    "rose-50": "#fff1f2",
    "rose-100": "#ffe4e6",
    "rose-200": "#fecdd3",
    "rose-300": "#fda4af",
    "rose-400": "#fb7185",
    "rose-500": "#f43f5e",
    "rose-600": "#e11d48",
    "rose-700": "#be123c",
    "rose-800": "#9f1239",
    "rose-900": "#881337",
    "rose-950": "#4c0519",
    // White/Black
    "white": "#ffffff",
    "black": "#000000",
    "transparent": "transparent",
  } as Record<string, string>,
};

// ---------------------------------------------------------------------------
// resolveV3Config
// ---------------------------------------------------------------------------

/**
 * Uses tailwindcss v3's resolveConfig to load and resolve the full theme.
 * Returns a partial theme object with the scales we care about.
 */
export function resolveV3Config(projectRoot: string): typeof DEFAULT_V4_THEME | null {
  try {
    // Dynamic require for v3 (CJS)
    const resolveConfigPath = path.join(
      projectRoot,
      "node_modules",
      "tailwindcss",
      "resolveConfig"
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const resolveConfig = require(resolveConfigPath) as (config: unknown) => {
      theme: Record<string, unknown>;
    };

    // Try to load the user's tailwind config
    let userConfig: unknown = {};
    const configCandidates = [
      "tailwind.config.js",
      "tailwind.config.ts",
      "tailwind.config.cjs",
      "tailwind.config.mjs",
    ];
    for (const candidate of configCandidates) {
      const configPath = path.join(projectRoot, candidate);
      if (fs.existsSync(configPath)) {
        try {
          userConfig = require(configPath) as unknown;
        } catch {
          // ignore — use empty config
        }
        break;
      }
    }

    const resolved = resolveConfig(userConfig);
    const theme = resolved.theme as Record<string, Record<string, unknown>>;

    const flattenScale = (scale: Record<string, unknown> | undefined): Record<string, string> => {
      const result: Record<string, string> = {};
      if (!scale) return result;
      for (const [key, value] of Object.entries(scale)) {
        if (typeof value === "string") {
          result[key] = value;
        }
      }
      return result;
    };

    // Flatten colors (may be nested like { slate: { 500: "#..." } })
    const flattenColors = (colors: Record<string, unknown> | undefined): Record<string, string> => {
      const result: Record<string, string> = {};
      if (!colors) return result;
      for (const [colorName, colorValue] of Object.entries(colors)) {
        if (typeof colorValue === "string") {
          result[colorName] = colorValue;
        } else if (colorValue && typeof colorValue === "object") {
          for (const [shade, hex] of Object.entries(colorValue as Record<string, unknown>)) {
            if (typeof hex === "string") {
              result[`${colorName}-${shade}`] = hex;
            }
          }
        }
      }
      return result;
    };

    return {
      spacing: flattenScale(theme.spacing as Record<string, unknown>),
      colors: flattenColors(theme.colors as Record<string, unknown>),
      fontSize: flattenScale(
        // v3 fontSize values can be [size, lineHeight] tuples
        Object.fromEntries(
          Object.entries((theme.fontSize as Record<string, unknown>) ?? {}).map(([k, v]) => [
            k,
            Array.isArray(v) ? String(v[0]) : String(v),
          ])
        )
      ),
      fontWeight: flattenScale(theme.fontWeight as Record<string, unknown>),
      borderRadius: flattenScale(theme.borderRadius as Record<string, unknown>),
      borderWidth: flattenScale(theme.borderWidth as Record<string, unknown>),
      opacity: flattenScale(theme.opacity as Record<string, unknown>),
      letterSpacing: flattenScale(theme.letterSpacing as Record<string, unknown>),
      lineHeight: flattenScale(theme.lineHeight as Record<string, unknown>),
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// resolveV4Config
// ---------------------------------------------------------------------------

/**
 * Finds CSS files that import/use @theme, parses their custom properties,
 * and merges with DEFAULT_V4_THEME. Custom CSS properties take precedence.
 */
export function resolveV4Config(projectRoot: string): typeof DEFAULT_V4_THEME {
  // Find CSS files that may contain @theme
  const cssFiles = findCssFiles(projectRoot);
  const customTokens: Record<string, string> = {};

  for (const cssFile of cssFiles) {
    try {
      const css = fs.readFileSync(cssFile, "utf-8");
      if (css.includes("@theme")) {
        const parsed = parseThemeBlock(css);
        Object.assign(customTokens, parsed);
      }
    } catch {
      // skip unreadable files
    }
  }

  // Map CSS custom properties back to theme scales
  // e.g. --color-blue-500 → colors["blue-500"]
  const merged = {
    spacing: { ...DEFAULT_V4_THEME.spacing },
    colors: { ...DEFAULT_V4_THEME.colors },
    fontSize: { ...DEFAULT_V4_THEME.fontSize },
    fontWeight: { ...DEFAULT_V4_THEME.fontWeight },
    borderRadius: { ...DEFAULT_V4_THEME.borderRadius },
    borderWidth: { ...DEFAULT_V4_THEME.borderWidth },
    opacity: { ...DEFAULT_V4_THEME.opacity },
    letterSpacing: { ...DEFAULT_V4_THEME.letterSpacing },
    lineHeight: { ...DEFAULT_V4_THEME.lineHeight },
  };

  for (const [prop, value] of Object.entries(customTokens)) {
    // --color-* → colors
    const colorMatch = prop.match(/^--color-(.+)$/);
    if (colorMatch) {
      merged.colors[colorMatch[1]] = value;
      continue;
    }
    // --spacing-* → spacing
    const spacingMatch = prop.match(/^--spacing-(.+)$/);
    if (spacingMatch) {
      merged.spacing[spacingMatch[1]] = value;
      continue;
    }
    // --text-* → fontSize
    const fontSizeMatch = prop.match(/^--text-(.+)$/);
    if (fontSizeMatch) {
      merged.fontSize[fontSizeMatch[1]] = value;
      continue;
    }
    // --font-weight-* → fontWeight
    const fontWeightMatch = prop.match(/^--font-weight-(.+)$/);
    if (fontWeightMatch) {
      merged.fontWeight[fontWeightMatch[1]] = value;
      continue;
    }
    // --radius-* → borderRadius
    const radiusMatch = prop.match(/^--radius-(.+)$/);
    if (radiusMatch) {
      merged.borderRadius[radiusMatch[1]] = value;
      continue;
    }
    // --border-* → borderWidth
    const borderMatch = prop.match(/^--border-(.+)$/);
    if (borderMatch) {
      merged.borderWidth[borderMatch[1]] = value;
      continue;
    }
    // --opacity-* → opacity
    const opacityMatch = prop.match(/^--opacity-(.+)$/);
    if (opacityMatch) {
      merged.opacity[opacityMatch[1]] = value;
      continue;
    }
    // --tracking-* → letterSpacing
    const trackingMatch = prop.match(/^--tracking-(.+)$/);
    if (trackingMatch) {
      merged.letterSpacing[trackingMatch[1]] = value;
      continue;
    }
    // --leading-* → lineHeight
    const leadingMatch = prop.match(/^--leading-(.+)$/);
    if (leadingMatch) {
      merged.lineHeight[leadingMatch[1]] = value;
      continue;
    }
  }

  return merged;
}

/**
 * Finds CSS files in a project root (up to 2 levels deep) that are candidates
 * for Tailwind v4 @theme declarations.
 */
function findCssFiles(projectRoot: string): string[] {
  const results: string[] = [];
  const searchDirs = [
    projectRoot,
    path.join(projectRoot, "src"),
    path.join(projectRoot, "app"),
    path.join(projectRoot, "styles"),
    path.join(projectRoot, "css"),
    path.join(projectRoot, "src", "styles"),
    path.join(projectRoot, "src", "app"),
  ];

  for (const dir of searchDirs) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && (entry.name.endsWith(".css") || entry.name.endsWith(".scss"))) {
          results.push(path.join(dir, entry.name));
        }
      }
    } catch {
      // directory doesn't exist
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// buildTokenMap
// ---------------------------------------------------------------------------

/**
 * Builds a TailwindTokenMap with forward (token→css) and reverse (css→token)
 * maps for all scales.
 */
export function buildTokenMap(theme: typeof DEFAULT_V4_THEME): TailwindTokenMap {
  const buildReverse = (forward: Record<string, string>): Record<string, string> => {
    const reverse: Record<string, string> = {};
    for (const [token, css] of Object.entries(forward)) {
      reverse[css] = token;
    }
    return reverse;
  };

  return {
    spacing: theme.spacing,
    colors: theme.colors,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    borderRadius: theme.borderRadius,
    borderWidth: theme.borderWidth,
    opacity: theme.opacity,
    letterSpacing: theme.letterSpacing,
    lineHeight: theme.lineHeight,
    spacingReverse: buildReverse(theme.spacing),
    colorsReverse: buildReverse(theme.colors),
    fontSizeReverse: buildReverse(theme.fontSize),
    fontWeightReverse: buildReverse(theme.fontWeight),
    borderRadiusReverse: buildReverse(theme.borderRadius),
    borderWidthReverse: buildReverse(theme.borderWidth),
    opacityReverse: buildReverse(theme.opacity),
    letterSpacingReverse: buildReverse(theme.letterSpacing),
    lineHeightReverse: buildReverse(theme.lineHeight),
  };
}

// ---------------------------------------------------------------------------
// resolveTailwindConfig
// ---------------------------------------------------------------------------

/**
 * Main entry point. Detects the Tailwind version, resolves the config,
 * and returns a TailwindTokenMap.
 */
export function resolveTailwindConfig(projectRoot: string): {
  version: string;
  tokens: TailwindTokenMap;
} {
  const version = detectTailwindVersion(projectRoot);

  if (version === "3") {
    const v3Theme = resolveV3Config(projectRoot);
    if (v3Theme) {
      return { version: "3", tokens: buildTokenMap(v3Theme) };
    }
    // Fall back to v4 defaults if resolveConfig fails
    return { version: "3", tokens: buildTokenMap(DEFAULT_V4_THEME) };
  }

  if (version === "4") {
    const v4Theme = resolveV4Config(projectRoot);
    return { version: "4", tokens: buildTokenMap(v4Theme) };
  }

  // No tailwindcss detected — return defaults
  return { version: version ?? "unknown", tokens: buildTokenMap(DEFAULT_V4_THEME) };
}
