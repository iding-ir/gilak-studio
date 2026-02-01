import {
  createElementFromImage,
  DrawingCanvas,
  ElementsPortal,
  UndoRedoPortal,
  useCanvas,
} from "@gilak/canvas";
import { MagnifierProvider } from "@gilak/color-picker";
import { DropZone } from "@gilak/drag-n-drop";
import { useDragNDropContext } from "@gilak/drag-n-drop";
import { FloatingWindow, useFloatingWindows } from "@gilak/floating-window";
import { useFloatingWindow } from "@gilak/floating-window";
import { selectFocusedWindow } from "@gilak/floating-window";
import type { ImageItem } from "@gilak/image-library";
import {
  ResizableScreen,
  ResizableScreenProvider,
} from "@gilak/resizable-screen";
import { ZoomSelectorPortal } from "@gilak/resizable-screen";
import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IMAGE_LIBRARY_DRAG_TYPE } from "../../constants";
import {
  selectBrushShape,
  selectBrushSize,
} from "../../features/brush/brush-slice";
import {
  selectBackgroundColor,
  selectColor,
  setColor,
} from "../../features/color/color-slice";
import { selectSettingsDocument } from "../../features/settings/settings-slice";
import { selectTolerance, selectTool } from "../../features/tools/tools.slice";
import { DocumentSettings } from "../DocumentSettings";
import styles from "./Window.module.scss";
import { WindowActions } from "./WindowActions";
import { WindowFooter } from "./WindowFooter";

export type WindowProps = {
  id: string;
};

export const Window = ({ id }: WindowProps) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brushSize = useAppSelector(selectBrushSize);
  const brushShape = useAppSelector(selectBrushShape);
  const selectedTool = useAppSelector(selectTool);
  const color = useAppSelector(selectColor);
  const backgroundColor = useAppSelector(selectBackgroundColor);
  const tolerance = useAppSelector(selectTolerance);
  const { size: documentSize } = useAppSelector(selectSettingsDocument);
  const [documentWidth, setDocumentWidth] = useState(documentSize.w);
  const [documentHeight, setDocumentHeight] = useState(documentSize.h);
  const [openSettings, setOpenSettings] = useState(false);
  const { title } = useFloatingWindow(id);
  const { state } = useFloatingWindows();
  const { state: dnd } = useDragNDropContext();
  const { addElement, clearElements } = useCanvas();

  const handleSelectColor = (color: string) => {
    dispatch(setColor(color));
  };

  const handleCloseWindow = () => {
    clearElements();
  };

  return (
    <ResizableScreenProvider>
      {selectFocusedWindow(state) === id && (
        <>
          <ElementsPortal />
          <UndoRedoPortal />
          <ZoomSelectorPortal />
        </>
      )}

      <FloatingWindow
        id={id}
        title={title}
        editableTitle
        footer={<WindowFooter />}
        actions={
          <WindowActions
            id={id}
            canvasRef={canvasRef}
            onClickDocumentSettings={() => setOpenSettings(true)}
          />
        }
        className={styles.root}
        onClose={handleCloseWindow}
      >
        <ResizableScreen>
          <MagnifierProvider
            canvasRef={canvasRef}
            enabled={selectedTool === "COLOR_PICKER"}
            onSelect={handleSelectColor}
          >
            <DropZone
              zoneId={`drop-zone-${id}`}
              ref={canvasRef}
              accepts={[IMAGE_LIBRARY_DRAG_TYPE]}
              activeClassName={styles.dragOver}
              onDrop={async ({ data, pointer }) => {
                if (!pointer) return;

                const element = await createElementFromImage({
                  src: (data as ImageItem).src,
                  position: pointer,
                  documentSize,
                });

                addElement(element);
              }}
            >
              <DrawingCanvas
                canvasRef={canvasRef}
                enabledDrawing={selectedTool === "BRUSH" && !dnd.isDragging}
                enabledFill={selectedTool === "FILL" && !dnd.isDragging}
                enabledEraser={selectedTool === "ERASER" && !dnd.isDragging}
                enabledMove={selectedTool === "MOVE" && !dnd.isDragging}
                enabledText={selectedTool === "TEXT" && !dnd.isDragging}
                color={color}
                backgroundColor={backgroundColor}
                brushSize={brushSize}
                brushShape={brushShape}
                tolerance={tolerance}
                size={documentSize}
              />
            </DropZone>
          </MagnifierProvider>
        </ResizableScreen>
      </FloatingWindow>
      {openSettings && (
        <DocumentSettings
          documentWidth={documentWidth}
          documentHeight={documentHeight}
          setDocumentWidth={setDocumentWidth}
          setDocumentHeight={setDocumentHeight}
          setDocumentSettingsOpen={setOpenSettings}
        />
      )}
    </ResizableScreenProvider>
  );
};
