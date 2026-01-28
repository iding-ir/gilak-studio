import { type History, history } from "@gilak/utils";

import type { CanvasContent } from "../types/canvas";

export type State = {
  contentsHistory: History<Map<string, CanvasContent>>;
};

export const initialState: State = {
  contentsHistory: history.createHistory(new Map()),
};
