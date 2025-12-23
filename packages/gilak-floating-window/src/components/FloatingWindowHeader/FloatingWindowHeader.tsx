import { Header, Icon } from "@gilak/components";
import clsx from "clsx";
import type { PointerEvent, ReactNode } from "react";

import IconMaximize from "../../assets/icon-maximize.svg?url";
import IconMaximized from "../../assets/icon-maximized.svg?url";
import IconMinimize from "../../assets/icon-minimize.svg?url";
import IconMinimized from "../../assets/icon-minimized.svg?url";
import { useFloatingWindow } from "../../hooks/useFloatingWindows";
import styles from "./FloatingWindowHeader.module.scss";

export type FloatingWindowHeaderProps = {
  id: string;
  title: ReactNode;
  draggable: boolean;
  maximizable: boolean;
  minimizable: boolean;
  onDragPointerDown?: (event: PointerEvent<HTMLElement>) => void;
};

export const FloatingWindowHeader = ({
  id,
  title,
  draggable,
  maximizable,
  minimizable,
  onDragPointerDown,
}: FloatingWindowHeaderProps) => {
  const {
    status,
    dragging,
    maximizeFloatingWindow,
    minimizeFloatingWindow,
    openFloatingWindow,
    bringFloatingWindowToFront,
  } = useFloatingWindow(id);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    bringFloatingWindowToFront();
    if (draggable && onDragPointerDown) onDragPointerDown(event);
  };

  return (
    <Header
      heading={title}
      actions={
        <>
          {maximizable && status !== "maximized" && (
            <Icon icon={IconMaximize} onClick={maximizeFloatingWindow} />
          )}
          {maximizable && status === "maximized" && (
            <Icon icon={IconMaximized} onClick={openFloatingWindow} />
          )}
          {minimizable && status !== "minimized" && (
            <Icon icon={IconMinimize} onClick={minimizeFloatingWindow} />
          )}
          {minimizable && status === "minimized" && (
            <Icon icon={IconMinimized} onClick={openFloatingWindow} />
          )}
        </>
      }
      className={clsx(styles.header, {
        [styles.draggable]: draggable,
        [styles.maximized]: status === "maximized",
        [styles.minimized]: status === "minimized",
        [styles.dragging]: dragging,
      })}
      onPointerDown={handlePointerDown}
    />
  );
};
