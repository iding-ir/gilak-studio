import clsx from "clsx";
import React, { useRef } from "react";
import { createPortal } from "react-dom";

import IconClose from "../../assets/icon-close.svg?url";
import { Icon } from "../Icon";
import styles from "./Dialog.module.scss";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  closeLabel?: string;
}

export const Dialog = ({
  open,
  onClose,
  title,
  className,
  children,
  size = "md",
}: DialogProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} onPointerDown={onClose}>
      <div
        ref={panelRef}
        className={clsx(styles.panel, styles[size], className)}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.toolbar}>
            <Icon icon={IconClose} className={styles.icon} onClick={onClose} />
          </div>
        </header>

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.getElementById("dialog-root") as HTMLElement,
  );
};
