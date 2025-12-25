import type { Position } from "@gilak/components";
import clsx from "clsx";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./Dropdown.module.scss";

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

  const handleClickTrigger = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleClickMenu = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();

    setTimeout(() => {
      if (closeOnClickInside) setOpen(false);
    }, 100);
  };

  return (
    <div
      ref={triggerRef}
      className={clsx(styles.trigger, className)}
      onPointerDown={handleClickTrigger}
    >
      {trigger}
      {open && (
        <div
          ref={menuRef}
          className={clsx(styles.menu, styles[position])}
          onPointerDown={handleClickMenu}
        >
          {children}
        </div>
      )}
    </div>
  );
};
