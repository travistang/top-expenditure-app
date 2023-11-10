import { useContext, useState } from "react";
import { modalContext } from "../../Modal";
import classNames from "classnames";
import DatePickerGroup, { DateSelectionModalState } from "./DatePickerGroup";
import ConfirmationButtonRow from "../ConfirmationButtonRow";

type Props = {
  date?: number;
  onChange: (date: number) => void;
};

export default function DateSelectionModal({ date, onChange }: Props) {
  const [viewingDate, setViewingDate] = useState(date ?? Date.now());
  const [selectedDate, setSelectedDate] = useState(date ?? Date.now());
  const [selectionModalState, setSelectionModalState] =
    useState<DateSelectionModalState>(DateSelectionModalState.Date);
  const { onClose } = useContext(modalContext);

  const confirmSelection = () => {
    onChange(selectedDate);
    onClose();
  };

  const setToNow = () => {
    const now = Date.now();
    setSelectedDate(now);
    setViewingDate(now);
  };

  const updateSelectedDate = (date: number) => {
    setSelectedDate(date);
    setSelectionModalState(DateSelectionModalState.Date);
  };

  const updateViewDate = (date: number, keepView?: boolean) => {
    setViewingDate(date);
    if (!keepView) {
      setSelectionModalState(DateSelectionModalState.Date);
    }
  };

  return (
    <div className="flex flex-col items-stretch">
      <DatePickerGroup
        onSelectModeChange={setSelectionModalState}
        viewingDate={viewingDate}
        selectedDate={selectedDate}
        onSelect={updateSelectedDate}
        onView={updateViewDate}
        selectionState={selectionModalState}
      />
      <ConfirmationButtonRow
        onCancel={onClose}
        onConfirm={confirmSelection}
        onSetToNow={setToNow}
        className={classNames(
          selectionModalState !== DateSelectionModalState.Date &&
            "opacity-0 translate-y-full"
        )}
      />
    </div>
  );
}
