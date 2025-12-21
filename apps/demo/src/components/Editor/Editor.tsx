import { type BrushSize } from "@gilak/canvas";
import IconBrushSizes from "@gilak/canvas/assets/brush-circle-empty.svg?url";
import { ColorSwatch } from "@gilak/color-swatch";
import { Dropdown, Icon, Menu } from "@gilak/components";
import { FloatingWindowProvider } from "@gilak/floating-window";

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
import {
  addWindow,
  selectAllWindows,
} from "../../features/windows/windows-slice";
import { BrushShapeDropdown } from "../BrushShapeDropdown/BrushShapeDropdown";
import { BrushSizes } from "../BrushSizes";
import { Window } from "../Window";
import styles from "./Editor.module.scss";

export const Editor = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector(selectAllWindows);
  const brushSize = useAppSelector(selectBrushSize);
  const selectedTool = useAppSelector(selectTool);
  const selectedColor = useAppSelector(selectColor);

  const handleAddWindow = () => {
    const id = Date.now().toString();
    const title = `Untitled-${windows.length + 1}`;
    dispatch(addWindow({ id, title }));
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

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <Menu label="" root direction="row" open>
          <Menu label="File" direction="column">
            <Menu label="New" onClick={handleAddWindow} />
            <Menu label="Open" />
          </Menu>
          <Menu label="View" />
          <Menu label="Help" />
        </Menu>
      </nav>

      <header className={styles.header}>
        <ul className={styles.tools}>
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
        <ul className={styles.colors}>
          <li>
            <ColorSwatch
              size="md"
              icon={IconBucketUrl}
              color={selectedColor}
              colors={COLOR_PALETTE}
              onChange={handleChangeColor}
            />
          </li>
        </ul>
      </header>

      <main className={styles.main}>
        <FloatingWindowProvider>
          {windows.map(({ id, title }) => (
            <Window key={id} id={id} title={title} />
          ))}
        </FloatingWindowProvider>
      </main>
    </div>
  );
};
