import "./packages";

import { i18n } from "@gilak/localization";

import de from "./files/de.json";
import en from "./files/en.json";
import nl from "./files/nl.json";

i18n.addResourceBundle("en", "app", en);
i18n.addResourceBundle("nl", "app", nl);
i18n.addResourceBundle("de", "app", de);
