import clsx from "clsx";
import React, { useRef, useState } from "react";

import styles from "./Tooltip.module.scss";

export interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  delay?: number;
  className?: string;
  children: React.ReactElement;
}

export const Tooltip = ({
  content,
  position = "top",
  delay = 100,
  className,
  children,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const show = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setVisible(false), 50);
  }, []);

  return (
    <div
      className={clsx(styles.root, className)}
      onMouseLeave={hide}
      onMouseEnter={show}
    >
      {children}
      <span
        className={clsx(styles.tip, styles[position], {
          [styles.show]: visible,
        })}
      >
        {content}
      </span>
    </div>
  );
};
