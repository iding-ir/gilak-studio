import type { Position, Variant } from "@gilak/components";
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
  position = "bottom-right",
  variant = "light",
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
          color={color}
          backgroundColor={backgroundColor}
          tooltip={label}
        />
      }
    >
      <Tabs>
        <Tab header={t("colorSwatch:tabs.color")}>
          <Group direction="row">
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
            <CopyToClipboard
              tooltip={t("colorSwatch:tabs.copy")}
              tooltipAfter={t("colorSwatch:tabs.copied")}
              value={color}
            />
          </Group>
          <List
            direction="column"
            count={gridCount}
            variant={variant}
            frameless
            items={colors.map((c) => (
              <IconButton
                icon={IconEmpty}
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
              style={{
                color: getContrastColor(backgroundColor),
                backgroundColor: backgroundColor,
              }}
            />
            <CopyToClipboard
              tooltip={t("colorSwatch:tabs.copy")}
              tooltipAfter={t("colorSwatch:tabs.copied")}
              value={backgroundColor}
            />
          </Group>
          <List
            direction="column"
            count={gridCount}
            variant={variant}
            frameless
            items={colors.map((c) => (
              <IconButton
                icon={IconEmpty}
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
