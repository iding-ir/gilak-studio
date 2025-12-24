import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import type { WindowType } from "./types";

export interface WindowsState {
  all: WindowType[];
  bin: WindowType[];
}

const initialState: WindowsState = {
  all: [{ id: "1" }],
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
  }),
  selectors: {
    selectAllWindows: ({ all }) => all,
    selectBinWindows: ({ bin }) => bin,
  },
});

export const { addWindow, removeWindow } = windowsSlice.actions;
export const { selectAllWindows, selectBinWindows } = windowsSlice.selectors;
