import classNames from "classnames";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaChartLine, FaPen } from "react-icons/fa";
import { hasNoBudget } from "../../../domain/category";
import { Currency, mapByCurrency } from "../../../domain/currency";
import {
  CategoryWithId,
  ExpenditureWithId,
  expenditureDatabase,
  groupExpendituresByCurrency,
} from "../../../domain/expenditure";
import { total } from "../../../domain/expenditure-statistics";
import { createUpdater } from "../../../utils/objects";
import Button from "../../Button";
import Widget from "../../Widget";
import BudgetStatus from "./BudgetStatus";
import CategoryBudgetModal from "./CategoryBudgetModal";

type Props = {
  category: CategoryWithId;
  expenditures: ExpenditureWithId[];
  className?: string;
  onUpdate?: () => void;
};
export default function CategoryBudgetSection({
  onUpdate,
  expenditures,
  category,
  className,
}: Props) {
  const [modalOpened, setModalOpened] = useState(false);
  const { budget } = category;
  const categoryUpdateFunc = (data: Partial<CategoryWithId>) => {
    expenditureDatabase
      .updateCategory(category.id, data)
      .then(() => setModalOpened(false))
      .then(() => toast.success("Budget updated"))
      .then(onUpdate)
      .catch(() => toast.error("Failed to update budget"));
  };
  const updater = createUpdater(category, categoryUpdateFunc);
  const updateBudget = (budget: CategoryWithId["budget"]) => {
    updater("budget")(budget);
    if (!budget) {
      setModalOpened(false);
      return;
    }
  };

  const totalExpendituresByCurrency = mapByCurrency(
    groupExpendituresByCurrency(expenditures),
    (_, records) => total(records)
  );
  return (
    <>
      <CategoryBudgetModal
        onUpdate={updateBudget}
        budget={budget}
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
      <Widget
        title="Budget"
        className={classNames("flex-shrink-0", className)}
        icon={FaChartLine}
      >
        {hasNoBudget(category) ? (
          <span
            onClick={() => setModalOpened(true)}
            className="text-xs py-4 flex items-center justify-center cursor-pointer"
          >
            No budget is set for this category. Click to setup
          </span>
        ) : (
          <div className="flex flex-col items-stretch gap-4">
            {Object.entries(budget).map(([currency, budget]) => (
              <BudgetStatus
                key={currency}
                budget={budget}
                currency={currency as Currency}
                category={category}
                used={totalExpendituresByCurrency[currency as Currency] ?? 0}
              />
            ))}
            <Button
              onClick={() => setModalOpened(true)}
              text="Edit"
              icon={FaPen}
              className="text-xs self-end"
            />
          </div>
        )}
      </Widget>
    </>
  );
}
