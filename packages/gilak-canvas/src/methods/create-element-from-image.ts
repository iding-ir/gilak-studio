import type { ImageItem } from "@gilak/image-library";
import { randomId } from "@gilak/utils";

import type { CanvasElement, Point, Size } from "../types/canvas";

const RATIO = 0.5;

export type CreateElementFromImageParams = {
  data: unknown;
  pointer: Point;
  documentSize: Size;
};

export const createElementFromImage = async ({
  data,
  pointer,
  documentSize,
}: CreateElementFromImageParams) => {
  const imageItem = data as ImageItem;
  const blob = await fetch(imageItem.src).then((r) => r.blob());
  const image = await createImageBitmap(blob);
  const { width: itemWidth, height: itemHeight } = image;
  const widthRatio = documentSize.w / itemWidth;
  const heightRatio = documentSize.h / itemHeight;
  const ratio = RATIO * Math.min(widthRatio, heightRatio);

  const canvasElement: CanvasElement = {
    id: randomId({ prefix: "image-" }),
    type: "image",
    content: { image },
    position: { x: pointer.x, y: pointer.y },
    size: { w: itemWidth * ratio, h: itemHeight * ratio },
    visible: true,
    focused: false,
    selected: false,
  };

  return canvasElement;
};
