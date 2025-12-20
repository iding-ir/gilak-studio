import type { ReactNode, RefObject } from "react";

import { useColorPicker } from "../../hooks/useColorPicker";
import { Magnifier } from "../Magnifier";
import styles from "./MagnifierProvider.module.scss";

export type MagnifierProviderProps = {
  children: ReactNode;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onSelect: (color: string) => void;
};

export const MagnifierProvider = ({
  children,
  canvasRef,
  onSelect,
}: MagnifierProviderProps) => {
  const { setIsHovered } = useColorPicker();

  return (
    <div
      className={styles.root}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {children}
      <Magnifier canvasRef={canvasRef} onSelect={onSelect} />
    </div>
  );
};
