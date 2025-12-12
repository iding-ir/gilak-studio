export const BRUSH_TYPES = [
  'CIRCLE',
  'SQUARE',
  'DIAMOND',
  'TRIANGLE',
  'STAR',
  'HORIZONTAL',
  'VERTICAL',
  'BACKSLASH',
  'SLASH',
] as const

export type BrushType = (typeof BRUSH_TYPES)[number]

export const BRUSH_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

export type BrushSize = (typeof BRUSH_SIZES)[number]
