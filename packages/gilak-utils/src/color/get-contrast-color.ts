export const getContrastColor = (color: string): string => {
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

  // Return black for light colors and white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}
