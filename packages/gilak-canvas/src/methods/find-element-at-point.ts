import type { CanvasElement, Point } from "../types/canvas";

export type FindElementAtPointArgs = {
  elements: CanvasElement[];
  point: Point;
};

export const findElementAtPoint = ({
  elements,
  point: { x, y },
}: FindElementAtPointArgs) => {
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];
    const { size, position } = element;

    const left = position.x - size.w / 2;
    const right = position.x + size.w / 2;
    const top = position.y - size.h / 2;
    const bottom = position.y + size.h / 2;

    if (x >= left && x <= right && y >= top && y <= bottom) {
      const offset: Point = {
        x: x - position.x,
        y: y - position.y,
      };

      return { element, offset };
    }
  }
  return null;
};
