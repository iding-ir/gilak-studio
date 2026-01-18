import { useEffect, useId, useRef } from "react";

export type UseDialogArgs = {
  open: boolean;
  onClose: () => void;
  inertId?: string;
};

export const useDialog = ({ open, onClose, inertId }: UseDialogArgs) => {
  const headingId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!inertId) return;

    const element = document.getElementById(inertId);
    if (!element) return;

    element.toggleAttribute("inert", open);

    return () => {
      element.removeAttribute("inert");
    };
  }, [open, inertId]);

  return {
    dialogRef,
    headingId,
  } as const;
};
