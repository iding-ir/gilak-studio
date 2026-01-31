import type { BrushShape, BrushSize } from "../types";
import type { CanvasElement } from "../types/canvas";

type Action =
  | { type: "ADD_ELEMENT"; payload: CanvasElement }
  | { type: "REMOVE_ELEMENT"; payload: Pick<CanvasElement, "id"> }
  | { type: "UPDATE_ELEMENT"; payload: CanvasElement }
  | { type: "CLEAR_ELEMENTS"; payload?: undefined }
  | { type: "UNDO"; payload?: undefined }
  | { type: "REDO"; payload?: undefined }
  | { type: "HIDE_ELEMENT"; payload: Pick<CanvasElement, "id"> }
  | { type: "SHOW_ELEMENT"; payload: Pick<CanvasElement, "id"> }
  | { type: "MOVE_ELEMENT_UP"; payload: Pick<CanvasElement, "id"> }
  | { type: "MOVE_ELEMENT_DOWN"; payload: Pick<CanvasElement, "id"> }
  | { type: "SELECT_ELEMENT"; payload: Pick<CanvasElement, "id"> }
  | { type: "DESELECT_ELEMENT"; payload: Pick<CanvasElement, "id"> }
  | { type: "FOCUS_ELEMENT"; payload: Pick<CanvasElement, "id"> }
  | { type: "BLUR_ELEMENT"; payload: Pick<CanvasElement, "id"> }
  | {
      type: "CHANGE_DRAWING_COLOR";
      payload: Pick<CanvasElement, "id"> & { color: string };
    }
  | {
      type: "CHANGE_DRAWING_BRUSH_SIZE";
      payload: Pick<CanvasElement, "id"> & { brushSize: BrushSize };
    }
  | {
      type: "CHANGE_DRAWING_BRUSH_SHAPE";
      payload: Pick<CanvasElement, "id"> & { brushShape: BrushShape };
    }
  | {
      type: "CHANGE_IMAGE_SOURCE";
      payload: Pick<CanvasElement, "id"> & { image: ImageBitmap };
    };

const addElement = (element: CanvasElement): Action => ({
  type: "ADD_ELEMENT",
  payload: element,
});

const removeElement = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "REMOVE_ELEMENT",
  payload,
});

const updateElement = (element: CanvasElement): Action => ({
  type: "UPDATE_ELEMENT",
  payload: element,
});

const clearElements = (): Action => ({
  type: "CLEAR_ELEMENTS",
});

const undo = (): Action => ({
  type: "UNDO",
});

const redo = (): Action => ({
  type: "REDO",
});

const hideElement = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "HIDE_ELEMENT",
  payload,
});

const showElement = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "SHOW_ELEMENT",
  payload,
});

const moveElementUp = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "MOVE_ELEMENT_UP",
  payload,
});

const moveElementDown = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "MOVE_ELEMENT_DOWN",
  payload,
});

const selectElement = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "SELECT_ELEMENT",
  payload,
});

const deselectElement = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "DESELECT_ELEMENT",
  payload,
});

const focusElement = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "FOCUS_ELEMENT",
  payload,
});

const blurElement = (payload: Pick<CanvasElement, "id">): Action => ({
  type: "BLUR_ELEMENT",
  payload,
});

const changeDrawingColor = (
  payload: Pick<CanvasElement, "id"> & { color: string },
): Action => ({
  type: "CHANGE_DRAWING_COLOR",
  payload,
});

const changeDrawingBrushSize = (
  payload: Pick<CanvasElement, "id"> & { brushSize: BrushSize },
): Action => ({
  type: "CHANGE_DRAWING_BRUSH_SIZE",
  payload,
});

const changeDrawingBrushShape = (
  payload: Pick<CanvasElement, "id"> & { brushShape: BrushShape },
): Action => ({
  type: "CHANGE_DRAWING_BRUSH_SHAPE",
  payload,
});

const changeImageSource = (
  payload: Pick<CanvasElement, "id"> & { image: ImageBitmap },
): Action => ({
  type: "CHANGE_IMAGE_SOURCE",
  payload,
});

export const actions = {
  addElement,
  removeElement,
  updateElement,
  clearElements,
  undo,
  redo,
  hideElement,
  showElement,
  moveElementUp,
  moveElementDown,
  selectElement,
  deselectElement,
  focusElement,
  blurElement,
  changeDrawingColor,
  changeDrawingBrushSize,
  changeDrawingBrushShape,
  changeImageSource,
};

export type { Action };
