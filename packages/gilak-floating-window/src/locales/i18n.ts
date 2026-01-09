import { i18n } from "@gilak/localization";

import de from "./files/de.json";
import en from "./files/en.json";
import nl from "./files/nl.json";

export function registerFloatingWindowI18n() {
  i18n.addResourceBundle("en", "floatingWindow", en);
  i18n.addResourceBundle("nl", "floatingWindow", nl);
  i18n.addResourceBundle("de", "floatingWindow", de);
}
