export interface PersistStorageAdapter {
  getItem<T = unknown>(key: string): Promise<T | null>;
  setItem(key: string, value: unknown): Promise<void>;
  removeItem?(key: string): Promise<void>;
  keysWithPrefix?(prefix: string): Promise<string[]>;
}

export interface SyncPersistStorageAdapter extends PersistStorageAdapter {
  getItemSync?<T = unknown>(key: string): T | null;
  setItemSync?(key: string, value: unknown): void;
  removeItemSync?(key: string): void;
  keysWithPrefixSync?(prefix: string): string[];
}

export interface IndexedDbStorageAdapterOptions {
  dbName?: string;
  storeName?: string;
}

export interface IndexedDbStateField<TState, TValue = unknown> {
  storeName: string | ((scopeKey: string) => string);
  key: string | ((scopeKey: string) => string);
  select: (state: TState) => TValue;
  merge: (state: TState, value: TValue | null) => TState;
  serialize?: (value: TValue) => unknown;
  deserialize?: (value: unknown) => TValue | null;
}

export interface IndexedDbStateCollection<TState, TItem = unknown> {
  storeName: string | ((scopeKey: string) => string);
  orderKey: string | ((scopeKey: string) => string);
  itemKeyPrefix: string | ((scopeKey: string) => string);
  select: (state: TState) => TItem[];
  merge: (state: TState, items: TItem[]) => TState;
  getItemKey: (item: TItem) => string;
  serialize?: (item: TItem) => unknown;
  deserialize?: (value: unknown, itemKey: string) => TItem | null;
  cleanupStaleKeys?: boolean;
}

export interface IndexedDbSchemaStorageAdapterOptions<TState> {
  dbName: string;
  initialState: TState;
  fields?: Array<IndexedDbStateField<TState, unknown>>;
  collections?: Array<IndexedDbStateCollection<TState, unknown>>;
  fallback?: (scopeKey: string) => Promise<TState | null>;
}
