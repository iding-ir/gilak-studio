import { type Size, useFloatingWindows } from "@gilak/floating-window";

import { generateDefaultWindow, generateWindowId } from "../methods";

export const useDocument = () => {
  const { registerFloatingWindow } = useFloatingWindows();

  const addDocument = (size: Size) => {
    const id = generateWindowId();
    registerFloatingWindow(generateDefaultWindow(id, size));
  };

  return {
    addDocument,
  };
};
