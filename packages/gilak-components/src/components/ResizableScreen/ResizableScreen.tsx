import React, { useState, type ReactNode } from 'react'
import IconZoom from './icon-zoom.svg?url'
import styles from './ResizableScreen.module.scss'
import { List } from '../List'
import { Text } from '../Text'
import { Dropdown } from '../DropDown'
import { Icon } from '../Icon'

const zoomLevels = [10, 25, 50, 75, 100, 125, 150, 175, 200] as const

export type Zoom = (typeof zoomLevels)[number]

export interface ResizableScreenProps {
  children: ReactNode
  zoomLevel?: Zoom
}

export const ResizableScreen: React.FC<ResizableScreenProps> = ({ children, zoomLevel = 100 }) => {
  const [currentZoomLevel, setCurrentZoomLevel] = useState(zoomLevel)

  return (
    <div className={styles.root}>
      <div className={styles.screen}>
        <div className={styles.content} style={{ transform: `scale(${currentZoomLevel / 100})` }}>
          {children}
        </div>
      </div>
      <div className={styles.footer}>
        <Dropdown
          position="top"
          trigger={
            <div className={styles.zoomTrigger}>
              <Icon icon={IconZoom} size="sm" interactive frameless />
              <Text size="xs" frameless text={`${currentZoomLevel}%`} />
            </div>
          }
        >
          <List
            direction="column"
            count={1}
            theme="light"
            items={zoomLevels.map((z) => (
              <Text
                selected={currentZoomLevel === z}
                size="xs"
                frameless
                onClick={() => setCurrentZoomLevel(z)}
                text={`${z.toString()}%`}
              />
            ))}
          />
        </Dropdown>
      </div>
    </div>
  )
}
