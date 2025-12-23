import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import { DEFAULT_THEME, type ThemeType } from "./types";

export interface ThemeState {
  current: ThemeType;
}

const initialState: ThemeState = {
  current: DEFAULT_THEME,
};

export const themeSlice = createAppSlice({
  name: "theme",
  initialState,
  reducers: (create) => ({
    setTheme: create.reducer((state, { payload }: PayloadAction<ThemeType>) => {
      state.current = payload;
    }),
  }),
  selectors: {
    selectTheme: ({ current }) => current,
  },
});

export const { setTheme } = themeSlice.actions;

export const { selectTheme } = themeSlice.selectors;
