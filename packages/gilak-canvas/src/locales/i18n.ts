import { i18n } from "@gilak/localization";

import de from "./files/de.json";
import en from "./files/en.json";
import nl from "./files/nl.json";

export function registerCanvasI18n() {
  i18n.addResourceBundle("en", "canvas", en);
  i18n.addResourceBundle("nl", "canvas", nl);
  i18n.addResourceBundle("de", "canvas", de);
}
