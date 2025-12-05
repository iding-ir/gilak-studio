import React from 'react'
import styles from './Canvas.module.scss'
import { useCanvasEffect } from '../hooks'

export interface CanvasProps {
  children?: React.ReactNode
  ref?: React.RefObject<HTMLCanvasElement | null>
  width?: string | number
  height?: string | number
  onClick?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  onEnter?: () => void
  onLeave?: () => void
}

export const Canvas: React.FC<CanvasProps> = ({
  children,
  ref,
  width = '100%',
  height = '100%',
  onClick,
  onEnter,
  onLeave,
}) => {
  const canvasRef = ref as React.RefObject<HTMLCanvasElement>

  useCanvasEffect(canvasRef)

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={width}
        height={height}
        onClick={onClick}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
      />
      {children}
    </div>
  )
}
