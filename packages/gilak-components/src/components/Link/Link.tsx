import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Link.module.scss";

export type LinkProps = ComponentProps<"a"> & {
  text: string;
  color?: string;
  backgroundColor?: string;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  frameless?: boolean;
  className?: string;
};

export const Link = ({
  text,
  color = "inherit",
  backgroundColor = "inherit",
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
      className={clsx(styles.root, className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive || !!props.onClick,
      })}
      style={{ color, backgroundColor }}
    >
      {text}
    </a>
  );
};
