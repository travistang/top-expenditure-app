import { useState } from "react";
import useExpenditureSearch from "../hooks/useExpenditureSearch";
import {
  DEFAULT_SEARCH_PARAMS,
  SearchParams,
} from "../domain/expenditure-search";
import ExpenditureSearchForm from "../components/ExpenditureSearchForm";
import ExpenditureItem from "../components/ExpenditureRecord";
import { createUpdater } from "../utils/objects";
import { range } from "../utils/array";
import ExpenditureRecordPlaceholder from "../components/ExpenditureRecord/ExpenditureRecordPlaceholder";

export default function ExpenditureListPage() {
  const [params, setParams] = useState<SearchParams>(DEFAULT_SEARCH_PARAMS);
  const { results, loading } = useExpenditureSearch(params);
  const searchParamsUpdater = createUpdater(params, setParams);
  const noSearchResult = !loading && results.length === 0;

  return (
    <div className="flex flex-col items-stretch flex-1 gap-2 px-2 overflow-y-auto">
      <ExpenditureSearchForm
        searchParams={params}
        onChangeSearchParams={searchParamsUpdater}
      />
      {noSearchResult && (
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
          <ExpenditureItem key={expenditure.id} expenditure={expenditure} />
        ))}
    </div>
  );
}