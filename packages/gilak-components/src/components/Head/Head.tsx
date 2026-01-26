import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import styles from "./Head.module.scss";

export type HeadProps<T extends ElementType> = {
  children: ReactNode;
  tag?: T;
  variant?: Variant;
  size?: TshirtSize;
  frameless?: boolean;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export const Head = <T extends ElementType = "h3">({
  children,
  tag,
  variant = "dark",
  size = "md",
  frameless = false,
  className,
  ...props
}: HeadProps<T>) => {
  const Tag = tag || "h3";

  return (
    <Tag
      {...props}
      className={clsx(styles.head, styles[variant], styles[size], className, {
        [styles.frameless]: frameless,
      })}
    >
      {children}
    </Tag>
  );
};
