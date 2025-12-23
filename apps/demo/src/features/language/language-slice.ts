import { DEFAULT_LANGUAGE, type LanguageCode } from "@gilak/localization";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";

export interface LanguageState {
  current: LanguageCode;
}

const initialState: LanguageState = {
  current: DEFAULT_LANGUAGE,
};

export const languageSlice = createAppSlice({
  name: "language",
  initialState,
  reducers: (create) => ({
    setLanguage: create.reducer(
      (state, { payload }: PayloadAction<LanguageCode>) => {
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
