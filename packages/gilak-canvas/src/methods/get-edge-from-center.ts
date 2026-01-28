export function getEdgeFromCenter(
  center: number,
  size: number,
  offset: number = 0,
  extras: number[] = [],
): number {
  const extrasTotal = extras.reduce((acc: number, val) => acc + val, 0);

  return center - size / 2 - offset + extrasTotal;
}
