import { type ReactNode, type RefObject } from "react";

import { useFill } from "../../hooks/useFill";
import { Cursor } from "../Cursor";

export type FillToolProps = {
  ref: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  color: string;
  tolerance: number;
  children: ReactNode;
};

export const FillTool = ({
  ref,
  enabled,
  color,
  tolerance,
  children,
}: FillToolProps) => {
  useFill({ ref, enabled, color, tolerance });

  return (
    <Cursor enabled={enabled} color={color} brushSize={2} brushShape="CIRCLE">
      {children}
    </Cursor>
  );
};
