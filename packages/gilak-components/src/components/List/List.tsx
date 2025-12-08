import React, { ReactNode } from 'react'
import styles from './List.module.scss'
import clsx from 'clsx'

export interface ListProps {
  items: ReactNode[]
  direction?: 'horizontal' | 'vertical'
  count?: 1 | 2 | 3 | 4
}

export const List = ({ items, direction, count }: ListProps): React.ReactElement => {
  return (
    <ul
      className={clsx(styles.list, {
        [styles.horizontal]: direction === 'horizontal',
        [styles.vertical]: direction === 'vertical',
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
