import { use } from "react";

import { CanvasContext } from "./context";

export const useCanvasContext = () => {
  const context = use(CanvasContext);

  if (!context) {
    throw new Error("Canvas components must be wrapped with CanvasProvider");
  }

  return context;
};
