import type { CanvasContent } from "../types/canvas";

type Action =
  | { type: "ADD_CONTENT"; payload: CanvasContent }
  | { type: "REMOVE_CONTENT"; payload: Pick<CanvasContent, "id"> }
  | { type: "UPDATE_CONTENT"; payload: CanvasContent }
  | { type: "CLEAR_CONTENTS"; payload?: undefined }
  | { type: "UNDO"; payload?: undefined }
  | { type: "REDO"; payload?: undefined };
const addContent: (content: CanvasContent) => Action = (content) => ({
  type: "ADD_CONTENT",
  payload: content,
});

const removeContent: (id: CanvasContent["id"]) => Action = (id) => ({
  type: "REMOVE_CONTENT",
  payload: { id },
});

const updateContent: (content: CanvasContent) => Action = (content) => ({
  type: "UPDATE_CONTENT",
  payload: content,
});

const clearContents: () => Action = () => ({
  type: "CLEAR_CONTENTS",
});

const undo: () => Action = () => ({
  type: "UNDO",
});

const redo: () => Action = () => ({
  type: "REDO",
});

export const actions = {
  addContent,
  removeContent,
  updateContent,
  clearContents,
  undo,
  redo,
};

export type { Action };
