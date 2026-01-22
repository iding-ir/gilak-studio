import { ColorPickerProvider } from "@gilak/color-picker";
import { DialogPortal } from "@gilak/components";
import { DragImage, DragNDropProvider } from "@gilak/drag-n-drop";
import { FloatingWindowProvider } from "@gilak/floating-window";

import { Editor } from "../Editor";
import { useAppHead } from "./useAppHead";

export const App = () => {
  useAppHead();

  return (
    <>
      <ColorPickerProvider radiusCount={5} gridSize={15} borderWidth={20}>
        <FloatingWindowProvider>
          <DragNDropProvider>
            <Editor />
            <DragImage />
          </DragNDropProvider>
        </FloatingWindowProvider>
      </ColorPickerProvider>

      <DialogPortal />
    </>
  );
};
