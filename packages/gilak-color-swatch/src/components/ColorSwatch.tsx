import {
  Dropdown,
  Icon,
  Input,
  List,
  Tab,
  Tabs,
  type TshirtSize,
} from "@gilak/components";
import { getContrastColor } from "@gilak/utils";

import IconEmpty from "../assets/icon-empty.svg?url";
import styles from "./ColorSwatch.module.scss";

export type ColorSwatchProps = {
  icon: string;
  size?: TshirtSize;
  color: string;
  backgroundColor: string;
  colors: string[];
  onChangeColor: (color: string) => void;
  onChangeBackgroundColor: (color: string) => void;
};

export const ColorSwatch = ({
  icon,
  size = "md",
  color,
  backgroundColor,
  colors,
  onChangeColor,
  onChangeBackgroundColor,
}: ColorSwatchProps) => {
  return (
    <div className={styles.root} style={{ backgroundColor: color }}>
      <Dropdown
        position="bottom-right"
        trigger={
          <Icon
            icon={icon}
            size={size}
            color={color}
            backgroundColor={backgroundColor}
          />
        }
      >
        <Tabs>
          <Tab header="Color" className={styles.tab}>
            <Input
              value={color}
              readOnly
              type="text"
              name="color-swatch"
              style={{
                color: getContrastColor(color),
                backgroundColor: color,
              }}
            />
            <List
              direction="column"
              count={4}
              theme="light"
              frameless
              items={colors.map((c) => (
                <Icon
                  icon={IconEmpty}
                  size={size}
                  color={c}
                  backgroundColor={c}
                  selected={color === c}
                  onClick={() => onChangeColor(c)}
                />
              ))}
            />
          </Tab>
          <Tab header="Background" className={styles.tab}>
            <Input
              value={backgroundColor}
              readOnly
              type="text"
              name="color-swatch"
              style={{
                color: getContrastColor(backgroundColor),
                backgroundColor: backgroundColor,
              }}
            />
            <List
              direction="column"
              count={4}
              theme="light"
              frameless
              items={colors.map((c) => (
                <Icon
                  icon={IconEmpty}
                  size={size}
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
    </div>
  );
};
