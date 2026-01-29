import { history } from "@gilak/utils";

import { actions, useCanvasContext } from "../context";
import type { CanvasElement } from "../types/canvas";

export const useCanvas = () => {
  const { state, dispatch } = useCanvasContext();

  const addElement = (element: CanvasElement) => {
    dispatch(actions.addElement(element));
  };

  const removeElement = (id: CanvasElement["id"]) => {
    dispatch(actions.removeElement({ id }));
  };

  const updateElement = (element: CanvasElement) => {
    dispatch(actions.updateElement(element));
  };

  const clearElements = () => {
    dispatch(actions.clearElements());
  };

  const redo = () => {
    dispatch(actions.redo());
  };

  const undo = () => {
    dispatch(actions.undo());
  };

  const hideElement = (id: CanvasElement["id"]) => {
    dispatch(actions.hideElement({ id }));
  };

  const showElement = (id: CanvasElement["id"]) => {
    dispatch(actions.showElement({ id }));
  };

  const moveElementUp = (id: CanvasElement["id"]) => {
    dispatch(actions.moveElementUp({ id }));
  };

  const moveElementDown = (id: CanvasElement["id"]) => {
    dispatch(actions.moveElementDown({ id }));
  };

  const selectElement = (id: CanvasElement["id"]) => {
    dispatch(actions.selectElement({ id }));
  };

  const deselectElement = (id: CanvasElement["id"]) => {
    dispatch(actions.deselectElement({ id }));
  };

  const focusElement = (id: CanvasElement["id"]) => {
    dispatch(actions.focusElement({ id }));
  };

  return {
    state,
    canUndo: history.canUndo(state.elementsHistory),
    canRedo: history.canRedo(state.elementsHistory),
    addElement,
    removeElement,
    updateElement,
    clearElements,
    redo,
    undo,
    hideElement,
    showElement,
    moveElementUp,
    moveElementDown,
    selectElement,
    deselectElement,
    focusElement,
  };
};
