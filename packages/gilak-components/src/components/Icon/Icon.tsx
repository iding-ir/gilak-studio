import type { TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
} from "react";

import { ConditionalWrapper } from "../ConditionalWrapper";
import { Tooltip } from "../Tooltip";
import styles from "./Icon.module.scss";

export type IconProps<T extends ElementType> = {
  tag?: T;
  icon: string;
  rounded?: boolean;
  variant?: Variant;
  size?: TshirtSize;
  selected?: boolean;
  frameless?: boolean;
  interactive?: boolean;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
  color?: string;
  backgroundColor?: string;
} & ComponentPropsWithoutRef<T>;

export const Icon = <T extends ElementType = "span">({
  tag,
  icon,
  rounded = true,
  variant = "light",
  size = "md",
  selected = false,
  frameless = false,
  interactive = true,
  disabled = false,
  tooltip,
  className,
  color,
  backgroundColor,
  ...props
}: IconProps<T>) => {
  const Tag = tag || "span";

  return (
    <ConditionalWrapper
      condition={!!tooltip}
      wrapper={(children) => (
        <Tooltip content={tooltip as string}>{children}</Tooltip>
      )}
    >
      <Tag
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
      </Tag>
    </ConditionalWrapper>
  );
};

export const IconButton = ({ tabIndex = 0, ...props }: IconProps<"button">) => {
  return (
    <Icon {...props} tag="button" tabIndex={props.disabled ? -1 : tabIndex} />
  );
};
