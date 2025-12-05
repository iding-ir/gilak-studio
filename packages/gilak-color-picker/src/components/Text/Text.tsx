import { useMemo } from 'react'

import styles from './Text.module.scss'
import { getBlackAndWhiteColor } from '../../methods/get-black-and-white'
import { useColorPicker } from '../../context/hook'

export const Text = () => {
  const { color } = useColorPicker()

  const bwColor = useMemo(() => getBlackAndWhiteColor(color), [color])

  return (
    <div
      className={styles.container}
      style={{ color: bwColor, backgroundColor: color, borderColor: bwColor }}
    >
      {color}
    </div>
  )
}
