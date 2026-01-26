import type { ReactNode } from "react";
import { useReducer } from "react";

import { CanvasContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type CanvasProviderProps = {
  children: ReactNode;
};

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};
