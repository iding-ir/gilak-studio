import { randomId } from "@gilak/utils";

import type { CanvasElement, DrawingStroke, Size } from "../types/canvas";

export type CreateElementFromDrawingParams = {
  stroke: DrawingStroke;
  documentSize: Size;
};

export const createElementFromDrawing = ({
  stroke,
  documentSize,
}: CreateElementFromDrawingParams) => {
  const canvasElement: CanvasElement = {
    id: randomId({ prefix: "drawing-" }),
    type: "drawing",
    position: { x: documentSize.w / 2, y: documentSize.h / 2 },
    size: documentSize,
    content: { strokes: [stroke] },
    visible: true,
    focused: false,
    selected: false,
  };

  return canvasElement;
};
