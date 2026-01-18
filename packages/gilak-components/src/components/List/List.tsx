import type { Direction, TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./List.module.scss";

export type ListProps = {
  items: ReactNode[];
  direction?: Direction;
  count?: number;
  size?: TshirtSize;
  frameless?: boolean;
  interactive?: boolean;
  variant?: Variant;
};

export const List = ({
  items,
  direction = "column",
  count = 1,
  size = "md",
  frameless = false,
  interactive = false,
  variant = "light",
}: ListProps) => {
  return (
    <ul
      className={clsx(
        styles.list,
        styles[variant],
        styles[size],
        styles[direction],
        {
          [styles.frameless]: frameless,
        },
      )}
      style={{
        gridTemplateColumns:
          direction === "column" ? `repeat(${count}, max-content)` : undefined,
        gridTemplateRows:
          direction === "row" ? `repeat(${count}, max-content)` : undefined,
      }}
    >
      {items.map((item, idx) => (
        <li
          key={idx}
          className={clsx(styles.item, { [styles.interactive]: interactive })}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
