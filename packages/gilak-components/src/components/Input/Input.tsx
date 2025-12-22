import clsx from "clsx";
import type { InputHTMLAttributes, RefObject } from "react";

import styles from "./Input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement>;
  className?: string;
  error?: boolean;
  fullWidth?: boolean;
  label?: string;
  rounded?: boolean;
}

export const Input = ({
  ref,
  className,
  error,
  fullWidth,
  label,
  rounded = true,
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
      <input ref={ref} className={clsx(styles.input, className)} {...props} />
    </label>
  );
};
