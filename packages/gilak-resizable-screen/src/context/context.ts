import { createContext } from "react";

import type { ContextValue } from "./types";

export const ResizableScreenContext = createContext<ContextValue | null>(null);
