import type { ReactNode, RefObject } from "react";

import { Magnifier } from "../Magnifier";
import styles from "./MagnifierProvider.module.scss";

export type MagnifierProviderProps = {
  children: ReactNode;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  enabled: boolean;
  onSelect: (color: string) => void;
};

export const MagnifierProvider = ({
  children,
  canvasRef,
  enabled,
  onSelect,
}: MagnifierProviderProps) => {
  return (
    <div className={styles.root}>
      {children}
      <Magnifier canvasRef={canvasRef} enabled={enabled} onSelect={onSelect} />
    </div>
  );
};
