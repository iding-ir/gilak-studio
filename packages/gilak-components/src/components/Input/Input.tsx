import clsx from "clsx";
import type { InputHTMLAttributes, RefObject } from "react";

import type { TshirtSize } from "../../types";
import { Icon } from "../Icon";
import styles from "./Input.module.scss";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  ref?: RefObject<HTMLInputElement>;
  className?: string;
  size?: TshirtSize;
  error?: boolean;
  fullWidth?: boolean;
  label?: string;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  rounded?: boolean;
}

export const Input = ({
  ref,
  className,
  size = "md",
  error,
  fullWidth,
  label,
  icon,
  color,
  backgroundColor,
  rounded = true,
  ...props
}: InputProps) => {
  return (
    <label
      className={clsx(styles.label, styles[size], {
        [styles.error]: error,
        [styles.fullWidth]: fullWidth,
        [styles.rounded]: rounded,
      })}
      style={{ color }}
    >
      {label && <span className={styles.text}>{label}</span>}
      {icon && (
        <Icon
          className={styles.icon}
          icon={icon}
          size={size}
          color={backgroundColor}
          backgroundColor={color}
          rounded={false}
        />
      )}
      <input ref={ref} className={clsx(styles.input, className)} {...props} />
    </label>
  );
};
