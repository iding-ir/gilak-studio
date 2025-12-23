export const THEMES = ["light", "dark"] as const;

export type ThemeType = (typeof THEMES)[number];

export const DEFAULT_THEME: ThemeType = "light";
