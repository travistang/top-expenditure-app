export type Updater<T> = <K extends keyof T>(key: K) => (value: T[K]) => void;
export type CreateUpdater = <T>(obj: T, setter: (t: T) => void) => Updater<T>;
export const createUpdater: CreateUpdater =
  <T>(obj: T, setter: (t: T) => void) =>
  <K extends keyof T>(key: K) =>
  (value: T[K]) => {
    setter({ ...obj, [key]: value });
  };
