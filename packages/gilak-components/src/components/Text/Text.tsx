import clsx from "clsx";
import type { CSSProperties, HTMLAttributes } from "react";

import type { TshirtSize } from "../../types";
import styles from "./Text.module.scss";

export type TextProps = HTMLAttributes<HTMLDivElement> & {
  text: string;
  className?: string;
  size?: TshirtSize;
  color?: string;
  backgroundColor?: string;
  rounded?: boolean;
  selected?: boolean;
  frameless?: boolean;
};

export const Text = ({
  text,
  className,
  size = "md",
  color = "inherit",
  backgroundColor = "inherit",
  rounded = true,
  selected = false,
  frameless = false,
  ...props
}: TextProps) => {
  const rootStyles = {
    "--fg-color": color,
    "--bg-color": backgroundColor,
  } as CSSProperties;

  return (
    <i
      className={clsx(styles.root, styles[size], className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
      })}
      {...props}
      style={{ ...props.style, ...rootStyles }}
    >
      {text}
    </i>
  );
};
