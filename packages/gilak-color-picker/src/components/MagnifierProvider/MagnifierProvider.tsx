import type { ReactNode } from "react";

import { useColorPicker } from "../../hooks/useColorPicker";
import styles from "./MagnifierProvider.module.scss";

export type MagnifierProviderProps = {
  children: ReactNode;
};

export const MagnifierProvider = ({ children }: MagnifierProviderProps) => {
  const { setIsHovered } = useColorPicker();

  return (
    <div
      className={styles.root}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};
