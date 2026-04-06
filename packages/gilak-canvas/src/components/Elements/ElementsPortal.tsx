import { ELEMENTS_PORTAL_ID } from "@gilak/canvas/constants";
import { DragImage, DragNDropProvider } from "@gilak/drag-n-drop";
import { createPortal } from "react-dom";

import { ElementList } from "./ElementList";

export const ElementsPortal = () => {
  return createPortal(
    <DragNDropProvider>
      <ElementList />
      <DragImage />
    </DragNDropProvider>,
    document.getElementById(ELEMENTS_PORTAL_ID) as HTMLElement,
  );
};
