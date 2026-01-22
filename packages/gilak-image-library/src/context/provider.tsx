import type { ReactNode } from "react";
import { useReducer } from "react";

import { ImageLibraryContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type ImageLibraryProviderProps = {
  children: ReactNode;
};

export const ImageLibraryProvider = ({
  children,
}: ImageLibraryProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ImageLibraryContext.Provider value={{ state, dispatch }}>
      {children}
    </ImageLibraryContext.Provider>
  );
};
