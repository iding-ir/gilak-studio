import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Info.module.scss";

export type InfoProps = ComponentProps<"span"> & {
  className?: string;
  title?: string;
};

export const Info = ({ className, title, ...props }: InfoProps) => {
  return (
    <span {...props} className={clsx(styles.root, className)} title={title}>
      <span className={styles.inner}>i</span>
    </span>
  );
};
