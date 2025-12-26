import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps, CSSProperties } from "react";

import styles from "./Icon.module.scss";

export type IconProps = Omit<ComponentProps<"span">, "color"> & {
  icon: string;
  rounded?: boolean;
  variant?: Variant;
  selected?: boolean;
  frameless?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  className?: string;
  color?: string;
  backgroundColor?: string;
};

export const Icon = ({
  icon,
  rounded = true,
  variant = "light",
  selected = false,
  frameless = false,
  interactive = true,
  disabled = false,
  className,
  color,
  backgroundColor,
  ...props
}: IconProps) => {
  return (
    <span
      {...props}
      className={clsx(styles.background, styles[variant], className, {
        [styles.rounded]: rounded,
        [styles.selected]: selected,
        [styles.frameless]: frameless,
        [styles.interactive]: interactive,
        [styles.disabled]: disabled,
      })}
      style={
        {
          ...props.style,
          "--props-url": `url("${icon}")`,
          backgroundColor,
        } as CSSProperties
      }
    >
      <i
        className={clsx(styles.icon, styles[variant])}
        style={{ backgroundColor: color }}
      />
    </span>
  );
};
