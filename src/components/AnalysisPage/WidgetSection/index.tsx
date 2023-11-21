import { FaChartPie, FaDivide, FaPlus } from "react-icons/fa";
import { CategoryWithId, ExpenditureWithId } from "../../../domain/expenditure";
import {
  average,
  groupExpendituresByCategory,
  total,
} from "../../../domain/expenditure-statistics";
import WidgetPlaceholder from "../../Placeholders/WidgetPlaceholder";
import AmountWidget from "../../Widget/AmountWidget";
import Widget from "../../Widget";
import PercentageChart from "../../Chart/PercentageChart";

type Props = {
  loading?: boolean;
  categories: CategoryWithId[];
  expenditures: ExpenditureWithId[];
};

const getChartLabelFromExpenditures = (
  categories: CategoryWithId[],
  expenditures: ExpenditureWithId[]
): { value: number; color: string }[] => {
  const totalByCategory = groupExpendituresByCategory(
    categories,
    expenditures,
    total
  );
  return Object.entries(totalByCategory).map(([catId, total]) => ({
    value: total,
    color: categories.find((cat) => cat.id === catId)?.color ?? "gray",
  }));
};

export default function WidgetSection({
  loading,
  expenditures,
  categories,
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
  const totalExpenditures = total(expenditures);
  const chartValues = getChartLabelFromExpenditures(categories, expenditures);
  return (
    <div className="grid grid-cols-6 gap-2">
      <AmountWidget
        amount={totalExpenditures}
        className="col-span-3"
        icon={FaPlus}
        title="Total"
      />
      <AmountWidget
        amount={average(expenditures)}
        className="col-span-3"
        icon={FaDivide}
        title="Average"
      />
      <Widget icon={FaChartPie} title="Distribution" className="col-span-2">
        <PercentageChart values={chartValues} total={totalExpenditures} />
      </Widget>
    </div>
  );
}
