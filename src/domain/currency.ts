export const CURRENCIES = ["EUR", "GBP", "HKD"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type ByCurrency<T> = Partial<Record<Currency, T>>;

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  EUR: "€",
  GBP: "£",
  HKD: "HK$",
};

export const CURRENCY_NAMES: Record<Currency, string> = {
  EUR: `EUR(€)`,
  GBP: `GBP(£)`,
  HKD: `HKD($)`,
};

export const mapByCurrency = <T, U>(
  byCurrency: ByCurrency<T>,
  mapFunc: (currency: Currency, t: T) => U
): ByCurrency<U> => {
  return Object.fromEntries(
    Object.entries(byCurrency).map(([currency, value]) => [
      currency,
      mapFunc(currency as Currency, value as T),
    ])
  ) as ByCurrency<U>;
};
