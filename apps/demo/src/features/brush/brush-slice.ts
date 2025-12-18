import type { BrushSize, BrushType } from "@gilak/canvas/types/brush";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";

export interface Brush {
  type: BrushType;
  size: BrushSize;
}

export const DEFAULT_BRUSH: Brush = {
  type: "CIRCLE",
  size: 2,
};

export interface BrushState {
  type: BrushType;
  size: BrushSize;
}

const initialState: BrushState = {
  type: DEFAULT_BRUSH.type,
  size: DEFAULT_BRUSH.size,
};

export const brushSlice = createAppSlice({
  name: "brush",
  initialState,
  reducers: (create) => ({
    setBrushType: create.reducer(
      (state, { payload }: PayloadAction<BrushType>) => {
        state.type = payload;
      },
    ),
    setBrushSize: create.reducer(
      (state, { payload }: PayloadAction<BrushSize>) => {
        state.size = payload;
      },
    ),
  }),
  selectors: {
    selectBrushType: ({ type }) => type,
    selectBrushSize: ({ size }) => size,
  },
});

export const { setBrushType, setBrushSize } = brushSlice.actions;
export const { selectBrushType, selectBrushSize } = brushSlice.selectors;
