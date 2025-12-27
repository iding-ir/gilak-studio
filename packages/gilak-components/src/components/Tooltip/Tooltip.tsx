import clsx from "clsx";
import type { ReactNode } from "react";
import React, { useRef, useState } from "react";

import { Text } from "../Text";
import styles from "./Tooltip.module.scss";

export interface TooltipProps {
  content: string;
  delay?: number;
  className?: string;
  children: ReactNode;
}

export const Tooltip = ({
  content,
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
        className={clsx(styles.tip, styles.top, {
          [styles.show]: visible,
        })}
      >
        <Text text={content} size="xs" variant="secondary" />
      </span>
    </div>
  );
};
