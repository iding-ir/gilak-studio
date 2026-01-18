import clsx from "clsx";
import type { ReactNode } from "react";
import { useCallback, useId, useRef, useState } from "react";

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
  const tooltipId = useId();

  const handleSetVisibility = useCallback(
    (show: boolean) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setVisible(show), delay);
    },
    [delay],
  );

  return (
    <div
      className={clsx(styles.root, className)}
      onMouseEnter={() => handleSetVisibility(true)}
      onMouseLeave={() => handleSetVisibility(false)}
      onFocus={() => handleSetVisibility(true)}
      onBlur={() => handleSetVisibility(false)}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}

      <span
        id={tooltipId}
        role="tooltip"
        aria-hidden={!visible}
        className={clsx(styles.tip, styles.top, {
          [styles.show]: visible,
        })}
      >
        <Text text={content} size="xs" variant="secondary" />
      </span>
    </div>
  );
};
