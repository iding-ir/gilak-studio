import { createContext } from "react";

import type { ContextValue } from "./types";

export const ImageLibraryContext = createContext<ContextValue | null>(null);
