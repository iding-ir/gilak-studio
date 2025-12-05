import type { Meta, StoryObj } from '@storybook/react'
import { Canvas } from './Canvas'

const meta = {
  title: 'Components/Canvas',
  component: Canvas,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Canvas>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
