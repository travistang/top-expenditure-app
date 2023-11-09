import { addMonths, format, getMonth, setMonth, startOfYear } from "date-fns";
import { range } from "../../../utils/array";
import Button from "../../Button";
import classNames from "classnames";
import { FaCaretLeft } from "react-icons/fa";
import { DateSelectionModalState } from "./DatePickerGroup";

type Props = {
  date: number;
  onChange: (date: number) => void;
  onChangeMode: (mode: DateSelectionModalState) => void;
  className?: string;
};
export default function MonthPicker({
  onChangeMode,
  className,
  date,
  onChange,
}: Props) {
  const yearStart = startOfYear(date);
  const months = range(12).map((m) => addMonths(yearStart, m).getTime());
  const selectedMonth = getMonth(date);
  const onMonthSelected = (monthStart: number) => {
    onChange(setMonth(date, getMonth(monthStart)).getTime());
  };
  return (
    <div className="flex flex-col items-stretch gap-2">
      <div className="flex justify-between items-center pl-2 pr-6">
        <Button
          icon={FaCaretLeft}
          text="back"
          onClick={() => onChangeMode(DateSelectionModalState.Date)}
          className="font-bold uppercase text-normal w-min self-start"
        />
        <span className="font-bold">{format(date, "yyyy")}</span>
      </div>
      <div className={classNames("grid grid-cols-4 gap-2", className)}>
        {months.map((month) => (
          <Button
            key={month}
            text={format(month, "MMM")}
            onClick={() => onMonthSelected(month)}
            className={classNames(
              "uppercase font-bold h-12",
              selectedMonth === getMonth(month) &&
                "bg-indigo-500 active:bg-indigo-700"
            )}
          />
        ))}
      </div>
    </div>
  );
}
