export const range = (n: number) =>
  Array(n)
    .fill(0)
    .map((_, i) => i);

export const toggle = <T>(
  arr: T[],
  val: T,
  equalFn: (a: T, b: T) => boolean = (a, b) => a === b
): T[] => {
  const valIndex = arr.findIndex((v) => equalFn(v, val));
  if (valIndex > -1) {
    const res = [...arr];
    res.splice(valIndex, 1);
    return res;
  } else {
    return [...arr, val];
  }
};
