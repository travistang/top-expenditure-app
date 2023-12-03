import { FaChartPie } from "react-icons/fa";
import { getCategoryColor } from "../../../domain/category";
import { CategoryWithId, ExpenditureWithId } from "../../../domain/expenditure";
import {
  groupExpendituresByCategory,
  mapRecordValue,
  total,
} from "../../../domain/expenditure-statistics";
import PercentageChart from "../../Chart/PercentageChart";
import Widget from "../../Widget";

type Props = {
  categories: CategoryWithId[];
  expenditures: ExpenditureWithId[];
};
const getChartLabelFromExpenditures = (
  categories: CategoryWithId[],
  expenditures: ExpenditureWithId[]
): { value: number; color: string }[] => {
  return Object.values(
    mapRecordValue(
      groupExpendituresByCategory(categories, expenditures),
      ({ category, expenditures }) => ({
        value: total(expenditures),
        color: getCategoryColor(category),
      })
    )
  );
};

export default function CategoryDistributionChartWidget({
  categories,
  expenditures,
}: Props) {
  const chartValues = getChartLabelFromExpenditures(categories, expenditures);
  const totalExpenditures = chartValues.reduce(
    (total, { value }) => total + value,
    0
  );
  return (
    <Widget icon={FaChartPie} title="Distribution" className="col-span-2 h-min">
      <div className="flex items-center justify-center">
        <PercentageChart
          className="h-24 w-24"
          values={chartValues}
          total={totalExpenditures}
        />
      </div>
    </Widget>
  );
}
