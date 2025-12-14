import { useContext } from "react";

import { FloatingWindowContext } from "./context";

export { FloatingWindowProvider } from "./provider";
export { initialState, reducer } from "./reducer";
export * from "./types";

export const useFloatingWindowContext = () => {
  const ctx = useContext(FloatingWindowContext);
  if (!ctx)
    throw new Error(
      "useFloatingWindowContext must be used within FloatingWindowProvider",
    );
  return ctx;
};
