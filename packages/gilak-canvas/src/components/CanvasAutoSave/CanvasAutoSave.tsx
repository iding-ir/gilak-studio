import { useCanvasContext } from "@gilak/canvas/context";
import { t } from "@gilak/localization";
import { getRelativeTimeBucket } from "@gilak/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const getAutoSaveText = (lastSavedAt: Date | null, now: number) => {
  if (!lastSavedAt) {
    return t("canvas:autoSave.waiting");
  }

  const relative = getRelativeTimeBucket(lastSavedAt, now);

  if (relative.style === "fewSeconds") {
    return t("canvas:autoSave.fewSecondsAgo");
  }

  if (relative.style === "lessThan") {
    return t(
      relative.unit === "second"
        ? "canvas:autoSave.lessThanSeconds"
        : "canvas:autoSave.lessThanMinutes",
      { count: relative.count },
    );
  }

  if (relative.unit === "hour") {
    return t("canvas:autoSave.moreThanHourAgo");
  }

  return t("canvas:autoSave.moreThanMinutesAgo", {
    count: relative.count,
  });
};

export const CanvasAutoSave = ({ id }: { id: string }) => {
  const { lastSavedAt } = useCanvasContext();
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setContainer(document.getElementById(id));
  }, [id]);

  useEffect(() => {
    if (!lastSavedAt) {
      return;
    }

    setNow(Date.now());

    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [lastSavedAt]);

  if (!container) return null;

  return createPortal(
    <span
      title={
        lastSavedAt
          ? t("canvas:autoSave.savedAt", {
              time: timeFormatter.format(lastSavedAt),
            })
          : undefined
      }
    >
      {getAutoSaveText(lastSavedAt, now)}
    </span>,
    container,
  );
};
