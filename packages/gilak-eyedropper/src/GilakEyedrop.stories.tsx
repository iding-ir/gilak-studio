import type { Meta, StoryObj } from '@storybook/react'
import { GilakEyedrop } from './GilakEyedrop'

const meta = {
  title: 'Components/GilakEyedrop',
  component: GilakEyedrop,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GilakEyedrop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
