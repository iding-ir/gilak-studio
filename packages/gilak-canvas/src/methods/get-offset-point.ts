import type { Point } from "../types";

export function getOffsetPoint(
  point: Point,
  offset: Point = { x: 0, y: 0 },
): Point {
  return {
    x: point.x - offset.x,
    y: point.y - offset.y,
  };
}
