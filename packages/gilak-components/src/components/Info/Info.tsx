import clsx from "clsx";
import React from "react";

import styles from "./Info.module.scss";

export interface InfoProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  title?: string;
}

export const Info = ({ className, title, ...props }: InfoProps) => {
  return (
    <span {...props} className={clsx(styles.root, className)} title={title}>
      <span className={styles.inner}>i</span>
    </span>
  );
};
