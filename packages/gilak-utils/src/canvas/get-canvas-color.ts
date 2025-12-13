import { convertArrayToHex } from "../color/convert-array-to-hex";

export const getCanvasColor = ({
  canvas,
  x,
  y,
}: {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
}) => {
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return;
  }

  const data = context.getImageData(x, y, 1, 1).data;

  // If alpha is 0, return 'transparent'
  if (data[3] === 0) {
    return "transparent";
  }

  return convertArrayToHex(data);
};
