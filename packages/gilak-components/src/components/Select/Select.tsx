import styles from './Select.module.scss'
import { Icon } from '../Icon'

export interface SelectProps {
  options?: { value: string; text: string }[]
  selected?: string
  icon?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ options, selected, icon, onChange }: SelectProps) => {
  return (
    <label className={styles.root}>
      {icon && <Icon icon={icon} size="sm" className={styles.icon} frameless />}
      <select onChange={onChange} name="scale" value={selected}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </label>
  )
}
