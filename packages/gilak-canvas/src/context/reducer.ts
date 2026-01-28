import type { Action } from "./actions";
import type { State } from "./state";

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "ADD_CONTENT": {
      const newContents = new Map(state.contents);
      newContents.set(payload.id, payload);
      return {
        ...state,
        contents: newContents,
      };
    }
    case "REMOVE_CONTENT": {
      const newContents = new Map(state.contents);
      newContents.delete(payload.id);
      return {
        ...state,
        contents: newContents,
      };
    }
    case "UPDATE_CONTENT": {
      const newContents = new Map(state.contents);
      newContents.set(payload.id, payload);
      return {
        ...state,
        contents: newContents,
      };
    }
    case "CLEAR_CONTENTS": {
      return {
        ...state,
        contents: new Map(),
      };
    }
    default:
      return state;
  }
};
