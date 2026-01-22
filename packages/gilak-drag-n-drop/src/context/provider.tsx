import type { ReactNode } from "react";
import { useReducer } from "react";

import { DragNDropContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type DragNDropProviderProps = {
  children: ReactNode;
};

export const DragNDropProvider = ({ children }: DragNDropProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DragNDropContext.Provider value={{ state, dispatch }}>
      {children}
    </DragNDropContext.Provider>
  );
};
