// actions:
export type { Action } from "./actions";
export { actions } from "./actions";

// context:
export type { ContextType } from "./context";
export { FloatingWindowContext } from "./context";

// hook:
export { useFloatingWindowContext } from "./hook";

// provider:
export type { FloatingWindowProviderProps } from "./provider";
export { FloatingWindowProvider } from "./provider";

// reducer
export { reducer } from "./reducer";

// selectors:
export {
  hasMinimizedWindows,
  selectFloatingWindowById,
  selectFloatingWindows,
  selectMaximizedWindows,
  selectMinimizedWindows,
  selectOpenWindows,
} from "./selectors";

// state:
export type { State } from "./state";
export { initialState } from "./state";

// types:
export type { FloatingWindowType, Status } from "./types";
