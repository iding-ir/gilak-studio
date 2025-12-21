import type { ReactNode } from "react";

import {
  hasMinimizedWindows,
  selectMinimizedWindows,
  useFloatingWindowContext,
} from "../../context";
import { Header } from "../Header";
import styles from "./FloatingWindows.module.scss";

export type FloatingWindowsProps = {
  children: ReactNode;
};

export const FloatingWindows = ({ children }: FloatingWindowsProps) => {
  const { state } = useFloatingWindowContext();

  return (
    <div className={styles.container}>
      <div className={styles.windows}>{children}</div>

      {hasMinimizedWindows(state) && (
        <div className={styles.taskbar}>
          {selectMinimizedWindows(state).map(
            ({ id, title, maximizable, minimizable }) => (
              <Header
                key={id}
                id={id}
                title={title}
                draggable={false}
                maximizable={maximizable}
                minimizable={minimizable}
                onDragPointerDown={() => null}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};
