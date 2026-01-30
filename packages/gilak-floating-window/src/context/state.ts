import type { FloatingWindowType } from "./types";

export type State = {
  windows: Map<string, FloatingWindowType>;
  focus: FloatingWindowType["id"][];
};

export const initialState: State = {
  windows: new Map(),
  focus: [],
};
