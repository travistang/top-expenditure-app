import { useState } from "react";
import useSearch from "../hooks/useSearch";
import { expenditureDatabase } from "../domain/expenditure";
import TextInput from "../components/TextInput";
import { range } from "../utils/array";
import ExpenditureRecordPlaceholder from "../components/Placeholders/ExpenditureRecordPlaceholder";
import { FaSearch } from "react-icons/fa";
import CategoryItem from "../components/CategoryItem";

const searchCategoryFunc = (searchString: string) =>
  expenditureDatabase.searchCategories(searchString);

export default function CategoryListPage() {
  const [searchString, setSearchString] = useState("");
  const { results, loading, noResult } = useSearch(
    searchString,
    searchCategoryFunc
  );

  return (
    <div className="flex flex-col items-stretch gap-2 flex-1 px-2 overflow-y-hidden">
      <TextInput
        className="flex-shrink-0"
        value={searchString}
        onChange={setSearchString}
        icon={FaSearch}
        placeholder="Search categories..."
      />
      <div className="flex flex-col flex-1 items-stretch gap-2 overflow-y-auto pb-16">
        {noResult && (
          <div className="flex items-center justify-center text-sm flex-1">
            No search results
          </div>
        )}
        {loading && (
          <>
            {range(6).map((i) => (
              <ExpenditureRecordPlaceholder key={i} />
            ))}
          </>
        )}
        {!loading &&
          results.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
      </div>
    </div>
  );
}
