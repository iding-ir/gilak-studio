import clsx from "clsx";
import type { CSSProperties, HTMLAttributes } from "react";

import styles from "./Icon.module.scss";

export type IconProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  icon: string;
  color?: string;
  backgroundColor?: string;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  frameless?: boolean;
};

export const Icon = ({
  icon,
  color = "var(--color-dark-xxxl)",
  backgroundColor = "var(--color-light-xxxs)",
  rounded = true,
  selected = false,
  interactive = false,
  frameless = false,
  ...props
}: IconProps) => {
  return (
    <span
      {...props}
      className={clsx(styles.root, props.className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive || !!props.onClick,
      })}
      style={
        {
          "--icon-color": color,
          "--icon-bg-color": backgroundColor,
          "--icon-url": `url("${icon}")`,
        } as CSSProperties
      }
    >
      <i className={clsx(styles.icon)} />
    </span>
  );
};
