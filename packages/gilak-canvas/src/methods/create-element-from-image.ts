import { randomId } from "@gilak/utils";

import type { ImageElement, Position, Size } from "../types/canvas";

export type CreateElementFromImageParams = {
  src: string;
  position: Position;
  documentSize: Size;
};

export const createElementFromImage = async ({
  src,
  position,
  documentSize,
}: CreateElementFromImageParams) => {
  const blob = await fetch(src).then((r) => r.blob());
  const image = await createImageBitmap(blob);
  const { width, height } = image;
  const ratio = Math.min(documentSize.w / width, documentSize.h / height);

  const canvasElement: ImageElement = {
    id: randomId({ prefix: "image-" }),
    type: "image",
    content: { image, ratio },
    position,
    size: { w: width, h: height },
    visible: true,
  };

  return canvasElement;
};
