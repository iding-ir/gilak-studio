import {
  getItem,
  getItemSync,
  keysWithPrefix,
  keysWithPrefixSync,
  removeItem,
  removeItemSync,
  setItem,
  setItemSync,
} from "@gilak/utils";

import type { SyncPersistStorageAdapter } from "./types";

export const localStorageAdapter: SyncPersistStorageAdapter = {
  getItem,
  getItemSync,
  setItem,
  setItemSync,
  removeItem,
  removeItemSync,
  keysWithPrefix,
  keysWithPrefixSync,
};
