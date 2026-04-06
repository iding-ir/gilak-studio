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
  autoSave?: boolean;
};

export const FloatingWindowProvider = ({
  children,
  autoSave = true,
}: FloatingWindowProviderProps) => {
  const storage = useMemo(() => createFloatingWindowPersistenceStorage(), []);
  const { state, dispatch } = usePersistedReducer({
    key: STATE_KEY,
    reducer,
    initialState,
    delayMs: 1000,
    enabled: autoSave,
    storage,
  });

  return (
    <FloatingWindowContext.Provider value={{ state, dispatch }}>
      {children}
    </FloatingWindowContext.Provider>
  );
};
