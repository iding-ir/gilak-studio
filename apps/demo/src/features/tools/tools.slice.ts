import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import type { ToolType } from "./types";

export interface ToolsState {
  selected?: ToolType;
  tolerance: number;
}

const initialState: ToolsState = {
  selected: "BRUSH",
  tolerance: 50,
};

export const toolsSlice = createAppSlice({
  name: "tools",
  initialState,
  reducers: (create) => ({
    setTool: create.reducer((state, { payload }: PayloadAction<ToolType>) => {
      state.selected = payload;
    }),
    toggleTool: create.reducer(
      (state, { payload }: PayloadAction<ToolType>) => {
        state.selected = state.selected === payload ? undefined : payload;
      },
    ),
    unsetTool: create.reducer((state) => {
      state.selected = undefined;
    }),
    setTolerance: create.reducer(
      (state, { payload }: PayloadAction<number>) => {
        state.tolerance = payload;
      },
    ),
  }),
  selectors: {
    selectTool: ({ selected }) => selected,
    selectTolerance: ({ tolerance }) => tolerance,
  },
});

export const { setTool, toggleTool, unsetTool, setTolerance } =
  toolsSlice.actions;

export const { selectTool, selectTolerance } = toolsSlice.selectors;
