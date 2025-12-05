# @gilak/utils

Utility functions for Gilak Studio packages.

## Installation

```bash
npm install @gilak/utils
# or
pnpm add @gilak/utils
# or
yarn add @gilak/utils
```

## Usage

```typescript
import {
  debounce,
  throttle,
  convertArrayToHex,
  getContrastColor,
  getCanvasColor,
  getBackgroundColor,
} from '@gilak/utils'

// Debounce a function
const debouncedFn = debounce(() => console.log('Called'), 300)

// Throttle a function
const throttledFn = throttle(() => console.log('Called'), 300)

// Convert Uint8ClampedArray to hex color
const hex = convertArrayToHex(new Uint8ClampedArray([255, 0, 0, 255])) // '#ff0000ff'

// Get contrasting black or white color for text on a background
const contrastColor = getContrastColor('#ff0000') // '#ffffff'

// Get a suitable background color for an input color
const bgColor = getBackgroundColor('#ff0000') // Returns a complementary background color

// Get color from canvas at specific coordinates
const color = getCanvasColor({ canvas, x: 100, y: 100 })
```

### Deprecated Aliases

For backward compatibility, the following deprecated aliases are available:

- `arrayToHex` → use `convertArrayToHex`
- `getBlackAndWhiteColor` → use `getContrastColor`
- `pickColorFromCanvas` → use `getCanvasColor`

## License

MIT
