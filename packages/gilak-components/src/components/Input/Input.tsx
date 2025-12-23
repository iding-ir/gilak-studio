import clsx from "clsx";
import type { InputHTMLAttributes, RefObject } from "react";

import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement>;
  error?: boolean;
  fullWidth?: boolean;
  label?: string;
  rounded?: boolean;
  className?: string;
}

export const Input = ({
  ref,
  error,
  fullWidth = true,
  label,
  rounded = true,
  className,
  ...props
}: InputProps) => {
  return (
    <label
      className={clsx(styles.label, {
        [styles.error]: error,
        [styles.fullWidth]: fullWidth,
        [styles.rounded]: rounded,
      })}
    >
      {label && <span className={styles.text}>{label}</span>}
      <input ref={ref} {...props} className={clsx(styles.input, className)} />
    </label>
  );
};
