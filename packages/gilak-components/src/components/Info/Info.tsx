import clsx from "clsx";
import React from "react";

import type { TshirtSize } from "../../types";
import styles from "./Info.module.scss";

export interface InfoProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: TshirtSize;
  className?: string;
  title?: string;
}

export const Info = ({
  size = "md",
  className,
  title,
  ...props
}: InfoProps) => {
  return (
    <span
      {...props}
      className={clsx(styles.root, styles[size], className)}
      title={title}
    >
      <span className={styles.inner}>i</span>
    </span>
  );
};
