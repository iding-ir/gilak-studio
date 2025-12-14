import clsx from "clsx";
import { type ReactNode, useState } from "react";

import { Dropdown } from "../DropDown";
import { Icon } from "../Icon";
import { List } from "../List";
import { Text } from "../Text";
import IconZoom from "./assets/icon-zoom.svg?url";
import styles from "./ResizableScreen.module.scss";
import type { Zoom } from "./types";
import { zoomLevels } from "./types";

export type ResizableScreenProps = {
  children: ReactNode;
  zoomLevel?: Zoom;
  hideOverflow?: boolean;
};

export const ResizableScreen = ({
  children,
  zoomLevel = 100,
  hideOverflow = false,
}: ResizableScreenProps) => {
  const [currentZoomLevel, setCurrentZoomLevel] = useState(zoomLevel);

  return (
    <div className={styles.root}>
      <div
        className={clsx(styles.screen, { [styles.hideOverflow]: hideOverflow })}
      >
        <div style={{ transform: `scale(${currentZoomLevel / 100})` }}>
          {children}
        </div>
      </div>
      <div className={styles.footer}>
        <Dropdown
          position="top"
          trigger={
            <div className={styles.zoomTrigger}>
              <Icon icon={IconZoom} size="sm" interactive frameless />
              <Text size="xs" frameless text={`${currentZoomLevel}%`} />
            </div>
          }
        >
          <List
            direction="column"
            count={1}
            theme="light"
            items={zoomLevels.map((z) => (
              <Text
                selected={currentZoomLevel === z}
                size="xs"
                frameless
                onClick={() => setCurrentZoomLevel(z)}
                text={`${z.toString()}%`}
              />
            ))}
          />
        </Dropdown>
      </div>
    </div>
  );
};
