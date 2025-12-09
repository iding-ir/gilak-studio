import React, { type ChangeEvent, useState, type ReactNode } from 'react'
import IconZoom from './icon-zoom.svg?url'
import styles from './ResizableScreen.module.scss'
import { Select } from '../Select'

const zoomLevels = [10, 25, 50, 75, 100, 125, 150, 175, 200] as const

export type Zoom = (typeof zoomLevels)[number]

export interface ResizableScreenProps {
  children: ReactNode
  zoomLevel?: Zoom
}

export const ResizableScreen: React.FC<ResizableScreenProps> = ({ children, zoomLevel = 100 }) => {
  const [currentZoomLevel, setCurrentZoomLevel] = useState(zoomLevel)

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentZoomLevel(Number(e.target.value) as Zoom)
  }

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <div className={styles.content} style={{ transform: `scale(${currentZoomLevel / 100})` }}>
          {children}
        </div>
      </div>
      <div className={styles.footer}>
        <Select
          options={zoomLevels.map((z) => ({ value: z.toString(), text: `${z}%` }))}
          icon={IconZoom}
          selected={currentZoomLevel.toString()}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
