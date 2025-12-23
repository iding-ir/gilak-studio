import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Header.module.scss";

export type HeaderProps = HTMLAttributes<HTMLElement> & {
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
