import type { JSX } from "react/jsx-runtime";

import FlagDeIcon from "./icons/flag-de.svg";
import FlagEnIcon from "./icons/flag-en.svg";
import FlagNlIcon from "./icons/flag-nl.svg";
import type { LanguageType } from "./types";

export const languages: Record<
  string,
  { code: LanguageType; icon: JSX.Element }
> = {
  en: {
    code: "en",
    icon: <FlagEnIcon />,
  },
  nl: {
    code: "nl",
    icon: <FlagNlIcon />,
  },
  de: {
    code: "de",
    icon: <FlagDeIcon />,
  },
};
