import classNames from "classnames";
import { range } from "../../../../utils/array";
import Button from "../../../Button";

type Props = {
  startYear: number;
  viewingYear: number;
  onChangeYear: (year: number) => void;
};
export const NUM_VIEWING_YEARS = 12;

export default function YearPickerGrid({
  startYear,
  viewingYear,
  onChangeYear,
}: Props) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {range(NUM_VIEWING_YEARS)
        .map((dYear) => startYear + dYear)
        .map((year) => (
          <Button
            key={year}
            text={year.toString()}
            className={classNames(
              "h-12",
              viewingYear === year &&
                "bg-indigo-500 active:bg-indigo-900 hover:bg-indigo-700"
            )}
            onClick={() => onChangeYear(year)}
          />
        ))}
    </div>
  );
}
