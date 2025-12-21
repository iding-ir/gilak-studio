import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import { COLOR_PALETTE } from "../../constants";

export interface ColorState {
  color: string;
  backgroundColor: string;
}

const initialState: ColorState = {
  color: COLOR_PALETTE[1],
  backgroundColor: COLOR_PALETTE[0],
};

export const colorSlice = createAppSlice({
  name: "color",
  initialState,
  reducers: (create) => ({
    setColor: create.reducer((state, { payload }: PayloadAction<string>) => {
      state.color = payload;
    }),
    setBackgroundColor: create.reducer(
      (state, { payload }: PayloadAction<string>) => {
        state.backgroundColor = payload;
      },
    ),
  }),
  selectors: {
    selectColor: ({ color }) => color,
    selectBackgroundColor: ({ backgroundColor }) => backgroundColor,
  },
});

export const { setColor, setBackgroundColor } = colorSlice.actions;

export const { selectColor, selectBackgroundColor } = colorSlice.selectors;
