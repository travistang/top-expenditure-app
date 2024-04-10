import classNames from "classnames";
import { useRef } from "react";
import * as Fa from "react-icons/fa";
import { getCategoryColor } from "../../domain/category";
import { CategoryWithId } from "../../domain/expenditure";
import { isBright } from "../../utils/colors";

type Props = {
  className?: string;
  category?: CategoryWithId;
};
export default function CategoryIcon({ category, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const color = getCategoryColor(category);
  const iconKey = (category?.icon ?? "FaQuestion") as keyof typeof Fa;
  const Icon = Fa[iconKey] ?? Fa.FaTag;
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
