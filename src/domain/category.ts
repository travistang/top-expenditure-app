import * as Fa from "react-icons/fa";
import { CategoryWithId } from "./expenditure";
import expenditureSearcher from "./expenditure-search";
import { total } from "./expenditure-statistics";

export const getCategoryColor = (category?: CategoryWithId) =>
  category?.color ?? "#808080";

export const getCategoryIcon = (category: CategoryWithId) => {
  const iconKey = (category?.icon ?? "FaQuestion") as keyof typeof Fa;
  return Fa[iconKey] ?? Fa.FaTag;
};

export const getCategoryUsage = async (category: CategoryWithId) => {
  const expenditures = await expenditureSearcher.searchExpenditures({
    category: category.id,
  });

  return total(expenditures);
};

export const getCategoryBudgetUsage = async (category: CategoryWithId) => {
  const { budget } = category;
  if (!budget) return null;

  const usage = await getCategoryUsage(category);
  return usage / budget.amount;
};
