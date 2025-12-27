import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de.json";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  defaultNS: "common",
  resources: {
    en: { common: en },
    nl: { common: nl },
    de: { common: de },
  },
});

export { i18n };
export const t = i18n.t.bind(i18n);
