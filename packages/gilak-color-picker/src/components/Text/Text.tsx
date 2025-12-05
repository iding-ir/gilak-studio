import { useMemo } from 'react'
import { getContrastColor } from '@gilak/utils'

import styles from './Text.module.scss'
import { useColorPicker } from '../../context'

export const Text = () => {
  const { currentColor } = useColorPicker()

  const contrastColor = useMemo(() => getContrastColor(currentColor), [currentColor])

  return (
    <div
      className={styles.container}
      style={{ color: contrastColor, backgroundColor: currentColor, borderColor: contrastColor }}
    >
      {currentColor}
    </div>
  )
}
