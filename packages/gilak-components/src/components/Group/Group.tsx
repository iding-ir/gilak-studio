import clsx from "clsx";

import styles from "./Group.module.scss";

export type GroupProps = {
  title?: string;
  direction?: "row" | "column" | "rowReverse" | "columnReverse";
  children?: React.ReactNode;
};

export const Group = ({ title, direction = "row", children }: GroupProps) => {
  return (
    <div className={clsx(styles.root, styles[direction])}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
