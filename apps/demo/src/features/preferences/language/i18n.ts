import { de, en, nl } from "@gilak/localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { languages } from "./languages";
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from "./types";

i18n.use(initReactI18next).init({
  resources: {
    [languages.en.code]: {
      translation: en,
    },
    [languages.nl.code]: {
      translation: nl,
    },
    [languages.de.code]: {
      translation: de,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
