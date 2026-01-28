import type { CanvasContent } from "../types/canvas";

export type FindContentAtPointArgs = {
  contents: CanvasContent[];
  point: { x: number; y: number };
};

export const findContentAtPoint = ({
  contents,
  point,
}: FindContentAtPointArgs) => {
  for (let i = contents.length - 1; i >= 0; i--) {
    const content = contents[i];
    const left = content.position.x - content.size.w / 2;
    const right = content.position.x + content.size.w / 2;
    const top = content.position.y - content.size.h / 2;
    const bottom = content.position.y + content.size.h / 2;
    if (
      point.x >= left &&
      point.x <= right &&
      point.y >= top &&
      point.y <= bottom
    ) {
      return content;
    }
  }
  return null;
};
