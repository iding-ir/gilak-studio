import type { Middleware } from "@reduxjs/toolkit";

import { registerPersistClearer } from "../react/persistManager";
import {
  localStorageAdapter,
  type PersistStorageAdapter,
  type SyncPersistStorageAdapter,
} from "../storage";
import type { PersistOptions, PersistSliceOption } from "./types";

const normalizeSlices = <T extends Record<string, unknown>>(
  slices?: Array<keyof T | PersistSliceOption<T>>,
  whitelist?: (keyof T)[],
): PersistSliceOption<T>[] => {
  const selectedSlices = slices ?? whitelist ?? [];

  return selectedSlices.map((slice) => {
    if (typeof slice === "object" && slice !== null) {
      return {
        autoSave: false,
        ...slice,
      };
    }

    return {
      key: slice,
      autoSave: false,
    };
  });
};

const pickSlices = <T extends Record<string, unknown>>(
  state: T,
  slices: (keyof T)[],
): Partial<T> => {
  const persistedState: Partial<T> = {};

  slices.forEach((slice) => {
    if (state[slice] !== undefined) {
      persistedState[slice] = state[slice];
    }
  });

  return persistedState;
};

const persistState = async <T extends Record<string, unknown>>(
  key: string,
  persistedState: Partial<T>,
  serializedState: string,
  onPersisted: (value: string) => void,
  storage: PersistStorageAdapter,
) => {
  await storage.setItem(key, persistedState);
  onPersisted(serializedState);
};

export const createPersistMiddleware = <T extends Record<string, unknown>>({
  key,
  slices,
  whitelist,
  intervalMs,
  throttleMs,
  storage = localStorageAdapter,
}: PersistOptions<T>): Middleware<unknown, T> => {
  const configuredSlices = normalizeSlices(slices, whitelist);
  const sliceKeys = configuredSlices.map(({ key: sliceKey }) => sliceKey);
  const delay = intervalMs ?? throttleMs ?? 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastSerializedState = "";

  registerPersistClearer(`redux:${key}`, async () => {
    await storage.removeItem?.(key);
  });

  const middleware: Middleware<unknown, T> =
    (storeAPI) => (next) => (action) => {
      const previousState = storeAPI.getState();
      const result = next(action);

      if (configuredSlices.length === 0) {
        return result;
      }

      const nextState = storeAPI.getState();
      const changedSlices = configuredSlices.filter(
        ({ key: sliceKey }) => previousState[sliceKey] !== nextState[sliceKey],
      );

      if (changedSlices.length === 0) {
        return result;
      }

      const persist = () => {
        const state = storeAPI.getState();
        const persistedState = pickSlices(state, sliceKeys);

        try {
          const serializedState = JSON.stringify(persistedState);

          if (serializedState === lastSerializedState) {
            return;
          }

          void persistState(
            key,
            persistedState,
            serializedState,
            (value) => {
              lastSerializedState = value;
            },
            storage,
          ).catch((err) => {
            console.warn(`Failed to persist state for "${key}"`, err);
          });
        } catch (err) {
          console.warn(`Failed to persist state for "${key}"`, err);
        }
      };

      const hasImmediateChanges = changedSlices.some(
        ({ autoSave }) => !autoSave,
      );

      if (hasImmediateChanges || delay <= 0) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        persist();
        return result;
      }

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        timeout = null;
        persist();
      }, delay);

      return result;
    };

  return middleware;
};

export const loadPersistedState = <T>(
  key: string,
  storage: SyncPersistStorageAdapter = localStorageAdapter,
): Partial<T> => {
  try {
    if (!storage.getItemSync) {
      console.warn(
        `Synchronous persisted state loading is not supported for "${key}" by the configured storage adapter.`,
      );
      return {};
    }

    return storage.getItemSync<Partial<T>>(key) ?? {};
  } catch {
    return {};
  }
};

export const loadPersistedStateAsync = async <T>(
  key: string,
  storage: PersistStorageAdapter = localStorageAdapter,
): Promise<Partial<T>> => {
  try {
    return (await storage.getItem<Partial<T>>(key)) ?? {};
  } catch {
    return {};
  }
};
