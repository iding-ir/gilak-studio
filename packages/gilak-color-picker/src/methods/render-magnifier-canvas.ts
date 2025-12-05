export const renderMagnifierCanvas = ({
  canvas,
  magnifier,
  x,
  y,
  radius,
  size,
}: {
  canvas: HTMLCanvasElement
  magnifier: HTMLCanvasElement | null
  x: number
  y: number
  radius: number
  size: number
}) => {
  if (!magnifier) {
    return
  }

  const canvasCtx = canvas.getContext('2d')
  const magnifierCtx = magnifier.getContext('2d')

  if (!canvasCtx || !magnifierCtx) {
    return
  }

  const diameter = radius * 2 + 1
  const imageData = canvasCtx.getImageData(x - diameter / 2, y - diameter / 2, diameter, diameter)
  magnifier.width = diameter * size
  magnifier.height = diameter * size

  // Draw magnified image
  magnifierCtx.clearRect(0, 0, magnifier.width, magnifier.height)
  magnifierCtx.putImageData(imageData, 0, 0)

  magnifierCtx.scale(size, size)
  magnifierCtx.drawImage(magnifier, 0, 0)
  magnifierCtx.scale(1 / size, 1 / size)

  // Draw grids
  magnifierCtx.strokeStyle = 'rgba(0,0,0,1)'

  for (let i = 0; i <= diameter; i++) {
    magnifierCtx.beginPath()
    magnifierCtx.moveTo(i * size, 0)
    magnifierCtx.lineTo(i * size, magnifier.height)
    magnifierCtx.stroke()

    magnifierCtx.beginPath()
    magnifierCtx.moveTo(0, i * size)
    magnifierCtx.lineTo(magnifier.width, i * size)
    magnifierCtx.stroke()
  }

  // Draw white square in the center
  const squareSize = size
  const centerX = magnifier.width / 2 - squareSize / 2
  const centerY = magnifier.height / 2 - squareSize / 2

  magnifierCtx.strokeStyle = 'white'
  magnifierCtx.lineWidth = 2

  magnifierCtx.strokeRect(centerX, centerY, squareSize, squareSize)
}
