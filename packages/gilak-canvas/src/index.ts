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
  selectDrawingElements,
  selectElementById,
  selectElements,
  selectFocusedElement,
  selectHiddenElements,
  selectImageElements,
  selectSelectedElements,
  selectTextElements,
  selectVisibleElements,
  useCanvasContext,
} from "./context";

// Methods
export type { ImageFormat } from "./methods/canvas-to-blob";
export { canvasToBlob } from "./methods/canvas-to-blob";
export { createElementFromDrawing } from "./methods/create-element-from-drawing";
export { createElementFromImage } from "./methods/create-element-from-image";
export { downloadCanvas } from "./methods/download-canvas";
export { drawBrush } from "./methods/draw-brush";
export { drawEraser } from "./methods/draw-eraser";
export { drawRandomEffect } from "./methods/draw-random-effect";
export { fillArea } from "./methods/fill-area";

// Hooks
export { useCanvas } from "./hooks/useCanvas";
export { useCanvasPointer } from "./hooks/useCanvasPointer";
export { useCanvasRenderer } from "./hooks/useCanvasRenderer";
export { useCanvasSize } from "./hooks/useCanvasSize";
export { useCursor } from "./hooks/useCursor";
export { useDrawing } from "./hooks/useDrawing";
export { useEraser } from "./hooks/useEraser";
export { useFill } from "./hooks/useFill";
export { useMove } from "./hooks/useMove";

// Types
export type {
  BrushShape,
  BrushSize,
  CursorShape,
  Point,
  Position,
  Scale,
  Size,
} from "./types";
export { BRUSH_SHAPES, BRUSH_SIZES, CURSOR_SHAPES } from "./types";

// i18n
export { registerCanvasI18n } from "./locales/i18n";
