/** Shape of a single item in the registry index (lightweight, for palette browsing). */
export interface RegistryItem {
  name: string;
  displayName: string;
  description: string;
  category: string;
  type: "component" | "block";
  variants?: Array<{ name: string; props: Record<string, string> }>;
  dependencies: string[];
  registryDependencies: string[];
}

/** Full item with source code (fetched on demand or from cache). */
export interface RegistryItemFull extends RegistryItem {
  files: Array<{ path: string; content: string; type: string }>;
}

/** Project configuration detected at startup. */
export interface ProjectConfig {
  componentDir: string;
  isTypeScript: boolean;
  pathAlias: string | null;
  packageManager: "pnpm" | "npm" | "yarn";
  projectRoot: string;
}

/** Abstract provider — v1 is shadcn, future providers implement this. */
export interface RegistryProvider {
  name: string;
  fetchIndex(): Promise<RegistryItem[]>;
  fetchItem(name: string): Promise<RegistryItemFull>;
  writeToProject(item: RegistryItemFull, config: ProjectConfig): Promise<WrittenFile[]>;
  detectExisting(config: ProjectConfig): Promise<string[]>;
}

export interface WrittenFile {
  sourcePath: string;
  importPath: string;
  exportNames: string[];
}
