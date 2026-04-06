import { usePersistedReducer } from "@gilak/persist";
import { type ReactNode, useMemo } from "react";

import { FloatingWindowContext } from "./context";
import {
  createFloatingWindowPersistenceStorage,
  STATE_KEY,
} from "./persistence-schema";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type FloatingWindowProviderProps = {
  children: ReactNode;
};

export const FloatingWindowProvider = ({
  children,
}: FloatingWindowProviderProps) => {
  const storage = useMemo(() => createFloatingWindowPersistenceStorage(), []);
  const { state, dispatch } = usePersistedReducer({
    key: STATE_KEY,
    reducer,
    initialState,
    delayMs: 1000,
    storage,
  });

  return (
    <FloatingWindowContext.Provider value={{ state, dispatch }}>
      {children}
    </FloatingWindowContext.Provider>
  );
};
