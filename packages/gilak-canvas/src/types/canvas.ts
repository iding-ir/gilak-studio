import type { BrushShape } from "./brushShape";
import type { BrushSize } from "./brushSize";
import type { FontFamily } from "./fontFamily";
import type { FontSize } from "./fontSize";

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

export type ImageContent = {
  image: ImageBitmap;
  ratio: number;
};

export type ImageElement = CanvasElementBase & {
  type: "image";
  content: ImageContent;
};

export type DrawingContent = {
  points: Point[];
  color: string;
  brushSize: BrushSize;
  brushShape: BrushShape;
};

export type DrawingElement = CanvasElementBase & {
  type: "drawing";
  content: DrawingContent;
};

export type TextContent = {
  text: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
  color: string;
};

export type TextElement = CanvasElementBase & {
  type: "text";
  content: TextContent;
};
