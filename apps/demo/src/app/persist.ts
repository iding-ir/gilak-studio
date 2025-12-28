import type { Middleware } from "@reduxjs/toolkit";

interface PersistOptions<T> {
  key: string;
  whitelist?: (keyof T)[];
  throttleMs?: number;
}

export const createPersistMiddleware = <T extends Record<string, unknown>>({
  key,
  whitelist = [],
  throttleMs = 0,
}: PersistOptions<T>): Middleware<unknown, T> => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const middleware: Middleware<unknown, T> =
    (storeAPI) => (next) => (action) => {
      const result = next(action);

      const persist = () => {
        const state = storeAPI.getState();
        const toPersist: Partial<T> = {};
        whitelist.forEach((slice) => {
          if (state[slice] !== undefined) {
            toPersist[slice] = state[slice];
          }
        });

        try {
          localStorage.setItem(key, JSON.stringify(toPersist));
        } catch (err) {
          console.warn("Failed to persist state", err);
        }
      };

      if (throttleMs > 0) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(persist, throttleMs);
      } else {
        persist();
      }

      return result;
    };

  return middleware;
};

export const loadPersistedState = <T>(key: string): Partial<T> => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? (JSON.parse(serialized) as Partial<T>) : {};
  } catch {
    return {};
  }
};
