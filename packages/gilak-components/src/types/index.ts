export const TSHIRT_SIZES = [
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "xxl",
] as const;
export type TshirtSize = (typeof TSHIRT_SIZES)[number];

export type Direction = "row" | "column" | "row-reverse" | "column-reverse";

export type Variant =
  | "primary"
  | "secondary"
  | "light"
  | "dark"
  | "light-ghost"
  | "dark-ghost";

export type Position =
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";
