import { type History, history } from "@gilak/utils";

import type {
  CanvasElement,
  CanvasElementBase,
  TextContent,
} from "../types/canvas";

export type State = {
  elementsHistory: History<Map<string, CanvasElement>>;
  focus: CanvasElementBase["id"][];
  selected: Set<CanvasElementBase["id"]>;
  text: { open: boolean; settings: TextContent };
};

export const initialState: State = {
  elementsHistory: history.createHistory(new Map()),
  focus: [],
  selected: new Set(),
  text: {
    open: false,
    settings: {
      text: "",
      fontFamily: "Arial",
      fontSize: 16,
      color: "#000000",
    },
  },
};
