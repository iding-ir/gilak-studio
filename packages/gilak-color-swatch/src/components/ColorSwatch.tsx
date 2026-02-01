import type { Position, TshirtSize, Variant } from "@gilak/components";
import {
  CopyToClipboard,
  Dropdown,
  Group,
  Input,
  List,
  Tab,
  Tabs,
} from "@gilak/components";
import { IconButton } from "@gilak/components/components/Icon/Icon";
import { t } from "@gilak/localization";
import { getContrastColor } from "@gilak/utils";

import IconEmpty from "../assets/icon-empty.svg?url";

export type ColorSwatchProps = {
  icon: string;
  color: string;
  backgroundColor: string;
  colors: string[];
  name?: { color: string; background: string };
  label?: string;
  position?: Position;
  variant?: Variant;
  size?: TshirtSize;
  gridCount?: number;
  onChangeColor: (color: string) => void;
  onChangeBackgroundColor: (color: string) => void;
};

export const ColorSwatch = ({
  icon,
  color,
  backgroundColor,
  colors,
  label,
  name = { color: "color-swatch-color", background: "color-swatch-background" },
  position = "bottom-left",
  variant = "light",
  size = "md",
  gridCount = 6,
  onChangeColor,
  onChangeBackgroundColor,
}: ColorSwatchProps) => {
  return (
    <Dropdown
      position={position}
      trigger={
        <IconButton
          icon={icon}
          size={size}
          color={color}
          backgroundColor={backgroundColor}
          tooltip={label}
        />
      }
    >
      <Tabs size={size}>
        <Tab header={t("colorSwatch:tabs.color")}>
          <Group direction="row">
            <Input
              value={color}
              readOnly
              type="text"
              name={name.color}
              size={size}
              style={{
                color: getContrastColor(color),
                backgroundColor: color,
              }}
            />
            <CopyToClipboard
              tooltip={t("colorSwatch:tabs.copy")}
              tooltipAfter={t("colorSwatch:tabs.copied")}
              value={color}
              size={size}
            />
          </Group>
          <List
            direction="column"
            count={gridCount}
            variant={variant}
            size={size}
            frameless
            items={colors.map((c) => (
              <IconButton
                icon={IconEmpty}
                size={size}
                style={{ color: c, backgroundColor: c }}
                selected={color === c}
                color={c}
                backgroundColor={c}
                onClick={() => onChangeColor(c)}
              />
            ))}
          />
        </Tab>
        <Tab header={t("colorSwatch:tabs.backgroundColor")}>
          <Group direction="row">
            <Input
              value={backgroundColor}
              readOnly
              type="text"
              name={name.background}
              size={size}
              style={{
                color: getContrastColor(backgroundColor),
                backgroundColor: backgroundColor,
              }}
            />
            <CopyToClipboard
              tooltip={t("colorSwatch:tabs.copy")}
              tooltipAfter={t("colorSwatch:tabs.copied")}
              value={backgroundColor}
              size={size}
            />
          </Group>
          <List
            direction="column"
            count={gridCount}
            variant={variant}
            size={size}
            frameless
            items={colors.map((c) => (
              <IconButton
                icon={IconEmpty}
                size={size}
                style={{ color: c, backgroundColor: c }}
                selected={backgroundColor === c}
                color={c}
                backgroundColor={c}
                onClick={() => onChangeBackgroundColor(c)}
              />
            ))}
          />
        </Tab>
      </Tabs>
    </Dropdown>
  );
};
