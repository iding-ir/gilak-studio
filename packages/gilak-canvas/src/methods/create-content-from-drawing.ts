import { randomId } from "@gilak/utils";

import type { CanvasContent, DrawingStroke, Size } from "../types/canvas";

export type CreateContentFromDrawingParams = {
  stroke: DrawingStroke;
  documentSize: Size;
};

export const createContentFromDrawing = ({
  stroke,
  documentSize,
}: CreateContentFromDrawingParams) => {
  const canvasContent: CanvasContent = {
    id: randomId({ prefix: "drawing-" }),
    type: "drawing",
    position: { x: documentSize.w / 2, y: documentSize.h / 2 },
    size: documentSize,
    item: { strokes: [stroke] },
    visible: true,
  };

  return canvasContent;
};
