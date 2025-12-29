import { createListenerMiddleware } from "@reduxjs/toolkit";

import type { RootState } from "../../app/store";
import { changeLanguage } from "./language/language-middleware";
import { initializePreferences } from "./preferences-slice";
import { changeTheme } from "./theme/theme-middleware";

export const preferencesListenerMiddleware = createListenerMiddleware();

preferencesListenerMiddleware.startListening({
  actionCreator: initializePreferences,
  effect: async (_action, api) => {
    const state = api.getState() as RootState;

    changeTheme(state.appearance.theme);
    changeLanguage(state.appearance.language);
  },
});
