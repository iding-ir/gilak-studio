import { getItem, setItemSync } from "@gilak/utils";
import type { Dispatch, Reducer } from "react";
import { useCallback, useEffect, useReducer, useState } from "react";

export interface UsePersistedReducerOptions<TState, TAction> {
  key: string;
  reducer: Reducer<TState, TAction>;
  initialState: TState;
  delayMs?: number;
  enabled?: boolean;
  onSave?: (savedAt: Date) => void;
  serialize?: (state: TState) => unknown;
  deserialize?: (value: unknown) => TState | null;
}

export interface UsePersistedReducerReturn<TState, TAction> {
  state: TState;
  dispatch: Dispatch<TAction>;
  lastSavedAt: Date | null;
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
}: UsePersistedReducerOptions<TState, TAction>): UsePersistedReducerReturn<
  TState,
  TAction
> => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

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
        const persistedState = await getItem<unknown>(key);

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
  }, [deserialize, enabled, initialState, key]);

  useEffect(() => {
    if (!enabled || !isHydrated) {
      return;
    }

    const persist = () => {
      try {
        const valueToPersist = serialize ? serialize(state) : state;

        setItemSync(key, valueToPersist);

        const savedAt = new Date();
        setLastSavedAt(savedAt);
        onSave?.(savedAt);
      } catch (err) {
        console.warn(`Failed to persist React reducer state for "${key}"`, err);
      }
    };

    if (delayMs <= 0) {
      persist();
      return;
    }

    const timeout = setTimeout(persist, delayMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [delayMs, enabled, isHydrated, key, onSave, serialize, state]);

  return { state, dispatch, lastSavedAt };
};
