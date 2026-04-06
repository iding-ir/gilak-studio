import { ColorPickerProvider } from "@gilak/color-picker";
import { DialogPortal } from "@gilak/components";
import { DragImage, DragNDropProvider } from "@gilak/drag-n-drop";
import { FloatingWindowProvider } from "@gilak/floating-window";

import { useAppSelector } from "../../app/hooks";
import { selectSettingsAutoSaveEnabled } from "../../features/settings/settings-slice";
import { Editor } from "../Editor";
import { useAppHead } from "./useAppHead";

export const App = () => {
  useAppHead();
  const autoSaveEnabled = useAppSelector(selectSettingsAutoSaveEnabled);

  return (
    <>
      <ColorPickerProvider radiusCount={5} gridSize={15} borderWidth={20}>
        <FloatingWindowProvider autoSave={autoSaveEnabled}>
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
