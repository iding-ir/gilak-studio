import { useEffect, useRef } from 'react'

export function usePaint(canvasRef: React.RefObject<HTMLCanvasElement | null>, enabled: boolean) {
  const drawing = useRef(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const savedImage = useRef<ImageData | null>(null)

  useEffect(() => {
    if (!canvasRef.current || !enabled) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    function getPos(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    function drawCircle(x: number, y: number) {
      if (!ctx) return
      ctx.save()
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()
    }

    function handlePointerMove(e: MouseEvent) {
      const pos = getPos(e)
      if (!ctx) return
      if (drawing.current && lastPos.current) {
        ctx.beginPath()
        ctx.moveTo(lastPos.current.x, lastPos.current.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.strokeStyle = '#222'
        ctx.lineWidth = 2
        ctx.stroke()
        lastPos.current = pos
        savedImage.current = ctx.getImageData(0, 0, canvas.width, canvas.height)
      } else {
        if (savedImage.current) {
          ctx.putImageData(savedImage.current, 0, 0)
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        drawCircle(pos.x, pos.y)
      }
    }

    function handlePointerDown(e: MouseEvent) {
      drawing.current = true
      lastPos.current = getPos(e)
      if (ctx) {
        if (savedImage.current) {
          ctx.putImageData(savedImage.current, 0, 0)
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
      }
    }

    function handlePointerUp() {
      drawing.current = false
      lastPos.current = null
    }

    canvas.addEventListener('mousemove', handlePointerMove)
    canvas.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)

    return () => {
      canvas.removeEventListener('mousemove', handlePointerMove)
      canvas.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height)
      savedImage.current = null
    }
  }, [canvasRef, enabled])
}
