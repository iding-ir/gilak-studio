import "tippy.js/dist/tippy.css";
import "tippy.js/dist/tippy.css";

import type { Variant } from "@gilak/components/types";
import Tippy from "@tippyjs/react";
import clsx from "clsx";
import type { ReactElement } from "react";

import styles from "./Tooltip.module.scss";

export interface TooltipProps {
  content: ReactElement | string;
  variant?: Variant;
  delay?: number;
  className?: string;
  children: ReactElement;
}

export const Tooltip = ({
  content,
  variant = "secondary",
  delay = 100,
  className,
  children,
}: TooltipProps) => {
  return (
    <Tippy
      delay={delay}
      content={content}
      className={clsx(styles.tooltip, styles[variant], className)}
    >
      {children}
    </Tippy>
  );
};
