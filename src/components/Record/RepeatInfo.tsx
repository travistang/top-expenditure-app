import { format } from "date-fns";
import { Repeat } from "../../domain/repeat";
import RegularExpenditureRecordIcon from "./RegularExpenditureRecordIcon";
import classNames from "classnames";

type Props = {
  repeat: Repeat;
  className?: string;
};
export default function RepeatInfo({ repeat, className }: Props) {
  const RepeatIcon = RegularExpenditureRecordIcon[repeat.interval];

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center gap-1  text-xs",
        className
      )}
    >
      <RepeatIcon />
      <span>
        {repeat.endDate ? format(repeat.endDate, "dd/MM/yyyy") : "no end date"}
      </span>
    </div>
  );
}
