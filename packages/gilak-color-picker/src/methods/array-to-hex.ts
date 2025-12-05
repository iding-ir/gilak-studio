export const arrayToHex = (array: Uint8ClampedArray) => {
  return `#${Array.from(array)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')}`
}
