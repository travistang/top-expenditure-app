import { addMonths, format } from "date-fns";
import Button from "../../Button";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { DateSelectionModalState } from "./DatePickerGroup";
import classNames from "classnames";

type Props = {
  onChange: (date: number) => void;
  date: number;
  className?: string;
  onSelectModeChange?: (mode: DateSelectionModalState) => void;
};
export default function MonthYearPicker({
  onSelectModeChange,
  onChange,
  className,
  date,
}: Props) {
  const moveMonth = (offset: 1 | -1) => () => {
    onChange(addMonths(date, offset).getTime());
  };
  return (
    <div className={classNames("flex items-center justify-between", className)}>
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
