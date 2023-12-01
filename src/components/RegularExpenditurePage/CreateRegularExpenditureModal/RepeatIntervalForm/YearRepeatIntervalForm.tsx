import { useState } from "react";
import {
  Month,
  YearlyRegularExpenditureInterval,
} from "../../../../domain/regular-expenditure";
import RepeatIntervalFormBase from "./RepeatIntervalFormBase";
import MonthPickerGrid from "../../../DateInput/MonthPickerGrid";
import DayPicker from "./DayPicker";
import { Updater } from "../../../../utils/objects";

type Props = {
  settings: YearlyRegularExpenditureInterval;
  onChange: (settings: YearlyRegularExpenditureInterval) => void;
};

const getNumDaysInMonth = (month: Month) => {
  switch (month + 1) {
    case 2:
      return 29; // taking account for leap years
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    default:
      return 30;
  }
};
export default function YearRepeatIntervalForm({ settings, onChange }: Props) {
  const [viewingMonth, setViewingMonth] = useState<Month>(1);

  const toggleDay =
    (updater: Updater<YearlyRegularExpenditureInterval>) =>
    (days: number[]) => {
      const newListWithoutViewingMonth = settings.days.filter(
        (dm) => dm.month !== viewingMonth
      );
      const newList = [
        ...newListWithoutViewingMonth,
        ...days.map((day) => ({ month: viewingMonth, day })),
      ];
      updater("days")(newList);
    };
  const monthsInvolved = settings.days.reduce(
    (monthsInvolved, dayMonth) =>
      monthsInvolved.includes(dayMonth.month)
        ? monthsInvolved
        : [...monthsInvolved, dayMonth.month],
    [] as Month[]
  );
  return (
    <RepeatIntervalFormBase settings={settings} onChange={onChange}>
      {({ settings, updater }) => (
        <>
          <span className="text-xs font-bold">Days to repeat on</span>
          <MonthPickerGrid
            highlightedMonths={monthsInvolved}
            selected={viewingMonth}
            onSelect={setViewingMonth}
          />
          <DayPicker
            numDays={getNumDaysInMonth(viewingMonth)}
            selectedDays={settings.days
              .filter((dayMonth) => dayMonth.month === viewingMonth)
              .map((dayMonth) => dayMonth.day)}
            onChange={toggleDay(updater)}
          />
        </>
      )}
    </RepeatIntervalFormBase>
  );
}
