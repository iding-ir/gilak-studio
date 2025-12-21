import type { FloatingWindowType } from "./types";

export type State = {
  windows: Record<string, FloatingWindowType>;
};

export const initialState: State = { windows: {} };
