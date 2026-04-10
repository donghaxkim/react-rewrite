// packages/overlay/src/color-picker.ts
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "./design-tokens.js";
import { getShadowRoot } from "./toolbar.js";
import { hexToHsv, hsvToHex } from "./utils/color-math.js";

type ColorPickerOptions = {
  initialColor: string;
  position: { x: number; y: number };
  showPropertyToggle: boolean;
  projectColors?: Array<{ token: string; hex: string }>;
  onColorChange: (color: string) => void;
  onPickedToken?: (token: string | undefined) => void;
  onPropertyChange?: (property: "backgroundColor" | "color") => void;
  onClose: () => void;
};

const pickerCleanup = new WeakMap<HTMLElement, () => void>();
const pickerOnClose = new WeakMap<HTMLElement, () => void>();

let activePickerEl: HTMLDivElement | null = null;

export function openColorPicker(opts: ColorPickerOptions): void {
  closeColorPicker();

  const shadowRoot = getShadowRoot();
  if (!shadowRoot) return;

  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    left: ${opts.position.x}px;
    top: ${opts.position.y}px;
    width: 200px;
    padding: 12px;
    background: ${COLORS.bgPrimary};
    border: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.lg};
    border-radius: ${RADII.md};
    font-family: ${FONT_FAMILY};
    z-index: 2147483647;
    opacity: 0;
    transition: opacity ${TRANSITIONS.medium};
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  // Viewport bounds check
  requestAnimationFrame(() => {
    const rect = container.getBoundingClientRect();
    if (rect.right > window.innerWidth - 8) {
      container.style.left = `${window.innerWidth - rect.width - 8}px`;
    }
    if (rect.bottom > window.innerHeight - 8) {
      container.style.top = `${window.innerHeight - rect.height - 8}px`;
    }
    container.style.opacity = "1";
  });

  let currentHsv = hexToHsv(opts.initialColor);
  let selectedProperty: "backgroundColor" | "color" = "backgroundColor";

  // --- Property toggle (Fill / Text) ---
  if (opts.showPropertyToggle) {
    const toggle = createSegmentedToggle(["Fill", "Text"], 0, (idx) => {
      selectedProperty = idx === 0 ? "backgroundColor" : "color";
      opts.onPropertyChange?.(selectedProperty);
    });
    container.appendChild(toggle);
  }

  // --- Color area (saturation/brightness) ---
  const colorArea = document.createElement("canvas");
  colorArea.width = 176;
  colorArea.height = 120;
  colorArea.style.cssText = `width:176px;height:120px;border-radius:4px;cursor:crosshair;`;
  const colorCtx = colorArea.getContext("2d")!;

  const colorPicker = document.createElement("div");
  colorPicker.style.cssText = `
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${SHADOWS.sm};
    position: absolute; pointer-events: none;
    transform: translate(-50%, -50%);
  `;

  const colorAreaWrapper = document.createElement("div");
  colorAreaWrapper.style.cssText = "position:relative;width:176px;height:120px;";
  colorAreaWrapper.appendChild(colorArea);
  colorAreaWrapper.appendChild(colorPicker);
  container.appendChild(colorAreaWrapper);

  function drawColorArea() {
    const hue = currentHsv.h;
    const gradH = colorCtx.createLinearGradient(0, 0, 176, 0);
    gradH.addColorStop(0, `hsl(${hue}, 0%, 100%)`);
    gradH.addColorStop(1, `hsl(${hue}, 100%, 50%)`);
    colorCtx.fillStyle = gradH;
    colorCtx.fillRect(0, 0, 176, 120);
    const gradV = colorCtx.createLinearGradient(0, 0, 0, 120);
    gradV.addColorStop(0, "rgba(0,0,0,0)");
    gradV.addColorStop(1, "rgba(0,0,0,1)");
    colorCtx.fillStyle = gradV;
    colorCtx.fillRect(0, 0, 176, 120);

    const px = (currentHsv.s / 100) * 176;
    const py = (1 - currentHsv.v / 100) * 120;
    colorPicker.style.left = `${px}px`;
    colorPicker.style.top = `${py}px`;
  }

  let draggingArea = false;
  colorArea.addEventListener("mousedown", (e) => {
    draggingArea = true;
    updateAreaFromMouse(e);
  });

  function updateAreaFromMouse(e: MouseEvent) {
    const rect = colorArea.getBoundingClientRect();
    const x = Math.max(0, Math.min(176, e.clientX - rect.left));
    const y = Math.max(0, Math.min(120, e.clientY - rect.top));
    currentHsv.s = (x / 176) * 100;
    currentHsv.v = (1 - y / 120) * 100;
    drawColorArea();
    emitColor();
  }

  // --- Hue strip ---
  const hueStrip = document.createElement("canvas");
  hueStrip.width = 176;
  hueStrip.height = 14;
  hueStrip.style.cssText = "width:176px;height:14px;border-radius:7px;cursor:crosshair;";
  const hueCtx = hueStrip.getContext("2d")!;

  const huePickerEl = document.createElement("div");
  huePickerEl.style.cssText = `
    width: 10px; height: 10px; border-radius: 50%;
    background: white; box-shadow: ${SHADOWS.sm};
    position: absolute; pointer-events: none;
    top: 2px; transform: translateX(-50%);
  `;

  const hueWrapper = document.createElement("div");
  hueWrapper.style.cssText = "position:relative;width:176px;height:14px;";
  hueWrapper.appendChild(hueStrip);
  hueWrapper.appendChild(huePickerEl);
  container.appendChild(hueWrapper);

  function drawHueStrip() {
    const grad = hueCtx.createLinearGradient(0, 0, 176, 0);
    for (let i = 0; i <= 6; i++) {
      grad.addColorStop(i / 6, `hsl(${i * 60}, 100%, 50%)`);
    }
    hueCtx.fillStyle = grad;
    hueCtx.fillRect(0, 0, 176, 14);
    huePickerEl.style.left = `${(currentHsv.h / 360) * 176}px`;
  }

  let draggingHue = false;
  hueStrip.addEventListener("mousedown", (e) => {
    draggingHue = true;
    updateHueFromMouse(e);
  });

  function updateHueFromMouse(e: MouseEvent) {
    const rect = hueStrip.getBoundingClientRect();
    const x = Math.max(0, Math.min(176, e.clientX - rect.left));
    currentHsv.h = (x / 176) * 360;
    drawHueStrip();
    drawColorArea();
    emitColor();
  }

  // --- Hex input ---
  const hexInput = document.createElement("input");
  hexInput.type = "text";
  hexInput.value = hsvToHex(currentHsv);
  hexInput.style.cssText = `
    width: 100%; box-sizing: border-box;
    background: ${COLORS.bgSecondary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.sm};
    color: ${COLORS.textPrimary};
    font-family: monospace;
    font-size: 12px;
    padding: 4px 8px;
    outline: none;
  `;
  hexInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") hexInput.blur();
    e.stopPropagation();
  });
  hexInput.addEventListener("blur", () => {
    const val = hexInput.value.trim();
    if (/^#?[0-9a-fA-F]{6}$/.test(val)) {
      const hex = val.startsWith("#") ? val : `#${val}`;
      currentHsv = hexToHsv(hex);
      drawColorArea();
      drawHueStrip();
      emitColor();
    } else {
      hexInput.value = hsvToHex(currentHsv);
    }
  });
  container.appendChild(hexInput);

  // --- Preset swatches ---
  const presets = ["#000000", "#ffffff", "#e5484d", "#f76b15", "#f5d90a", "#30a46c", "#0091ff", "#3b82f6"];
  const swatchRow = document.createElement("div");
  swatchRow.style.cssText = "display:flex;gap:4px;justify-content:center;";
  for (const color of presets) {
    const swatch = document.createElement("button");
    swatch.style.cssText = `
      width: 12px; height: 12px; border-radius: 50%;
      background: ${color};
      border: 1px solid ${COLORS.border};
      cursor: pointer; padding: 0;
      transition: box-shadow ${TRANSITIONS.fast};
    `;
    swatch.addEventListener("mouseenter", () => { swatch.style.boxShadow = SHADOWS.sm; });
    swatch.addEventListener("mouseleave", () => { swatch.style.boxShadow = "none"; });
    swatch.addEventListener("click", () => {
      currentHsv = hexToHsv(color);
      drawColorArea();
      drawHueStrip();
      hexInput.value = color;
      emitColor();
    });
    swatchRow.appendChild(swatch);
  }
  container.appendChild(swatchRow);

  // --- Project color swatches ---
  if (opts.projectColors && opts.projectColors.length > 0) {
    const projectLabel = document.createElement("div");
    projectLabel.textContent = "Project";
    projectLabel.style.cssText = `
      font-size: 10px;
      color: ${COLORS.textSecondary};
      font-family: ${FONT_FAMILY};
      margin-top: 2px;
    `;
    container.appendChild(projectLabel);

    const projectRow = document.createElement("div");
    projectRow.style.cssText = "display:flex;gap:4px;flex-wrap:wrap;max-height:48px;overflow-y:auto;";

    for (const { token, hex } of opts.projectColors) {
      const swatch = document.createElement("button");
      swatch.title = token;
      swatch.style.cssText = `
        width: 12px; height: 12px; border-radius: 50%;
        background: ${hex};
        border: 1px solid ${COLORS.border};
        cursor: pointer; padding: 0;
        transition: box-shadow ${TRANSITIONS.fast};
      `;
      swatch.addEventListener("mouseenter", () => { swatch.style.boxShadow = SHADOWS.sm; });
      swatch.addEventListener("mouseleave", () => { swatch.style.boxShadow = "none"; });
      swatch.addEventListener("click", () => {
        currentHsv = hexToHsv(hex);
        drawColorArea();
        drawHueStrip();
        hexInput.value = hex;
        emitColor();
        // Set pickedToken AFTER emitColor (which clears it) — this preserves the token
        opts.onPickedToken?.(token);
      });
      projectRow.appendChild(swatch);
    }
    container.appendChild(projectRow);
  }

  function emitColor() {
    const hex = hsvToHex(currentHsv);
    hexInput.value = hex;
    opts.onColorChange(hex);
    opts.onPickedToken?.(undefined);  // clear — user changed color via area/hue/input, not swatch
  }

  shadowRoot.appendChild(container);
  activePickerEl = container;

  // Draw initial state
  drawColorArea();
  drawHueStrip();

  // Drag event listeners (must be cleaned up)
  const onDocMouseMove = (e: MouseEvent) => {
    if (draggingArea) updateAreaFromMouse(e);
    if (draggingHue) updateHueFromMouse(e);
  };
  const onDocMouseUp = () => { draggingArea = false; draggingHue = false; };
  document.addEventListener("mousemove", onDocMouseMove);
  document.addEventListener("mouseup", onDocMouseUp);

  // Dismiss handlers
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeColorPicker(); };
  document.addEventListener("keydown", onKey, true);

  const onClickOutside = (e: MouseEvent) => {
    // Use composedPath to see through Shadow DOM boundaries —
    // e.target is retargeted to the host element, so contains() fails
    if (activePickerEl && !e.composedPath().includes(activePickerEl)) {
      closeColorPicker();
    }
  };
  setTimeout(() => document.addEventListener("mousedown", onClickOutside, true), 0);

  // Store cleanup and onClose callback
  pickerCleanup.set(container, () => {
    document.removeEventListener("mousemove", onDocMouseMove);
    document.removeEventListener("mouseup", onDocMouseUp);
    document.removeEventListener("keydown", onKey, true);
    document.removeEventListener("mousedown", onClickOutside, true);
  });
  pickerOnClose.set(container, opts.onClose);
}

export function closeColorPicker(): void {
  if (activePickerEl) {
    pickerCleanup.get(activePickerEl)?.();
    pickerOnClose.get(activePickerEl)?.();
    activePickerEl.remove();
    activePickerEl = null;
  }
}

// --- Helpers ---

function createSegmentedToggle(labels: string[], activeIdx: number, onChange: (idx: number) => void): HTMLDivElement {
  const track = document.createElement("div");
  track.style.cssText = `
    display: flex;
    background: ${COLORS.bgSecondary};
    border-radius: 6px;
    padding: 2px;
    width: 100%;
  `;
  const segments: HTMLButtonElement[] = [];
  for (let i = 0; i < labels.length; i++) {
    const seg = document.createElement("button");
    seg.textContent = labels[i];
    seg.style.cssText = `
      flex: 1; height: 28px; border: none; border-radius: 4px;
      background: ${i === activeIdx ? COLORS.bgPrimary : "transparent"};
      box-shadow: ${i === activeIdx ? SHADOWS.sm : "none"};
      color: ${i === activeIdx ? COLORS.textPrimary : COLORS.textSecondary};
      font-family: ${FONT_FAMILY}; font-size: 12px; cursor: pointer;
      transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast};
    `;
    seg.addEventListener("click", () => {
      segments.forEach((s, j) => {
        s.style.background = j === i ? COLORS.bgPrimary : "transparent";
        s.style.boxShadow = j === i ? SHADOWS.sm : "none";
        s.style.color = j === i ? COLORS.textPrimary : COLORS.textSecondary;
      });
      onChange(i);
    });
    segments.push(seg);
    track.appendChild(seg);
  }
  return track;
}
