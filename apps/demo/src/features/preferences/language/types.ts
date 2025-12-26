export const LANGUAGES = ["en", "nl", "de"] as const;

export type LanguageType = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: LanguageType = "en";
export const FALLBACK_LANGUAGE: LanguageType = "en";
