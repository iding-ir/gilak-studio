import type { Dispatch } from "react";
import { createContext } from "react";

import type { Action } from "./actions";
import type { State } from "./state";
import { initialState } from "./state";

export type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const ColorPickerContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});
