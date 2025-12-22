import type { BrushShape, BrushSize } from "@gilak/canvas";
import { brushShapeIcons } from "@gilak/canvas/types/brushShape";
import { ColorSwatch } from "@gilak/color-swatch";
import { Dropdown, Icon, Slider } from "@gilak/components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IconBrush from "../../assets/icon-brush.svg?url";
import IconColorPicker from "../../assets/icon-eyedropper.svg?url";
import IconFillTool from "../../assets/icon-paint.svg?url";
import IconSwatch from "../../assets/icon-palette.svg?url";
import { COLOR_PALETTE } from "../../constants";
import {
  selectBrushShape,
  selectBrushSize,
  setBrushShape,
  setBrushSize,
} from "../../features/brush/brush-slice";
import {
  selectBackgroundColor,
  selectColor,
  setBackgroundColor,
  setColor,
} from "../../features/color/color-slice";
import {
  selectTolerance,
  selectTool,
  setTolerance,
  toggleTool,
} from "../../features/tools/tools.slice";
import type { ToolType } from "../../features/tools/types";
import { BrushShapes } from "../BrushShapes";
import styles from "./Tools.module.scss";

export const Tools = () => {
  const dispatch = useAppDispatch();
  const brushSize = useAppSelector(selectBrushSize);
  const selectedTool = useAppSelector(selectTool);
  const color = useAppSelector(selectColor);
  const backgroundColor = useAppSelector(selectBackgroundColor);
  const tolerance = useAppSelector(selectTolerance);
  const brushShape = useAppSelector(selectBrushShape);

  const handleBrushShapeChange = (shape: BrushShape) => {
    dispatch(setBrushShape(shape));
  };

  const handleToggleTool = (tool: ToolType) => {
    dispatch(toggleTool(tool));
  };

  const handleBrushSizeChange = (size: BrushSize) => {
    dispatch(setBrushSize(size));
  };

  const handleChangeColor = (color: string) => {
    dispatch(setColor(color));
  };

  const handleChangeBackgroundColor = (color: string) => {
    dispatch(setBackgroundColor(color));
  };

  const handleToleranceChange = (value: number) => {
    dispatch(setTolerance(value));
  };

  return (
    <ul className={styles.root}>
      <li>
        <ColorSwatch
          icon={IconSwatch}
          color={color}
          backgroundColor={backgroundColor}
          colors={COLOR_PALETTE}
          onChangeColor={handleChangeColor}
          onChangeBackgroundColor={handleChangeBackgroundColor}
        />
      </li>
      <li>
        <Icon
          icon={IconColorPicker}
          selected={selectedTool === "COLOR_PICKER"}
          onClick={() => handleToggleTool("COLOR_PICKER")}
        />
      </li>
      <li>
        <Icon
          icon={IconBrush}
          selected={selectedTool === "BRUSH"}
          onClick={() => handleToggleTool("BRUSH")}
        />
      </li>
      <li>
        <Dropdown
          position="bottom"
          trigger={<Icon icon={brushShapeIcons[brushShape]} interactive />}
        >
          <BrushShapes brush={brushShape} onChange={handleBrushShapeChange} />
        </Dropdown>
      </li>
      <li>
        <Slider
          range={[1, 10]}
          step={1}
          initial={brushSize}
          label="Brush Size"
          onChange={(value) => handleBrushSizeChange(value as BrushSize)}
        />
      </li>
      <li>
        <Icon
          icon={IconFillTool}
          selected={selectedTool === "FILL"}
          onClick={() => handleToggleTool("FILL")}
        />
      </li>
      <li>
        <Slider
          range={[0, 100]}
          step={5}
          initial={tolerance}
          label="Tolerance"
          onChange={(value) => handleToleranceChange(value as number)}
        />
      </li>
    </ul>
  );
};
