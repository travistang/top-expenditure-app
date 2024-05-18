import classNames from "classnames";
import { getCategoryColor, getCategoryIcon } from "../../../../domain/category";
import { Currency } from "../../../../domain/currency";
import { CategoryWithId } from "../../../../domain/expenditure";
import SimpleInputItem from "../SimpleInputItem";
import CategoryUsageProgressBarBackground from "./CategoryUsageProgressBarBackground";

type Props = {
  category: CategoryWithId;
  selected?: boolean;
  className?: string;
  currency: Currency;
  onClick: () => void;
};
export default function SimpleCategoryItem({
  onClick,
  category,
  selected,
  currency,
  className,
}: Props) {
  const color = getCategoryColor(category);
  const Icon = getCategoryIcon(category);

  return (
    <SimpleInputItem
      onClick={onClick}
      style={{
        backgroundColor: selected ? color : undefined,
        color: selected ? "#fff" : color,
        borderColor: color,
      }}
      className={classNames(
        "relative p-4 text-center border-2 overflow-hidden whitespace-nowrap overflow-ellipsis",
        className
      )}
    >
      <CategoryUsageProgressBarBackground
        category={category}
        currency={currency}
      />
      <Icon className="text-xl w-8 flex-shrink-0" />
      {category.name}
    </SimpleInputItem>
  );
}
