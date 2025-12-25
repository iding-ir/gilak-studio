import type { ReactNode } from "react";
import { useReducer } from "react";

import { FloatingWindowContext } from "./context";
import { reducer } from "./reducer";
import { initialState } from "./state";

export type FloatingWindowProviderProps = {
  children: ReactNode;
};

export const FloatingWindowProvider = ({
  children,
}: FloatingWindowProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FloatingWindowContext.Provider value={{ state, dispatch }}>
      {children}
    </FloatingWindowContext.Provider>
  );
};
