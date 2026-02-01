import { randomId } from "@gilak/utils";

import type { Position, Size, TextContent, TextElement } from "../types/canvas";

export type CreateElementFromTextParams = {
  content: TextContent;
  documentSize: Size;
  position: Position;
};

export const createElementFromText = ({
  content,
  documentSize,
  position,
}: CreateElementFromTextParams) => {
  const canvasElement: TextElement = {
    id: randomId({ prefix: "text-" }),
    type: "text",
    position,
    size: documentSize,
    content,
    visible: true,
  };

  return canvasElement;
};
