import { BRUSH_SIZES, type BrushSize } from "@gilak/canvas";
import { List, Text } from "@gilak/components";

export const BrushSizes = ({
  brush,
  onChange,
}: {
  brush: BrushSize;
  onChange: (brush: BrushSize) => void;
}) => {
  return (
    <List
      direction="column"
      count={1}
      variant="light"
      items={BRUSH_SIZES.map((size) => (
        <Text
          selected={brush === size}
          frameless
          onClick={() => onChange(size)}
          text={size.toString()}
        />
      ))}
    />
  );
};
