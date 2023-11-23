import { format } from "date-fns";
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

export const mapRecordValue = <K extends string | number | symbol, T, U>(
  record: Record<K, T>,
  mapFn: (t: T) => U
): Record<K, U> => {
  const entries = Object.entries<T>(record).map(([key, value]) => [
    key,
    mapFn(value),
  ]);
  return Object.fromEntries(entries);
};

export const reduceRecord = <K extends string | number | symbol, T, U>(
  record: Record<K, T>,
  reduceFn: (partial: U, t: T) => U,
  initial: U
) => {
  return Object.values<T>(record).reduce(reduceFn, initial);
};

export const filterRecord = <K extends string | number | symbol, T>(
  record: Record<K, T>,
  filterFn: (t: T) => boolean
) => {
  const entries = Object.entries<T>(record).filter(([, value]) =>
    filterFn(value)
  );
  return Object.fromEntries(entries);
};
export type ExpenditureByCategoryGroup = Record<
  string,
  {
    category: CategoryWithId;
    expenditures: ExpenditureWithId[];
  }
>;

export const groupExpendituresByCategory = (
  categories: CategoryWithId[],
  expenditures: ExpenditureWithId[],
  omitEmptyCategory = false
): ExpenditureByCategoryGroup => {
  const groups = categories.reduce((result, cat) => {
    const expendituresUnderCategory = expenditures.filter(
      (exp) => exp.category === cat.id
    );
    return {
      ...result,
      [cat.id]: {
        category: cat,
        expenditures: expendituresUnderCategory,
      },
    };
  }, {} as ExpenditureByCategoryGroup);

  if (!omitEmptyCategory) return groups;
  return filterRecord(groups, ({ expenditures }) => expenditures.length > 0);
};

export type GroupTimeInterval = "daily" | "monthly" | "yearly";
export const FormatByInterval: Record<GroupTimeInterval, string> = {
  daily: "dd/MM/yyyy",
  monthly: "MM/yyyy",
  yearly: "yyyy",
};

export const groupExpendituresByTimeRange = (
  expenditures: ExpenditureWithId[],
  timeRange: "daily" | "monthly" | "yearly"
): Record<string, ExpenditureWithId[]> => {
  return expenditures.reduce((groups, exp) => {
    const label = format(exp.date, FormatByInterval[timeRange]);
    return {
      ...groups,
      [label]: [...(groups[label] ?? []), exp],
    };
  }, {} as Record<string, ExpenditureWithId[]>);
};
