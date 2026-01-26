import type { Dispatch } from "react";

import type { CanvasLayer } from "../types";
import type { Action } from "./actions";

export type CanvasState = {
  layers: CanvasLayer[];
};

export type ContextValue = {
  state: CanvasState;
  dispatch: Dispatch<Action>;
};
