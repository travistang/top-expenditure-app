import * as Fa from "react-icons/fa";
import { CategoryWithId } from "./expenditure";

export const getCategoryColor = (category?: CategoryWithId) =>
  category?.color ?? "#808080";

export const getCategoryIcon = (category: CategoryWithId) => {
  const iconKey = (category?.icon ?? "FaQuestion") as keyof typeof Fa;
  return Fa[iconKey] ?? Fa.FaTag;
};
