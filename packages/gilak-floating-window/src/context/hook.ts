import { use } from "react";

import { FloatingWindowContext } from "./context";

export const useFloatingWindowContext = () => {
  const context = use(FloatingWindowContext);

  if (!context) {
    throw new Error(
      "useFloatingWindowContext must be used within FloatingWindowProvider",
    );
  }

  return context;
};
