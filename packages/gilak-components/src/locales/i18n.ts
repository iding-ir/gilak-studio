import { i18n } from "@gilak/localization";

import de from "./de.json";
import en from "./en.json";
import nl from "./nl.json";

export function registerComponentsI18n() {
  i18n.addResourceBundle("en", "components", en);
  i18n.addResourceBundle("nl", "components", nl);
  i18n.addResourceBundle("de", "components", de);
}
