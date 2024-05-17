import { format } from "date-fns";
import { Budget } from "../../../../domain/budget";
import { getCategoryColor } from "../../../../domain/category";
import { Currency } from "../../../../domain/currency";
import { CategoryWithId } from "../../../../domain/expenditure";
import { clamp } from "../../../../utils/numbers";
import { formatNumberAsAmount } from "../../../../utils/strings";
import PercentageBar from "../../../PercentageBar";

type Props = {
  category: CategoryWithId;
  budget: Budget;
  currency: Currency;
  used: number;
};

export default function BudgetStatus({
  category,
  currency,
  used,
  budget,
}: Props) {
  const { amount, effectiveSince } = budget;
  const percentage = (used / amount) * 100;
  return (
    <div className="flex flex-col items-stretch">
      <div className="flex items-center justify-between">
        <div className="flex justify-end items-end gap-2 text-xs">
          <span className="text-2xl">
            {formatNumberAsAmount(amount, currency)}
          </span>
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
      <span className="text-xs py-1">
        Since {format(effectiveSince, "dd/MM/yyyy")} <br />
        Updates <b>monthly</b>
      </span>
    </div>
  );
}
