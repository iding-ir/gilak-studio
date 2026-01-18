import { onFocusKeyDown } from "@gilak/components/methods/on-focus-key-down";
import clsx from "clsx";
import {
  cloneElement,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  useEffect,
} from "react";

import type { Position } from "../../types";
import styles from "./Dropdown.module.scss";
import { useDropdown } from "./useDropdown";

export type DropdownTrigger = ReactElement<
  HTMLAttributes<HTMLElement> & {
    onClick?: MouseEventHandler;
  }
>;

export type DropdownProps = {
  children: ReactNode;
  trigger: DropdownTrigger;
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
  const { triggerRef, menuRef, open, menuId, triggerId, setOpen } = useDropdown(
    {
      openDefault,
    },
  );

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClickMenu = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (closeOnClickInside) {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  useEffect(() => {
    if (!open) return;

    const firstItem = menuRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]',
    );

    firstItem?.focus();
  }, [open, menuRef]);

  return (
    <div ref={triggerRef} className={clsx(styles.trigger, className)}>
      {cloneElement(trigger, {
        id: triggerId,
        role: "button",
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": open ? menuId : undefined,
        onClick: (event) => {
          trigger.props.onClick?.(event);
          handleToggle();
        },
        onKeyDown: (event) => {
          trigger.props.onKeyDown?.(event);
          onFocusKeyDown(event, handleToggle);
        },
      })}
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-labelledby={triggerId}
          className={clsx(styles.menu, styles[position])}
          onClick={handleClickMenu}
          onKeyDown={handleMenuKeyDown}
        >
          {children}
        </div>
      )}
    </div>
  );
};
