import classNames from "classnames";
import { format } from "date-fns";
import { Repeat } from "../../domain/repeat";
import RegularExpenditureRecordIcon from "./RegularExpenditureRecordIcon";

type Props = {
  repeat: Repeat;
  className?: string;
};
export default function RepeatInfo({ repeat, className }: Props) {
  const RepeatIcon = RegularExpenditureRecordIcon[repeat.interval];

  return (
    <div className={classNames("flex gap-1", className)}>
      <RepeatIcon />
      <span className="text-xs">
        {repeat.endDate ? format(repeat.endDate, "dd/MM/yyyy") : "No end date"}
      </span>
    </div>
  );
}
