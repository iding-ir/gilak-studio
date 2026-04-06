import {
  createIndexedDbStorageAdapter,
  usePersistedReducer,
} from "@gilak/persist";
import type { ReactNode } from "react";
import { useMemo } from "react";

import { ImageLibraryContext } from "./context";
import { deserializeState, serializeState, STATE_KEY } from "./persistence";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type ImageLibraryProviderProps = {
  children: ReactNode;
};

export const ImageLibraryProvider = ({
  children,
}: ImageLibraryProviderProps) => {
  const storage = useMemo(
    () =>
      createIndexedDbStorageAdapter({
        dbName: "gilak-studio",
        storeName: "image-library-state",
      }),
    [],
  );

  const { state, dispatch } = usePersistedReducer({
    key: STATE_KEY,
    reducer,
    initialState,
    delayMs: 300,
    serialize: serializeState,
    deserialize: deserializeState,
    storage,
  });

  return (
    <ImageLibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageLibraryContext.Provider>
  );
};
