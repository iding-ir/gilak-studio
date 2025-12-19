import type { ReactNode } from "react";
import { useReducer } from "react";

import { ResizableScreenContext } from "./context";
import { initialState, resizableScreenReducer } from "./reducers";
import type { ContextValue } from "./types";

export type ResizableScreenProviderProps = {
  children: ReactNode;
};

export const ResizableScreenProvider = ({
  children,
}: ResizableScreenProviderProps) => {
  const [state, dispatch] = useReducer(resizableScreenReducer, initialState);

  const value: ContextValue = {
    state,
    dispatch,
  };

  return (
    <ResizableScreenContext.Provider value={value}>
      {children}
    </ResizableScreenContext.Provider>
  );
};
