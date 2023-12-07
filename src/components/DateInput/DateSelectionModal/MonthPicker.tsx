import { format, getMonth, setMonth } from "date-fns";
import { FaCaretLeft } from "react-icons/fa";
import Button from "../../Button";
import { DateSelectionModalState } from "./DatePickerGroup";
import MonthPickerGrid from "../MonthPickerGrid";
import { Month } from "../../../domain/repeat";

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
  const selectedMonth = getMonth(date);
  const onMonthSelected = (month: Month) => {
    onChange(setMonth(date, month as number).getTime());
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
      <MonthPickerGrid
        selected={selectedMonth as Month}
        onSelect={onMonthSelected}
      />
    </div>
  );
}
