import { useZoomLevelScreenContext } from "@gilak/resizable-screen/context";
import { type ReactNode, useRef } from "react";

import { useZoomLevel } from "../../hooks/useZoomLevel";
import styles from "./ResizableScreen.module.scss";

export type ResizableScreenProps = {
  children: ReactNode;
};

export const ResizableScreen = ({ children }: ResizableScreenProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const {
    state: { zoomLevel },
  } = useZoomLevelScreenContext();

  useZoomLevel({
    zoomLevel,
    padding: "var(--spacing-xl)",
    parentRef,
    childRef,
  });

  return (
    <div
      ref={parentRef}
      className={styles.screen}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={childRef}
        className={styles.content}
        style={{ transform: `scale(${zoomLevel / 100})` }}
      >
        {children}
      </div>
    </div>
  );
};
