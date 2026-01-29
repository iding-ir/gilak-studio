import { type History, history } from "@gilak/utils";

import type { CanvasElement } from "../types/canvas";

export type State = {
  elementsHistory: History<Map<string, CanvasElement>>;
};

export const initialState: State = {
  elementsHistory: history.createHistory(new Map()),
};
