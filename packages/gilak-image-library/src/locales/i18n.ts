import { i18n } from "@gilak/localization";

import de from "./files/de.json";
import en from "./files/en.json";
import nl from "./files/nl.json";

export function registerImageLibraryI18n() {
  i18n.addResourceBundle("en", "imageLibrary", en);
  i18n.addResourceBundle("nl", "imageLibrary", nl);
  i18n.addResourceBundle("de", "imageLibrary", de);
}
