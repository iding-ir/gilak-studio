import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import type { ToolType } from "./types";

export interface ToolsState {
  selected?: ToolType;
}

const initialState: ToolsState = {
  selected: undefined,
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
  }),
  selectors: {
    selectTool: ({ selected }) => selected,
  },
});

export const { setTool, toggleTool, unsetTool } = toolsSlice.actions;

export const { selectTool } = toolsSlice.selectors;
