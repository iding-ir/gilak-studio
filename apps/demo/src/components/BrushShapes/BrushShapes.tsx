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
import { Icon, type IconProps, List } from "@gilak/components";

export const BrushShapes = ({
  brush,
  onChange,
}: {
  brush: BrushShape;
  onChange: (brush: BrushShape) => void;
}) => {
  const iconProps: Partial<IconProps> = { frameless: true };
  return (
    <List
      direction="column"
      count={3}
      interactive
      variant="light"
      items={[
        <Icon
          {...iconProps}
          selected={brush === "CIRCLE"}
          icon={IconCircle}
          onClick={() => onChange("CIRCLE")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "SQUARE"}
          icon={IconSquare}
          onClick={() => onChange("SQUARE")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "DIAMOND"}
          icon={IconDisamond}
          onClick={() => onChange("DIAMOND")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "TRIANGLE"}
          icon={IconTriangle}
          onClick={() => onChange("TRIANGLE")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "STAR"}
          icon={IconStar}
          onClick={() => onChange("STAR")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "HORIZONTAL"}
          icon={IconHorizontal}
          onClick={() => onChange("HORIZONTAL")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "VERTICAL"}
          icon={IconVerical}
          onClick={() => onChange("VERTICAL")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "BACKSLASH"}
          icon={IconBackslash}
          onClick={() => onChange("BACKSLASH")}
        />,
        <Icon
          {...iconProps}
          selected={brush === "SLASH"}
          icon={IconSlash}
          onClick={() => onChange("SLASH")}
        />,
      ]}
    />
  );
};
