export const feetInchesToCm = (feet: number, inches: number = 0): number => {
  // return Math.round((feet * 30.48) + (inches * 2.54));
  return parseFloat(((feet * 30.48) + (inches * 2.54)).toFixed(2))
};

export const lbsToKg = (lbs: number): number => {
  return Math.round(lbs * 0.453592);
};
