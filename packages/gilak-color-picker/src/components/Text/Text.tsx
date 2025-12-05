import { useMemo } from 'react'

import styles from './Text.module.scss'
import { getBlackAndWhiteColor } from '../../methods/get-black-and-white'
import { useColorPicker } from '../../context'

export const Text = () => {
  const { currentColor } = useColorPicker()

  const bwColor = useMemo(() => getBlackAndWhiteColor(currentColor), [currentColor])

  return (
    <div
      className={styles.container}
      style={{ color: bwColor, backgroundColor: currentColor, borderColor: bwColor }}
    >
      {currentColor}
    </div>
  )
}
