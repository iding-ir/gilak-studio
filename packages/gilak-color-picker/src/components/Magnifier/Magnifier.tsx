import { getContrastColor } from "@gilak/utils";
import { type RefObject, useMemo } from "react";

import { useColorPicker, useMagnifier } from "../../hooks";
import styles from "./Magnifier.module.scss";

export type MagnifierProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  onSelect: (color: string) => void;
};

export const Magnifier = ({ canvasRef, enabled, onSelect }: MagnifierProps) => {
  const { hoverColor, borderWidth } = useColorPicker();
  const { containerRef, magnifierRef } = useMagnifier({
    canvasRef,
    enabled,
    onSelect,
  });

  const visibleColor = useMemo(() => {
    return hoverColor === "transparent"
      ? "rgba(210, 210, 210, 0.5)"
      : hoverColor;
  }, [hoverColor]);

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas
        ref={magnifierRef}
        style={{ borderColor: visibleColor, borderWidth }}
        width={0}
        height={0}
      />

      <div
        className={styles.text}
        style={{
          color: getContrastColor(hoverColor),
          backgroundColor: visibleColor,
          borderColor: getContrastColor(hoverColor),
        }}
      >
        {hoverColor}
      </div>
    </div>
  );
};
