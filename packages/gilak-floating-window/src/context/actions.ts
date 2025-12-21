import type { Position, Size } from "../types";
import type { FloatingWindowType, Status } from "./types";

export type Action =
  | { type: "REGISTER"; payload: FloatingWindowType }
  | { type: "UNREGISTER"; payload: { id: string } }
  | { type: "SET_STATUS"; payload: { id: string; status: Status } }
  | { type: "SET_POSITION"; payload: { id: string; position: Position } }
  | { type: "SET_SIZE"; payload: { id: string; size: Size } }
  | { type: "SET_DRAGGING"; payload: { id: string; dragging: boolean } }
  | { type: "SET_RESIZING"; payload: { id: string; resizing: boolean } }
  | { type: "BRING_TO_FRONT"; payload: { id: string } };

const registerFloatingWindow = (payload: FloatingWindowType): Action => ({
  type: "REGISTER",
  payload,
});

const unregisterFloatingWindow = (id: string): Action => ({
  type: "UNREGISTER",
  payload: { id },
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

const bringFloatingWindowToFront = (id: string): Action => ({
  type: "BRING_TO_FRONT",
  payload: { id },
});

const actions = {
  registerFloatingWindow,
  unregisterFloatingWindow,
  setFloatingWindowStatus,
  setFloatingWindowPosition,
  setFloatingWindowSize,
  setFloatingWindowDragging,
  setFloatingWindowResizing,
  bringFloatingWindowToFront,
};

export { actions };
