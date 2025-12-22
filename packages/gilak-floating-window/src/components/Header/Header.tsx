import { Icon } from "@gilak/components";
import clsx from "clsx";
import type { PointerEvent } from "react";

import IconMaximize from "../../assets/icon-maximize.svg?url";
import IconMaximized from "../../assets/icon-maximized.svg?url";
import IconMinimize from "../../assets/icon-minimize.svg?url";
import IconMinimized from "../../assets/icon-minimized.svg?url";
import { useFloatingWindow } from "../../hooks/useFloatingWindows";
import styles from "./Header.module.scss";

export type HeaderProps = {
  id: string;
  title: React.ReactNode;
  draggable: boolean;
  maximizable: boolean;
  minimizable: boolean;
  onDragPointerDown?: (event: PointerEvent<HTMLElement>) => void;
};

export const Header = ({
  id,
  title,
  draggable,
  maximizable,
  minimizable,
  onDragPointerDown,
}: HeaderProps) => {
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
    <header
      className={clsx(styles.header, {
        [styles.draggable]: draggable,
        [styles.maximized]: status === "maximized",
        [styles.minimized]: status === "minimized",
        [styles.dragging]: dragging,
      })}
      onPointerDown={handlePointerDown}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.toolbar}>
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
      </div>
    </header>
  );
};
