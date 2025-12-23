import { type ReactNode, type RefObject } from "react";

import { useFill } from "../../hooks/useFill";
import { Cursor } from "../Cursor";

export type FillToolProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  tolerance: number;
  children: ReactNode;
};

export const FillTool = ({
  canvasRef,
  enabled,
  color,
  tolerance,
  children,
}: FillToolProps) => {
  useFill({ canvasRef, enabled, color, tolerance });

  return (
    <Cursor
      canvasRef={canvasRef}
      enabled={enabled}
      color={color}
      brushSize={2}
      brushShape="CIRCLE"
    >
      {children}
    </Cursor>
  );
};
