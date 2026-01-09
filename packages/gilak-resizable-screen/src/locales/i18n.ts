import { i18n } from "@gilak/localization";

import de from "./files/de.json";
import en from "./files/en.json";
import nl from "./files/nl.json";

export function registerResizableScreenI18n() {
  i18n.addResourceBundle("en", "resizableScreen", en);
  i18n.addResourceBundle("nl", "resizableScreen", nl);
  i18n.addResourceBundle("de", "resizableScreen", de);
}
