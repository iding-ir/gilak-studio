import { use } from "react";

import { ColorPickerContext } from "./context";

export const useColorPickerContext = () => {
  const context = use(ColorPickerContext);

  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider");
  }

  return context;
};
