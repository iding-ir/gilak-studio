import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

import type { TshirtSize } from "../../types";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: TshirtSize;
  variant?: "primary" | "secondary" | "ghost";
  rounded?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({
  children,
  size = "md",
  variant = "primary",
  rounded = true,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(styles.root, styles[size], styles[variant], className, {
        [styles.rounded]: rounded,
        [styles.fullWidth]: fullWidth,
      })}
    >
      {children}
    </button>
  );
};
