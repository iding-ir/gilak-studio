import type { Direction, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./List.module.scss";

export type ListProps = {
  items: ReactNode[];
  direction?: Direction;
  count?: number;
  frameless?: boolean;
  theme?: Variant;
};

export const List = ({
  items,
  direction = "column",
  count = 1,
  frameless = false,
  theme = "light",
}: ListProps) => {
  return (
    <ul
      className={clsx(styles.list, styles[theme], styles[direction], {
        [styles.frameless]: frameless,
      })}
      style={{
        gridTemplateColumns:
          direction === "column" ? `repeat(${count}, max-content)` : undefined,
        gridTemplateRows:
          direction === "row" ? `repeat(${count}, max-content)` : undefined,
      }}
    >
      {items.map((item, idx) => (
        <li key={idx} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
