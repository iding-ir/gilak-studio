import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps, RefObject } from "react";

import styles from "./Input.module.scss";

export type InputProps = ComponentProps<"input"> & {
  ref?: RefObject<HTMLInputElement | null>;
  error?: boolean;
  rounded?: boolean;
  variant?: Variant;
  frameless?: boolean;
  fullWidth?: boolean;
  label?: string;
  className?: string;
};

export const Input = ({
  ref,
  error,
  rounded = true,
  variant = "light",
  frameless = false,
  fullWidth = true,
  label,
  className,
  ...props
}: InputProps) => {
  return (
    <label
      className={clsx(styles.label, {
        [styles.error]: error,
        [styles.fullWidth]: fullWidth,
        [styles.rounded]: rounded,
        [styles.frameless]: frameless,
      })}
    >
      {label && <span className={styles.text}>{label}</span>}
      <input
        ref={ref}
        {...props}
        className={clsx(styles.input, styles[variant], className)}
      />
    </label>
  );
};
