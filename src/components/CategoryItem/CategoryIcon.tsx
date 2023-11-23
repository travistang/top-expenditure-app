import classNames from "classnames";
import * as Fa from "react-icons/fa";
import { CategoryWithId } from "../../domain/expenditure";
import { isBright } from "../../utils/colors";
import { useRef } from "react";
import { getCategoryColor } from "../../domain/category";

type Props = {
  className?: string;
  category: CategoryWithId;
};
export default function CategoryIcon({ category, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { icon } = category;
  const color = getCategoryColor(category);
  const Icon = Fa[icon as keyof typeof Fa] ?? Fa.FaTag;
  const isBrightColor = isBright(color);
  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: color }}
      className={classNames(
        "p-1 aspect-square rounded-full flex items-center justify-center",
        className
      )}
    >
      <Icon
        className={classNames(
          isBrightColor ? "text-gray-800" : "text-gray-200"
        )}
      />
    </div>
  );
}
