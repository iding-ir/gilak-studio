import { arrayToHex } from './array-to-hex'

export const pickColorFromCanvas = ({
  canvas,
  x,
  y,
}: {
  canvas: HTMLCanvasElement
  x: number
  y: number
}) => {
  const context = canvas.getContext('2d', { willReadFrequently: true })

  if (!context) {
    return
  }

  return arrayToHex(context.getImageData(x, y, 1, 1).data)
}
