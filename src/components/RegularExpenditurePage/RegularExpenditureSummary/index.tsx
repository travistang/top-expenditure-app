import classNames from "classnames";
import { RegularExpenditureWithId } from "../../../domain/expenditure";
import { IncomeWithId } from "../../../domain/income";
import Widget from "../../Widget";
import { FaChartPie, FaFire, FaMoneyBill } from "react-icons/fa";
import { monthlyAverageFromRepeat } from "../../../domain/repeat";
import { formatNumberAsAmount } from "../../../utils/strings";
import { sum } from "../../../utils/numbers";
import DigitSection from "./DigitSection";

type Props = {
  incomes: IncomeWithId[];
  expenditures: RegularExpenditureWithId[];
  className?: string;
};
export default function RegularExpenditureSummary({
  incomes,
  expenditures,
  className,
}: Props) {
  const hasRecord = !!incomes.length || !!expenditures.length;
  if (!hasRecord) return null;
  const monthlyExpenditures = sum(
    ...expenditures.map((e) => monthlyAverageFromRepeat(e.amount, e.repeat))
  );
  const monthlyIncomes = sum(
    ...incomes.map((i) => monthlyAverageFromRepeat(i.amount, i.repeat))
  );

  return (
    <Widget
      sensitive
      icon={FaChartPie}
      title="Expenditure summary"
      className={classNames(className)}
    >
      <div className="grid grid-cols-6 gap-2">
        <DigitSection
          className="col-span-3"
          textClassName="text-red-500"
          value={monthlyExpenditures}
          title="Monthly expenditure"
          icon={FaFire}
          formatter={(v) => `+${formatNumberAsAmount(v)}`}
          />
        <DigitSection
          className="col-span-3"
          textClassName="text-green-500"
          value={monthlyIncomes}
          title="Monthly incomes"
          icon={FaMoneyBill}
          formatter={formatNumberAsAmount}
        />
      </div>
    </Widget>
  );
}
