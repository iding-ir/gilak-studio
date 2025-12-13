import { use } from "react";

import { ColorPickerContext } from "../context/ColorPickerContext";

export const useColorPicker = () => {
  const context = use(ColorPickerContext);

  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider");
  }

  return context;
};
