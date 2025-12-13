import { ColorPickerProvider } from "@gilak/color-picker";

import { Editor } from "../Editor";

export const App: React.FC = () => {
  return (
    <ColorPickerProvider
      enabled={false}
      magnifierRadius={5}
      gridSize={15}
      borderWidth={20}
    >
      <Editor />
    </ColorPickerProvider>
  );
};
