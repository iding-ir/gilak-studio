import { Canvas, drawRandomEffect, PaintCanvas } from '@gilak/canvas'
import { Magnifier, useColorPicker } from '@gilak/color-picker'
import { ColorSwatch } from '@gilak/color-swatch'
import { Dropdown, Icon } from '@gilak/components'
import { FloatingWindow, FloatingWindowProvider } from '@gilak/floating-window'
import styles from './Editor.module.scss'
import IconColorPickerUrl from '../../assets/icon-eyedropper.svg?url'
import IconCanvasUrl from '../../assets/icon-dice.svg?url'
import IconBucketUrl from '../../assets/icon-bucket.svg?url'
import IconBrush from '../../assets/icon-brush.svg?url'
import IconBrushTypes from '../../assets/brush-circle.svg?url'
import { useRef, useState } from 'react'
import { BrushTypes } from '../BrushTypes'
import type { BrushType } from '../BrushTypes/BrushTypes'

export const Editor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paintMode, setPaintMode] = useState(false)
  const [brush, setBrush] = useState<BrushType>('circle')
  const { selectedColor, isActive, isHovered, setIsActive, setIsHovered, setSelectedColor } =
    useColorPicker()

  const handleRandomize = () => {
    if (!canvasRef.current) return
    drawRandomEffect(canvasRef.current)
  }

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li>
              <button onClick={() => setIsActive(true)}>
                <Icon
                  icon={IconColorPickerUrl}
                  size="lg"
                  color="var(--color-dark-xxxl)"
                  backgroundColor="var(--color-light-xxs)"
                />
              </button>
            </li>
            <li>
              <button onClick={() => setPaintMode(true)}>
                <Icon
                  icon={IconBrush}
                  size="lg"
                  color="var(--color-dark-xxxl)"
                  backgroundColor="var(--color-light-xxs)"
                />
              </button>
            </li>
            <li>
              <Dropdown
                icon={
                  <Icon
                    icon={IconBrushTypes}
                    size="lg"
                    color="var(--color-dark-xxxl)"
                    backgroundColor="var(--color-light-xxs)"
                  />
                }
              >
                <BrushTypes brush={brush} onChange={setBrush} />
              </Dropdown>
            </li>
            <li>
              <button onClick={handleRandomize}>
                <Icon
                  icon={IconCanvasUrl}
                  size="lg"
                  color="var(--color-dark-xxxl)"
                  backgroundColor="var(--color-light-xxs)"
                />
              </button>
            </li>
          </ul>
        </nav>

        <ColorSwatch
          size="sm"
          icon={IconBucketUrl}
          color={selectedColor}
          colors={[
            '#ffffff',
            '#000000',
            '#D62828',
            '#F77F00',
            '#FFCF33',
            '#1B9E4B',
            '#009DAE',
            '#3056D3',
            '#2A2A72',
            '#9C4DF4',
            '#E6D2B5',
            '#8A8A8A',
          ]}
          onChange={setSelectedColor}
        />
      </header>

      <main className={styles.main}>
        <FloatingWindowProvider>
          <FloatingWindow
            id="floating-window-1"
            title="Color Picker"
            footer="Select a color from a randomized canvas"
            initialPosition={{ x: 0, y: 0 }}
            initialSize={{ w: 600, h: 600 }}
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
            title="Drawing Canvas"
            footer="Pick your brush and start drawing!"
            initialPosition={{ x: 800, y: 0 }}
            initialSize={{ w: 600, h: 600 }}
            zIndex={1100}
          >
            <PaintCanvas
              enabled={paintMode}
              width={600}
              height={400}
              color={selectedColor}
              size={2}
            />
          </FloatingWindow>
        </FloatingWindowProvider>
      </main>
    </div>
  )
}
