export type Position = { x: number; y: number };
export type Size = { w: number; h: number };
export type Point = { x: number; y: number };
export type Scale = { sx: number; sy: number };

export type CanvasContent = {
  id: string;
  item: ImageBitmap;
  position: Position;
  size: Size;
};
