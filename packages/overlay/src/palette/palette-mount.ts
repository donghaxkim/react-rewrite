import type { RegistryItem } from "@react-rewrite/shared";
import { addPaletteInsert, generateInsertId, type PaletteInsertEntry } from "./palette-state.js";
import { getTheme, hsl } from "./palette-theme.js";

// ---------------------------------------------------------------------------
// JSX strings — what gets written to source code on commit
// ---------------------------------------------------------------------------

const DEFAULT_JSX: Record<string, string> = {
  accordion: `<Accordion type="single" collapsible className="w-full">\n        <AccordionItem value="item-1">\n          <AccordionTrigger>Is it accessible?</AccordionTrigger>\n          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>\n        </AccordionItem>\n      </Accordion>`,
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
  "alert-dialog": `<AlertDialog>\n        <AlertDialogTrigger asChild>\n          <button>Open alert dialog</button>\n        </AlertDialogTrigger>\n        <AlertDialogContent>\n          <AlertDialogHeader>\n            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>\n            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>\n          </AlertDialogHeader>\n          <AlertDialogFooter>\n            <AlertDialogCancel>Cancel</AlertDialogCancel>\n            <AlertDialogAction>Continue</AlertDialogAction>\n          </AlertDialogFooter>\n        </AlertDialogContent>\n      </AlertDialog>`,
  carousel: `<Carousel className="w-full max-w-xs">\n        <CarouselContent>\n          <CarouselItem>\n            <div className="p-1">\n              <div className="flex aspect-square items-center justify-center rounded-xl border">1</div>\n            </div>\n          </CarouselItem>\n          <CarouselItem>\n            <div className="p-1">\n              <div className="flex aspect-square items-center justify-center rounded-xl border">2</div>\n            </div>\n          </CarouselItem>\n        </CarouselContent>\n        <CarouselPrevious />\n        <CarouselNext />\n      </Carousel>`,
  table: `<Table>\n        <TableHeader>\n          <TableRow>\n            <TableHead>Name</TableHead>\n            <TableHead>Status</TableHead>\n          </TableRow>\n        </TableHeader>\n        <TableBody>\n          <TableRow>\n            <TableCell>Item 1</TableCell>\n            <TableCell>Active</TableCell>\n          </TableRow>\n        </TableBody>\n      </Table>`,
  tabs: `<Tabs defaultValue="tab1">\n        <TabsList>\n          <TabsTrigger value="tab1">Tab 1</TabsTrigger>\n          <TabsTrigger value="tab2">Tab 2</TabsTrigger>\n        </TabsList>\n        <TabsContent value="tab1">Tab 1 content</TabsContent>\n        <TabsContent value="tab2">Tab 2 content</TabsContent>\n      </Tabs>`,
  dialog: `<Dialog>\n        <DialogTrigger asChild>\n          <button>Open dialog</button>\n        </DialogTrigger>\n        <DialogContent>\n          <DialogHeader>\n            <DialogTitle>Edit profile</DialogTitle>\n            <DialogDescription>Make changes to your profile here.</DialogDescription>\n          </DialogHeader>\n        </DialogContent>\n      </Dialog>`,
  drawer: `<Drawer>\n        <DrawerTrigger asChild>\n          <button>Open drawer</button>\n        </DrawerTrigger>\n        <DrawerContent>\n          <DrawerHeader>\n            <DrawerTitle>Move Goal</DrawerTitle>\n            <DrawerDescription>Set your daily activity goal.</DrawerDescription>\n          </DrawerHeader>\n          <DrawerFooter>\n            <DrawerClose asChild>\n              <button>Close</button>\n            </DrawerClose>\n          </DrawerFooter>\n        </DrawerContent>\n      </Drawer>`,
  "hover-card": `<HoverCard>\n        <HoverCardTrigger asChild>\n          <button>@shadcn</button>\n        </HoverCardTrigger>\n        <HoverCardContent>\n          <div className="space-y-1">\n            <h4 className="text-sm font-semibold">@shadcn</h4>\n            <p className="text-sm">The React component collection.</p>\n          </div>\n        </HoverCardContent>\n      </HoverCard>`,
  breadcrumb: `<Breadcrumb>\n        <BreadcrumbList>\n          <BreadcrumbItem>\n            <BreadcrumbLink href=\"#\">Home</BreadcrumbLink>\n          </BreadcrumbItem>\n          <BreadcrumbSeparator />\n          <BreadcrumbItem>\n            <BreadcrumbPage>Components</BreadcrumbPage>\n          </BreadcrumbItem>\n        </BreadcrumbList>\n      </Breadcrumb>`,
  "context-menu": `<ContextMenu>\n        <ContextMenuTrigger>Right click</ContextMenuTrigger>\n        <ContextMenuContent>\n          <ContextMenuItem>Back</ContextMenuItem>\n          <ContextMenuItem>Forward</ContextMenuItem>\n        </ContextMenuContent>\n      </ContextMenu>`,
  "aspect-ratio": `<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl border">\n        <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">16:9</div>\n      </AspectRatio>`,
  chart: `<div className="rounded-xl border p-4">\n        <div className="grid h-32 grid-cols-4 items-end gap-2">\n          <div className="rounded-t bg-primary/40" style={{ height: "42%" }} />\n          <div className="rounded-t bg-primary/60" style={{ height: "68%" }} />\n          <div className="rounded-t bg-primary/80" style={{ height: "54%" }} />\n          <div className="rounded-t bg-primary" style={{ height: "84%" }} />\n        </div>\n      </div>`,
  collapsible: `<Collapsible defaultOpen className="w-full rounded-xl border px-4 py-3">\n        <div className="mb-3 flex items-center justify-between">\n          <span className="text-sm font-medium">Repository Access</span>\n          <CollapsibleTrigger>Toggle</CollapsibleTrigger>\n        </div>\n        <CollapsibleContent>\n          <p className="text-sm text-muted-foreground">Manage who can access this repository.</p>\n        </CollapsibleContent>\n      </Collapsible>`,
  combobox: `<div className="w-full max-w-sm rounded-xl border p-3">\n        <div className="mb-2 flex items-center justify-between rounded-md border px-3 py-2 text-sm">\n          <span>Select framework...</span>\n          <span>▾</span>\n        </div>\n        <div className="rounded-md border p-1">\n          <div className="rounded-sm bg-accent px-2 py-1 text-sm">Next.js</div>\n          <div className="px-2 py-1 text-sm text-muted-foreground">SvelteKit</div>\n        </div>\n      </div>`,
  command: `<div className="w-full max-w-sm rounded-xl border">\n        <div className="border-b px-3 py-2 text-sm text-muted-foreground">Type a command...</div>\n        <div className="p-2">\n          <div className="rounded-md bg-accent px-3 py-2 text-sm">Calendar</div>\n          <div className="px-3 py-2 text-sm text-muted-foreground">Search Emoji</div>\n        </div>\n      </div>`,
  "data-table": `<Table>\n        <TableHeader>\n          <TableRow>\n            <TableHead>Header</TableHead>\n            <TableHead>Status</TableHead>\n          </TableRow>\n        </TableHeader>\n        <TableBody>\n          <TableRow>\n            <TableCell>Row 1</TableCell>\n            <TableCell>Active</TableCell>\n          </TableRow>\n        </TableBody>\n      </Table>`,
  "date-picker": `<div className="w-full max-w-sm rounded-xl border p-3">\n        <div className="mb-3 flex items-center justify-between rounded-md border px-3 py-2 text-sm">\n          <span>Pick a date</span>\n          <span>📅</span>\n        </div>\n        <Calendar mode="single" selected={new Date()} />\n      </div>`,
  "input-otp": `<div className="flex gap-2">\n        <div className="flex h-10 w-10 items-center justify-center rounded-md border">1</div>\n        <div className="flex h-10 w-10 items-center justify-center rounded-md border">2</div>\n        <div className="flex h-10 w-10 items-center justify-center rounded-md border">3</div>\n        <div className="flex h-10 w-10 items-center justify-center rounded-md border">4</div>\n      </div>`,
  menubar: `<Menubar>\n        <MenubarMenu>\n          <MenubarTrigger>File</MenubarTrigger>\n          <MenubarContent>\n            <MenubarItem>New Tab</MenubarItem>\n          </MenubarContent>\n        </MenubarMenu>\n      </Menubar>`,
  pagination: `<Pagination>\n        <PaginationContent>\n          <PaginationItem>\n            <PaginationPrevious href=\"#\" />\n          </PaginationItem>\n          <PaginationItem>\n            <PaginationLink href=\"#\" isActive>1</PaginationLink>\n          </PaginationItem>\n          <PaginationItem>\n            <PaginationNext href=\"#\" />\n          </PaginationItem>\n        </PaginationContent>\n      </Pagination>`,
  "radio-group": `<RadioGroup defaultValue="default" className="grid gap-2">\n        <div className="flex items-center gap-2"><RadioGroupItem value="default" id="r1" /><Label htmlFor="r1">Default</Label></div>\n        <div className="flex items-center gap-2"><RadioGroupItem value="comfortable" id="r2" /><Label htmlFor="r2">Comfortable</Label></div>\n      </RadioGroup>`,
  resizable: `<div className="flex h-28 w-full max-w-sm overflow-hidden rounded-xl border">\n        <div className="flex w-1/2 items-center justify-center bg-muted text-sm">Left</div>\n        <div className="w-px bg-border" />\n        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">Right</div>\n      </div>`,
  "scroll-area": `<div className="h-28 w-full max-w-sm overflow-hidden rounded-xl border">\n        <div className="space-y-2 p-3">\n          <div className="h-6 rounded bg-muted" />\n          <div className="h-6 rounded bg-muted" />\n          <div className="h-6 rounded bg-muted" />\n          <div className="h-6 rounded bg-muted" />\n        </div>\n      </div>`,
  popover: `<Popover>\n        <PopoverTrigger asChild>\n          <button>Open popover</button>\n        </PopoverTrigger>\n        <PopoverContent>\n          <div className="space-y-2">\n            <h4 className="font-medium leading-none">Dimensions</h4>\n            <p className="text-sm">Set the dimensions for the layer.</p>\n          </div>\n        </PopoverContent>\n      </Popover>`,
  sheet: `<Sheet>\n        <SheetTrigger asChild>\n          <button>Open sheet</button>\n        </SheetTrigger>\n        <SheetContent>\n          <SheetHeader>\n            <SheetTitle>Edit profile</SheetTitle>\n            <SheetDescription>Make changes to your profile here.</SheetDescription>\n          </SheetHeader>\n        </SheetContent>\n      </Sheet>`,
  toggle: `<Toggle pressed className="px-3">Bold</Toggle>`,
  "toggle-group": `<ToggleGroup type="single" defaultValue="center">\n        <ToggleGroupItem value="left">L</ToggleGroupItem>\n        <ToggleGroupItem value="center">C</ToggleGroupItem>\n        <ToggleGroupItem value="right">R</ToggleGroupItem>\n      </ToggleGroup>`,
  tooltip: `<TooltipProvider>\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <button>Hover</button>\n          </TooltipTrigger>\n          <TooltipContent>\n            <p>Add to library</p>\n          </TooltipContent>\n        </Tooltip>\n      </TooltipProvider>`,
};

const DEFAULT_IMPORTS: Record<string, string[]> = {
  accordion: ["Accordion", "AccordionContent", "AccordionItem", "AccordionTrigger"],
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
  "alert-dialog": ["AlertDialog", "AlertDialogAction", "AlertDialogCancel", "AlertDialogContent", "AlertDialogDescription", "AlertDialogFooter", "AlertDialogHeader", "AlertDialogTitle", "AlertDialogTrigger"],
  carousel: ["Carousel", "CarouselContent", "CarouselItem", "CarouselNext", "CarouselPrevious"],
  table: ["Table", "TableHeader", "TableRow", "TableHead", "TableBody", "TableCell"],
  tabs: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
  dialog: ["Dialog", "DialogContent", "DialogDescription", "DialogHeader", "DialogTitle", "DialogTrigger"],
  drawer: ["Drawer", "DrawerClose", "DrawerContent", "DrawerDescription", "DrawerFooter", "DrawerHeader", "DrawerTitle", "DrawerTrigger"],
  "hover-card": ["HoverCard", "HoverCardContent", "HoverCardTrigger"],
  breadcrumb: ["Breadcrumb", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbList", "BreadcrumbPage", "BreadcrumbSeparator"],
  "context-menu": ["ContextMenu", "ContextMenuContent", "ContextMenuItem", "ContextMenuTrigger"],
  "aspect-ratio": ["AspectRatio"],
  chart: [],
  collapsible: ["Collapsible", "CollapsibleContent", "CollapsibleTrigger"],
  combobox: [],
  command: [],
  "data-table": ["Table", "TableBody", "TableCell", "TableHead", "TableHeader", "TableRow"],
  "date-picker": ["Calendar"],
  "input-otp": [],
  menubar: ["Menubar", "MenubarContent", "MenubarItem", "MenubarMenu", "MenubarTrigger"],
  pagination: ["Pagination", "PaginationContent", "PaginationItem", "PaginationLink", "PaginationNext", "PaginationPrevious"],
  "radio-group": ["Label", "RadioGroup", "RadioGroupItem"],
  resizable: [],
  "scroll-area": [],
  popover: ["Popover", "PopoverContent", "PopoverTrigger"],
  sheet: ["Sheet", "SheetContent", "SheetDescription", "SheetHeader", "SheetTitle", "SheetTrigger"],
  toggle: ["Toggle"],
  "toggle-group": ["ToggleGroup", "ToggleGroupItem"],
  tooltip: ["Tooltip", "TooltipContent", "TooltipProvider", "TooltipTrigger"],
};

// ---------------------------------------------------------------------------
// Preview builders — use inline styles from the user's actual CSS theme
//
// We read CSS custom properties (--primary, --background, etc.) that shadcn
// defines on :root. This gives us the user's exact colors/radius/etc.
// No dependency on Tailwind JIT generating classes at build time.
// ---------------------------------------------------------------------------

type VariantProps = Record<string, string>;

export function createPalettePreviewElement(name: string, variantProps?: VariantProps): HTMLElement {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  const builder = PREVIEW_BUILDERS[key];
  if (builder) return builder(variantProps ?? {});
  const generated = createGeneratedPreview(key);
  if (generated) return generated;
  return fallbackPreview(name);
}

export function hasPalettePreviewBuilder(name: string): boolean {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  return key in PREVIEW_BUILDERS || !!createGeneratedPreview(key);
}

function fallbackPreview(name: string): HTMLElement {
  const t = getTheme();
  const el = document.createElement("div");
  el.style.cssText = `padding:16px;border-radius:${t.radius};border:1px solid ${hsl(t.border)};background:${hsl(t.card)};color:${hsl(t.cardForeground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;`;
  el.textContent = name;
  return el;
}

function createGeneratedPreview(key: string): HTMLElement | null {
  if (key.startsWith("login-") || key.startsWith("signup-")) {
    return PREVIEW_BUILDERS["auth-block"]({});
  }
  if (key.startsWith("sidebar-")) {
    return PREVIEW_BUILDERS["sidebar-block"]({});
  }
  if (key.startsWith("dashboard-")) {
    return PREVIEW_BUILDERS["dashboard-block"]({});
  }
  return null;
}

const PREVIEW_BUILDERS: Record<string, (v: VariantProps) => HTMLElement> = {

  button: (v) => {
    const t = getTheme();
    const btn = document.createElement("button");
    const variant = v.variant ?? "default";
    let bg: string, fg: string, border = "none";
    switch (variant) {
      case "destructive": bg = hsl(t.destructive); fg = hsl(t.destructiveForeground); break;
      case "outline": bg = "transparent"; fg = hsl(t.foreground); border = `1px solid ${hsl(t.input)}`; break;
      case "secondary": bg = hsl(t.secondary); fg = hsl(t.secondaryForeground); break;
      case "ghost": bg = "transparent"; fg = hsl(t.foreground); break;
      case "link": bg = "transparent"; fg = hsl(t.primary); break;
      default: bg = hsl(t.primary); fg = hsl(t.primaryForeground); break;
    }
    btn.style.cssText = `display:inline-flex;align-items:center;justify-content:center;gap:8px;white-space:nowrap;font-size:14px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;height:36px;padding:0 16px;border-radius:${t.radius};cursor:pointer;border:${border};background:${bg};color:${fg};${variant === "link" ? "text-decoration:underline;text-underline-offset:4px;height:auto;padding:0;" : "box-shadow:0 1px 2px rgba(0,0,0,0.05);"}`;
    btn.textContent = "Button";
    return btn;
  },

  input: () => {
    const t = getTheme();
    const input = document.createElement("input");
    input.placeholder = "Type here...";
    input.style.cssText = `width:100%;max-width:320px;height:36px;padding:0 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;outline:none;box-sizing:border-box;box-shadow:0 1px 2px rgba(0,0,0,0.05);`;
    return input;
  },

  textarea: () => {
    const t = getTheme();
    const ta = document.createElement("textarea");
    ta.placeholder = "Type your message here.";
    ta.rows = 3;
    ta.style.cssText = `width:100%;max-width:320px;padding:8px 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;outline:none;resize:vertical;box-sizing:border-box;box-shadow:0 1px 2px rgba(0,0,0,0.05);`;
    return ta;
  },

  card: () => {
    const t = getTheme();
    const card = document.createElement("div");
    card.style.cssText = `max-width:350px;border-radius:calc(${t.radius} * 2);border:1px solid ${hsl(t.border)};background:${hsl(t.card)};color:${hsl(t.cardForeground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;`;
    card.innerHTML = `
      <div style="padding:24px 24px 0">
        <div style="font-size:18px;font-weight:600;line-height:1.2;color:${hsl(t.cardForeground)}">Card Title</div>
        <div style="font-size:14px;color:${hsl(t.mutedForeground)};margin-top:4px">Card Description</div>
      </div>
      <div style="padding:24px">
        <p style="font-size:14px;color:${hsl(t.cardForeground)};margin:0">Card Content</p>
      </div>
    `;
    return card;
  },

  badge: (v) => {
    const t = getTheme();
    const badge = document.createElement("span");
    const variant = v.variant ?? "default";
    let bg: string, fg: string, border = "1px solid transparent";
    switch (variant) {
      case "secondary": bg = hsl(t.secondary); fg = hsl(t.secondaryForeground); break;
      case "outline": bg = "transparent"; fg = hsl(t.foreground); border = `1px solid ${hsl(t.border)}`; break;
      case "destructive": bg = hsl(t.destructive); fg = hsl(t.destructiveForeground); break;
      default: bg = hsl(t.primary); fg = hsl(t.primaryForeground); break;
    }
    badge.style.cssText = `display:inline-flex;align-items:center;padding:2px 10px;border-radius:9999px;font-size:12px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.4;background:${bg};color:${fg};border:${border};`;
    badge.textContent = "Badge";
    return badge;
  },

  label: () => {
    const t = getTheme();
    const label = document.createElement("label");
    label.style.cssText = `font-size:14px;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${hsl(t.foreground)};`;
    label.textContent = "Label";
    return label;
  },

  checkbox: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="width:16px;height:16px;border-radius:3px;background:${hsl(t.primary)};display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.primaryForeground)}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Accept terms</span>
    `;
    return wrap;
  },

  switch: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="width:44px;height:24px;border-radius:12px;background:${hsl(t.primary)};padding:2px;box-sizing:border-box;cursor:pointer">
        <div style="width:20px;height:20px;border-radius:10px;background:${hsl(t.background)};transform:translateX(20px)"></div>
      </div>
      <span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Enabled</span>
    `;
    return wrap;
  },

  select: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:200px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;height:36px;padding:0 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.05)">
        <span style="font-size:14px;color:${hsl(t.mutedForeground)}">Select...</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.mutedForeground)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    `;
    return wrap;
  },

  separator: () => {
    const t = getTheme();
    const sep = document.createElement("div");
    sep.style.cssText = `width:100%;max-width:320px;height:1px;background:${hsl(t.border)};margin:4px 0;`;
    return sep;
  },

  avatar: () => {
    const t = getTheme();
    const wrap = document.createElement("span");
    wrap.style.cssText = `display:inline-flex;width:40px;height:40px;border-radius:50%;background:${hsl(t.muted)};align-items:center;justify-content:center;overflow:hidden;`;
    wrap.innerHTML = `<span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">CN</span>`;
    return wrap;
  },

  skeleton: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;flex-direction:column;gap:8px;max-width:250px;";
    const barStyle = `height:16px;border-radius:${t.radius};background:${hsl(t.muted)};`;
    wrap.innerHTML = `
      <div style="${barStyle}width:100%"></div>
      <div style="${barStyle}width:80%"></div>
    `;
    return wrap;
  },

  progress: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:320px;width:100%;height:8px;border-radius:9999px;background:${hsl(t.primary)}20;overflow:hidden;`;
    wrap.innerHTML = `<div style="height:100%;width:33%;border-radius:9999px;background:${hsl(t.primary)}"></div>`;
    return wrap;
  },

  slider: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:320px;width:100%;padding:8px 0;position:relative;height:20px;display:flex;align-items:center;`;
    wrap.innerHTML = `
      <div style="height:6px;width:100%;border-radius:9999px;background:${hsl(t.primary)}20;position:relative">
        <div style="height:100%;width:50%;border-radius:9999px;background:${hsl(t.primary)}"></div>
      </div>
      <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:20px;height:20px;border-radius:50%;background:${hsl(t.background)};border:2px solid ${hsl(t.primary)};box-shadow:0 1px 3px rgba(0,0,0,0.2);cursor:pointer"></div>
    `;
    return wrap;
  },

  alert: (v) => {
    const t = getTheme();
    const variant = v.variant ?? "default";
    const isDestructive = variant === "destructive";
    const borderColor = isDestructive ? hsl(t.destructive) + "80" : hsl(t.border);
    const textColor = isDestructive ? hsl(t.destructive) : hsl(t.foreground);
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;padding:16px;border-radius:${t.radius};border:1px solid ${borderColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:flex;gap:12px">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${textColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        <div>
          <div style="font-size:14px;font-weight:500;color:${textColor};margin-bottom:4px">Alert Title</div>
          <div style="font-size:14px;color:${hsl(t.mutedForeground)}">Alert description text.</div>
        </div>
      </div>
    `;
    return wrap;
  },

  tabs: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:inline-flex;background:${hsl(t.muted)};border-radius:${t.radius};padding:4px;gap:2px">
        <div style="padding:4px 12px;border-radius:calc(${t.radius} - 2px);background:${hsl(t.background)};font-size:14px;font-weight:500;color:${hsl(t.foreground)};cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,0.05)">Tab 1</div>
        <div style="padding:4px 12px;border-radius:calc(${t.radius} - 2px);font-size:14px;color:${hsl(t.mutedForeground)};cursor:pointer">Tab 2</div>
      </div>
      <div style="padding:16px 0;font-size:14px;color:${hsl(t.foreground)}">Tab 1 content</div>
    `;
    return wrap;
  },

  table: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;border:1px solid ${hsl(t.border)};border-radius:${t.radius};overflow:hidden;`;
    const th = `padding:8px 16px;font-size:14px;text-align:left;font-weight:500;color:${hsl(t.mutedForeground)};`;
    const td = `padding:8px 16px;font-size:14px;text-align:left;color:${hsl(t.foreground)};`;
    wrap.innerHTML = `
      <table style="width:100%;border-collapse:collapse">
        <thead><tr style="border-bottom:1px solid ${hsl(t.border)}"><th style="${th}">Name</th><th style="${th}">Status</th></tr></thead>
        <tbody>
          <tr style="border-bottom:1px solid ${hsl(t.border)}"><td style="${td}">Item 1</td><td style="${td}">Active</td></tr>
          <tr><td style="${td}">Item 2</td><td style="${td}">Pending</td></tr>
        </tbody>
      </table>
    `;
    return wrap;
  },

  dialog: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:420px;padding:24px;border-radius:calc(${t.radius} * 2);border:1px solid ${hsl(t.border)};background:${hsl(t.background)};color:${hsl(t.foreground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 8px 30px rgba(0,0,0,0.2);`;
    wrap.innerHTML = `
      <div style="font-size:18px;font-weight:600;margin-bottom:4px">Dialog Title</div>
      <div style="font-size:14px;color:${hsl(t.mutedForeground)};margin-bottom:20px">Dialog description goes here.</div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button style="padding:0 16px;height:36px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:14px;font-family:inherit;cursor:pointer">Cancel</button>
        <button style="padding:0 16px;height:36px;border-radius:${t.radius};border:none;background:${hsl(t.primary)};color:${hsl(t.primaryForeground)};font-size:14px;font-weight:500;font-family:inherit;cursor:pointer">Continue</button>
      </div>
    `;
    return wrap;
  },

  "alert-dialog": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:420px;padding:24px;border-radius:calc(${t.radius} * 2);border:1px solid ${hsl(t.border)};background:${hsl(t.background)};color:${hsl(t.foreground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 16px 40px rgba(0,0,0,0.18);`;
    wrap.innerHTML = `
      <div style="font-size:18px;font-weight:600;margin-bottom:6px">Are you absolutely sure?</div>
      <div style="font-size:14px;color:${hsl(t.mutedForeground)};margin-bottom:18px">This action cannot be undone.</div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button style="padding:0 16px;height:36px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:14px;font-family:inherit;cursor:pointer">Cancel</button>
        <button style="padding:0 16px;height:36px;border-radius:${t.radius};border:none;background:${hsl(t.destructive)};color:${hsl(t.destructiveForeground)};font-size:14px;font-weight:600;font-family:inherit;cursor:pointer">Continue</button>
      </div>
    `;
    return wrap;
  },

  accordion: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:400px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    const row = `display:flex;justify-content:space-between;align-items:center;padding:16px 0;cursor:pointer;border-bottom:1px solid ${hsl(t.border)};`;
    wrap.innerHTML = `
      <div style="${row}"><span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Is it accessible?</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.mutedForeground)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
      <div style="${row}"><span style="font-size:14px;font-weight:500;color:${hsl(t.foreground)}">Is it styled?</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${hsl(t.mutedForeground)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></div>
    `;
    return wrap;
  },

  carousel: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:12px;max-width:320px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    const arrow = `width:28px;height:28px;border-radius:9999px;border:1px solid ${hsl(t.border)};display:flex;align-items:center;justify-content:center;background:${hsl(t.background)};color:${hsl(t.foreground)};flex-shrink:0;`;
    wrap.innerHTML = `
      <div style="${arrow}">&#8249;</div>
      <div style="display:flex;gap:8px;flex:1;overflow:hidden">
        <div style="flex:1;aspect-ratio:1;border-radius:16px;border:1px solid ${hsl(t.border)};background:${hsl(t.card)};display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:${hsl(t.cardForeground)}">1</div>
        <div style="flex:1;aspect-ratio:1;border-radius:16px;border:1px solid ${hsl(t.border)};background:${hsl(t.muted)};display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:700;color:${hsl(t.mutedForeground)}">2</div>
      </div>
      <div style="${arrow}">&#8250;</div>
    `;
    return wrap;
  },

  "hover-card": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <button style="padding:0 12px;height:32px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:${hsl(t.background)};color:${hsl(t.foreground)};font-size:13px;font-weight:500">@shadcn</button>
      <div style="width:220px;border-radius:calc(${t.radius} * 1.5);border:1px solid ${hsl(t.border)};background:${hsl(t.popover)};color:${hsl(t.popoverForeground)};padding:14px;box-shadow:0 12px 30px rgba(0,0,0,0.12)">
        <div style="font-size:14px;font-weight:600;margin-bottom:4px">@shadcn</div>
        <div style="font-size:13px;color:${hsl(t.mutedForeground)}">The React component collection.</div>
      </div>
    `;
    return wrap;
  },

  popover: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <button style="padding:0 12px;height:32px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:${hsl(t.background)};color:${hsl(t.foreground)};font-size:13px;font-weight:500">Open popover</button>
      <div style="width:220px;border-radius:calc(${t.radius} * 1.5);border:1px solid ${hsl(t.border)};background:${hsl(t.popover)};color:${hsl(t.popoverForeground)};padding:14px;box-shadow:0 12px 30px rgba(0,0,0,0.12)">
        <div style="font-size:14px;font-weight:600;margin-bottom:4px">Dimensions</div>
        <div style="font-size:13px;color:${hsl(t.mutedForeground)}">Set the dimensions for the layer.</div>
      </div>
    `;
    return wrap;
  },

  tooltip: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="padding:0 12px;height:32px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};display:flex;align-items:center;background:${hsl(t.background)};color:${hsl(t.foreground)};font-size:13px;font-weight:500">Hover</div>
      <div style="padding:6px 10px;border-radius:${t.radius};background:${hsl(t.primary)};color:${hsl(t.primaryForeground)};font-size:12px;box-shadow:0 10px 24px rgba(0,0,0,0.15)">Add to library</div>
    `;
    return wrap;
  },

  drawer: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `max-width:300px;border-radius:18px 18px 0 0;border:1px solid ${hsl(t.border)};background:${hsl(t.background)};overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 16px 40px rgba(0,0,0,0.14);`;
    wrap.innerHTML = `
      <div style="padding:10px 0 4px;display:flex;justify-content:center"><div style="width:38px;height:4px;border-radius:9999px;background:${hsl(t.muted)}"></div></div>
      <div style="padding:10px 18px 18px">
        <div style="font-size:16px;font-weight:600;margin-bottom:4px;color:${hsl(t.foreground)}">Move Goal</div>
        <div style="font-size:13px;color:${hsl(t.mutedForeground)};margin-bottom:14px">Set your daily activity goal.</div>
        <div style="display:flex;gap:8px">
          <button style="flex:1;height:34px;border-radius:${t.radius};border:none;background:${hsl(t.primary)};color:${hsl(t.primaryForeground)};font-size:13px;font-weight:600">Submit</button>
          <button style="flex:1;height:34px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:transparent;color:${hsl(t.foreground)};font-size:13px">Close</button>
        </div>
      </div>
    `;
    return wrap;
  },

  sheet: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:260px;height:180px;border-radius:18px 0 0 18px;border:1px solid ${hsl(t.border)};background:${hsl(t.background)};padding:18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 16px 40px rgba(0,0,0,0.14);`;
    wrap.innerHTML = `
      <div style="font-size:16px;font-weight:600;margin-bottom:4px;color:${hsl(t.foreground)}">Edit profile</div>
      <div style="font-size:13px;color:${hsl(t.mutedForeground)};margin-bottom:14px">Make changes to your profile here.</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="height:30px;border-radius:${t.radius};border:1px solid ${hsl(t.input)}"></div>
        <div style="height:30px;border-radius:${t.radius};border:1px solid ${hsl(t.input)}"></div>
      </div>
    `;
    return wrap;
  },

  sonner: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:260px;border-radius:calc(${t.radius} * 1.5);border:1px solid ${hsl(t.border)};background:${hsl(t.card)};color:${hsl(t.cardForeground)};padding:12px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 14px 32px rgba(0,0,0,0.12);`;
    wrap.innerHTML = `
      <div style="font-size:13px;font-weight:600;margin-bottom:2px">Event has been created</div>
      <div style="font-size:12px;color:${hsl(t.mutedForeground)}">Sunday, December 3rd at 9:00 AM.</div>
    `;
    return wrap;
  },

  breadcrumb: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;color:${hsl(t.mutedForeground)};`;
    wrap.innerHTML = `
      <span style="color:${hsl(t.foreground)};font-weight:500">Home</span>
      <span>/</span>
      <span>Components</span>
      <span>/</span>
      <span style="color:${hsl(t.foreground)};font-weight:600">Breadcrumb</span>
    `;
    return wrap;
  },

  "context-menu": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:210px;padding:6px;border-radius:${t.radius};border:1px solid ${hsl(t.border)};background:${hsl(t.popover)};color:${hsl(t.popoverForeground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 10px 24px rgba(0,0,0,0.14);`;
    const item = `padding:8px 10px;border-radius:calc(${t.radius} - 2px);font-size:13px;`;
    wrap.innerHTML = `
      <div style="${item}background:${hsl(t.accent)};color:${hsl(t.accentForeground)}">Back</div>
      <div style="${item}">Forward</div>
      <div style="${item}">Reload</div>
      <div style="height:1px;background:${hsl(t.border)};margin:4px 0"></div>
      <div style="${item}">More tools</div>
    `;
    return wrap;
  },

  menubar: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:inline-flex;align-items:center;gap:4px;padding:4px;border-radius:${t.radius};border:1px solid ${hsl(t.border)};background:${hsl(t.background)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    const item = `padding:6px 10px;border-radius:calc(${t.radius} - 2px);font-size:13px;color:${hsl(t.foreground)};`;
    wrap.innerHTML = `
      <div style="${item}background:${hsl(t.accent)}">File</div>
      <div style="${item}">Edit</div>
      <div style="${item}">View</div>
      <div style="${item}">Help</div>
    `;
    return wrap;
  },

  pagination: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;align-items:center;gap:6px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    const pill = (active = false) => `width:30px;height:30px;border-radius:${t.radius};border:1px solid ${active ? hsl(t.primary) : hsl(t.border)};background:${active ? hsl(t.primary) : hsl(t.background)};color:${active ? hsl(t.primaryForeground) : hsl(t.foreground)};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:${active ? 600 : 500};`;
    wrap.innerHTML = `
      <div style="${pill()}">&#8249;</div>
      <div style="${pill()}">1</div>
      <div style="${pill(true)}">2</div>
      <div style="${pill()}">3</div>
      <div style="${pill()}">&#8250;</div>
    `;
    return wrap;
  },

  "aspect-ratio": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:220px;aspect-ratio:16 / 9;border-radius:16px;border:1px solid ${hsl(t.border)};background:${hsl(t.muted)};display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:${hsl(t.mutedForeground)};font-size:14px;font-weight:600;`;
    wrap.textContent = "16:9";
    return wrap;
  },

  chart: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:220px;height:120px;border-radius:16px;border:1px solid ${hsl(t.border)};background:${hsl(t.card)};padding:14px;box-sizing:border-box;display:flex;align-items:flex-end;gap:10px;`;
    [36, 70, 52, 88].forEach((height, index) => {
      const bar = document.createElement("div");
      bar.style.cssText = `flex:1;height:${height}px;border-radius:10px 10px 4px 4px;background:${index === 3 ? hsl(t.primary) : hsl(t.primary)}${index === 0 ? "55" : index === 1 ? "75" : "90"};`;
      wrap.appendChild(bar);
    });
    return wrap;
  },

  collapsible: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:230px;border-radius:16px;border:1px solid ${hsl(t.border)};padding:14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;font-size:14px;font-weight:600;color:${hsl(t.foreground)}">
        <span>Repository Access</span>
        <span style="color:${hsl(t.mutedForeground)}">▾</span>
      </div>
      <div style="margin-top:10px;font-size:12px;color:${hsl(t.mutedForeground)}">Manage who can access this repository.</div>
    `;
    return wrap;
  },

  combobox: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:220px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;height:36px;padding:0 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:${hsl(t.background)};margin-bottom:8px">
        <span style="font-size:13px;color:${hsl(t.foreground)}">Select framework</span>
        <span style="color:${hsl(t.mutedForeground)}">▾</span>
      </div>
      <div style="border:1px solid ${hsl(t.border)};border-radius:${t.radius};padding:4px;background:${hsl(t.popover)}">
        <div style="padding:8px 10px;border-radius:8px;background:${hsl(t.accent)};color:${hsl(t.accentForeground)};font-size:13px">Next.js</div>
        <div style="padding:8px 10px;font-size:13px;color:${hsl(t.mutedForeground)}">SvelteKit</div>
      </div>
    `;
    return wrap;
  },

  command: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:230px;border-radius:16px;border:1px solid ${hsl(t.border)};background:${hsl(t.background)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden;`;
    wrap.innerHTML = `
      <div style="padding:10px 12px;border-bottom:1px solid ${hsl(t.border)};font-size:13px;color:${hsl(t.mutedForeground)}">Type a command...</div>
      <div style="padding:6px">
        <div style="padding:8px 10px;border-radius:10px;background:${hsl(t.accent)};color:${hsl(t.accentForeground)};font-size:13px">Calendar</div>
        <div style="padding:8px 10px;font-size:13px;color:${hsl(t.mutedForeground)}">Search Emoji</div>
      </div>
    `;
    return wrap;
  },

  "data-table": () => PREVIEW_BUILDERS.table({}),

  "date-picker": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:220px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;height:36px;padding:0 12px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};background:${hsl(t.background)};margin-bottom:8px">
        <span style="font-size:13px;color:${hsl(t.foreground)}">April 10, 2026</span>
        <span>📅</span>
      </div>
      <div style="border:1px solid ${hsl(t.border)};border-radius:16px;padding:12px;background:${hsl(t.card)}">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;font-size:11px;color:${hsl(t.mutedForeground)};text-align:center;margin-bottom:6px">
          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;font-size:12px;color:${hsl(t.foreground)}">
          <span>6</span><span>7</span><span>8</span><span>9</span><span style="background:${hsl(t.primary)};color:${hsl(t.primaryForeground)};border-radius:8px;padding:4px 0">10</span><span>11</span><span>12</span>
        </div>
      </div>
    `;
    return wrap;
  },

  "input-otp": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    ["1", "2", "3", "4"].forEach((digit) => {
      const cell = document.createElement("div");
      cell.style.cssText = `width:38px;height:42px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:600;color:${hsl(t.foreground)};background:${hsl(t.background)};`;
      cell.textContent = digit;
      wrap.appendChild(cell);
    });
    return wrap;
  },

  "radio-group": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;flex-direction:column;gap:10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    const option = (label: string, active = false) => `
      <div style="display:flex;align-items:center;gap:8px">
        <div style="width:16px;height:16px;border-radius:9999px;border:1px solid ${active ? hsl(t.primary) : hsl(t.input)};display:flex;align-items:center;justify-content:center">
          ${active ? `<div style="width:8px;height:8px;border-radius:9999px;background:${hsl(t.primary)}"></div>` : ""}
        </div>
        <span style="font-size:13px;color:${hsl(t.foreground)}">${label}</span>
      </div>`;
    wrap.innerHTML = `${option("Default", true)}${option("Comfortable")}`;
    return wrap;
  },

  resizable: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;width:230px;height:110px;border-radius:16px;overflow:hidden;border:1px solid ${hsl(t.border)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.innerHTML = `
      <div style="width:48%;background:${hsl(t.muted)};display:flex;align-items:center;justify-content:center;font-size:13px;color:${hsl(t.foreground)}">Left</div>
      <div style="width:6px;background:${hsl(t.border)}"></div>
      <div style="flex:1;background:${hsl(t.background)};display:flex;align-items:center;justify-content:center;font-size:13px;color:${hsl(t.mutedForeground)}">Right</div>
    `;
    return wrap;
  },

  "scroll-area": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `position:relative;width:230px;height:110px;border-radius:16px;border:1px solid ${hsl(t.border)};background:${hsl(t.background)};padding:12px;box-sizing:border-box;overflow:hidden;`;
    wrap.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:8px;padding-right:12px">
        <div style="height:12px;border-radius:999px;background:${hsl(t.muted)}"></div>
        <div style="height:12px;border-radius:999px;background:${hsl(t.muted)}"></div>
        <div style="height:12px;border-radius:999px;background:${hsl(t.muted)}"></div>
        <div style="height:12px;border-radius:999px;background:${hsl(t.muted)}"></div>
      </div>
      <div style="position:absolute;right:8px;top:16px;width:4px;height:68px;border-radius:999px;background:${hsl(t.muted)}">
        <div style="width:4px;height:28px;border-radius:999px;background:${hsl(t.primary)}"></div>
      </div>
    `;
    return wrap;
  },

  toggle: () => {
    const t = getTheme();
    const wrap = document.createElement("button");
    wrap.style.cssText = `height:34px;padding:0 14px;border-radius:${t.radius};border:1px solid ${hsl(t.primary)};background:${hsl(t.accent)};color:${hsl(t.foreground)};font-size:13px;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    wrap.textContent = "Bold";
    return wrap;
  },

  "toggle-group": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:inline-flex;border-radius:${t.radius};border:1px solid ${hsl(t.border)};overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;`;
    const cell = (label: string, active = false) => `<div style="width:34px;height:32px;display:flex;align-items:center;justify-content:center;background:${active ? hsl(t.accent) : hsl(t.background)};color:${hsl(t.foreground)};font-size:13px;font-weight:${active ? 600 : 500};border-right:1px solid ${hsl(t.border)}">${label}</div>`;
    wrap.innerHTML = `${cell("L")}${cell("C", true)}${cell("R")}`.replace(/border-right:1px solid[^"]*">R/, `">R`);
    return wrap;
  },

  "auth-block": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:250px;border-radius:18px;border:1px solid ${hsl(t.border)};background:${hsl(t.card)};padding:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 10px 24px rgba(0,0,0,0.08);`;
    wrap.innerHTML = `
      <div style="font-size:16px;font-weight:600;color:${hsl(t.cardForeground)};margin-bottom:10px">Welcome back</div>
      <div style="height:34px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};margin-bottom:8px;background:${hsl(t.background)}"></div>
      <div style="height:34px;border-radius:${t.radius};border:1px solid ${hsl(t.input)};margin-bottom:12px;background:${hsl(t.background)}"></div>
      <div style="height:36px;border-radius:${t.radius};background:${hsl(t.primary)};color:${hsl(t.primaryForeground)};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">Continue</div>
    `;
    return wrap;
  },

  "sidebar-block": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `display:flex;width:260px;height:150px;border-radius:18px;overflow:hidden;border:1px solid ${hsl(t.border)};background:${hsl(t.background)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 10px 24px rgba(0,0,0,0.08);`;
    wrap.innerHTML = `
      <div style="width:88px;background:${hsl(t.card)};border-right:1px solid ${hsl(t.border)};padding:12px 10px;box-sizing:border-box">
        <div style="height:10px;width:42px;border-radius:999px;background:${hsl(t.foreground)};margin-bottom:14px"></div>
        <div style="height:8px;border-radius:999px;background:${hsl(t.primary)};margin-bottom:10px"></div>
        <div style="height:8px;border-radius:999px;background:${hsl(t.muted)};margin-bottom:10px"></div>
        <div style="height:8px;border-radius:999px;background:${hsl(t.muted)}"></div>
      </div>
      <div style="flex:1;padding:14px 12px;box-sizing:border-box">
        <div style="height:14px;width:90px;border-radius:999px;background:${hsl(t.foreground)};margin-bottom:12px"></div>
        <div style="height:58px;border-radius:14px;background:${hsl(t.muted)};margin-bottom:10px"></div>
        <div style="display:flex;gap:8px">
          <div style="flex:1;height:28px;border-radius:10px;background:${hsl(t.muted)}"></div>
          <div style="flex:1;height:28px;border-radius:10px;background:${hsl(t.muted)}"></div>
        </div>
      </div>
    `;
    return wrap;
  },

  "dashboard-block": () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:260px;border-radius:18px;border:1px solid ${hsl(t.border)};background:${hsl(t.background)};padding:12px;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 10px 24px rgba(0,0,0,0.08);`;
    wrap.innerHTML = `
      <div style="height:14px;width:120px;border-radius:999px;background:${hsl(t.foreground)};margin-bottom:12px"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <div style="height:52px;border-radius:14px;background:${hsl(t.card)};border:1px solid ${hsl(t.border)}"></div>
        <div style="height:52px;border-radius:14px;background:${hsl(t.card)};border:1px solid ${hsl(t.border)}"></div>
      </div>
      <div style="height:62px;border-radius:14px;background:${hsl(t.card)};border:1px solid ${hsl(t.border)}"></div>
    `;
    return wrap;
  },

  dropdown: () => {
    const t = getTheme();
    const wrap = document.createElement("div");
    wrap.style.cssText = `width:200px;padding:4px;border-radius:${t.radius};border:1px solid ${hsl(t.border)};background:${hsl(t.popover)};color:${hsl(t.popoverForeground)};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.15);`;
    const item = `padding:6px 8px;border-radius:calc(${t.radius} - 2px);font-size:14px;cursor:pointer;`;
    wrap.innerHTML = `
      <div style="${item}color:${hsl(t.foreground)}">Profile</div>
      <div style="${item}background:${hsl(t.accent)};color:${hsl(t.accentForeground)}">Settings</div>
      <div style="${item}color:${hsl(t.foreground)}">Billing</div>
      <div style="height:1px;background:${hsl(t.border)};margin:4px 0"></div>
      <div style="${item}color:${hsl(t.destructive)}">Log out</div>
    `;
    return wrap;
  },
};

// ---------------------------------------------------------------------------
// Variant prop application for JSX strings
// ---------------------------------------------------------------------------

function applyVariantProps(jsxString: string, componentName: string, props: Record<string, string>): string {
  const propsStr = Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(" ");
  if (!propsStr) return jsxString;
  const selfClosingRe = new RegExp(`(<${componentName})(\\s*/>)`);
  if (selfClosingRe.test(jsxString)) return jsxString.replace(selfClosingRe, `$1 ${propsStr}$2`);
  const openTagRe = new RegExp(`(<${componentName})(>)`);
  return jsxString.replace(openTagRe, `$1 ${propsStr}$2`);
}

// ---------------------------------------------------------------------------
// Check if element is a palette insert
// ---------------------------------------------------------------------------

export function isPaletteInsert(el: HTMLElement): boolean {
  return !!el.closest("[data-react-rewrite-palette-insert]");
}

function createFloatingPreviewShell(targetElement: HTMLElement, position: "inside" | "before" | "after"): HTMLDivElement {
  const shell = document.createElement("div");
  const targetRect = targetElement.getBoundingClientRect();
  const viewportPadding = 16;
  const maxWidth = 360;
  const width = Math.min(maxWidth, Math.max(220, targetRect.width));
  const targetCenterX = targetRect.left + targetRect.width / 2;
  const targetCenterY = targetRect.top + targetRect.height / 2;
  let top = targetCenterY - 90;
  let left = targetCenterX - width / 2;

  const clampedLeft = Math.min(
    Math.max(viewportPadding, left),
    window.innerWidth - width - viewportPadding,
  );
  const clampedTop = Math.min(
    Math.max(viewportPadding, top),
    window.innerHeight - 160 - viewportPadding,
  );

  shell.style.cssText = `
    position: fixed;
    top: ${clampedTop}px;
    left: ${clampedLeft}px;
    width: ${width}px;
    max-width: calc(100vw - ${viewportPadding * 2}px);
    padding: 12px;
    border-radius: 16px;
    background: rgba(255,255,255,0.94);
    border: 1px solid rgba(15,23,42,0.12);
    box-shadow: 0 18px 40px rgba(15,23,42,0.16);
    backdrop-filter: blur(16px);
    pointer-events: auto;
    z-index: 2147483646;
    box-sizing: border-box;
  `;

  return shell;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function stageComponentInsertion(
  item: RegistryItem,
  targetElement: HTMLElement,
  position: "inside" | "before" | "after",
  targetInfo: {
    filePath: string;
    line: number;
    col: number;
    tagName?: string;
    jsxPath?: import("@react-rewrite/shared").JSXStructuralPath;
  },
  variant?: { name: string; props: Record<string, string> },
): PaletteInsertEntry {
  const id = generateInsertId();
  const componentName = item.displayName.replace(/\s+/g, "");
  const registryKey = item.name.toLowerCase();

  // Create preview using inline styles from the user's actual CSS theme
  // Guard: "before"/"after" on <body> or <html> would corrupt layout — force "inside"
  const isRootElement = targetElement === document.body || targetElement === document.documentElement;
  const safePosition = (isRootElement && position !== "inside") ? "inside" : position;
  const element = createFloatingPreviewShell(targetElement, safePosition);
  element.setAttribute("data-react-rewrite-palette-insert", "true");
  element.setAttribute("data-palette-component", componentName);
  element.setAttribute("data-palette-file", targetInfo.filePath);
  element.setAttribute("data-palette-line", String(targetInfo.line));
  element.setAttribute("data-palette-col", String(targetInfo.col));

  const preview = createPalettePreviewElement(item.name, variant?.props);
  preview.style.pointerEvents = "auto";
  preview.style.width = "100%";
  preview.style.maxWidth = "100%";
  preview.style.boxSizing = "border-box";
  element.appendChild(preview);
  document.body.appendChild(element);

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
    position: safePosition,
    targetFilePath: targetInfo.filePath,
    targetLine: targetInfo.line,
    targetCol: targetInfo.col,
    targetTagName: targetInfo.tagName,
    targetJSXPath: targetInfo.jsxPath,
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
