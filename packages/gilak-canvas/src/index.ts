export type { CanvasProps } from "./components/Canvas";
export { Canvas } from "./components/Canvas";
export type { DrawingCanvasProps } from "./components/DrawingCanvas";
export { DrawingCanvas } from "./components/DrawingCanvas";
export type { LayerCardProps } from "./components/LayerCard";
export { LayerCard } from "./components/LayerCard";
export type { LayersProps } from "./components/Layers";
export { Layers } from "./components/Layers";
export type { RandomCanvasProps } from "./components/RandomCanvas";
export { RandomCanvas } from "./components/RandomCanvas";
export type { CanvasHistory } from "./hooks/";

// Context
export type {
  Action,
  CanvasProviderProps,
  CanvasState,
  ContextValue,
} from "./context";
export {
  actions,
  CanvasContext,
  CanvasProvider,
  initialState,
  reducer,
  selectLayerById,
  selectLayers,
  useCanvasContext,
} from "./context";

// Methods
export type { ImageFormat } from "./methods/canvas-to-blob";
export { canvasToBlob } from "./methods/canvas-to-blob";
export { downloadCanvas } from "./methods/download-canvas";
export type { DrawBrushProps } from "./methods/draw-brush";
export { drawBrush } from "./methods/draw-brush";
export type { DrawEraserProps } from "./methods/draw-eraser";
export { drawEraser } from "./methods/draw-eraser";
export type { EffectType } from "./methods/draw-random-effect";
export { drawRandomEffect } from "./methods/draw-random-effect";
export type { FillAreaArgs } from "./methods/fill-area";
export { fillArea } from "./methods/fill-area";

// Hooks
export { useCanvasHistory } from "./hooks/useCanvasHistory";
export { useCanvasPointer } from "./hooks/useCanvasPointer";
export type { UseCursorArgs } from "./hooks/useCursor";
export { useCursor } from "./hooks/useCursor";
export type { UseDrawingProps } from "./hooks/useDrawing";
export { useDrawing } from "./hooks/useDrawing";
export type { UseEraserProps } from "./hooks/useEraser";
export { useEraser } from "./hooks/useEraser";
export type { UseFillArgs } from "./hooks/useFill";
export { useFill } from "./hooks/useFill";

// Types
export type { BrushShape, BrushSize, CanvasLayer } from "./types";
export type { Point } from "./types";
export { BRUSH_SHAPES, BRUSH_SIZES } from "./types";
