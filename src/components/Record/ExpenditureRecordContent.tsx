import classNames from "classnames";
import { format } from "date-fns";
import {
  ExpenditureWithId,
  expenditureDatabase,
} from "../../domain/expenditure";
import { formatNumberAsAmount } from "../../utils/strings";
import useFetch from "../../hooks/useFetch";
import LinePlaceholder from "../Placeholders/LinePlaceholder";
import { FaCalendar } from "react-icons/fa";

type Props = {
  expenditure: ExpenditureWithId;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};
export default function ExpenditureRecordContent({
  expenditure,
  className,
  onClick,
  children,
}: Props) {
  const { date, name, amount } = expenditure;
  const { result: category } = useFetch(
    expenditure.category,
    expenditureDatabase.getCategoryById.bind(expenditureDatabase)
  );
  const isRegular = !!expenditure.repeat;
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded-sm grid grid-cols-4 gap-x-2 gap-y-0 py-1 px-2 cursor-pointer row-span-2 bg-normal hover:bg-gray-500 active:bg-gray-700",
        className
      )}
    >
      <div className="row-start-1 row-end-3 h-full flex flex-col justify-center gap-1 col-span-1 text-xs">
        {isRegular ? (
          <span className="text-green-500 flex items-center gap-1">
            <FaCalendar className=" self-center" />
            {format(date, "dd/MM/yyyy")}
          </span>
        ) : (
          <>
            <span>{format(date, "dd/MM/yyyy")}</span>
            <span>{format(date, "HH:mm")}</span>
          </>
        )}
      </div>
      <div className="col-span-2 row-start-1 text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </div>
      <div className="col-span-2 row-start-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {category?.name ?? <LinePlaceholder rounded className="h-4 w-12" />}
      </div>
      <div className="row-start-1 row-span-full text-lg overflow-hidden text-ellipsis whitespace-nowrap text-right">
        {formatNumberAsAmount(amount)}
      </div>
      {children && <div className="col-span-full">{children}</div>}
    </div>
  );
}
