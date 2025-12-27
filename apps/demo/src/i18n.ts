import { i18n } from "@gilak/localization";

import de from "./locales/de.json";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

i18n.addResourceBundle("en", "app", en);
i18n.addResourceBundle("nl", "app", nl);
i18n.addResourceBundle("de", "app", de);
