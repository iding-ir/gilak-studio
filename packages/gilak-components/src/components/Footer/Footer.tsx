import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import styles from "./Footer.module.scss";

export type FooterProps = ComponentProps<"footer"> & {
  caption?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export const Footer = ({
  caption,
  actions,
  className,
  ...props
}: FooterProps) => {
  return (
    <footer {...props} className={clsx(styles.footer, className)}>
      <div className={styles.caption}>{caption}</div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </footer>
  );
};
