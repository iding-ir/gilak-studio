import type { CanvasLayer } from "../types";

export type State = {
  layers: CanvasLayer[];
};

export const initialState: State = {
  layers: [],
};
