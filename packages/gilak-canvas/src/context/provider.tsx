import { usePersistedReducer } from "@gilak/persist";
import { type ReactNode, useMemo } from "react";

import { CanvasContext } from "./context";
import {
  createCanvasPersistenceStorage,
  getStateKey,
} from "./persistence-schema";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type CanvasProviderProps = {
  id: string;
  children: ReactNode;
  autoSave?: boolean;
};

export const CanvasProvider = ({
  id,
  children,
  autoSave = true,
}: CanvasProviderProps) => {
  const storage = useMemo(() => createCanvasPersistenceStorage(), []);
  const { state, dispatch, lastSavedAt } = usePersistedReducer({
    key: getStateKey(id),
    reducer,
    initialState,
    delayMs: 1000,
    enabled: autoSave,
    storage,
  });

  return (
    <CanvasContext.Provider value={{ state, dispatch, lastSavedAt }}>
      {children}
    </CanvasContext.Provider>
  );
};
