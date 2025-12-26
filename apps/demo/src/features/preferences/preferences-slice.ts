import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import { DEFAULT_LANGUAGE, type LanguageType } from "./language/types";
import type { ThemeType } from "./theme/types";

export interface SettingsState {
  open: boolean;
  language: LanguageType;
  theme: ThemeType;
}

const initialState: SettingsState = {
  open: false,
  language: DEFAULT_LANGUAGE,
  theme: "light",
};

export const appearanceSlice = createAppSlice({
  name: "appearance",
  initialState,
  reducers: (create) => ({
    openPreferences: create.reducer((state) => {
      state.open = true;
    }),
    closePreferences: create.reducer((state) => {
      state.open = false;
    }),
    setLanguage: create.reducer(
      (state, { payload }: PayloadAction<LanguageType>) => {
        state.language = payload;
      },
    ),
    setTheme: create.reducer((state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload;
    }),
  }),
  selectors: {
    selectPreferencesOpen: ({ open }) => open,
    selectLanguage: ({ language }) => language,
    selectTheme: ({ theme }) => theme,
  },
});

export const { openPreferences, closePreferences, setLanguage, setTheme } =
  appearanceSlice.actions;

export const { selectPreferencesOpen, selectLanguage, selectTheme } =
  appearanceSlice.selectors;
