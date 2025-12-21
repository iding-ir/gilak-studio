import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";

export interface ColorState {
  color: string;
  backgroundColor: string;
}

const initialState: ColorState = {
  color: "#000000",
  backgroundColor: "#ffffff",
};

export const colorSlice = createAppSlice({
  name: "color",
  initialState,
  reducers: (create) => ({
    setColor: create.reducer((state, { payload }: PayloadAction<string>) => {
      state.color = payload;
    }),
    setBackground: create.reducer(
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

export const { setColor, setBackground } = colorSlice.actions;

export const { selectColor, selectBackgroundColor } = colorSlice.selectors;
