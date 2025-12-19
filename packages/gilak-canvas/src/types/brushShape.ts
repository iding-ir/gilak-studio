import IconBrushBackslash from "../assets/brush-backslash.svg?url";
import IconBrushCircle from "../assets/brush-circle.svg?url";
import IconBrushDiamond from "../assets/brush-diamond.svg?url";
import IconBrushHorizontal from "../assets/brush-horizontal.svg?url";
import IconBrushSlash from "../assets/brush-slash.svg?url";
import IconBrushSquare from "../assets/brush-square.svg?url";
import IconBrushStar from "../assets/brush-star.svg?url";
import IconBrushTriangle from "../assets/brush-triangle.svg?url";
import IconBrushVertical from "../assets/brush-vertical.svg?url";

export const BRUSH_SHAPES = [
  "CIRCLE",
  "SQUARE",
  "DIAMOND",
  "TRIANGLE",
  "STAR",
  "HORIZONTAL",
  "VERTICAL",
  "BACKSLASH",
  "SLASH",
] as const;

export type BrushShape = (typeof BRUSH_SHAPES)[number];

export const brushShapeIcons: Record<BrushShape, string> = {
  CIRCLE: IconBrushCircle,
  SQUARE: IconBrushSquare,
  DIAMOND: IconBrushDiamond,
  TRIANGLE: IconBrushTriangle,
  STAR: IconBrushStar,
  HORIZONTAL: IconBrushHorizontal,
  VERTICAL: IconBrushVertical,
  BACKSLASH: IconBrushBackslash,
  SLASH: IconBrushSlash,
};
