import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  rounded?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button = ({
  variant = "primary",
  rounded = true,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(styles.button, styles[variant], className, {
        [styles.rounded]: rounded,
        [styles.fullWidth]: fullWidth,
      })}
    >
      {children}
    </button>
  );
};
