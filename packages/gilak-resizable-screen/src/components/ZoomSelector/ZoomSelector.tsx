import { Slider } from "@gilak/components";
import { t } from "@gilak/localization";
import { useZoomLevelScreenContext } from "@gilak/resizable-screen";

import type { ZoomLevel } from "../../context/types";

export const ZoomSelector = () => {
  const {
    state: { zoomLevel },
    dispatch,
  } = useZoomLevelScreenContext();

  const handleClick = (zoomLevel: ZoomLevel) => {
    dispatch({ type: "SET_ZOOM", payload: zoomLevel });
  };

  return (
    <Slider
      range={[25, 200]}
      step={25}
      initial={zoomLevel}
      label={t("resizableScreen:zoom")}
      onChange={(v) => handleClick(v as ZoomLevel)}
      valueRenderer={(value) => `${value}%`}
    />
  );
};
