import { i18n } from "@gilak/localization";

import de from "./locales/de.json";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

export function registerFloatingWindowI18n() {
  i18n.addResourceBundle("en", "floatingWindow", en);
  i18n.addResourceBundle("nl", "floatingWindow", nl);
  i18n.addResourceBundle("de", "floatingWindow", de);
}
