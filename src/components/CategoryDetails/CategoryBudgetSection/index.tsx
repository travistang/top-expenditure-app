import classNames from "classnames";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaChartLine } from "react-icons/fa";
import {
  CategoryWithBudget,
  CategoryWithId,
  ExpenditureWithId,
  expenditureDatabase,
} from "../../../domain/expenditure";
import { total } from "../../../domain/expenditure-statistics";
import { createUpdater } from "../../../utils/objects";
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
        {!budget && (
          <span
            onClick={() => setModalOpened(true)}
            className="text-xs py-4 flex items-center justify-center cursor-pointer"
          >
            No budget is set for this category. Click to setup
          </span>
        )}
        {budget && (
          <BudgetStatus
            category={category as CategoryWithBudget}
            used={total(expenditures)}
            onEditBudget={() => setModalOpened(true)}
          />
        )}
      </Widget>
    </>
  );
}
