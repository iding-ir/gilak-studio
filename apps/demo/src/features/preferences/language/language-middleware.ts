import { i18n } from "@gilak/localization";
import { createListenerMiddleware } from "@reduxjs/toolkit";

import { setLanguage } from "../preferences-slice";
import type { LanguageType } from "./types";

export const languageListenerMiddleware = createListenerMiddleware();

languageListenerMiddleware.startListening({
  actionCreator: setLanguage,
  effect: async ({ payload }) => {
    changeLanguage(payload);
  },
});

export const changeLanguage = (language: LanguageType) => {
  i18n.changeLanguage(language);
};
