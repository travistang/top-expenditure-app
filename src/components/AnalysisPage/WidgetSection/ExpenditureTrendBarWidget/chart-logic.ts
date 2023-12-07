import {
  addDays,
  addMonths,
  format,
  getDaysInMonth,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { FaCalendarDay, FaMoon } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { getCategoryColor } from "../../../../domain/category";
import {
  CategoryWithId,
  ExpenditureWithId,
} from "../../../../domain/expenditure";
import {
  groupExpendituresByCategory,
  total,
} from "../../../../domain/expenditure-statistics";
import { range } from "../../../../utils/array";
import { BarChartData } from "../../../BarChart";

export enum TrendBarDisplayMode {
  MonthsInYear,
  DaysInMonth,
}

export const DisplayModeText: Record<
  TrendBarDisplayMode,
  { text: string; icon: IconType }
> = {
  [TrendBarDisplayMode.DaysInMonth]: {
    text: "Daily trend",
    icon: FaCalendarDay,
  },
  [TrendBarDisplayMode.MonthsInYear]: {
    text: "Monthly trend",
    icon: FaMoon,
  },
};

export const computeBarChartData = (
  mode: TrendBarDisplayMode,
  categories: CategoryWithId[],
  expenditures: ExpenditureWithId[],
  aroundDate = Date.now()
): BarChartData[] => {
  if (mode === TrendBarDisplayMode.MonthsInYear) {
    return computeMonthlyBarChartData(categories, expenditures, aroundDate);
  }
  return computeDailyBarChartData(categories, expenditures, aroundDate);
};

const computeDailyBarChartData = (
  categories: CategoryWithId[],
  expenditures: ExpenditureWithId[],
  aroundDate = Date.now()
): BarChartData[] => {
  const expendituresOfMonth = expenditures.filter((e) =>
    isSameMonth(e.date, aroundDate)
  );
  const monthStart = startOfMonth(aroundDate);
  const timestamps = range(getDaysInMonth(aroundDate)).map((d) =>
    addDays(monthStart, d).getTime()
  );
  const data: BarChartData[] = timestamps.map((ts) => {
    const expenditureOfDay = expendituresOfMonth.filter((e) =>
      isSameDay(e.date, ts)
    );
    const expenditureByCategory = groupExpendituresByCategory(
      categories,
      expenditureOfDay,
      true
    );
    return {
      label: format(ts, "dd"),
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
const computeMonthlyBarChartData = (
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
