import { t } from "@gilak/localization";
import { clsx } from "clsx";
import type { ReactNode } from "react";

import IconClose from "../../assets/icon-close.svg?url";
import { Body } from "../Body";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { IconButton } from "../Icon";
import styles from "./DialogContent.module.scss";
import { useDialog } from "./useDialog";

export interface DialogContentProps {
  open: boolean;
  heading: ReactNode;
  actions?: ReactNode;
  className?: string;
  inertId?: string;
  children: ReactNode;
  onClose: () => void;
}

export const DialogContent = ({
  open,
  heading,
  actions,
  className,
  inertId,
  children,
  onClose,
}: DialogContentProps) => {
  const { dialogRef, headingId } = useDialog({
    open,
    onClose,
    inertId,
  });

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onPointerDown={onClose}>
      <dialog
        ref={dialogRef}
        className={clsx(styles.dialog, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        open
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Header
          id={headingId}
          heading={heading}
          actions={
            <>
              <IconButton
                icon={IconClose}
                className={styles.icon}
                frameless
                variant="light-ghost"
                aria-label={t("components:dialog.close")}
                tooltip={t("components:dialog.close")}
                onClick={onClose}
              />
            </>
          }
        />
        <Body>{children}</Body>
        <Footer actions={actions} />
      </dialog>
    </div>
  );
};
