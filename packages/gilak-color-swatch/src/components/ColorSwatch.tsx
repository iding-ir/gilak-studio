import { Dropdown, Icon, Input, List, Tab, Tabs } from "@gilak/components";
import type { Position, Variant } from "@gilak/components/types";
import { getContrastColor } from "@gilak/utils";

import IconEmpty from "../assets/icon-empty.svg?url";

export type ColorSwatchProps = {
  icon: string;
  color: string;
  backgroundColor: string;
  colors: string[];
  name?: { color: string; background: string };
  labels?: { color: string; background: string };
  position?: Position;
  variant?: Variant;
  gridCount?: number;
  onChangeColor: (color: string) => void;
  onChangeBackgroundColor: (color: string) => void;
};

export const ColorSwatch = ({
  icon,
  color,
  backgroundColor,
  colors,
  labels = { color: "Color", background: "Background" },
  name = { color: "color-swatch-color", background: "color-swatch-background" },
  position = "bottom-right",
  variant = "light",
  gridCount = 4,
  onChangeColor,
  onChangeBackgroundColor,
}: ColorSwatchProps) => {
  return (
    <Dropdown
      position={position}
      trigger={
        <Icon icon={icon} color={color} backgroundColor={backgroundColor} />
      }
    >
      <Tabs>
        <Tab header={labels.color}>
          <Input
            value={color}
            readOnly
            type="text"
            name={name.color}
            style={{
              color: getContrastColor(color),
              backgroundColor: color,
            }}
          />
          <List
            direction="column"
            count={gridCount}
            variant={variant}
            frameless
            items={colors.map((c) => (
              <Icon
                icon={IconEmpty}
                color={c}
                backgroundColor={c}
                selected={color === c}
                onClick={() => onChangeColor(c)}
              />
            ))}
          />
        </Tab>
        <Tab header={labels.background}>
          <Input
            value={backgroundColor}
            readOnly
            type="text"
            name={name.background}
            style={{
              color: getContrastColor(backgroundColor),
              backgroundColor: backgroundColor,
            }}
          />
          <List
            direction="column"
            count={gridCount}
            variant={variant}
            frameless
            items={colors.map((c) => (
              <Icon
                icon={IconEmpty}
                color={c}
                backgroundColor={c}
                selected={backgroundColor === c}
                onClick={() => onChangeBackgroundColor(c)}
              />
            ))}
          />
        </Tab>
      </Tabs>
    </Dropdown>
  );
};
