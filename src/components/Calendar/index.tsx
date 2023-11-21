import classNames from "classnames";
import {
  addDays,
  getDay,
  getDaysInMonth,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { range } from "../../utils/array";
import DateCell from "./DateCell";
import WeekHeader from "./WeekHeader";

export type CalendarHighlights = {
  color: string;
  date: number;
};

type CalendarProps = {
  className?: string;
  displayingDate: number;
  selectedDate?: number;
  onSelectDate?: (date: number) => void;
  highlights?: CalendarHighlights[];
};
export default function Calendar({
  className,
  displayingDate,
  selectedDate,
  onSelectDate,
  highlights = [],
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
          highlightColor={
            highlights.find((hl) => isSameDay(hl.date, addDays(monthStart, i)))
              ?.color
          }
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
