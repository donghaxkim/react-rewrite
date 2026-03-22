import type { PropertyDescriptor } from "@frameup/shared";

export interface PropertyControl {
  /** The DOM element to mount in the sidebar */
  element: HTMLElement;
  /** Update the displayed value for a property key */
  setValue(key: string, cssValue: string): void;
  /** Cleanup event listeners */
  destroy(): void;
}

export type OnPreview = (key: string, cssValue: string) => void;
export type OnCommit = () => void;
