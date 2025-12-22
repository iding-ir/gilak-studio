import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  rounded?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  rounded = true,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(styles.root, styles[variant], className, {
        [styles.rounded]: rounded,
        [styles.fullWidth]: fullWidth,
      })}
    >
      {children}
    </button>
  );
};
