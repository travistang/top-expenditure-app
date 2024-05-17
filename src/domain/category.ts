import { startOfMonth } from "date-fns";
import * as Fa from "react-icons/fa";
import { ByCurrency, mapByCurrency } from "./currency";
import { CategoryWithId, groupExpendituresByCurrency } from "./expenditure";
import expenditureSearcher from "./expenditure-search";
import { total } from "./expenditure-statistics";

export const getCategoryColor = (category?: CategoryWithId) =>
  category?.color ?? "#808080";

export const getCategoryIcon = (category: CategoryWithId) => {
  const iconKey = (category?.icon ?? "FaQuestion") as keyof typeof Fa;
  return Fa[iconKey] ?? Fa.FaTag;
};

export const getCategoryRecords = async (category: CategoryWithId) => {
  const expenditures = await expenditureSearcher.searchExpenditures({
    category: category.id,
    fromDate: startOfMonth(Date.now()).getTime(),
  });
  return expenditures;
};

export const getCategoryUsage = async (
  category: CategoryWithId
): Promise<ByCurrency<number>> => {
  const { budget } = category;
  const categoryRecords = await getCategoryRecords(category);
  return mapByCurrency(
    groupExpendituresByCurrency(categoryRecords),
    (currency, records) => {
      const budgetForCurrency = budget?.[currency]?.amount;
      return budgetForCurrency ? total(records) / budgetForCurrency : 0;
    }
  );
};

export const hasNoBudget = (category: CategoryWithId) => {
  return Object.keys(category.budget).length === 0;
};
