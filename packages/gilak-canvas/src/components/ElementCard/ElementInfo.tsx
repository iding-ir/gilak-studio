import { Icon } from "@gilak/components";

import type { CanvasElement } from "../../types/canvas";
import IconDrawing from "./icons/icon-drawing.svg?url";
import IconImage from "./icons/icon-image.svg?url";
import IconText from "./icons/icon-text.svg?url";

const typeIcons: Record<CanvasElement["type"], string> = {
  image: IconImage,
  drawing: IconDrawing,
  text: IconText,
};

export const ElementInfo = ({ element }: { element: CanvasElement }) => (
  <>
    <Icon
      icon={typeIcons[element.type]}
      size="sm"
      variant="light-ghost"
      frameless
      interactive={false}
    />
    {element.id}
  </>
);
