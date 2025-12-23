import type { LANGUAGES } from "../languages";

export type LanguageCode = (typeof LANGUAGES)[keyof typeof LANGUAGES]["code"];
export type LanguageDirection = "ltr" | "rtl";
