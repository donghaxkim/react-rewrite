import type { RegistryItem } from "@react-rewrite/shared";
import { addPaletteInsert, generateInsertId, type PaletteInsertEntry } from "./palette-state.js";

// ---------------------------------------------------------------------------
// JSX strings — what gets written to source code on commit
// ---------------------------------------------------------------------------

const DEFAULT_JSX: Record<string, string> = {
  button: "<Button>Button</Button>",
  card: `<Card>\n        <CardHeader>\n          <CardTitle>Card Title</CardTitle>\n          <CardDescription>Card Description</CardDescription>\n        </CardHeader>\n        <CardContent>\n          <p>Card Content</p>\n        </CardContent>\n      </Card>`,
  input: '<Input placeholder="Type here..." />',
  badge: "<Badge>Badge</Badge>",
  label: "<Label>Label</Label>",
  textarea: '<Textarea placeholder="Type your message here." />',
  checkbox: "<Checkbox />",
  switch: "<Switch />",
  separator: "<Separator />",
  skeleton: '<Skeleton className="h-4 w-[250px]" />',
  avatar: '<Avatar>\n        <AvatarImage src="" alt="Avatar" />\n        <AvatarFallback>CN</AvatarFallback>\n      </Avatar>',
  progress: "<Progress value={33} />",
  slider: "<Slider defaultValue={[50]} max={100} step={1} />",
  select: `<Select>\n        <SelectTrigger>\n          <SelectValue placeholder="Select..." />\n        </SelectTrigger>\n        <SelectContent>\n          <SelectItem value="a">Option A</SelectItem>\n          <SelectItem value="b">Option B</SelectItem>\n        </SelectContent>\n      </Select>`,
  alert: `<Alert>\n        <AlertTitle>Alert Title</AlertTitle>\n        <AlertDescription>Alert description text.</AlertDescription>\n      </Alert>`,
  table: `<Table>\n        <TableHeader>\n          <TableRow>\n            <TableHead>Name</TableHead>\n            <TableHead>Status</TableHead>\n          </TableRow>\n        </TableHeader>\n        <TableBody>\n          <TableRow>\n            <TableCell>Item 1</TableCell>\n            <TableCell>Active</TableCell>\n          </TableRow>\n        </TableBody>\n      </Table>`,
  tabs: `<Tabs defaultValue="tab1">\n        <TabsList>\n          <TabsTrigger value="tab1">Tab 1</TabsTrigger>\n          <TabsTrigger value="tab2">Tab 2</TabsTrigger>\n        </TabsList>\n        <TabsContent value="tab1">Tab 1 content</TabsContent>\n        <TabsContent value="tab2">Tab 2 content</TabsContent>\n      </Tabs>`,
};

const DEFAULT_IMPORTS: Record<string, string[]> = {
  button: ["Button"],
  card: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent"],
  input: ["Input"],
  badge: ["Badge"],
  label: ["Label"],
  textarea: ["Textarea"],
  checkbox: ["Checkbox"],
  switch: ["Switch"],
  separator: ["Separator"],
  skeleton: ["Skeleton"],
  avatar: ["Avatar", "AvatarImage", "AvatarFallback"],
  progress: ["Progress"],
  slider: ["Slider"],
  select: ["Select", "SelectTrigger", "SelectValue", "SelectContent", "SelectItem"],
  alert: ["Alert", "AlertTitle", "AlertDescription"],
  table: ["Table", "TableHeader", "TableRow", "TableHead", "TableBody", "TableCell"],
  tabs: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
};

// ---------------------------------------------------------------------------
// Visual HTML previews — rendered in the DOM so the user sees the real thing
// ---------------------------------------------------------------------------

/** Shared base styles injected into every preview to approximate shadcn's look */
const BASE = {
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  radius: "6px",
  radiusSm: "4px",
  bg: "#09090b",
  bgCard: "#09090b",
  border: "#27272a",
  text: "#fafafa",
  textMuted: "#a1a1aa",
  primary: "#ffffff",
  primaryBg: "#fafafa",
  primaryText: "#09090b",
  destructiveBg: "#7f1d1d",
  destructiveText: "#fafafa",
  secondaryBg: "#27272a",
  secondaryText: "#fafafa",
  accent: "#27272a",
  ring: "#d4d4d8",
};

type VariantProps = Record<string, string>;

function createPreviewElement(name: string, variant?: VariantProps): HTMLElement {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  const builder = PREVIEW_BUILDERS[key];
  if (builder) return builder(variant ?? {});
  return fallbackPreview(name);
}

function fallbackPreview(name: string): HTMLElement {
  const el = document.createElement("div");
  el.style.cssText = `padding:12px 16px;border:1px dashed #3f3f46;border-radius:${BASE.radius};color:${BASE.textMuted};font-family:${BASE.font};font-size:14px;`;
  el.textContent = name;
  return el;
}

// Helper to set many styles at once
function s(el: HTMLElement, css: string): HTMLElement {
  el.style.cssText = css;
  return el;
}

const PREVIEW_BUILDERS: Record<string, (v: VariantProps) => HTMLElement> = {

  button: (v) => {
    const btn = document.createElement("button");
    const variant = v.variant ?? "default";
    let css = `display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;font-size:14px;font-weight:500;font-family:${BASE.font};height:36px;padding:0 16px;border-radius:${BASE.radius};cursor:pointer;transition:background 150ms;border:none;`;
    switch (variant) {
      case "destructive":
        css += `background:${BASE.destructiveBg};color:${BASE.destructiveText};`;
        break;
      case "outline":
        css += `background:transparent;color:${BASE.text};border:1px solid ${BASE.border};`;
        break;
      case "secondary":
        css += `background:${BASE.secondaryBg};color:${BASE.secondaryText};`;
        break;
      case "ghost":
        css += `background:transparent;color:${BASE.text};`;
        break;
      case "link":
        css += `background:transparent;color:${BASE.text};text-decoration:underline;text-underline-offset:4px;height:auto;padding:0;`;
        break;
      default:
        css += `background:${BASE.primaryBg};color:${BASE.primaryText};`;
    }
    btn.style.cssText = css;
    btn.textContent = "Button";
    return btn;
  },

  input: () => {
    const input = document.createElement("input");
    input.placeholder = "Type here...";
    input.style.cssText = `width:100%;max-width:320px;height:36px;padding:0 12px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:transparent;color:${BASE.text};font-size:14px;font-family:${BASE.font};outline:none;box-sizing:border-box;`;
    return input;
  },

  textarea: () => {
    const ta = document.createElement("textarea");
    ta.placeholder = "Type your message here.";
    ta.rows = 3;
    ta.style.cssText = `width:100%;max-width:320px;padding:8px 12px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:transparent;color:${BASE.text};font-size:14px;font-family:${BASE.font};outline:none;resize:vertical;box-sizing:border-box;`;
    return ta;
  },

  card: () => {
    const card = document.createElement("div");
    card.style.cssText = `max-width:350px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:${BASE.bgCard};font-family:${BASE.font};overflow:hidden;`;
    card.innerHTML = `
      <div style="padding:24px 24px 0">
        <div style="font-size:18px;font-weight:600;color:${BASE.text};line-height:1.2">Card Title</div>
        <div style="font-size:14px;color:${BASE.textMuted};margin-top:4px">Card Description</div>
      </div>
      <div style="padding:24px">
        <p style="font-size:14px;color:${BASE.text};margin:0">Card Content</p>
      </div>
    `;
    return card;
  },

  badge: (v) => {
    const badge = document.createElement("span");
    const variant = v.variant ?? "default";
    let css = `display:inline-flex;align-items:center;padding:2px 10px;border-radius:9999px;font-size:12px;font-weight:600;font-family:${BASE.font};line-height:1.4;`;
    switch (variant) {
      case "secondary":
        css += `background:${BASE.secondaryBg};color:${BASE.secondaryText};border:1px solid transparent;`;
        break;
      case "outline":
        css += `background:transparent;color:${BASE.text};border:1px solid ${BASE.border};`;
        break;
      case "destructive":
        css += `background:${BASE.destructiveBg};color:${BASE.destructiveText};border:1px solid transparent;`;
        break;
      default:
        css += `background:${BASE.primaryBg};color:${BASE.primaryText};border:1px solid transparent;`;
    }
    badge.style.cssText = css;
    badge.textContent = "Badge";
    return badge;
  },

  label: () => {
    const label = document.createElement("label");
    label.style.cssText = `font-size:14px;font-weight:500;font-family:${BASE.font};color:${BASE.text};`;
    label.textContent = "Label";
    return label;
  },

  checkbox: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:8px;font-family:${BASE.font};`;
    wrap.innerHTML = `
      <div style="width:16px;height:16px;border-radius:3px;border:1px solid ${BASE.ring};background:${BASE.primaryBg};display:flex;align-items:center;justify-content:center">
        <svg width="10" height="10" viewBox="0 0 15 15" fill="none"><path d="M11.467 3.727a.667.667 0 0 1 .07.94l-5.334 6a.667.667 0 0 1-.97.027L2.9 8.36a.667.667 0 0 1 .933-.953l1.866 1.828 4.83-5.44a.667.667 0 0 1 .94-.068Z" fill="${BASE.primaryText}"/></svg>
      </div>
      <span style="font-size:14px;color:${BASE.text}">Accept terms</span>
    `;
    return wrap;
  },

  switch: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:8px;font-family:${BASE.font};`;
    wrap.innerHTML = `
      <div style="width:44px;height:24px;border-radius:12px;background:${BASE.primaryBg};padding:2px;box-sizing:border-box;cursor:pointer">
        <div style="width:20px;height:20px;border-radius:10px;background:${BASE.primaryText};transform:translateX(20px);transition:transform 150ms"></div>
      </div>
      <span style="font-size:14px;color:${BASE.text}">Enabled</span>
    `;
    return wrap;
  },

  select: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:200px;font-family:${BASE.font};`;
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;height:36px;padding:0 12px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:transparent;cursor:pointer">
        <span style="font-size:14px;color:${BASE.textMuted}">Select...</span>
        <svg width="14" height="14" viewBox="0 0 15 15" fill="none"><path d="M4.93 5.93a.5.5 0 0 1 .71 0L7.5 7.79l1.86-1.86a.5.5 0 0 1 .71.71l-2.22 2.21a.5.5 0 0 1-.7 0L4.93 6.64a.5.5 0 0 1 0-.71Z" fill="${BASE.textMuted}"/></svg>
      </div>
    `;
    return wrap;
  },

  separator: () => {
    const sep = document.createElement("div");
    sep.style.cssText = `width:100%;max-width:320px;height:1px;background:${BASE.border};margin:4px 0;`;
    return sep;
  },

  avatar: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:40px;height:40px;border-radius:50%;background:${BASE.secondaryBg};display:flex;align-items:center;justify-content:center;overflow:hidden;`;
    wrap.innerHTML = `<span style="font-size:14px;font-weight:500;color:${BASE.text};font-family:${BASE.font}">CN</span>`;
    return wrap;
  },

  skeleton: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;flex-direction:column;gap:8px;max-width:250px;`;
    wrap.innerHTML = `
      <div style="height:16px;border-radius:${BASE.radius};background:${BASE.secondaryBg};animation:pulse 2s ease-in-out infinite"></div>
      <div style="height:16px;width:80%;border-radius:${BASE.radius};background:${BASE.secondaryBg};animation:pulse 2s ease-in-out infinite"></div>
    `;
    return wrap;
  },

  progress: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:320px;width:100%;`;
    wrap.innerHTML = `
      <div style="height:8px;border-radius:9999px;background:${BASE.secondaryBg};overflow:hidden">
        <div style="height:100%;width:33%;border-radius:9999px;background:${BASE.primaryBg};transition:width 300ms"></div>
      </div>
    `;
    return wrap;
  },

  slider: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:320px;width:100%;padding:8px 0;position:relative;`;
    wrap.innerHTML = `
      <div style="height:6px;border-radius:9999px;background:${BASE.secondaryBg};position:relative">
        <div style="height:100%;width:50%;border-radius:9999px;background:${BASE.primaryBg}"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:${BASE.primaryBg};border:2px solid ${BASE.primaryBg};box-shadow:0 1px 3px rgba(0,0,0,0.3);cursor:pointer"></div>
      </div>
    `;
    return wrap;
  },

  alert: (v) => {
    const variant = v.variant ?? "default";
    const borderColor = variant === "destructive" ? "#991b1b" : BASE.border;
    const iconColor = variant === "destructive" ? "#ef4444" : BASE.text;
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;padding:16px;border-radius:${BASE.radius};border:1px solid ${borderColor};font-family:${BASE.font};`;
    wrap.innerHTML = `
      <div style="display:flex;gap:12px">
        <svg width="16" height="16" viewBox="0 0 15 15" style="flex-shrink:0;margin-top:2px" fill="${iconColor}"><path d="M7.5.877a6.623 6.623 0 1 0 0 13.246A6.623 6.623 0 0 0 7.5.877ZM7 4.5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0v-3Zm.5 5.75a.625.625 0 1 1 0-1.25.625.625 0 0 1 0 1.25Z"/></svg>
        <div>
          <div style="font-size:14px;font-weight:500;color:${BASE.text};margin-bottom:4px">Alert Title</div>
          <div style="font-size:14px;color:${BASE.textMuted}">Alert description text.</div>
        </div>
      </div>
    `;
    return wrap;
  },

  tabs: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:${BASE.font};`;
    wrap.innerHTML = `
      <div style="display:inline-flex;background:${BASE.secondaryBg};border-radius:${BASE.radius};padding:4px;gap:2px">
        <div style="padding:4px 12px;border-radius:${BASE.radiusSm};background:${BASE.bgCard};font-size:14px;font-weight:500;color:${BASE.text};cursor:pointer">Tab 1</div>
        <div style="padding:4px 12px;border-radius:${BASE.radiusSm};font-size:14px;color:${BASE.textMuted};cursor:pointer">Tab 2</div>
      </div>
      <div style="padding:16px 0;font-size:14px;color:${BASE.text}">Tab 1 content</div>
    `;
    return wrap;
  },

  table: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:${BASE.font};border:1px solid ${BASE.border};border-radius:${BASE.radius};overflow:hidden;`;
    const cell = `padding:8px 16px;font-size:14px;text-align:left;`;
    wrap.innerHTML = `
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid ${BASE.border}">
            <th style="${cell}font-weight:500;color:${BASE.textMuted}">Name</th>
            <th style="${cell}font-weight:500;color:${BASE.textMuted}">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid ${BASE.border}">
            <td style="${cell}color:${BASE.text}">Item 1</td>
            <td style="${cell}color:${BASE.text}">Active</td>
          </tr>
          <tr>
            <td style="${cell}color:${BASE.text}">Item 2</td>
            <td style="${cell}color:${BASE.text}">Pending</td>
          </tr>
        </tbody>
      </table>
    `;
    return wrap;
  },

  toast: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:360px;padding:16px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:${BASE.bgCard};font-family:${BASE.font};box-shadow:0 4px 12px rgba(0,0,0,0.15);`;
    wrap.innerHTML = `
      <div style="font-size:14px;font-weight:500;color:${BASE.text};margin-bottom:4px">Event created</div>
      <div style="font-size:13px;color:${BASE.textMuted}">Monday, January 3rd at 6:00 PM</div>
    `;
    return wrap;
  },

  dialog: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:420px;padding:24px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:${BASE.bgCard};font-family:${BASE.font};box-shadow:0 8px 30px rgba(0,0,0,0.2);`;
    wrap.innerHTML = `
      <div style="font-size:18px;font-weight:600;color:${BASE.text};margin-bottom:4px">Dialog Title</div>
      <div style="font-size:14px;color:${BASE.textMuted};margin-bottom:20px">Dialog description goes here. Make changes and confirm below.</div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button style="padding:0 16px;height:36px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:transparent;color:${BASE.text};font-size:14px;font-family:${BASE.font};cursor:pointer">Cancel</button>
        <button style="padding:0 16px;height:36px;border-radius:${BASE.radius};border:none;background:${BASE.primaryBg};color:${BASE.primaryText};font-size:14px;font-family:${BASE.font};font-weight:500;cursor:pointer">Continue</button>
      </div>
    `;
    return wrap;
  },

  accordion: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:${BASE.font};border-bottom:1px solid ${BASE.border};`;
    wrap.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid ${BASE.border};cursor:pointer">
        <span style="font-size:14px;font-weight:500;color:${BASE.text}">Is it accessible?</span>
        <svg width="14" height="14" viewBox="0 0 15 15" fill="${BASE.textMuted}"><path d="M4.93 5.93a.5.5 0 0 1 .71 0L7.5 7.79l1.86-1.86a.5.5 0 0 1 .71.71l-2.22 2.21a.5.5 0 0 1-.7 0L4.93 6.64a.5.5 0 0 1 0-.71Z"/></svg>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 0;cursor:pointer">
        <span style="font-size:14px;font-weight:500;color:${BASE.text}">Is it styled?</span>
        <svg width="14" height="14" viewBox="0 0 15 15" fill="${BASE.textMuted}"><path d="M4.93 5.93a.5.5 0 0 1 .71 0L7.5 7.79l1.86-1.86a.5.5 0 0 1 .71.71l-2.22 2.21a.5.5 0 0 1-.7 0L4.93 6.64a.5.5 0 0 1 0-.71Z"/></svg>
      </div>
    `;
    return wrap;
  },

  calendar: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:280px;padding:16px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:${BASE.bgCard};font-family:${BASE.font};`;
    const days = ["Mo","Tu","We","Th","Fr","Sa","Su"];
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    let gridHtml = days.map(d => `<div style="font-size:11px;color:${BASE.textMuted};text-align:center;padding:4px">${d}</div>`).join("");
    gridHtml += nums.map(n => {
      const isActive = n === 9;
      const bg = isActive ? BASE.primaryBg : "transparent";
      const color = isActive ? BASE.primaryText : BASE.text;
      const weight = isActive ? "600" : "400";
      return `<div style="font-size:13px;text-align:center;padding:6px;border-radius:${BASE.radius};background:${bg};color:${color};font-weight:${weight};cursor:pointer">${n}</div>`;
    }).join("");
    wrap.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <span style="font-size:14px;font-weight:500;color:${BASE.text}">April 2026</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">${gridHtml}</div>
    `;
    return wrap;
  },

  popover: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:280px;padding:16px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:${BASE.bgCard};font-family:${BASE.font};box-shadow:0 4px 12px rgba(0,0,0,0.15);`;
    wrap.innerHTML = `
      <div style="display:grid;gap:8px">
        <div style="font-size:14px;font-weight:500;color:${BASE.text}">Dimensions</div>
        <div style="font-size:13px;color:${BASE.textMuted}">Set the dimensions for the layer.</div>
        <div style="display:flex;gap:8px;align-items:center">
          <label style="font-size:13px;color:${BASE.text};width:50px">Width</label>
          <input style="flex:1;height:28px;padding:0 8px;border:1px solid ${BASE.border};border-radius:${BASE.radiusSm};background:transparent;color:${BASE.text};font-size:13px;font-family:${BASE.font}" value="100%" />
        </div>
      </div>
    `;
    return wrap;
  },

  form: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:360px;font-family:${BASE.font};display:flex;flex-direction:column;gap:16px;`;
    wrap.innerHTML = `
      <div>
        <label style="display:block;font-size:14px;font-weight:500;color:${BASE.text};margin-bottom:6px">Username</label>
        <input placeholder="Enter username" style="width:100%;height:36px;padding:0 12px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:transparent;color:${BASE.text};font-size:14px;font-family:${BASE.font};box-sizing:border-box" />
        <p style="font-size:12px;color:${BASE.textMuted};margin:4px 0 0">This is your public display name.</p>
      </div>
      <button style="align-self:flex-start;height:36px;padding:0 16px;border-radius:${BASE.radius};border:none;background:${BASE.primaryBg};color:${BASE.primaryText};font-size:14px;font-weight:500;font-family:${BASE.font};cursor:pointer">Submit</button>
    `;
    return wrap;
  },

  "navigation-menu": () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;gap:16px;align-items:center;font-family:${BASE.font};padding:8px 0;`;
    wrap.innerHTML = `
      <span style="font-size:14px;font-weight:500;color:${BASE.text};cursor:pointer">Getting Started</span>
      <span style="font-size:14px;color:${BASE.textMuted};cursor:pointer">Components</span>
      <span style="font-size:14px;color:${BASE.textMuted};cursor:pointer">Documentation</span>
    `;
    return wrap;
  },

  dropdown: () => {
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:200px;padding:4px;border-radius:${BASE.radius};border:1px solid ${BASE.border};background:${BASE.bgCard};font-family:${BASE.font};box-shadow:0 4px 12px rgba(0,0,0,0.15);`;
    wrap.innerHTML = `
      <div style="padding:6px 8px;border-radius:${BASE.radiusSm};font-size:14px;color:${BASE.text};cursor:pointer">Profile</div>
      <div style="padding:6px 8px;border-radius:${BASE.radiusSm};font-size:14px;color:${BASE.text};cursor:pointer;background:${BASE.accent}">Settings</div>
      <div style="padding:6px 8px;border-radius:${BASE.radiusSm};font-size:14px;color:${BASE.text};cursor:pointer">Billing</div>
      <div style="height:1px;background:${BASE.border};margin:4px 0"></div>
      <div style="padding:6px 8px;border-radius:${BASE.radiusSm};font-size:14px;color:#ef4444;cursor:pointer">Log out</div>
    `;
    return wrap;
  },
};

// ---------------------------------------------------------------------------
// Live React component mounting
// ---------------------------------------------------------------------------

/**
 * Try to dynamically import a compiled component from the CLI proxy
 * and mount it with React's createRoot, replacing the HTML preview.
 */
async function tryMountRealComponent(
  container: HTMLElement,
  registryName: string,
  variantProps?: Record<string, string>,
): Promise<void> {
  try {
    // The compiled component is served by the CLI proxy
    const moduleUrl = `/__react-rewrite/components/${registryName}.js`;
    const mod = await import(/* @vite-ignore */ moduleUrl);

    // Find the main export — usually the PascalCase name of the component
    // Try common patterns: default export, named export matching component name
    const displayName = registryName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
    const Component = mod.default ?? mod[displayName] ?? Object.values(mod)[0];

    if (typeof Component !== "function") return;

    // Get React and ReactDOM from the page (already loaded by the user's app)
    const React = (window as any).React ?? await import(/* @vite-ignore */ "react");
    const ReactDOM = (window as any).ReactDOM ?? await import(/* @vite-ignore */ "react-dom/client");

    if (!React?.createElement || !ReactDOM?.createRoot) return;

    // Create a wrapper div for the React root
    const reactContainer = document.createElement("div");
    reactContainer.setAttribute("data-react-rewrite-live-preview", "true");

    // Mount the real component
    const root = ReactDOM.createRoot(reactContainer);
    const props = variantProps ?? {};
    const children = getDefaultChildren(registryName);
    root.render(React.createElement(Component, props, children));

    // Replace the HTML preview with the live component
    container.innerHTML = "";
    container.appendChild(reactContainer);

    // Store root reference for cleanup
    (container as any).__reactRewriteRoot = root;
  } catch {
    // Compilation not ready or import failed — keep the HTML preview
  }
}

/** Default children text for components that need it */
function getDefaultChildren(name: string): string | undefined {
  const childrenMap: Record<string, string> = {
    button: "Button",
    badge: "Badge",
    label: "Label",
  };
  return childrenMap[name];
}

// ---------------------------------------------------------------------------
// Variant prop application for JSX strings
// ---------------------------------------------------------------------------

function applyVariantProps(jsxString: string, componentName: string, props: Record<string, string>): string {
  const propsStr = Object.entries(props)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  if (!propsStr) return jsxString;
  const selfClosingRe = new RegExp(`(<${componentName})(\\s*/>)`);
  if (selfClosingRe.test(jsxString)) return jsxString.replace(selfClosingRe, `$1 ${propsStr}$2`);
  const openTagRe = new RegExp(`(<${componentName})(>)`);
  return jsxString.replace(openTagRe, `$1 ${propsStr}$2`);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function stageComponentInsertion(
  item: RegistryItem,
  targetElement: HTMLElement,
  position: "inside" | "before" | "after",
  targetInfo: { filePath: string; line: number; col: number },
  variant?: { name: string; props: Record<string, string> },
): PaletteInsertEntry {
  const id = generateInsertId();
  const componentName = item.displayName.replace(/\s+/g, "");

  // Create a real-looking preview element
  const element = createPreviewElement(item.name, variant?.props);
  element.setAttribute("data-react-rewrite-palette-insert", "true");

  // Insert into DOM
  if (position === "inside") {
    targetElement.appendChild(element);
  } else if (position === "before") {
    targetElement.parentNode!.insertBefore(element, targetElement);
  } else {
    targetElement.parentNode!.insertBefore(element, targetElement.nextSibling);
  }

  // Try to mount the real React component (async, upgrades HTML preview)
  const registryKey = item.name.toLowerCase();
  tryMountRealComponent(element, registryKey, variant?.props);

  // Build JSX string for source code
  let jsxString = DEFAULT_JSX[registryKey] ?? `<${componentName} />`;
  if (variant && Object.keys(variant.props).length > 0) {
    jsxString = applyVariantProps(jsxString, componentName, variant.props);
  }

  const importNames = DEFAULT_IMPORTS[registryKey] ?? [componentName];
  const importPath = `@/components/ui/${item.name.toLowerCase()}`;

  const entry: PaletteInsertEntry = {
    id,
    componentName,
    registryName: item.name,
    element,
    targetElement,
    position,
    targetFilePath: targetInfo.filePath,
    targetLine: targetInfo.line,
    targetCol: targetInfo.col,
    importPath,
    importNames,
    jsxString,
    props: variant?.props ?? {},
    stagedClassChanges: [],
    fidelityTier: 1,
  };

  addPaletteInsert(entry);
  return entry;
}
