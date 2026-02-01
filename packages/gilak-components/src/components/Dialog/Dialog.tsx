import { createPortal } from "react-dom";

import type { DialogContentProps } from "./DialogContent";
import { DialogContent } from "./DialogContent";

export const PORTAL_ID = "gilak-dialog-root";

export type DialogProps = DialogContentProps & {
  portal?: boolean;
  portalId?: string;
};

export const Dialog = ({
  portal = true,
  portalId = PORTAL_ID,
  ...props
}: DialogProps) => {
  if (portal) {
    return createPortal(
      <DialogContent {...props} />,
      document.getElementById(portalId) as HTMLElement,
    );
  }

  return <DialogContent {...props} />;
};
