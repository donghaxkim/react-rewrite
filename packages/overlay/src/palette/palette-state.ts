import type { BatchOperation } from "@react-rewrite/shared";

export interface PaletteInsertEntry {
  id: string;
  componentName: string;
  registryName: string;
  element: HTMLElement;
  targetElement: HTMLElement;
  position: "inside" | "before" | "after";
  targetFilePath: string;
  targetLine: number;
  targetCol: number;
  importPath: string;
  importNames: string[];
  jsxString: string;
  props: Record<string, string>;
  stagedClassChanges: string[];
  fidelityTier: 1 | 2 | 3;
}

let paletteInserts: Map<string, PaletteInsertEntry> = new Map();
let idCounter = 0;

type PaletteChangeListener = () => void;
let listeners: PaletteChangeListener[] = [];

function notify(): void {
  listeners.forEach((fn) => fn());
}

export function onPaletteChange(fn: PaletteChangeListener): () => void {
  listeners.push(fn);
  return () => { listeners = listeners.filter((f) => f !== fn); };
}

export function generateInsertId(): string {
  return `palette-insert-${++idCounter}`;
}

export function addPaletteInsert(entry: PaletteInsertEntry): void {
  paletteInserts.set(entry.id, entry);
  notify();
}

export function removePaletteInsert(id: string): PaletteInsertEntry | undefined {
  const entry = paletteInserts.get(id);
  if (!entry) return undefined;
  if (entry.element.parentNode) {
    entry.element.parentNode.removeChild(entry.element);
  }
  paletteInserts.delete(id);
  notify();
  return entry;
}

export function getPaletteInserts(): Map<string, PaletteInsertEntry> {
  return paletteInserts;
}

export function clearPaletteInserts(): void {
  for (const [, entry] of paletteInserts) {
    if (entry.element.parentNode) {
      entry.element.parentNode.removeChild(entry.element);
    }
  }
  paletteInserts.clear();
  notify();
}

export function buildPaletteOperations(): BatchOperation[] {
  const ops: BatchOperation[] = [];
  for (const [, entry] of paletteInserts) {
    ops.push({
      op: "insertComponent",
      file: entry.targetFilePath,
      line: entry.targetLine,
      col: entry.targetCol,
      position: entry.position,
      componentName: entry.componentName,
      importPath: entry.importPath,
      importNames: entry.importNames,
      jsxString: entry.jsxString,
      registryName: entry.registryName,
    } as BatchOperation);
  }
  return ops;
}
