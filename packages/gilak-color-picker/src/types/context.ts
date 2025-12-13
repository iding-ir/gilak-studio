export type ColorPickerContextType = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  toggleEnabled: () => void;
  magnifierRadius: number;
  setMagnifierRadius: (value: number) => void;
  gridSize: number;
  setGridSize: (value: number) => void;
  borderWidth: number;
  setBorderWidth: (value: number) => void;
  hoverColor: string;
  setHoverColor: (value: string) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
};
