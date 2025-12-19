import { Dropdown, Icon, List, Text } from "@gilak/components";
import { type ReactNode, useRef, useState } from "react";

import IconZoom from "../../assets/icon-zoom.svg?url";
import { useResizableScreen } from "../../hooks/useResizableScreen";
import { type Zoom, zoomLevels } from "../../types";
import styles from "./ResizableScreen.module.scss";

export type ResizableScreenProps = {
  children: ReactNode;
  initialZoomLevel?: Zoom;
};

export const ResizableScreen = ({
  children,
  initialZoomLevel = 100,
}: ResizableScreenProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(initialZoomLevel);

  useResizableScreen({
    zoomLevel,
    padding: "var(--spacing-xl)",
    parentRef,
    childRef,
  });

  return (
    <div className={styles.root}>
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
      <div className={styles.footer}>
        <Dropdown
          position="top"
          trigger={
            <div className={styles.zoomTrigger}>
              <Icon icon={IconZoom} size="sm" interactive frameless />
              <Text size="xs" frameless text={`${zoomLevel}%`} />
            </div>
          }
        >
          <List
            direction="column"
            count={1}
            theme="light"
            items={zoomLevels.map((z) => (
              <Text
                selected={zoomLevel === z}
                size="xs"
                frameless
                onClick={() => setZoomLevel(z)}
                text={`${z.toString()}%`}
              />
            ))}
          />
        </Dropdown>
      </div>
    </div>
  );
};
