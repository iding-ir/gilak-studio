import type { CanvasLayer } from "../types";

export type State = {
  layers: Map<string, CanvasLayer>;
};

export const initialState: State = {
  layers: new Map(),
};
