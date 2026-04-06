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
