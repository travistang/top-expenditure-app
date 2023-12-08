import classNames from "classnames";
import { LuCircleSlash2 } from "react-icons/lu";
import {
  RegularExpenditureWithId,
  expenditureDatabase,
} from "../../domain/expenditure";
import LinePlaceholder from "../Placeholders/LinePlaceholder";
import { formatNumberAsAmount } from "../../utils/strings";
import useFetch from "../../hooks/useFetch";
import RepeatInfo from "./RepeatInfo";
import { monthlyAverageFromRepeat } from "../../domain/repeat";

type Props = {
  expenditure: RegularExpenditureWithId;
  className?: string;
  onClick?: () => void;
};
export default function RegularExpenditureRecord({
  className,
  expenditure,
  onClick,
}: Props) {
  const { repeat, name, amount } = expenditure;
  const { result: category } = useFetch(
    expenditure.category,
    expenditureDatabase.getCategoryById.bind(expenditureDatabase)
  );
  const averagePerMonth = monthlyAverageFromRepeat(amount, repeat);
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded-sm grid grid-cols-4 gap-x-2 gap-y-0 py-1 px-2 cursor-pointer bg-normal hover:bg-gray-500 active:bg-gray-700",
        className
      )}
    >
      <RepeatInfo repeat={repeat} className="h-full col-span-1" />
      <div className="col-span-2 flex flex-col items-stretch overflow-hidden">
        <div className="text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>
        <div className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
          {category?.name ?? <LinePlaceholder rounded className="h-4 w-12" />}
        </div>
      </div>
      <div className="flex flex-col items-end overflow-hidden text-ellipsis whitespace-nowrap text-right">
        <span className="text-sm">
          -{formatNumberAsAmount(averagePerMonth)}
        </span>
        <span className="text-xs flex items-center gap-2">
          <LuCircleSlash2 className="text-xs flex-shrink-0" />
          monthly
        </span>
      </div>
    </div>
  );
}
