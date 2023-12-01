import classNames from "classnames";
import { CategoryWithId } from "../../domain/expenditure";
import CategoryIcon from "./CategoryIcon";

type Props = {
  category?: CategoryWithId;
  className?: string;
  size?: "normal" | "small";
  onClick?: () => void;
};

export default function CategoryItem({
  size = "normal",
  onClick,
  category,
  className,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex items-center px-2 py-1 flex-shrink-0 cursor-pointer hover:bg-gray-500 active:bg-gray-700 gap-2 rounded-md",
        {
          "text-xs": size === "small",
          "h-16": size === "normal",
        },
        className
      )}
    >
      <CategoryIcon
        category={category}
        className={size === "normal" ? "h-full" : "h-6"}
      />
      {category?.name ?? "--"}
    </div>
  );
}
