export const FONT_SIZES = [
  10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72,
] as const;

export type FontSize = (typeof FONT_SIZES)[number];
