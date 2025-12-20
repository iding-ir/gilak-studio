import { getContrastColor } from "@gilak/utils";
import { type RefObject } from "react";

import { useColorPicker } from "../../hooks/useColorPicker";
import { useMagnifier } from "../../hooks/useMagnifier";
import styles from "./Magnifier.module.scss";

export type MagnifierProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onSelect: (color: string) => void;
};

export const Magnifier = ({ canvasRef, onSelect }: MagnifierProps) => {
  const { isHovered, hoverColor, borderWidth } = useColorPicker();
  const { containerRef, magnifierRef } = useMagnifier({ onSelect, canvasRef });

  if (!isHovered) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas
        ref={magnifierRef}
        style={{ borderColor: hoverColor, borderWidth }}
        width={0}
        height={0}
      />

      <div
        className={styles.text}
        style={{
          color: getContrastColor(hoverColor),
          backgroundColor: hoverColor,
          borderColor: getContrastColor(hoverColor),
        }}
      >
        {hoverColor}
      </div>
    </div>
  );
};
