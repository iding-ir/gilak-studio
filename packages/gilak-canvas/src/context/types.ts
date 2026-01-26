import type { Dispatch } from "react";

import type { Action } from "./actions";
import type { State } from "./state";

export type ContextValue = {
  state: State;
  dispatch: Dispatch<Action>;
};
