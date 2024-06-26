import classNames from "classnames";
import { useState } from "react";
import { FaArrowDown, FaSearch } from "react-icons/fa";
import { SearchParams } from "../../domain/expenditure-search";
import { Updater } from "../../utils/objects";
import AmountInput from "../AmountInput";
import Button from "../Button";
import CheckboxInput from "../CheckboxInput";
import DateInput from "../DateInput";

type Props = {
  searchParams: SearchParams;
  onChangeSearchParams: Updater<SearchParams>;
  className?: string;
};
export default function ExpenditureSearchForm({
  searchParams,
  onChangeSearchParams,
  className,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={classNames(
        "sticky top-0 grid grid-cols-6 gap-2 transition-all duration-300 overflow-hidden",
        expanded
          ? "rounded-xl max-h-screen bg-gray-400/25 dark:bg-gray-300/25"
          : "rounded-[3rem] max-h-12 bg-gray-400 dark:bg-gray-300",
        className
      )}
    >
      <div
        className={classNames(
          "flex items-center justify-between h-12 duration-300 transition-all col-span-full px-4 gap-2 z-10"
        )}
      >
        <FaSearch
          className={classNames(
            "text-gray-800 h-12",
            expanded && "dark:text-gray-200"
          )}
        />
        <input
          placeholder="Search for expenses..."
          className={classNames(
            "flex-1 bg-transparent outline-none border-none text-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400",
            expanded && "dark:text-gray-200"
          )}
          value={searchParams.searchString}
          onChange={(e) => onChangeSearchParams("searchString")(e.target.value)}
        />
        <Button
          onClick={() => setExpanded(!expanded)}
          className={classNames(
            "transition-all duration-300 text-gray-800  align-self-end",
            expanded && "rotate-180 dark:text-gray-200"
          )}
          icon={FaArrowDown}
        />
      </div>
      <div className={classNames("grid grid-cols-6 p-2 gap-2 col-span-full")}>
        <CheckboxInput
          text="Include regular expenditures"
          checked={searchParams.includesRepeatedExpenditure}
          className="col-span-full"
          onToggle={() =>
            onChangeSearchParams("includesRepeatedExpenditure")(
              !searchParams.includesRepeatedExpenditure
            )
          }
        />
        <DateInput
          className="col-span-3"
          label="From"
          onChange={onChangeSearchParams("fromDate")}
          nullable
          date={searchParams.fromDate}
        />
        <DateInput
          nullable
          label="To"
          className="col-span-3"
          onChange={onChangeSearchParams("toDate")}
          date={searchParams.toDate}
        />
        <AmountInput
          nullable
          currency={searchParams.currency}
          label="Minimum amount"
          className="col-span-3"
          amount={searchParams.minimumAmount}
          onChange={onChangeSearchParams("minimumAmount")}
        />
        <AmountInput
          nullable
          currency={searchParams.currency}
          label="Maximum amount"
          className="col-span-3"
          amount={searchParams.maximumAmount}
          onChange={onChangeSearchParams("maximumAmount")}
        />
      </div>
    </div>
  );
}
