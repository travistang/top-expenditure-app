import classNames from "classnames";
import { CategoryWithId } from "../../domain/expenditure";
import CategoryIcon from "./CategoryIcon";

type Props = {
  category: CategoryWithId;
  className?: string;
  onClick?: () => void;
};

export default function CategoryItem({ onClick, category, className }: Props) {
  const { name } = category;
  return (
    <div
      onClick={onClick}
      className={classNames(
        "h-16 flex items-center px-2 py-1 flex-shrink-0 cursor-pointer hover:bg-gray-500 active:bg-gray-700 gap-2 rounded-md",
        className
      )}
    >
      <CategoryIcon category={category} className="h-full" />
      {name}
    </div>
  );
}
