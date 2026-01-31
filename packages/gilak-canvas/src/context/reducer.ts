import { history } from "@gilak/utils";

import type { DrawingElement } from "../types/canvas";
import type { Action } from "./actions";
import type { State } from "./state";

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "ADD_ELEMENT": {
      const newElements = new Map(state.elementsHistory.current);
      newElements.set(payload.id, payload);
      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "REMOVE_ELEMENT": {
      const newElements = new Map(state.elementsHistory.current);
      newElements.delete(payload.id);
      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "UPDATE_ELEMENT": {
      const newElements = new Map(state.elementsHistory.current);
      newElements.set(payload.id, payload);
      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "CLEAR_ELEMENTS": {
      return {
        ...state,
        elementsHistory: history.createHistory(new Map()),
        focus: [],
      };
    }
    case "UNDO": {
      const newHistory = history.undoHistory(state.elementsHistory);
      return { ...state, elementsHistory: newHistory };
    }
    case "REDO": {
      const newHistory = history.redoHistory(state.elementsHistory);
      return { ...state, elementsHistory: newHistory };
    }
    case "HIDE_ELEMENT": {
      const newElements = new Map(state.elementsHistory.current);
      newElements.set(payload.id, {
        ...newElements.get(payload.id)!,
        visible: false,
      });
      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "SHOW_ELEMENT": {
      const newElements = new Map(state.elementsHistory.current);
      newElements.set(payload.id, {
        ...newElements.get(payload.id)!,
        visible: true,
      });
      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "MOVE_ELEMENT_UP":
      return moveElement(state, payload.id, 1);

    case "MOVE_ELEMENT_DOWN":
      return moveElement(state, payload.id, -1);
    case "SELECT_ELEMENT": {
      const newSelected = new Set(state.selected);
      newSelected.add(payload.id);
      return { ...state, selected: newSelected };
    }
    case "DESELECT_ELEMENT": {
      const newSelected = new Set(state.selected);
      newSelected.delete(payload.id);
      return { ...state, selected: newSelected };
    }
    case "FOCUS_ELEMENT": {
      return {
        ...state,
        focus: [payload.id, ...state.focus.filter((id) => id !== payload.id)],
      };
    }
    case "BLUR_ELEMENT": {
      return {
        ...state,
        focus: [...state.focus.filter((focusId) => focusId !== payload.id)],
      };
    }
    case "CHANGE_DRAWING_COLOR": {
      const newElements = new Map(state.elementsHistory.current);
      const element = newElements.get(payload.id) as DrawingElement | undefined;
      if (!element) return state;

      newElements.set(payload.id, {
        ...element,
        content: {
          ...element.content,
          color: payload.color,
        },
      });

      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "CHANGE_DRAWING_BRUSH_SIZE": {
      const newElements = new Map(state.elementsHistory.current);
      const element = newElements.get(payload.id) as DrawingElement | undefined;
      if (!element) return state;

      newElements.set(payload.id, {
        ...element,
        content: {
          ...element.content,
          brushSize: payload.brushSize,
        },
      });

      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "CHANGE_DRAWING_BRUSH_SHAPE": {
      const newElements = new Map(state.elementsHistory.current);
      const element = newElements.get(payload.id) as DrawingElement | undefined;
      if (!element) return state;

      newElements.set(payload.id, {
        ...element,
        content: {
          ...element.content,
          brushShape: payload.brushShape,
        },
      });

      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "CHANGE_IMAGE_SOURCE": {
      const newElements = new Map(state.elementsHistory.current);
      const element = newElements.get(payload.id);
      if (!element || element.type !== "image") return state;

      const updatedElement = {
        ...element,
        content: {
          ...element.content,
          image: payload.image,
        },
      };

      newElements.set(payload.id, updatedElement);

      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    default:
      return state;
  }
};

function moveElement(state: State, id: string, direction: 1 | -1) {
  const entries = Array.from(state.elementsHistory.current.entries());
  const index = entries.findIndex(([key]) => key === id);

  const targetIndex = index + direction;

  if (index === -1 || targetIndex < 0 || targetIndex >= entries.length) {
    return state;
  }

  const [entry] = entries.splice(index, 1);
  entries.splice(targetIndex, 0, entry);

  const reorderedElements = new Map(entries);

  return {
    ...state,
    elementsHistory: history.setHistory(
      state.elementsHistory,
      reorderedElements,
    ),
  };
}
