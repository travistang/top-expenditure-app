import { getCategoryUsage } from "../../../../domain/category";
import { Currency } from "../../../../domain/currency";
import { CategoryWithId } from "../../../../domain/expenditure";
import useFetch from "../../../../hooks/useFetch";

type Props = {
  category: CategoryWithId;
  currency: Currency;
};
export default function CategoryUsageProgressBarBackground({
  category,
  currency,
}: Props) {
  const { result: budgetUsage } = useFetch(category, getCategoryUsage);
  const budgetUsageByCategory = budgetUsage?.[currency];
  const progressBarWidth = budgetUsageByCategory
    ? `${Math.min(100, budgetUsageByCategory * 100)}%`
    : "0";
  return (
    <span
      className="absolute top-0 left-0 h-full -z-10 opacity-30 w-full transition-[max-width] duration-300"
      style={{
        maxWidth: progressBarWidth,
        backgroundColor: category.color,
      }}
    />
  );
}
