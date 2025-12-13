import { createContext } from "react";

import type { ColorPickerContextType } from "../types";

export const ColorPickerContext = createContext<ColorPickerContextType | null>(
  null,
);
