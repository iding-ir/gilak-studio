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
import '@gilak/floating-window/dist/gilak-floating-window.css'

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
    <FloatingWindowProvider>
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
          <FloatingWindow
            id="floating-window-1"
            title={
              'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
            }
            footer="2025 Gilak Studio"
            draggable
            initialX={0}
            initialY={0}
            initialWidth={520}
            initialHeight={540}
            zIndex={1100}
            restrictToParent={true}
            savePosition={true}
            resizable={true}
          >
            <Canvas
              ref={canvasRef}
              width="500px"
              height="500px"
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
            id="editor-window-2"
            title={
              'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
            }
            footer="2025 Gilak Studio"
            draggable
            initialX={0}
            initialY={0}
            initialWidth={400}
            initialHeight={300}
            zIndex={1100}
            restrictToParent={true}
            savePosition={true}
            resizable={true}
          >
            dolor sit amet consectetur adipisicing elit. Quisquam, quod. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
            odit rerum vel eaque eius consectetur provident placeat beatae tempora quae iusto quas
            nulla iste iure dolores, dignissimos ipsam quia asperiores. Molestiae, quidem! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Ex sequi nostrum quibusdam id, saepe
            ad non aut cupiditate laborum, voluptas veritatis inventore minima temporibus corporis
            dolor amet distinctio eaque sapiente. dolor sit amet consectetur adipisicing elit.
            Quisquam, quod. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Et odit rerum vel eaque eius consectetur provident placeat
            beatae tempora quae iusto quas nulla iste iure dolores, dignissimos ipsam quia
            asperiores. Molestiae, quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ex sequi nostrum quibusdam id, saepe ad non aut cupiditate laborum, voluptas veritatis
            inventore minima temporibus corporis dolor amet distinctio eaque sapiente.
          </FloatingWindow>
        </main>
      </div>
    </FloatingWindowProvider>
  )
}
