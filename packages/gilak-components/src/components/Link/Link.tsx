import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Link.module.scss";

export type LinkProps = ComponentProps<"a"> & {
  text: string;
  variant?: Variant;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  frameless?: boolean;
  className?: string;
};

export const Link = ({
  text,
  variant = "light-ghost",
  rounded = true,
  selected = false,
  interactive = false,
  frameless = false,
  className,
  ...props
}: LinkProps) => {
  return (
    <a
      {...props}
      className={clsx(styles.root, styles[variant], className, {
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
