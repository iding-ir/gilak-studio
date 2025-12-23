import type { ReactNode } from "react";

import styles from "./Body.module.scss";

export type BodyProps = {
  children: ReactNode;
};

export const Body = ({ children }: BodyProps) => {
  return <div className={styles.body}>{children}</div>;
};
