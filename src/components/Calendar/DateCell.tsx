import classNames from "classnames";
import { addDays, format, isSameDay } from "date-fns";

type Props = {
  monthStart: number;
  dateOffset: number;
  selectedDate?: number;
  onClick?: (date: number) => void;
};
export default function DateCell({
  monthStart,
  dateOffset,
  selectedDate,
  onClick,
}: Props) {
  const dateOnCell = addDays(monthStart, dateOffset).getTime();
  const isToday = isSameDay(dateOnCell, Date.now());
  const selected = selectedDate ? isSameDay(selectedDate, dateOnCell) : false;
  return (
    <div
      key={dateOnCell}
      onClick={() => onClick?.(dateOnCell)}
      className={classNames(
        "aspect-square h-8 flex items-center justify-center rounded-full hover:bg-gray-400 cursor-pointer",
        selected
          ? "bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-900 text-gray-200"
          : "hover:bg-gray-400 active:bg-gray-700 text-normal",
        isToday && "font-bold text-yellow-500"
      )}
    >
      {format(dateOnCell, "d")}
    </div>
  );
}
