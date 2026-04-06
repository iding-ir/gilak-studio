import {
  createIndexedDbStorageAdapter,
  usePersistedReducer,
} from "@gilak/persist";
import { type ReactNode, useMemo } from "react";

import { CanvasContext } from "./context";
import { deserializeState, getStateKey, serializeState } from "./persistence";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type CanvasProviderProps = {
  id: string;
  children: ReactNode;
};

export const CanvasProvider = ({ id, children }: CanvasProviderProps) => {
  const storage = useMemo(
    () =>
      createIndexedDbStorageAdapter({
        dbName: "gilak-studio",
        storeName: "canvas-state",
      }),
    [],
  );

  const { state, dispatch, lastSavedAt } = usePersistedReducer({
    key: getStateKey(id),
    reducer,
    initialState,
    delayMs: 1000,
    serialize: serializeState,
    deserialize: deserializeState,
    storage,
  });

  return (
    <CanvasContext.Provider value={{ state, dispatch, lastSavedAt }}>
      {children}
    </CanvasContext.Provider>
  );
};
