import classNames from "classnames";
import { SearchParams } from "../../domain/expenditure-search";
import { FaArrowDown, FaSearch } from "react-icons/fa";
import TextInput from "../TextInput";
import { Updater } from "../../utils/objects";
import { useState } from "react";
import Button from "../Button";

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
      <div className={classNames("h-72")}>Rest of the form</div>
    </div>
  );
}
