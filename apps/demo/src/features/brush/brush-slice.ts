import type { BrushShape } from "@gilak/canvas";
import type { BrushSize } from "@gilak/canvas/types";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";

export interface Brush {
  type: BrushShape;
  size: BrushSize;
}

export const DEFAULT_BRUSH: Brush = {
  type: "CIRCLE",
  size: 4,
};

export interface BrushState {
  type: BrushShape;
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
    setBrushShape: create.reducer(
      (state, { payload }: PayloadAction<BrushShape>) => {
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
    selectBrushShape: ({ type }) => type,
    selectBrushSize: ({ size }) => size,
  },
});

export const { setBrushShape, setBrushSize } = brushSlice.actions;
export const { selectBrushShape, selectBrushSize } = brushSlice.selectors;
