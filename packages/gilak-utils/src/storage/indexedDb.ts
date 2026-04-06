export type StoredValue<T = unknown> = {
  key: string;
  value: T;
};

export const getIndexedDbFactory = (): IDBFactory => {
  if (typeof indexedDB === "undefined") {
    throw new Error("IndexedDB is not available in the current environment.");
  }

  return indexedDB;
};

export const openDatabase = async (
  dbName: string,
  storeName: string,
): Promise<IDBDatabase> => {
  const factory = getIndexedDbFactory();

  const openWithVersion = (version?: number) =>
    new Promise<IDBDatabase>((resolve, reject) => {
      const request = version
        ? factory.open(dbName, version)
        : factory.open(dbName);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: "key" });
        }
      };

      request.onsuccess = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(storeName)) {
          const nextVersion = db.version + 1;
          db.close();

          void openWithVersion(nextVersion).then(resolve, reject);
          return;
        }

        resolve(db);
      };

      request.onerror = () => {
        reject(
          new Error(
            `Failed to open IndexedDB database "${dbName}": ${String(request.error)}`,
          ),
        );
      };
    });

  return openWithVersion();
};

export const getValue = async <T>(
  dbName: string,
  storeName: string,
  key: string,
): Promise<T | null> => {
  const db = await openDatabase(dbName, storeName);

  return new Promise<T | null>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => {
      const result = request.result as StoredValue<T> | undefined;
      resolve(result?.value ?? null);
    };

    request.onerror = () => {
      reject(
        new Error(
          `Failed to read IndexedDB key "${key}": ${String(request.error)}`,
        ),
      );
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
};

export const setValue = async (
  dbName: string,
  storeName: string,
  key: string,
  value: unknown,
): Promise<void> => {
  const db = await openDatabase(dbName, storeName);

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put({ key, value } satisfies StoredValue);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(
        new Error(
          `Failed to write IndexedDB key "${key}": ${String(request.error)}`,
        ),
      );
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
};

export const removeValue = async (
  dbName: string,
  storeName: string,
  key: string,
): Promise<void> => {
  const db = await openDatabase(dbName, storeName);

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(
        new Error(
          `Failed to remove IndexedDB key "${key}": ${String(request.error)}`,
        ),
      );
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
};

export const listKeysWithPrefix = async (
  dbName: string,
  storeName: string,
  prefix: string,
): Promise<string[]> => {
  const db = await openDatabase(dbName, storeName);

  return new Promise<string[]>((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.openCursor();
    const keys: string[] = [];

    request.onsuccess = () => {
      const cursor = request.result;

      if (!cursor) {
        resolve(keys);
        return;
      }

      if (typeof cursor.key === "string" && cursor.key.startsWith(prefix)) {
        keys.push(cursor.key);
      }

      cursor.continue();
    };

    request.onerror = () => {
      reject(
        new Error(
          `Failed to list IndexedDB keys with prefix "${prefix}": ${String(request.error)}`,
        ),
      );
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onabort = () => {
      db.close();
    };
  });
};
