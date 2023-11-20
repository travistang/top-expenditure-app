import { useState } from "react";
import ExpenditureRecord from "../components/ExpenditureRecord";
import ExpenditureRecordPlaceholder from "../components/Placeholders/ExpenditureRecordPlaceholder";
import ExpenditureSearchForm from "../components/ExpenditureSearchForm";
import expenditureSearcher, {
  DEFAULT_SEARCH_PARAMS,
  SearchParams,
} from "../domain/expenditure-search";
import useSearch from "../hooks/useSearch";
import { range } from "../utils/array";
import { createUpdater } from "../utils/objects";

const searchFunc = (p: SearchParams) =>
  expenditureSearcher.searchExpenditures(p);

export default function ExpenditureListPage() {
  const [params, setParams] = useState<SearchParams>(DEFAULT_SEARCH_PARAMS);
  const { results, loading, noResult } = useSearch(params, searchFunc);
  const searchParamsUpdater = createUpdater(params, setParams);

  return (
    <div className="flex flex-col items-stretch flex-1 gap-2 px-2 overflow-y-auto">
      <ExpenditureSearchForm
        searchParams={params}
        onChangeSearchParams={searchParamsUpdater}
      />
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
        results.map((expenditure) => (
          <ExpenditureRecord key={expenditure.id} expenditure={expenditure} />
        ))}
    </div>
  );
}
