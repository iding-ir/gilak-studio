import { i18n } from "@gilak/localization";

import de from "./de.json";
import en from "./en.json";
import nl from "./nl.json";

export function registerDragNDropI18n() {
  i18n.addResourceBundle("en", "drag-n-drop", en);
  i18n.addResourceBundle("nl", "drag-n-drop", nl);
  i18n.addResourceBundle("de", "drag-n-drop", de);
}
