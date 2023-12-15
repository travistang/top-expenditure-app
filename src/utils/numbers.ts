export const clamp = (from: number, value: number, to: number) =>
  Math.max(from, Math.min(value, to));

export const sum = (...nums: number[]) =>
  nums.reduce((total, n) => total + n, 0);
