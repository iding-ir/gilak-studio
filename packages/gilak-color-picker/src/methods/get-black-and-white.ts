export const getBlackAndWhiteColor = (backgroundColor: string): string => {
  // Remove the hash if present
  if (backgroundColor.startsWith('#')) {
    backgroundColor = backgroundColor.slice(1)
  }

  // Convert 3-digit hex to 6-digit hex
  if (backgroundColor.length === 3) {
    backgroundColor = backgroundColor
      .split('')
      .map((char) => char + char)
      .join('')
  }

  // Parse the hex color
  const r = parseInt(backgroundColor.slice(0, 2), 16)
  const g = parseInt(backgroundColor.slice(2, 4), 16)
  const b = parseInt(backgroundColor.slice(4, 6), 16)

  // Calculate the luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for light backgrounds and white for dark backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}
