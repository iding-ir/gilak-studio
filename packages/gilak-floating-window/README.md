# @gilak/floating-window

A React floating window component with draggable functionality.

## Installation

```bash
npm install @gilak/floating-window
# or
pnpm add @gilak/floating-window
```

## Usage

```jsx
import { FloatingWindow } from '@gilak/floating-window'
import '@gilak/floating-window/dist/gilak-floating-window.css'

function App() {
  return (
    <FloatingWindow title="My Window" draggable toolbar={<button>Close</button>}>
      <p>Window content goes here</p>
    </FloatingWindow>
  )
}
```

## Props

- `title` - Window title displayed in header
- `children` - Content to display in the window body
- `toolbar` - Optional React node to render in the top-right of the header
- `draggable` - Enable dragging the window by its header (default: `false`)
- `initialX` - Initial X position (default: `0`)
- `initialY` - Initial Y position (default: `0`)
- `zIndex` - Custom z-index value
- `className` - Additional CSS class names

## License

MIT © [Aydin Ghane Kh.](https://github.com/iding-ir)
