export const zoomLevels = [10, 25, 50, 75, 100, 125, 150, 175, 200] as const;

export type Zoom = (typeof zoomLevels)[number];
