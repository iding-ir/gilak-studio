import { Dropdown, Header, IconButton, Input } from "@gilak/components";
import { t } from "@gilak/localization";
import clsx from "clsx";
import type { PointerEvent, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";

import IconClose from "../../assets/icon-close.svg?url";
import IconMaximize from "../../assets/icon-maximize.svg?url";
import IconMaximized from "../../assets/icon-maximized.svg?url";
import IconMenu from "../../assets/icon-menu.svg?url";
import IconMinimize from "../../assets/icon-minimize.svg?url";
import IconMinimized from "../../assets/icon-minimized.svg?url";
import { useFloatingWindow } from "../../hooks/useFloatingWindow";
import styles from "./FloatingWindowHeader.module.scss";

export type FloatingWindowHeaderProps = {
  id: string;
  title: string;
  editableTitle?: boolean;
  draggable: boolean;
  maximizable: boolean;
  minimizable: boolean;
  closable: boolean;
  actions?: ReactNode;
  onDragPointerDown?: (event: PointerEvent<HTMLElement>) => void;
};

export const FloatingWindowHeader = ({
  id,
  title,
  editableTitle = false,
  draggable,
  maximizable,
  minimizable,
  closable,
  actions,
  onDragPointerDown,
}: FloatingWindowHeaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(title);
  const {
    status,
    dragging,
    maximizeFloatingWindow,
    minimizeFloatingWindow,
    openFloatingWindow,
    unregisterFloatingWindow,
    focusFloatingWindow,
    setFloatingWindowTitle,
  } = useFloatingWindow(id);

  const handleChangeTitle = useCallback(() => {
    if (value.trim().length) {
      setFloatingWindowTitle(value);
    } else {
      setValue(title);
    }
  }, [value, title, setFloatingWindowTitle]);

  return (
    <Header
      compact={status === "minimized"}
      className={clsx(styles.header, {
        [styles.draggable]: draggable,
        [styles.maximized]: status === "maximized",
        [styles.minimized]: status === "minimized",
        [styles.dragging]: dragging,
      })}
      onPointerDown={(event) => {
        focusFloatingWindow();
        if (draggable && onDragPointerDown) onDragPointerDown(event);
      }}
      heading={
        status === "minimized" || !editableTitle ? (
          title
        ) : (
          <Input
            name="floating-window-title"
            ref={inputRef}
            value={value}
            onChange={({ target }) => setValue(target.value)}
            frameless={true}
            fullWidth={false}
            variant="primary"
            size={value.length || 5}
            autoComplete="off"
            onClick={() => {
              inputRef.current?.focus();
            }}
            onPointerDown={focusFloatingWindow}
            onKeyDown={({ key }) => {
              if (key === "Enter") handleChangeTitle();
            }}
            onBlur={handleChangeTitle}
            tooltip={t("floatingWindow:title.edit")}
          />
        )
      }
      actions={
        <>
          {status !== "minimized" && actions && (
            <Dropdown
              position="bottom"
              trigger={
                <IconButton
                  icon={IconMenu}
                  variant="light-ghost"
                  tooltip={t("floatingWindow:actions.more")}
                  frameless
                />
              }
            >
              {actions}
            </Dropdown>
          )}
          {maximizable && status !== "maximized" && (
            <IconButton
              frameless
              variant="light-ghost"
              icon={IconMaximize}
              tooltip={t("floatingWindow:actions.maximize")}
              onClick={maximizeFloatingWindow}
            />
          )}
          {maximizable && status === "maximized" && (
            <IconButton
              frameless
              variant="light-ghost"
              icon={IconMaximized}
              tooltip={t("floatingWindow:actions.restore")}
              onClick={openFloatingWindow}
            />
          )}
          {minimizable && status !== "minimized" && (
            <IconButton
              frameless
              variant="light-ghost"
              icon={IconMinimize}
              tooltip={t("floatingWindow:actions.minimize")}
              onClick={minimizeFloatingWindow}
            />
          )}
          {minimizable && status === "minimized" && (
            <IconButton
              frameless
              variant="light-ghost"
              icon={IconMinimized}
              tooltip={t("floatingWindow:actions.restore")}
              onClick={openFloatingWindow}
            />
          )}
          {closable && (
            <IconButton
              frameless
              variant="light-ghost"
              icon={IconClose}
              tooltip={t("floatingWindow:actions.close")}
              onClick={unregisterFloatingWindow}
            />
          )}
        </>
      }
    />
  );
};
