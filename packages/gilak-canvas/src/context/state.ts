import { type History, history } from "@gilak/utils";

import type { CanvasElement, CanvasElementBase } from "../types/canvas";

export type State = {
  elementsHistory: History<Map<string, CanvasElement>>;
  focus: CanvasElementBase["id"][];
  selected: Set<CanvasElementBase["id"]>;
};

export const initialState: State = {
  elementsHistory: history.createHistory(new Map()),
  focus: [],
  selected: new Set(),
};
