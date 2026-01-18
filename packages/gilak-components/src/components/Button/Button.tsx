import type { Alignment, TshirtSize, Variant } from "@gilak/components/types";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

import styles from "./Button.module.scss";

export type ButtonProps = ComponentProps<"button"> & {
  rounded?: boolean;
  variant?: Variant;
  size?: TshirtSize;
  fullWidth?: boolean;
  alignment?: Alignment;
  frameless?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button = ({
  rounded = true,
  variant = "primary",
  size = "md",
  fullWidth = false,
  alignment = "center",
  frameless = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        styles[alignment],
        className,
        {
          [styles.rounded]: rounded,
          [styles.fullWidth]: fullWidth,
          [styles.frameless]: frameless,
        },
      )}
    >
      {children}
    </button>
  );
};
