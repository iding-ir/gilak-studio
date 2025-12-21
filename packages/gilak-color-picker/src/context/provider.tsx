import type { ReactNode } from "react";
import { useReducer } from "react";

import { ColorPickerContext } from "./context";
import { reducer } from "./reducer";
import type { State } from "./state";
import { initialState } from "./state";

export type ColorPickerProviderProps = Pick<
  State,
  "radiusCount" | "gridSize" | "borderWidth"
> & {
  children: ReactNode;
};

export const ColorPickerProvider = ({
  children,
  radiusCount = initialState.radiusCount,
  gridSize = initialState.gridSize,
  borderWidth = initialState.borderWidth,
}: ColorPickerProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    radiusCount,
    gridSize,
    borderWidth,
  });

  return (
    <ColorPickerContext.Provider value={{ state, dispatch }}>
      {children}
    </ColorPickerContext.Provider>
  );
};
