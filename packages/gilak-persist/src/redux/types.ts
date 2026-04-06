import type { PersistStorageAdapter } from "../storage";

export interface PersistSliceOption<T extends Record<string, unknown>> {
  key: keyof T;
  autoSave?: boolean;
}

export interface PersistOptions<T extends Record<string, unknown>> {
  key: string;
  slices?: Array<keyof T | PersistSliceOption<T>>;
  whitelist?: (keyof T)[];
  intervalMs?: number;
  throttleMs?: number;
  storage?: PersistStorageAdapter;
}
