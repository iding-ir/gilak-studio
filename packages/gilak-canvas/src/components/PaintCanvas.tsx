import React, { useRef, forwardRef } from 'react'
import { usePaint } from '../hooks/usePaint'
import styles from '../components/Canvas.module.scss'
import type { BrushType } from '../hooks/brushTypes'

export interface PaintCanvasProps {
  enabled: boolean
  width?: number
  height?: number
  color?: string
  brushSize?: number
  brushType?: BrushType
}

const PaintCanvas = forwardRef<HTMLCanvasElement, PaintCanvasProps>(
  (
    { enabled, width = 800, height = 600, color = '#222', brushSize = 2, brushType = 'circle' },
    ref
  ) => {
    const internalRef = useRef<HTMLCanvasElement>(null)
    const canvasRef = (ref ?? internalRef) as React.RefObject<HTMLCanvasElement>
    usePaint({ canvasRef, enabled, color, brushSize, brushType })

    return (
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
        style={{ cursor: enabled ? 'none' : 'default' }}
      />
    )
  }
)

export default PaintCanvas
