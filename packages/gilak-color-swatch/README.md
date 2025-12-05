# @gilak/color-swatch

A React color swatch component for displaying selected colors.

## Installation

```bash
npm install @gilak/color-swatch
# or
pnpm add @gilak/color-swatch
```

## Usage

```jsx
import { ColorSwatch } from '@gilak/color-swatch'
import '@gilak/color-swatch/dist/gilak-color-swatch.css'

function App() {
  const [color, setColor] = useState('#3b82f6')

  return <ColorSwatch value={color} readOnly />
}
```

## Props

- `value: string` - The color value to display (hex format)
- `onChange?: (color: string) => void` - Callback when color changes
- `name?: string` - Input name attribute (default: 'color')
- `readOnly?: boolean` - Whether the input is read-only (default: false)
- `placeholder?: string` - Placeholder text (default: '#000000')

## License

MIT © [Aydin Ghane Kh.](https://github.com/iding-ir)
