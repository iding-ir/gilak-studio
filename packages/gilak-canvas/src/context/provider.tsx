import { usePersistedReducer } from "@gilak/persist";
import type { ReactNode } from "react";

import { CanvasContext } from "./context";
import { deserializeState, getStateKey, serializeState } from "./persistence";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type CanvasProviderProps = {
  id: string;
  children: ReactNode;
};

export const CanvasProvider = ({ id, children }: CanvasProviderProps) => {
  const { state, dispatch, lastSavedAt } = usePersistedReducer({
    key: getStateKey(id),
    reducer,
    initialState,
    delayMs: 1000,
    serialize: serializeState,
    deserialize: deserializeState,
  });

  return (
    <CanvasContext.Provider value={{ state, dispatch, lastSavedAt }}>
      {children}
    </CanvasContext.Provider>
  );
};
