import { useContext } from "react";

import FloatingWindowContext from "./provider";

export { FloatingWindowProvider } from "./provider";
export { initialState, reducer } from "./reducer";
export * from "./types";

export function useFloatingWindowContext() {
  const ctx = useContext(FloatingWindowContext);
  if (!ctx)
    throw new Error(
      "useFloatingWindowContext must be used within FloatingWindowProvider",
    );
  return ctx;
}

export { default as FloatingWindowContext } from "./provider";
