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

export const BrushTypes = () => {
  return (
    <List
      direction="vertical"
      count={3}
      items={[
        <Icon icon={IconCircle} size="sm" />,
        <Icon icon={IconSquare} size="sm" />,
        <Icon icon={IconDisamond} size="sm" />,
        <Icon icon={IconTriangle} size="sm" />,
        <Icon icon={IconStar} size="sm" />,
        <Icon icon={IconHorizontal} size="sm" />,
        <Icon icon={IconVerical} size="sm" />,
        <Icon icon={IconBackslash} size="sm" />,
        <Icon icon={IconSlash} size="sm" />,
      ]}
    />
  )
}
