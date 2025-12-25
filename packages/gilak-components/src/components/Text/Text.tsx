import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { HTMLAttributes } from "react";

import styles from "./Text.module.scss";

export type TextProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  variant?: Variant;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  frameless?: boolean;
  className?: string;
};

export const Text = ({
  text,
  variant = "light-ghost",
  rounded = true,
  selected = false,
  interactive = false,
  frameless = false,
  className,
  ...props
}: TextProps) => {
  return (
    <span
      {...props}
      className={clsx(styles.root, styles[variant], className, {
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
