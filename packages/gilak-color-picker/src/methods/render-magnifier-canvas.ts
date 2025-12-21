export const renderMagnifierCanvas = ({
  canvas,
  magnifierCanvas,
  x,
  y,
  radiusCount,
  gridSize,
}: {
  canvas: HTMLCanvasElement;
  magnifierCanvas: HTMLCanvasElement | null;
  x: number;
  y: number;
  radiusCount: number;
  gridSize: number;
}) => {
  if (!magnifierCanvas) {
    return;
  }

  const canvasCtx = canvas.getContext("2d", { willReadFrequently: true });
  const magnifierCtx = magnifierCanvas.getContext("2d", {
    alpha: true,
    desynchronized: true, // Better performance for animations
  });

  if (!canvasCtx || !magnifierCtx) {
    return;
  }

  const diameter = radiusCount * 2 + 1;
  magnifierCanvas.width = diameter * gridSize;
  magnifierCanvas.height = diameter * gridSize;

  // Draw magnified image with optimized rendering
  magnifierCtx.clearRect(0, 0, magnifierCanvas.width, magnifierCanvas.height);

  // Disable image smoothing for pixel-perfect magnification
  magnifierCtx.imageSmoothingEnabled = false;

  // Draw directly from source canvas with scaling
  magnifierCtx.drawImage(
    canvas,
    x - diameter / 2,
    y - diameter / 2,
    diameter,
    diameter,
    0,
    0,
    diameter * gridSize,
    diameter * gridSize,
  );

  // Draw grids
  magnifierCtx.strokeStyle = "rgba(0,0,0,1)";

  for (let i = 0; i <= diameter; i++) {
    magnifierCtx.beginPath();
    magnifierCtx.moveTo(i * gridSize, 0);
    magnifierCtx.lineTo(i * gridSize, magnifierCanvas.height);
    magnifierCtx.stroke();

    magnifierCtx.beginPath();
    magnifierCtx.moveTo(0, i * gridSize);
    magnifierCtx.lineTo(magnifierCanvas.width, i * gridSize);
    magnifierCtx.stroke();
  }

  // Draw white square in the center
  const squareSize = gridSize;
  const centerX = magnifierCanvas.width / 2 - squareSize / 2;
  const centerY = magnifierCanvas.height / 2 - squareSize / 2;

  magnifierCtx.strokeStyle = "white";
  magnifierCtx.lineWidth = 2;

  magnifierCtx.strokeRect(centerX, centerY, squareSize, squareSize);
};
