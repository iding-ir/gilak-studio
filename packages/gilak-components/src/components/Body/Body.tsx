import type { ComponentProps, ReactNode } from "react";

import styles from "./Body.module.scss";

export type BodyProps = ComponentProps<"div"> & {
  children: ReactNode;
};

export const Body = ({ children, ...props }: BodyProps) => {
  return (
    <div className={styles.body} {...props}>
      {children}
    </div>
  );
};
