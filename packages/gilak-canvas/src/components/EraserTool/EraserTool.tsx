import { type ReactNode, type RefObject } from "react";

import { useEraser } from "../../hooks/useEraser";
import type { BrushShape, BrushSize } from "../../types";
import { Cursor } from "../Cursor";

export type EraserToolProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  brushSize: BrushSize;
  brushShape: BrushShape;
  children?: ReactNode;
};

export const EraserTool = ({
  canvasRef,
  enabled,
  brushSize,
  brushShape,
  children,
}: EraserToolProps) => {
  useEraser({ canvasRef, enabled, brushSize, brushShape });

  return (
    <Cursor
      canvasRef={canvasRef}
      enabled={enabled}
      color={"#000000"}
      brushSize={brushSize}
      brushShape={brushShape}
    >
      {children}
    </Cursor>
  );
};

export default EraserTool;
