import { useLayers } from "@gilak/canvas";
import { type Size, useFloatingWindows } from "@gilak/floating-window";
import { randomId } from "@gilak/utils";

import { generateDefaultWindow, generateWindowId } from "../methods";

export const useDocument = () => {
  const { registerFloatingWindow } = useFloatingWindows();
  const { addLayer } = useLayers();

  const addDocument = (size: Size) => {
    const id = generateWindowId();

    registerFloatingWindow(generateDefaultWindow(id, size));
    addLayer({
      id: randomId({ prefix: "layer-" }),
      documentId: id,
      name: "Background",
      visible: true,
      selected: false,
      focused: true,
      content: [],
    });
  };

  return {
    addDocument,
  };
};
