import { DrawingCanvas, useCanvas, useCanvasHistory } from "@gilak/canvas";
import { MagnifierProvider } from "@gilak/color-picker";
import { DropZone } from "@gilak/drag-n-drop";
import { FloatingWindow } from "@gilak/floating-window";
import { useFloatingWindow } from "@gilak/floating-window";
import {
  ResizableScreen,
  ResizableScreenProvider,
} from "@gilak/resizable-screen";
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
import { createContentFromImage } from "../../methods/create-content-form-image";
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
  const { size: defaultDocumentSize } = useAppSelector(selectSettingsDocument);
  const [documentWidth, setDocumentWidth] = useState(defaultDocumentSize.w);
  const [documentHeight, setDocumentHeight] = useState(defaultDocumentSize.h);
  const [openSettings, setOpenSettings] = useState(false);
  const { title } = useFloatingWindow(id);
  const history = useCanvasHistory({
    canvasRef,
    onChange: ({ width, height }) => {
      setDocumentWidth(width);
      setDocumentHeight(height);
    },
  });
  const { addContent } = useCanvas();
  const handleSelectColor = (color: string) => {
    dispatch(setColor(color));
  };

  return (
    <ResizableScreenProvider>
      <FloatingWindow
        id={id}
        title={title}
        editableTitle
        footer={<WindowFooter history={history} />}
        actions={
          <WindowActions
            id={id}
            canvasRef={canvasRef}
            onClickDocumentSettings={() => setOpenSettings(true)}
          />
        }
        className={styles.root}
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

                const content = await createContentFromImage({
                  data,
                  pointer,
                  documentWidth,
                  documentHeight,
                });

                addContent(content);
                history.snapshot();
              }}
            >
              <DrawingCanvas
                canvasRef={canvasRef}
                enabledDrawing={selectedTool === "BRUSH"}
                enabledFill={selectedTool === "FILL"}
                enabledEraser={selectedTool === "ERASER"}
                enabledMove={selectedTool === "MOVE"}
                color={color}
                backgroundColor={backgroundColor}
                brushSize={brushSize}
                brushShape={brushShape}
                tolerance={tolerance}
                width={documentWidth}
                height={documentHeight}
                onChange={history.snapshot}
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
