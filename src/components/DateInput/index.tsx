import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import DateInputSection from "./DateInputSection";
import Modal from "../Modal";
import DateSelectionModal from "./DateSelectionModal/DateSelectionModal";
import TimeSelectionModal from "./TimeSelectionModal";

type Props = {
  label?: string;
  date: number;
  onChange: (date: number) => void;
  className?: string;
};
enum DateInputState {
  Idle,
  SelectingDate,
  SelectingTime,
}
export default function DateInput({ className, label, date, onChange }: Props) {
  const [state, setState] = useState<DateInputState>(DateInputState.Idle);

  return (
    <div className={classNames("grid grid-cols-4 gap-x-2 gap-y-1", className)}>
      {label && (
        <span className="text-xs font-bold col-span-full h-min">{label}</span>
      )}
      <DateInputSection
        onClick={() => setState(DateInputState.SelectingDate)}
        className="col-span-2"
      >
        {format(date, "dd/MM/yyyy")}
      </DateInputSection>
      <DateInputSection
        onClick={() => setState(DateInputState.SelectingTime)}
        className="col-span-2"
      >
        {format(date, "HH:mm")}
      </DateInputSection>
      {state !== DateInputState.Idle && (
        <Modal onClose={() => setState(DateInputState.Idle)}>
          {state === DateInputState.SelectingDate && (
            <DateSelectionModal date={date} onChange={onChange} />
          )}
          {state === DateInputState.SelectingTime && (
            <TimeSelectionModal date={date} onChange={onChange} />
          )}
        </Modal>
      )}
    </div>
  );
}
