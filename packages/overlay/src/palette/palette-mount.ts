import type { RegistryItem } from "@react-rewrite/shared";
import { addPaletteInsert, generateInsertId, type PaletteInsertEntry } from "./palette-state.js";

// Default JSX strings for common shadcn components (what gets inserted into source code)
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

// Default import names for common components
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

function applyVariantProps(jsxString: string, componentName: string, props: Record<string, string>): string {
  const propsStr = Object.entries(props)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  if (!propsStr) return jsxString;

  // Replace opening self-closing tag: <ComponentName /> -> <ComponentName key="val" />
  const selfClosingRe = new RegExp(`(<${componentName})(\\s*/>)`);
  if (selfClosingRe.test(jsxString)) {
    return jsxString.replace(selfClosingRe, `$1 ${propsStr}$2`);
  }

  // Replace opening tag: <ComponentName> -> <ComponentName key="val">
  const openTagRe = new RegExp(`(<${componentName})(>)`);
  return jsxString.replace(openTagRe, `$1 ${propsStr}$2`);
}

export function stageComponentInsertion(
  item: RegistryItem,
  targetElement: HTMLElement,
  position: "inside" | "before" | "after",
  targetInfo: { filePath: string; line: number; col: number },
  variant?: { name: string; props: Record<string, string> },
): PaletteInsertEntry {
  const id = generateInsertId();

  // Component name for JSX tag: strip spaces
  const componentName = item.displayName.replace(/\s+/g, "");

  // Create placeholder DOM element
  const element = document.createElement("div");
  element.setAttribute("data-react-rewrite-palette-insert", "true");
  element.style.cssText = [
    "border: 1px dashed rgba(99, 102, 241, 0.5)",
    "border-radius: 6px",
    "padding: 12px 16px",
    "background: rgba(99, 102, 241, 0.05)",
    "color: rgba(99, 102, 241, 0.8)",
    "font-size: 13px",
    "min-height: 32px",
    "display: flex",
    "align-items: center",
    "gap: 8px",
  ].join("; ");
  element.textContent = `<${componentName} />`;

  // Insert into DOM based on position
  if (position === "inside") {
    targetElement.appendChild(element);
  } else if (position === "before") {
    targetElement.parentNode!.insertBefore(element, targetElement);
  } else {
    // after
    targetElement.parentNode!.insertBefore(element, targetElement.nextSibling);
  }

  // Build JSX string
  const registryKey = item.name.toLowerCase();
  let jsxString = DEFAULT_JSX[registryKey] ?? `<${componentName} />`;

  // Apply variant props to opening tag if provided
  if (variant && Object.keys(variant.props).length > 0) {
    jsxString = applyVariantProps(jsxString, componentName, variant.props);
  }

  // Get import names
  const importNames = DEFAULT_IMPORTS[registryKey] ?? [componentName];

  // Build the import path based on convention (shadcn style: @/components/ui/<name>)
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
