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
};

export const Dropdown = ({
  children,
  trigger,
  className,
  openDefault = false,
  position = "bottom-right",
}: DropdownProps) => {
  const [open, setOpen] = useState(openDefault);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

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

  return (
    <div className={clsx(styles.root, styles[position], className)}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onPointerDown={() => setOpen((state) => !state)}
      >
        {trigger}
      </div>
      {open && (
        <div ref={menuRef} className={styles.menu}>
          {children}
        </div>
      )}
    </div>
  );
};
