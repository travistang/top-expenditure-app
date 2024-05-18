import { format } from "date-fns";
import { Budget } from "../../../../domain/budget";
import { Currency } from "../../../../domain/currency";
import AmountInput from "../../../AmountInput";

type Props = {
  budget?: Budget;
  currency: Currency;
  onChange: (value: number | undefined) => void;
};
export default function BudgetForm({ currency, budget, onChange }: Props) {
  return (
    <>
      <AmountInput
        nullable
        amount={budget?.amount}
        currency={currency}
        onChange={onChange}
        className="h-14"
        label={`Budget for category in ${currency}`}
      />
      <div className="flex items-center justify-between">
        {budget?.effectiveSince && (
          <span className="text-xs">
            Last updated on {format(budget.effectiveSince, "dd/MM/yyyy")}
          </span>
        )}
      </div>
    </>
  );
}
