import { loadImageFromSrc, randomId } from "@gilak/utils";

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
  const image = await loadImageFromSrc(src);
  const { naturalWidth: width, naturalHeight: height } = image;
  const ratio = Math.min(documentSize.w / width, documentSize.h / height);

  const canvasElement: ImageElement = {
    id: randomId({ prefix: "image-" }),
    type: "image",
    content: { src, ratio },
    position,
    size: { w: width, h: height },
    visible: true,
  };

  return canvasElement;
};
