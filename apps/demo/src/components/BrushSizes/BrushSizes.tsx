import { List, Text } from '@gilak/components'

const brushSizes = [2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export type BrushSize = (typeof brushSizes)[number]

export const BrushSizes = ({
  brush,
  onChange,
}: {
  brush: BrushSize
  onChange: (brush: BrushSize) => void
}) => {
  return (
    <List
      direction="column"
      count={1}
      theme="light"
      items={brushSizes.map((size) => (
        <Text
          selected={brush === size}
          size="xs"
          frameless
          onClick={() => onChange(size)}
          text={size.toString()}
        />
      ))}
    />
  )
}
