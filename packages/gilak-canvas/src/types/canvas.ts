import type { BrushShape } from "./brushShape";
import type { BrushSize } from "./brushSize";

export type Position = { x: number; y: number };
export type Size = { w: number; h: number };
export type Point = { x: number; y: number };
export type Scale = { sx: number; sy: number };

export type CanvasElement = ImageElement | DrawingElement | TextElement;

export type CanvasElementBase = {
  id: string;
  position: Position;
  size: Size;
  visible: boolean;
};

export type ImageElement = CanvasElementBase & {
  type: "image";
  content: {
    image: ImageBitmap;
  };
};

export type TextElement = CanvasElementBase & {
  type: "text";
  content: {
    text: string;
    font: string;
    color: string;
    align: CanvasTextAlign;
  };
};

export type DrawingElement = CanvasElementBase & {
  type: "drawing";
  content: {
    strokes: DrawingStroke[];
  };
};

export type DrawingStroke = {
  points: Point[];
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
};
