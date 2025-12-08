import React, { useRef } from 'react'
import { usePaint } from '../hooks/usePaint'
import styles from '../components/Canvas.module.scss'

export interface PaintCanvasProps {
  enabled: boolean
  width?: number
  height?: number
}

const PaintCanvas: React.FC<PaintCanvasProps> = ({ enabled, width = 800, height = 600 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  usePaint(canvasRef, enabled)

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={styles.paintCanvas}
      style={{ cursor: enabled ? 'none' : 'default' }}
    />
  )
}

export default PaintCanvas
