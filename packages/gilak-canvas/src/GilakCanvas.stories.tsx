import type { Meta, StoryObj } from '@storybook/react'
import { GilakCanvas } from './GilakCanvas'

const meta = {
  title: 'Components/GilakCanvas',
  component: GilakCanvas,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GilakCanvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
