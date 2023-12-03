import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { CategoryWithId } from "../../../../domain/expenditure";
import { formatNumberAsAmount } from "../../../../utils/strings";
import AmountInput from "../../../AmountInput";
import Button from "../../../Button";
import Modal from "../../../Modal";

type Budget = CategoryWithId["budget"];
type Props = {
  opened: boolean;
  onClose: () => void;
  budget?: Budget;
  onUpdate: (budget: Budget) => void;
};
export default function CategoryBudgetModal({
  onClose,
  opened,
  budget,
  onUpdate,
}: Props) {
  const [placeholder, setPlaceholder] = useState<number | undefined>(
    budget?.amount
  );
  useEffect(() => {
    setPlaceholder(budget?.amount);
  }, [budget]);

  if (!opened) return null;

  const commitUpdateBudget = () => {
    if (placeholder === undefined) {
      return onUpdate(undefined);
    }
    onUpdate({ amount: placeholder, effectiveSince: Date.now() });
  };
  return (
    <Modal onClose={onClose}>
      <div className="flex items-stretch flex-col gap-2">
        <AmountInput
          nullable
          amount={placeholder}
          formatter={formatNumberAsAmount}
          onChange={setPlaceholder}
          className="h-14"
          label="Budget on this category"
        />
        <div className="flex items-center justify-between">
          {budget?.effectiveSince && (
            <span className="text-xs">
              Last updated on {format(budget.effectiveSince, "dd/MM/yyyy")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 justify-end justify-self-end">
          <Button
            onClick={() => onUpdate(undefined)}
            color="red"
            text="Remove"
            icon={FaTrash}
          />
          <Button
            color="green"
            onClick={commitUpdateBudget}
            disabled={budget?.amount === placeholder}
            text="Update"
            icon={FaCheck}
          />
        </div>
      </div>
    </Modal>
  );
}
