import { createContext } from "react";

import type { ContextValue } from "./types";

export const CanvasContext = createContext<ContextValue | null>(null);
