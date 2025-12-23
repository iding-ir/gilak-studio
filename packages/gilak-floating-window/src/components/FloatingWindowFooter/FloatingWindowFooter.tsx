import { Footer, Icon } from "@gilak/components";
import type { PointerEvent, ReactNode } from "react";

import IconResize from "../../assets/icon-resize.svg?url";
import { useFloatingWindow } from "../../hooks/useFloatingWindows";
import styles from "./FloatingWindowFooter.module.scss";

export type FloatingWindowFooterProps = {
  id: string;
  footer: ReactNode;
  resizable: boolean;
  onResizePointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
};

export const FloatingWindowFooter = ({
  id,
  footer,
  resizable,
  onResizePointerDown,
}: FloatingWindowFooterProps) => {
  const { status } = useFloatingWindow(id);

  if (!footer && !resizable) return null;

  return (
    <Footer
      caption={footer}
      actions={
        resizable &&
        status !== "maximized" && (
          <Icon
            icon={IconResize}
            className={styles.resize}
            frameless
            interactive
            onPointerDown={onResizePointerDown}
          />
        )
      }
    />
  );
};
