import { i18n } from "@gilak/localization";

import de from "./files/de.json";
import en from "./files/en.json";
import nl from "./files/nl.json";

export function registerColorSwatchI18n() {
  i18n.addResourceBundle("en", "colorSwatch", en);
  i18n.addResourceBundle("nl", "colorSwatch", nl);
  i18n.addResourceBundle("de", "colorSwatch", de);
}
