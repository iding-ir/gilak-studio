import type { CanvasHistory } from "@gilak/canvas";
import { DrawingCanvas } from "@gilak/canvas";
import { MagnifierProvider } from "@gilak/color-picker";
import { FloatingWindow } from "@gilak/floating-window";
import { useFloatingWindow } from "@gilak/floating-window";
import {
  ResizableScreen,
  ResizableScreenProvider,
} from "@gilak/resizable-screen";
import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import { WindowActions } from "./WindowActions";
import { WindowFooter } from "./WindowFooter";

export type WindowProps = {
  id: string;
};

export const Window = ({ id }: WindowProps) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasHistoryRef = useRef<CanvasHistory | null>(null);
  const brushSize = useAppSelector(selectBrushSize);
  const brushShape = useAppSelector(selectBrushShape);
  const selectedTool = useAppSelector(selectTool);
  const color = useAppSelector(selectColor);
  const backgroundColor = useAppSelector(selectBackgroundColor);
  const tolerance = useAppSelector(selectTolerance);
  const { size: defaultDocumentSize } = useAppSelector(selectSettingsDocument);
  const [width] = useState(defaultDocumentSize.w);
  const [height] = useState(defaultDocumentSize.h);
  const { title, size, position } = useFloatingWindow(id);

  const handleSelectColor = (color: string) => {
    dispatch(setColor(color));
  };

  return (
    <ResizableScreenProvider>
      <FloatingWindow
        id={id}
        title={title}
        initialPosition={position}
        initialSize={size}
        editableTitle
        footer={
          <WindowFooter
            canvasRef={canvasRef}
            canvasHistoryRef={canvasHistoryRef}
          />
        }
        actions={<WindowActions id={id} canvasRef={canvasRef} />}
      >
        <ResizableScreen>
          <MagnifierProvider
            canvasRef={canvasRef}
            enabled={selectedTool === "COLOR_PICKER"}
            onSelect={handleSelectColor}
          >
            <DrawingCanvas
              canvasRef={canvasRef}
              enabledDrawing={selectedTool === "BRUSH"}
              enabledFill={selectedTool === "FILL"}
              enabledEraser={selectedTool === "ERASER"}
              color={color}
              backgroundColor={backgroundColor}
              brushSize={brushSize}
              brushShape={brushShape}
              tolerance={tolerance}
              width={width}
              height={height}
              onHistoryChange={(api) => {
                canvasHistoryRef.current = api;
              }}
            />
          </MagnifierProvider>
        </ResizableScreen>
      </FloatingWindow>
    </ResizableScreenProvider>
  );
};
