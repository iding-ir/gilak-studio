import React from 'react'
import type { ReactNode } from 'react'
import styles from './List.module.scss'
import clsx from 'clsx'

export interface ListProps {
  items: ReactNode[]
  direction?: 'row' | 'column'
  count?: 1 | 2 | 3 | 4
  frameless?: boolean
  theme?: 'primary' | 'light'
}

export const List = ({
  items,
  direction,
  count,
  frameless = false,
  theme = 'light',
}: ListProps): React.ReactElement => {
  return (
    <ul
      className={clsx(styles.list, styles[theme], {
        [styles.frameless]: frameless,
        [styles.row]: direction === 'row',
        [styles.column]: direction === 'column',
        [styles.two]: count === 2,
        [styles.three]: count === 3,
        [styles.four]: count === 4,
      })}
    >
      {items.map((item, idx) => (
        <li key={idx} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  )
}
