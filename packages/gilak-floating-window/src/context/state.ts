import type { FloatingWindowType } from "./types";

export type State = {
  windows: Map<string, FloatingWindowType>;
  focused?: FloatingWindowType["id"];
};

export const initialState: State = {
  windows: new Map(),
  focused: undefined,
};
