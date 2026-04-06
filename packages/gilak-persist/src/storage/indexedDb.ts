import {
  getValue,
  listKeysWithPrefix,
  removeValue,
  setValue,
} from "@gilak/utils";

import type {
  IndexedDbStorageAdapterOptions,
  PersistStorageAdapter,
} from "./types";

const DEFAULT_DB_NAME = "gilak-persist";
const DEFAULT_STORE_NAME = "state";

export const createIndexedDbStorageAdapter = ({
  dbName = DEFAULT_DB_NAME,
  storeName = DEFAULT_STORE_NAME,
}: IndexedDbStorageAdapterOptions = {}): PersistStorageAdapter => ({
  getItem: <T = unknown>(key: string) => getValue<T>(dbName, storeName, key),
  setItem: (key: string, value: unknown) =>
    setValue(dbName, storeName, key, value),
  removeItem: (key: string) => removeValue(dbName, storeName, key),
  keysWithPrefix: (prefix: string) =>
    listKeysWithPrefix(dbName, storeName, prefix),
});
