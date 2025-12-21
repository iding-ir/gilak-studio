import { type BrushSize, DrawingCanvas } from "@gilak/canvas";
import IconBrushSizes from "@gilak/canvas/assets/brush-circle-empty.svg?url";
import { MagnifierProvider } from "@gilak/color-picker";
import { ColorSwatch } from "@gilak/color-swatch";
import { Dropdown, Icon, Menu } from "@gilak/components";
import { FloatingWindowProvider } from "@gilak/floating-window";
import { FloatingWindow } from "@gilak/floating-window";
import {
  ResizableScreen,
  ResizableScreenProvider,
  ZoomSelector,
} from "@gilak/resizable-screen";
import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import IconBrush from "../../assets/icon-brush.svg?url";
import IconBucketUrl from "../../assets/icon-bucket.svg?url";
import IconColorPickerUrl from "../../assets/icon-eyedropper.svg?url";
import { COLOR_PALETTE } from "../../constants";
import {
  selectBrushShape,
  selectBrushSize,
  setBrushSize,
} from "../../features/brush/brush-slice";
import {
  selectTool,
  toggleTool,
  unsetTool,
} from "../../features/tools/tools.slice";
import type { ToolType } from "../../features/tools/types";
import {
  addWindow,
  selectAllWindows,
} from "../../features/windows/windows-slice";
import { BrushShapeDropdown } from "../BrushShapeDropdown/BrushShapeDropdown";
import { BrushSizes } from "../BrushSizes";
import styles from "./Editor.module.scss";

export const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const windows = useAppSelector(selectAllWindows);
  const brushShape = useAppSelector(selectBrushShape);
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

  const handleBrushSizeChange = (size: BrushSize) => {
    dispatch(setBrushSize(size));
  };

  const handleSelectColor = (color: string) => {
    dispatch(unsetTool());
    setSelectedColor(color);
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
              onChange={setSelectedColor}
            />
          </li>
        </ul>
      </header>

      <main className={styles.main}>
        <FloatingWindowProvider>
          {windows.map(({ id, title }) => (
            <ResizableScreenProvider key={id}>
              <FloatingWindow
                id={id}
                title={title}
                initialPosition={{ x: 50, y: 50 }}
                initialSize={{ w: 800, h: 600 }}
                footer={<ZoomSelector />}
              >
                <ResizableScreen>
                  <MagnifierProvider
                    canvasRef={canvasRef}
                    enabled={selectedTool === "COLOR_PICKER"}
                    onSelect={handleSelectColor}
                  >
                    <DrawingCanvas
                      ref={canvasRef}
                      enabled={selectedTool === "BRUSH"}
                      color={selectedColor}
                      brushSize={brushSize}
                      brushShape={brushShape}
                    />
                  </MagnifierProvider>
                </ResizableScreen>
              </FloatingWindow>
            </ResizableScreenProvider>
          ))}
        </FloatingWindowProvider>
      </main>
    </div>
  );
};
