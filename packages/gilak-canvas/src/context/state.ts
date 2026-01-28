import type { CanvasContent } from "../types/canvas";

export type State = {
  contents: Map<string, CanvasContent>;
};

export const initialState: State = {
  contents: new Map(),
};
