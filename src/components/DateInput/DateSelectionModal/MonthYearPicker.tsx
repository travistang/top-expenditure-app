import { addMonths, format } from "date-fns";
import Button from "../../Button";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { DateSelectionModalState } from "./DatePickerGroup";

type Props = {
  onChange: (date: number) => void;
  date: number;
  onSelectModeChange?: (mode: DateSelectionModalState) => void;
};
export default function MonthYearPicker({
  onSelectModeChange,
  onChange,
  date,
}: Props) {
  const moveMonth = (offset: 1 | -1) => () => {
    onChange(addMonths(date, offset).getTime());
  };
  return (
    <div className="flex items-center justify-between">
      <Button onClick={moveMonth(-1)} icon={FaCaretLeft} />
      <div className="flex gap-2 items-center">
        <Button
          onClick={() => onSelectModeChange?.(DateSelectionModalState.Month)}
          text={format(date, "MMM")}
        />
        <Button
          onClick={() => onSelectModeChange?.(DateSelectionModalState.Year)}
          text={format(date, "yyyy")}
        />
      </div>
      <Button onClick={moveMonth(1)} icon={FaCaretRight} />
    </div>
  );
}
