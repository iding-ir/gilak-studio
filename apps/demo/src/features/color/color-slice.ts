import type { ColorType } from "@gilak/color-picker";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";

export interface Color {
  color: ColorType;
  background: ColorType;
}

export const DEFAULT_COLOR: Color = {
  color: "#000000",
  background: "#ffffff",
};

export interface ColorState {
  selected?: Color;
}

const initialState: ColorState = {
  selected: DEFAULT_COLOR,
};

export const colorSlice = createAppSlice({
  name: "color",
  initialState,
  reducers: (create) => ({
    setColor: create.reducer((state, { payload }: PayloadAction<Color>) => {
      state.selected = payload;
    }),
  }),
  selectors: {
    selectColor: ({ selected }) => selected,
  },
});

export const { setColor } = colorSlice.actions;

export const { selectColor } = colorSlice.selectors;
