import type { ImageItem } from "@gilak/image-library";
import { randomId } from "@gilak/utils";

import type { CanvasContent, Point, Size } from "../types/canvas";

const RATIO = 0.5;

export type CreateContentFromImageParams = {
  data: unknown;
  pointer: Point;
  documentSize: Size;
};

export const createContentFromImage = async ({
  data,
  pointer,
  documentSize,
}: CreateContentFromImageParams) => {
  const imageItem = data as ImageItem;
  const blob = await fetch(imageItem.src).then((r) => r.blob());
  const image = await createImageBitmap(blob);
  const { width: itemWidth, height: itemHeight } = image;
  const widthRatio = documentSize.w / itemWidth;
  const heightRatio = documentSize.h / itemHeight;
  const ratio = RATIO * Math.min(widthRatio, heightRatio);

  const canvasContent: CanvasContent = {
    id: randomId({ prefix: "image-" }),
    type: "image",
    item: { image },
    position: { x: pointer.x, y: pointer.y },
    size: { w: itemWidth * ratio, h: itemHeight * ratio },
    visible: true,
  };

  return canvasContent;
};
