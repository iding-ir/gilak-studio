import {
  Dropdown,
  Icon,
  Input,
  List,
  type TshirtSize,
} from "@gilak/components";
import { getContrastColor } from "@gilak/utils";
import { useMemo } from "react";

import IconEmpty from "../assets/icon-empty.svg?url";
import styles from "./ColorSwatch.module.scss";

export type ColorSwatchProps = {
  icon: string;
  size?: TshirtSize;
  color: string;
  colors: string[];
  onChange: (color: string) => void;
};

export const ColorSwatch = ({
  icon,
  size = "md",
  color,
  colors,
  onChange,
}: ColorSwatchProps) => {
  const contrastColor = useMemo(() => getContrastColor(color), [color]);

  return (
    <div className={styles.root} style={{ backgroundColor: color }}>
      <Dropdown
        position="bottom-right"
        trigger={
          <Icon
            icon={icon}
            size={size}
            color={contrastColor}
            backgroundColor={color}
            frameless
          />
        }
      >
        <List
          direction="column"
          count={3}
          theme="light"
          items={colors.map((c) => (
            <Icon
              icon={IconEmpty}
              size={size}
              color={c}
              backgroundColor={c}
              selected={color === c}
              onClick={() => onChange(c)}
            />
          ))}
        />
      </Dropdown>
      <Input
        value={color}
        readOnly
        type="text"
        name="color-swatch"
        style={{
          color: contrastColor,
          backgroundColor: color,
          width: "6rem",
        }}
      />
    </div>
  );
};
