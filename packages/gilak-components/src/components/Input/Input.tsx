import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { InputHTMLAttributes, RefObject } from "react";

import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement | null>;
  error?: boolean;
  fullWidth?: boolean;
  label?: string;
  rounded?: boolean;
  frameless?: boolean;
  variant?: Variant;
  className?: string;
}

export const Input = ({
  ref,
  error,
  fullWidth = true,
  label,
  rounded = true,
  frameless = false,
  variant = "primary",
  className,
  ...props
}: InputProps) => {
  return (
    <label
      className={clsx(styles.label, styles[variant], {
        [styles.error]: error,
        [styles.fullWidth]: fullWidth,
        [styles.rounded]: rounded,
        [styles.frameless]: frameless,
      })}
    >
      {label && <span className={styles.text}>{label}</span>}
      <input ref={ref} {...props} className={clsx(styles.input, className)} />
    </label>
  );
};
