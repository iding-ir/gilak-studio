import { watchElement } from "@gilak/utils";

import { FLOATING_WINDOWS_PADDING } from "../constants";
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

      return {
        ...state,
        windows: newWindows,
        focused: state.focused === id ? undefined : state.focused,
      };
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

      return {
        ...state,
        windows: newWindows.set(id, { ...window, zIndex }),
        focused: id,
      };
    }
    case "AUTO_PLACE_WINDOW": {
      const { id } = payload;
      const newWindows = new Map(state.windows);
      const window = state.windows.get(id);
      const element = document.getElementById("floating-windows");

      if (!element || !window) return state;

      const { w, h } = window.size;
      const { width, height, disconnect } = watchElement(element);
      disconnect();

      const newW = w > width ? width - FLOATING_WINDOWS_PADDING * 2 : w;
      const newH = h > height ? height - FLOATING_WINDOWS_PADDING * 2 : h;
      const newX = (width - newW) / 2;
      const newY = (height - newH) / 2;

      return {
        ...state,
        windows: newWindows.set(id, {
          ...window,
          size: { w: newW, h: newH },
          position: { x: newX, y: newY },
        }),
      };
    }

    default: {
      return state;
    }
  }
};
