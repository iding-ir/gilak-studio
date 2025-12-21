import type { BrushSize } from "@gilak/canvas";
import IconBrushSizes from "@gilak/canvas/assets/brush-circle-empty.svg?url";
import { ColorSwatch } from "@gilak/color-swatch";
import { Dropdown, Icon } from "@gilak/components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IconBrush from "../../assets/icon-brush.svg?url";
import IconBucketUrl from "../../assets/icon-bucket.svg?url";
import IconColorPickerUrl from "../../assets/icon-eyedropper.svg?url";
import { COLOR_PALETTE } from "../../constants";
import {
  selectBrushSize,
  setBrushSize,
} from "../../features/brush/brush-slice";
import { selectColor, setColor } from "../../features/color/color-slice";
import { selectTool, toggleTool } from "../../features/tools/tools.slice";
import type { ToolType } from "../../features/tools/types";
import { BrushShapeDropdown } from "../BrushShapeDropdown/BrushShapeDropdown";
import { BrushSizes } from "../BrushSizes";
import styles from "./Tools.module.scss";

export const Tools = () => {
  const dispatch = useAppDispatch();
  const brushSize = useAppSelector(selectBrushSize);
  const selectedTool = useAppSelector(selectTool);
  const selectedColor = useAppSelector(selectColor);

  const handleToggleTool = (tool: ToolType) => {
    dispatch(toggleTool(tool));
  };

  const handleBrushSizeChange = (size: BrushSize) => {
    dispatch(setBrushSize(size));
  };

  const handleChangeColor = (color: string) => {
    dispatch(setColor(color));
  };
  return (
    <ul className={styles.root}>
      <li>
        <ColorSwatch
          size="md"
          icon={IconBucketUrl}
          color={selectedColor}
          colors={COLOR_PALETTE}
          onChange={handleChangeColor}
        />
      </li>
      <li>
        <Icon
          icon={IconColorPickerUrl}
          size="md"
          selected={selectedTool === "COLOR_PICKER"}
          onClick={() => handleToggleTool("COLOR_PICKER")}
        />
      </li>
      <li>
        <Icon
          icon={IconBrush}
          size="md"
          selected={selectedTool === "BRUSH"}
          onClick={() => handleToggleTool("BRUSH")}
        />
      </li>
      <li>
        <BrushShapeDropdown />
      </li>
      <li>
        <Dropdown
          position="bottom"
          trigger={<Icon icon={IconBrushSizes} size="md" interactive />}
        >
          <BrushSizes brush={brushSize} onChange={handleBrushSizeChange} />
        </Dropdown>
      </li>
    </ul>
  );
};
