import { useEffect, type RefObject } from 'react'

export type EffectType = 'quadrants' | 'gradient' | 'circles' | 'waves' | 'checkerboard'

const randomColor = () => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
    '#F8B739',
    '#52B788',
    '#E63946',
    '#A8DADC',
    '#457B9D',
    '#F1FAEE',
    '#E76F51',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const drawQuadrants = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  const midX = w / 2
  const midY = h / 2

  ctx.fillStyle = randomColor()
  ctx.fillRect(0, 0, midX, midY)

  ctx.fillStyle = randomColor()
  ctx.fillRect(midX, 0, midX, midY)

  ctx.fillStyle = randomColor()
  ctx.fillRect(0, midY, midX, midY)

  ctx.fillStyle = randomColor()
  ctx.fillRect(midX, midY, midX, midY)
}

const drawGradient = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  const gradient = ctx.createLinearGradient(0, 0, w, h)
  gradient.addColorStop(0, randomColor())
  gradient.addColorStop(0.5, randomColor())
  gradient.addColorStop(1, randomColor())
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, w, h)
}

const drawCircles = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  ctx.fillStyle = randomColor()
  ctx.fillRect(0, 0, w, h)

  const numCircles = 5 + Math.floor(Math.random() * 10)
  for (let i = 0; i < numCircles; i++) {
    ctx.fillStyle = randomColor()
    const x = Math.random() * w
    const y = Math.random() * h
    const radius = 20 + Math.random() * 80
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

const drawWaves = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  const numWaves = 3 + Math.floor(Math.random() * 5)
  const waveHeight = h / numWaves

  for (let i = 0; i < numWaves; i++) {
    ctx.fillStyle = randomColor()
    ctx.beginPath()
    ctx.moveTo(0, i * waveHeight)

    const amplitude = 20 + Math.random() * 40
    const frequency = 0.01 + Math.random() * 0.02

    for (let x = 0; x <= w; x += 5) {
      const y = i * waveHeight + Math.sin(x * frequency) * amplitude + waveHeight / 2
      ctx.lineTo(x, y)
    }

    ctx.lineTo(w, (i + 1) * waveHeight)
    ctx.lineTo(0, (i + 1) * waveHeight)
    ctx.closePath()
    ctx.fill()
  }
}

const drawCheckerboard = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
  const rows = 4 + Math.floor(Math.random() * 6)
  const cols = 4 + Math.floor(Math.random() * 6)
  const cellW = w / cols
  const cellH = h / rows

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = randomColor()
      ctx.fillRect(col * cellW, row * cellH, cellW, cellH)
    }
  }
}

const effects: Record<EffectType, (ctx: CanvasRenderingContext2D, w: number, h: number) => void> = {
  quadrants: drawQuadrants,
  gradient: drawGradient,
  circles: drawCircles,
  waves: drawWaves,
  checkerboard: drawCheckerboard,
}

export const drawRandomEffect = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const w = canvas.width
  const h = canvas.height

  // Select random effect
  const effectTypes: EffectType[] = ['quadrants', 'gradient', 'circles', 'waves', 'checkerboard']
  const randomEffect = effectTypes[Math.floor(Math.random() * effectTypes.length)]

  effects[randomEffect](ctx, w, h)
}

export const useCanvasEffect = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    drawRandomEffect(canvas)
  }, [canvasRef])
}
