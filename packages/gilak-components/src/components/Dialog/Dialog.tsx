import clsx from "clsx";
import type { ReactNode } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

import IconClose from "../../assets/icon-close.svg?url";
import { Body } from "../Body";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { Icon } from "../Icon";
import styles from "./Dialog.module.scss";

export interface DialogProps {
  open: boolean;
  heading?: ReactNode;
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
  onClose: () => void;
}

export const Dialog = ({
  open,
  heading,
  actions,
  className,
  children,
  onClose,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!open) return null;

  return createPortal(
    <div className={styles.overlay} onPointerDown={onClose}>
      <dialog
        ref={dialogRef}
        className={clsx(styles.dialog, className)}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Header
          heading={heading}
          actions={
            <>
              <Icon
                icon={IconClose}
                className={styles.icon}
                onClick={onClose}
              />
            </>
          }
        />
        <Body>{children}</Body>
        <Footer actions={actions} />
      </dialog>
    </div>,
    document.getElementById("dialog-root") as HTMLElement,
  );
};
