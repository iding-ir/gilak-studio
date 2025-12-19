import { type BrushSize, type BrushType } from "@gilak/canvas";
import { ColorSwatch } from "@gilak/color-swatch";
import { Dropdown, Icon, Menu } from "@gilak/components";
import { ResizableScreen } from "@gilak/components";
import { FloatingWindowProvider } from "@gilak/floating-window";
import { FloatingWindow } from "@gilak/floating-window";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IconBrushTypes from "../../assets/brush-circle.svg?url";
import IconBrushSizes from "../../assets/brush-circle-empty.svg?url";
import IconBrush from "../../assets/icon-brush.svg?url";
import IconBucketUrl from "../../assets/icon-bucket.svg?url";
import IconColorPickerUrl from "../../assets/icon-eyedropper.svg?url";
import { COLOR_PALETTE } from "../../constants";
import {
  selectBrushSize,
  selectBrushType,
  setBrushSize,
  setBrushType,
} from "../../features/brush/brush-slice";
import { selectTool, toggleTool } from "../../features/tools/tools.slice";
import type { ToolType } from "../../features/tools/types";
import {
  addWindow,
  selectAllWindows,
} from "../../features/windows/windows-slice";
import { BrushSizes } from "../BrushSizes";
import { BrushTypes } from "../BrushTypes";
import { DrawingCanvas } from "../DrawingCanvas";
import styles from "./Editor.module.scss";

export const Editor = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector(selectAllWindows);
  const brushType = useAppSelector(selectBrushType);
  const brushSize = useAppSelector(selectBrushSize);
  const selectedTool = useAppSelector(selectTool);
  const [selectedColor, setSelectedColor] = useState<string>("#000000");

  const handleAddWindow = () => {
    dispatch(
      addWindow({
        id: `${Date.now()}`,
        title: "New Canvas",
      }),
    );
  };

  const handleToggleTool = (tool: ToolType) => {
    dispatch(toggleTool(tool));
  };

  const handleBrushTypeChange = (type: BrushType) => {
    dispatch(setBrushType(type));
  };

  const handleBrushSizeChange = (size: BrushSize) => {
    dispatch(setBrushSize(size));
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
            <Dropdown
              position="bottom"
              trigger={<Icon icon={IconBrushTypes} size="md" interactive />}
            >
              <BrushTypes brush={brushType} onChange={handleBrushTypeChange} />
            </Dropdown>
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
              onChange={setSelectedColor}
            />
          </li>
        </ul>
      </header>

      <main className={styles.main}>
        <FloatingWindowProvider>
          {windows.map(({ id, title }) => (
            <FloatingWindow
              key={id}
              id={id}
              title={title}
              initialPosition={{ x: 50, y: 50 }}
              initialSize={{ w: 800, h: 600 }}
            >
              <ResizableScreen initialZoomLevel={100}>
                <DrawingCanvas
                  brushSize={brushSize}
                  brushType={brushType}
                  color={selectedColor}
                  enabled={selectedTool === "BRUSH"}
                />
              </ResizableScreen>
            </FloatingWindow>
          ))}
        </FloatingWindowProvider>
      </main>
    </div>
  );
};
