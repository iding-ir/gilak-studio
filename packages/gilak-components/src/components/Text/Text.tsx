import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Text.module.scss";

export type TextProps = ComponentProps<"span"> & {
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

export const Text = ({
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
}: TextProps) => {
  return (
    <span
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
    </span>
  );
};
