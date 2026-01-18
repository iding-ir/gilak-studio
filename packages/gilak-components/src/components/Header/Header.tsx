import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import styles from "./Header.module.scss";

export type HeaderProps = ComponentProps<"header"> & {
  heading: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  className?: string;
};

export const Header = ({
  heading,
  actions,
  compact = false,
  className,
  ...props
}: HeaderProps) => {
  return (
    <header
      {...props}
      className={clsx(styles.header, className, { [styles.compact]: compact })}
    >
      <h3 className={styles.heading}>{heading}</h3>
      {actions && <nav className={styles.actions}>{actions}</nav>}
    </header>
  );
};
