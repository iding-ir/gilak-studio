import type { BrushShape } from "@gilak/canvas";
import IconBackslash from "@gilak/canvas/assets/brush-backslash.svg?url";
import IconCircle from "@gilak/canvas/assets/brush-circle.svg?url";
import IconDisamond from "@gilak/canvas/assets/brush-diamond.svg?url";
import IconHorizontal from "@gilak/canvas/assets/brush-horizontal.svg?url";
import IconSlash from "@gilak/canvas/assets/brush-slash.svg?url";
import IconSquare from "@gilak/canvas/assets/brush-square.svg?url";
import IconStar from "@gilak/canvas/assets/brush-star.svg?url";
import IconTriangle from "@gilak/canvas/assets/brush-triangle.svg?url";
import IconVerical from "@gilak/canvas/assets/brush-vertical.svg?url";
import { Icon, List } from "@gilak/components";

export const BrushShapes = ({
  brush,
  onChange,
}: {
  brush: BrushShape;
  onChange: (brush: BrushShape) => void;
}) => {
  return (
    <List
      direction="column"
      count={3}
      theme="light"
      items={[
        <Icon
          selected={brush === "CIRCLE"}
          icon={IconCircle}
          size="sm"
          onClick={() => onChange("CIRCLE")}
        />,
        <Icon
          selected={brush === "SQUARE"}
          icon={IconSquare}
          size="sm"
          onClick={() => onChange("SQUARE")}
        />,
        <Icon
          selected={brush === "DIAMOND"}
          icon={IconDisamond}
          size="sm"
          onClick={() => onChange("DIAMOND")}
        />,
        <Icon
          selected={brush === "TRIANGLE"}
          icon={IconTriangle}
          size="sm"
          onClick={() => onChange("TRIANGLE")}
        />,
        <Icon
          selected={brush === "STAR"}
          icon={IconStar}
          size="sm"
          onClick={() => onChange("STAR")}
        />,
        <Icon
          selected={brush === "HORIZONTAL"}
          icon={IconHorizontal}
          size="sm"
          onClick={() => onChange("HORIZONTAL")}
        />,
        <Icon
          selected={brush === "VERTICAL"}
          icon={IconVerical}
          size="sm"
          onClick={() => onChange("VERTICAL")}
        />,
        <Icon
          selected={brush === "BACKSLASH"}
          icon={IconBackslash}
          size="sm"
          onClick={() => onChange("BACKSLASH")}
        />,
        <Icon
          selected={brush === "SLASH"}
          icon={IconSlash}
          size="sm"
          onClick={() => onChange("SLASH")}
        />,
      ]}
    />
  );
};
