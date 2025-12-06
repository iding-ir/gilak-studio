import { Canvas, drawRandomEffect } from '@gilak/canvas'
import { Magnifier, useColorPicker } from '@gilak/color-picker'
import { ColorSwatch } from '@gilak/color-swatch'
import { Icon } from '@gilak/components'
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
                <Icon
                  icon={IconColorPickerUrl}
                  size="xl"
                  color={selectedColor}
                  backgroundColor={getContrastColor(selectedColor)}
                />
              </button>
            </li>
            <li>
              <button onClick={handleRandomize}>
                <Icon
                  icon={IconCanvasUrl}
                  size="xl"
                  color={selectedColor}
                  backgroundColor={getContrastColor(selectedColor)}
                />
              </button>
            </li>
          </ul>
        </nav>

        <ColorSwatch
          size="xl"
          value={selectedColor}
          placeholder={t('colorSwatch.placeholder')}
          icon={IconBucketUrl}
          color={selectedColor}
          backgroundColor={getContrastColor(selectedColor)}
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
