import { usePersistedReducer } from "@gilak/persist";
import { type ReactNode, useMemo } from "react";

import { ImageLibraryContext } from "./context";
import {
  createImageLibraryPersistenceStorage,
  STATE_KEY,
} from "./persistence-schema";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type ImageLibraryProviderProps = {
  children: ReactNode;
  autoSave?: boolean;
};

export const ImageLibraryProvider = ({
  children,
  autoSave = true,
}: ImageLibraryProviderProps) => {
  const storage = useMemo(() => createImageLibraryPersistenceStorage(), []);
  const { state, dispatch } = usePersistedReducer({
    key: STATE_KEY,
    reducer,
    initialState,
    delayMs: 300,
    enabled: autoSave,
    storage,
  });

  return (
    <ImageLibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageLibraryContext.Provider>
  );
};
