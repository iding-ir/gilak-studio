import type { BrushShape } from "./brushShape";
import type { BrushSize } from "./brushSize";

export type Position = { x: number; y: number };
export type Size = { w: number; h: number };
export type Point = { x: number; y: number };
export type Scale = { sx: number; sy: number };

export type CanvasContent = ImageItem | DrawingItem | TextItem;

export type CanvasItemBase = {
  id: string;
  position: Position;
  size: Size;
};

export type ImageItem = CanvasItemBase & {
  type: "image";
  item: ImageBitmap;
};

export type TextItem = CanvasItemBase & {
  type: "text";
  item: {
    text: string;
    font: string;
    color: string;
    align: CanvasTextAlign;
  };
};

export type DrawingItem = CanvasItemBase & {
  type: "drawing";
  item: {
    strokes: DrawingStroke[];
  };
};

export type DrawingStroke = {
  points: Point[];
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
};
