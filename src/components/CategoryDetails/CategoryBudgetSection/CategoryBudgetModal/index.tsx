import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Currency } from "../../../../domain/currency";
import Button from "../../../Button";
import Modal from "../../../Modal";
import BudgetForm from "./BudgetForm";
import CurrencyTab from "./CurrencyTab";
import {
  Budget,
  removeCurrencyBudget,
  updateBudgetForCurrency,
} from "./helper";

type Props = {
  opened: boolean;
  onClose: () => void;
  budget: Budget;
  onUpdate: (budget: Budget) => void;
};

export default function CategoryBudgetModal({
  onClose,
  opened,
  budget,
  onUpdate,
}: Props) {
  const [modified, setModified] = useState(false);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [placeholder, setPlaceholder] = useState<Budget>(budget);
  useEffect(() => {
    setPlaceholder(budget);
  }, [budget]);

  if (!opened) return null;

  const commitUpdateBudget = () => {
    onUpdate(placeholder);
  };

  const onBudgetChange = (value: number | undefined) => {
    setModified(true);
    const updatedPlaceholder = value
      ? updateBudgetForCurrency(placeholder, currency, value)
      : removeCurrencyBudget(placeholder, currency);
    setPlaceholder(updatedPlaceholder);
  };
  return (
    <Modal onClose={onClose} title="Configure category budget">
      <div className="flex items-stretch flex-col gap-2">
        <CurrencyTab currency={currency} onChange={setCurrency} />
        <BudgetForm
          budget={placeholder[currency]}
          currency={currency}
          onChange={onBudgetChange}
        />
        <div className="flex items-center gap-2 justify-end justify-self-end">
          <Button
            color="green"
            onClick={commitUpdateBudget}
            disabled={!modified}
            text="Update"
            icon={FaCheck}
          />
        </div>
      </div>
    </Modal>
  );
}
