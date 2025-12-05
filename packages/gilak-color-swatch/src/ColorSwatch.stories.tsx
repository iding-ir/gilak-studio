import type { Meta, StoryObj } from '@storybook/react'
import { ColorSwatch } from './ColorSwatch'
import { useState } from 'react'

const meta = {
  title: 'Components/ColorSwatch',
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '#3b82f6',
    readOnly: true,
  },
}

export const Empty: Story = {
  args: {
    value: '',
    placeholder: '#000000',
    readOnly: true,
  },
}

const InteractiveComponent = (args: { value: string }) => {
  const [color, setColor] = useState(args.value)
  return <ColorSwatch value={color} onChange={setColor} />
}

export const Interactive: Story = {
  args: {
    value: '#f59e0b',
  },
  render: (args) => <InteractiveComponent {...args} />,
}
