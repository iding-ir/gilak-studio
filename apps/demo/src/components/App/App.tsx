import { ColorPickerProvider } from "@gilak/color-picker";

import { Editor } from "../Editor";

export const App = () => {
  return (
    <ColorPickerProvider radiusCount={5} gridSize={15} borderWidth={20}>
      <Editor />
    </ColorPickerProvider>
  );
};
