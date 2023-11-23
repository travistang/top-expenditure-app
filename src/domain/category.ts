import { CategoryWithId } from "./expenditure";

export const getCategoryColor = (cat: CategoryWithId) => cat.color ?? "#808080";
