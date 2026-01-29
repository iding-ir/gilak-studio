// Components
export type { CanvasProps } from "./components/Canvas";
export { Canvas } from "./components/Canvas";
export type { DrawingCanvasProps } from "./components/DrawingCanvas";
export { DrawingCanvas } from "./components/DrawingCanvas";
export { ElementCard } from "./components/ElementCard";
export { Elements } from "./components/Elements";
export { ElementsPortal } from "./components/Elements";
export type { RandomCanvasProps } from "./components/RandomCanvas";
export { RandomCanvas } from "./components/RandomCanvas";
export { UndoRedo, UndoRedoPortal } from "./components/UndoRedo";

// Context
export type { ContextValue } from "./context";
export {
  CanvasContext,
  CanvasProvider,
  selectCurrentElements,
  selectElementById,
  selectNextElements,
  selectPreviousElements,
  useCanvasContext,
} from "./context";

// Methods
export type { ImageFormat } from "./methods/canvas-to-blob";
export { canvasToBlob } from "./methods/canvas-to-blob";
export { createElementFromDrawing } from "./methods/create-element-from-drawing";
export { createElementFromImage } from "./methods/create-element-from-image";
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
export { useCanvas } from "./hooks/useCanvas";
export { useCanvasPointer } from "./hooks/useCanvasPointer";
export { useCanvasRenderer } from "./hooks/useCanvasRenderer";
export type { UseCanvasSizeArgs } from "./hooks/useCanvasSize";
export { useCanvasSize } from "./hooks/useCanvasSize";
export type { UseCursorArgs } from "./hooks/useCursor";
export { useCursor } from "./hooks/useCursor";
export type { UseDrawingProps } from "./hooks/useDrawing";
export { useDrawing } from "./hooks/useDrawing";
export type { UseEraserProps } from "./hooks/useEraser";
export { useEraser } from "./hooks/useEraser";
export type { UseFillArgs } from "./hooks/useFill";
export { useFill } from "./hooks/useFill";
export type { UseMoveArgs } from "./hooks/useMove";
export { useMove } from "./hooks/useMove";

// Types
export type {
  BrushShape,
  BrushSize,
  Point,
  Position,
  Scale,
  Size,
} from "./types";
export { BRUSH_SHAPES, BRUSH_SIZES } from "./types";

// i18n
export { registerCanvasI18n } from "./locales/i18n";
