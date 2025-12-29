import type { PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "../../app/createAppSlice";
import { DEFAULT_LANGUAGE, type LanguageType } from "./language/types";
import type { ThemeType } from "./theme/types";

export interface AppearanceState {
  open: boolean;
  language: LanguageType;
  theme: ThemeType;
}

const initialState: AppearanceState = {
  open: false,
  language: DEFAULT_LANGUAGE,
  theme: "light",
};

export const appearanceSlice = createAppSlice({
  name: "appearance",
  initialState,
  reducers: (create) => ({
    initializePreferences: create.reducer((state) => state),
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

export const {
  initializePreferences,
  openPreferences,
  closePreferences,
  setLanguage,
  setTheme,
} = appearanceSlice.actions;

export const { selectPreferencesOpen, selectLanguage, selectTheme } =
  appearanceSlice.selectors;
