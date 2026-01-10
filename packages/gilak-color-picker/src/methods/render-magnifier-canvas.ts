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
  if (!magnifierCanvas) return;

  const canvasCtx = canvas.getContext("2d", { willReadFrequently: true });
  const magnifierCtx = magnifierCanvas.getContext("2d", {
    alpha: true,
    desynchronized: true,
  });

  if (!canvasCtx || !magnifierCtx) return;

  const diameter = radiusCount * 2 + 1;
  const cssSize = diameter * gridSize;

  const dpr = window.devicePixelRatio || 1;

  // Proper HiDPI canvas sizing
  magnifierCanvas.width = cssSize * dpr;
  magnifierCanvas.height = cssSize * dpr;
  magnifierCanvas.style.width = `${cssSize}px`;
  magnifierCanvas.style.height = `${cssSize}px`;

  magnifierCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  magnifierCtx.clearRect(0, 0, cssSize, cssSize);

  // Draw magnified pixels (no smoothing)
  magnifierCtx.imageSmoothingEnabled = false;
  magnifierCtx.drawImage(
    canvas,
    Math.ceil(x - diameter / 2),
    Math.ceil(y - diameter / 2),
    diameter,
    diameter,
    0,
    0,
    cssSize,
    cssSize,
  );

  // Draw crisp grid
  magnifierCtx.save();
  magnifierCtx.strokeStyle = "#000000";
  magnifierCtx.lineWidth = 1;

  // Pixel-align strokes
  magnifierCtx.translate(0.5, 0.5);

  for (let i = 0; i <= diameter; i++) {
    const pos = i * gridSize;

    magnifierCtx.beginPath();
    magnifierCtx.moveTo(pos, 0);
    magnifierCtx.lineTo(pos, cssSize);
    magnifierCtx.stroke();

    magnifierCtx.beginPath();
    magnifierCtx.moveTo(0, pos);
    magnifierCtx.lineTo(cssSize, pos);
    magnifierCtx.stroke();
  }

  magnifierCtx.restore();

  // Draw white center square
  const squareSize = gridSize;
  const centerX = cssSize / 2 - squareSize / 2;
  const centerY = cssSize / 2 - squareSize / 2;

  magnifierCtx.strokeStyle = "#ffffff";
  magnifierCtx.lineWidth = 2;
  magnifierCtx.strokeRect(centerX, centerY, squareSize, squareSize);
};
