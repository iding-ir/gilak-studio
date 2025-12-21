import type { ReactNode } from "react";
import { useReducer } from "react";

import { FloatingWindows } from "../components/FloatingWindows";
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
      <FloatingWindows>{children}</FloatingWindows>
    </FloatingWindowContext.Provider>
  );
};
