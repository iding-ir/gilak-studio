import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { localStorageAdapter, type PersistStorageAdapter } from "../storage";

export interface UsePersistedStateOptions<T> {
  key: string;
  initialState: T;
  delayMs?: number;
  enabled?: boolean;
  onSave?: (savedAt: Date) => void;
  storage?: PersistStorageAdapter;
}

export interface UsePersistedStateReturn<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  lastSavedAt: Date | null;
}

export const usePersistedState = <T>({
  key,
  initialState,
  delayMs = 0,
  enabled = true,
  onSave,
  storage = localStorageAdapter,
}: UsePersistedStateOptions<T>): UsePersistedStateReturn<T> => {
  const [state, setState] = useState<T>(() => initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    let isActive = true;

    const hydrate = async () => {
      if (!enabled) {
        if (isActive) {
          setIsHydrated(true);
        }

        return;
      }

      try {
        const persistedState = await storage.getItem<T>(key);

        if (!isActive) {
          return;
        }

        if (persistedState !== null) {
          setState(persistedState);
        } else {
          setState(initialState);
        }
      } catch (err) {
        if (!isActive) {
          return;
        }

        setState(initialState);
        console.warn(`Failed to load persisted state for "${key}"`, err);
      } finally {
        if (isActive) {
          setIsHydrated(true);
        }
      }
    };

    setIsHydrated(false);
    setLastSavedAt(null);
    void hydrate();

    return () => {
      isActive = false;
    };
  }, [enabled, initialState, key, storage]);

  useEffect(() => {
    if (!enabled || !isHydrated) {
      return;
    }

    let isCancelled = false;

    const persist = async () => {
      try {
        await storage.setItem(key, state);

        if (isCancelled) {
          return;
        }

        const savedAt = new Date();
        setLastSavedAt(savedAt);
        onSave?.(savedAt);
      } catch (err) {
        if (!isCancelled) {
          console.warn(`Failed to persist React state for "${key}"`, err);
        }
      }
    };

    if (delayMs <= 0) {
      void persist();

      return () => {
        isCancelled = true;
      };
    }

    const timeout = setTimeout(() => {
      void persist();
    }, delayMs);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [delayMs, enabled, isHydrated, key, onSave, state, storage]);

  return { state, setState, lastSavedAt };
};
