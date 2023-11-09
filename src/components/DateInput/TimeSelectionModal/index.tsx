import React, { useContext, useState } from "react";
import ConfirmationButtonRow from "../ConfirmationButtonRow";
import { modalContext } from "../../Modal";
import { range } from "../../../utils/array";
import NumberTicker from "./NumberTicker";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";

type Props = {
  date: number;
  onChange: (date: number) => void;
};
export default function TimeSelectionModal({ date, onChange }: Props) {
  const { onClose } = useContext(modalContext);
  const [selectedDate, setSelectedDate] = useState(date);

  const confirmSelection = () => {
    onChange(selectedDate);
    onClose();
  };

  const onSelectValueFor =
    (hourOrMinute: "hour" | "minute") => (value: number) => {
      if (hourOrMinute === "hour") {
        setSelectedDate(setHours(selectedDate, value).getTime());
      } else {
        setSelectedDate(setMinutes(selectedDate, value).getTime());
      }
    };
  return (
    <div className="flex items-stretch gap-2 flex-col flex-1">
      <div className="flex items-center justify-center gap-2 flex-1 py-4">
        <NumberTicker
          from={0}
          to={24}
          defaultValue={getHours(date)}
          onChange={onSelectValueFor("hour")}
          formatNumber={(num) => num.toString().padStart(2, "0")}
        />
        <span className="text-normal text-2xl">:</span>
        <NumberTicker
          from={0}
          to={60}
          defaultValue={getMinutes(date)}
          onChange={onSelectValueFor("minute")}
          formatNumber={(num) => num.toString().padStart(2, "0")}
        />
      </div>
      <ConfirmationButtonRow
        onCancel={onClose}
        onConfirm={confirmSelection}
        onSetToNow={() => setSelectedDate(Date.now())}
      />
    </div>
  );
}
