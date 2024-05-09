import { getCategoryBudgetUsage } from "../../../../domain/category";
import { CategoryWithId } from "../../../../domain/expenditure";
import useFetch from "../../../../hooks/useFetch";

type Props = {
  category: CategoryWithId;
};
export default function CategoryUsageProgressBarBackground({
  category,
}: Props) {
  const { result: budgetUsage } = useFetch(category, getCategoryBudgetUsage);

  return (
    <span
      className="absolute top-0 left-0 h-full -z-10 opacity-30 w-full transition-[max-width] duration-300"
      style={{
        maxWidth: budgetUsage ? `${budgetUsage * 100}%` : "0",
        backgroundColor: category.color,
      }}
    />
  );
}
