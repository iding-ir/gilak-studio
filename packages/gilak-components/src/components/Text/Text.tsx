import clsx from "clsx";
import type { HTMLAttributes } from "react";

import styles from "./Text.module.scss";

export type TextProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  color?: string;
  backgroundColor?: string;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  frameless?: boolean;
  className?: string;
};

export const Text = ({
  text,
  color = "inherit",
  backgroundColor = "inherit",
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
      className={clsx(styles.root, className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive || !!props.onClick,
      })}
      style={{ color, backgroundColor }}
    >
      {text}
    </span>
  );
};
