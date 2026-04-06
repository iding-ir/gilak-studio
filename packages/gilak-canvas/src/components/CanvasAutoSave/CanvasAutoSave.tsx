import { useCanvasContext } from "@gilak/canvas/context";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export const CanvasAutoSave = ({ id }: { id: string }) => {
  const { lastSavedAt } = useCanvasContext();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById(id));
  }, [id]);

  if (!container) return null;

  return createPortal(
    <span>
      {lastSavedAt
        ? `Saved at ${timeFormatter.format(lastSavedAt)}`
        : "Waiting for auto-save"}
    </span>,
    container,
  );
};
