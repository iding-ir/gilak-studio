import { Canvas } from 'gilak-color-picker'
import { useColorPicker } from 'gilak-color-picker'
import styles from './Editor.module.scss'
import Icon from '../../assets/icon-eyedropper.svg'
import { useEffect, useRef, useState } from 'react'

export const Editor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [color, setColor] = useState<string>()
  const { setIsActive } = useColorPicker()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const midX = w / 2
    const midY = h / 2

    // Top-left: green
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, midX, midY)

    // Top-right: blue
    ctx.fillStyle = 'blue'
    ctx.fillRect(midX, 0, midX, midY)

    // Bottom-left: orange
    ctx.fillStyle = 'orange'
    ctx.fillRect(0, midY, midX, midY)

    // Bottom-right: red
    ctx.fillStyle = 'red'
    ctx.fillRect(midX, midY, midX, midY)
  }, [])

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
