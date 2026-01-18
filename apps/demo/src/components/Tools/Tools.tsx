import type { BrushShape, BrushSize } from "@gilak/canvas";
import IconBackslash from "@gilak/canvas/assets/brush-backslash.svg?url";
import IconCircle from "@gilak/canvas/assets/brush-circle.svg?url";
import IconDisamond from "@gilak/canvas/assets/brush-diamond.svg?url";
import IconHorizontal from "@gilak/canvas/assets/brush-horizontal.svg?url";
import IconSlash from "@gilak/canvas/assets/brush-slash.svg?url";
import IconSquare from "@gilak/canvas/assets/brush-square.svg?url";
import IconStar from "@gilak/canvas/assets/brush-star.svg?url";
import IconTriangle from "@gilak/canvas/assets/brush-triangle.svg?url";
import IconVerical from "@gilak/canvas/assets/brush-vertical.svg?url";
import { BRUSH_SHAPES, brushShapeIcons } from "@gilak/canvas/types/brushShape";
import { ColorSwatch } from "@gilak/color-swatch";
import { Dropdown, List, Slider } from "@gilak/components";
import { IconButton } from "@gilak/components/components/Icon/Icon";
import { t } from "@gilak/localization";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IconBrushTool from "../../assets/icon-brush.svg?url";
import IconColorPicker from "../../assets/icon-color-picker.svg?url";
import IconSwatch from "../../assets/icon-color-swatch.svg?url";
import IconEraserTool from "../../assets/icon-eraser.svg?url";
import IconFillTool from "../../assets/icon-fill-tool.svg?url";
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

const icons: Record<BrushShape, string> = {
  CIRCLE: IconCircle,
  SQUARE: IconSquare,
  DIAMOND: IconDisamond,
  TRIANGLE: IconTriangle,
  STAR: IconStar,
  HORIZONTAL: IconHorizontal,
  VERTICAL: IconVerical,
  BACKSLASH: IconBackslash,
  SLASH: IconSlash,
};

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
          label={t("app:tools.colorSwatch")}
        />
      </li>
      <li>
        <IconButton
          icon={IconBrushTool}
          selected={selectedTool === "BRUSH"}
          tooltip={t("app:tools.brush")}
          onClick={() => handleToggleTool("BRUSH")}
        />
      </li>
      <li>
        <IconButton
          icon={IconEraserTool}
          selected={selectedTool === "ERASER"}
          tooltip={t("app:tools.eraser")}
          onClick={() => handleToggleTool("ERASER")}
        />
      </li>
      <li>
        <Dropdown
          position="bottom"
          trigger={
            <IconButton
              icon={brushShapeIcons[brushShape]}
              tooltip={t("app:tools.brushShapes")}
              interactive
            />
          }
        >
          <List
            direction="column"
            count={3}
            interactive
            variant="light"
            items={BRUSH_SHAPES.map((bs) => (
              <IconButton
                selected={bs === brushShape}
                icon={icons[bs]}
                frameless
                onClick={() => handleBrushShapeChange(bs)}
              />
            ))}
          />
        </Dropdown>
      </li>
      <li>
        <Slider
          range={[1, 10]}
          step={1}
          initial={brushSize}
          tooltip={t("app:tools.size")}
          ariaLabel={t("app:tools.size")}
          onChange={(value) => handleBrushSizeChange(value as BrushSize)}
        />
      </li>
      <li>
        <IconButton
          icon={IconColorPicker}
          selected={selectedTool === "COLOR_PICKER"}
          tooltip={t("app:tools.colorPicker")}
          onClick={() => handleToggleTool("COLOR_PICKER")}
        />
      </li>
      <li>
        <IconButton
          icon={IconFillTool}
          selected={selectedTool === "FILL"}
          tooltip={t("app:tools.fill")}
          onClick={() => handleToggleTool("FILL")}
        />
      </li>
      <li>
        <Slider
          range={[0, 250]}
          step={5}
          initial={tolerance}
          tooltip={t("app:tools.tolerance")}
          ariaLabel={t("app:tools.tolerance")}
          onChange={(value) => handleToleranceChange(value as number)}
        />
      </li>
    </ul>
  );
};
