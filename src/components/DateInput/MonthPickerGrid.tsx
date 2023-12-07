import { format, setMonth } from "date-fns";
import classNames from "classnames";

import { Month } from "../../domain/regular-expenditure";
import Button from "../Button";
import { range } from "../../utils/array";

type Props = {
  selected?: Month;
  highlightedMonths?: Month[];
  onSelect: (m: Month) => void;
  className?: string;
};
const MONTH_STRING_PAIR = range(12).map(
  (m) => [m as Month, format(setMonth(Date.now(), m), "MMM")] as const
);

export default function MonthPickerGrid({
  selected,
  highlightedMonths = [],
  onSelect,
  className,
}: Props) {
  return (
    <div className={classNames("grid grid-cols-4 gap-2", className)}>
      {MONTH_STRING_PAIR.map(([month, monthString]) => (
        <Button
          key={month}
          text={monthString}
          onClick={() => onSelect(month)}
          color={selected === month ? "indigo" : undefined}
          className={classNames(
            "uppercase font-bold h-12",
            selected !== month &&
              highlightedMonths.includes(month) &&
              "bg-indigo-500/50"
          )}
        />
      ))}
    </div>
  );
}
