import { useEffect, useId, useRef } from "react";

export type UseDialogArgs = {
  open: boolean;
  onClose: () => void;
  inertId?: string;
};

export const useDialog = ({ open, onClose, inertId }: UseDialogArgs) => {
  const headingId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
