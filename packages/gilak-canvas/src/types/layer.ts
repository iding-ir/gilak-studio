export type LayerContentItem = ImageBitmap | HTMLCanvasElement;
export type Position = { x: number; y: number };
export type Size = { w: number; h: number };
export type LayerContent = {
  item: LayerContentItem;
  position: Position;
  size: Size;
};

export type CanvasLayer = {
  id: string;
  documentId: string;
  name: string;
  visible: boolean;
  selected: boolean;
  focused: boolean;
  content: LayerContent[];
};
