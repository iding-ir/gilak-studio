import type { JSX } from "react/jsx-runtime";

import MoonIcon from "./icons/icon-moon.svg";
import SunIcon from "./icons/icon-sun.svg";
import type { ThemeType } from "./types";

export const themes: Record<
  string,
  { code: ThemeType; icon: JSX.Element; label: string }
> = {
  light: {
    code: "light",
    icon: <SunIcon />,
    label: "themes.light",
  },
  dark: {
    code: "dark",
    icon: <MoonIcon />,
    label: "themes.dark",
  },
};
