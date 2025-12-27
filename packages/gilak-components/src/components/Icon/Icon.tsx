import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps, CSSProperties } from "react";

import { ConditionalWrapper } from "../ConditionalWrapper";
import { Tooltip } from "../Tooltip";
import styles from "./Icon.module.scss";

export type IconProps = Omit<ComponentProps<"span">, "color"> & {
  icon: string;
  rounded?: boolean;
  variant?: Variant;
  size?: TshirtSize;
  selected?: boolean;
  frameless?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  color?: string;
  backgroundColor?: string;
};

export const Icon = ({
  icon,
  rounded = true,
  variant = "light",
  size = "md",
  selected = false,
  frameless = false,
  interactive = true,
  disabled = false,
  label,
  className,
  color,
  backgroundColor,
  ...props
}: IconProps) => {
  return (
    <ConditionalWrapper
      condition={!!label}
      wrapper={(children) => (
        <Tooltip content={label as string}>{children}</Tooltip>
      )}
    >
      <span
        {...props}
        className={clsx(
          styles.background,
          styles[variant],
          styles[size],
          className,
          {
            [styles.rounded]: rounded,
            [styles.selected]: selected,
            [styles.frameless]: frameless,
            [styles.interactive]: interactive,
            [styles.disabled]: disabled,
          },
        )}
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
    </ConditionalWrapper>
  );
};
