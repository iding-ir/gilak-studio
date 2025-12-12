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

  return convertArrayToHex(context.getImageData(x, y, 1, 1).data);
};
