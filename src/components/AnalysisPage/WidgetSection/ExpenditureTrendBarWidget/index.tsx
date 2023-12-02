import { getMonth, setMonth } from "date-fns";
import { useMemo, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import {
  CategoryWithId,
  ExpenditureWithId,
} from "../../../../domain/expenditure";
import BarChart from "../../../BarChart";
import Button from "../../../Button";
import Widget from "../../../Widget";
import {
  DisplayModeText,
  TrendBarDisplayMode,
  computeBarChartData,
} from "./chart-logic";

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
  const [mode, setMode] = useState<TrendBarDisplayMode>(
    TrendBarDisplayMode.MonthsInYear
  );
  const [selectedDate, setSelectedDate] = useState(0);
  const selectedBarIndex = useMemo(() => {
    return mode === TrendBarDisplayMode.MonthsInYear
      ? getMonth(selectedMonth)
      : selectedDate;
  }, [mode, selectedMonth, selectedDate]);

  const data = computeBarChartData(
    mode,
    categories,
    expenditures,
    selectedMonth
  );
  const modeForButton =
    mode === TrendBarDisplayMode.DaysInMonth
      ? TrendBarDisplayMode.MonthsInYear
      : TrendBarDisplayMode.DaysInMonth;

  const onSelectBarIndex = (monthOrDateId: number) => {
    if (mode === TrendBarDisplayMode.DaysInMonth) {
      setSelectedDate(monthOrDateId);
      return;
    }
    onSelectMonth(setMonth(selectedMonth, monthOrDateId).getTime());
  };

  return (
    <Widget icon={FaChartBar} title="Trend" className="col-span-full">
      <BarChart
        className="pb-2 mb-2"
        onSelectBar={onSelectBarIndex}
        selectedBarIndex={selectedBarIndex}
        data={data}
      />
      <Button
        className="text-xs"
        {...DisplayModeText[modeForButton]}
        onClick={() => setMode(modeForButton)}
      />
    </Widget>
  );
}
