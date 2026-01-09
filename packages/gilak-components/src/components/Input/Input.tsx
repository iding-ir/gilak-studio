import { type TshirtSize, type Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps, RefObject } from "react";

import { ConditionalWrapper } from "../ConditionalWrapper";
import { Tooltip } from "../Tooltip";
import styles from "./Input.module.scss";

export type InputProps = Omit<ComponentProps<"input">, "size"> & {
  ref?: RefObject<HTMLInputElement | null>;
  error?: boolean;
  rounded?: boolean;
  variant?: Variant;
  size?: TshirtSize;
  length?: number;
  frameless?: boolean;
  fullWidth?: boolean;
  label?: string;
  className?: string;
  tooltip?: string;
};

export const Input = ({
  ref,
  error,
  rounded = true,
  variant = "light",
  size = "md",
  length,
  frameless = false,
  fullWidth = true,
  label,
  className,
  tooltip,
  ...props
}: InputProps) => {
  return (
    <ConditionalWrapper
      condition={!!tooltip}
      wrapper={(children) => (
        <Tooltip content={tooltip as string}>{children}</Tooltip>
      )}
    >
      <label
        className={clsx(styles.label, className, {
          [styles.error]: error,
          [styles.fullWidth]: fullWidth,
          [styles.rounded]: rounded,
          [styles.frameless]: frameless,
        })}
      >
        {label && (
          <span className={clsx(styles.text, styles[variant], styles[size])}>
            {label}
          </span>
        )}
        <input
          ref={ref}
          {...props}
          size={length}
          className={clsx(styles.input, styles[variant], styles[size])}
        />
      </label>
    </ConditionalWrapper>
  );
};
