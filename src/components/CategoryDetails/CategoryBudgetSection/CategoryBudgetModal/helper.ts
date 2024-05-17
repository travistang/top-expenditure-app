import { Currency } from "../../../../domain/currency";
import { CategoryWithId } from "../../../../domain/expenditure";

export type Budget = CategoryWithId["budget"];

export const updateBudgetForCurrency = (
  budget: Budget,
  currency: Currency,
  amount: number
): Budget => {
  return {
    ...budget,
    [currency]: {
      amount,
      effectiveSince: Date.now(),
    },
  };
};

export const removeCurrencyBudget = (
  budget: Budget,
  currency: Currency
): Budget => {
  const { [currency]: _, ...rest } = budget;
  return rest;
};
