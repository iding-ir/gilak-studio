import type { CanvasContent, Point } from "../types/canvas";

export type FindContentAtPointArgs = {
  contents: CanvasContent[];
  point: Point;
};

export const findContentAtPoint = ({
  contents,
  point: { x, y },
}: FindContentAtPointArgs) => {
  for (let i = contents.length - 1; i >= 0; i--) {
    const content = contents[i];
    const { size, position } = content;

    const left = position.x - size.w / 2;
    const right = position.x + size.w / 2;
    const top = position.y - size.h / 2;
    const bottom = position.y + size.h / 2;

    if (x >= left && x <= right && y >= top && y <= bottom) {
      const offset: Point = {
        x: x - position.x,
        y: y - position.y,
      };

      return { content, offset };
    }
  }
  return null;
};
