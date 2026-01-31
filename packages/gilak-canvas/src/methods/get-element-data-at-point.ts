import type { CanvasElement, Point } from "../types/canvas";

export type FindElementAtPointArgs<T extends CanvasElement> = {
  element: T;
  point: Point;
};

export const getElementDataAtPoint = <T extends CanvasElement>({
  element,
  point: { x, y },
}: FindElementAtPointArgs<T>) => {
  const { position } = element;

  const offset: Point = {
    x: x - position.x,
    y: y - position.y,
  };

  return { offset };
};
