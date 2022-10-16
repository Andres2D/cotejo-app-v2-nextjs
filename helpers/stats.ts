
export const calculateAVG = (values: number[]) => {
  const sum = values.reduce((a,b) => a+b, 0);
  return Math.floor(sum / values.length);
};
