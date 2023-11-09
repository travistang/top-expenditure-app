import classNames from "classnames";
import { format } from "date-fns";
import { ExpenditureWithId } from "../../domain/expenditure";

type Props = {
  expenditure: ExpenditureWithId;
  className?: string;
  onClick?: () => void;
};
export default function ExpenditureItem({
  expenditure,
  className,
  onClick,
}: Props) {
  const { date, name, amount, category } = expenditure;
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded-sm grid grid-cols-4 gap-x-2 gap-y-0 py-1 px-2 cursor-pointer row-span-2 bg-normal hover:bg-gray-500 active:bg-gray-700",
        className
      )}
    >
      <div className="row-start-1 row-end-3 h-full flex flex-col justify-center gap-1 col-span-1 text-xs">
        <span>{format(date, "dd/MM/yyyy")}</span>
        <span>{format(date, "HH:mm")}</span>
      </div>
      <div className="row-start-1 col-span-2 text-md font-bold overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </div>
      <div className="row-start-2 col-start-2 col-span-2 text-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {category}
      </div>
      <div className="row-start-1 row-span-full text-lg overflow-hidden text-ellipsis whitespace-nowrap text-right">
        {new Intl.NumberFormat("de-DE", { currency: "EUR" }).format(amount)} €
      </div>
    </div>
  );
}
