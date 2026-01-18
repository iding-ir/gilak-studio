import { useEffect, useId, useRef, useState } from "react";

export type UseDropdownOptions = {
  openDefault?: boolean;
};

export const useDropdown = ({ openDefault = false }: UseDropdownOptions) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const triggerId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(openDefault);

  useEffect(() => {
    if (!open) return;

    const isOutside = (target: EventTarget | null) => {
      const triggerEl = triggerRef.current;
      const menuEl = menuRef.current;

      if (!triggerEl || !menuEl || !(target instanceof Node)) {
        return false;
      }

      return !triggerEl.contains(target) && !menuEl.contains(target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (isOutside(event.target)) {
        setOpen(false);
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (isOutside(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return {
    triggerRef,
    menuRef,
    open,
    menuId,
    triggerId,
    setOpen,
  };
};
