import type { ImageItem } from "@gilak/image-library";

const RATIO = 0.5;

export type CreateContentFromImageParams = {
  data: unknown;
  pointer: { x: number; y: number };
  documentWidth: number;
  documentHeight: number;
};

export const createContentFormImage = async ({
  data,
  pointer,
  documentWidth,
  documentHeight,
}: CreateContentFromImageParams) => {
  const imageItem = data as ImageItem;
  const blob = await fetch(imageItem.src).then((r) => r.blob());
  const item = await createImageBitmap(blob);
  const { width: itemWidth, height: itemHeight } = item;
  const position = { x: pointer.x, y: pointer.y };
  const widthRatio = documentWidth / itemWidth;
  const heightRatio = documentHeight / itemHeight;
  const ratio = RATIO * Math.min(widthRatio, heightRatio);
  const size = { w: itemWidth * ratio, h: itemHeight * ratio };
  const content = { item, position, size };

  return content;
};
