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
  padded?: boolean;
  className?: string;
};

export const Link = ({
  text,
  rounded = true,
  variant = "light-ghost",
  selected = false,
  interactive = false,
  size = "md",
  frameless = false,
  padded = true,
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
        [styles.padded]: padded,
        [styles.interactive]: interactive,
      })}
    >
      {text}
    </a>
  );
};
