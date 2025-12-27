import "tippy.js/dist/tippy.css";
import "tippy.js/dist/tippy.css";

import type { TshirtSize, Variant } from "@gilak/components/types";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import type { ReactElement } from "react";

import styles from "./Tooltip.module.scss";

export interface TooltipProps {
  content: ReactElement | string;
  variant?: Variant;
  size?: TshirtSize;
  delay?: number;
  className?: string;
  children: ReactElement;
}

export const Tooltip = ({
  content,
  variant = "secondary",
  size = "xs",
  delay = 100,
  className,
  children,
}: TooltipProps) => {
  return (
    <Tippy
      delay={delay}
      content={content}
      className={clsx(styles.tooltip, styles[variant], styles[size], className)}
    >
      {children}
    </Tippy>
  );
};
