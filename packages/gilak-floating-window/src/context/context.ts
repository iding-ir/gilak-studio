import { createContext } from "react";

import type { ContextValue } from "./types";

export const FloatingWindowContext = createContext<ContextValue | undefined>(
  undefined,
);
