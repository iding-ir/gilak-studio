import { setItemSync } from "@gilak/utils";

import { storageKey } from "../methods/storage-key";
import type { Position, Size } from "../types";
import type { Action, FloatingWindowMeta, State, Status } from "./types";

export const initialState: State = { windows: {}, topZIndex: 1000 };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "REGISTER": {
      const win = action.payload as FloatingWindowMeta;
      const incomingZ = win.z ?? state.topZIndex;
      const nextTop = Math.max(state.topZIndex, incomingZ);
      return {
        ...state,
        topZIndex: nextTop,
        windows: {
          ...state.windows,
          [win.id]: { ...state.windows[win.id], ...win },
        },
      };
    }
    case "UNREGISTER": {
      const id = action.payload.id;
      const rest = { ...state.windows };
      delete rest[id];
      return { ...state, windows: rest };
    }
    case "SET_STATUS": {
      const { id, status } = action.payload as { id: string; status: Status };
      const win = state.windows[id] || { id };
      setItemSync(storageKey(id), { ...win, status });

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...win, status } },
      };
    }
    case "SET_POSITION": {
      const { id, position } = action.payload as {
        id: string;
        position: Position;
      };
      const win = state.windows[id] || { id };
      setItemSync(storageKey(id), { ...win, position });

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...win, position } },
      };
    }
    case "SET_SIZE": {
      const { id, size } = action.payload as { id: string; size: Size };
      const win = state.windows[id] || { id };
      setItemSync(storageKey(id), { ...win, size });

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...win, size } },
      };
    }
    case "SET_DRAGGING": {
      const { id, dragging } = action.payload as {
        id: string;
        dragging: boolean;
      };
      const win = state.windows[id] || { id };

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...win, dragging } },
      };
    }
    case "SET_RESIZING": {
      const { id, resizing } = action.payload as {
        id: string;
        resizing: boolean;
      };
      const win = state.windows[id] || { id };

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...win, resizing } },
      };
    }
    case "BRING_TO_FRONT": {
      const { id } = action.payload as { id: string };
      const next = state.topZIndex + 1;
      const win = state.windows[id] || { id };
      setItemSync(storageKey(id), { ...win, z: next });

      return {
        ...state,
        topZIndex: next,
        windows: { ...state.windows, [id]: { ...win, z: next } },
      };
    }
    default:
      return state;
  }
}
