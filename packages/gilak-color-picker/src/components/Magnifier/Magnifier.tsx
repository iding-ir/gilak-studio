import { useColorPicker } from '../../context'
import { useMagnifier } from '../../hooks/use-magnifier'
import { Text } from '../Text'
import styles from './Magnifier.module.scss'

export const Magnifier = ({
  canvasRef,
  onSelect,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  onSelect?: (color: string) => void
}) => {
  const { color, width } = useColorPicker()
  const { containerRef, magnifierRef } = useMagnifier({ onSelect, canvasRef })

  return (
    <div className={styles.container} ref={containerRef}>
      <canvas
        ref={magnifierRef}
        style={{ borderColor: color, borderWidth: width }}
        width={0}
        height={0}
      />

      <Text />
    </div>
  )
}
