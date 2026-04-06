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
};

export const ImageLibraryProvider = ({
  children,
}: ImageLibraryProviderProps) => {
  const storage = useMemo(() => createImageLibraryPersistenceStorage(), []);
  const { state, dispatch } = usePersistedReducer({
    key: STATE_KEY,
    reducer,
    initialState,
    delayMs: 300,
    storage,
  });

  return (
    <ImageLibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageLibraryContext.Provider>
  );
};
