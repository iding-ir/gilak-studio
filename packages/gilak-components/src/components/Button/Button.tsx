import type { Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import styles from "./Button.module.scss";

export type ButtonProps = ComponentProps<"button"> & {
  rounded?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button = ({
  rounded = true,
  variant = "primary",
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
