import { Slider } from "@gilak/components";
import { t } from "@gilak/localization";
import { createPortal } from "react-dom";

import { ZOOM_SELECTOR_PORTAL_ID } from "../../constants";
import { useZoomLevelScreenContext } from "../../context";
import type { ZoomLevel } from "../../context/types";

export const ZoomSelector = () => {
  return <div id={ZOOM_SELECTOR_PORTAL_ID}></div>;
};

export const ZoomSelectorSlider = () => {
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
      tooltip={t("resizableScreen:zoom")}
      ariaLabel={t("resizableScreen:zoom")}
      onChange={(v) => handleClick(v as ZoomLevel)}
      valueRenderer={(value) => `${value}%`}
    />
  );
};

export const ZoomSelectorPortal = () => {
  return createPortal(
    <ZoomSelectorSlider />,
    document.getElementById(ZOOM_SELECTOR_PORTAL_ID) as HTMLElement,
  );
};
