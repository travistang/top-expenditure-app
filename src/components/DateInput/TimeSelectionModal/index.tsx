import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { useContext, useRef, useState } from "react";
import { modalContext } from "../../Modal";
import ConfirmationButtonRow from "../ConfirmationButtonRow";
import NumberTicker, { NumberTickerControlProps } from "./NumberTicker";

type Props = {
  date?: number;
  onChange: (date: number) => void;
};
export default function TimeSelectionModal({ date, onChange }: Props) {
  const { onClose } = useContext(modalContext);
  const [selectedDate, setSelectedDate] = useState(date ?? Date.now());
  const hourPickerRef = useRef<NumberTickerControlProps>(
    {} as NumberTickerControlProps
  );
  const minutePickerRef = useRef<NumberTickerControlProps>(
    {} as NumberTickerControlProps
  );

  const confirmSelection = () => {
    onChange(selectedDate);
    onClose();
  };

  const setToNow = () => {
    const now = Date.now();
    const hour = getHours(now);
    const minutes = getMinutes(now);
    hourPickerRef.current.setTick(hour);
    minutePickerRef.current.setTick(minutes);
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
          ref={hourPickerRef}
          from={0}
          to={24}
          defaultValue={getHours(date ?? Date.now())}
          onChange={onSelectValueFor("hour")}
          formatNumber={(num) => num.toString().padStart(2, "0")}
        />
        <span className="text-normal text-2xl">:</span>
        <NumberTicker
          ref={minutePickerRef}
          from={0}
          to={60}
          defaultValue={getMinutes(date ?? Date.now())}
          onChange={onSelectValueFor("minute")}
          formatNumber={(num) => num.toString().padStart(2, "0")}
        />
      </div>
      <ConfirmationButtonRow
        onCancel={onClose}
        onConfirm={confirmSelection}
        onSetToNow={setToNow}
      />
    </div>
  );
}
