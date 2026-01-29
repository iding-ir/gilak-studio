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
  | { type: "FOCUS_ELEMENT"; payload: Pick<CanvasElement, "id"> };

const addElement = (element: CanvasElement): Action => ({
  type: "ADD_ELEMENT",
  payload: element,
});

const removeElement = (id: Pick<CanvasElement, "id">): Action => ({
  type: "REMOVE_ELEMENT",
  payload: id,
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

const hideElement = (id: Pick<CanvasElement, "id">): Action => ({
  type: "HIDE_ELEMENT",
  payload: id,
});

const showElement = (id: Pick<CanvasElement, "id">): Action => ({
  type: "SHOW_ELEMENT",
  payload: id,
});

const moveElementUp = (id: Pick<CanvasElement, "id">): Action => ({
  type: "MOVE_ELEMENT_UP",
  payload: id,
});

const moveElementDown = (id: Pick<CanvasElement, "id">): Action => ({
  type: "MOVE_ELEMENT_DOWN",
  payload: id,
});

const selectElement = (id: Pick<CanvasElement, "id">): Action => ({
  type: "SELECT_ELEMENT",
  payload: id,
});

const deselectElement = (id: Pick<CanvasElement, "id">): Action => ({
  type: "DESELECT_ELEMENT",
  payload: id,
});

const focusElement = (id: Pick<CanvasElement, "id">): Action => ({
  type: "FOCUS_ELEMENT",
  payload: id,
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
};

export type { Action };
