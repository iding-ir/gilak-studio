export type State = {
  radiusCount: number;
  gridSize: number;
  borderWidth: number;
  hoverColor: string;
  selectedColor: string;
};

export const initialState: State = {
  radiusCount: 5,
  gridSize: 15,
  borderWidth: 20,
  hoverColor: "transparent",
  selectedColor: "transparent",
};
