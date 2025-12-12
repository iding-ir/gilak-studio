import clsx from "clsx";
import type { ReactNode } from "react";
import React from "react";

import styles from "./List.module.scss";

export interface ListProps {
  items: ReactNode[];
  direction?: "row" | "column";
  count?: 1 | 2 | 3 | 4;
  frameless?: boolean;
  theme?: "primary" | "light";
}

export const List = ({
  items,
  direction = "column",
  count = 1,
  frameless = false,
  theme = "light",
}: ListProps): React.ReactElement => {
  return (
    <ul
      className={clsx(styles.list, styles[theme], styles[direction], {
        [styles.frameless]: frameless,
        [styles.count_2]: count === 2,
        [styles.count_3]: count === 3,
        [styles.count_4]: count === 4,
      })}
    >
      {items.map((item, idx) => (
        <li key={idx} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
};
