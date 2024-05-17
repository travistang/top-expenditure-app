import { FaDivide, FaPlus } from "react-icons/fa";
import {
  CategoryWithId,
  ExpenditureWithId,
  groupExpendituresByCurrency,
} from "../../../domain/expenditure";
import { average, total } from "../../../domain/expenditure-statistics";
import WidgetPlaceholder from "../../Placeholders/WidgetPlaceholder";
import AmountWidget from "../../Widget/AmountWidget";

import { isSameMonth } from "date-fns";
import { useState } from "react";
import { Currency } from "../../../domain/currency";
import CurrencyPicker from "../../CurrencyPicker";
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
  const [currency, setCurrency] = useState<Currency>("EUR");
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

  const expendituresByCurrency =
    groupExpendituresByCurrency(expendituresOfMonth);
  const expendituresConsidered = expendituresByCurrency[currency] ?? [];
  return (
    <div className="grid grid-cols-6 gap-2">
      <CurrencyPicker
        currency={currency}
        onChange={setCurrency}
        className="col-span-full h-12 bg-gray-500/50"
      />
      <AmountWidget
        currency={currency}
        amount={total(expendituresConsidered)}
        className="col-span-3"
        icon={FaPlus}
        title="Total"
      />
      <AmountWidget
        currency={currency}
        amount={average(expendituresConsidered)}
        className="col-span-3"
        icon={FaDivide}
        title="Average"
      />
      <ExpenditureByCategoryWidget
        categories={categories}
        currency={currency}
        expenditures={expendituresConsidered}
      />
      <CategoryDistributionChartWidget
        expenditures={expendituresConsidered}
        categories={categories}
      />
      <ExpenditureTrendBarWidget
        onSelectMonth={onMonthChange}
        selectedMonth={month}
        currency={currency}
        categories={categories}
        expenditures={expendituresConsidered}
      />
    </div>
  );
}
