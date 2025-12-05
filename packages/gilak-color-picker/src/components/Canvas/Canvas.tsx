import React from 'react'
import styles from './Canvas.module.scss'
import { useColorPicker } from '../../context/hook'
import { Magnifier } from '../Magnifier'

export interface CanvasProps {
  ref?: React.RefObject<HTMLCanvasElement | null>
  width?: string | number
  height?: string | number
  onClick?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void
  onSelect?: (color: string) => void
}

export const Canvas: React.FC<CanvasProps> = ({
  ref,
  width = '100%',
  height = '100%',
  onClick,
  onSelect,
}) => {
  const canvasRef = ref as React.RefObject<HTMLCanvasElement>
  const { isHovered, isActive, setIsHovered } = useColorPicker()

  const handleHover = (isHovering: boolean) => {
    setIsHovered(isHovering)
  }

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={width}
        height={height}
        onPointerEnter={() => handleHover(true)}
        onPointerLeave={() => handleHover(false)}
        onClick={onClick}
      />

      {isActive && isHovered && <Magnifier onSelect={onSelect} canvasRef={canvasRef} />}
    </div>
  )
}
