import classNames from "classnames";

import Calendar from "../../../Calendar";
import MonthPicker from "../MonthPicker";
import MonthYearPicker from "../MonthYearPicker";
import DatePickerGroupContainer from "./DatePickerGroupContainer";
import YearPicker from "../YearPicker";

export enum DateSelectionModalState {
  Date,
  Month,
  Year,
}

type Props = {
  selectionState: DateSelectionModalState;
  viewingDate: number;
  selectedDate: number;
  onSelect: (date: number) => void;
  onView: (date: number, keepView?: boolean) => void;
  onSelectModeChange: (mode: DateSelectionModalState) => void;
};
export default function DatePickerGroup({
  viewingDate,
  selectedDate,
  onSelect,
  onView,
  selectionState,
  onSelectModeChange,
}: Props) {
  return (
    <div
      className={classNames(
        "-ml-2 grid grid-cols-[repeat(3,100vw)] transition-all duration-450",
        {
          "-translate-x-[100vw]":
            selectionState === DateSelectionModalState.Date,
          "-translate-x-[200vw]":
            selectionState === DateSelectionModalState.Year,
        }
      )}
    >
      <DatePickerGroupContainer
        currentMode={selectionState}
        representingMode={DateSelectionModalState.Month}
      >
        <MonthPicker
          onChangeMode={onSelectModeChange}
          onChange={onView}
          date={selectedDate}
        />
      </DatePickerGroupContainer>
      <DatePickerGroupContainer
        currentMode={selectionState}
        representingMode={DateSelectionModalState.Date}
      >
        <MonthYearPicker
          date={viewingDate}
          onChange={onView}
          onSelectModeChange={onSelectModeChange}
        />
        <Calendar
          className={classNames(
            selectionState !== DateSelectionModalState.Date && "opacity-0"
          )}
          displayingDate={viewingDate}
          onSelectDate={onSelect}
          selectedDate={selectedDate}
        />
      </DatePickerGroupContainer>
      <DatePickerGroupContainer
        currentMode={selectionState}
        representingMode={DateSelectionModalState.Year}
      >
        <YearPicker
          onChangeMode={onSelectModeChange}
          viewingDate={viewingDate}
          onChange={(viewDate) => onView(viewDate, true)}
        />
      </DatePickerGroupContainer>
    </div>
  );
}
