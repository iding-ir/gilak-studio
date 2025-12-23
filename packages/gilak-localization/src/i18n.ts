import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from "./constants";
import en from "./files/en.json";
import nl from "./files/nl.json";
import { LANGUAGES } from "./languages";

i18n.use(initReactI18next).init({
  resources: {
    [LANGUAGES.en.code]: {
      translation: en,
    },
    [LANGUAGES.nl.code]: {
      translation: nl,
    },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: FALLBACK_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
