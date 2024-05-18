import { Currency } from "../domain/currency";

export const containsSubstring = (mainString: string, searchString: string) => {
  return mainString.toLowerCase().includes(searchString.toLowerCase());
};

export const equalCaseInsensitive = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase();

export const formatNumberAsAmount = (v: number, currency: Currency) => {
  const formattedNumber = new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    minimumIntegerDigits: 1,
  }).format(v);
  if (currency === "EUR" || currency === "GBP") {
    return `${formattedNumber} ${currency === "EUR" ? "€" : "£"}`;
  }
  return `$ ${formattedNumber}`;
};
