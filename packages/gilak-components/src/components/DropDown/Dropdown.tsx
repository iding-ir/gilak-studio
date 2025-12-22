import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

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

export type DropdownProps = {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
  openDefault?: boolean;
  position?: Position;
  closeOnClickInside?: boolean;
};

export const Dropdown = ({
  children,
  trigger,
  className,
  openDefault = false,
  position = "bottom-right",
  closeOnClickInside = false,
}: DropdownProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(openDefault);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = ({ target }: PointerEvent) => {
      const trigger = triggerRef.current;
      const menu = menuRef.current;
      if (!trigger || !menu) return;
      if (!trigger.contains(target as Node) && !menu.contains(target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const handleClickTrigger = () => {
    setOpen((prev) => !prev);
  };

  const handleClickMenu = () => {
    setTimeout(() => {
      if (closeOnClickInside) setOpen(false);
    }, 100);
  };

  return (
    <div className={clsx(styles.root, styles[position], className)}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onPointerDown={handleClickTrigger}
      >
        {trigger}
      </div>
      {open && (
        <div
          ref={menuRef}
          className={styles.menu}
          onPointerDown={handleClickMenu}
        >
          {children}
        </div>
      )}
    </div>
  );
};
