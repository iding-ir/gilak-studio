import { i18n, type LanguageCode } from "@gilak/localization";
import { createListenerMiddleware } from "@reduxjs/toolkit";

import { setLanguage } from "./language-slice";

export const languageListenerMiddleware = createListenerMiddleware();

languageListenerMiddleware.startListening({
  actionCreator: setLanguage,
  effect: async ({ payload }) => {
    changeLanguage(payload);
  },
});

export const changeLanguage = (language: LanguageCode) => {
  i18n.changeLanguage(language);
};
