import { FaDivide, FaPlus } from "react-icons/fa";
import { CategoryWithId, ExpenditureWithId } from "../../../domain/expenditure";
import { average, total } from "../../../domain/expenditure-statistics";
import WidgetPlaceholder from "../../Placeholders/WidgetPlaceholder";
import AmountWidget from "../../Widget/AmountWidget";

import { isSameMonth } from "date-fns";
import CategoryDistributionChartWidget from "./CategoryDistributionChartWidget";
import ExpenditureByCategoryWidget from "./ExpenditureByCategoryWidget";
import ExpenditureTrendBarWidget from "./ExpenditureTrendBarWidget";

type Props = {
  loading?: boolean;
  categories: CategoryWithId[];
  expenditures: ExpenditureWithId[];
  month: number;
  onMonthChange: (month: number) => void;
};

export default function WidgetSection({
  loading,
  expenditures,
  categories,
  month,
  onMonthChange,
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-6 gap-2">
        <WidgetPlaceholder className="col-span-3" />
        <WidgetPlaceholder className="col-span-3" />
        <WidgetPlaceholder className="col-span-3" />
      </div>
    );
  }

  const expendituresOfMonth = expenditures.filter((exp) =>
    isSameMonth(month, exp.date)
  );

  return (
    <div className="grid grid-cols-6 gap-2">
      <AmountWidget
        amount={total(expendituresOfMonth)}
        className="col-span-3"
        icon={FaPlus}
        title="Total"
      />
      <AmountWidget
        amount={average(expendituresOfMonth)}
        className="col-span-3"
        icon={FaDivide}
        title="Average"
      />
      <CategoryDistributionChartWidget
        expenditures={expendituresOfMonth}
        categories={categories}
      />
      <ExpenditureByCategoryWidget
        categories={categories}
        expenditures={expendituresOfMonth}
      />
      <ExpenditureTrendBarWidget
        onSelectMonth={onMonthChange}
        selectedMonth={month}
        categories={categories}
        expenditures={expenditures}
      />
    </div>
  );
}
