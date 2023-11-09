import {
  addDays,
  getDay,
  getDaysInMonth,
  isSameDay,
  startOfMonth,
} from "date-fns";
import classNames from "classnames";
import { range } from "../../utils/array";
import DateCell from "./DateCell";
import WeekHeader from "./WeekHeader";

type CalendarProps = {
  className?: string;
  displayingDate: number;
  selectedDate?: number;
  onSelectDate?: (date: number) => void;
};
export default function Calendar({
  className,
  displayingDate,
  selectedDate,
  onSelectDate,
}: CalendarProps) {
  const monthStart = startOfMonth(displayingDate).getTime();
  const numEmptyDaysStart = getDay(monthStart);
  const numDaysInMonth = getDaysInMonth(displayingDate);

  return (
    <div className={classNames("grid grid-cols-7 gap-2", className)}>
      <WeekHeader />
      {range(numEmptyDaysStart).map((i) => (
        <span key={i} />
      ))}
      {range(numDaysInMonth).map((i) => (
        <DateCell
          key={`${monthStart}-${i}`}
          monthStart={monthStart}
          dateOffset={i}
          onClick={(d) => onSelectDate?.(d)}
          selectedDate={selectedDate}
        />
      ))}
    </div>
  );
}
