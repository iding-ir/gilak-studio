import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { CSSProperties, HTMLAttributes } from "react";

import styles from "./Icon.module.scss";

export type IconProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  icon: string;
  rounded?: boolean;
  selected?: boolean;
  interactive?: boolean;
  variant?: Variant;
  frameless?: boolean;
};

export const Icon = ({
  icon,
  rounded = true,
  selected = false,
  interactive = true,
  variant = "light",
  frameless = false,
  ...props
}: IconProps) => {
  return (
    <span
      {...props}
      className={clsx(styles.root, styles[variant], props.className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive,
      })}
      style={
        { ...props.style, "--icon-url": `url("${icon}")` } as CSSProperties
      }
    >
      <i className={clsx(styles.icon, styles[variant])} />
    </span>
  );
};
