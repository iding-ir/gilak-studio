import { getRelativeTshirtSize } from "@gilak/components";
import type { TshirtSize, Variant } from "@gilak/components/types";

import { Input } from "../Input";
import { List } from "../List";

export type RadioItem<T extends string> = {
  value: T;
  label: string;
};

export type RadioProps<T extends string> = {
  items: RadioItem<T>[];
  selected: T;
  size?: TshirtSize;
  variant?: Variant;
  setSelected: (value: T) => void;
};

export const Radio = <T extends string>({
  items,
  selected,
  size = "md",
  variant = "light",
  setSelected,
}: RadioProps<T>) => {
  return (
    <List
      items={items.map((item) => (
        <Input
          key={item.value}
          label={item.label}
          size={size}
          variant={variant}
          type="radio"
          tabIndex={0}
          checked={selected === item.value}
          onChange={() => setSelected(item.value)}
        />
      ))}
      count={1}
      frameless
      direction="row"
      size={getRelativeTshirtSize(size, 1)}
      variant={variant}
    />
  );
};
