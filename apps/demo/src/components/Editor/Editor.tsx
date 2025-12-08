import { Canvas, drawRandomEffect } from '@gilak/canvas'
import { Magnifier, useColorPicker } from '@gilak/color-picker'
import { ColorSwatch } from '@gilak/color-swatch'
import { Icon } from '@gilak/components'
import { FloatingWindow, FloatingWindowProvider } from '@gilak/floating-window'
import styles from './Editor.module.scss'
import IconColorPickerUrl from '../../assets/icon-eyedropper.svg?url'
import IconCanvasUrl from '../../assets/icon-dice.svg?url'
import IconBucketUrl from '../../assets/icon-bucket.svg?url'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getContrastColor } from '@gilak/utils'

export const Editor: React.FC = () => {
  const { t } = useTranslation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef2 = useRef<HTMLCanvasElement>(null)
  const { selectedColor, isActive, isHovered, setIsActive, setIsHovered, setSelectedColor } =
    useColorPicker()

  const handleRandomize = () => {
    if (!canvasRef.current || !canvasRef2.current) return
    drawRandomEffect(canvasRef.current)
    drawRandomEffect(canvasRef2.current)
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <button disabled={false} onClick={() => setIsActive(true)}>
                <Icon
                  icon={IconColorPickerUrl}
                  size="lg"
                  color={selectedColor}
                  backgroundColor={getContrastColor(selectedColor)}
                />
              </button>
            </li>
            <li>
              <button onClick={handleRandomize}>
                <Icon
                  icon={IconCanvasUrl}
                  size="lg"
                  color={selectedColor}
                  backgroundColor={getContrastColor(selectedColor)}
                />
              </button>
            </li>
          </ul>
        </nav>

        <ColorSwatch
          size="lg"
          value={selectedColor}
          placeholder={t('colorSwatch.placeholder')}
          icon={IconBucketUrl}
          color={selectedColor}
          backgroundColor={getContrastColor(selectedColor)}
        />
      </header>

      <main className={styles.main}>
        <FloatingWindowProvider>
          <FloatingWindow
            id="floating-window-1"
            title={
              'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
            }
            footer="2025 Gilak Studio"
            initialX={0}
            initialY={0}
            initialWidth={600}
            initialHeight={600}
            zIndex={1100}
          >
            <Canvas
              ref={canvasRef}
              width="400"
              height="400"
              onClick={() => setIsActive(false)}
              onEnter={() => setIsHovered(true)}
              onLeave={() => setIsHovered(false)}
            >
              {isActive && isHovered && (
                <Magnifier canvasRef={canvasRef} onSelect={setSelectedColor} />
              )}
            </Canvas>
          </FloatingWindow>

          <FloatingWindow
            id="floating-window-2"
            title={
              'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
            }
            footer="2025 Gilak Studio"
            initialX={800}
            initialY={0}
            initialWidth={600}
            initialHeight={600}
            zIndex={1100}
          >
            <Canvas
              ref={canvasRef2}
              width="400"
              height="400"
              onClick={() => setIsActive(false)}
              onEnter={() => setIsHovered(true)}
              onLeave={() => setIsHovered(false)}
            >
              {isActive && isHovered && (
                <Magnifier canvasRef={canvasRef2} onSelect={setSelectedColor} />
              )}
            </Canvas>
          </FloatingWindow>
        </FloatingWindowProvider>
      </main>
    </div>
  )
}
