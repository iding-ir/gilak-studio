import clsx from "clsx";
import React, { type ReactNode, useEffect, useRef, useState } from "react";

import styles from "./Dropdown.module.scss";

export type Position =
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";

export interface DropdownProps {
  trigger: ReactNode;
  openDefault?: boolean;
  children: ReactNode;
  openOnHover?: boolean;
  className?: string;
  position?: Position;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  openDefault = false,
  children,
  openOnHover = false,
  className,
  position = "bottom-right",
}) => {
  const [open, setOpen] = useState(openDefault);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const triggerProps = openOnHover
    ? {
        onPointerEnter: () => setOpen(true),
        onPointerLeave: () => setOpen(false),
      }
    : {
        onPointerDown: () => setOpen((state) => !state),
      };

  return (
    <div className={clsx(styles.root, styles[position], className)}>
      <div ref={triggerRef} {...triggerProps} className={styles.trigger}>
        {trigger}
      </div>
      {open && (
        <div ref={menuRef} className={styles.dropdownMenu}>
          {children}
        </div>
      )}
    </div>
  );
};
