import type { Dispatch, Reducer } from "react";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import { localStorageAdapter, type PersistStorageAdapter } from "../storage";
import { registerPersistClearer } from "./persistManager";

export interface UsePersistedReducerOptions<TState, TAction> {
  key: string;
  reducer: Reducer<TState, TAction>;
  initialState: TState;
  delayMs?: number;
  enabled?: boolean;
  onSave?: (savedAt: Date) => void;
  serialize?: (state: TState) => unknown;
  deserialize?: (value: unknown) => TState | null;
  storage?: PersistStorageAdapter;
}

export interface UsePersistedReducerReturn<TState, TAction> {
  state: TState;
  dispatch: Dispatch<TAction>;
  lastSavedAt: Date | null;
  clearPersistedState: () => Promise<void>;
}

type InternalAction<TState, TAction> =
  | {
      kind: "hydrate";
      payload: TState;
    }
  | {
      kind: "dispatch";
      action: TAction;
    };

export const usePersistedReducer = <TState, TAction>({
  key,
  reducer,
  initialState,
  delayMs = 0,
  enabled = true,
  onSave,
  serialize,
  deserialize,
  storage = localStorageAdapter,
}: UsePersistedReducerOptions<TState, TAction>): UsePersistedReducerReturn<
  TState,
  TAction
> => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const skipNextPersistRef = useRef(false);

  const [state, baseDispatch] = useReducer(
    (currentState: TState, action: InternalAction<TState, TAction>) => {
      if (action.kind === "hydrate") {
        return action.payload;
      }

      return reducer(currentState, action.action);
    },
    initialState,
  );

  const dispatch = useCallback<Dispatch<TAction>>((action) => {
    baseDispatch({ kind: "dispatch", action });
  }, []);

  const clearPersistedState = useCallback(async () => {
    try {
      skipNextPersistRef.current = true;
      await storage.removeItem?.(key);
      baseDispatch({
        kind: "hydrate",
        payload: initialState,
      });
      setLastSavedAt(null);
    } catch (error) {
      console.warn(
        `Failed to clear persisted reducer state for "${key}"`,
        error,
      );
      throw error;
    }
  }, [initialState, key, storage]);

  useEffect(
    () => registerPersistClearer(key, clearPersistedState),
    [clearPersistedState, key],
  );

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
        const persistedState = await storage.getItem<unknown>(key);

        if (!isActive) {
          return;
        }

        if (persistedState !== null) {
          const nextState = deserialize
            ? (deserialize(persistedState) ?? initialState)
            : (persistedState as TState);

          baseDispatch({
            kind: "hydrate",
            payload: nextState,
          });
        } else {
          baseDispatch({
            kind: "hydrate",
            payload: initialState,
          });
        }
      } catch (err) {
        if (!isActive) {
          return;
        }

        baseDispatch({
          kind: "hydrate",
          payload: initialState,
        });
        console.warn(
          `Failed to load persisted reducer state for "${key}"`,
          err,
        );
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
  }, [deserialize, enabled, initialState, key, storage]);

  useEffect(() => {
    if (!enabled || !isHydrated) {
      return;
    }

    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      return;
    }

    let isCancelled = false;

    const persist = async () => {
      try {
        const valueToPersist = serialize ? serialize(state) : state;

        await storage.setItem(key, valueToPersist);

        if (isCancelled) {
          return;
        }

        const savedAt = new Date();
        setLastSavedAt(savedAt);
        onSave?.(savedAt);
      } catch (err) {
        if (!isCancelled) {
          console.warn(
            `Failed to persist React reducer state for "${key}"`,
            err,
          );
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
  }, [delayMs, enabled, isHydrated, key, onSave, serialize, state, storage]);

  return { state, dispatch, lastSavedAt, clearPersistedState };
};
