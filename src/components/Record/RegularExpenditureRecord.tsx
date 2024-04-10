import classNames from "classnames";
import { LuCircleSlash2 } from "react-icons/lu";
import {
  RegularExpenditureWithId,
  expenditureDatabase,
} from "../../domain/expenditure";
import { monthlyAverageFromRepeat } from "../../domain/repeat";
import useFetch from "../../hooks/useFetch";
import { formatNumberAsAmount } from "../../utils/strings";
import LinePlaceholder from "../Placeholders/LinePlaceholder";
import RepeatInfo from "./RepeatInfo";

type Props = {
  expenditure: RegularExpenditureWithId;
  className?: string;
  onClick?: () => void;
  onDelete?: () => void;
};
export default function RegularExpenditureRecord({
  className,
  expenditure,
  onClick,
  onDelete,
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
        "rounded-sm grid grid-cols-4 gap-x-2 gap-y-0 py-1 px-2 cursor-pointer bg-normal hover:bg-gray-500 active:bg-gray-700 flex-shrink-0",
        className
      )}
    >
      <RepeatInfo
        repeat={repeat}
        className="h-full col-span-1 flex-col items-center justify-center"
      />
      <div className="col-span-2 flex flex-col items-stretch overflow-hidden">
        <div className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </div>
        <div className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
          {category?.name ?? <LinePlaceholder rounded className="h-4 w-12" />}
        </div>
      </div>
      <div className="flex flex-col items-end overflow-hidden text-ellipsis whitespace-nowrap text-right">
        <span className="text-xl">
          -{formatNumberAsAmount(averagePerMonth)}
        </span>
        <span className="flex items-center gap-2 text-sm">
          <LuCircleSlash2 className="flex-shrink-0" />
          monthly
        </span>
      </div>
    </div>
  );
}
