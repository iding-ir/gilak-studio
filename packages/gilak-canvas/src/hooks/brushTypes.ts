export type BrushType =
  | 'circle'
  | 'square'
  | 'diamond'
  | 'triangle'
  | 'star'
  | 'horizontal'
  | 'vertical'
  | 'backslash'
  | 'slash'

export function drawBrushType(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  brushType: BrushType
) {
  ctx.save()
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'
  ctx.lineWidth = size
  ctx.beginPath()
  const r = size * 2
  switch (brushType) {
    case 'circle':
      ctx.arc(x, y, r, 0, 2 * Math.PI)
      break
    case 'square':
      ctx.rect(x - r, y - r, r * 2, r * 2)
      break
    case 'diamond':
      ctx.moveTo(x, y - r)
      ctx.lineTo(x + r, y)
      ctx.lineTo(x, y + r)
      ctx.lineTo(x - r, y)
      ctx.closePath()
      break
    case 'triangle':
      ctx.moveTo(x, y - r)
      ctx.lineTo(x + r, y + r)
      ctx.lineTo(x - r, y + r)
      ctx.closePath()
      break
    case 'star': {
      const spikes = 5
      const step = Math.PI / spikes
      for (let i = 0; i < 2 * spikes; i++) {
        const rad = i % 2 === 0 ? r : r / 2
        const angle = i * step - Math.PI / 2
        const sx = x + Math.cos(angle) * rad
        const sy = y + Math.sin(angle) * rad
        if (i === 0) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      }
      ctx.closePath()
      break
    }
    case 'horizontal':
      ctx.moveTo(x - r, y)
      ctx.lineTo(x + r, y)
      break
    case 'vertical':
      ctx.moveTo(x, y - r)
      ctx.lineTo(x, y + r)
      break
    case 'backslash':
      ctx.moveTo(x - r, y - r)
      ctx.lineTo(x + r, y + r)
      break
    case 'slash':
      ctx.moveTo(x + r, y - r)
      ctx.lineTo(x - r, y + r)
      break
    default:
      ctx.arc(x, y, r, 0, 2 * Math.PI)
  }
  ctx.stroke()
  ctx.restore()
}
