import clsx from "clsx";
import type { HTMLAttributes } from "react";
import React from "react";

import styles from "./Icon.module.scss";

export interface IconProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "color"
> {
  icon: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  frameless?: boolean;
}

export const Icon = ({
  icon,
  color = "var(--color-dark-xxxl)",
  backgroundColor = "var(--color-light-xxxs)",
  className,
  rounded = true,
  selected = false,
  interactive = false,
  frameless = false,
  ...props
}: IconProps) => {
  const rootStyles = {
    "--icon-color": color,
    "--icon-bg-color": backgroundColor,
    "--icon-url": `url("${icon}")`,
  } as React.CSSProperties;

  return (
    <i
      className={clsx(styles.root, className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive || !!props.onClick,
      })}
      {...props}
      style={{ ...props.style, ...rootStyles }}
    >
      <span className={clsx(styles.image)} />
    </i>
  );
};
