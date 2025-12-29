import { registerColorSwatchI18n } from "@gilak/color-swatch";
import { registerComponentsI18n } from "@gilak/components";
import { registerFloatingWindowI18n } from "@gilak/floating-window";
import { i18n } from "@gilak/localization";
import { registerResizableScreenI18n } from "@gilak/resizable-screen";

import de from "./locales/de.json";
import en from "./locales/en.json";
import nl from "./locales/nl.json";

i18n.addResourceBundle("en", "app", en);
i18n.addResourceBundle("nl", "app", nl);
i18n.addResourceBundle("de", "app", de);

registerColorSwatchI18n();
registerComponentsI18n();
registerFloatingWindowI18n();
registerResizableScreenI18n();
