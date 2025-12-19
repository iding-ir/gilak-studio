import { useContext } from "react";

import { ResizableScreenContext } from "./context";

export const useZoomLevelScreenContext = () => {
  const context = useContext(ResizableScreenContext);
  if (!context) {
    throw new Error(
      "useZoomLevelScreenContext must be used within a ResizableScreenProvider",
    );
  }
  return context;
};
