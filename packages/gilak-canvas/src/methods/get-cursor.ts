import {
  BRUSH_SIZES,
  type BrushShape,
  type BrushSize,
  type CursorShape,
} from "../types";

type Cursor = {
  shape: BrushShape | CursorShape;
  size: BrushSize;
  color: string;
};

type GetCursorArgs = {
  color: string;
  brushShape: BrushShape;
  brushSize: BrushSize;
  enabledEraser: boolean;
  enabledDrawing: boolean;
  enabledFill: boolean;
  enabledMove: boolean;
};

export const getCursor = ({
  color,
  brushShape,
  brushSize,
  enabledEraser,
  enabledDrawing,
  enabledFill,
  enabledMove,
}: GetCursorArgs): Cursor => {
  if (enabledDrawing) {
    return {
      shape: brushShape,
      size: brushSize,
      color,
    };
  }

  if (enabledEraser) {
    return {
      shape: brushShape,
      size: brushSize,
      color: "rgba(90, 90, 90, 0.5)",
    };
  }

  if (enabledFill) {
    return {
      shape: "DOT",
      size: BRUSH_SIZES[3],
      color,
    };
  }

  if (enabledMove) {
    return {
      shape: "PLUS",
      size: BRUSH_SIZES[3],
      color: "rgba(0, 0, 0, 0.9)",
    };
  }

  return {
    shape: "CROSS",
    size: BRUSH_SIZES[2],
    color: "rgba(0, 0, 0, 0.6)",
  };
};
