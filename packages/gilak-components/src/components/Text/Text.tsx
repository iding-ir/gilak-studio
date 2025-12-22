import clsx from "clsx";
import type { HTMLAttributes } from "react";

import styles from "./Text.module.scss";

export type TextProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  className?: string;
  color?: string;
  backgroundColor?: string;
  selected?: boolean;
  frameless?: boolean;
  onClick?: () => void;
};

export const Text = ({
  text,
  className,
  color = "inherit",
  backgroundColor = "inherit",
  selected = false,
  frameless = false,
  onClick,
}: TextProps) => {
  return (
    <span
      className={clsx(styles.root, className, {
        [styles.selected]: selected,
        [styles.frameless]: frameless,
      })}
      style={{ color, backgroundColor }}
      onClick={onClick}
    >
      {text}
    </span>
  );
};
