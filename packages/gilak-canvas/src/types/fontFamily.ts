export const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Verdana",
  "Monaco",
] as const;

export type FontFamily = (typeof FONT_FAMILIES)[number];
