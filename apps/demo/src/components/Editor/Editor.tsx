import { Canvas } from '@gilak/color-picker'
import { useColorPicker } from '@gilak/color-picker'
import styles from './Editor.module.scss'
import Icon from '../../assets/icon-eyedropper.svg'
import { useRef, useState } from 'react'
import { useCanvasEffect } from '../../hooks/use-canvas-effect'

export const Editor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState<string>('')
  const { setIsActive } = useColorPicker()

  useCanvasEffect(canvasRef)

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <button disabled={false} onClick={() => setIsActive(true)}>
                <Icon />
              </button>
            </li>
          </ul>
        </nav>

        <input name="color" readOnly type="text" value={color} />
      </header>

      <main className={styles.main}>
        <Canvas
          ref={canvasRef}
          width="500px"
          height="500px"
          onClick={() => setIsActive(false)}
          onSelect={(color) => setColor(color)}
        />
      </main>
    </div>
  )
}
