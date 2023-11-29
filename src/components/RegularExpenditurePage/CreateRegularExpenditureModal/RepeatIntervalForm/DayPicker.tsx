import classNames from "classnames";
import { range, toggle } from "../../../../utils/array";
import Button from "../../../Button";

type Props = {
  numDays: number;
  selectedDays: number[];
  onChange: (days: number[]) => void;
  className?: string;
};
export default function DayPicker({
  numDays,
  selectedDays,
  onChange,
  className,
}: Props) {
  return (
    <div
      className={classNames(
        "grid grid-cols-7 gap-2 rounded-xl p-2 bg-gray-500/50",
        className
      )}
    >
      {range(numDays)
        .map((d) => d + 1)
        .map((day) => (
          <Button
            className="aspect-square h-8"
            color={selectedDays.includes(day) ? "indigo" : undefined}
            text={day.toString()}
            key={day}
            onClick={() => onChange(toggle(selectedDays, day))}
          />
        ))}
    </div>
  );
}
