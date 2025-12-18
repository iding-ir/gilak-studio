import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import type { WindowType } from "./types";

export interface WindowsState {
  all: WindowType[];
  bin: WindowType[];
}

const initialState: WindowsState = {
  all: [{ id: "1", title: "Untitled" }],
  bin: [],
};

export const windowsSlice = createAppSlice({
  name: "windows",
  initialState,
  reducers: (create) => ({
    addWindow: create.reducer(
      (state, { payload }: PayloadAction<WindowType>) => {
        state.all.push(payload);
      },
    ),
    removeWindow: create.reducer(
      (state, { payload }: PayloadAction<WindowType>) => {
        state.all = state.all.filter((w) => w.id !== payload.id);
        state.bin.push(payload);
      },
    ),
    setWindowTitle: create.reducer(
      (state, { payload }: PayloadAction<WindowType>) => {
        const window = state.all.find((w) => w.id === payload.id);
        if (window) {
          window.title = payload.title;
        }
      },
    ),
  }),
  selectors: {
    selectAllWindows: ({ all }) => all,
    selectBinWindows: ({ bin }) => bin,
  },
});

export const { addWindow, removeWindow, setWindowTitle } = windowsSlice.actions;
export const { selectAllWindows, selectBinWindows } = windowsSlice.selectors;
