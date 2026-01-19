import type { Alignment, TshirtSize, Variant } from "@gilak/components/types";
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
  fullWidth?: boolean;
  alignment?: Alignment;
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
  fullWidth = false,
  alignment = "center",
  frameless = false,
  padded = true,
  className,
  ...props
}: LinkProps) => {
  return (
    <a
      {...props}
      className={clsx(
        styles.root,
        styles[variant],
        styles[size],
        styles[alignment],
        className,
        {
          [styles.rounded]: rounded,
          [styles.selected]: selected,
          [styles.frameless]: frameless,
          [styles.padded]: padded,
          [styles.interactive]: interactive,
          [styles.fullWidth]: fullWidth,
        },
      )}
    >
      {text}
    </a>
  );
};
