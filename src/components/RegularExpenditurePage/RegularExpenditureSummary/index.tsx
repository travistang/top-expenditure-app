import classNames from "classnames";
import { FaChartPie, FaFire, FaMoneyBill } from "react-icons/fa";
import { CURRENCY_NAMES, Currency } from "../../../domain/currency";
import { RegularExpenditureWithId } from "../../../domain/expenditure";
import { IncomeWithId } from "../../../domain/income";
import { getRepeatableByCurrency } from "../../../domain/regular-expenditure";
import { unique } from "../../../utils/array";
import { formatNumberAsAmount } from "../../../utils/strings";
import Widget from "../../Widget";
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
  const monthlyExpendituresByCurrency = getRepeatableByCurrency(expenditures);
  const monthlyIncomesByCurrency = getRepeatableByCurrency(incomes);
  const relevantCurrencies: Currency[] = unique([
    ...(Object.keys(monthlyExpendituresByCurrency) as Currency[]),
    ...(Object.keys(monthlyIncomesByCurrency) as Currency[]),
  ]);

  return (
    <Widget
      sensitive
      icon={FaChartPie}
      title="Expenditure summary"
      className={classNames(className)}
    >
      <div className="grid grid-cols-6 gap-2">
        {relevantCurrencies.map((currency) => (
          <div className="contents">
            <DigitSection
              className="col-span-3"
              textClassName="text-red-500"
              value={monthlyExpendituresByCurrency[currency] ?? 0}
              title={`Monthly expenditure (${CURRENCY_NAMES[currency]}) `}
              icon={FaFire}
              currency={currency}
              formatter={(v) => `+${formatNumberAsAmount(v, currency)}`}
            />
            <DigitSection
              className="col-span-3"
              currency={currency}
              textClassName="text-green-700 dark:text-green-500"
              value={monthlyIncomesByCurrency[currency] ?? 0}
              title={`Monthly income (${CURRENCY_NAMES[currency]})`}
              icon={FaMoneyBill}
            />
          </div>
        ))}
      </div>
    </Widget>
  );
}
