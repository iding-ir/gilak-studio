import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Link.module.scss";

export type LinkProps = ComponentProps<"a"> & {
  text: string;
  variant?: Variant;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  size?: TshirtSize;
  frameless?: boolean;
  className?: string;
};

export const Link = ({
  text,
  variant = "light-ghost",
  rounded = true,
  selected = false,
  interactive = false,
  size = "sm",
  frameless = false,
  className,
  ...props
}: LinkProps) => {
  return (
    <a
      {...props}
      className={clsx(styles.root, styles[variant], styles[size], className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive,
      })}
    >
      {text}
    </a>
  );
};
