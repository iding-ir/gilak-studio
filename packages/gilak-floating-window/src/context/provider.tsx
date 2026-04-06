import { usePersistedReducer } from "@gilak/persist";
import type { ReactNode } from "react";

import { FloatingWindowContext } from "./context";
import { deserializeState, serializeState, STATE_KEY } from "./persistence";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type FloatingWindowProviderProps = {
  children: ReactNode;
};

export const FloatingWindowProvider = ({
  children,
}: FloatingWindowProviderProps) => {
  const { state, dispatch } = usePersistedReducer({
    key: STATE_KEY,
    reducer,
    initialState,
    delayMs: 1000,
    serialize: serializeState,
    deserialize: deserializeState,
  });

  return (
    <FloatingWindowContext.Provider value={{ state, dispatch }}>
      {children}
    </FloatingWindowContext.Provider>
  );
};
