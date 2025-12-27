export const storeCtx = ({ canvas }: { canvas: HTMLCanvasElement }) => {
  const newCanvas = document.createElement("canvas");
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  const newCtx = newCanvas.getContext("2d");
  const ctx = canvas.getContext("2d");
  if (newCtx && ctx) {
    newCtx.drawImage(canvas, 0, 0);
  }

  return newCanvas;
};
