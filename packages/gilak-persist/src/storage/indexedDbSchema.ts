import {
  getValue,
  listKeysWithPrefix,
  removeValue,
  setValue,
} from "@gilak/utils";

import type {
  IndexedDbSchemaStorageAdapterOptions,
  IndexedDbStateCollection,
  IndexedDbStateField,
  PersistStorageAdapter,
} from "./types";

export const defineIndexedDbField = <TState, TValue>(
  field: IndexedDbStateField<TState, TValue>,
): IndexedDbStateField<TState, unknown> =>
  field as unknown as IndexedDbStateField<TState, unknown>;

export const defineIndexedDbCollection = <TState, TItem>(
  collection: IndexedDbStateCollection<TState, TItem>,
): IndexedDbStateCollection<TState, unknown> =>
  collection as unknown as IndexedDbStateCollection<TState, unknown>;

const resolveStoreName = (
  scopeKey: string,
  storeName: string | ((scopeKey: string) => string),
) => {
  if (typeof storeName === "function") {
    return storeName(scopeKey);
  }

  return storeName;
};

const resolveScopedKey = (
  scopeKey: string,
  key: string | ((scopeKey: string) => string),
) => {
  if (typeof key === "function") {
    return key(scopeKey);
  }

  return scopeKey ? `${scopeKey}:${key}` : key;
};

const readField = async <TState, TValue>(
  dbName: string,
  scopeKey: string,
  field: IndexedDbStateField<TState, TValue>,
) => {
  const storeName = resolveStoreName(scopeKey, field.storeName);
  const rawValue = await getValue<unknown>(
    dbName,
    storeName,
    resolveScopedKey(scopeKey, field.key),
  );

  if (rawValue === null) {
    return null;
  }

  return field.deserialize
    ? (field.deserialize(rawValue) ?? null)
    : (rawValue as TValue);
};

const readCollection = async <TState, TItem>(
  dbName: string,
  scopeKey: string,
  collection: IndexedDbStateCollection<TState, TItem>,
) => {
  const storeName = resolveStoreName(scopeKey, collection.storeName);
  const orderKey = resolveScopedKey(scopeKey, collection.orderKey);
  const itemKeyPrefix = resolveScopedKey(scopeKey, collection.itemKeyPrefix);
  const persistedOrder = await getValue<string[]>(dbName, storeName, orderKey);

  if (!Array.isArray(persistedOrder)) {
    return {
      hasPersistedValue: persistedOrder !== null,
      items: [] as TItem[],
    };
  }

  const items = await Promise.all(
    persistedOrder
      .filter((itemId): itemId is string => typeof itemId === "string")
      .map(async (itemId) => {
        const rawItem = await getValue<unknown>(
          dbName,
          storeName,
          `${itemKeyPrefix}${itemId}`,
        );

        if (rawItem === null) {
          return null;
        }

        return collection.deserialize
          ? (collection.deserialize(rawItem, itemId) ?? null)
          : (rawItem as TItem);
      }),
  );

  return {
    hasPersistedValue: true,
    items: items.filter((item) => item !== null) as TItem[],
  };
};

const writeField = async <TState, TValue>(
  dbName: string,
  scopeKey: string,
  field: IndexedDbStateField<TState, TValue>,
  state: TState,
) => {
  const value = field.select(state);
  const persistedValue = field.serialize ? field.serialize(value) : value;

  const storeName = resolveStoreName(scopeKey, field.storeName);

  await setValue(
    dbName,
    storeName,
    resolveScopedKey(scopeKey, field.key),
    persistedValue,
  );
};

const writeCollection = async <TState, TItem>(
  dbName: string,
  scopeKey: string,
  collection: IndexedDbStateCollection<TState, TItem>,
  state: TState,
) => {
  const storeName = resolveStoreName(scopeKey, collection.storeName);
  const items = collection.select(state);
  const itemKeyPrefix = resolveScopedKey(scopeKey, collection.itemKeyPrefix);
  const orderKey = resolveScopedKey(scopeKey, collection.orderKey);
  const itemIds = items.map((item) => collection.getItemKey(item));
  const nextKeys = new Set(
    itemIds.map((itemId) => `${itemKeyPrefix}${itemId}`),
  );

  await Promise.all([
    setValue(dbName, storeName, orderKey, itemIds),
    ...items.map((item) =>
      setValue(
        dbName,
        storeName,
        `${itemKeyPrefix}${collection.getItemKey(item)}`,
        collection.serialize ? collection.serialize(item) : item,
      ),
    ),
  ]);

  if (collection.cleanupStaleKeys === false) {
    return;
  }

  const existingKeys = await listKeysWithPrefix(
    dbName,
    storeName,
    itemKeyPrefix,
  );
  const staleKeys = existingKeys.filter((key) => !nextKeys.has(key));

  await Promise.all(
    staleKeys.map((key) => removeValue(dbName, storeName, key)),
  );
};

const removeCollection = async <TState, TItem>(
  dbName: string,
  scopeKey: string,
  collection: IndexedDbStateCollection<TState, TItem>,
) => {
  const storeName = resolveStoreName(scopeKey, collection.storeName);
  const orderKey = resolveScopedKey(scopeKey, collection.orderKey);
  const itemKeyPrefix = resolveScopedKey(scopeKey, collection.itemKeyPrefix);
  const existingKeys = await listKeysWithPrefix(
    dbName,
    storeName,
    itemKeyPrefix,
  );

  await Promise.all([
    removeValue(dbName, storeName, orderKey),
    ...existingKeys.map((key) => removeValue(dbName, storeName, key)),
  ]);
};

export const createIndexedDbSchemaStorageAdapter = <TState>({
  dbName,
  initialState,
  fields = [],
  collections = [],
  fallback,
}: IndexedDbSchemaStorageAdapterOptions<TState>): PersistStorageAdapter => ({
  getItem: async <T = unknown>(scopeKey: string) => {
    const fieldValues = await Promise.all(
      fields.map(async (field) => ({
        field,
        value: await readField(dbName, scopeKey, field),
      })),
    );
    const collectionValues = await Promise.all(
      collections.map(async (collection) => ({
        collection,
        ...(await readCollection(dbName, scopeKey, collection)),
      })),
    );

    const hasPersistedValue =
      fieldValues.some(({ value }) => value !== null) ||
      collectionValues.some(({ hasPersistedValue }) => hasPersistedValue);

    if (!hasPersistedValue) {
      return (fallback ? await fallback(scopeKey) : null) as T | null;
    }

    let nextState = initialState;

    for (const { field, value } of fieldValues) {
      nextState = field.merge(nextState, value);
    }

    for (const { collection, items } of collectionValues) {
      nextState = collection.merge(nextState, items);
    }

    return nextState as unknown as T;
  },
  setItem: async (scopeKey, value) => {
    const state = value as TState;

    await Promise.all([
      ...fields.map((field) => writeField(dbName, scopeKey, field, state)),
      ...collections.map((collection) =>
        writeCollection(dbName, scopeKey, collection, state),
      ),
    ]);
  },
  removeItem: async (scopeKey) => {
    await Promise.all([
      ...fields.map((field) =>
        removeValue(
          dbName,
          resolveStoreName(scopeKey, field.storeName),
          resolveScopedKey(scopeKey, field.key),
        ),
      ),
      ...collections.map((collection) =>
        removeCollection(dbName, scopeKey, collection),
      ),
    ]);
  },
});
