// packages/overlay/src/tools/pointer.ts
// Pointer delegates entirely to selection.ts (Phase 1).
// No interaction layer handler needed — when Pointer is active,
// the interaction layer has pointer-events: none and selection.ts
// capture-phase listeners handle everything.
import { setEnabled } from "../selection.js";

export function activatePointer(): void {
  setEnabled(true);
}

export function deactivatePointer(): void {
  setEnabled(false);
}
