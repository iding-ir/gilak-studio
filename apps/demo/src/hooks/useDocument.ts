import { selectLayers, useCanvasContext } from "@gilak/canvas";

export const useDocument = (documentId: string) => {
  const { state } = useCanvasContext();
  const layers = selectLayers(state, documentId || "");

  return { layers };
};
