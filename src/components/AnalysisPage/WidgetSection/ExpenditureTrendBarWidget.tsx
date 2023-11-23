import {
  addMonths,
  format,
  getMonth,
  isSameMonth,
  setMonth,
  startOfYear,
} from "date-fns";
import { CategoryWithId, ExpenditureWithId } from "../../../domain/expenditure";
import {
  groupExpendituresByCategory,
  total,
} from "../../../domain/expenditure-statistics";
import Widget from "../../Widget";
import { FaChartBar } from "react-icons/fa";
import BarChart, { BarChartData } from "../../BarChart";
import { getCategoryColor } from "../../../domain/category";
import { range } from "../../../utils/array";

const computeBarChartData = (
  categories: CategoryWithId[],
  expenditures: ExpenditureWithId[],
  aroundDate = Date.now()
): BarChartData[] => {
  const yearStart = startOfYear(aroundDate);
  const timestamps = range(12).map((dm) => addMonths(yearStart, dm).getTime());
  const data: BarChartData[] = timestamps.map((timestamp) => {
    const expendituresOfMonth = expenditures.filter((exp) =>
      isSameMonth(exp.date, timestamp)
    );
    const expenditureByCategory = groupExpendituresByCategory(
      categories,
      expendituresOfMonth,
      true
    );

    return {
      label: format(timestamp, "MMM"),
      values: Object.values(expenditureByCategory).map(
        ({ category, expenditures }) => ({
          color: getCategoryColor(category),
          value: total(expenditures),
        })
      ),
    };
  });
  return data;
};

type Props = {
  categories: CategoryWithId[];
  expenditures: ExpenditureWithId[];
  selectedMonth: number;
  onSelectMonth: (month: number) => void;
};
export default function ExpenditureTrendBarWidget({
  expenditures,
  categories,
  selectedMonth,
  onSelectMonth,
}: Props) {
  const data = computeBarChartData(categories, expenditures);
  const onSelectBarIndex = (monthId: number) => {
    onSelectMonth(setMonth(selectedMonth, monthId).getTime());
  };

  return (
    <Widget icon={FaChartBar} title="Trend" className="col-span-full">
      <BarChart
        className="pb-2"
        onSelectBar={onSelectBarIndex}
        selectedBarIndex={getMonth(selectedMonth)}
        data={data}
      />
    </Widget>
  );
}
