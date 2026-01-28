import type { Point, Position, Size } from "../types";
import { getEdgeFromCenter } from "./get-edge-from-center";

export function getCornerFromCenter(
  center: Position,
  size: Size,
  offset = { x: 0, y: 0 },
  extras: Point[] = [],
): Position {
  return {
    x: getEdgeFromCenter(
      center.x,
      size.w,
      offset.x,
      extras.map((e) => e.x),
    ),
    y: getEdgeFromCenter(
      center.y,
      size.h,
      offset.y,
      extras.map((e) => e.y),
    ),
  };
}
