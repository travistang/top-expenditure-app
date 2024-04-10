import classNames from "classnames";
import { getCategoryColor, getCategoryIcon } from "../../../domain/category";
import { CategoryWithId } from "../../../domain/expenditure";
import SimpleInputItem from "./SimpleInputItem";

type Props = {
  category: CategoryWithId;
  selected?: boolean;
  className?: string;
  onClick: () => void;
};
export default function SimpleCategoryItem({
  onClick,
  category,
  selected,
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
      className={classNames("p-4 text-center border-2", className)}
    >
      <Icon className="text-xl" />
      {category.name}
    </SimpleInputItem>
  );
}
