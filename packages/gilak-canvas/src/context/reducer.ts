import { history } from "@gilak/utils";

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
      return { ...state, elementsHistory: history.createHistory(new Map()) };
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
      const newElements = new Map(state.elementsHistory.current);
      newElements.set(payload.id, {
        ...newElements.get(payload.id)!,
        selected: true,
      });
      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "DESELECT_ELEMENT": {
      const newElements = new Map(state.elementsHistory.current);
      newElements.set(payload.id, {
        ...newElements.get(payload.id)!,
        selected: false,
      });
      const newHistory = history.setHistory(state.elementsHistory, newElements);
      return { ...state, elementsHistory: newHistory };
    }
    case "FOCUS_ELEMENT": {
      const newElements = new Map(state.elementsHistory.current);
      newElements.set(payload.id, {
        ...newElements.get(payload.id)!,
        focused: true,
      });
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
