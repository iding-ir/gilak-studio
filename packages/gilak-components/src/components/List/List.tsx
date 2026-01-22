import type { Direction, TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

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
      style={{ "--list-count": count } as CSSProperties}
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
