export const getCursorColor = ({
  color,
  backgroundColor,
  enabledEraser,
  enabledDrawing,
  enabledFill,
}: {
  color: string;
  backgroundColor: string;
  enabledEraser?: boolean;
  enabledDrawing?: boolean;
  enabledFill?: boolean;
}) => {
  if (enabledEraser) return "rgba(90, 90, 90, 0.5)";
  if (enabledDrawing) return color;
  if (enabledFill) return color;
  return backgroundColor;
};
