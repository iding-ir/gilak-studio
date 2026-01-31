type AnyCanvas2DContext =
  | CanvasRenderingContext2D
  | OffscreenCanvasRenderingContext2D;

export type FillAreaArgs = {
  ctx: AnyCanvas2DContext;
  x: number;
  y: number;
  color: string; // supports #rrggbb, #rgb, rgb(...), rgba(...)
  tolerance?: number; // color tolerance 0..255
};

function parseColor(input: string): [number, number, number, number] {
  input = input.trim();
  if (input.startsWith("#")) {
    const hex = input.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return [r, g, b, 255];
    }
    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b, 255];
    }
  }
  const rgbMatch = input.match(/rgba?\(([^)]+)\)/);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((s) => s.trim());
    const r = Number(parts[0]) || 0;
    const g = Number(parts[1]) || 0;
    const b = Number(parts[2]) || 0;
    const a = parts[3] !== undefined ? Math.round(Number(parts[3]) * 255) : 255;
    return [r, g, b, a];
  }
  // fallback: black
  return [0, 0, 0, 255];
}

function colorMatch(
  aR: number,
  aG: number,
  aB: number,
  aA: number,
  bR: number,
  bG: number,
  bB: number,
  bA: number,
  tol: number,
) {
  return (
    Math.abs(aR - bR) <= tol &&
    Math.abs(aG - bG) <= tol &&
    Math.abs(aB - bB) <= tol &&
    Math.abs(aA - bA) <= tol
  );
}

export function fillArea({ ctx, x, y, color, tolerance = 0 }: FillAreaArgs) {
  const canvas = ctx.canvas;
  const width = canvas.width;
  const height = canvas.height;
  if (x < 0 || x >= width || y < 0 || y >= height) return;

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const idx = (y * width + x) * 4;
  const targetR = data[idx];
  const targetG = data[idx + 1];
  const targetB = data[idx + 2];
  const targetA = data[idx + 3];

  const [fillR, fillG, fillB, fillA] = parseColor(color);

  // if target color is same as fill color (within tolerance), do nothing
  if (
    colorMatch(
      targetR,
      targetG,
      targetB,
      targetA,
      fillR,
      fillG,
      fillB,
      fillA,
      tolerance,
    )
  ) {
    return;
  }

  const stack: Array<[number, number]> = [];
  stack.push([x, y]);

  while (stack.length) {
    const [cx, cy] = stack.pop() as [number, number];
    let nx = cx;
    // move to left boundary
    while (nx >= 0) {
      const i = (cy * width + nx) * 4;
      if (
        !colorMatch(
          data[i],
          data[i + 1],
          data[i + 2],
          data[i + 3],
          targetR,
          targetG,
          targetB,
          targetA,
          tolerance,
        )
      )
        break;
      nx -= 1;
    }
    nx += 1;

    let reachUp = false;
    let reachDown = false;

    while (nx < width) {
      const i = (cy * width + nx) * 4;
      if (
        !colorMatch(
          data[i],
          data[i + 1],
          data[i + 2],
          data[i + 3],
          targetR,
          targetG,
          targetB,
          targetA,
          tolerance,
        )
      )
        break;
      // set pixel to fill color
      data[i] = fillR;
      data[i + 1] = fillG;
      data[i + 2] = fillB;
      data[i + 3] = fillA;

      // check pixel above
      if (cy > 0) {
        const iUp = ((cy - 1) * width + nx) * 4;
        if (
          colorMatch(
            data[iUp],
            data[iUp + 1],
            data[iUp + 2],
            data[iUp + 3],
            targetR,
            targetG,
            targetB,
            targetA,
            tolerance,
          )
        ) {
          if (!reachUp) {
            stack.push([nx, cy - 1]);
            reachUp = true;
          }
        } else {
          reachUp = false;
        }
      }

      // check pixel below
      if (cy < height - 1) {
        const iDown = ((cy + 1) * width + nx) * 4;
        if (
          colorMatch(
            data[iDown],
            data[iDown + 1],
            data[iDown + 2],
            data[iDown + 3],
            targetR,
            targetG,
            targetB,
            targetA,
            tolerance,
          )
        ) {
          if (!reachDown) {
            stack.push([nx, cy + 1]);
            reachDown = true;
          }
        } else {
          reachDown = false;
        }
      }

      nx += 1;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
