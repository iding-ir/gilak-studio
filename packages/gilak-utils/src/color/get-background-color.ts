export const getBackgroundColor = (color: string): string => {
  // Remove the hash if present
  let hexColor = color.startsWith('#') ? color.slice(1) : color

  // Convert 3-digit hex to 6-digit hex
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Parse the hex color
  const r = parseInt(hexColor.slice(0, 2), 16)
  const g = parseInt(hexColor.slice(2, 4), 16)
  const b = parseInt(hexColor.slice(4, 6), 16)

  // Calculate the luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // For dark colors (luminance < 0.5), return a lighter background
  // For light colors (luminance >= 0.5), return a slightly darker background
  if (luminance < 0.5) {
    // Dark color - lighten the background
    const factor = 0.2 + luminance * 0.3 // Scales from 20% to 35% lightening
    const newR = Math.min(255, Math.round(r + (255 - r) * factor))
    const newG = Math.min(255, Math.round(g + (255 - g) * factor))
    const newB = Math.min(255, Math.round(b + (255 - b) * factor))

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
  } else {
    // Light color - darken the background slightly
    const factor = 0.85 - luminance * 0.15 // Scales from 70% to 85%
    const newR = Math.round(r * factor)
    const newG = Math.round(g * factor)
    const newB = Math.round(b * factor)

    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
  }
}
