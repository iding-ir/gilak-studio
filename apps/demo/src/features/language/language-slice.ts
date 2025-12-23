import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import { DEFAULT_LANGUAGE, type LanguageType } from "./types";

export interface LanguageState {
  current: LanguageType;
}

const initialState: LanguageState = {
  current: DEFAULT_LANGUAGE,
};

export const languageSlice = createAppSlice({
  name: "language",
  initialState,
  reducers: (create) => ({
    setLanguage: create.reducer(
      (state, { payload }: PayloadAction<LanguageType>) => {
        state.current = payload;
      },
    ),
  }),
  selectors: {
    selectLanguage: ({ current }) => current,
  },
});

export const { setLanguage } = languageSlice.actions;

export const { selectLanguage } = languageSlice.selectors;
