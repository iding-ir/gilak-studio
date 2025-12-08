import { Icon, List } from '@gilak/components'
import IconCircle from '../../assets/brush-circle.svg?url'
import IconSquare from '../../assets/brush-square.svg?url'
import IconTriangle from '../../assets/brush-triangle.svg?url'
import IconDisamond from '../../assets/brush-diamond.svg?url'
import IconStar from '../../assets/brush-star.svg?url'
import IconSlash from '../../assets/brush-slash.svg?url'
import IconBackslash from '../../assets/brush-backslash.svg?url'
import IconHorizontal from '../../assets/brush-horizontal.svg?url'
import IconVerical from '../../assets/brush-vertical.svg?url'

export type BrushType =
  | 'circle'
  | 'square'
  | 'diamond'
  | 'triangle'
  | 'star'
  | 'horizontal'
  | 'vertical'
  | 'backslash'
  | 'slash'

export const BrushTypes = ({
  brush,
  onChange,
}: {
  brush: BrushType
  onChange: (brush: BrushType) => void
}) => {
  return (
    <List
      direction="vertical"
      count={3}
      items={[
        <Icon
          selected={brush === 'circle'}
          icon={IconCircle}
          size="sm"
          onClick={() => onChange('circle')}
        />,
        <Icon
          selected={brush === 'square'}
          icon={IconSquare}
          size="sm"
          onClick={() => onChange('square')}
        />,
        <Icon
          selected={brush === 'diamond'}
          icon={IconDisamond}
          size="sm"
          onClick={() => onChange('diamond')}
        />,
        <Icon
          selected={brush === 'triangle'}
          icon={IconTriangle}
          size="sm"
          onClick={() => onChange('triangle')}
        />,
        <Icon
          selected={brush === 'star'}
          icon={IconStar}
          size="sm"
          onClick={() => onChange('star')}
        />,
        <Icon
          selected={brush === 'horizontal'}
          icon={IconHorizontal}
          size="sm"
          onClick={() => onChange('horizontal')}
        />,
        <Icon
          selected={brush === 'vertical'}
          icon={IconVerical}
          size="sm"
          onClick={() => onChange('vertical')}
        />,
        <Icon
          selected={brush === 'backslash'}
          icon={IconBackslash}
          size="sm"
          onClick={() => onChange('backslash')}
        />,
        <Icon
          selected={brush === 'slash'}
          icon={IconSlash}
          size="sm"
          onClick={() => onChange('slash')}
        />,
      ]}
    />
  )
}
