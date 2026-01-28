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
  const id = randomId({ prefix: "drawing-" });
  const type = "drawing";
  const position = { x: 0, y: 0 };
  const size = documentSize;
  const item = { strokes: [stroke] };
  const content: CanvasContent = { id, type, position, size, item };

  return content;
};
