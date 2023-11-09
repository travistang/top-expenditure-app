import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import Button from "../../../Button";
import { useState } from "react";
import { getYear, setYear } from "date-fns";
import YearPickerGrid, { NUM_VIEWING_YEARS } from "./YearPickerGrid";
import { DateSelectionModalState } from "../DatePickerGroup";

type Props = {
  viewingDate: number;
  onChange: (viewDate: number) => void;
  onChangeMode: (mode: DateSelectionModalState) => void;
};
export default function YearPicker({
  viewingDate,
  onChange,
  onChangeMode,
}: Props) {
  const viewingYear = getYear(viewingDate);
  const [firstViewingYear, setFirstViewingYear] = useState(
    viewingYear - NUM_VIEWING_YEARS / 2
  );

  const onViewYear = (year: number) => {
    onChange(setYear(viewingDate, year).getTime());
  };

  const onMovePage = (direction: 1 | -1) => () => {
    setFirstViewingYear(firstViewingYear + NUM_VIEWING_YEARS * direction);
  };
  return (
    <div className="flex flex-col gap-2 items-stretch overflow-hidden">
      <div className="flex justify-between items-center">
        <Button
          icon={FaCaretLeft}
          text="back"
          onClick={() => onChangeMode(DateSelectionModalState.Date)}
          className="font-bold uppercase text-normal w-min self-start"
        />
        <div className="flex items-center">
          <Button icon={FaCaretLeft} onClick={onMovePage(-1)} />
          <Button icon={FaCaretRight} onClick={onMovePage(1)} />
        </div>
      </div>
      <YearPickerGrid
        startYear={firstViewingYear}
        viewingYear={viewingYear}
        onChangeYear={onViewYear}
      />
    </div>
  );
}
