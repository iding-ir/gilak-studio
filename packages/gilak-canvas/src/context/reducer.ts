import { history } from "@gilak/utils";

import type { Action } from "./actions";
import type { State } from "./state";

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "ADD_CONTENT": {
      const newContents = new Map(state.contentsHistory.current);
      newContents.set(payload.id, payload);
      const newHistory = history.setHistory(state.contentsHistory, newContents);
      return { ...state, contentsHistory: newHistory };
    }
    case "REMOVE_CONTENT": {
      const newContents = new Map(state.contentsHistory.current);
      newContents.delete(payload.id);
      const newHistory = history.setHistory(state.contentsHistory, newContents);
      return { ...state, contentsHistory: newHistory };
    }
    case "UPDATE_CONTENT": {
      const newContents = new Map(state.contentsHistory.current);
      newContents.set(payload.id, payload);
      const newHistory = history.setHistory(state.contentsHistory, newContents);
      return { ...state, contentsHistory: newHistory };
    }
    case "CLEAR_CONTENTS": {
      return { ...state, contentsHistory: history.createHistory(new Map()) };
    }
    case "UNDO": {
      const newHistory = history.undoHistory(state.contentsHistory);
      return { ...state, contentsHistory: newHistory };
    }
    case "REDO": {
      const newHistory = history.redoHistory(state.contentsHistory);
      return { ...state, contentsHistory: newHistory };
    }
    default:
      return state;
  }
};
