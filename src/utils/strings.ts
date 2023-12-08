export const containsSubstring = (mainString: string, searchString: string) => {
  return mainString.toLowerCase().includes(searchString.toLowerCase());
};

export const equalCaseInsensitive = (a: string, b: string) =>
  a.toLowerCase() === b.toLowerCase();

export const formatNumberAsAmount = (v: number) => {
  return `${new Intl.NumberFormat("de-DE", {
    currency: "EUR",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(v)} €`;
};
