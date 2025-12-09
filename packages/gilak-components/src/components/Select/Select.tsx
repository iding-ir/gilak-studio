import styles from './Select.module.scss'

export interface SelectProps {
  options?: { value: string; text: string }[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ options, onChange }: SelectProps) => {
  return (
    <select className={styles.root} onChange={onChange}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  )
}
