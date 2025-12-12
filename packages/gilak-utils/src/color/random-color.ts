export const randomColor = () => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8B739",
    "#52B788",
    "#E63946",
    "#A8DADC",
    "#457B9D",
    "#F1FAEE",
    "#E76F51",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
