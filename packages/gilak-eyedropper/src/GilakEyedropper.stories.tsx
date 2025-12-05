import type { Meta, StoryObj } from '@storybook/react'
import { GilakEyedropper } from './GilakEyedropper'

const meta = {
  title: 'Components/GilakEyedropper',
  component: GilakEyedropper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GilakEyedropper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
