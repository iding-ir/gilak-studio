import IconBrushSizes from '../../assets/brush-circle-empty.svg?url'
import { Select } from '@gilak/components'

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
    <Select
      options={brushSizes.map((size) => ({ value: size.toString(), text: `${size.toString()}px` }))}
      icon={IconBrushSizes}
      selected={brush.toString()}
      onChange={(e) => onChange(Number(e.target.value) as BrushSize)}
    />
  )
}
