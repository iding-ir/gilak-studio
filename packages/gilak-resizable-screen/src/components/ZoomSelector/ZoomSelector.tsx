import { Dropdown, Icon, List, Text } from "@gilak/components";
import { useZoomLevelScreenContext } from "@gilak/resizable-screen/context";

import IconZoom from "../../assets/icon-zoom.svg?url";
import type { ZoomLevel } from "../../context/types";
import { zoomLevels } from "../../context/types";
import styles from "./ZoomSelector.module.scss";

export const ZoomSelector = () => {
  const {
    state: { zoomLevel },
    dispatch,
  } = useZoomLevelScreenContext();

  const handleClick = (zoomLevel: ZoomLevel) => {
    dispatch({ type: "SET_ZOOM", payload: zoomLevel });
  };

  return (
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
            key={z}
            selected={zoomLevel === z}
            size="xs"
            frameless
            onClick={() => handleClick(z)}
            text={`${z.toString()}%`}
          />
        ))}
      />
    </Dropdown>
  );
};
