import { use } from "react";

import { DragNDropContext } from "./context";

export const useDragNDropContext = () => {
  const context = use(DragNDropContext);

  if (!context) {
    throw new Error(
      "useDragNDropContext must be used within DragNDropProvider",
    );
  }

  return context;
};
