# @gilak/canvas

A React canvas component with random visual effects.

## Installation

```bash
npm install @gilak/canvas
# or
pnpm add @gilak/canvas
```

## Usage

```jsx
import { Canvas, RandomCanvas } from '@gilak/canvas'
import '@gilak/canvas/dist/gilak-canvas.css'

function App() {
  return (
    <>
      {/* Basic canvas */}
      <Canvas width="500px" height="500px" />

      {/* Canvas with random visual effects */}
      <RandomCanvas width="500px" height="500px" />
    </>
  )
}
```

## Components

### Canvas

Basic canvas component that can be used with color picker.

### RandomCanvas

Canvas component that generates random visual effects on mount.

## License

MIT © [Aydin Ghane Kh.](https://github.com/iding-ir)
