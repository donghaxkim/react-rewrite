// packages/overlay/src/palette/palette-panel.ts
import { COLORS, SHADOWS, RADII, TRANSITIONS, FONT_FAMILY } from "../design-tokens.js";
import { requestComponentRegistry } from "../bridge.js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InsertPosition = "before" | "inside" | "after";

export interface PaletteItem {
  name: string;
  category: string;
  type: "component" | "block";
  props?: Record<string, string>;
}

export interface PaletteVariant {
  name: string;
  props: Record<string, string>;
}

export interface PaletteCallbacks {
  onInsert: (item: PaletteItem, variant?: PaletteVariant) => void;
}

// ---------------------------------------------------------------------------
// Variant definitions (hardcoded)
// ---------------------------------------------------------------------------

const COMPONENT_VARIANTS: Record<string, Array<{ name: string; props: Record<string, string> }>> = {
  button: [
    { name: "Default", props: {} },
    { name: "Destructive", props: { variant: "destructive" } },
    { name: "Outline", props: { variant: "outline" } },
    { name: "Secondary", props: { variant: "secondary" } },
    { name: "Ghost", props: { variant: "ghost" } },
    { name: "Link", props: { variant: "link" } },
  ],
  badge: [
    { name: "Default", props: {} },
    { name: "Secondary", props: { variant: "secondary" } },
    { name: "Outline", props: { variant: "outline" } },
    { name: "Destructive", props: { variant: "destructive" } },
  ],
  alert: [
    { name: "Default", props: {} },
    { name: "Destructive", props: { variant: "destructive" } },
  ],
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const PANEL_STYLES = `
  .palette-panel {
    position: fixed;
    left: 68px;
    top: 0;
    height: 100vh;
    width: 260px;
    background: ${COLORS.bgPrimary};
    border-right: 1px solid ${COLORS.border};
    box-shadow: ${SHADOWS.lg};
    z-index: 2147483644;
    font-family: ${FONT_FAMILY};
    display: flex;
    flex-direction: column;
    transform: translateX(-100%);
    transition: transform ${TRANSITIONS.settle};
    user-select: none;
    overflow: hidden;
  }
  .palette-panel.visible {
    transform: translateX(0);
  }
  .palette-header {
    padding: 12px 12px 0;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .palette-title {
    font-size: 12px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0 4px;
  }
  .palette-search {
    width: 100%;
    height: 30px;
    background: ${COLORS.bgSecondary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.sm};
    padding: 0 10px;
    font-size: 12px;
    font-family: ${FONT_FAMILY};
    color: ${COLORS.textPrimary};
    outline: none;
    box-sizing: border-box;
    transition: border-color ${TRANSITIONS.fast};
  }
  .palette-search::placeholder {
    color: ${COLORS.textTertiary};
  }
  .palette-search:focus {
    border-color: ${COLORS.accent};
    background: ${COLORS.bgPrimary};
  }
  .palette-tabs {
    display: flex;
    gap: 0;
    border-bottom: 1px solid ${COLORS.border};
    padding: 0 4px;
  }
  .palette-tab {
    flex: 1;
    height: 30px;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: ${COLORS.textSecondary};
    font-size: 12px;
    font-family: ${FONT_FAMILY};
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    margin-bottom: -1px;
    transition: color ${TRANSITIONS.fast}, border-color ${TRANSITIONS.fast};
  }
  .palette-tab:hover {
    color: ${COLORS.textPrimary};
  }
  .palette-tab.active {
    color: ${COLORS.accent};
    border-bottom-color: ${COLORS.accent};
    font-weight: 600;
  }
  .palette-position-picker {
    display: flex;
    gap: 4px;
    padding: 8px 12px;
    border-bottom: 1px solid ${COLORS.border};
    flex-shrink: 0;
  }
  .palette-pos-btn {
    flex: 1;
    height: 24px;
    background: ${COLORS.bgSecondary};
    border: 1px solid ${COLORS.border};
    border-radius: ${RADII.xs};
    color: ${COLORS.textSecondary};
    font-size: 10px;
    font-family: ${FONT_FAMILY};
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    transition: background ${TRANSITIONS.fast}, color ${TRANSITIONS.fast}, border-color ${TRANSITIONS.fast};
  }
  .palette-pos-btn:hover {
    color: ${COLORS.textPrimary};
    background: ${COLORS.bgTertiary};
  }
  .palette-pos-btn.active {
    background: ${COLORS.accentSoft};
    border-color: ${COLORS.accent};
    color: ${COLORS.accent};
    font-weight: 600;
  }
  .palette-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px 0;
  }
  .palette-content::-webkit-scrollbar {
    width: 4px;
  }
  .palette-content::-webkit-scrollbar-track {
    background: transparent;
  }
  .palette-content::-webkit-scrollbar-thumb {
    background: ${COLORS.borderStrong};
    border-radius: 2px;
  }
  .palette-category-header {
    font-size: 10px;
    font-weight: 600;
    color: ${COLORS.textTertiary};
    text-transform: uppercase;
    letter-spacing: 0.6px;
    padding: 8px 12px 4px;
  }
  .palette-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    cursor: pointer;
    gap: 8px;
    transition: background ${TRANSITIONS.fast};
    min-height: 30px;
  }
  .palette-item:hover {
    background: ${COLORS.bgSecondary};
  }
  .palette-item-name {
    font-size: 12px;
    color: ${COLORS.textPrimary};
    font-weight: 500;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .palette-item-expand {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.textTertiary};
    flex-shrink: 0;
    transition: transform ${TRANSITIONS.fast}, color ${TRANSITIONS.fast};
  }
  .palette-item-expand.open {
    transform: rotate(90deg);
    color: ${COLORS.accent};
  }
  .palette-variants {
    display: none;
    background: ${COLORS.bgSecondary};
    border-top: 1px solid ${COLORS.border};
    border-bottom: 1px solid ${COLORS.border};
  }
  .palette-variants.open {
    display: block;
  }
  .palette-variant-item {
    display: flex;
    align-items: center;
    padding: 5px 12px 5px 28px;
    cursor: pointer;
    transition: background ${TRANSITIONS.fast};
    gap: 6px;
    min-height: 26px;
  }
  .palette-variant-item:hover {
    background: ${COLORS.bgTertiary};
  }
  .palette-variant-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${COLORS.textTertiary};
    flex-shrink: 0;
  }
  .palette-variant-name {
    font-size: 11px;
    color: ${COLORS.textSecondary};
  }
  .palette-empty {
    padding: 24px 12px;
    text-align: center;
    font-size: 12px;
    color: ${COLORS.textTertiary};
  }
  .palette-loading {
    padding: 24px 12px;
    text-align: center;
    font-size: 12px;
    color: ${COLORS.textTertiary};
  }
`;

// ---------------------------------------------------------------------------
// Default items (fallback when registry is empty)
// ---------------------------------------------------------------------------

const DEFAULT_COMPONENT_ITEMS: PaletteItem[] = [
  // Form
  { name: "Button", category: "Form", type: "component" },
  { name: "Input", category: "Form", type: "component" },
  { name: "Textarea", category: "Form", type: "component" },
  { name: "Select", category: "Form", type: "component" },
  { name: "Checkbox", category: "Form", type: "component" },
  { name: "Label", category: "Form", type: "component" },
  // Feedback
  { name: "Alert", category: "Feedback", type: "component" },
  { name: "Badge", category: "Feedback", type: "component" },
  { name: "Toast", category: "Feedback", type: "component" },
  // Layout
  { name: "Card", category: "Layout", type: "component" },
  { name: "Separator", category: "Layout", type: "component" },
  { name: "Tabs", category: "Layout", type: "component" },
  // Navigation
  { name: "Avatar", category: "Navigation", type: "component" },
  { name: "Dropdown", category: "Navigation", type: "component" },
];

const DEFAULT_BLOCK_ITEMS: PaletteItem[] = [
  { name: "Hero Section", category: "Marketing", type: "block" },
  { name: "Feature Grid", category: "Marketing", type: "block" },
  { name: "Pricing Table", category: "Marketing", type: "block" },
  { name: "Testimonials", category: "Marketing", type: "block" },
  { name: "Contact Form", category: "Forms", type: "block" },
  { name: "Login Form", category: "Forms", type: "block" },
  { name: "Stats Row", category: "Content", type: "block" },
  { name: "Team Grid", category: "Content", type: "block" },
  { name: "Nav Bar", category: "Navigation", type: "block" },
  { name: "Footer", category: "Navigation", type: "block" },
];

// ---------------------------------------------------------------------------
// Public factory
// ---------------------------------------------------------------------------

export function createPalettePanel(
  shadowRoot: ShadowRoot,
  callbacks: PaletteCallbacks,
): {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  isVisible: () => boolean;
  getInsertPosition: () => InsertPosition;
} {
  // Inject styles
  const style = document.createElement("style");
  style.textContent = PANEL_STYLES;
  shadowRoot.appendChild(style);

  // Panel element
  const panel = document.createElement("div");
  panel.className = "palette-panel";
  shadowRoot.appendChild(panel);

  // Prevent interaction layer events from propagating through the panel
  panel.addEventListener("pointerdown", (e) => e.stopPropagation());
  panel.addEventListener("mousedown", (e) => e.stopPropagation());
  panel.addEventListener("click", (e) => e.stopPropagation());
  panel.addEventListener("mouseup", (e) => e.stopPropagation());

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------

  let visible = false;
  let activeTab: "components" | "blocks" = "components";
  let searchQuery = "";
  let insertPosition: InsertPosition = "inside";
  let allComponents: PaletteItem[] = DEFAULT_COMPONENT_ITEMS;
  let allBlocks: PaletteItem[] = DEFAULT_BLOCK_ITEMS;
  let expandedItems: Set<string> = new Set();
  let registryLoaded = false;

  // ---------------------------------------------------------------------------
  // Header
  // ---------------------------------------------------------------------------

  const header = document.createElement("div");
  header.className = "palette-header";

  const titleEl = document.createElement("div");
  titleEl.className = "palette-title";
  titleEl.textContent = "Components";
  header.appendChild(titleEl);

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "palette-search";
  searchInput.placeholder = "Search...";
  searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderContent();
  });
  // Prevent keyboard shortcuts from firing while searching
  searchInput.addEventListener("keydown", (e) => {
    e.stopPropagation();
    if (e.key === "Escape") {
      searchInput.value = "";
      searchQuery = "";
      renderContent();
      searchInput.blur();
    }
  });
  header.appendChild(searchInput);

  // Tabs
  const tabsEl = document.createElement("div");
  tabsEl.className = "palette-tabs";

  const tabComponents = document.createElement("button");
  tabComponents.className = "palette-tab active";
  tabComponents.textContent = "Components";
  tabComponents.addEventListener("click", () => setTab("components"));

  const tabBlocks = document.createElement("button");
  tabBlocks.className = "palette-tab";
  tabBlocks.textContent = "Blocks";
  tabBlocks.addEventListener("click", () => setTab("blocks"));

  tabsEl.appendChild(tabComponents);
  tabsEl.appendChild(tabBlocks);
  header.appendChild(tabsEl);

  panel.appendChild(header);

  // Position picker
  const positionPicker = document.createElement("div");
  positionPicker.className = "palette-position-picker";

  const positions: Array<{ key: InsertPosition; label: string }> = [
    { key: "before", label: "Before" },
    { key: "inside", label: "Inside" },
    { key: "after", label: "After" },
  ];

  const posButtons: Map<InsertPosition, HTMLButtonElement> = new Map();
  for (const pos of positions) {
    const btn = document.createElement("button");
    btn.className = `palette-pos-btn${pos.key === "inside" ? " active" : ""}`;
    btn.textContent = pos.label;
    btn.addEventListener("click", () => {
      insertPosition = pos.key;
      for (const [k, b] of posButtons) {
        b.classList.toggle("active", k === pos.key);
      }
    });
    posButtons.set(pos.key, btn);
    positionPicker.appendChild(btn);
  }
  panel.appendChild(positionPicker);

  // Content area
  const contentEl = document.createElement("div");
  contentEl.className = "palette-content";
  panel.appendChild(contentEl);

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  function setTab(tab: "components" | "blocks"): void {
    activeTab = tab;
    tabComponents.classList.toggle("active", tab === "components");
    tabBlocks.classList.toggle("active", tab === "blocks");
    expandedItems.clear();
    renderContent();
  }

  function renderContent(): void {
    contentEl.innerHTML = "";

    const items = activeTab === "components" ? allComponents : allBlocks;
    const filtered = searchQuery
      ? items.filter((item) => item.name.toLowerCase().includes(searchQuery))
      : items;

    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "palette-empty";
      empty.textContent = searchQuery ? `No results for "${searchQuery}"` : "No items available";
      contentEl.appendChild(empty);
      return;
    }

    // Group by category
    const categories = new Map<string, PaletteItem[]>();
    for (const item of filtered) {
      if (!categories.has(item.category)) categories.set(item.category, []);
      categories.get(item.category)!.push(item);
    }

    for (const [category, categoryItems] of categories) {
      const catHeader = document.createElement("div");
      catHeader.className = "palette-category-header";
      catHeader.textContent = category;
      contentEl.appendChild(catHeader);

      for (const item of categoryItems) {
        renderItem(item);
      }
    }
  }

  function renderItem(item: PaletteItem): void {
    const itemKey = item.name.toLowerCase();
    const variants = activeTab === "components" ? COMPONENT_VARIANTS[itemKey] : undefined;
    const hasVariants = !!variants && variants.length > 0;
    const isExpanded = expandedItems.has(item.name);

    const itemEl = document.createElement("div");
    itemEl.className = "palette-item";

    const nameEl = document.createElement("span");
    nameEl.className = "palette-item-name";
    nameEl.textContent = item.name;
    itemEl.appendChild(nameEl);

    if (hasVariants) {
      const expandEl = document.createElement("span");
      expandEl.className = `palette-item-expand${isExpanded ? " open" : ""}`;
      expandEl.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9,6 15,12 9,18"/></svg>`;
      itemEl.appendChild(expandEl);

      itemEl.addEventListener("click", () => {
        if (expandedItems.has(item.name)) {
          expandedItems.delete(item.name);
        } else {
          expandedItems.add(item.name);
        }
        renderContent();
      });
    } else {
      itemEl.addEventListener("click", () => {
        callbacks.onInsert(item, undefined);
      });
    }

    contentEl.appendChild(itemEl);

    // Render variants if expanded
    if (hasVariants && isExpanded && variants) {
      const variantsEl = document.createElement("div");
      variantsEl.className = "palette-variants open";

      for (const variant of variants) {
        const variantEl = document.createElement("div");
        variantEl.className = "palette-variant-item";

        const dot = document.createElement("span");
        dot.className = "palette-variant-dot";
        variantEl.appendChild(dot);

        const variantName = document.createElement("span");
        variantName.className = "palette-variant-name";
        variantName.textContent = variant.name;
        variantEl.appendChild(variantName);

        variantEl.addEventListener("click", () => {
          callbacks.onInsert(item, variant);
        });

        variantsEl.appendChild(variantEl);
      }

      contentEl.appendChild(variantsEl);
    }
  }

  // ---------------------------------------------------------------------------
  // Registry loading
  // ---------------------------------------------------------------------------

  async function loadRegistry(): Promise<void> {
    if (registryLoaded) return;
    try {
      const registry = await requestComponentRegistry();
      if (registry.components && registry.components.length > 0) {
        allComponents = registry.components.map((c: any) => ({
          name: c.name ?? c.displayName ?? String(c),
          category: c.category ?? "Components",
          type: "component" as const,
          props: c.props,
        }));
      }
      if (registry.blocks && registry.blocks.length > 0) {
        allBlocks = registry.blocks.map((b: any) => ({
          name: b.name ?? b.displayName ?? String(b),
          category: b.category ?? "Blocks",
          type: "block" as const,
        }));
      }
      registryLoaded = true;
      renderContent();
    } catch {
      // Fall back to defaults — already rendered
      registryLoaded = true;
    }
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  function show(): void {
    if (visible) return;
    visible = true;
    panel.offsetHeight; // force reflow
    panel.classList.add("visible");
    renderContent();
    loadRegistry();
  }

  function hide(): void {
    if (!visible) return;
    visible = false;
    panel.classList.remove("visible");
  }

  function toggle(): void {
    if (visible) hide();
    else show();
  }

  // Initial render (hidden)
  renderContent();

  return {
    show,
    hide,
    toggle,
    isVisible: () => visible,
    getInsertPosition: () => insertPosition,
  };
}
