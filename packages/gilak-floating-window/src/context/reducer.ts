import type { Action } from "./actions";
import type { State } from "./state";

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "REGISTER": {
      const { id } = payload;
      const newWindows = new Map(state.windows);

      return {
        ...state,
        windows: newWindows.set(id, {
          ...state.windows.get(id),
          ...payload,
        }),
      };
    }
    case "UNREGISTER": {
      const { id } = payload;
      const newWindows = new Map(state.windows);

      newWindows.delete(id);

      return { ...state, windows: newWindows };
    }
    case "SET_TITLE": {
      const { id, title } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);

      if (!window) return state;

      return { ...state, windows: newWindows.set(id, { ...window, title }) };
    }
    case "SET_STATUS": {
      const { id, status } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);

      if (!window) return state;

      return { ...state, windows: newWindows.set(id, { ...window, status }) };
    }
    case "SET_POSITION": {
      const { id, position } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);

      if (!window) return state;

      return { ...state, windows: newWindows.set(id, { ...window, position }) };
    }
    case "SET_SIZE": {
      const { id, size } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);

      if (!window) return state;

      return { ...state, windows: newWindows.set(id, { ...window, size }) };
    }
    case "SET_DRAGGING": {
      const { id, dragging } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);

      if (!window) return state;

      return { ...state, windows: newWindows.set(id, { ...window, dragging }) };
    }
    case "SET_RESIZING": {
      const { id, resizing } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);

      if (!window) return state;

      return { ...state, windows: newWindows.set(id, { ...window, resizing }) };
    }
    case "SET_FOCUSED": {
      const { id } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);
      const zIndexes = Array.from(state.windows.values()).map((w) => w.zIndex);
      const zIndex = Math.max(...zIndexes) + 1;

      if (!window) return state;

      return { ...state, windows: newWindows.set(id, { ...window, zIndex }) };
    }
    default: {
      return state;
    }
  }
};
