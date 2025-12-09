import styles from './Select.module.scss'

export interface SelectProps {
  options?: { value: string; text: string }[]
  selected?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ options, selected, onChange }: SelectProps) => {
  return (
    <select className={styles.root} onChange={onChange} value={selected}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  )
}
