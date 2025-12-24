import type { Action } from "./actions";
import type { State } from "./state";

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "REGISTER": {
      const { id } = payload;

      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], ...payload },
        },
      };
    }
    case "UNREGISTER": {
      const { id } = payload;
      const rest = { ...state.windows };
      delete rest[id];

      return { ...state, windows: rest };
    }
    case "SET_STATUS": {
      const { id, status } = payload;

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...state.windows[id], status } },
      };
    }
    case "SET_POSITION": {
      const { id, position } = payload;

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...state.windows[id], position } },
      };
    }
    case "SET_TITLE": {
      const { id, title } = payload;

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...state.windows[id], title } },
      };
    }
    case "SET_SIZE": {
      const { id, size } = payload;

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...state.windows[id], size } },
      };
    }
    case "SET_DRAGGING": {
      const { id, dragging } = payload;

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...state.windows[id], dragging } },
      };
    }
    case "SET_RESIZING": {
      const { id, resizing } = payload;

      return {
        ...state,
        windows: { ...state.windows, [id]: { ...state.windows[id], resizing } },
      };
    }
    case "SET_FOCUSED": {
      const { id } = payload;
      const zIndexes = Object.values(state.windows).map((w) => w.zIndex);
      const zIndexNew = Math.max(...zIndexes) + 1;

      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], zIndex: zIndexNew, focused: true },
        },
      };
    }
    default: {
      return state;
    }
  }
};
