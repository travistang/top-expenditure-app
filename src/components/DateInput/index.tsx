import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import DateInputSection from "./DateInputSection";
import Modal from "../Modal";
import DateSelectionModal from "./DateSelectionModal";
import TimeSelectionModal from "./TimeSelectionModal";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";

type BaseProps = {
  label?: string;
  className?: string;
};
type NullableProps = {
  nullable: true;
  date?: number;
  onChange: (date?: number) => void;
};

type NonNullableProps = {
  nullable?: false;
  date: number;
  onChange: (date: number) => void;
};
type Props = BaseProps & (NullableProps | NonNullableProps);
enum DateInputState {
  Idle,
  SelectingDate,
  SelectingTime,
}
export default function DateInput({
  nullable,
  className,
  label,
  date,
  onChange,
}: Props) {
  const [state, setState] = useState<DateInputState>(DateInputState.Idle);
  const dateString = date ? format(date, "dd/MM/yyyy") : "--";
  const timeString = date ? format(date, "HH:mm") : "--";
  return (
    <div className={classNames("grid grid-cols-6 gap-x-2 gap-y-1", className)}>
      {label && (
        <span className="text-xs font-bold col-span-full h-min">{label}</span>
      )}
      <DateInputSection
        onClick={() => setState(DateInputState.SelectingDate)}
        className={classNames(nullable ? "col-span-3" : "col-span-4")}
      >
        {dateString}
      </DateInputSection>
      <DateInputSection
        onClick={() => setState(DateInputState.SelectingTime)}
        className="col-span-2"
      >
        {timeString}
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
      {nullable && !!date && (
        <Button
          icon={FaTimes}
          className="text-gray-800 dark:text-gray-200"
          onClick={() => onChange(undefined)}
        />
      )}
    </div>
  );
}
