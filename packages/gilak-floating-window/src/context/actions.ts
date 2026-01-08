import type { Position, Size } from "../types";
import type { FloatingWindowType, Status } from "./types";

export type Action =
  | { type: "REGISTER"; payload: FloatingWindowType }
  | { type: "UNREGISTER"; payload: { id: string } }
  | { type: "SET_TITLE"; payload: { id: string; title: string } }
  | { type: "SET_STATUS"; payload: { id: string; status: Status } }
  | { type: "SET_POSITION"; payload: { id: string; position: Position } }
  | { type: "SET_SIZE"; payload: { id: string; size: Size } }
  | { type: "SET_DRAGGING"; payload: { id: string; dragging: boolean } }
  | { type: "SET_RESIZING"; payload: { id: string; resizing: boolean } }
  | { type: "SET_FOCUSED"; payload: { id: string } };

const registerFloatingWindow = (payload: FloatingWindowType): Action => ({
  type: "REGISTER",
  payload,
});

const unregisterFloatingWindow = (id: string): Action => ({
  type: "UNREGISTER",
  payload: { id },
});

const setFloatingWindowTitle = (id: string, title: string): Action => ({
  type: "SET_TITLE",
  payload: { id, title },
});

const setFloatingWindowStatus = (id: string, status: Status): Action => ({
  type: "SET_STATUS",
  payload: { id, status },
});

const setFloatingWindowPosition = (id: string, position: Position): Action => ({
  type: "SET_POSITION",
  payload: { id, position },
});

const setFloatingWindowSize = (id: string, size: Size): Action => ({
  type: "SET_SIZE",
  payload: { id, size },
});

const setFloatingWindowDragging = (id: string, dragging: boolean): Action => ({
  type: "SET_DRAGGING",
  payload: { id, dragging },
});

const setFloatingWindowResizing = (id: string, resizing: boolean): Action => ({
  type: "SET_RESIZING",
  payload: { id, resizing },
});

const focusFloatingWindow = (id: string): Action => ({
  type: "SET_FOCUSED",
  payload: { id },
});

const actions = {
  registerFloatingWindow,
  unregisterFloatingWindow,
  setFloatingWindowTitle,
  setFloatingWindowStatus,
  setFloatingWindowPosition,
  setFloatingWindowSize,
  setFloatingWindowDragging,
  setFloatingWindowResizing,
  focusFloatingWindow,
};

export { actions };
