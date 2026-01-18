import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./Group.module.scss";

export type GroupProps = {
  title?: string;
  direction?: "row" | "column" | "rowReverse" | "columnReverse";
  children?: ReactNode;
};

export const Group = ({ title, direction = "row", children }: GroupProps) => {
  return (
    <div className={clsx(styles.root, styles[direction])}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
