import {
  type BrushSize,
  type BrushType,
  DrawingCanvas,
  RandomCanvas,
} from "@gilak/canvas";
import { Magnifier, useColorPicker } from "@gilak/color-picker";
import { ColorSwatch } from "@gilak/color-swatch";
import { Dropdown, Icon, Menu, ResizableScreen } from "@gilak/components";
import { FloatingWindow, FloatingWindowProvider } from "@gilak/floating-window";
import { useRef, useState } from "react";

import IconBrushTypes from "../../assets/brush-circle.svg?url";
import IconBrushSizes from "../../assets/brush-circle-empty.svg?url";
import IconBrush from "../../assets/icon-brush.svg?url";
import IconBucketUrl from "../../assets/icon-bucket.svg?url";
import IconCanvasUrl from "../../assets/icon-dice.svg?url";
import IconColorPickerUrl from "../../assets/icon-eyedropper.svg?url";
import { BrushSizes } from "../BrushSizes";
import { BrushTypes } from "../BrushTypes";
import styles from "./Editor.module.scss";

export const Editor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paintMode, setPaintMode] = useState(false);
  const [randomCounter, setRandomCounter] = useState(0);
  const [brushType, setBrushType] = useState<BrushType>("CIRCLE");
  const [brushSize, setBrushSize] = useState<BrushSize>(2);
  const {
    selectedColor: selectedColorPickerColor,
    enabled: isColorPickerEnabled,
    isHovered: isColorPickerHovered,
    toggleEnabled: toggleColorPickerEnabled,
    setIsHovered: setIsColorPickerHovered,
    setSelectedColor,
  } = useColorPicker();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Menu label="" root={true} direction="row" open={true}>
            <Menu label="File" direction="column">
              <Menu label="New"></Menu>
              <Menu label="Open"></Menu>
            </Menu>
            <Menu label="View"></Menu>
            <Menu label="Help"></Menu>
          </Menu>
        </nav>
        <ul className={styles.tools}>
          <li>
            <ColorSwatch
              size="md"
              icon={IconBucketUrl}
              color={selectedColorPickerColor}
              colors={[
                "#ffffff",
                "#000000",
                "#D62828",
                "#F77F00",
                "#FFCF33",
                "#1B9E4B",
                "#009DAE",
                "#3056D3",
                "#2A2A72",
                "#9C4DF4",
                "#E6D2B5",
                "#8A8A8A",
              ]}
              onChange={setSelectedColor}
            />
          </li>
        </ul>
      </header>

      <main className={styles.main}>
        <FloatingWindowProvider>
          <FloatingWindow
            id="floating-window-1"
            title="Color Picker"
            footer={
              <>
                <Icon
                  icon={IconCanvasUrl}
                  size="md"
                  onClick={() => setRandomCounter((prev) => prev + 1)}
                />
                <Icon
                  icon={IconColorPickerUrl}
                  size="md"
                  selected={isColorPickerEnabled}
                  onClick={toggleColorPickerEnabled}
                />
                <div className={styles.ellipsis}>
                  Pick a color from a randomized canvas
                </div>
              </>
            }
            initialPosition={{ x: 0, y: 0 }}
            initialSize={{ w: 600, h: 500 }}
            zIndex={1100}
          >
            <ResizableScreen zoomLevel={100}>
              <RandomCanvas
                ref={canvasRef}
                refresh={randomCounter}
                width={400}
                height={300}
                onPointerEnter={() => setIsColorPickerHovered(true)}
                onPointerLeave={() => setIsColorPickerHovered(false)}
              >
                {isColorPickerEnabled && isColorPickerHovered && (
                  <Magnifier
                    canvasRef={canvasRef}
                    onSelect={setSelectedColor}
                  />
                )}
              </RandomCanvas>
            </ResizableScreen>
          </FloatingWindow>

          <FloatingWindow
            id="floating-window-2"
            title="Drawing Canvas"
            footer={
              <>
                <Icon
                  icon={IconBrush}
                  size="md"
                  selected={paintMode}
                  onClick={() => setPaintMode((prev) => !prev)}
                />
                <Dropdown
                  position="top-right"
                  trigger={<Icon icon={IconBrushTypes} size="md" interactive />}
                >
                  <BrushTypes brush={brushType} onChange={setBrushType} />
                </Dropdown>
                <Dropdown
                  position="top"
                  trigger={<Icon icon={IconBrushSizes} size="md" interactive />}
                >
                  <BrushSizes brush={brushSize} onChange={setBrushSize} />
                </Dropdown>
                <div className={styles.ellipsis}>
                  Choose your brush and start drawing!
                </div>
              </>
            }
            initialPosition={{ x: 640, y: 0 }}
            initialSize={{ w: 600, h: 500 }}
            zIndex={1100}
          >
            <ResizableScreen zoomLevel={100}>
              <DrawingCanvas
                enabled={paintMode}
                width={400}
                height={300}
                color={selectedColorPickerColor}
                brushType={brushType}
                brushSize={brushSize}
              />
            </ResizableScreen>
          </FloatingWindow>
        </FloatingWindowProvider>
      </main>
    </div>
  );
};
