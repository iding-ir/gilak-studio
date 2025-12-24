import type { CanvasHistory } from "@gilak/canvas";
import { DrawingCanvas } from "@gilak/canvas";
import { MagnifierProvider } from "@gilak/color-picker";
import { FloatingWindow } from "@gilak/floating-window";
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
import { selectDoc, selectWin } from "../../features/settings/settings-slice";
import {
  selectTolerance,
  selectTool,
  unsetTool,
} from "../../features/tools/tools.slice";
import { WindowFooter } from "./WindowFooter";

export type WindowProps = {
  id: string;
  title: string;
};

export const Window = ({ id, title }: WindowProps) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasHistoryRef = useRef<CanvasHistory | null>(null);
  const brushSize = useAppSelector(selectBrushSize);
  const brushShape = useAppSelector(selectBrushShape);
  const selectedTool = useAppSelector(selectTool);
  const color = useAppSelector(selectColor);
  const backgroundColor = useAppSelector(selectBackgroundColor);
  const tolerance = useAppSelector(selectTolerance);
  const doc = useAppSelector(selectDoc);
  const win = useAppSelector(selectWin);
  const [width] = useState(doc.w);
  const [height] = useState(doc.h);

  const handleSelectColor = (color: string) => {
    dispatch(unsetTool());
    dispatch(setColor(color));
  };

  return (
    <ResizableScreenProvider>
      <FloatingWindow
        id={id}
        title={title}
        initialPosition={{ x: 50, y: 50 }}
        initialSize={{ w: win.w, h: win.h }}
        footer={<WindowFooter canvasHistoryRef={canvasHistoryRef} />}
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
