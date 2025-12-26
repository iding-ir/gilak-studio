import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import styles from "./Header.module.scss";

export type HeaderProps = ComponentProps<"header"> & {
  heading?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export const Header = ({
  heading,
  actions,
  className,
  ...props
}: HeaderProps) => {
  return (
    <header {...props} className={clsx(styles.header, className)}>
      <h3 className={styles.heading}>{heading}</h3>
      {actions && <nav className={styles.actions}>{actions}</nav>}
    </header>
  );
};
