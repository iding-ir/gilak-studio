import { randomId } from "@gilak/utils";

import type { DrawingContent, DrawingElement, Size } from "../types/canvas";

export type CreateElementFromDrawingParams = {
  content: DrawingContent;
  documentSize: Size;
};

export const createElementFromDrawing = ({
  content,
  documentSize,
}: CreateElementFromDrawingParams) => {
  const canvasElement: DrawingElement = {
    id: randomId({ prefix: "drawing-" }),
    type: "drawing",
    position: { x: documentSize.w / 2, y: documentSize.h / 2 },
    size: documentSize,
    content,
    visible: true,
  };

  return canvasElement;
};
