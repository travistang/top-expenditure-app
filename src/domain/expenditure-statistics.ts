import { CategoryWithId, Expenditure, ExpenditureWithId } from "./expenditure";

export type Metric = (expenditures: Expenditure[]) => number;

export const total: Metric = (exps) =>
  exps.reduce((total, exp) => total + exp.amount, 0);

export const average: Metric = (exps) => {
  if (exps.length === 0) return 0;
  return total(exps) / exps.length;
};

export const max: Metric = (exps) =>
  exps.reduce((max, exp) => (max < exp.amount ? exp.amount : max), 0);

export const min: Metric = (exps) =>
  exps.reduce((min, exp) => (min > exp.amount ? exp.amount : min), 0);

export const groupExpendituresByCategory = <T = ExpenditureWithId[]>(
  categories: CategoryWithId[],
  expenditures: ExpenditureWithId[],
  mapFunc: (expenditures: ExpenditureWithId[]) => T = (exp) => exp as T
): Record<string, T> => {
  return categories.reduce<Record<string, T>>((result, cat) => {
    const expendituresUnderCategory = expenditures.filter(
      (exp) => exp.category === cat.id
    );
    return {
      ...result,
      [cat.id]: mapFunc(expendituresUnderCategory),
    };
  }, {} as Record<string, T>);
};
