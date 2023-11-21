import classNames from "classnames";
import * as Fa from "react-icons/fa";
import { CategoryWithId } from "../../domain/expenditure";

type Props = {
  category: CategoryWithId;
  className?: string;
  onClick?: () => void;
};

export default function CategoryItem({ onClick, category, className }: Props) {
  const { name, icon, color } = category;
  const Icon = Fa[icon as unknown as keyof typeof Fa] ?? Fa.FaTag;
  return (
    <div
      onClick={onClick}
      className={classNames(
        "h-16 flex items-center px-2 py-1 flex-shrink-0 cursor-pointer hover:bg-gray-500 active:bg-gray-700 gap-2 rounded-md",
        className
      )}
      style={{ backgroundColor: color }}
    >
      <div className="h-full aspect-square flex items-center justify-center rounded-full bg-gray-300">
        <Icon className="dark:text-gray-700" />
      </div>
      {name}
    </div>
  );
}
