import { format } from "date-fns";
import { FaPen } from "react-icons/fa";
import { getCategoryColor } from "../../../../domain/category";
import { CategoryWithBudget } from "../../../../domain/expenditure";
import { clamp } from "../../../../utils/numbers";
import Button from "../../../Button";
import PercentageBar from "../../../PercentageBar";

type Props = {
  category: CategoryWithBudget;
  used: number;
  onEditBudget: () => void;
};

export default function BudgetStatus({ onEditBudget, category, used }: Props) {
  const { amount, effectiveSince } = category.budget;
  const percentage = (used / amount) * 100;
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex items-center justify-between">
        <div className="flex justify-end items-end gap-2 text-xs">
          <span className="text-2xl">{amount.toFixed(0)}€</span>
        </div>
        <div className="flex items-end gap-2 justify-end">
          <span className="text-2xl">{percentage.toFixed(0)}%</span>
          <span className="text-sm">Used</span>
        </div>
      </div>
      <PercentageBar
        data={[
          {
            value: clamp(0, percentage, 100),
            id: category.id,
            color: getCategoryColor(category),
          },
        ]}
        className="h-3"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs py-1">
          Since {format(effectiveSince, "dd/MM/yyyy")} <br />
          Updates <b>monthly</b>
        </span>
        <Button
          onClick={onEditBudget}
          text="Edit"
          icon={FaPen}
          className="text-xs"
        />
      </div>
    </div>
  );
}
