import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Text.module.scss";

export type TextProps = ComponentProps<"span"> & {
  text: string;
  rounded?: boolean;
  variant?: Variant;
  size?: TshirtSize;
  selected?: boolean;
  frameless?: boolean;
  interactive?: boolean;
  className?: string;
};

export const Text = ({
  text,
  rounded = true,
  variant = "light-ghost",
  size = "sm",
  selected = false,
  frameless = false,
  interactive = false,
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
        [styles.interactive]: interactive,
      })}
    >
      {text}
    </span>
  );
};
