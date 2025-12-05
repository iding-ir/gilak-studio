import { Canvas, drawRandomEffect } from '@gilak/canvas'
import { Magnifier, useColorPicker } from '@gilak/color-picker'
import { ColorSwatch } from '@gilak/color-swatch'
import styles from './Editor.module.scss'
import IconColorPicker from '../../assets/icon-eyedropper.svg'
import IconCanvas from '../../assets/icon-dice.svg'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const Editor: React.FC = () => {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { selectedColor, isActive, isHovered, setIsActive, setIsHovered, setSelectedColor } =
    useColorPicker()

  const handleRandomize = () => {
    if (!canvasRef.current) return
    drawRandomEffect(canvasRef.current)
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <button disabled={false} onClick={() => setIsActive(true)}>
                <IconColorPicker />
              </button>
            </li>
            <li>
              <button onClick={handleRandomize}>
                <IconCanvas />
              </button>
            </li>
          </ul>
        </nav>

        <ColorSwatch
          id="color-swatch"
          value={selectedColor}
          readOnly
          placeholder={t('colorSwatch.placeholder')}
        />
      </header>

      <main className={styles.main}>
        <Canvas
          ref={canvasRef}
          width="500px"
          height="500px"
          onClick={() => setIsActive(false)}
          onEnter={() => setIsHovered(true)}
          onLeave={() => setIsHovered(false)}
        >
          {isActive && isHovered && <Magnifier canvasRef={canvasRef} onSelect={setSelectedColor} />}
        </Canvas>
      </main>
    </div>
  )
}
