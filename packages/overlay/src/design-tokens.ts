// packages/overlay/src/design-tokens.ts

// --- Colors ---
export const COLORS = {
  bgPrimary: "#ffffff",
  bgSecondary: "#f7f7f8",
  bgTertiary: "#efefef",
  border: "rgba(0,0,0,0.08)",
  borderStrong: "rgba(0,0,0,0.15)",
  textPrimary: "#1a1a1a",
  textSecondary: "#6b6b6b",
  textTertiary: "#9b9b9b",
  accent: "#a259ff",
  accentHover: "#8b3ee0",
  accentSoft: "rgba(162,89,255,0.08)",
  accentMedium: "rgba(162,89,255,0.15)",
  danger: "#e5484d",
  dangerSoft: "rgba(229,72,77,0.08)",
  textOnAccent: "#ffffff",
  marginBoxBg: "rgba(255,200,100,0.15)",
  marginBoxBorder: "rgba(200,150,0,0.4)",
  paddingBoxBg: "rgba(100,180,255,0.12)",
  paddingBoxBorder: "rgba(50,120,200,0.35)",
  focusRing: "rgba(162,89,255,0.25)",
} as const;

// --- Shadows ---
export const SHADOWS = {
  sm: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
  md: "0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
  lg: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
} as const;

// --- Border Radius ---
export const RADII = {
  xs: "4px",
  sm: "6px",
  md: "10px",
  lg: "14px",
} as const;

// --- Transitions ---
export const TRANSITIONS = {
  fast: "100ms ease",      // color/opacity hover
  medium: "150ms ease",    // fade in/out panels
  settle: "200ms ease",    // ghost shadow on drop, panel entrance
} as const;

// --- Typography ---
export const FONT_FAMILY = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const FONT_FACE_CSS = `
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/__sketch-ui/inter-regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/__sketch-ui/inter-semibold.woff2') format('woff2');
  }
`;

// --- Cursor SVG Generators ---

/** Move tool cursor: crosshair with arrows, accent colored */
export function moveCursorSvg(): string {
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${COLORS.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='5 9 2 12 5 15'/><polyline points='9 5 12 2 15 5'/><polyline points='15 19 12 22 9 19'/><polyline points='19 9 22 12 19 15'/><line x1='2' y1='12' x2='22' y2='12'/><line x1='12' y1='2' x2='12' y2='22'/></svg>`)}") 12 12, move`;
}

/** Draw tool cursor: circle matching brush size */
let cachedDrawCursor: { size: number; uri: string } | null = null;

export function drawCursorSvg(brushSize: number): string {
  if (cachedDrawCursor && cachedDrawCursor.size === brushSize) {
    return cachedDrawCursor.uri;
  }
  const r = Math.max(brushSize, 2);
  const svgSize = r * 2 + 4;
  const center = svgSize / 2;
  const uri = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='${svgSize}' height='${svgSize}'><circle cx='${center}' cy='${center}' r='${r}' fill='none' stroke='${COLORS.accent}' stroke-width='1.5'/></svg>`)}") ${center} ${center}, crosshair`;
  cachedDrawCursor = { size: brushSize, uri };
  return uri;
}

/** Color tool cursor: eyedropper */
export function colorCursorSvg(): string {
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${COLORS.accent}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M2 22l1-1h3l9-9'/><path d='M13 7l-1.3-1.3a1 1 0 0 0-1.4 0L9 7'/><path d='M16 10l1.3 1.3a1 1 0 0 1 0 1.4L16 14'/><path d='m9 7 6 6'/><path d='M20 2a2.83 2.83 0 0 1 0 4L16 10'/></svg>`)}") 2 22, pointer`;
}
