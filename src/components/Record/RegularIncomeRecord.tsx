import classNames from "classnames";
import { LuCircleSlash2 } from "react-icons/lu";
import { RegularIncome } from "../../domain/income";
import RepeatInfo from "./RepeatInfo";
import { formatNumberAsAmount } from "../../utils/strings";
import { monthlyAverageFromRepeat } from "../../domain/repeat";

type Props = {
  income: RegularIncome;
  className?: string;
  onClick?: () => void;
};
export default function RegularIncomeRecord({
  onClick,
  income,
  className,
}: Props) {
  const { name, repeat, amount } = income;
  const averagePerMonth = monthlyAverageFromRepeat(amount, repeat);
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded-sm grid grid-cols-4 gap-x-2 gap-y-0 py-1 px-2 cursor-pointer",
        className
      )}
    >
      <RepeatInfo repeat={repeat} className="h-full col-span-1" />
      <div className="col-span-2 flex flex-col items-stretch overflow-hidden">
        <div className="text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>
      </div>
      <div className="flex flex-col items-end overflow-visible text-ellipsis whitespace-nowrap text-right">
        <span className="text-sm text-green-500">
          +{formatNumberAsAmount(averagePerMonth)}
        </span>
        <span className="text-xs flex items-center gap-2">
          <LuCircleSlash2 className="text-xs flex-shrink-0" />
          monthly
        </span>
      </div>
    </div>
  );
}
