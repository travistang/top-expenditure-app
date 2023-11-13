export const clamp = (from: number, value: number, to: number) =>
  Math.max(from, Math.min(value, to));
