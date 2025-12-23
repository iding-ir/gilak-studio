import FlagDeIcon from "./assets/icons/flag-de.svg";
import FlagEnIcon from "./assets/icons/flag-en.svg";
import FlagNlIcon from "./assets/icons/flag-nl.svg";

export const LANGUAGES = {
  en: {
    code: "en",
    icon: <FlagEnIcon />,
    dir: "ltr" as const,
  },
  nl: {
    code: "nl",
    icon: <FlagNlIcon />,
    dir: "ltr" as const,
  },
  de: {
    code: "de",
    icon: <FlagDeIcon />,
    dir: "ltr" as const,
  },
} as const;
