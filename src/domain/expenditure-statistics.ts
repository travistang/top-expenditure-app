import { Expenditure } from "./expenditure";

export type Metric = (_: Expenditure[]) => number;
export const total: Metric = (expenditures) => {
  return expenditures.reduce((total, exp) => total + exp.amount, 0);
};

export const average: Metric = (exps) =>
  exps.length === 0 ? 0 : total(exps) / exps.length;

export const maxAmount: Metric = (exps) =>
  exps.reduce((max, exp) => (max < exp.amount ? exp.amount : max), 0);

export const minAmount: Metric = (exps) =>
  exps.reduce((min, exp) => (min > exp.amount ? exp.amount : min), 0);
